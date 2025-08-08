import { BiUser, BiTrophy, BiHistory, BiBell, BiWallet, BiUpload, BiLogOut } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import avatar from '../../assets/icons/Netflix-avatar.png'
import { TiTicket } from 'react-icons/ti'
import NotificationBell from '../common/NotificationBell'
import { motion, AnimatePresence } from 'framer-motion'

// Navigation Options Component
const getNavOptions = (translate) => [
  { icon: BiUser, label: translate('profile'), to: '/dashboard/my-account' },
  { icon: TiTicket, label: translate('tickets'), to: '/dashboard/buy-ticket' },
  { icon: BiTrophy, label: translate('results'), to: '/dashboard/results' },
  { icon: BiHistory, label: translate('history'), to: '/dashboard/draws' },
  { icon: BiUpload, label: translate('Upload Winner'), to: '/dashboard/upload-winner-number' },
]



// Header Component
const Header = () => {
  return (
    <div className="overflow-x-auto flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
      <span className=" font-bold  text-white tracking-wider text-lg sm:text-xl whitespace-nowrap">
        World Lottery
      </span>
    </div>
  )
}

// User Profile Component
const UserProfile = ({ user }) => {
  const { translate } = useLanguage()
  const initial = user?.firstName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U';
  return (
    <div className="flex flex-col items-center py-6 border-b border-white/10">
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt="Avatar"
          className="size-10 rounded-full border-2 border-[#FFD700] shadow object-cover"
        />
      ) : (
        <div className="size-12 text-sm flex items-center justify-center rounded-full border-2 border-[#FFD700] shadow bg-gradient-to-br from-[#FFD700] to-[#FFC300] text-[#232946]  font-bold">
          {initial}
        </div>
      )}
      <div className="mt-2 text-center">
        <div className="font-bold text-white">{user?.firstName || translate('user')}</div>
        <div className="text-[10px] text-gray-400">{user?.email || ''}</div>
      </div>
    </div>
  )
}

// Navigation Menu Component
const Navigation = ({ location }) => {
  const { translate } = useLanguage()
  const navOptions = getNavOptions(translate)

  return (
    <nav className="flex-1 flex flex-col gap-2 mt-4 px-2 overflow-x-auto">
      {navOptions.map(({ icon: Icon, label, to }) => (
        <Link
          key={to}
          to={to}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition whitespace-nowrap ${location.pathname === to
            ? 'bg-[#FFD700]/50 text-zinc-900 font-bold'
            : 'text-white hover:bg-[#FFD700]/40'
            }`}
        >
          <Icon className="text-xl sm:text-2xl text-amber-400" />
          <span className="text-sm sm:text-sm">{label}</span>
        </Link>
      ))}
    </nav>
  )
}

// Security Section Component
const SecuritySection = () => {
  const { logout } = useAuth()
  const { translate } = useLanguage()
  const handleLogout = () => {
    if (window.confirm(translate('are_you_sure_logout') || 'Are you sure you want to log out?')) {
      logout()
    }
  }

  return (
    <div className="mt-auto p-4 space-y-3">
      {/* Language Selector */}

      {/* Improved Logout Button */}
      <button
        className="w-full py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-bold flex items-center justify-center gap-2 shadow hover:from-red-600 hover:to-red-700 transition"
        onClick={handleLogout}
        aria-label={translate('log_out')}
      >
        <BiLogOut className="text-xl" />
        <span>{translate('log_out')}</span>
      </button>
    </div>
  )
}

// Main Sidebar Component
const Sidebar = () => {
  const { user } = useAuth()
  const location = useLocation()

  // Temporary: allow all users to upload winner numbers
  const isAdmin = true;

  return (
    <>
      <aside
        className="fixed hidden lg:block  top-0 left-0 h-screen w-64 z-40 bg-zinc-900 border-r border-zinc-700"
      >
        <Header />
        <UserProfile user={user} />
        <Navigation location={location} />
        <SecuritySection />
      </aside>
      {/* NotificationBell fixed to right side of screen */}
      <AnimatePresence>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          className="fixed top-8 right-6 z-[120]"
        >
          <NotificationBell />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Sidebar
