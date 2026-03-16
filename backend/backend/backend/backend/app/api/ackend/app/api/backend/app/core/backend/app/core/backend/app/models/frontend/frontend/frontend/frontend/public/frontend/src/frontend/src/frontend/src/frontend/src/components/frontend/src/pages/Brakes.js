import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const Brakes = () => {
  const [inputs, setInputs] = useState({
    pedal_ratio: 4,
    driver_force: 500,
    master_cylinder_diameter: 0.019,
    caliper_piston_diameter: 0.036,
    num_pistons: 4,
    pad_friction: 0.4,
    effective_rotor_radius: 0.15,
    vehicle_mass: 300,
    velocity: 30
  });
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/brakes/calculate`, inputs);
      setResults(res.data);
    } catch (err) {
      alert('خطأ في الحساب');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">حسابات نظام المكابح</h1>
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
            احسب
          </button>
        </form>

        {results && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">النتائج</h2>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt>عزم المكبح الأمامي (Nm):</dt>
                <dd className="font-mono">{results.front_brake_torque.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>عزم المكبح الخلفي (Nm):</dt>
                <dd className="font-mono">{results.rear_brake_torque.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>نسبة التوزيع الأمامي (%):</dt>
                <dd className="font-mono">{(results.brake_bias*100).toFixed(1)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>مسافة التوقف (م):</dt>
                <dd className="font-mono">{results.stopping_distance.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>

      {results && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">الرسم البياني - عزم المكبح</h2>
          <Plot
            data={[
              {
                x: ['أمامي', 'خلفي'],
                y: [results.front_brake_torque, results.rear_brake_torque],
                type: 'bar',
                marker: { color: ['#3B82F6', '#EF4444'] }
              }
            ]}
            layout={{ title: 'عزم المكبح', xaxis: { title: 'المحور' }, yaxis: { title: 'عزم (Nm)' } }}
            style={{ width: '100%', height: '400px' }}
          />
        </div>
      )}
    </div>
  );
};

export default Brakes;
