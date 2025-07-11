import { useForm } from 'react-hook-form'
import { useAuth } from '../../../context/AuthContext'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

// Reusable Input component
const InputField = ({
  type = 'text',
  placeholder,
  error,
  registerProps,
  rightIcon,
  onRightIconClick
}) => (
  <div className="relative w-full">
    <input
      type={type}
      className={`w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-gray-900 ${
        rightIcon ? 'pr-12' : ''
      }`}
      placeholder={placeholder}
      {...registerProps}
    />
    {rightIcon && (
      <button
        type="button"
        tabIndex={-1}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-400"
        onClick={onRightIconClick}
        aria-label={type === 'password' ? 'Show password' : 'Hide password'}
      >
        {rightIcon}
      </button>
    )}
    {error && <span className="text-red-600 text-xs mt-1 block">{error}</span>}
  </div>
)

const RegisterForm = () => {
  const { createUser, authErrors } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    // Trim whitespace from all fields
    const sanitizedData = {
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password.trim()
    }
    console.log(sanitizedData)
    await createUser(sanitizedData)
    reset()
  })

  return (
    <form
      onSubmit={onSubmit}
      className="text-white flex flex-col gap-y-3 items-center justify-center w-96 h-full"
    >
      <h2 className="text-3xl font-secondary font-bold text-center  mb-2 drop-shadow">
        Create your free account
      </h2>
      <p className="text-center text-gray-300 mb-4">
        Join now for a chance to win amazing prizes!
      </p>
      <InputField
        placeholder="username"
        error={errors.username?.message}
        registerProps={register('username', {
          required: 'Please enter your name.',
          minLength: {
            value: 2,
            message: 'username must be at least 2 characters.'
          },
          maxLength: {
            value: 50,
            message: 'username must be less than 50 characters.'
          },
          validate: (value) =>
            value.trim() !== '' || 'username cannot be empty.'
        })}
      />
      <InputField
        type="email"
        placeholder="Email"
        error={errors.email?.message}
        registerProps={register('email', {
          required: 'Please enter your email address.',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please enter a valid email address.'
          },
          validate: (value) => value.trim() !== '' || 'Email cannot be empty.'
        })}
      />
      <InputField
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        error={errors.password?.message}
        registerProps={register('password', {
          required: 'Please enter a password.',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters.'
          },
          maxLength: {
            value: 100,
            message: 'Password must be less than 100 characters.'
          },
          validate: (value) =>
            value.trim() !== '' || 'Password cannot be empty.'
        })}
        rightIcon={showPassword ? <FaEyeSlash /> : <FaEye />}
        onRightIconClick={() => setShowPassword((prev) => !prev)}
      />
      <button
        type="submit"
        className="w-full px-4 py-3 mt-2 rounded-lg bg-gradient-to-b from-[#FFD700] to-[#FFC300] text-gray-900 font-bold text-lg shadow-md hover:from-[#FFC300] transition border border-gray-200"
      >
        Register Now
      </button>

      {authErrors.length > 0 && (
        <div className="text-xs w-full bg-red-200 text-red-600 font-bold py-2 text-center mb-2 mt-1 rounded-md">
          {authErrors.map((err, idx) => (
            <div key={idx}>{err}</div>
          ))}
        </div>
      )}

      <GoogleAuth />
      <p className="text-center text-gray-400 text-xs mt-2">
        By registering, you agree to our{' '}
        <a href="#" className="text-[#FFD700] underline">
          Terms
        </a>{' '}
        and{' '}
        <a href="#" className="text-[#FFD700] underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  )
}

const GoogleAuth = () => {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold shadow hover:bg-gray-50 transition mb-2"
      onClick={() => {
        alert('Google Auth coming soon!')
      }}
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      Sign up with Google
    </button>
  )
}

export default RegisterForm
