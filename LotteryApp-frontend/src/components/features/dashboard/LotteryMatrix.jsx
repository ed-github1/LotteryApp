import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTicket } from '../../../context/TicketContext'

const TOTAL_NUMBERS = 50
const NUMBERS_PER_TICKET = 6
const MAX_TICKETS = 50

// --- TicketCard Component ---
const TicketCard = ({ ticket, idx, onDelete }) => (
  <div
    className="relative flex items-center justify-between bg-white rounded-2xl shadow-md p-3 mb-4 border border-dashed border-yellow-300"
    style={{
      overflow: 'hidden',
      minHeight: '64px',
      background:
        'repeating-linear-gradient(135deg, #fff, #fff 10px, #FFF9C4 10px, #FFF9C4 20px)'
    }}
  >
    {/* Perforation Notches */}
    <svg
      className="absolute left-[-8px] top-2"
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
    >
      <circle
        cx="8"
        cy="10"
        r="8"
        fill="#FFF9C4"
        stroke="#FFD600"
        strokeWidth="2"
      />
    </svg>
    <svg
      className="absolute right-[-8px] bottom-2"
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
    >
      <circle
        cx="8"
        cy="10"
        r="8"
        fill="#FFF9C4"
        stroke="#FFD600"
        strokeWidth="2"
      />
    </svg>

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
      {ticket.numbers.map((num, i) => (
        <span
          key={i}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-800 font-extrabold text-lg border-2 border-yellow-300 tracking-wider shadow-sm"
        >
          {num}
        </span>
      ))}
    </div>

    {/* Barcode and Actions */}
    <div className="flex flex-col items-end ml-2">
      <div className="mb-1">
        <svg width="40" height="12" viewBox="0 0 40 12">
          <rect x="0" y="0" width="2" height="12" fill="#bbb" />
          <rect x="4" y="0" width="1" height="12" fill="#bbb" />
          <rect x="7" y="0" width="3" height="12" fill="#bbb" />
          <rect x="12" y="0" width="2" height="12" fill="#bbb" />
          <rect x="16" y="0" width="1" height="12" fill="#bbb" />
          <rect x="19" y="0" width="2" height="12" fill="#bbb" />
          <rect x="23" y="0" width="1" height="12" fill="#bbb" />
          <rect x="26" y="0" width="3" height="12" fill="#bbb" />
          <rect x="31" y="0" width="2" height="12" fill="#bbb" />
          <rect x="35" y="0" width="1" height="12" fill="#bbb" />
        </svg>
      </div>
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

// --- Main Component ---
const LotteryMatrix = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([])
  const { tickets, addTicket, removeTicket } = useTicket()

  // Number selection logic
  const handleSelect = (number) => {
    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : prev.length < NUMBERS_PER_TICKET
        ? [...prev, number]
        : prev
    )
  }
  //-- Handlers --
  const handleClear = () => setSelectedNumbers([])
  const handleRandomize = () => {
    let nums = []
    while (nums.length < NUMBERS_PER_TICKET) {
      const n = Math.floor(Math.random() * TOTAL_NUMBERS) + 1
      if (!nums.includes(n)) nums.push(n)
    }
    setSelectedNumbers(nums)
  }
  const handleSaveTicket = () => {
    if (
      selectedNumbers.length === NUMBERS_PER_TICKET &&
      tickets.length < MAX_TICKETS
    ) {
      addTicket(selectedNumbers)
      setSelectedNumbers([])
    }
  }
  const handleDeleteTicket = (idx) => {
    removeTicket(idx)
  }

  // Calculate total price
  const totalPrice = tickets.reduce((sum, ticket) => sum + ticket.price, 0)

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center bg-[#FFF6ED] min-h-screen w-full">
      {/* Left: Selection UI */}
      <div className="flex flex-col items-center px-2 py-6 w-full max-w-md mx-auto">
        {/* Selection card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-4 mb-6 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-gray-500 text-sm">Pick your numbers</span>
            <span className="text-orange-500 font-bold text-lg">
              {selectedNumbers.length}/{NUMBERS_PER_TICKET}
            </span>
          </div>
          <div className="flex gap-2 justify-center mb-2">
            {Array(NUMBERS_PER_TICKET)
              .fill(0)
              .map((_, i) => (
                <span
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-lg font-bold ${
                    selectedNumbers[i]
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-gray-100 text-gray-400 border-gray-200'
                  }`}
                >
                  {selectedNumbers[i] || ''}
                </span>
              ))}
          </div>
          <div className="flex justify-between w-full mt-2">
            <button
              onClick={handleClear}
              className="text-xs text-gray-500 hover:text-orange-500 font-semibold"
            >
              CLEAR ALL
            </button>
            <button
              onClick={handleRandomize}
              className="text-xs text-gray-500 hover:text-orange-500 font-semibold"
            >
              RANDOMIZE
            </button>
          </div>
        </div>

        {/* Number grid */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="grid grid-cols-7 gap-3">
            {Array(TOTAL_NUMBERS)
              .fill(0)
              .map((_, i) => {
                const number = i + 1
                const selected = selectedNumbers.includes(number)
                return (
                  <motion.button
                    key={number}
                    onClick={() => handleSelect(number)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-base transition-all duration-150 border-2
                    ${
                      selected
                        ? 'bg-orange-500 text-white border-orange-500 shadow'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-100'
                    }
                    ${
                      selectedNumbers.length >= NUMBERS_PER_TICKET && !selected
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }
                  `}
                    whileTap={{ scale: 0.92 }}
                    disabled={
                      !selected && selectedNumbers.length >= NUMBERS_PER_TICKET
                    }
                  >
                    {number}
                  </motion.button>
                )
              })}
          </div>
        </div>

        {/* Save ticket button */}
        <button
          className={`w-full max-w-md mb-4 py-3 rounded-full text-lg font-bold shadow transition ${
            selectedNumbers.length === NUMBERS_PER_TICKET
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-gray-300 text-gray-400 cursor-not-allowed'
          }`}
          disabled={selectedNumbers.length !== NUMBERS_PER_TICKET}
          onClick={handleSaveTicket}
        >
          {selectedNumbers.length === NUMBERS_PER_TICKET
            ? 'Save Ticket'
            : `Pick ${NUMBERS_PER_TICKET} Numbers`}
        </button>

        {/* Continue button */}
        <button
          className={`w-full max-w-md py-3 rounded-full text-lg font-bold shadow transition ${
            tickets.length > 0
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-gray-300 text-gray-400 cursor-not-allowed'
          }`}
          disabled={tickets.length === 0}
          onClick={() => alert(`Continue with ${tickets.length} Ticket(s)`)}
        >
          Continue with {tickets.length} Ticket{tickets.length !== 1 ? 's' : ''}
        </button>
      </div>
      {/* Right: Ticket summary */}
      <div className="w-full max-w-md mx-auto px-2 py-6">
        <div className="flex items-center justify-between mb-2">
          <div className="mt-4 text-xl">
            <strong>Total: ${totalPrice}</strong>
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

export default LotteryMatrix
