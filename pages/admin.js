import { useState, useEffect } from 'react';

export default function Admin() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
           const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
        const res = await fetch(`${baseUrl}/api/admin/users`);
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users);
        }
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Meta Accounts</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Google Accounts</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Shopify Stores</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((u) => (
            <tr key={u.email}>
              <td className="px-6 py-4">{u.email}</td>
              <td className="px-6 py-4">{u.role}</td>
              <td className="px-6 py-4">{u.metaAccounts?.length || 0}</td>
              <td className="px-6 py-4">{u.googleAccounts?.length || 0}</td>
              <td className="px-6 py-4">{u.shopifyStores?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
