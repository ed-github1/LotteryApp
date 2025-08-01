import { BiUser, BiTrophy, BiHistory, BiBell, BiWallet } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import avatar from '../../assets/icons/Netflix-avatar.png'
import { useState } from 'react'
import { TiTicket } from 'react-icons/ti'
import LanguageSelector from '../common/LanguageSelector'

// Navigation Options Component
const getNavOptions = (translate) => [
  { icon: BiUser, label: translate('profile'), to: '/dashboard/my-account' },
  { icon: TiTicket, label: translate('tickets'), to: '/dashboard/buy-ticket' },
  { icon: BiTrophy, label: translate('results'), to: '/dashboard/results' },
  { icon: BiHistory, label: translate('history'), to: '/dashboard/draws' },
]



// Header Component
const Header = () => {
  const { translate } = useLanguage()
  
  return (
    <div className="overflow-x-auto flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
      <span className="font-bold text-lg sm:text-xl text-white whitespace-nowrap">
        {translate('my_dashboard')}
      </span>
      <button className="relative" aria-label={translate('notifications')}>
        <BiBell className="text-[#FFD700] text-2xl sm:text-3xl" />
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
      </button>
    </div>
  )
}

// User Profile Component
const UserProfile = ({ user }) => {
  const { translate } = useLanguage()
  
  return (
    <div className="flex flex-col items-center py-6 border-b border-white/10">
      <img
        src={user?.avatar || avatar}
        alt="Avatar"
        className="w-16 h-16 rounded-full border-2 border-[#FFD700] shadow"
      />
      <div className="mt-2 text-center">
        <div className="font-bold text-white">{user?.name || translate('user')}</div>
        <div className="text-xs text-gray-400">{user?.email || ''}</div>
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
            ? 'bg-[#FFD700] text-zinc-900 font-bold'
            : 'text-white hover:bg-[#FFD700]/40'
            }`}
        >
          <Icon className="text-xl sm:text-2xl text-amber-400" />
          <span className="text-base sm:text-lg">{label}</span>
        </Link>
      ))}
    </nav>
  )
}

// Security Section Component
const SecuritySection = () => {
  const { logout } = useAuth()
  const { translate } = useLanguage()
  
  return (
    <div className="mt-auto p-4 space-y-3">
      {/* Language Selector */}
      <LanguageSelector />
      
      {/* Logout Button */}
      <button
        className="w-full py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition"
        onClick={logout}
      >
        {translate('log_out')}
      </button>
    </div>
  )
}

// Main Sidebar Component
const Sidebar = () => {
  const { user } = useAuth()
  const location = useLocation()

  return (
    <aside
      className={`
        hidden sm:fixed sm:top-0 sm:left-0 sm:h-full sm:z-50 bg-gradient-to-br from-[#232946] via-[#1a1d2e] to-[#232946] backdrop-blur-xl sm:shadow-lg sm:flex sm:flex-col sm:w-64 sm:min-h-screen
      `}
    >
      <Header />
      <UserProfile user={user} />
      <Navigation location={location} />
      <SecuritySection />
    </aside>
  )
}

export default Sidebar
