import React from "react"
import { Users, UserCheck, FolderClosed, Radio, Crown } from "lucide-react"
import StatsCard from "@/components/shared/StatsCard"

const statsData = [
  {
    title: "Total Users",
    value: "12,458",
    change: "↑ +12.5%",
    icon: <Users className="w-5 h-5" />,
    iconBgColor: "bg-[#EEF2FF]",
    iconColor: "text-button-color",
  },
  {
    title: "Active Users",
    value: "8,234",
    change: "↑ +8.2%",
    icon: <UserCheck className="w-5 h-5" />,
    iconBgColor: "bg-[#EEF2FF]",
    iconColor: "text-button-color",
  },
  {
    title: "Total Groups",
    value: "342",
    change: "↑ +15.3%",
    icon: <FolderClosed className="w-5 h-5" />,
    iconBgColor: "bg-[#EEF2FF]",
    iconColor: "text-button-color",
  },
  {
    title: "Total Channels",
    value: "156",
    change: "↑ +5.7%",
    icon: <Radio className="w-5 h-5" />,
    iconBgColor: "bg-[#EEF2FF]",
    iconColor: "text-button-color",
  },
  {
    title: "Subscribers",
    value: "2,847",
    change: "↑ +18.9%",
    icon: <Crown className="w-5 h-5" />,
    iconBgColor: "bg-[#EEF2FF]",
    iconColor: "text-button-color",
  },
]

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          iconBgColor={stat.iconBgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  )
}

export default DashboardStats