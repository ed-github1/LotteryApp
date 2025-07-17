import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserProvider } from './context/UsersContext'
import { AuthProvider } from './context/AuthContext'
import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import EmailVerification from './components/pages/EmailVerification'
import ProtectedRoutes from './components/features/auth/ProtectedRoutes'
import MyAccount from './components/features/profile/MyAccount'
import Draws from './components/features/dashboard/Draws'
import DashboardLayout from './components/layout/DashboardLayout'
import NotFound from './components/pages/NotFound'
import LotteryMatrix from './components/features/game/LotteryMatrix'
import LoteriaResultados from './components/pages/LoteriaResultados'
import { TicketProvider } from './context/TicketContext'
import Settings from './components/features/dashboard/Settings'
import SuccessPayment from './components/features/Payment/SuccessPayment'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <TicketProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="Success" element={<SuccessPayment />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route path="draws" element={<Draws />} />
                  <Route path="my-account" element={<MyAccount />} />
                  <Route path="buy-ticket" element={<LotteryMatrix />} />
                  <Route path="results" element={<LoteriaResultados />} />
                  <Route path="Settings" element={<Settings />} />
                </Route>
              </Route>
            </Routes>
          </TicketProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
