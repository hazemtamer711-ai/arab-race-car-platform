import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Brakes from './pages/Brakes';
import BearingAI from './pages/BearingAI';
import TrackSim from './pages/TrackSim';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Brakes />} />
          <Route path="brakes" element={<Brakes />} />
          <Route path="bearing" element={<BearingAI />} />
          <Route path="track" element={<TrackSim />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
