import { useTicket } from '../../../context/TicketContext'
import { useNavigate } from 'react-router-dom'
import { sendOrder } from '../../../services/ordersService'
import { useAuth } from '../../../context/AuthContext'

const OrderSummary = ({ open, onClose }) => {
  const { tickets, totalPrice, formatPrice } = useTicket()
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!open) return null

  const handleProceed = async () => {
    try {
      // Format tickets for backend
      const formattedTickets = tickets.map((ticket) => {
        const backendSelections = ticket.selections.reduce((acc, sel) => {
          // Extract countryCode and number directly from the object
          const { countryCode, number } = sel
          acc[(countryCode)] = number // Add to the backend object
          return acc
        }, {})

        return {
          selections: backendSelections, // Include selections
          price: ticket.price // Include ticket price
        }
      })

      // Log the data being sent to the backend
      const payload = {
        tickets: formattedTickets, // Send formatted tickets
        total: parseFloat(totalPrice.toFixed(2)) // Round total to two decimal places
      }

      // Send formatted tickets to backend
      await sendOrder(payload, user.token)

      navigate('/dashboard/draws')
    } catch (err) {
      alert('Error processing order')
      console.log(err.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-100 relative animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 font-title">
            Order Summary
          </h2>
        </div>

        <div className="text-sm font-secondary font-bold mt-2 mb-3 text-gray-500">
          Your selected tickets for this purchase
        </div>
        <div className="bg-gray-50 rounded-lg border border-gray-200 mb-6 p-4 max-h-60 overflow-y-auto">
          {tickets.map((ticket, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-100"
            >
              <div>
                <div className="font-semibold text-[8px] font-number text-gray-700">
                  Ticket #{idx + 1}
                </div>
                <div className="gap-2 mt-1 text-xs text-gray-600">
                  {ticket.selections.map((sel, i) => (
                    <span key={i} className="px-2 py-1 rounded font-semibold">
                      <span className="font-bold">{sel.number}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-gray-700 font-bold text-xs font-number">
                ${formatPrice(ticket.price)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center font-bold text-xl mb-6">
          <span className="text-green-600">Total</span>
          <span className="text-green-600 font-number">
            ${formatPrice(totalPrice)}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleProceed}
            className="flex-1 py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-all text-center"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
