import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'
import { verifyEmail } from '../../services/authService'

const EmailVerification = () => {
  const [status, setStatus] = useState('loading')
  const location = useLocation()

  // Helper to get token from query string
  const getToken = () => {
    const params = new URLSearchParams(location.search)
    return params.get('token')
  }

  useEffect(() => {
    const token = getToken()
    if (!token) {
      setStatus('error')
      return
    }
    verifyEmail(token)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
  }, [location])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232946] to-[#1A237E] px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center">
        {status === 'loading' && (
          <div className="text-[#FFD700] text-lg">Verifying...</div>
        )}
        {status === 'success' && (
          <>
            <IoCheckmarkCircleOutline className="text-[#43A047] text-6xl mb-4 drop-shadow" />
            <h1 className="text-2xl font-title font-bold text-[#232946] mb-2 text-center">
              Email Verified!
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Your email address has been successfully verified.
              <br />
              You can now enjoy all the features of Lottery App.
            </p>
            <a
              href="/"
              className="w-full py-3 rounded-lg bg-gradient-to-b from-[#FFD700] to-[#FFC300] text-gray-900 font-bold text-lg shadow-md hover:from-[#FFC300] transition text-center"
            >
              Go to Dashboard
            </a>
          </>
        )}
        {status === 'error' && (
          <>
            <IoCloseCircleOutline className="text-red-500 text-6xl mb-4 drop-shadow" />
            <h1 className="text-2xl font-title font-bold text-[#232946] mb-2 text-center">
              Verification Failed
            </h1>
            <p className="text-gray-600 text-center mb-6">
              The verification link is invalid or expired.
              <br />
              Please request a new verification email.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default EmailVerification
