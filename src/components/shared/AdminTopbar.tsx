import React from "react"
import { Search, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"

type TopbarProps = {
  isCollapsed: boolean
  setIsCollapsed: (c: boolean) => void
  isMobileOpen: boolean
  setIsMobileOpen: (o: boolean) => void
}

const AdminTopbar = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: TopbarProps) => {
  return (
    <header className="h-16 border-b border-zinc-100 bg-white flex items-center justify-between px-6 md:px-8 sticky top-0 z-10 select-none">
      <div className="flex items-center flex-1 max-w-sm">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden mr-4 p-2 -ml-2 rounded-lg text-zinc-500 hover:bg-zinc-50 hover:text-title cursor-pointer transition-colors"
          title="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Input Container */}
        <div className="w-full">
          <Input
            type="text"
            placeholder="Search..."
            startIcon={<Search className="w-4.5 h-4.5" />}
            className="h-10 text-sm placeholder:text-zinc-400 bg-[#F5F5F7] border-0 focus-visible:ring-1 focus-visible:ring-button-color/30"
          />
        </div>
      </div>

      {/* Admin Profile Section */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-button-color text-white flex items-center justify-center font-bold text-sm shadow-sm select-none">
          A
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-sm font-semibold text-title leading-tight">Admin User</span>
          <span className="text-xs text-subtitle leading-tight">admin@zack.com</span>
        </div>
      </div>
    </header>
  )
}

export default AdminTopbar