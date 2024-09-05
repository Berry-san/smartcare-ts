import Logout from 'Pages/Auth/Logout'
import hamburger from '../assets/hamburger.svg'
import smartcareLogo from '../assets/smartcareLogo.svg'

interface TopbarProps {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Topbar: React.FC<TopbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="fixed top-0 z-30 flex w-full bg-white border-b border-border_color drop-shadow-2">
      <div className="flex items-center justify-between flex-grow px-3 md:px-6 py-2.5 lg:h-16 shadow-2 2xl:px-11">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="items-center hidden pl-4 text-black lg:flex">
            <img src={smartcareLogo} className="w-12 h-12" alt="" />
            <p className="font-bold text-secondary">Smartcare</p>
          </div>
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
