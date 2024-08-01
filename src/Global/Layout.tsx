import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
// import { useSelector } from 'react-redux'

const Layout: React.FC = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  //   const { isAuthenticated } = useSelector((state: any) => state.user.user) // Adjust type according to your Redux state

  //   useEffect(() => {
  //     if (!isAuthenticated) navigate('/login')
  //   }, [isAuthenticated, navigate])

  return (
    <div className="flex h-screen overflow-hidden">
      <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex w-full pt-16">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="relative flex-1 h-screen overflow-x-hidden overflow-y-auto bg-primary">
          <div className="relative px-4 pt-8 pb-12 mx-auto max-w-screen-2xl shadow-2 md:px-6 2xl:px-11 lg:pt-16 ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
