

import { useState } from 'react'

const SecurityActions = ({ editMode, handleCancel, handleSave }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [enable2FA, setEnable2FA] = useState(false)
  const [privacyConsent, setPrivacyConsent] = useState(true)

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 w-full">
      <h2 className="text-xl font-bold text-white mb-6">Security & Privacy</h2>
      <form className="space-y-6">
        {/* Change Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Change Password</label>
          {editMode ? (
            <div className="flex items-center gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-200"
                placeholder="New password"
              />
              <button
                type="button"
                className="px-3 py-2 rounded-lg bg-yellow-300 text-[#232946] font-bold hover:bg-yellow-400 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="password"
                value={password ? '********' : ''}
                disabled
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 opacity-60 cursor-not-allowed"
                placeholder="********"
              />
            </div>
          )}
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-300 font-medium">Enable Two-Factor Authentication</label>
          {editMode ? (
            <input
              type="checkbox"
              checked={enable2FA}
              onChange={e => setEnable2FA(e.target.checked)}
              className="form-checkbox h-5 w-5 text-yellow-400 border-gray-300 rounded focus:ring-yellow-300"
            />
          ) : (
            <input
              type="checkbox"
              checked={enable2FA}
              disabled
              className="form-checkbox h-5 w-5 text-yellow-400 border-gray-300 rounded opacity-60 cursor-not-allowed"
            />
          )}
        </div>

        {/* Privacy Consent */}
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-300 font-medium">Allow personalized offers & notifications</label>
          {editMode ? (
            <input
              type="checkbox"
              checked={privacyConsent}
              onChange={e => setPrivacyConsent(e.target.checked)}
              className="form-checkbox h-5 w-5 text-yellow-400 border-gray-300 rounded focus:ring-yellow-300"
            />
          ) : (
            <input
              type="checkbox"
              checked={privacyConsent}
              disabled
              className="form-checkbox h-5 w-5 text-yellow-400 border-gray-300 rounded opacity-60 cursor-not-allowed"
            />
          )}
        </div>

        {/* Account Actions */}
        {editMode ? (
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button type="button" className="flex-1 px-4 py-2 bg-yellow-300 text-[#232946] font-bold rounded-lg shadow hover:bg-yellow-400 transition" onClick={handleSave}>
              Save Changes
            </button>
            <button type="button" className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg shadow hover:bg-gray-300 transition" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" className="flex-1 px-4 py-2 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition">
              Delete Account
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button type="button" className="flex-1 px-4 py-2 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition">
              Delete Account
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default SecurityActions