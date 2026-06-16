export interface User {
  id: string
  name: string
  email: string
  phone: string
  status: 'active' | 'banned'
  joinDate: string
  groups: { name: string; role: 'Member' | 'Admin' }[]
  channels: string[]
  blockedUsers: { id: string; name: string }[]
}

const DEFAULT_USERS: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    status: "active",
    joinDate: "2024-01-15",
    groups: [
      { name: "Developers", role: "Member" },
      { name: "Gaming", role: "Admin" }
    ],
    channels: ["Tech News", "Gaming Updates", "Movies"],
    blockedUsers: [
      { id: "2", name: "Jane Smith" },
      { id: "3", name: "Mike Johnson" }
    ]
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1234567891",
    status: "active",
    joinDate: "2024-02-20",
    groups: [
      { name: "Gaming", role: "Member" }
    ],
    channels: ["Movies", "Music"],
    blockedUsers: []
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1234567892",
    status: "banned",
    joinDate: "2024-03-10",
    groups: [
      { name: "Developers", role: "Admin" }
    ],
    channels: ["Tech News"],
    blockedUsers: [
      { id: "5", name: "Tom Brown" }
    ]
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+1234567893",
    status: "active",
    joinDate: "2024-01-25",
    groups: [
      { name: "Developers", role: "Member" }
    ],
    channels: ["Tech News", "Music"],
    blockedUsers: []
  },
  {
    id: "5",
    name: "Tom Brown",
    email: "tom@example.com",
    phone: "+1234567894",
    status: "active",
    joinDate: "2024-04-05",
    groups: [
      { name: "Gaming", role: "Member" }
    ],
    channels: ["Gaming Updates"],
    blockedUsers: [
      { id: "3", name: "Mike Johnson" }
    ]
  }
]

const KEY = "menza_admin_users"

export function getUsers(): User[] {
  if (typeof window === "undefined") {
    return DEFAULT_USERS
  }
  const saved = localStorage.getItem(KEY)
  if (!saved) {
    localStorage.setItem(KEY, JSON.stringify(DEFAULT_USERS))
    return DEFAULT_USERS
  }
  try {
    return JSON.parse(saved)
  } catch {
    return DEFAULT_USERS
  }
}

export function saveUsers(users: User[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(users))
  }
}

export function getUserById(id: string): User | undefined {
  const users = getUsers()
  return users.find(u => u.id === id)
}

export function addUser(user: Omit<User, "id" | "status" | "joinDate" | "groups" | "channels" | "blockedUsers">): User {
  const users = getUsers()
  const newUser: User = {
    ...user,
    id: String(Date.now()),
    status: "active",
    joinDate: new Date().toISOString().split("T")[0],
    groups: [
      { name: "Developers", role: "Member" }
    ],
    channels: ["Tech News"],
    blockedUsers: []
  }
  users.push(newUser)
  saveUsers(users)
  return newUser
}

export function updateUserStatus(id: string, status: 'active' | 'banned'): User | undefined {
  const users = getUsers()
  const user = users.find(u => u.id === id)
  if (user) {
    user.status = status
    saveUsers(users)
  }
  return user
}

export function deleteUser(id: string): boolean {
  const users = getUsers()
  const initialLength = users.length
  const filtered = users.filter(u => u.id !== id)
  saveUsers(filtered)
  return filtered.length < initialLength
}
