import { useState } from 'react'
import { useTicket } from '../../../context/TicketContext'
import { useNavigate } from 'react-router-dom'

import ProgressBar from './ProgressBar'
import TicketSummary from './TicketSummary'

//flags-imgs
import it from '../../../assets/country-flags/it.svg'
import ca from '../../../assets/country-flags/ca.svg'
import mx from '../../../assets/country-flags/mx.svg'
import nz from '../../../assets/country-flags/nz.svg'
import kr from '../../../assets/country-flags/kr.svg'
import ie from '../../../assets/country-flags/ie.svg'
import gb from '../../../assets/country-flags/gb.svg'
import fr from '../../../assets/country-flags/fr.png'

import NumberSelectionGrid from './NumberSelectionGrid'
import CountriesGrid from './CountriesGrid'
import CountryNumberSelector from '.'




const countryConfigs = [
  { code: 'IT', name: 'Italia', flag: it, totalNumbers: 90 },
  { code: 'CA', name: 'Canada', flag: ca, totalNumbers: 49 },
  { code: 'MX', name: 'Mexico', flag: mx, totalNumbers: 56 },
  { code: 'NZ', name: 'New Zealand', flag: nz, totalNumbers: 40 },
  { code: 'KR', name: 'South Korea', flag: kr, totalNumbers: 45 },
  { code: 'IE', name: 'Ireland', flag: ie, totalNumbers: 47 },
  { code: 'UK', name: 'United Kingdom', flag: gb, totalNumbers: 59 },
  { code: '+', name: 'additional', flag: fr, totalNumbers: 10 }
]


const MAX_TICKETS = 10

// --- Main Component ---

const LotteryMatrix = () => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countrySelections, setCountrySelections] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const { tickets, addTicket, removeTicket, PRICE_PER_SELECTION } = useTicket()
  const navigate = useNavigate()


  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    if (!showModal) {
      setShowModal(true)
    }
  }

  const handleNumberSelect = (number) => {
    if (selectedCountry) {
      setCountrySelections((prev) => ({
        ...prev,
        [selectedCountry.code]: number
      }))
      if (showModal) {
        setShowModal(false)
      }
    }
  }

  const handleDeleteTicket = (idx) => {
    removeTicket(idx)
  }

  const handleSaveTicket = () => {
    const selectedCount = Object.keys(countrySelections).filter(
      (key) =>
        countrySelections[key] !== undefined && countrySelections[key] !== null
    ).length

    // Check if max tickets limit is reached
    if (tickets.length >= MAX_TICKETS) {
      alert(`Maximum ${MAX_TICKETS} tickets per purchase allowed!`)
      return
    }

    if (selectedCount > 0) {
      addTicket(countrySelections, selectedCount)
      setCountrySelections({})
      setSelectedCountry(null)
    }
  }

  const calculateTotal = () => {
    return (
      Object.keys(countrySelections).filter((key) => countrySelections[key])
        .length * PRICE_PER_SELECTION
    )
  }

  const handleRandomize = () => {
    const randomSelections = {}
    countryConfigs.forEach((country) => {
      const randomNumber = Math.floor(Math.random() * country.totalNumbers) + 1
      randomSelections[country.code] = randomNumber
    })
    setCountrySelections(randomSelections)
  }

  return (
    <div className="min-h-screen bg-zinc-800">
      {/* Instructions container */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg w-fit py-2 border border-white/20">
        <p className="text-sm text-white/90 text-center">
          🌍 Select numbers from 8 countries • Win up to $60M
        </p>
      </div>
      {/* Lottery Ticket Form */}
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 mb-6 relative overflow-hidden">
      <CountriesGrid /> 
        <ProgressBar
          countryConfigs={countryConfigs}
          countrySelections={countrySelections}
        />
        {/* Selected Country Info */}
        {selectedCountry && (
          <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFC300]/20 backdrop-blur-sm rounded-xl p-4 mb-4 border border-[#FFD700]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={selectedCountry.flag}
                    alt={selectedCountry.name}
                    className="h-8 w-8 rounded-full border-2 border-[#FFD700] shadow-md"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">✓</span>
                  </div>
                </div>
                <div>
                  <span className="font-bold text-white text-lg">
                    {selectedCountry.name}
                  </span>
                  <div className="text-xs text-[#FFD700]">
                    🎯 Select your lucky number
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-white/80 font-medium">
                  Range: 1-{selectedCountry.totalNumbers}
                </span>
                <div className="text-xs text-[#FFD700]">
                  💰 ${PRICE_PER_SELECTION} each
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-md space-y-4">
        {/* Tickets Counter */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎫</span>
              <span className="text-white font-semibold">Your Tickets</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#FFD700] font-bold text-lg">{tickets.length}</span>
              <span className="text-white/60">/</span>
              <span className="text-white/60">{MAX_TICKETS}</span>
            </div>
          </div>
          <div className="mt-2 bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#FFD700] to-[#FFC300] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(tickets.length / MAX_TICKETS) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Randomize Button */}
        <button
          onClick={handleRandomize}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span className="text-xl">🎲</span>
          <span>Quick Pick (Random)</span>
        </button>

        {/* Save Ticket Button */}
        <button
          className={`w-full py-4 rounded-xl text-lg font-bold shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 ${Object.keys(countrySelections).filter(
            (key) => countrySelections[key]
          ).length > 0 && tickets.length < MAX_TICKETS
            ? 'bg-gradient-to-r from-[#FFD700] to-[#FFC300] text-[#232946] hover:from-[#FFC300] hover:to-[#FFD700] transform hover:scale-105 shadow-[#FFD700]/50'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          disabled={
            Object.keys(countrySelections).filter(
              (key) => countrySelections[key]
            ).length === 0 || tickets.length >= MAX_TICKETS
          }
          onClick={handleSaveTicket}
        >
          <span className="text-xl">🎰</span>
          <span>
            {tickets.length >= MAX_TICKETS
              ? `Max ${MAX_TICKETS} Tickets Reached`
              : `Add Ticket - $${calculateTotal()}`
            }
          </span>
        </button>

        {/* Review Order Button - navigates to OrderSummary page */}
        <button
          className={`w-full py-4 rounded-xl text-lg font-bold shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 ${tickets.length === 0
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105'
            }`}
          disabled={tickets.length === 0}
          onClick={navigate()}
        >
          <span className="text-xl">🛒</span>
          <span>Review & Purchase ({tickets.length} ticket{tickets.length !== 1 ? 's' : ''})</span>
        </button>
      </div>

      {/* Ticket Summary always as modal
      <button
        className="fixed top-6 right-6 z-[110] w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg flex items-center justify-center border-4 border-white"
        onClick={() => setShowTicketModal(true)}
        aria-label="View Ticket Summary"
        style={{ position: 'relative', zIndex: 110 }}
      >
        <TbTicket className="text-4xl text-yellow-900" />
      </button> */}

      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowTicketModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-center mb-4">Your Tickets</h2>
            {tickets.length === 0 ? (
              <div className="bg-gray-100 rounded-xl p-8 text-center text-gray-400 font-bold text-lg shadow-md">
                No tickets yet. Add a ticket to get started!
              </div>
            ) : (
              <TicketSummary
                tickets={tickets}
                handleDeleteTicket={handleDeleteTicket}
                countryConfigs={countryConfigs}
              />
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <NumberSelectionGrid
          selectedCountry={selectedCountry}
          countrySelections={countrySelections}
          handleNumberSelect={handleNumberSelect}
          isModal={true}
          onClose={() => setShowModal(false)}
          onRandomize={handleRandomize}
        />
      )}
    </div>
  )
}

export default LotteryMatrix
