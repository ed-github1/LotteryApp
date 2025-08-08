import { useTicket } from '../../context/TicketContext';
import { useOrders } from '../../context/OrdersContext';
import React from 'react';

// Utility to get the next upcoming draw from API drawDates
function getNextDrawFromApi(drawDates, countryConfigs) {
  const now = new Date();
  let soonest = null;
  let soonestCountry = null;
  const safeDrawDates = Array.isArray(drawDates) ? drawDates : [];

  safeDrawDates.forEach(draw => {
    // draw: { countryCode, drawDate }
    const d = new Date(draw.drawDate);
    if (d > now && (!soonest || d < soonest)) {
      soonest = d;
      soonestCountry = countryConfigs.find(c => c.code === draw.countryCode);
    }
  });

  // Debug: log all upcoming draws from API
  if (safeDrawDates.length > 0) {
    // eslint-disable-next-line no-console
    console.log('API Upcoming draws:', safeDrawDates.map(draw => ({
      country: draw.countryCode,
      date: draw.drawDate,
      parsed: new Date(draw.drawDate).toString(),
      local: new Date(draw.drawDate).toLocaleString(),
      now: now.toString(),
    })));
  }

  return soonest && soonestCountry ? { date: soonest, country: soonestCountry } : null;
}

const NextDrawBanner = () => {
  const { countryConfigs } = useTicket();
  const { drawDates } = useOrders();
  const nextDraw = getNextDrawFromApi(drawDates, countryConfigs);

  if (!nextDraw) {
    return (
      <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl border border-white/20 shadow-lg">
        <span className="text-gray-300 font-bold text-sm">No upcoming draws</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl border border-white/20 shadow-lg">
      <img
        src={nextDraw.country.flag}
        alt={nextDraw.country.name}
        className="h-8 w-8 object-contain drop-shadow-md"
      />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-white/90">Next Draw</span>
        <span className="text-sm font-bold text-[#FFD700]">
          {nextDraw.date.toLocaleString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
          })}
        </span>
        <span className="text-xs text-white/70">{nextDraw.country.name}</span>
      </div>
    </div>
  );
};

export default NextDrawBanner;
