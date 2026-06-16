import React from "react"

type StatsCardProps = {
  title: string
  value: string | number
  change: string
  icon: React.ReactNode
  iconBgColor?: string
  iconColor?: string
}

const StatsCard = ({
  title,
  value,
  change,
  icon,
  iconBgColor = "bg-[#EEF2FF]",
  iconColor = "text-button-color",
}: StatsCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100/80 p-5 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[140px] select-none">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <span className="text-sm font-semibold text-subtitle tracking-tight leading-none">
          {title}
        </span>
        <div className={`w-10 h-10 rounded-xl ${iconBgColor} ${iconColor} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
      </div>

      {/* Middle & Bottom Sections */}
      <div className="mt-4 flex flex-col gap-1.5">
        <span className="text-3xl font-bold text-title tracking-tight font-sans">
          {value}
        </span>
        <span className="text-[13px] font-semibold text-emerald-500 flex items-center gap-1">
          {change}
        </span>
      </div>
    </div>
  )
}

export default StatsCard