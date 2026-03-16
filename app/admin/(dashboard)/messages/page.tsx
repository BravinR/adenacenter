"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Mail, Phone, Search, MailOpen, Trash2, SlidersHorizontal,
} from "lucide-react";

type Message = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      setMessages(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  async function markRead(id: number, read: boolean) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });
      if (res.ok) {
        const updated: Message = await res.json();
        setMessages(prev => prev.map(m => m.id === id ? updated : m));
      }
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteMessage(id: number) {
    if (!confirm("Delete this message? This cannot be undone.")) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
        if (expandedId === id) setExpandedId(null);
      }
    } finally {
      setUpdatingId(null);
    }
  }

  function toggleExpand(id: number, read: boolean) {
    setExpandedId(prev => prev === id ? null : id);
    // Auto-mark as read when opened
    if (!read) markRead(id, true);
  }

  const unreadCount = messages.filter(m => !m.read).length;

  const filtered = messages.filter(m => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !m.read) ||
      (filter === "read" && m.read);
    const q = search.toLowerCase();
    const matchesSearch = !q || [m.name, m.email, m.phone ?? "", m.message]
      .some(v => v.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-KE", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
        <p className="text-slate-500 text-sm mt-1">
          {messages.length} total · {unreadCount} unread
        </p>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 self-start">
          {(["all", "unread", "read"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={[
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors capitalize",
                filter === f
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700",
              ].join(" ")}
            >
              {f}
              {f === "unread" && unreadCount > 0 && (
                <span className="text-xs px-1.5 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, message…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
        {isLoading ? (
          <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
            Loading messages…
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-2">
            <SlidersHorizontal className="w-8 h-8 opacity-40" />
            <p className="text-sm">No messages match your filters.</p>
          </div>
        ) : (
          filtered.map(msg => (
            <div key={msg.id} className={!msg.read ? "bg-blue-50/40" : ""}>
              {/* Row */}
              <div
                className="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => toggleExpand(msg.id, msg.read)}
              >
                {/* Unread dot */}
                <div className="mt-1.5 shrink-0">
                  {!msg.read
                    ? <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block" />
                    : <span className="w-2.5 h-2.5 rounded-full bg-slate-200 block" />
                  }
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <p className={`font-semibold ${!msg.read ? "text-slate-900" : "text-slate-700"}`}>
                      {msg.name}
                    </p>
                    <span className="text-xs text-slate-400 shrink-0">{formatDate(msg.createdAt)}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{msg.email}{msg.phone ? ` · ${msg.phone}` : ""}</p>
                  <p className={`text-sm mt-1 line-clamp-1 ${!msg.read ? "text-slate-700" : "text-slate-500"}`}>
                    {msg.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => markRead(msg.id, !msg.read)}
                    disabled={updatingId === msg.id}
                    title={msg.read ? "Mark as unread" : "Mark as read"}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-40"
                  >
                    {msg.read
                      ? <Mail className="w-4 h-4" />
                      : <MailOpen className="w-4 h-4" />
                    }
                  </button>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    disabled={updatingId === msg.id}
                    title="Delete"
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-40"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expanded */}
              {expandedId === msg.id && (
                <div className="px-5 pb-5 pt-1">
                  <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                    <div className="flex flex-wrap gap-5 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline font-medium">
                          {msg.email}
                        </a>
                      </div>
                      {msg.phone && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <a href={`tel:${msg.phone}`} className="text-blue-600 hover:underline font-medium">
                            {msg.phone}
                          </a>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed border-t border-slate-100 pt-4">
                      {msg.message}
                    </p>
                    <div className="flex gap-3 border-t border-slate-100 pt-4">
                      <a
                        href={`mailto:${msg.email}?subject=Re: Your message to Adena OSH Center`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Reply by email
                      </a>
                      {msg.phone && (
                        <a
                          href={`tel:${msg.phone}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          Call
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
