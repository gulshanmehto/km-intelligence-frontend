import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Determine base URL: use environment variable if provided, otherwise default to deployed backend
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://km-intelligence-backend.vercel.app';
        const res = await fetch(`${baseUrl}/api/km/metrics`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  const { kpis, timeseries, tables } = data;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">KM Intelligence Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="p-4 bg-white rounded shadow">
            <h2 className="text-sm font-medium">{kpi.label}</h2>
            <p className="text-xl font-bold">{kpi.value}</p>
          </div>
        ))}
      </div>
      <div className="h-64 bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timeseries}>
            <Line type="monotone" dataKey="revenue" />
            <Line type="monotone" dataKey="spend" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Top Campaigns</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Metric</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tables.topCampaigns.map((row, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">{row.metric}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
