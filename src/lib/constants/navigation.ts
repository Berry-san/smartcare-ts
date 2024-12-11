import dashboard from '../../assets/dashboard.svg'
import activeDashboard from '../../assets/activeDashboard.svg'
import users from '../../assets/users.svg'
import activeUsers from '../../assets/activeUsers.svg'
import videos from '../../assets/videos.svg'
import activeVideos from '../../assets/activeVideos.svg'
import article from '../../assets/article.svg'
import activeArticle from '../../assets/activeArticle.svg'

export const UserSidebarLinks = [
  {
    label: 'Dashboard',
    href: '/',
    icon: dashboard,
    activeIcon: activeDashboard,
    id: 1,
  },
  {
    label: 'Users',
    href: '/users',
    icon: users,
    activeIcon: activeUsers,
    id: 2,
  },
  {
    label: 'Videos',
    href: '/videos',
    icon: videos,
    activeIcon: activeVideos,
    id: 3,
  },
  {
    label: 'Articles',
    href: '/articles',
    icon: article,
    activeIcon: activeArticle,
    id: 4,
  },
  {
    label: 'Business',
    href: '/business',
    icon: article,
    activeIcon: activeArticle,
    id: 4,
  },
]
