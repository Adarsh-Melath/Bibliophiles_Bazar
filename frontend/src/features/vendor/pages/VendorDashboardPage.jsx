import StatsCards from '../components/StatsCards'
import SalesChart from '../components/SalesChart'
import RecentOrders from '../components/RecentOrders'
import QuickActions from '../components/QuickActions'
import AlertsSection from '../components/AlertsSection'
import { useAuthStore } from '../../../store/authStore'

export default function VendorDashboardPage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="flex-1 overflow-y-auto bg-offwhite">
      <div className="p-8 space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-3xl font-heading font-bold text-teal">
            Welcome back, {user?.name?.split(' ')[0] || 'Vendor'} 👋
          </h1>
          <p className="text-sm font-body text-teal/60 mt-1">
            Here's what's happening with your store today.
          </p>
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Chart + Quick Actions + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div className="flex flex-col gap-6">
            <QuickActions />
            <AlertsSection />
          </div>
        </div>

        {/* Recent Orders */}
        <RecentOrders />
      </div>
    </div>
  )
}
