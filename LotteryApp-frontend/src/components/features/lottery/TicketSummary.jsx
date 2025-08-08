import TicketCard from "./TicketCard"

const TicketSummary = ({ tickets = [], handleDeleteTicket, countryConfigs }) => (
  <div className="max-h-screen overflow-y-auto space-y-4 pr-2">
    {tickets.map((ticket, idx) => (
      <TicketCard
        key={idx}
        ticket={ticket}
        idx={idx}
        onDelete={() => handleDeleteTicket(idx)}
        countryConfigs={countryConfigs}
      />
    ))}
  </div>
)

export default TicketSummary