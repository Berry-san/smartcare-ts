import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import useAuthStore from 'Store/authStore'

const Layout: React.FC = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }))

  const authChecker = user?.isAuthenticated

  useEffect(() => {
    if (!authChecker) navigate('/login')
  }, [authChecker, navigate])

  return (
    <div className="flex h-screen overflow-hidden">
      <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex w-full pt-16">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="relative flex-1 h-screen overflow-x-hidden overflow-y-auto bg-primary">
          <div className="relative px-4 pt-3 pb-24 mx-auto max-w-screen-2xl shadow-2 md:px-6 2xl:px-11 lg:pt-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
