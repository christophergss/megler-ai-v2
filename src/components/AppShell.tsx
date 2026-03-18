"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { useStore } from "@/store/useStore";

const publicRoutes = ["/login", "/signup", "/"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sidebarOpen } = useStore();
  const isPublic = publicRoutes.includes(pathname);

  if (isPublic) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
