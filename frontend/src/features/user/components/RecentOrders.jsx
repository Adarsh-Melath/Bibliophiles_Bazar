import { Eye, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function RecentOrders({ orders = [] }) {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'bg-green-100 text-green-700'
            case 'shipped':
                return 'bg-blue-100 text-blue-700'
            case 'processing':
                return 'bg-yellow-100 text-yellow-700'
            case 'cancelled':
                return 'bg-red-100 text-red-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(price)
    }

    if (orders.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-8 text-center border border-accent/40">
                <Package className="w-12 h-12 text-heading-muted mx-auto mb-4" />
                <h3 className="font-heading text-lg font-semibold text-heading mb-2">
                    No orders yet
                </h3>
                <p className="font-body text-sm text-heading-muted mb-4">
                    Your recent orders will appear here once you make a purchase.
                </p>
                <Link
                    to="/books"
                    className="inline-flex items-center gap-2 bg-primary text-white
                               px-6 py-2 rounded-full font-body text-sm font-medium
                               hover:bg-primary/90 transition-colors">
                    Browse Books
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl p-6 border border-accent/40">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-lg font-semibold text-heading">
                    Recent Orders
                </h3>
                <Link
                    to="/orders"
                    className="font-body text-sm text-primary hover:text-primary/80
                               font-medium transition-colors">
                    View All
                </Link>
            </div>

            <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="border border-accent/40 rounded-xl p-4
                                                  hover:border-primary/40 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Package className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-body text-sm font-medium text-heading">
                                        Order #{order.id}
                                    </p>
                                    <p className="font-body text-xs text-heading-muted">
                                        {formatDate(order.createdAt)}
                                    </p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium
                                             ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="font-body text-sm text-heading-muted">
                                {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-heading text-base font-semibold text-heading">
                                    {formatPrice(order.totalAmount)}
                                </span>
                                <Link
                                    to={`/orders/${order.id}`}
                                    className="flex items-center gap-1.5 text-sm font-body
                                               text-primary hover:text-primary/80 transition-colors">
                                    <Eye size={14} />
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}