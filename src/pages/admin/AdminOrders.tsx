import { useCallback, useEffect, useState } from 'react';
import { Loader2, RefreshCw, Search, ExternalLink } from 'lucide-react';
import { fetchOrders, changeOrderStatus } from '../../lib/adminApi';

const STATUSES = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'] as const;

const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-amber-100 text-amber-800 border-amber-200',
  Confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  Shipped: 'bg-purple-100 text-purple-800 border-purple-200',
  Delivered: 'bg-green-100 text-green-800 border-green-200',
  Cancelled: 'bg-red-100 text-red-800 border-red-200',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [phoneSearch, setPhoneSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const result = await fetchOrders({
      status: statusFilter || undefined,
      phone: phoneSearch.trim() || undefined,
      page,
      limit: 20,
    });
    if (result.success) {
      setOrders(result.data || []);
      setPagination((result as any).pagination || null);
    } else {
      setError(typeof result.error === 'string' ? result.error : 'Failed to load orders');
    }
    setLoading(false);
  }, [statusFilter, phoneSearch, page]);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    const result = await changeOrderStatus(id, status);
    if (result.success) {
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
    } else {
      alert(typeof result.error === 'string' ? result.error : 'Failed to update status');
    }
    setUpdatingId(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={phoneSearch}
              onChange={(e) => { setPhoneSearch(e.target.value); setPage(1); }}
              placeholder="Search by phone"
              className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-brand-magenta focus:ring-2 focus:ring-brand-peach/20 outline-none w-44"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:border-brand-magenta outline-none"
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={load}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 bg-white"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 font-semibold bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">{error}</p>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 flex justify-center">
          <Loader2 className="animate-spin text-brand-magenta" size={32} />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center text-gray-500 font-medium">
          No orders found.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Flavour</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Track</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60">
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {new Date(order.orderTime || order.createdAt).toLocaleString('en-GB', {
                      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-400 max-w-[180px] truncate" title={order.address}>{order.address}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-700">{order.phone}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{order.thana}, {order.district}</td>
                  <td className="px-4 py-3 text-gray-600">{order.flavour}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-gray-600'}`}>
                      {order.paymentStatus === 'Paid' ? 'Paid (bKash)' : 'COD'}
                    </span>
                    {order.transactionId && (
                      <p className="text-[11px] font-mono text-gray-400">{order.transactionId}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">৳{order.price}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        disabled={updatingId === order._id}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`text-xs font-bold px-2 py-1.5 rounded-lg border outline-none cursor-pointer disabled:opacity-50 ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {updatingId === order._id && <Loader2 className="animate-spin text-gray-400" size={14} />}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`/track/${order._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-magenta hover:underline inline-flex items-center gap-1 text-xs font-semibold"
                    >
                      View <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>
            Page {pagination.page} of {pagination.pages} ({pagination.total} orders)
          </span>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white font-semibold disabled:opacity-40 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              disabled={page >= pagination.pages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white font-semibold disabled:opacity-40 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
