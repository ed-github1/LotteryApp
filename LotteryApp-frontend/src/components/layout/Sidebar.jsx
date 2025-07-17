import { BiUser, BiTrophy, BiHistory, BiBell, BiWallet } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import avatar from '../../assets/icons/Netflix-avatar.png'
import { useState } from 'react'
import { TiTicket } from 'react-icons/ti'

// Navigation Options Component
const NavOptions = [
  { icon: BiUser, label: 'Profile', to: '/dashboard/my-account' },
  { icon: BiWallet, label: 'Wallet', to: '/dashboard/settings' },
  { icon: TiTicket, label: 'Tickets', to: '/dashboard/buy-ticket' },
  { icon: BiTrophy, label: 'Results', to: '/dashboard/results' },
  { icon: BiHistory, label: 'History', to: '/dashboard/draws' },
]

// Mobile Menu Button Component
const MenuButton = ({ onClick }) => (
  <button
    className="sm:hidden fixed top-4 left-4 z-50 bg-[#FFD700] p-2 rounded-full shadow"
    onClick={onClick}
    aria-label="Open menu"
  >
    <svg width="24" height="24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
)

// Header Component
const Header = () => (
  <div className="overflow-x-auto flex items-center justify-between bg-gradient-to-r from-[#FFD700] to-[#FFC300] px-4 py-3 sm:px-6 sm:py-4">
    <span className="font-bold text-lg sm:text-xl text-gray-900 whitespace-nowrap">My Dashboard</span>
    <button className="relative" aria-label="Notifications">
      <BiBell className="text-gray-700 text-2xl sm:text-3xl" />
      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
    </button>
  </div>
)

// User Profile Component
const UserProfile = ({ user }) => (
  <div className="flex flex-col items-center py-6 border-b">
    <img
      src={user?.avatar || avatar}
      alt="Avatar"
      className="w-16 h-16 rounded-full border-2 border-[#FFD700] shadow"
    />
    <div className="mt-2 text-center">
      <div className="font-bold text-gray-800">{user?.name || 'User'}</div>
      <div className="text-xs text-gray-500">{user?.email || ''}</div>
    </div>
  </div>
)

// Navigation Menu Component
const Navigation = ({ location }) => (
  <nav className="flex-1 flex flex-col gap-2 mt-4 px-2 overflow-x-auto">
    {NavOptions.map(({ icon: Icon, label, to }) => (
      <Link
        key={to}
        to={to}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition whitespace-nowrap ${
          location.pathname === to
            ? 'bg-[#FFD700] text-gray-900 font-bold'
            : 'text-gray-600 hover:bg-yellow-50'
        }`}
      >
        <Icon className="text-xl sm:text-2xl" />
        <span className="text-base sm:text-lg">{label}</span>
      </Link>
    ))}
  </nav>
)

// Security Section Component
const SecuritySection = () => {
  const { logout } = useAuth()
  return (
    <div className="mt-auto p-4">
      <button
        className="w-full py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition"
        onClick={logout}
      >
        Log Out
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
        hidden sm:fixed sm:top-0 sm:left-0 sm:h-full sm:z-50 sm:bg-white sm:shadow-lg sm:flex sm:flex-col sm:w-64 sm:min-h-screen
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
