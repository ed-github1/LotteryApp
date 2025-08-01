import { Outlet } from 'react-router-dom'
import Sidebar from '../layout/Sidebar'
import BottomNav from './BottomNav'

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen  bg-gradient-to-br from-[#232946] via-[#1a1d2e] to-[#232946]">
      <Sidebar />
      <main className="flex-1 lg:h-[110vh] pb-20 ml-0 sm:ml-64">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}



export default DashboardLayout
