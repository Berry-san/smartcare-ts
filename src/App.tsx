import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from './Global/Layout'
import Dashboard from './Pages/Dashboard'
import Users from './Pages/Users'
import Videos from './Pages/Videos'
import AllComments from './Pages/AllComments'
import Articles from './Pages/Articles'
import WriteArticle from './Pages/WriteArticle'
import Login from 'Pages/Auth/Login'
import SignUp from 'Pages/Auth/SignUp'
import ResetPassword from 'Pages/Auth/ResetPassword'
import ForgotPassword from 'Pages/Auth/ForgotPassword'
import useAuthStore from 'Store/authStore'

function App() {
  // const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }))

  const authChecker = user?.isAuthenticated

  return (
    <Routes>
      <Route
        path="/login"
        element={authChecker ? <Navigate replace to="/" /> : <Login />}
      />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="videos" element={<Videos />} />
        <Route path="comments" element={<AllComments />} />
        <Route path="articles" element={<Articles />} />
        <Route path="write-article" element={<WriteArticle />} />
      </Route>
      <Route index element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
