"use client"

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { userSchema, TUserForm } from '@/validation/user.validation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

type AddUserModalProps = {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: TUserForm) => void
}

const AddUserModal = ({ isOpen, onClose, onAdd }: AddUserModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TUserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      reset({
        name: '',
        email: '',
        phone: '',
      })
    }
  }, [isOpen, reset])

  if (!isOpen) return null

  const onSubmit = (data: TUserForm) => {
    onAdd(data)
    onClose()
  }

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

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-title">Add New User</h3>
          <p className="text-xs text-subtitle mt-1">Fill in details to add a new admin user.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. John Doe"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs font-semibold text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. john@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs font-semibold text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="text"
              placeholder="e.g. +1234567890"
              {...register('phone')}
            />
            {errors.phone && (
              <p className="text-xs font-semibold text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors text-sm font-semibold px-5 cursor-pointer"
            >
              Cancel
            </button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-auto px-6 h-11"
            >
              {isSubmitting ? 'Adding...' : 'Add User'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal