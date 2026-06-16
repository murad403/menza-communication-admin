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
        "border-r border-zinc-100 bg-white flex flex-col h-screen select-none transition-all duration-300 z-50 shrink-0",
        // Width toggles on desktop
        isCollapsed ? "md:w-20" : "md:w-64",
        // Position toggles: fixed on mobile, sticky on desktop
        isMobileOpen
          ? "fixed top-0 left-0 w-64 h-screen translate-x-0 md:sticky md:top-0 md:left-auto"
          : "fixed top-0 left-0 w-64 h-screen -translate-x-full md:sticky md:top-0 md:left-auto md:translate-x-0"
      )}
    >
      {/* Logo Section */}
      <div
        className={cn(
          "h-16 flex items-center border-b border-zinc-100 px-6",
          isCollapsed ? "justify-between md:justify-center" : "justify-between"
        )}
      >
        {/* Logo (hidden when collapsed on desktop) */}
        <div
          className={cn(
            "flex items-center gap-3 overflow-hidden transition-all duration-200",
            isCollapsed ? "md:opacity-0 md:w-0 md:hidden" : "opacity-100 w-auto"
          )}
        >
          {/* Zack Logo Icon */}
          <div className="w-8 h-8 rounded-lg bg-button-color text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
            Z
          </div>
          {/* Logo Text */}
          <span className="text-lg font-bold text-title tracking-tight font-sans whitespace-nowrap">
            Zack Admin
          </span>
        </div>

        {/* Desktop Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "hidden md:flex w-7 h-7 rounded-md border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-title items-center justify-center cursor-pointer transition-colors",
            isCollapsed && "md:mx-auto"
          )}
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
                "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap w-full",
                active
                  ? "bg-button-color text-white shadow-md shadow-button-color/10"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-title",
                isCollapsed && "md:justify-center md:px-0 md:py-3.5 md:w-11 md:mx-auto md:gap-0"
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
        <p
          className={cn(
            "text-[11px] text-zinc-400 font-medium tracking-wide whitespace-nowrap",
            isCollapsed && "md:hidden"
          )}
        >
          © {new Date().getFullYear()} Zack Admin
        </p>
        {isCollapsed && (
          <span className="hidden md:inline text-[11px] text-zinc-400 font-medium font-sans">©</span>
        )}
      </div>
    </aside>
  )
}

export default AdminSidebar