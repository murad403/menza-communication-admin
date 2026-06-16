import React from "react"
import DashboardChildrenLayout from "@/components/shared/DashboardChildrenLayout"
import DashboardStats from "@/components/dashboard/dashboard/DashboardStats"
import UserGrowthChart from "@/components/dashboard/dashboard/UserGrowthChart"
import PopularChannelsChart from "@/components/dashboard/dashboard/PopularChannelsChart"
import RecentActivity from "@/components/dashboard/dashboard/RecentActivity"

const DashboardPage = () => {
  return (
    <DashboardChildrenLayout title="Dashboard Overview" subtitle="Welcome back, Admin">
      <div className="flex flex-col md:gap-6 gap-4">
        {/* Stats Section */}
        <DashboardStats />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-6 gap-4">
          <UserGrowthChart />
          <PopularChannelsChart />
        </div>

        {/* Recent Activity Section */}
        <RecentActivity />
      </div>
    </DashboardChildrenLayout>
  )
}

export default DashboardPage