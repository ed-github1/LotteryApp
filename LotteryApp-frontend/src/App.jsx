import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserProvider } from './context/UsersContext'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import EmailVerification from './components/pages/EmailVerification'
import ProtectedRoutes from './components/features/auth/ProtectedRoutes'
import MyAccount from './components/features/profile/MyAccount'
import Draws from './components/features/dashboard/Draws'
import DashboardLayout from './components/layout/DashboardLayout'
import NotFound from './components/pages/NotFound'
import LotteryMatrix from './components/features/lottery/LotteryMatrix'
import { TicketProvider } from './context/TicketContext'
import Settings from './components/features/dashboard/Settings'
import SuccessPayment from './components/features/Payment/SuccessPayment'
import { OrdersProvider } from './context/OrdersContext'
import Results from './components/pages/dashboard/Results'
import WinnerNumberUploadPage from './components/pages/WinnerNumberUploadPage'
import OrderSummaryPage from './components/pages/OrderSummaryPage'

const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <UserProvider>
            <TicketProvider>
              <OrdersProvider>
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
                    <Route path="results" element={<Results />} />
                    <Route path="Settings" element={<Settings />} />
                    <Route path="upload-winner-number" element={<WinnerNumberUploadPage/>}  />
                    <Route path="order-summary" element={<OrderSummaryPage />} />
                  </Route>
                </Route>
              </Routes>
            </OrdersProvider>
          </TicketProvider>
        </UserProvider>
      </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
