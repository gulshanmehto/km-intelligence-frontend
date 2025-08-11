import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? '/api/signup' : '/api/login';
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    const apiUrl = `${baseUrl}${endpoint}`;
    // Use apiUrl for API calls
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(isSignup ? 'Signup successful!' : 'Login successful!');
      } else {
        setMessage(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
      setMessage('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">{isSignup ? 'Sign up' : 'Log in'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border rounded p-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border rounded p-2"
          />
          {message && <p className="text-red-500">{message}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            {isSignup ? 'Sign up' : 'Log in'}
          </button>
        </form>
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="mt-4 text-blue-500 underline"
        >
          {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
}
