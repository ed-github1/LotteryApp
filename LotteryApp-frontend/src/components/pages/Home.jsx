import { BsInstagram, BsTelephone, BsTiktok, BsTwitterX } from 'react-icons/bs'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import TicketCard from '../layout/TicketCard'
import { MdEmail } from 'react-icons/md'
import DrawCountdown from '../common/DrawCountdown'
import { useOrders } from '../../context/OrdersContext'
import { useTicket } from '../../context/TicketContext';
import { Link } from 'react-router-dom'
const Home = () => {
  const { drawDates } = useOrders();
  const { countryConfigs } = useTicket();
  // Find the soonest future draw object
  const soonestDraw = Array.isArray(drawDates) && drawDates.length > 0
    ? drawDates.reduce((min, curr) => {
      return new Date(curr.drawDate) < new Date(min.drawDate) ? curr : min;
    }, drawDates[0])
    : null;
  const nextDrawDate = soonestDraw ? soonestDraw.drawDate : null;
  const nextCountry = soonestDraw ? countryConfigs.find(c => c.code === soonestDraw.countryCode) : null;

  return (
    <>
      <div className="relative min-h-[70vh] flex flex-col items-center justify-center bg-zinc-800 text-white overflow-hidden">
        <Navbar />
        {/* Hero Section - Modern, Professional, Casual */}
        <section className="w-full flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4 pt-24 pb-12 relative">
          {/* Left: Headline & CTA */}
          <div className="flex-1 flex flex-col items-start justify-center gap-8 z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-left bg-gradient-to-r from-[#FFD700] to-zinc-100 bg-clip-text text-transparent drop-shadow-xl">
              Play the World’s<br />Most Exciting Lottery
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 mb-4 max-w-lg">
              Pick your lucky numbers, join global draws, and win big—every week. Fun, fair, and open to everyone!
            </p>
            <Link to="/register" className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#FFD700] to-zinc-200 text-zinc-900 font-extrabold text-xl shadow-xl hover:from-zinc-200 hover:to-[#FFD700] hover:text-[#232946] transition-all duration-200">
              Play Now
            </Link>
          </div>
          {/* Right: Modern Lottery Illustration */}
          <div className="flex-1 flex items-center justify-center z-0">
            <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-zinc-800 via-[#FFD700]/20 to-zinc-900 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden">
              {/* Gold glow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-10 bg-gradient-to-r from-[#FFD700]/40 via-zinc-200/30 to-zinc-800/40 blur-2xl opacity-70"></div>
              {/* SVG Lottery Ball */}
              <svg viewBox="0 0 200 200" className="relative z-10 w-40 h-40 md:w-60 md:h-60">
                <defs>
                  <radialGradient id="lotteryBallHero" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="80%" stopColor="#bfae5a" />
                    <stop offset="100%" stopColor="#232946" />
                  </radialGradient>
                </defs>
                <circle cx="100" cy="100" r="90" fill="url(#lotteryBallHero)" />
                <ellipse cx="100" cy="120" rx="70" ry="30" fill="#fff" fillOpacity="0.08" />
                <text x="100" y="115" textAnchor="middle" fontSize="38" fill="#FFD700" fontWeight="bold">$60M+</text>
                <text x="100" y="145" textAnchor="middle" fontSize="20" fill="#fff">Jackpot</text>
              </svg>
              {/* Confetti or sparkles for casual/fun vibe */}
              <div className="absolute top-8 left-10 w-2 h-2 bg-[#FFD700] rounded-full opacity-80 animate-pulse"></div>
              <div className="absolute top-16 right-12 w-3 h-3 bg-zinc-200 rounded-full opacity-60 animate-ping"></div>
              <div className="absolute bottom-10 right-16 w-1.5 h-1.5 bg-[#FFD700] rounded-full opacity-70 animate-pulse"></div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Next Draw Countdown Cards */}
      <div className="flex justify-center items-center py-8 bg-zinc-800">
        <div className="backdrop-blur-lg bg-white/10 border border-white/30 rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6 min-w-[320px] max-w-xs transition-all duration-300 hover:scale-[1.03]">
          {nextCountry && (
            <img
              src={nextCountry.flag}
              alt={nextCountry.name}
              className="h-16 w-16 object-contain drop-shadow-lg mb-2 animate-bounce"
              style={{ animationDuration: '2s' }}
            />
          )}
          <span className="text-2xl font-extrabold text-white tracking-wide mb-1 drop-shadow-lg">
            {nextCountry ? nextCountry.name : 'Next Draw'}
          </span>
          <span className="text-sm text-[#FFD700] font-semibold mb-2 tracking-wide">
            {nextDrawDate ? new Date(nextDrawDate).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }) : 'No upcoming draw'}
          </span>
          <div className="w-full flex justify-center">
            <DrawCountdown drawDate={nextDrawDate} />
          </div>
          <Link to='/register' className="mt-4 px-6 py-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFC300] text-[#232946] font-bold text-lg shadow-lg hover:from-[#FFC300] hover:to-[#FFD700] hover:text-[#232946] transition-all duration-200">
            Play Now!
          </Link>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-evenly bg-zinc-800 text-white py-8 px-2 sm:px-4">
        <h3 className="font-title text-xl sm:text-2xl mb-6 text-center font-thin">
          Success is within your reach, make it yours!
        </h3>

        {/* Contact Section */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 items-center">
          <div className="flex items-center gap-2">
            <BsTelephone aria-label="Phone" />
            <span className="text-sm sm:text-base">742-322-212-12</span>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail aria-label="Email" />
            <span className="text-sm sm:text-base">lotteryApp@info.com</span>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex gap-4 sm:gap-6">

          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="text-xl sm:text-2xl"
          >
            <BsInstagram />
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="text-xl sm:text-2xl"
          >
            <BsTwitterX />
          </a>
          <a
            href="https://tiktok.com"
            aria-label="TikTok"
            className="text-xl sm:text-2xl"
          >
            <BsTiktok />
          </a>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home
