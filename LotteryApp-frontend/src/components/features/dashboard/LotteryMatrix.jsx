import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTicket } from '../../../context/TicketContext'

//flags-imgs
import it from '../../../assets/country-flags/it.svg'
import ca from '../../../assets/country-flags/ca.svg'
import mx from '../../../assets/country-flags/mx.svg'
import nz from '../../../assets/country-flags/nz.svg'
import kr from '../../../assets/country-flags/kr.svg'
import ie from '../../../assets/country-flags/ie.svg'
import gb from '../../../assets/country-flags/gb.svg'
import fr from '../../../assets/country-flags/fr.svg'

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

// --- Main Component ---
const LotteryMatrix = () => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countrySelections, setCountrySelections] = useState({})
  const { tickets, addTicket, removeTicket } = useTicket()

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
  }

  const handleNumberSelect = (number) => {
    if (selectedCountry) {
      setCountrySelections((prev) => ({
        ...prev,
        [selectedCountry.code]: number
      }))
    }
  }

  const handleDeleteTicket = (idx) => {
    removeTicket(idx)
  }

  const handleSaveTicket = () => {
    const selectedNumbers = Object.entries(countrySelections)
      .filter(([_, number]) => number !== undefined)
      .map(([countryCode, number]) => ({
        country: countryConfigs.find((c) => c.code === countryCode),
        number: number
      }))

    if (selectedNumbers.length > 0) {
      addTicket({
        numbers: selectedNumbers.map((s) => s.number),
        countries: selectedNumbers.map((s) => s.country),
        price: selectedNumbers.length * 5
      })
    }
  }

  const calculateTotal = () => {
    return (
      Object.keys(countrySelections).filter((key) => countrySelections[key])
        .length * 5
    )
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center bg-[#FFF6ED] min-h-screen w-full">
      {/* Left: Selection UI */}
      <div className="flex flex-col items-center px-2 py-6 w-full max-w-md mx-auto">
        {/* Lottery Ticket Form */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-orange-400 relative">
          {/* Ticket Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold font-secondary text-orange-600 mb-2">
              🎟️ LOTTERY TICKET
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
                <div className="w-10 h-8 mb-2 flex items-center justify-center bg-gray-50 rounded-md border">
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

                {/* Number Circle */}
                <button
                  className={`w-12 h-12 rounded-full border-2 font-bold text-lg transition-all duration-200 ${
                    countrySelections[country.code]
                      ? 'bg-orange-500 text-white border-orange-500 shadow-lg'
                      : selectedCountry?.code === country.code
                      ? 'bg-orange-100 text-orange-600 border-orange-300 ring-2 ring-orange-200'
                      : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-orange-50 hover:border-orange-200'
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

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>
                {
                  Object.keys(countrySelections).filter(
                    (key) => countrySelections[key]
                  ).length
                }
                /{countryConfigs.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (Object.keys(countrySelections).filter(
                      (key) => countrySelections[key]
                    ).length /
                      countryConfigs.length) *
                    100
                  }%`
                }}
              ></div>
            </div>
          </div>

          {/* Selected Country Info */}
          {selectedCountry && (
            <div className="bg-orange-50 rounded-lg p-3 mb-4 border border-orange-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={selectedCountry.flag}
                    alt={selectedCountry.name}
                    className="h-5 w-auto mr-2"
                  />
                  <span className="font-semibold text-orange-800">
                    {selectedCountry.name}
                  </span>
                </div>
                <span className="text-sm text-orange-600">
                  Pick 1-{selectedCountry.totalNumbers}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Number Selection Grid */}
        {selectedCountry && (
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                Pick Your Lucky Number
              </h3>
              <div className="flex items-center justify-center">
                <img
                  src={selectedCountry.flag}
                  alt={selectedCountry.name}
                  className="h-6 w-auto mr-2"
                />
                <span className="text-gray-600">{selectedCountry.name}</span>
              </div>
            </div>

            <div className="grid grid-cols-8 gap-2">
              {Array(selectedCountry.totalNumbers)
                .fill(0)
                .map((_, i) => {
                  const number = i + 1
                  const selected =
                    countrySelections[selectedCountry.code] === number
                  return (
                    <motion.button
                      key={number}
                      onClick={() => handleNumberSelect(number)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-150 ${
                        selected
                          ? 'bg-orange-500 text-white shadow-lg scale-110'
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-orange-100 hover:border-orange-300'
                      }`}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: selected ? 1.1 : 1.05 }}
                    >
                      {number}
                    </motion.button>
                  )
                })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-3">
          <button
            className={`w-full py-4 rounded-2xl text-lg font-bold shadow-lg transition-all duration-200 ${
              Object.keys(countrySelections).filter(
                (key) => countrySelections[key]
              ).length > 0
                ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={
              Object.keys(countrySelections).filter(
                (key) => countrySelections[key]
              ).length === 0
            }
            onClick={handleSaveTicket}
          >
            💰 Save Ticket (${calculateTotal()})
          </button>

          <button
            className={`w-full py-3 rounded-2xl text-md font-bold shadow transition-all duration-200 ${
              tickets.length > 0
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={tickets.length === 0}
            onClick={() => alert(`Continue with ${tickets.length} Ticket(s)`)}
          >
            🎯 Continue with {tickets.length} Ticket
            {tickets.length !== 1 ? 's' : ''}
          </button>
        </div>
      </div>

      {/* Right: Ticket summary */}
      <div className="w-full max-w-md mx-auto px-2 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl">
            <strong>
              Total: $
              {tickets.reduce((sum, ticket) => sum + (ticket.price || 0), 0)}
            </strong>
          </div>
          <span className="text-orange-500 font-bold text-lg">
            {tickets.length}/{MAX_TICKETS} Tickets
          </span>
        </div>
        {/* Render tickets */}
        {tickets.map((ticket, idx) => (
          <TicketCard
            key={idx}
            ticket={ticket}
            idx={idx}
            onDelete={() => handleDeleteTicket(idx)}
          />
        ))}
      </div>
    </div>
  )
}

// --- TicketCard Component ---
const TicketCard = ({ ticket, idx, onDelete }) => {
  const numbersArray = Array.isArray(ticket.numbers)
    ? ticket.numbers
    : [ticket.numbers]

  return (
    <div
      className="relative flex items-center justify-between bg-white rounded-2xl shadow-md p-3 mb-4 border border-dashed border-yellow-300"
      style={{
        overflow: 'hidden',
        minHeight: '64px',
        background:
          'repeating-linear-gradient(135deg, #fff, #fff 10px, #FFF9C4 10px, #FFF9C4 20px)'
      }}
    >
      {/* Yellow Ticket Stub */}
      <div className="absolute left-0 top-0 h-full w-4 bg-yellow-400 rounded-l-2xl flex flex-col items-center justify-center">
        <span
          className="text-[10px] text-white font-bold rotate-[-90deg] tracking-widest"
          style={{ letterSpacing: '2px', fontFamily: 'monospace' }}
        >
          TICKET
        </span>
      </div>

      {/* Ticket Numbers */}
      <div className="flex gap-2 ml-8">
        {numbersArray.map((num, i) => (
          <span
            key={i}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-800 font-extrabold text-lg border-2 border-yellow-300 tracking-wider shadow-sm"
          >
            {num}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end ml-2">
        <button
          onClick={onDelete}
          className="text-xs text-gray-400 hover:text-yellow-600 font-bold"
        >
          DELETE
        </button>
        <span className="text-[10px] text-yellow-600 font-semibold mt-1">
          #{idx + 1}
        </span>
      </div>
    </div>
  )
}

export default LotteryMatrix
