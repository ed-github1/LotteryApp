import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import ProfileAvatar from './ProfileAvatar'
import ProfileForm from './ProfileForm'
import SecurityActions from './SecurityActions'
import { useAuth } from '../../../context/AuthContext'
const MyAccount = () => {
  const { user } = useAuth()
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

  const handlePhotoChange = () => {
    // Implement photo upload logic here
    alert('Change photo clicked')
  }

  const handlePhotoDelete = () => {
    setUser({ ...user, avatar: '' })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <main className="w-full max-w-3xl bg-white shadow rounded-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          My Profile
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full max-w-md mx-auto">
            <ProfileAvatar
              avatar={user.avatar}
              editMode={editMode}
              onPhotoChange={handlePhotoChange}
              onPhotoDelete={handlePhotoDelete}
            />
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
          <SecurityActions />
        </div>
      </main>
    </div>
  )
}

export default MyAccount
