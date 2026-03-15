import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make an Appointment",
  description:
    "Book an occupational health appointment at Adena OSH Center in Mombasa. Pre-employment screening, wellness programs, specialist consultations, and more.",
  openGraph: {
    title: "Make an Appointment | Adena OSH Center",
    description:
      "Book an occupational health appointment at Adena OSH Center in Mombasa.",
    url: "/appointment",
  },
  twitter: {
    title: "Make an Appointment | Adena OSH Center",
    description:
      "Book an occupational health appointment at Adena OSH Center in Mombasa.",
  },
};

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
