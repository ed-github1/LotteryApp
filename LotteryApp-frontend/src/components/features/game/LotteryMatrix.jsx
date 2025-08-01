import { useState } from 'react'
import { useTicket } from '../../../context/TicketContext'

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

import OrderSummary from '../Payment/OrderSummary'
import NumberSelectionGrid from './NumberSelectionGrid'
import CountriesGrid from '../game/CountriesGrid'

const countryConfigs = [
  { code: 'IT', name: 'Italia', flag: it, totalNumbers: 90 },
  { code: 'CA', name: 'Canada', flag: ca, totalNumbers: 49 },
  { code: 'MX', name: 'Mexico', flag: mx, totalNumbers: 56 },
  { code: 'NZ', name: 'New Zealand', flag: nz, totalNumbers: 40 },
  { code: 'KR', name: 'South Korea', flag: kr, totalNumbers: 45 },
  { code: 'IE', name: 'Ireland', flag: ie, totalNumbers: 47 },
  { code: 'UK', name: 'United Kingdom', flag: gb, totalNumbers: 59 },
  { code: '➕', name: 'additional', flag: fr, totalNumbers: 10 }
]

const MAX_TICKETS = 10
const TICKET_PRICE = 0.4

// --- Main Component ---
const LotteryMatrix = () => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countrySelections, setCountrySelections] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const { tickets, addTicket, removeTicket } = useTicket()

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
        .length * TICKET_PRICE
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
    <div className="flex flex-col-reverse lg:flex-row lg:justify-between bg-gradient-to-br from-[#232946] via-[#1a1d2e] to-[#232946] min-h-screen w-full p-4">
      {/* Left: Selection UI */}
      <div className="flex flex-col items-center px-2 py-6 w-full max-w-md mx-auto lg:mx-0 lg:sticky lg:top-8 lg:self-start">
        {/* Lottery Ticket Form */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-6 relative overflow-hidden">
          {/* Ticket Header */}
          <div className="flex flex-col items-center justify-center mb-6 relative">
            <div className="flex items-center space-x-3 mb-2">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from -[#FFD700] to-[#FFC300] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🎰</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">$</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold font-title tracking-wide bg-gradient-to-r from-[#FFD700] to-[#FFC300] bg-clip-text text-transparent">
                  GLOBAL LOTTERY
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-green-400 font-semibold">● LIVE</span>
                  <span className="text-xs text-gray-400">Multi-Country Draw</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
              <p className="text-sm text-white/90 text-center">
                🌍 Select numbers from 8 countries • Win up to $60M
              </p>
            </div>
          </div>
          <CountriesGrid
            countryConfigs={countryConfigs}
            countrySelections={countrySelections}
            selectedCountry={selectedCountry}
            handleCountrySelect={handleCountrySelect}
          />
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
                    💰 ${TICKET_PRICE} each
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

          {/* Review Order Button */}
          <button
            className={`w-full py-4 rounded-xl text-lg font-bold shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 ${tickets.length === 0
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105'
              }`}
            disabled={tickets.length === 0}
            onClick={() => setShowSummary(true)}
          >
            <span className="text-xl">🛒</span>
            <span>Review & Purchase ({tickets.length} ticket{tickets.length !== 1 ? 's' : ''})</span>
          </button>

          <OrderSummary
            open={showSummary}
            onClose={() => setShowSummary(false)}
          />
        </div>
      </div>
      <div className="lg:mr-10 lg:mt-7">
        <TicketSummary
          tickets={tickets}
          handleDeleteTicket={handleDeleteTicket}
          countryConfigs={countryConfigs}
        />
      </div>

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
