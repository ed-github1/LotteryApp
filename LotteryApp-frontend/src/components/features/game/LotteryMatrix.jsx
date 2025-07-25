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
    <div className="flex flex-col-reverse lg:flex-row bg-[#FFF6ED] min-h-screen w-full">
      {/* Left: Selection UI */}
      <div className="flex flex-col items-center px-2 py-6 w-full max-w-md mx-auto">
        {/* Lottery Ticket Form */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-[#FFD700] relative">
          {/* Ticket Header */}
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="flex items-center space-x-1">
              <img
                src={fr}
                alt="France"
                className="size-12"
              />
              <h2 className="text-2xl font-bold font-title tracking-wide text-[#FFD700]">
                LOTTERY APP
              </h2>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Select one number for each country to participate
            </p>
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
      <div className="lg:mr-10">
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
