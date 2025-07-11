import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { CiCircleAlert } from 'react-icons/ci'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { IoIosReturnLeft } from 'react-icons/io'
import { useAuth } from '../../../context/AuthContext'

const LoginForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { login, user, authErrors } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data) => {
    login(data)
    reset()
  }

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    } 
  }, [user, navigate])

  // Google Auth handler (replace with your real logic)
  const handleGoogleLogin = () => {
    alert('Google Auth coming soon!')
    // Here you would trigger your Google OAuth flow
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-96 flex flex-col items-center justify-center gap-y-1 text-white "
    >
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-2xl font-bold mb-1 font-secondary">Welcome Back</h2>
        <p className="text-gray-300 text-sm text-center">
          Please enter your credentials to log in to your account.
        </p>
      </div>

      {/*     EMAIL     */}
      <div className="flex flex-col mt-2 w-full">
        <label className="font-bold text-xs  px-2 mb-1">EMAIL</label>
        <input
          placeholder="Enter your email"
          type="text"
          className="w-full bg-white border text-black border-gray-300 text-xs rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          {...register('email', { required: true })}
        />
      </div>
      {errors.email && (
        <div className="mt-1 flex items-center gap-1  px-2 py-1  w-full text-red-600 text-[10px] font-semibold rounded">
          <CiCircleAlert />
          <span className="">Email is required</span>
        </div>
      )}

      {/*       PASSSWORD     */}
      <div className="flex flex-col mt-2 relative w-full">
        <label className="font-bold text-xs  px-2 mb-1">PASSWORD</label>
        <input
          placeholder="Enter your password"
          type={showPassword ? 'text' : 'password'}
          className="w-full bg-white text-black border border-gray-300 text-xs rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition pr-10"
          {...register('password', { required: true })}
        />
        <button
          type="button"
          className="absolute right-3 top-8 text-gray-400 hover:text-[#FFD700]"
          tabIndex={-1}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <IoEyeOff /> : <IoEye />}
        </button>
      </div>
      {errors.password && (
        <div className="mt-1 flex items-center gap-1  px-2 py-1  w-full text-red-600 text-[10px] font-semibold rounded">
          <CiCircleAlert />
          <span className="pl-1">Password is required </span>
        </div>
      )}

      {/* Backend auth errors */}
      {authErrors.length > 0 && (
        <div className="text-xs w-full bg-red-200 text-red-600 font-bold py-2 text-center mb-2 mt-1 rounded-md">
          {authErrors.map((err, idx) => (
            <div key={idx}>{err}</div>
          ))}
        </div>
      )}

      {/* Google Auth Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold shadow hover:bg-gray-50 transition mb-2 mt-4"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Sign in with Google
      </button>

      <button
        type="submit"
        className=" bg-[#FFD700] text-black text-sm font-bold w-full px-2 py-3 mt-2 hover:bg-yellow-500 rounded-xl shadow transition"
      >
        LOGIN
      </button>
      <div className="mt-6 border-b-2 border-gray-200 w-64"></div>
      <div className="mt-5 mr-3 flex flex-row items-center justify-center w-full">
        <IoIosReturnLeft className="text-[#FFD700] size-5 mt-1" />
        <Link
          to="/"
          className="text-sm font-bold p-2 text-zinc-100 hover:text-[#FFD700] transition"
        >
          GO BACK
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
