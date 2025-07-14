import React, { useState } from 'react'

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'FR', name: 'France' },
  // Add more countries as needed
]

const TOTAL_NUMBERS = 50 // You can adjust per country if needed

const SelectCountry = ({ onContinue }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedNumber, setSelectedNumber] = useState(null)

  const handleCountryClick = (country) => {
    setSelectedCountry(country)
    setSelectedNumber(null)
  }

  const handleNumberSelect = (number) => {
    setSelectedNumber(number)
  }

  const handleContinue = () => {
    if (selectedCountry && selectedNumber) {
      onContinue({ country: selectedCountry, number: selectedNumber })
      setSelectedCountry(null)
      setSelectedNumber(null)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow">
      {!selectedCountry ? (
        <>
          <h2 className="text-xl font-bold mb-4">Select a Country</h2>
          <div className="grid grid-cols-2 gap-4">
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleCountryClick(country)}
                className="py-3 px-4 rounded-lg bg-blue-50 hover:bg-blue-100 font-semibold text-gray-700 transition"
              >
                {country.name}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">
            Pick a Number for {selectedCountry.name}
          </h2>
          <div className="grid grid-cols-10 gap-2 mb-6">
            {Array(TOTAL_NUMBERS)
              .fill(0)
              .map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handleNumberSelect(i + 1)}
                  className={`w-10 h-10 rounded-full font-bold border-2 transition
                    ${selectedNumber === i + 1
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100'}
                  `}
                >
                  {i + 1}
                </button>
              ))}
          </div>
          <button
            onClick={handleContinue}
            disabled={!selectedNumber}
            className={`w-full py-3 rounded-lg font-bold transition ${
              selectedNumber
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
          <button
            onClick={() => setSelectedCountry(null)}
            className="mt-2 w-full py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-semibold"
          >
            Back
          </button>
        </>
      )}
    </div>
  )
}

export default SelectCountry