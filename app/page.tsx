'use client';
import { useState } from 'react';
// import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      const user = await res.json();
      setMessage(`User ${user.email} created successfully!`);
      setEmail('');
    } else {
      const err = await res.json();
      setMessage(`Error: ${err.error}`);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col max-w-sm gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create User
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}
