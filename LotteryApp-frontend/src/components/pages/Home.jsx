import { BsInstagram, BsTelephone, BsTiktok, BsTwitterX } from 'react-icons/bs'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import TicketCard from '../layout/TicketCard'
import { MdEmail } from 'react-icons/md'

const Home = () => {
  return (
    <>
      <div className="relative bg-[url(./assets/covers/homecover.jpg)] bg-cover bg-center min-h-[60vh] md:h-screen text-white flex flex-col items-center justify-between p-0 overflow-hidden">
        {/* Overlay: vertical fade */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#232946]/80 via-transparent to-[#232946]/90"></div>
        <div className="relative z-10 w-full h-full flex flex-col">
          <Navbar />
          <div className="flex-1 flex flex-col items-center justify-center font-secondary uppercase px-4 py-8 md:py-0">
            <h1 className="tracking-wider text-3xl sm:text-4xl md:text-5xl font-extrabold font-title text-[#FFD700] drop-shadow-lg mb-4 text-center">
              Welcome to the Lottery App
            </h1>
            <p className="tracking-wide text-base sm:text-lg md:text-xl text-[#F5F5F5] mb-2 font-light text-center">
              Participate in exciting lottery draws and win amazing prizes!
            </p>
            <p className="text-[#FFD700] mb-1 text-center">
              Stay tuned for the next draw!
            </p>
            <p className="font-title text-xl md:text-2xl text-white drop-shadow text-center">
              Good luck!
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row bg-[#232946] relative justify-center items-center flex-wrap gap-4 p-4  z-20">
        <TicketCard />
      </div>

      <div className="w-full flex flex-col items-center justify-evenly bg-[#232946] text-white py-8 px-2 sm:px-4">
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
