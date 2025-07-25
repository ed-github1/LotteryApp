import React, { useState } from 'react'
import { useOrders } from '../../../context/OrdersContext'
import { useAuth } from '../../../context/AuthContext'
import historyBanner from '../../../assets/banners/history-banner.png'

const headerStyle =
  'px-4 py-2 text-left text-[10px] font-bold text-gray-700 uppercase tracking-wider'

const TableHeader = () => (
  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
    <tr>
      <th className={headerStyle}>Transaction</th>
      <th className={headerStyle}>Total</th>
      <th className={headerStyle}>Date</th>
      <th className={headerStyle}>Hour</th>
      <th className={headerStyle}>Tickets</th>
      <th className={headerStyle}>Selections</th>
    </tr>
  </thead>
)

const TableRow = ({ order, openTicketModal }) => (
  <tr className="hover:bg-blue-50 transition-all duration-200 overflow-x-auto">
    <td className={headerStyle}>{order.id?.substring(0, 8)}</td>
    <td className="px-4 py-2 text-[10px] text-green-600 font-bold">
      ${order.total.toFixed(2)}
    </td>
    <td className={headerStyle}>{new Date(order.date).toLocaleDateString()}</td>
    <td className={headerStyle}>{new Date(order.date).toLocaleTimeString()}</td>
    <td className={headerStyle}>{order.tickets?.length || 0}</td>
    <td className="px-4 py-2 text-sm text-blue-600">
      <button onClick={() => openTicketModal(order)} className="underline">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75"
        onClick={closeTicketModal}
      ></div>
      <div className="relative z-50 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-lg font-bold">Ticket Details</h3>
          <button onClick={closeTicketModal} className="text-gray-500">
            Close
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
        <div className="text-center py-4 text-gray-500">
          No ticket details available
        </div>
      )
    }
    return (
      <div className="space-y-4">
        {tickets.map((ticket, idx) => (
          <div key={idx} className="p-4 border rounded-lg">
            <h4 className="font-bold">Ticket #{idx + 1}</h4>
            <p className=" text-gray-600">
              Selections: {JSON.stringify(ticket.selections)}
            </p>
            <p className="text-xs text-gray-600">Price: ${ticket.price}</p>
            <p className="text-xs text-gray-600">Type: {ticket.type}</p>
          </div>
        ))}
      </div>
    )
  }

  if (loading) {
    return <div className="text-center py-4">Loading...</div>
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Banner Header */}

      <div className="max-w-7xl mx-auto">
        <img
          src={historyBanner}
          alt="banner"
          className="rounded-xl w-full mb-6 object-contain"
          style={{ height: 'auto' }}
        />
        <div className="bg-white rounded-lg shadow-lg ">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <TableHeader />
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, idx) => (
                <TableRow
                  key={idx}
                  order={order}
                  openTicketModal={openTicketModal}
                />
              ))}
            </tbody>
          </table>
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
