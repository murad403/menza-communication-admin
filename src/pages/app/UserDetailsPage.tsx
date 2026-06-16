"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Phone, Calendar, FolderClosed, Radio, Ban, Trash2 } from 'lucide-react'
import DashboardChildrenLayout from '@/components/shared/DashboardChildrenLayout'
import { cn } from '@/lib/utils'
import { getUserById, updateUserStatus, deleteUser, User } from '@/lib/userData'
import BanUserModal from '@/components/modal/BanUserModal'
import DeleteUserModal from '@/components/modal/DeleteUserModal'

type UserDetailsPageProps = {
  id: string
}

const UserDetailsPage = ({ id }: UserDetailsPageProps) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isBanOpen, setIsBanOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // Load user data
  useEffect(() => {
    const loadedUser = getUserById(id)
    if (loadedUser) {
      setUser(loadedUser)
    }
  }, [id])

  if (!user) {
    return (
      <DashboardChildrenLayout title="User Profile" subtitle="View and manage user details" showBackButton>
        <div className="bg-white border border-zinc-100 rounded-2xl p-12 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] select-none">
          <p className="text-base font-semibold text-subtitle">User not found</p>
          <button
            onClick={() => router.push('/users')}
            className="mt-4 px-4 py-2 rounded-xl bg-button-color text-white text-sm font-semibold hover:bg-button-color/90 transition-colors cursor-pointer"
          >
            Back to Users List
          </button>
        </div>
      </DashboardChildrenLayout>
    )
  }

  // Handle Ban Status update
  const handleBanConfirm = () => {
    const nextStatus = user.status === 'active' ? 'banned' : 'active'
    const updated = updateUserStatus(user.id, nextStatus)
    if (updated) {
      setUser(updated)
    }
  }

  // Handle user deletion
  const handleDeleteConfirm = () => {
    deleteUser(user.id)
    router.push('/users')
  }

  return (
    <DashboardChildrenLayout
      title="User Profile"
      subtitle="View and manage user details"
      showBackButton
      headerAction={
        <div className="flex gap-3 select-none">
          <button
            onClick={() => setIsBanOpen(true)}
            className="inline-flex items-center gap-2 px-4 h-10 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors font-semibold text-xs md:text-sm cursor-pointer bg-white"
          >
            <Ban className="w-4 h-4 text-zinc-500" />
            {user.status === 'banned' ? 'Unban User' : 'Ban User'}
          </button>
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors font-semibold text-xs md:text-sm cursor-pointer shadow-md shadow-red-600/10 font-sans"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
        {/* Left Profile Card */}
        <div className="lg:col-span-1 bg-white border border-zinc-100 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-button-color text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-sm select-none">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h3 className="text-lg font-bold text-title leading-snug">{user.name}</h3>
          
          <span
            className={cn(
              "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block border mt-2 mb-6",
              user.status === 'active'
                ? "bg-emerald-50 text-emerald-600 border-emerald-100/40"
                : "bg-red-50 text-red-500 border-red-100/40"
            )}
          >
            {user.status}
          </span>

          <div className="w-full border-t border-zinc-100/80 pt-6 space-y-4.5 text-left">
            <div className="flex items-center gap-3">
              <Mail className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
              <span className="text-sm font-semibold text-zinc-600 truncate leading-none">{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
              <span className="text-sm font-semibold text-zinc-600 leading-none">{user.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
              <span className="text-sm font-semibold text-zinc-600 leading-none">Joined {user.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Right Section Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Groups Card */}
          <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2.5 mb-4">
              <FolderClosed className="w-5 h-5 text-zinc-400" />
              <h4 className="font-bold text-title text-base leading-none">Groups</h4>
            </div>
            <div className="h-px bg-zinc-100/80 mb-4" />
            <div className="space-y-3">
              {user.groups && user.groups.length > 0 ? (
                user.groups.map((group) => (
                  <div
                    key={group.name}
                    className="flex justify-between items-center bg-[#F5F5F7]/40 border border-zinc-100/50 p-4 rounded-xl"
                  >
                    <span className="text-sm font-semibold text-title leading-none">{group.name}</span>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-100/30 tracking-tight leading-none uppercase">
                      {group.role}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs font-semibold text-subtitle py-2">No groups joined</p>
              )}
            </div>
          </div>

          {/* Channels Card */}
          <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2.5 mb-4">
              <Radio className="w-5 h-5 text-zinc-400" />
              <h4 className="font-bold text-title text-base leading-none">Channels</h4>
            </div>
            <div className="h-px bg-zinc-100/80 mb-4" />
            <div className="flex flex-wrap gap-2">
              {user.channels && user.channels.length > 0 ? (
                user.channels.map((chan) => (
                  <span
                    key={chan}
                    className="bg-zinc-100/60 border border-zinc-100/40 text-zinc-500 text-xs font-semibold px-3 py-1.5 rounded-full select-none leading-none"
                  >
                    {chan}
                  </span>
                ))
              ) : (
                <p className="text-xs font-semibold text-subtitle py-2">No channels assigned</p>
              )}
            </div>
          </div>

          {/* Blocked Users Card */}
          <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2.5 mb-4">
              <Ban className="w-5 h-5 text-zinc-400" />
              <h4 className="font-bold text-title text-base leading-none">Blocked Users</h4>
            </div>
            <div className="h-px bg-zinc-100/80 mb-4" />
            <div className="divide-y divide-zinc-100/60">
              {user.blockedUsers && user.blockedUsers.length > 0 ? (
                user.blockedUsers.map((bu) => (
                  <div key={bu.id} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 flex items-center justify-center font-bold text-xs shadow-sm select-none">
                      {bu.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-title leading-none">{bu.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs font-semibold text-subtitle py-2">No blocked users</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ban Confirm Modal */}
      <BanUserModal
        isOpen={isBanOpen}
        onClose={() => setIsBanOpen(false)}
        onConfirm={handleBanConfirm}
        userName={user.name}
        isBanned={user.status === 'banned'}
      />

      {/* Delete Confirm Modal */}
      <DeleteUserModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        userName={user.name}
      />
    </DashboardChildrenLayout>
  )
}

export default UserDetailsPage