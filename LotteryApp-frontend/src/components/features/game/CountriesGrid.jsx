const CountriesGrid = ({
  countryConfigs,
  countrySelections,
  selectedCountry,
  handleCountrySelect
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {countryConfigs.map((country) => (
        <div key={country.code} className="flex flex-col items-center">
          {/* Flag */}
          <div className="w-10 h-8 mb-2 flex items-center justify-center bg-gray-50">
            <img src={country.flag} alt={country.name} className="h-6 w-auto" />
          </div>

          {/* Country Code */}
          <span className="text-xs font-semibold text-gray-600 mb-1">
            {country.code}
          </span>

          {/* Number ball*/}
          <button
            className={`w-12 h-12 rounded-full border-2 font-bold text-lg transition-all duration-200 ${
              countrySelections[country.code]
                ? 'bg-[#FFD700] text-yellow-900 border-yellow-500 shadow-lg'
                : selectedCountry?.code === country.code
                ? 'bg-orange-100 text-yellow-900 bg-gradient-to-b from-yellow-400 to-yellow-500 border-2 border-yellow-600 '
                : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-yellow-50 hover:border-yellow-200'
            }`}
            onClick={() => handleCountrySelect(country)}
          >
            {countrySelections[country.code] || '?'}
          </button>

          {/* Country Name */}
          <span className="text-xs text-gray-500 mt-1 text-center leading-tight">
            {country.name.split(' ')[0]}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CountriesGrid
