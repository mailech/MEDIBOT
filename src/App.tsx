import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import MedicationReminders from './pages/MedicationReminders';
import HospitalsMap from './pages/HospitalsMap';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="symptoms" element={<SymptomChecker />} />
            <Route path="medications" element={<MedicationReminders />} />
            <Route path="hospitals" element={<HospitalsMap />} />
            <Route path="voice" element={<div className="p-8"><h1 className="text-3xl font-bold">Voice Assistant - Coming Soon</h1></div>} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;