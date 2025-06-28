import React, { useState } from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const API_KEY = 'GJe8VDdPRwjKotw1PhjSCQ==BvVQbGeCzA88fPl1'; // Updated with valid API Ninjas key

const Hospitals: React.FC = () => {
  const [city, setCity] = useState('');
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchHospitals = async () => {
    setLoading(true);
    setError('');
    setHospitals([]);
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/hospitals?city=${encodeURIComponent(city)}`, {
        headers: { 'X-Api-Key': API_KEY }
      });
      if (!response.ok) throw new Error('Failed to fetch hospitals');
      const data = await response.json();
      setHospitals(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching hospitals');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Nearby Hospitals</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter your city (e.g., Mumbai)"
          className="px-4 py-2 border border-gray-300 rounded-lg flex-1"
        />
        <Button onClick={fetchHospitals} disabled={!city.trim() || loading}>
          {loading ? 'Searching...' : 'Find Hospitals'}
        </Button>
      </div>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="grid gap-4">
        {hospitals.map((hosp, idx) => (
          <Card key={idx} className="p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{hosp.name}</h2>
            <div className="text-gray-700 mb-1">{hosp.address || 'No address available'}</div>
            {hosp.phone && <div className="text-gray-600">Contact: {hosp.phone}</div>}
          </Card>
        ))}
        {!loading && hospitals.length === 0 && !error && (
          <div className="text-gray-500">No hospitals found. Try another city.</div>
        )}
      </div>
    </div>
  );
};

export default Hospitals; 