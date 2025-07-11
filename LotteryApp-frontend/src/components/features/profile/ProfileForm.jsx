import { BiPencil } from 'react-icons/bi'

const ProfileForm = ({
  user,
  editMode,
  register,
  handleSubmit,
  onSubmit,
  handleEdit,
  handleCancel,
  errors,
  isDirty,
  isSubmitting,
  apiError,
  success
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex-1">
      <h2 className="text-2xl font-bold text-gray-800">
        {editMode ? (
          <input
            {...register('firstName', { required: 'First name is required' })}
            className={`border-b border-yellow-300 focus:outline-none px-1 py-2 w-full ${errors.firstName ? 'border-red-500' : ''}`}
            aria-invalid={!!errors.firstName}
            aria-label="First name"
            autoComplete="given-name"
            disabled={isSubmitting}
          />
        ) : (
          user.firstName
        )}
      </h2>
      {errors.firstName && (
        <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
      )}
      <p className="text-gray-500">
        {editMode ? (
          <input
            {...register('lastName', { required: 'Last name is required' })}
            className={`border-b border-yellow-300 focus:outline-none px-1 py-2 w-full ${errors.lastName ? 'border-red-500' : ''}`}
            aria-invalid={!!errors.lastName}
            aria-label="Last name"
            autoComplete="family-name"
            disabled={isSubmitting}
          />
        ) : (
          user.lastName
        )}
      </p>
      {errors.lastName && (
        <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
      )}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
        <span className="text-xs text-gray-500">Email</span>
        <span className="font-semibold text-gray-800">
          {editMode ? (
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              className={`border-b border-yellow-300 focus:outline-none px-1 py-2 w-full ${errors.email ? 'border-red-500' : ''}`}
              aria-invalid={!!errors.email}
              aria-label="Email"
              autoComplete="email"
              disabled={isSubmitting}
            />
          ) : (
            user.email
          )}
        </span>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
        <span className="text-xs text-gray-500">Phone</span>
        <span className="font-semibold text-gray-800 flex items-center gap-2">
          {editMode ? (
            <>
              <input
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\d{2} \d{2} \d{2} \d{2}$/,
                    message: 'Invalid phone number'
                  }
                })}
                className={`border-b border-yellow-300 focus:outline-none px-1 py-2 w-full ${errors.phone ? 'border-red-500' : ''}`}
                aria-invalid={!!errors.phone}
                aria-label="Phone number"
                autoComplete="tel"
                disabled={isSubmitting}
              />
              <BiPencil className="w-4 h-4 text-yellow-500" />
            </>
          ) : (
            user.phone
          )}
        </span>
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 mt-4">
      {editMode ? (
        <>
          <button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition disabled:opacity-60"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          type="button"
          className="mt-4 sm:mt-0 px-4 py-2 bg-[#FFD700] text-black font-semibold rounded-lg shadow hover:bg-[#FFC300] transition"
          onClick={handleEdit}
        >
          Edit Profile
        </button>
      )}
    </div>
    {apiError && <p className="text-red-500 text-xs mt-2">{apiError}</p>}
    {success && <p className="text-green-600 text-xs mt-2">Profile updated successfully!</p>}
  </form>
)

export default ProfileForm