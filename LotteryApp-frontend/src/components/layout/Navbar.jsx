import { Link } from 'react-router-dom'
import { IoGrid } from 'react-icons/io5'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const Links = ({ to, className, text, onClick }) => (
  <Link
    to={to}
    className={`inline-block min-w-[80px] text-center rounded-md px-3 py-2 transition font-semibold ${className}`}
    onClick={onClick}
  >
    {text}
  </Link>
)

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/faqs', text: 'FAQs' },
    { to: '/terms', text: 'Terms & Conditions' },
    { to: '/about', text: 'About Us' },
    { to: '/register', text: 'Sign Up' },
    { to: '/login', text: 'Log In', className: 'bg-white text-black hover:bg-[#FFD700] hover:text-black' }
  ]

  return (
    <nav className="w-full z-50 px-4 py-4 flex items-center justify-between bg-transparent backdrop-blur-xl text-white relative">
      <div className="flex items-center gap-2">
        <IoGrid className="text-2xl" />
        <h1 className="text-xl font-extrabold font-title tracking-wider">
          World Lottery
        </h1>
      </div>
      {/* Desktop Links */}
      <div className="hidden md:flex gap-2">
        {navLinks.map((link, idx) => (
          <Links
            key={link.to}
            to={link.to}
            className={link.className || 'text-white hover:bg-white/10'}
            text={link.text}
          />
        ))}
      </div>
      {/* Mobile Hamburger */}
      <button
        className={`md:hidden text-3xl focus:outline-none z-[101] ${menuOpen ? 'text-white' : 'text-[#FFD700]'}`}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((open) => !open)}
        style={{ position: 'relative' }}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#232946] shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col pt-24 px-6 gap-4`}
        style={{ boxShadow: menuOpen ? '0 0 40px #FFD70040' : undefined }}
      >
        {navLinks.map((link, idx) => (
          <Links
            key={link.to}
            to={link.to}
            className={`w-full text-lg py-3 px-4 rounded-xl font-bold ${link.className || 'text-white hover:bg-[#FFD700]/10'}`}
            text={link.text}
            onClick={() => setMenuOpen(false)}
          />
        ))}
      </div>
      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[99] md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  )
}

export default Navbar
