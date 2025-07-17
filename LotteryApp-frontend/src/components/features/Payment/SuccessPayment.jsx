import React from 'react'
import { Link } from 'react-router-dom'

const SuccessPayment = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6] px-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-100 flex flex-col items-center">
      <div className="mb-6">
        <svg className="mx-auto mb-4" width="64" height="64" fill="none" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="32" fill="#D1FAE5"/>
          <path d="M20 34l8 8 16-16" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 className="text-2xl font-bold text-green-600 text-center mb-2">Payment Successful!</h2>
        <p className="text-gray-600 text-center">
          Your order has been processed.<br />
          Good luck in the draw!
        </p>
      </div>
      <Link
        to="/"
        className="w-full py-3 rounded-xl bg-green-500 text-white font-bold text-center hover:bg-green-600 transition"
      >
        Back to Home
      </Link>
    </div>
  </div>
)

export default SuccessPayment