import {
  BiUser,
  BiTrophy,
  BiHistory,

} from 'react-icons/bi'
import { BsFillTicketFill } from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'

const navOptions = [
  { icon: BsFillTicketFill, label: 'Boletos', to: '/dashboard/buy-ticket' },
  { icon: BiTrophy, label: 'Resultados', to: '/dashboard/results' },
  { icon: BiHistory, label: 'Historial', to: '/dashboard/draws' },
  { icon: BiUser, label: 'My Account', to: '/dashboard/my-account' },
]

const BottomNav = () => {
  const location = useLocation()
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-zinc-800/50 backdrop-blur-lg z-50 flex justify-around items-center py-2 shadow-lg sm:hidden">
      {navOptions.map(({ icon: Icon, label, to }) => {
        const active = location.pathname === to
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center text-xs font-semibold px-2 py-1 transition ${active ? 'text-[#FFD700]' : 'text-white'
              }`}
            aria-label={label}
          >
            <Icon size={24} />
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomNav