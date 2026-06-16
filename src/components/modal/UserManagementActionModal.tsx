"use client"

import React, { useEffect, useRef } from 'react'
import { Eye, Ban, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type UserManagementActionModalProps = {
  isOpen: boolean
  onClose: () => void
  onViewProfile: () => void
  onBan: () => void
  onDelete: () => void
  isBanned: boolean
  align?: 'top' | 'bottom'
}

const UserManagementActionModal = ({
  isOpen,
  onClose,
  onViewProfile,
  onBan,
  onDelete,
  isBanned,
  align = 'top',
}: UserManagementActionModalProps) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      className={cn(
        "absolute right-6 bg-white border border-zinc-100/80 rounded-xl shadow-lg py-1.5 w-40 z-30 animate-in fade-in-50 duration-100 select-none text-left",
        align === 'bottom' ? "bottom-10 slide-in-from-bottom-1" : "top-10 slide-in-from-top-1"
      )}
      onClick={(e) => e.stopPropagation()} // Stop propagation so it doesn't trigger parent row click
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onViewProfile()
          onClose()
        }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-title transition-colors cursor-pointer"
      >
        <Eye className="w-4 h-4 text-zinc-400" />
        View Profile
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onBan()
          onClose()
        }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-title transition-colors cursor-pointer"
      >
        <Ban className="w-4 h-4 text-zinc-400" />
        {isBanned ? 'Unban' : 'Ban'}
      </button>

      <div className="h-px bg-zinc-100/80 my-1" />

      <button
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
          onClose()
        }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
        Delete
      </button>
    </div>
  )
}

export default UserManagementActionModal