import { useEffect, useState } from 'react'
import RegisterForm from '../features/auth/RegisterForm'
import Notification from '../common/Nofication'
import { useAuth } from '../../context/AuthContext'
import Slider from '../common/Slider'

const Register = () => {
  const [showNotif, setShowNotif] = useState(false)
  const { message } = useAuth()

  useEffect(() => {
    if (message) {
      setShowNotif(true)
    }
  }, [message])

  return (
    <>
      <Notification
        show={showNotif}
        type="success"
        onClose={() => setShowNotif(false)}
        message={message}
      />
      <div className="flex lg:flex-row h-screen  bg-zinc-800">
        <div className='w-full flex items-center justify-center inset-0 px-8 lg:w-2/5'>
          <RegisterForm />
        </div>
        <div className='hidden lg:w-3/5 lg:block w-full'>
          <Slider />
        </div>
      </div>
    </>
  )
}

export default Register
