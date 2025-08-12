import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  // Local state to hold the metrics data and any error messages
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch from our own API endpoint.  In production this will be proxied
        // to the backend through Next.js rewrites (see next.config.js).
        const res = await fetch('/api/km/metrics');
        if (!res.ok) {
          throw new Error('Failed to fetch metrics');
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError('Failed to load data');
      }
    }
    fetchData();
  }, []);

  // If an error occurred, show it to the user
  if (error) {
    return <p>{error}</p>;
  }
  // Show a loading state until data is fetched
  if (!data) {
    return <p>Loading...</p>;
  }

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
