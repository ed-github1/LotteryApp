import { Outlet } from 'react-router-dom'
import Sidebar from '../layout/Sidebar'
import BottomNav from './BottomNav'
import PaymentProgressBar from '../features/Payment/PaymentProgressBar'
import { useState } from 'react'
import PaymentStepContext from '../../context/PaymentStepContext'

const TICKET_FLOW_PATHS = [
  '/dashboard/buy-ticket',
  '/dashboard/order-summary',
  '/dashboard/Payment',
  '/dashboard/Success',
];

import { useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const [step, setStep] = useState(0);
  const location = useLocation();
  const showProgressBar = TICKET_FLOW_PATHS.some(path => location.pathname.startsWith(path));
  return (
    <PaymentStepContext.Provider value={{ step, setStep }}>
      <div className="flex min-h-screen bg-zinc-800">
        <Sidebar />
        <div className="flex flex-col flex-1 min-h-screen lg:ml-64">
          {showProgressBar && (
            <div className="flex justify-center items-center w-full pt-10 pb-4">
              <div className="max-w-4xl w-full mx-auto">
                <PaymentProgressBar currentStep={step} />
              </div>
            </div>
          )}
          <main className="flex-1 flex items-center justify-center w-full px-4 min-h-screen">
            <div className="max-w-4xl w-full mx-auto flex flex-col items-center justify-center h-full">
              <Outlet />
            </div>
          </main>
          <BottomNav />
        </div>
      </div>
    </PaymentStepContext.Provider>
  )
}



export default DashboardLayout
