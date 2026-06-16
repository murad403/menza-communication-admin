"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, UserPlus, MoreVertical } from 'lucide-react'
import DashboardChildrenLayout from '@/components/shared/DashboardChildrenLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { getUsers, addUser, updateUserStatus, deleteUser, User } from '@/lib/userData'
import AddUserModal from '@/components/modal/AddUserModal'
import BanUserModal from '@/components/modal/BanUserModal'
import DeleteUserModal from '@/components/modal/DeleteUserModal'
import UserManagementActionModal from '@/components/modal/UserManagementActionModal'

const UsersPage = () => {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Banned'>('All')

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isBanOpen, setIsBanOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null)

  // Load users from localStorage on client-side mount
  useEffect(() => {
    setUsers(getUsers())
  }, [])

  const reloadUsers = () => {
    setUsers(getUsers())
  }

  // Handle Add User
  const handleAddUser = (data: { name: string; email: string; phone: string }) => {
    addUser(data)
    reloadUsers()
  }

  // Handle Ban User Confirm
  const handleBanConfirm = () => {
    if (selectedUser) {
      const nextStatus = selectedUser.status === 'active' ? 'banned' : 'active'
      updateUserStatus(selectedUser.id, nextStatus)
      reloadUsers()
    }
  }

  // Handle Delete User Confirm
  const handleDeleteConfirm = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id)
      reloadUsers()
    }
  }

  // Filtering users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      user.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <DashboardChildrenLayout
      title="User Management"
      subtitle="Manage and monitor all users"
      headerAction={
        <Button
          onClick={() => setIsAddOpen(true)}
          className="w-auto px-5 gap-2 h-10 flex items-center shadow-md shadow-button-color/10"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Filters bar */}
        <div className="bg-white border border-zinc-100 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] select-none">
          <div className="w-full md:max-w-md">
            <Input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startIcon={<Search className="w-4.5 h-4.5" />}
              className="h-10 text-sm placeholder:text-zinc-400 bg-[#F5F5F7] border-0"
            />
          </div>

          <div className="flex gap-2 bg-zinc-100/60 p-1 rounded-xl border border-zinc-100/40">
            {(['All', 'Active', 'Banned'] as const).map((tab) => {
              const isActive = statusFilter === tab
              return (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer select-none",
                    isActive
                      ? "bg-button-color text-white shadow-sm shadow-button-color/10"
                      : "text-zinc-500 hover:text-title hover:bg-zinc-50/50"
                  )}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>

        {/* Users Table Card */}
        <div className="bg-white border border-zinc-100 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden select-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-zinc-50/40 border-b border-zinc-100">
                  <th className="text-zinc-500 font-semibold text-xs py-4 px-6 select-none">Name</th>
                  <th className="text-zinc-500 font-semibold text-xs py-4 px-6 select-none">Email / Phone</th>
                  <th className="text-zinc-500 font-semibold text-xs py-4 px-6 select-none">Status</th>
                  <th className="text-zinc-500 font-semibold text-xs py-4 px-6 select-none">Join Date</th>
                  <th className="text-zinc-500 font-semibold text-xs py-4 px-6 text-right select-none">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100/60">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => {
                    const dropdownOpen = activeDropdownId === user.id
                    const align = (index >= filteredUsers.length - 2 && filteredUsers.length >= 3) ? 'bottom' : 'top'
                    return (
                      <tr
                        key={user.id}
                        onClick={() => router.push(`/users/${user.id}`)}
                        className="hover:bg-zinc-50/30 transition-colors cursor-pointer"
                      >
                        {/* Name column */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-button-color text-white flex items-center justify-center font-bold text-sm shadow-sm select-none">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-title text-sm">{user.name}</span>
                          </div>
                        </td>

                        {/* Email / Phone column */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-title leading-snug">{user.email}</span>
                            <span className="text-[11px] font-semibold text-subtitle mt-0.5 tracking-tight">{user.phone}</span>
                          </div>
                        </td>

                        {/* Status column */}
                        <td className="py-4 px-6">
                          <span
                            className={cn(
                              "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase select-none tracking-wider inline-block border",
                              user.status === 'active'
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100/40"
                                : "bg-red-50 text-red-500 border-red-100/40"
                            )}
                          >
                            {user.status}
                          </span>
                        </td>

                        {/* Join Date column */}
                        <td className="py-4 px-6">
                          <span className="text-sm font-semibold text-zinc-500 font-sans leading-none">{user.joinDate}</span>
                        </td>

                        {/* Actions column */}
                        <td className="py-4 px-6 text-right relative" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setActiveDropdownId(dropdownOpen ? null : user.id)}
                            className="text-zinc-400 hover:text-title hover:bg-zinc-100 p-1.5 rounded-lg transition-colors cursor-pointer"
                            title="Actions Menu"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          <UserManagementActionModal
                            isOpen={dropdownOpen}
                            onClose={() => setActiveDropdownId(null)}
                            onViewProfile={() => router.push(`/users/${user.id}`)}
                            onBan={() => {
                              setSelectedUser(user)
                              setIsBanOpen(true)
                            }}
                            onDelete={() => {
                              setSelectedUser(user)
                              setIsDeleteOpen(true)
                            }}
                            isBanned={user.status === 'banned'}
                            align={align}
                          />
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 px-6 text-center text-sm font-semibold text-subtitle">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddUser}
      />

      {/* Ban Confirm Modal */}
      {selectedUser && (
        <BanUserModal
          isOpen={isBanOpen}
          onClose={() => {
            setIsBanOpen(false)
            setSelectedUser(null)
          }}
          onConfirm={handleBanConfirm}
          userName={selectedUser.name}
          isBanned={selectedUser.status === 'banned'}
        />
      )}

      {/* Delete Confirm Modal */}
      {selectedUser && (
        <DeleteUserModal
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false)
            setSelectedUser(null)
          }}
          onConfirm={handleDeleteConfirm}
          userName={selectedUser.name}
        />
      )}
    </DashboardChildrenLayout>
  )
}

export default UsersPage