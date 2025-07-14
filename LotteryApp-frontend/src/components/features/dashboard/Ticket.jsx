const Ticket = ({ ticket, idx, onDelete }) => {
  const numbersArray = Array.isArray(ticket.numbers)
    ? ticket.numbers
    : ticket.numbers !== undefined
      ? [ticket.numbers]
      : []

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
        {numbersArray.map((num, i) => (
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
}


export default Ticket


