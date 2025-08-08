import { useState } from 'react'
import { useOrders } from '../../../context/OrdersContext'
import historyBanner from '../../../assets/banners/history-banner.png'

const TableHeader = () => (
  <thead className="bg-gradient-to-r from-[#232946] via-[#1a1d2e] to-[#232946]">
    <tr>
      <th className="px- py-3  text-[8px] font-bold text-white uppercase tracking-wider whitespace-normal break-words">Transaction</th>
      <th className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-normal break-words">Total</th>
      <th className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-normal break-words">Date</th>
      <th className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-normal break-words">Hour</th>
      <th className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-normal break-words">Tickets</th>
      <th className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wider whitespace-normal break-words">Selections</th>
    </tr>
  </thead>
)

const TableRow = ({ order, openTicketModal }) => (
  <tr className="hover:bg-white/10 transition-all duration-300 border-b border-white/10">
    <td className="px-4 py-3 text-xs font-medium text-gray-300">{order.id?.substring(0, 8)}</td>
    <td className="px-4 py-3 text-xs text-[#FFD700] font-bold">
      ${order.total.toFixed(2)}
    </td>
    <td className="px-4 py-3 text-xs text-gray-300">{new Date(order.date).toLocaleDateString()}</td>
    <td className="px-4 py-3 text-xs text-gray-300">{new Date(order.date).toLocaleTimeString()}</td>
    <td className="px-4 py-3 text-xs text-gray-300">{order.tickets?.length || 0}</td>
    <td className="px-4 py-3 text-xs">
      <button
        onClick={() => openTicketModal(order)}
        className="px-3 py-1 bg-gradient-to-r from-[#FFD700] to-[#FFC300] text-[#232946] font-bold rounded-lg hover:scale-105 transition-transform duration-200"
      >
        View
      </button>
    </td>
  </tr>
)

const TicketModal = ({
  selectedOrder,
  closeTicketModal,
  renderTicketDetails
}) =>
  selectedOrder && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeTicketModal}
      ></div>
      <div className="relative z-50 w-full max-w-4xl mx-auto bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6">
        <div className="flex justify-between items-center border-b border-white/20 pb-4 mb-4">
          <h3 className="text-xl font-bold text-white">Purchase  Details</h3>
          <button
            onClick={closeTicketModal}
            className="text-white  hover:text-white text-2xl font-bold"
          >
            ✕
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {renderTicketDetails(selectedOrder.tickets)}
        </div>
      </div>
    </div>
  )

const Draws = () => {
  const { orders, loading } = useOrders()
  const [selectedOrder, setSelectedOrder] = useState(null)


  const openTicketModal = (order) => setSelectedOrder(order)
  const closeTicketModal = () => setSelectedOrder(null)

  const renderTicketDetails = (tickets) => {
    if (!tickets || tickets.length === 0) {
      return (
        <div className="text-center py-8 text-black font-mono">
          <div className="text-4xl mb-2">📋</div>
          <div>No ticket details available</div>
        </div>
      )
    }
    return (
      <div className="space-y-6">
        {tickets.map((ticket, idx) => (
          <div key={idx} className="bg-white/90 rounded-xl border-2 border-dashed border-gray-300 shadow p-0 font-mono">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-t-xl px-4 py-2 flex items-center justify-between border-b border-dashed border-gray-300">
              <span className="font-bold text-gray-700 text-base">Ticket #{idx + 1}</span>
              <div className="px-3 py-1 text-green-600
               font-bold rounded text-sm">${ticket.price}<span className='ml-1 text-xs'>USDT</span></div>
            </div>
            <div className="px-4 py-3">
              <div className="flex justify-between mb-2 text-xs tex">
                <span>Selections</span>
                <span>{Array.isArray(ticket.selections)
                  ? ticket.selections.map(sel => `${sel.countryCode}: ${sel.number}`).join(', ')
                  : Object.entries(ticket.selections).map(([cc, num]) => `${cc}: ${num}`).join(', ')
                }</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Ticket ID</span>
                <span className="text-xs text-gray-700">{ticket.id || '-'}</span>
              </div>
            </div>
            <div className="border-t border-dashed border-zinc-600 px-4 py-2 text-center text-xs text-gray-500 rounded-b-xl">
              Thank you for playing!
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#1a1d2e] to-[#232946] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#FFD700] border-t-transparent mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading your history...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#1a1d2e] to-[#232946] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Banner Header */}
        <div className="mb-8">
          <img
            src={historyBanner}
            alt="History Banner"
            className="rounded-2xl w-full shadow-2xl object-cover"
            style={{ height: '200px' }}
          />
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-2xl font-bold text-white mb-2">Transaction History</h2>
            <p className="text-gray-300">View all your lottery ticket purchases and details</p>
          </div>

          <div className="overflow-x-auto">
            <div className="w-full overflow-x-auto md:overflow-x-visible">
              <table className="w-full table-fixed md:table-auto divide-y divide-white/10">
                <TableHeader />
                <tbody className="bg-gradient-to-b from-white/5 to-transparent divide-y divide-white/10">
                  {orders.length > 0 ? (
                    orders.map((order, idx) => (
                      <TableRow
                        key={idx}
                        order={order}
                        openTicketModal={openTicketModal}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="text-gray-400">
                          <div className="text-6xl mb-4">🎫</div>
                          <div className="text-xl font-medium mb-2">No transactions yet</div>
                          <div>Your lottery ticket purchases will appear here</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <TicketModal
        selectedOrder={selectedOrder}
        closeTicketModal={closeTicketModal}
        renderTicketDetails={renderTicketDetails}
      />
    </div>
  )
}

export default Draws
