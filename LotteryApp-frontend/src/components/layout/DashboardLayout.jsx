import { Outlet } from 'react-router-dom'
import Sidebar from '../layout/Sidebar'
import BottomNav from './BottomNav'

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:h-[110vh] pb-20 ml-0 sm:ml-64">
        {/* Add sm:ml-64 for large screens */}
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

export default DashboardLayout
