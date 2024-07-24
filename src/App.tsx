import { Routes, Route } from 'react-router'
import Layout from './Global/Layout'
import Dashboard from './Pages/Dashboard'
import Users from './Pages/Users'
import Videos from './Pages/Videos'
import AllComments from './Pages/AllComments'
import Articles from './Pages/Articles'
import WriteArticle from './Pages/WriteArticle'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="videos" element={<Videos />} />
        <Route path="comments" element={<AllComments />} />
        <Route path="articles" element={<Articles />} />
        <Route path="write-article" element={<WriteArticle />} />
      </Route>
    </Routes>
  )
}

export default App
