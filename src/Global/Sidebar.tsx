import React, { useRef, useEffect, useState } from 'react'
import { UserSidebarLinks } from '../lib/constants/navigation'
import { NavLink } from 'react-router-dom'
import back from '../assets/back.svg'
import logo from '../assets/logo.svg'
import smartcareLogo from '../assets/smartcareLogo.svg'

// import other imports as needed

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface Link {
  id: number
  href: string
  icon: string
  activeIcon: string
  label: string
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const trigger = useRef<HTMLButtonElement>(null)
  const sidebar = useRef<HTMLElement>(null)

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  )

  const [overlayActive, setOverlayActive] = useState<boolean>(false)

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return
      setSidebarOpen(false)
    }

    const resizeHandler = () => {
      if (window.innerWidth >= 1279) {
        setSidebarOpen(false)
        setOverlayActive(false)
      }
    }
    document.addEventListener('click', clickHandler)
    window.addEventListener('resize', resizeHandler)
    return () => {
      document.removeEventListener('click', clickHandler)
      window.removeEventListener('resize', resizeHandler)
    }
  }, [sidebarOpen, setSidebarOpen])

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }

    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [sidebarOpen, setSidebarOpen])

  useEffect(() => {
    sessionStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded')
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded')
    }
    setOverlayActive(sidebarOpen)
  }, [sidebarExpanded, sidebarOpen])

  return (
    <div className="relative scrollbar">
      {overlayActive && window.innerWidth <= 1024 && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black opacity-40"
        ></div>
      )}
      <aside
        ref={sidebar}
        className={`fixed left-0 top-0 inset-0 z-40 bg-white scrollbar-none flex h-screen w-80 lg:w-72 flex-col overflow-y-hidden bg-green px-7 duration-300 ease-linear lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between gap-2 pt-5 lg:hidden">
          <div>
            <img src={smartcareLogo} className="w-12 h-12" alt="" />
          </div>
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <img src={back} alt="" className="flex w-5 h-5" />
          </button>
        </div>
        {/* SIDEBAR HEADER */}

        <div className="flex flex-col flex-1 overflow-y-auto duration-300 ease-linear">
          {/* Sidebar Menu */}
          <nav className="py-8 lg:px-10">
            {/* Menu Group */}
            <div>
              <ul className="flex flex-col gap-2 mb-6 space-y-5">
                {/* Menu Item Dashboard */}

                {UserSidebarLinks.map((link) => (
                  <SidebarLinks
                    key={link.id}
                    link={link}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  )
}

interface SidebarLinksProps {
  link: Link
  onClick: () => void
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({ link, onClick }) => {
  return (
    <li>
      <NavLink
        onClick={onClick}
        to={link.href}
        className={({ isActive }) =>
          isActive
            ? 'group relative flex items-center gap-5 font-semibold rounded-sm py-2 text-secondary duration-300 ease-in-out'
            : 'group relative flex items-center gap-5 font-semibold rounded-sm py-2 text-dark_color duration-300 ease-in-out'
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? link.activeIcon : link.icon}
              className="w-6 h-6"
              alt={link.label}
            />
            {link.label}
          </>
        )}
      </NavLink>
    </li>
  )
}

export default Sidebar
