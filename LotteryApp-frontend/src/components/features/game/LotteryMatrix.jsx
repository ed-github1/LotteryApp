import { useState } from 'react'
import { useTicket } from '../../../context/TicketContext'

import TicketCard from '../dashboard/TicketCard'
import ProgressBar from '../dashboard/ProgressBar'
import TicketSummary from '../dashboard/TicketSummary'

//flags-imgs
import it from '../../../assets/country-flags/it.svg'
import ca from '../../../assets/country-flags/ca.svg'
import mx from '../../../assets/country-flags/mx.svg'
import nz from '../../../assets/country-flags/nz.svg'
import kr from '../../../assets/country-flags/kr.svg'
import ie from '../../../assets/country-flags/ie.svg'
import gb from '../../../assets/country-flags/gb.svg'
import fr from '../../../assets/country-flags/fr.svg'

import OrderSummary from '../Payment/OrderSummary'

const countryConfigs = [
  { code: 'IT', name: 'Italia', flag: it, totalNumbers: 90 },
  { code: 'CA', name: 'Canada', flag: ca, totalNumbers: 49 },
  { code: 'MX', name: 'Mexico', flag: mx, totalNumbers: 56 },
  { code: 'NZ', name: 'New Zealand', flag: nz, totalNumbers: 40 },
  { code: 'KR', name: 'South Korea', flag: kr, totalNumbers: 45 },
  { code: 'IE', name: 'Ireland', flag: ie, totalNumbers: 47 },
  { code: 'UK', name: 'United Kingdom', flag: gb, totalNumbers: 59 },
  { code: 'FR', name: 'France', flag: fr, totalNumbers: 10 }
]

const MAX_TICKETS = 10
const TICKET_PRICE = 0.4

// --- NumberSelectionGrid Component ---
const NumberSelectionGrid = ({
  selectedCountry,
  countrySelections,
  handleNumberSelect,
  isModal = false,
  onClose,
  onRandomize
}) => {
  if (!selectedCountry) return null

  const content = (
    <div
      className={`w-full max-w-md bg-white rounded-xl shadow-lg p-6 ${
        isModal ? '' : 'mb-6'
      }`}
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-secondary font-extrabold text-zinc-400 mb-2">
          Pick Your Lucky Number
        </h3>
        <div className="flex items-center justify-center">
          <img
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            className="h-6 w-auto mr-2"
          />
          <span className="text-gray-600 font-title">
            {selectedCountry.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-9 gap-x-2 gap-y-2.5">
        {Array(selectedCountry.totalNumbers)
          .fill(0)
          .map((_, i) => {
            const number = i + 1
            const selected = countrySelections[selectedCountry.code] === number
            return (
              <button
                key={number}
                onClick={() => handleNumberSelect(number)}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-150 ${
                  selected
                    ? 'bg-[#FFD700] text-white shadow-lg scale-110'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-orange-100 hover:border-orange-300'
                }`}
              >
                {number}
              </button>
            )
          })}
      </div>

      {isModal && (
        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#FFD700] text-gray-700 font-bold hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onRandomize}
            className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
          >
            🎲
          </button>
        </div>
      )}
    </div>
  )

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="w-full max-w-md">{content}</div>
      </div>
    )
  }

  return content
}

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
    <div className="flex flex-col-reverse lg:flex-row bg-[#FFF6ED] min-h-screen w-full">
      {/* Left: Selection UI */}
      <div className="flex flex-col items-center px-2 py-6 w-full max-w-md mx-auto">
        {/* Lottery Ticket Form */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-[#FFD700] relative">
          {/* Ticket Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-title tracking-wide text-[#FFD700] mb-2">
              LOTTERY APP
            </h2>
            <p className="text-sm text-gray-600">
              Select one number for each country
            </p>
          </div>

          {/* Countries Grid */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {countryConfigs.map((country) => (
              <div key={country.code} className="flex flex-col items-center">
                {/* Flag */}
                <div className="w-10 h-8 mb-2 flex items-center justify-center bg-gray-50">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="h-6 w-auto"
                  />
                </div>

                {/* Country Code */}
                <span className="text-xs font-semibold text-gray-600 mb-1">
                  {country.code}
                </span>

                {/* Number ball*/}
                <button
                  className={`w-12 h-12 rounded-full border-2 font-bold text-lg transition-all duration-200 ${
                    countrySelections[country.code]
                      ? 'bg-[#FFD700] text-yellow-900 border-yellow-500 shadow-lg'
                      : selectedCountry?.code === country.code
                      ? 'bg-orange-100 text-yellow-900 bg-gradient-to-b from-yellow-400 to-yellow-500 border-2 border-yellow-600 '
                      : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-yellow-50 hover:border-yellow-200'
                  }`}
                  onClick={() => handleCountrySelect(country)}
                >
                  {countrySelections[country.code] || '?'}
                </button>

                {/* Country Name */}
                <span className="text-xs text-gray-500 mt-1 text-center leading-tight">
                  {country.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>

          <ProgressBar
            countryConfigs={countryConfigs}
            countrySelections={countrySelections}
          />

          {/* Selected Country Info */}
          {selectedCountry && (
            <div className="bg-yellow-50 rounded-lg p-3 mb-4 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={selectedCountry.flag}
                    alt={selectedCountry.name}
                    className="h-5 w-auto mr-2"
                  />
                  <span className="font-semibold text-yellow-800">
                    {selectedCountry.name}
                  </span>
                </div>
                <span className="text-sm text-yellow-600">
                  Pick 1-{selectedCountry.totalNumbers}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-3">
          {/* Add tickets counter */}
          <div className="text-center mb-2">
            <span className="text-xs text-gray-600">
              Tickets: {tickets.length}/{MAX_TICKETS}
            </span>
          </div>
          <button
            onClick={handleRandomize}
            className="w-full py-3 rounded-2xl bg-blue-500 text-white font-bold shadow-md hover:bg-blue-600 transition-all duration-200"
          >
            🎲 Randomize Numbers
          </button>
          <button
            className={`w-full py-3 rounded-2xl text-lg font-bold shadow-lg transition-all duration-200 ${
              Object.keys(countrySelections).filter(
                (key) => countrySelections[key]
              ).length > 0 && tickets.length < MAX_TICKETS
                ? 'bg-[#FFD700] text-white hover:bg-orange-600 hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={
              Object.keys(countrySelections).filter(
                (key) => countrySelections[key]
              ).length === 0 || tickets.length >= MAX_TICKETS
            }
            onClick={handleSaveTicket}
          >
            💰 Save Ticket (${calculateTotal()})
            {tickets.length >= MAX_TICKETS && `- Max ${MAX_TICKETS} reached`}
          </button>
          <OrderSummary
            open={showSummary}
            onClose={() => setShowSummary(false)}
          />

          <button
            className="w-full py-3 rounded-2xl text-lg font-bold shadow-lg bg-green-500 text-white hover:bg-green-600 transition-all"
            disabled={tickets.length === 0}
            onClick={() => setShowSummary(true)}
          >
            Review Order
          </button>
        </div>
      </div>
      {console.log('show summary', showSummary)}{' '}
      <div className="lg:mr-10">
        {/* Right: Ticket summary */}

        <TicketSummary
          tickets={tickets}
          handleDeleteTicket={handleDeleteTicket}
          countryConfigs={countryConfigs}
        />
      </div>
      {/* Modal for mobile devices */}
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
