import { useTicket } from '../../context/TicketContext'

const Results = () => {
  const { countryConfigs, tickets } = useTicket() // Access merged countryConfigs and tickets from context

  const getResultSymbol = (countryCode, number) => {
    const country = countryConfigs.find((c) => c.code === countryCode);
    if (!country || country.winnerNumber === null) {
      return '?'; // Question mark if there is no winner number
    }
    if (country.winnerNumber === number) {
      return '⭐'; // Star for winners
    }
    return '❌'; // Red cross for non-winners
  };

  return (
    <div className="p-6 min-h-screen text-white">
      <h2 className="text-3xl font-extrabold text-yellow-300 mb-6 text-center">
        Results
      </h2>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {countryConfigs.map((country) => (
          <div
            key={country.code}
            className="flex flex-col items-center gap-2 p-4 bg-gradient-to-b from-yellow-400 to-yellow-200 rounded-lg shadow-xl border-4 border-yellow-500"
          >
            <img
              src={country.flag}
              alt={country.name}
              className="h-12 w-12 object-contain shadow-md"
            />
            <div className="h-10 w-10 lg:h-12 lg:w-12 border-4 font-extrabold bg-yellow-500 text-yellow-900 border-yellow-700 shadow-inner rounded-full flex items-center justify-center">
              {country.winnerNumber !== null ? country.winnerNumber : '-'}
            </div>
            <span className="text-sm lg:text-base font-bold text-yellow-100">
              {country.name}
            </span>
          </div>
        ))}
      </div>

      {/* Ticket Selections */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-yellow-300 mb-4 text-center">
          Your Ticket Selections
        </h3>
        <div className="space-y-4">
          {tickets.map((ticket, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-300"
            >
              <h4 className="text-lg font-bold text-gray-700 mb-2">
                Ticket {index + 1}
              </h4>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {ticket.selections.map(({ countryCode, number }) => (
                  <div
                    key={countryCode}
                    className="flex flex-col items-center gap-1 p-2 bg-gray-100 rounded-md shadow-sm"
                  >
                    <span className="text-sm font-medium text-gray-600">
                      {countryCode}
                    </span>
                    <div className="h-8 w-8 lg:h-10 lg:w-10 border-2 font-bold bg-gray-200 text-gray-800 border-gray-400 shadow-inner rounded-full flex items-center justify-center">
                      {getResultSymbol(countryCode, number)}
                    </div>
                    <span className="text-xs text-gray-500">{number}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results
