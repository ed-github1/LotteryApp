import { useState } from 'react'
import { useTicket } from '../../../context/TicketContext'
import { useNavigate } from 'react-router-dom'
import { sendOrder } from '../../../services/ordersService'
import { useAuth } from '../../../context/AuthContext'
import { motion } from 'framer-motion'
// ...existing imports...
import { useEffect } from 'react';
import PaymentProgressBar from './PaymentProgressBar'

const OrderSummary = () => {
  const { tickets, totalPrice, formatPrice, clearTickets } = useTicket()
  const { token } = useAuth()
  const navigate = useNavigate()
  const [simulating, setSimulating] = useState(false)
  const [simSuccess, setSimSuccess] = useState(false)
  const [step, setStep] = useState(1);

  const handleProceed = async () => {
    setSimulating(true)
    setSimSuccess(false)
    // Simulate Binance Pay delay
    setTimeout(async () => {
      setSimulating(false)
      setSimSuccess(true)
      // Format tickets for backend
      const formattedTickets = tickets.map((ticket) => {
        const backendSelections = ticket.selections.reduce((acc, sel) => {
          const { countryCode, number } = sel
          acc[(countryCode)] = number
          return acc
        }, {})
        return {
          selections: backendSelections,
          price: ticket.price
        }
      })


      const payload = {
        token: token,
        tickets: formattedTickets,
        total: parseFloat(totalPrice.toFixed(2))
      }


      console.log('Simulated Binance Pay payload:', payload)
      await sendOrder(payload, token)
      if (clearTickets) clearTickets();
      // Navigation will happen in useEffect after simSuccess is true
    }, 2000) // 2 seconds
  }
  // Navigate after tickets are cleared and payment is successful
  useEffect(() => {
    if (simSuccess) {
      navigate('/Success');
    }
  }, [simSuccess, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-800 py-8 px-2">
      {/* Stepper/Progress Bar */}
      <PaymentProgressBar currentStep={step} />
      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8 border border-gray-200">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-1 text-center">Order Summary</h2>
        <div className="text-gray-500 text-center mb-8">Confirm your ticket purchase details</div>

        {!simulating && (
          <>
            {/* Table-like summary */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6">
              <div className="mb-4">
                <div className="flex justify-between text-gray-600 text-sm mb-1">
                  <span className="font-semibold">Number of Tickets</span>
                  <span className="font-semibold">{tickets.length}</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="font-semibold text-gray-700 mb-2">Ticket Details:</div>
                <div className="divide-y divide-gray-200">
                  {tickets.map((ticket, idx) => (
                    <div key={idx} className=" border border-dotted border-zinc-300 py-3 px-1 flex  sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex-1">
                        <div className="font-bold text-[10px] text-gray-800 mb-1">Ticket #{idx + 1}</div>
                        <div className="flex flex-wrap gap-2 items-center ">
                          {ticket.selections.map((sel, i) => (
                            <div key={i} className="font-mono flex flex-col items-center  ">
                              <span className="text-xs font-semibold">{sel.countryCode}</span>
                              <span className="text-md font-bold font-mono text-gray-800 tracking-wider">{sel.number}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-100 rounded px-4 py-3 mt-4">
                <span className="font-bold text-gray-700">Payment Amount</span>
                <span className="font-extrabold text-xl text-gray-900">${formatPrice(totalPrice)}</span>
              </div>
            </div>
            {/* Payment Button */}
            <button
              onClick={handleProceed}
              className="w-full py-4 rounded-lg bg-yellow-400 text-white font-bold text-lg shadow hover:bg-blue-700 transition-all"
              disabled={simulating || simSuccess}
            >
              {simulating ? 'Processing Binance Pay...' : simSuccess ? 'Payment Successful!' : 'Make Payment'}
            </button>
          </>
        )}
        {simulating && (
          <div className="flex flex-col items-center justify-center h-80">
            <motion.img
              src="https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png"
              alt="Binance Logo"
              className="w-24 h-24 mb-6"
              initial={{ scale: 1, rotate: 0 }}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                type: 'spring',
                stiffness: 100,
                damping: 10
              }}
            />
            <motion.div
              className="text-yellow-600 font-bold text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 80 }}
            >
              Processing Binance Pay...
            </motion.div>
          </div>
        )}

        {simSuccess && (
          <div className="mt-8 text-center text-green-600 text-xl font-bold">
            Payment successful! Your tickets have been purchased.
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderSummary
