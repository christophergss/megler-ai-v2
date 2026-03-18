"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenTool,
  FileText,
  History,
  Building2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useStore } from "@/store/useStore";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/generator", label: "Tekstgenerator", icon: PenTool },
  { href: "/prospekt", label: "Prospekt", icon: FileText },
  { href: "/history", label: "Historikk", icon: History },
  { href: "/properties", label: "Eiendommer", icon: Building2 },
  { href: "/settings", label: "Innstillinger", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useStore();

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-surface border-r border-border z-40 transition-all duration-300 flex flex-col ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between p-6 border-b border-border">
        {sidebarOpen && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-serif text-xl text-text-primary">
              MeglerAI
            </span>
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-surface-light text-text-secondary hover:text-text-primary transition-colors"
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-text-secondary hover:bg-surface-light hover:text-text-primary"
              }`}
            >
              <item.icon
                size={20}
                className={isActive ? "text-accent" : "text-text-muted group-hover:text-text-primary"}
              />
              {sidebarOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-light hover:text-red-400 transition-colors w-full"
        >
          <LogOut size={20} />
          {sidebarOpen && <span className="text-sm font-medium">Logg ut</span>}
        </button>
      </div>
    </aside>
  );
}
