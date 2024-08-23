import useAuthStore from 'Store/authStore'
import { useNavigate } from 'react-router-dom'

import logoutIcon from '../../assets/logout.svg'

const Logout = () => {
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-end space-x-3 font-mono font-medium text-warning"
    >
      <p className="hidden md:flex">Sign Out</p>
      <img src={logoutIcon} className="w-7 h-7" alt="Logout" />
    </button>
  )
}

export default Logout
