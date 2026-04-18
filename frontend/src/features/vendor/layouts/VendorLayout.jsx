import { Outlet } from 'react-router-dom'
import VendorSidebar from '../components/VendorSidebar'
import VendorTopNavbar from '../components/VendorTopNavbar'

export default function VendorLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-offwhite">
      <VendorSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <VendorTopNavbar />
        <Outlet />
      </div>
    </div>
  )
}
