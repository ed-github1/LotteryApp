import React, { useState } from 'react';
import axios from '../../services/axiosInterceptors';

const WinnerNumberUpload = ({ isAdmin }) => {
  const [countryCode, setCountryCode] = useState('');
  const [drawDate, setDrawDate] = useState('');
  const [winnerNumber, setWinnerNumber] = useState('');
  const [status, setStatus] = useState('');

  if (!isAdmin) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const res = await axios.post('/winner-number/upload', {
        countryCode,
        drawDate,
        winnerNumber: Number(winnerNumber)
      });
      setStatus('Winner number uploaded!');
      setCountryCode('');
      setDrawDate('');
      setWinnerNumber('');
    } catch (err) {
      setStatus('Error uploading winner number');
    }
  };

  return (
    <div className="min-h-screen  sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-2 overflow-y-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFC300] bg-clip-text text-transparent mb-2">
              Upload Winner Number
            </h2>
            <p className="text-gray-300">Set the winning number for a specific country and draw date</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Country Code</label>
              <input
                type="text"
                placeholder="e.g. CA, IT, MX"
                value={countryCode}
                onChange={e => setCountryCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Draw Date & Time</label>
              <input
                type="datetime-local"
                value={drawDate}
                onChange={e => setDrawDate(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Winner Number</label>
              <input
                type="number"
                placeholder="Enter winning number"
                value={winnerNumber}
                onChange={e => setWinnerNumber(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all duration-200"
                required
                min="1"
                max="99"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FFC300] text-[#232946] font-bold rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              Upload Winner Number
            </button>
          </form>
          
          {status && (
            <div className={`mt-6 p-4 rounded-xl text-center font-medium ${
              status.includes('Error') 
                ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                : 'bg-green-500/20 text-green-300 border border-green-500/30'
            }`}>
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WinnerNumberUpload;
