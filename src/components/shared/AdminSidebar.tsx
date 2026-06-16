"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FolderClosed,
  Radio,
  Shield,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Users", href: "/users", icon: Users },
  { label: "Groups", href: "/groups", icon: FolderClosed },
  { label: "Channels", href: "/channels", icon: Radio },
  { label: "Moderation", href: "/moderation", icon: Shield },
  { label: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: Settings },
]

type SidebarProps = {
  isCollapsed: boolean
  setIsCollapsed: (c: boolean) => void
  isMobileOpen: boolean
  setIsMobileOpen: (o: boolean) => void
}

const AdminSidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) => {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/app"
    }
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={cn(
        "border-r border-zinc-100 bg-white flex flex-col h-screen sticky top-0 shrink-0 select-none transition-all duration-300 z-50",
        // Width toggles on desktop
        isCollapsed ? "md:w-20" : "md:w-64",
        // Responsive placements (slide in on mobile)
        isMobileOpen ? "fixed left-0 w-64 translate-x-0" : "fixed -translate-x-full md:translate-x-0"
      )}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-100">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Zack Logo Icon (always visible) */}
          <div className="w-8 h-8 rounded-lg bg-button-color text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
            Z
          </div>
          {/* Logo Text - hidden when collapsed on desktop */}
          <span
            className={cn(
              "text-lg font-bold text-title tracking-tight font-sans whitespace-nowrap transition-all duration-200",
              isCollapsed ? "md:opacity-0 md:w-0" : "opacity-100 w-auto"
            )}
          >
            Zack Admin
          </span>
        </div>

        {/* Desktop Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex w-7 h-7 rounded-md border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-title items-center justify-center cursor-pointer transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden flex w-7 h-7 rounded-md border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-title items-center justify-center cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const active = isActive(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                "flex items-center rounded-xl font-semibold text-sm transition-all whitespace-nowrap",
                isCollapsed
                  ? "md:justify-center md:px-0 md:py-3.5 md:w-11 md:mx-auto"
                  : "gap-3 px-4 py-3",
                active
                  ? "bg-button-color text-white shadow-md shadow-button-color/10"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-title"
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0", active ? "text-white" : "text-zinc-400")} />
              <span
                className={cn(
                  "transition-all duration-200",
                  isCollapsed ? "md:opacity-0 md:w-0 md:hidden" : "opacity-100 w-auto"
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Footer Copyright */}
      <div className="p-6 border-t border-zinc-100 text-center flex items-center justify-center">
        {isCollapsed ? (
          <span className="text-[11px] text-zinc-400 font-medium font-sans">©</span>
        ) : (
          <p className="text-[11px] text-zinc-400 font-medium tracking-wide whitespace-nowrap">
            © {new Date().getFullYear()} Zack Admin
          </p>
        )}
      </div>
    </aside>
  )
}

export default AdminSidebar