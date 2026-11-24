'use client';
import { useState } from 'react';

export default function SagadaRegistration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const FEE_PER_PERSON = 100; // Change this to Sagada's exact fee
  const totalAmount = guests * FEE_PER_PERSON;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, guests, totalAmount }),
    });

    const data = await res.json();
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl; // Sends tourist straight to LinkBiz
    } else {
      alert('Error creating registration. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Sagada Tourist Registration</h1>
      <p style={{ color: '#555', marginBottom: '20px' }}>Register and pay your environmental fee online.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Full Name</label>
          <input
            type="text"
            required
            placeholder="Juan Dela Cruz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Email Address (For QR Pass)</label>
          <input
            type="email"
            required
            placeholder="juan@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Number of Guests</label>
          <input
            type="number"
            min="1"
            max="50"
            required
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ background: '#f4f4f5', padding: '15px', borderRadius: '6px', marginTop: '5px' }}>
          <strong>Total Amount Due: ₱{totalAmount.toLocaleString()}</strong>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: '#166534',
            color: 'white',
            padding: '14px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Connecting to Landbank...' : 'Proceed to GCash / Maya / Bank'}
        </button>
      </form>
    </div>
  );
}
