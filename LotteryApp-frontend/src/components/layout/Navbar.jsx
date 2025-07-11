import { Link } from 'react-router-dom'
import { IoGrid } from 'react-icons/io5'

const Links = ({ to, className, text }) => (
  <Link
    to={to}
    className={`inline-block min-w-[80px] text-center rounded-md px-3 py-2 transition font-semibold ${className}`}
  >
    {text}
  </Link>
)

function Navbar() {
  return (
    <nav className="w-full z-50 px-4 py-4 flex flex-col sm:flex-row items-center justify-between bg-transparent backdrop-blur-xl text-white gap-4 sm:gap-0">
      <div className="flex items-center gap-2">
        <IoGrid className="text-2xl" />
        <h1 className="text-xl font-extrabold font-title tracking-wider">
          Lottery App
        </h1>
      </div>
      <div className="flex gap-2">
        <Links
          to="/register"
          className="text-white hover:bg-white/10"
          text="Sign Up"
        />
        <Links
          to="/login"
          className="bg-white text-black hover:bg-[#FFD700] hover:text-black"
          text="Log In"
        />
      </div>
    </nav>
  )
}

export default Navbar
