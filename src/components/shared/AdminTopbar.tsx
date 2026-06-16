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
    <header className="h-16 border-b border-zinc-100 bg-white flex items-center px-6 md:px-8 sticky top-0 z-10 select-none">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden mr-4 p-2 -ml-2 rounded-lg text-zinc-500 hover:bg-zinc-50 hover:text-title cursor-pointer transition-colors"
        title="Open Navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search Input Container */}
      <div className="w-full max-w-sm">
        <Input
          type="text"
          placeholder="Search..."
          startIcon={<Search className="w-4.5 h-4.5" />}
          className="h-10 text-sm placeholder:text-zinc-400 bg-[#F5F5F7] border-0 focus-visible:ring-1 focus-visible:ring-button-color/30"
        />
      </div>
    </header>
  )
}

export default AdminTopbar