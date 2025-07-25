import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'

const TicketCard = ({ ticket, idx, onDelete, countryConfigs }) => {
  const selections = Array.isArray(ticket.selections) ? ticket.selections : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: 'spring',
        bounce: 0.3
      }}
      className="relative bg-white rounded-lg shadow-lg mb-4 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Close Button - Positioned at the very edge of top right corner */}
      <button
        onClick={onDelete}
        className="absolute right-0 top-0 z-20 w-8 h-8 bg-gray-200 hover:bg-red-500 text-gray-600 hover:text-white rounded-bl-lg flex items-center justify-center shadow transition-all duration-200 hover:scale-110"
      >
        <IoClose className="text-sm" />
      </button>

      {/* Ticket Body */}
      <div className="p-4 bg-white relative" style={{ marginLeft: '32px' }}>
   
        {/* Ticket Header fs with Price */}
        <div className="flex items-center justify-between pt-1 border-b border-dashed border-gray-300">
          <div className="flex items-center gap-2 text-gray-700 text-[10px] font-semibold tracking-wide font-number">
            ${ticket.price}
            <span className="text-gray-400 text-[8px]">USDT</span>
          </div>
        </div>

        {/* Selections Grid */}
        <div className="grid grid-cols-8 gap-2 mb-4 mt-1 mr-5">
          {selections.map((sel, i) => {
            const country = countryConfigs.find(
              (c) => c.code === sel.countryCode
            )
            return (
              <div key={i} className="flex flex-col items-center p-1">
                {/* Country Flag */}
                <div className="w-6 h-4 mb-1 flex items-center justify-center bg-white rounded shadow-sm  ">
                  {country ? (
                    <img
                      src={country.flag}
                      alt={country.code}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">
                      {sel.countryCode}
                    </span>
                  )}
                </div>

                {/* Number Ball */}
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-b from-yellow-400 to-yellow-500 border-2 border-yellow-600 shadow-md mb-1">
                  <span className="text-yellow-900 font-black text-sm">
                    {sel.number}
                  </span>
                </div>

                {/* Country Code */}
                <span className="text-xs text-gray-600 font-semibold">
                  {country ? country.code : sel.countryCode}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Left Side Orange Border */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-yellow-400 flex items-center justify-center">
        <span className="text-white text-xs font-bold font-secondary transform -rotate-90 tracking-widest whitespace-nowrap">
          TICKET #{idx + 1}
        </span>
      </div>
    </motion.div>
  )
}

export default TicketCard
