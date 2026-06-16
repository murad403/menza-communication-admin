"use client"

import React, { useState } from 'react'
import AdminSidebar from '@/components/shared/AdminSidebar'
import AdminTopbar from '@/components/shared/AdminTopbar'

const Layout = ({children}: {children: React.ReactNode}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className='flex min-h-screen bg-[#FFFFFF] w-full relative overflow-x-hidden'>
        {/* Sidebar */}
        <AdminSidebar 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Mobile Backdrop */}
        {isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
        
        {/* Main section */}
        <div className='flex-1 flex flex-col min-w-0 transition-all duration-300'>
            <AdminTopbar 
              isCollapsed={isCollapsed} 
              setIsCollapsed={setIsCollapsed}
              isMobileOpen={isMobileOpen}
              setIsMobileOpen={setIsMobileOpen}
            />
            <div className='flex-1'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Layout