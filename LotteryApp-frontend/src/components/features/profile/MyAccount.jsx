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



  return (
  <div className="min-h-screen bg-zinc-800 p-4 sm:p-6 ml-0 sm:ml-64">
      <div className="max-w-4xl mx-auto">


        {/* Main Content Grid */}
        <div className="">


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
