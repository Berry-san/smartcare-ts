import React, { useRef, useEffect, useState } from 'react'
import { UserSidebarLinks } from '../lib/constants/navigation'
import { NavLink } from 'react-router-dom'
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

  const [overlayActive, setOverlayActive] = useState(false)

  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }) => {
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
    const keyHandler = ({ keyCode }: { keyCode: number }) => {
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
    <div className="">
      {overlayActive && window.innerWidth <= 1024 && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="absolute inset-0 z-40 bg-black opacity-40"
        ></div>
      )}
      <aside
        ref={sidebar}
        className={`fixed top-16 left-0 z-99 scrollbar-none flex h-[calc(100vh-4rem)] w-72 flex-col overflow-y-hidden bg-primary px-5 duration-300 border-r-2 border-border_color ease-linear lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto duration-300 ease-linear">
          {/* Sidebar Menu */}
          <nav className="px-4 py-6 mt-5 lg:mt-5 lg:pb-10 lg:px-6">
            {/* Menu Group */}
            <div>
              <ul className="flex flex-col gap-10 mb-6">
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

          <div className="flex items-center justify-start flex-1 px-4 space-x-5 lg:px-6"></div>
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
            ? 'group relative flex items-center gap-2.5 font-semibold rounded-sm py-2 text-secondary duration-300 ease-in-out'
            : 'group relative flex items-center gap-2.5 font-semibold rounded-sm py-2 text-dark_color duration-300 ease-in-out'
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
