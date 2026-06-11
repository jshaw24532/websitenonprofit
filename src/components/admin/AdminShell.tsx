"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  LogOut,
  Shield,
  Users,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/donations", label: "Donations", icon: Heart },
  { href: "/admin/donors", label: "Donors", icon: Users },
  { href: "/admin/submissions", label: "Form Submissions", icon: Inbox },
];

export default function AdminShell({
  children,
  adminName,
}: {
  children: React.ReactNode;
  adminName: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-navy-950 text-white">
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
          <Shield className="h-6 w-6 text-gold-400" />
          <div>
            <p className="text-sm font-bold">Admin Portal</p>
            <p className="text-xs text-white/60">Donations Control</p>
          </div>
        </div>
        <nav className="space-y-1 p-4">
          {nav.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/10 text-gold-400"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
          <p className="mb-2 truncate text-xs text-white/50">{adminName}</p>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>
      <div className="pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-8">
            <h1 className="text-lg font-bold text-navy-950">
              Municipal Blockchain Consortium
            </h1>
            <Link href="/" className="text-sm text-navy-600 hover:text-navy-950">
              View public site →
            </Link>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
