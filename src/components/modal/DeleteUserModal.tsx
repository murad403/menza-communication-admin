"use client"

import React from 'react'
import { X, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'

type DeleteUserModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  userName: string
}

const DeleteUserModal = ({ isOpen, onClose, onConfirm, userName }: DeleteUserModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-white w-full max-w-md rounded-2xl border border-zinc-100/80 shadow-2xl p-6 relative z-10 animate-in fade-in zoom-in-95 duration-200 select-none">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 rounded-lg p-1 transition-colors cursor-pointer"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon & Header */}
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-title">Delete User</h3>
            <p className="text-sm text-subtitle mt-2 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-title">{userName}</span>? 
              This action is permanent, will remove all of their group and channel ties, and cannot be undone.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 justify-end">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="w-auto px-5 h-11"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="w-auto px-6 h-11"
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteUserModal