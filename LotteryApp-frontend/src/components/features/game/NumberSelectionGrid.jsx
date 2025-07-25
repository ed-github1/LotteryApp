const NumberSelectionGrid = ({
  selectedCountry,
  countrySelections,
  handleNumberSelect,
  isModal = false,
  onClose,
  onRandomize
}) => {
  if (!selectedCountry) return null

  const content = (
    <div
      className={`w-full max-w-md bg-white rounded-xl shadow-lg p-6 ${
        isModal ? '' : 'mb-6'
      }`}
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-secondary font-extrabold text-zinc-400 mb-2">
          Pick Your Lucky Number
        </h3>
        <div className="flex items-center justify-center">
          <img
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            className="h-6 w-auto mr-2"
          />
          <span className="text-gray-600 font-title">
            {selectedCountry.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-9 gap-x-2 gap-y-2.5">
        {Array(selectedCountry.totalNumbers)
          .fill(0)
          .map((_, i) => {
            const number = i + 1
            const selected = countrySelections[selectedCountry.code] === number
            return (
              <button
                key={number}
                onClick={() => handleNumberSelect(number)}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-150 ${
                  selected
                    ? 'bg-[#FFD700] text-white shadow-lg scale-110'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-orange-100 hover:border-orange-300'
                }`}
              >
                {number}
              </button>
            )
          })}
      </div>

      {isModal && (
        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#FFD700] text-gray-700 font-bold hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onRandomize}
            className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
          >
            🎲
          </button>
        </div>
      )}
    </div>
  )

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="w-full max-w-md">{content}</div>
      </div>
    )
  }

  return content
}

export default NumberSelectionGrid


