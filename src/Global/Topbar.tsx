import Logout from 'Pages/Auth/Logout'
import hamburger from '../assets/hamburger.svg'

interface TopbarProps {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Topbar: React.FC<TopbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="fixed top-0 z-30 flex w-full bg-white border-b border-border_color drop-shadow-2">
      <div className="flex items-center justify-between flex-grow px-3 md:px-6 py-2.5 lg:justify-end lg:h-16 shadow-2 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation()
              setSidebarOpen(!sidebarOpen)
            }}
            className="z-40 block bg-white p-1.5 lg:hidden"
          >
            <img src={hamburger} className="w-8 h-8" alt="" />
          </button>
        </div>

        <Logout />
      </div>
    </header>
  )
}

export default Topbar
