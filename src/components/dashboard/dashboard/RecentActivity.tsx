import React from "react"

const activities = [
  {
    id: 1,
    user: "John Doe",
    action: "joined Tech News channel",
    time: "5 mins ago",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: 'created new group "Developers"',
    time: "12 mins ago",
  },
]

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden select-none">
      {/* Title */}
      <div className="px-6 py-5 border-b border-zinc-100">
        <h3 className="text-lg font-bold text-title">Recent Activity</h3>
      </div>

      {/* List */}
      <div className="divide-y divide-zinc-100">
        {activities.map((act) => (
          <div key={act.id} className="px-6 py-4 flex items-center justify-between text-sm">
            <div className="text-zinc-600">
              <span className="font-bold text-title">{act.user}</span>{" "}
              <span className="text-subtitle font-normal">{act.action}</span>
            </div>
            <span className="text-xs text-zinc-400 font-medium shrink-0 ml-4">
              {act.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity