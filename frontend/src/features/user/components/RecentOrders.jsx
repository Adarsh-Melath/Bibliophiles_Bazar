import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Archive, Truck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockOrders = [
  {
    id: 'OB-2026-X8',
    title: 'The Great Gatsby (Collector\'s Edition)',
    date: 'Apr 12, 2026',
    status: 'Shipped',
    icon: Truck,
    price: 3250
  },
  {
    id: 'OB-2026-M4',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    date: 'Mar 28, 2026',
    status: 'Delivered',
    icon: CheckCircle,
    price: 1899
  },
  {
    id: 'OB-2026-K1',
    title: 'The Silmarillion',
    date: 'Feb 15, 2026',
    status: 'Archived',
    icon: Archive,
    price: 950
  }
];

export default function RecentOrders() {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="library-panel p-8 mb-10"
    >
      <div className="flex items-center justify-between mb-8 border-b border-shelf/5 pb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl text-shelf">
            Acquisition History
          </h2>
          <p className="font-body text-xs text-shelf/40 mt-1 uppercase tracking-widest font-bold">
            Recent physical & digital additions
          </p>
        </div>
        <Link 
          to="/orders" 
          className="text-burgundy hover:text-shelf font-ui text-[11px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 group p-2 border border-transparent hover:border-shelf/10 rounded"
        >
          View Ledger{' '}
          <ChevronRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {mockOrders.map((order, index) => {
          const StatusIcon = order.icon;
          return (
            <motion.div
              key={order.id}
              whileHover={{ x: 4 }}
              className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded border border-shelf/5 hover:border-burgundy/20 hover:bg-paper/50 transition-all gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-shelf/5 flex items-center justify-center text-shelf/60 mt-1">
                   <StatusIcon size={18} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-shelf group-hover:text-burgundy">
                    {order.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-ui text-[10px] text-shelf/40 uppercase font-bold tabular-nums">
                      {order.id}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-shelf/20"></span>
                    <p className="font-body text-xs text-shelf/60 italic font-medium">
                      Acquired on {order.date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-10 md:w-1/3">
                <span
                  className={`px-3 py-1 rounded text-[10px] font-ui font-bold uppercase tracking-widest ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'Archived'
                      ? 'bg-shelf/10 text-shelf/60'
                      : 'bg-burgundy/10 text-burgundy'
                  }`}
                >
                  {order.status}
                </span>
                <span className="font-heading font-bold text-xl text-shelf">
                  {formatPrice(order.price)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}