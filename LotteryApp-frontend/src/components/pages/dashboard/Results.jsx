import { useTicket } from '../../../context/TicketContext'
import { useOrders } from '../../../context/OrdersContext'; // Import useOrders from OrdersContext
import { useState } from 'react';
import NextDrawBanner from '../../common/NextDrawBanner';
const Results = () => {
  const { countryConfigs } = useTicket() // Access merged countryConfigs from context
  const { orders } = useOrders(); // Access orders from OrdersContext

  // Pagination state: which week to show (0 = current week, 1 = next week, ...)
  const [weekOffset, setWeekOffset] = useState(0);

  // Helper to get start/end of a week given a date and offset
  function getWeekRange(date, offset = 0) {
    const d = new Date(date);
    // Set to start of week (Monday)
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + offset * 7);
    d.setHours(0, 0, 0, 0);
    const start = new Date(d);
    const end = new Date(d);
    end.setDate(start.getDate() + 7);
    return { start, end };
  }

  // Get current week range based on today and weekOffset
  const { start: weekStart, end: weekEnd } = getWeekRange(new Date(), weekOffset);

  // Extract tickets from orders
  const allTickets = orders.flatMap((order) => order.tickets);

  // Filter tickets: at least one drawDate in this week
  const tickets = allTickets.filter(ticket => {
    if (!ticket.drawDate) return false;
    return Object.values(ticket.drawDate).some(dateStr => {
      const d = new Date(dateStr);
      return d >= weekStart && d < weekEnd;
    });
  });

  // Pagination controls
  function handlePrevWeek() {
    setWeekOffset(weekOffset - 1);
  }
  function handleNextWeek() {
    setWeekOffset(weekOffset + 1);
  }

  // Week label for current week
  const weekLabel = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(weekEnd.getTime() - 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  // Week range for next week (for upcoming draws)
  const { start: nextWeekStart, end: nextWeekEnd } = getWeekRange(new Date(), weekOffset + 1);
  const nextWeekLabel = `${nextWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(nextWeekEnd.getTime() - 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

  return (
    <div className="min-h-screen bg-zinc-800">

      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 mt-5">

          <p className="text-gray-300 font-secondary text-lg">Check your numbers against the winning combinations</p>
        </div>

        {/* Unified Pagination Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 w-full">
          <button
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-base transition-all duration-200 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-[#232946] to-[#FFD700] text-white hover:from-[#FFD700] hover:to-[#FFC300] hover:text-[#232946] ${weekOffset === 0 ? 'opacity-60 cursor-not-allowed' : ''} w-full sm:w-auto`}
            onClick={handlePrevWeek}
            disabled={weekOffset === 0}
            style={{ minHeight: '56px' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            <span>Previous Results</span>
          </button>
          {/* Compact date range selector design */}
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 shadow-lg cursor-pointer hover:bg-white/20 transition-all duration-200 w-full sm:w-auto justify-center" style={{ minHeight: '56px' }}>
            <svg className="w-6 h-6 text-[#FFD700]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" /><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" /></svg>
            <span className="font-bold text-base text-white font-secondary tracking-wide">{weekLabel}</span>
          </div>
          <button
            className="flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-base transition-all duration-200 shadow-lg bg-gradient-to-r from-[#FFD700] to-[#FFC300] text-[#232946] hover:from-[#FFC300] hover:to-[#FFD700] hover:text-[#232946] w-full sm:w-auto"
            onClick={handleNextWeek}
            style={{ minHeight: '56px' }}
          >
            <span>Upcoming Draws</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Winning Numbers or Upcoming Numbers Table (only one visible at a time) */}
        {weekOffset === 0 ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-6 text-center tracking-wider">🏆 Winning Numbers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {countryConfigs.map((country) => {
                // Aggregate all draw dates for this country from all tickets in this week
                const drawDates = tickets
                  .map(ticket => ticket.drawDate && ticket.drawDate[country.code])
                  .filter(Boolean)
                  .map(dateStr => new Date(dateStr));
                // Get the earliest draw date (if any)
                let formattedDrawDate = '';
                if (drawDates.length > 0) {
                  const earliest = drawDates.reduce((min, d) => d < min ? d : min, drawDates[0]);
                  formattedDrawDate = earliest.toLocaleString('en-US', {
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
                  });
                }
                return (
                  <div
                    key={country.code}
                    className="flex flex-col items-center gap-3 p-4 backdrop-blur-sm rounded-xl border border-[#FFD700]/30 hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={country.flag}
                      alt={country.name}
                      className="h-8 w-8 object-contain drop-shadow-md"
                    />
                    <div className="h-12 w-12 border-3 font-bold bg-gradient-to-br from-[#FFD700] to-[#FFC300] text-[#232946] border-[#FFD700] shadow-lg rounded-full flex items-center justify-center text-lg">
                      {country.winnerNumber !== null ? country.winnerNumber : '?'}
                    </div>
                    <span className="text-xs font-medium text-white/90 text-center">
                      {country.name}
                    </span>
                    {formattedDrawDate && (
                      <span className="text-[10px] text-gray-300 font-normal mt-0.5">{formattedDrawDate}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-6 text-center tracking-wider">⏳ Upcoming Winning Numbers</h2>
            <div className="text-center text-xs text-gray-300 mb-4">
              {nextWeekLabel}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {countryConfigs.map((country) => {
                // Aggregate all draw dates for this country from all tickets in the next week
                const nextWeekTickets = allTickets.filter(ticket => {
                  if (!ticket.drawDate) return false;
                  return Object.values(ticket.drawDate).some(dateStr => {
                    const d = new Date(dateStr);
                    return d >= nextWeekStart && d < nextWeekEnd;
                  });
                });
                const drawDates = nextWeekTickets
                  .map(ticket => ticket.drawDate && ticket.drawDate[country.code])
                  .filter(Boolean)
                  .map(dateStr => new Date(dateStr));
                let formattedDrawDate = '';
                if (drawDates.length > 0) {
                  const earliest = drawDates.reduce((min, d) => d < min ? d : min, drawDates[0]);
                  formattedDrawDate = earliest.toLocaleString('en-US', {
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
                  });
                }
                return (
                  <div
                    key={country.code}
                    className="flex flex-col items-center gap-3 p-4 backdrop-blur-sm rounded-xl border border-[#FFD700]/30 opacity-50"
                  >
                    <img
                      src={country.flag}
                      alt={country.name}
                      className="h-8 w-8 object-contain drop-shadow-md"
                    />
                    <div className="h-12 w-12 border-3 font-bold bg-gradient-to-br from-gray-200 to-gray-300 text-gray-500 border-[#FFD700] shadow-lg rounded-full flex items-center justify-center text-lg">
                      ?
                    </div>
                    <span className="text-xs font-medium text-white/60 text-center">
                      {country.name}
                    </span>
                    {formattedDrawDate && (
                      <span className="text-[10px] text-gray-300 font-normal mt-0.5">{formattedDrawDate}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Ticket Selections */}
        <div className="mt-10 bg-zinc-800 rounded-2xl p-4 min-h-[200px]">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tickets.length > 0 ? tickets.map((ticket, index) => {
              const transformedSelections = Array.isArray(ticket.selections)
                ? ticket.selections
                : Object.entries(ticket.selections).map(([countryCode, number]) => ({ countryCode, number }));
              return (
                <div
                  key={index}
                  className="relative p-6 bg-white backdrop-blur-md rounded-2xl shadow-xl border border-white/20 flex flex-col gap-2 hover:scale-[1.02] transition-transform duration-200 overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-yellow-400 flex items-center justify-center">
                    <span className="text-white text-xs font-bold font-secondary transform -rotate-90 tracking-widest whitespace-nowrap">
                      TICKET
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-start items-center">
                    {transformedSelections.length > 0 ? (
                      transformedSelections.map(({ countryCode, number }) => {
                        const country = countryConfigs.find((c) => c.code === countryCode);
                        const isWinner = country && country.winnerNumber === number;
                        const isChecked = country && country.winnerNumber !== null;
                        // Get draw date for this country from ticket.drawDate
                        const drawDate = ticket.drawDate && ticket.drawDate[countryCode];
                        // Format date as e.g. 'Aug 1, 19:00'
                        let formattedDrawDate = '';
                        let drawHasPassed = false;
                        if (drawDate) {
                          const d = new Date(drawDate);
                          formattedDrawDate = d.toLocaleString('en-US', {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
                          });
                          drawHasPassed = d <= new Date();
                        }
                        return (
                          <div
                            key={countryCode + number}
                            className={`flex flex-col items-center`}
                          >
                            <span className="text-xs font-semibold text-[#232946] mb-1">{countryCode}</span>
                            {/* Only show winner/loser icon and number if draw has passed */}
                            <div className={`size-8 flex items-center justify-center rounded-full font-bold text-lg shadow-md border-2 ${drawHasPassed ? (isChecked ? (isWinner ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700') : 'bg-yellow-100 border-yellow-400 text-yellow-700') : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
                              {drawHasPassed
                                ? (isChecked
                                  ? (isWinner
                                    ? <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    : '❌')
                                  : number)
                                : number}
                            </div>
                            <span className="text-xs text-gray-400 font-bold">{number}</span>
                            {formattedDrawDate && (
                              <span className="text-[8px] text-gray-400 font-normal mt-0.5 block text-center w-full">{formattedDrawDate}</span>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-400">No selections available</p>
                    )}
                  </div>
                </div>
              );
            }) : (
              <p className="text-gray-400 text-center col-span-2">No tickets for this week.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results
