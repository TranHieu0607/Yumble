import React from 'react';
import { FiUsers, FiShoppingBag, FiDollarSign, FiBarChart2 } from 'react-icons/fi';

const AdminDashboard = () => {
  return (
    <div className="h-screen bg-gray-100 ">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <a href="#" className="flex items-center p-3 text-gray-700 bg-gray-100 rounded-lg">
              <FiBarChart2 className="w-5 h-5" />
              <span className="ml-3">Dashboard</span>
            </a>
            <a href="#" className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FiUsers className="w-5 h-5" />
              <span className="ml-3">Users</span>
            </a>
            <a href="#" className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FiShoppingBag className="w-5 h-5" />
              <span className="ml-3">Products</span>
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiUsers className="w-6 h-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Total Users</h3>
                <p className="text-2xl font-semibold">1,257</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <FiDollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Total Revenue</h3>
                <p className="text-2xl font-semibold">$12,875</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <FiShoppingBag className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Total Orders</h3>
                <p className="text-2xl font-semibold">567</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <FiBarChart2 className="w-6 h-6 text-purple-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Growth</h3>
                <p className="text-2xl font-semibold">24.5%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap">Placed Order #12345</td>
                  <td className="px-6 py-4 whitespace-nowrap">2024-02-20</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                      Completed
                    </span>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;