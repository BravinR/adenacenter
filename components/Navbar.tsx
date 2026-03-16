"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Menu, X, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center max-w-7xl">
          <div className="flex items-center space-x-6">
            <a href="mailto:info@adenaoshcentre.com" className="flex items-center hover:text-white transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              info@adenaoshcentre.com
            </a>
            <a href="tel:+254708775657" className="flex items-center hover:text-white transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              +254 708 775 657
            </a>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Acacia Centre, Nyerere Avenue, Mombasa
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center">
              <Logo className="h-10 w-auto md:h-12" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
              <Link href="/services" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Our Services</Link>
              <Link href="/about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">About Us</Link>
              <Link href="/news" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">News</Link>
              <Link href="/contact" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Contact Us</Link>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/admin" className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                Employee Portal
              </Link>
              <Link href="/appointment" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm">
                Make Appointment
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-600 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link href="/" className="text-slate-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/services" className="text-slate-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Our Services</Link>
              <Link href="/about" className="text-slate-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              <Link href="/news" className="text-slate-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>News</Link>
              <Link href="/contact" className="text-slate-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
              <Link href="/admin" className="flex items-center gap-2 text-slate-500 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                <LayoutDashboard className="w-4 h-4" />
                Employee Portal
              </Link>
              <Link href="/appointment" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium text-center mt-4" onClick={() => setIsMobileMenuOpen(false)}>
                Make Appointment
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
