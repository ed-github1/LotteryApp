import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
// Improved inline avatar logic for Google Auth and fallback
import ProfileForm from './ProfileForm'
import SecurityActions from './SecurityActions'
import { useAuth } from '../../../context/AuthContext'

const MyAccount = () => {
  const { user, setUser } = useAuth()
  const [editMode, setEditMode] = useState(false)
  const [apiError, setApiError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting }
  } = useForm({
    defaultValues: user,
    mode: 'onBlur'
  })

  const onSubmit = async (data) => {
    setApiError('')
    setSuccess(false)
    try {
      await axios.put('/api/profile', data)
      setUser(data)
      setEditMode(false)
      setSuccess(true)
    } catch (err) {
      setApiError(err?.response?.data?.message || 'Error updating profile')
    }
  }

  const handleEdit = () => {
    reset(user)
    setEditMode(true)
    setSuccess(false)
    setApiError('')
  }

  const handleCancel = () => {
    setEditMode(false)
    reset(user)
    setApiError('')
    setSuccess(false)
  }

  // Avatar display logic: Google photo, fallback to first letter
  const getAvatarDisplay = () => {
    if (user.avatar) {
      return (
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.username || user.email || 'User'}
            className="w-28 h-28 rounded-full object-cover border-4 border-yellow-300 shadow-xl bg-white hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      );
    }
    
    // Fallback: first letter with improved styling
    const letter = (user.name || user.email || '?')[0]?.toUpperCase() || '?';
    const bgColors = [
      'bg-gradient-to-br from-yellow-400 to-yellow-600',
      'bg-gradient-to-br from-blue-400 to-blue-600',
      'bg-gradient-to-br from-pink-400 to-pink-600',
      'bg-gradient-to-br from-green-400 to-green-600',
      'bg-gradient-to-br from-purple-400 to-purple-600',
      'bg-gradient-to-br from-indigo-400 to-indigo-600',
      'bg-gradient-to-br from-red-400 to-red-600',
      'bg-gradient-to-br from-teal-400 to-teal-600',
    ];
    const colorIdx = letter.charCodeAt(0) % bgColors.length;
    
    return (
      <div className="relative">
        <div className={`w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-xl border-4 border-yellow-300 hover:scale-105 transition-transform duration-300 ${bgColors[colorIdx]}`}>
          {letter}
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 border-4 border-white rounded-full flex items-center justify-center cursor-pointer hover:bg-yellow-600 transition-colors">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#1a1d2e] to-[#232946] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFC300] bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-300 text-lg">Manage your account settings and preferences</p>
        </div>

        {/* Main Content Grid */}
        <div className="">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="text-center">
                {/* Avatar */}
                <div className="mb-4">
                  {getAvatarDisplay()}
                </div>
                
                {/* User Info */}
                <h2 className="text-xl font-bold text-white mb-1">
                  {user.name || 'User Name'}
                </h2>
                <p className="text-gray-300 text-sm mb-4">
                  {user.email || 'email@example.com'}
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-yellow-300 font-bold text-lg">12</div>
                    <div className="text-gray-400 text-xs">Tickets</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-green-300 font-bold text-lg">3</div>
                    <div className="text-gray-400 text-xs">Wins</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Account Information</h3>
                {!editMode && (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFC300] text-[#232946] rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                )}
              </div>
              
              <ProfileForm
                user={user}
                editMode={editMode}
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                errors={errors}
                isDirty={isDirty}
                isSubmitting={isSubmitting}
                apiError={apiError}
                success={success}
              />
            </div>
            
            {/* Security Section */}
            <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Security & Privacy</h3>
              <SecurityActions />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
