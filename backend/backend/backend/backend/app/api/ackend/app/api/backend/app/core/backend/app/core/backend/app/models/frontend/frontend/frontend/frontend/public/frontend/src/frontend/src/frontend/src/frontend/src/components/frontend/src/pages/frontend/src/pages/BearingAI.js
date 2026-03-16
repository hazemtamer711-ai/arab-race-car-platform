import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const BearingAI = () => {
  const [inputs, setInputs] = useState({
    shaft_diameter_mm: 25,
    radial_load_N: 5000,
    axial_load_N: 1000,
    rpm: 1000,
    life_hours: 3000
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/bearing/select`, inputs);
      setResult(res.data);
    } catch (err) {
      alert('لم يتم العثور على رولمان مناسب');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">اختيار الرولمان الذكي</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
          {Object.keys(inputs).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {key.replace(/_/g, ' ')}
              </label>
              <input
                type="number"
                name={key}
                value={inputs[key]}
                onChange={handleChange}
                step="any"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          ))}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            ابحث
          </button>
        </form>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">الرولمان المقترح</h2>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt>الطراز:</dt>
                <dd className="font-mono">{result.bearing_id}</dd>
              </div>
              <div className="flex justify-between">
                <dt>C (حمل ديناميكي):</dt>
                <dd className="font-mono">{result.C.toFixed(0)} N</dd>
              </div>
              <div className="flex justify-between">
                <dt>العمر الافتراضي L10:</dt>
                <dd className="font-mono">{result.L10_hours.toFixed(0)} ساعة</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

export default BearingAI;
