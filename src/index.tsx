import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutGallery from './components/AboutGallery';
import Therapies from './components/Therapies';
import Doctors from './components/Doctors';
import HospitalDetails from './components/HospitalDetails';
import Consultation from './components/Consultation';
import AllServices from './components/AllServices';
import FloatingDock from './components/FloatingDock';

const App: React.FC = () => {
  const [showAllServices, setShowAllServices] = useState(false);

  return (
    <main className="w-full min-h-screen bg-[#030305] text-white relative">
      {/* If Services Page is active, show it on top of everything OR conditionally render */}
      {showAllServices ? (
        <AllServices onBack={() => setShowAllServices(false)} />
      ) : (
        <>
          <Navbar onOpenServices={() => setShowAllServices(true)} />
          <Hero />
          <AboutGallery />
          <Therapies />
          <Doctors />
          <HospitalDetails />
          <Consultation />
          <FloatingDock onOpenServices={() => setShowAllServices(true)} />
          
          {/* Footer / Copyright */}
          <footer className="py-8 bg-black text-center text-gray-600 text-xs border-t border-white/5 font-inter-tight">
            <p>&copy; {new Date().getFullYear()} Manjal Ayurveda Speciality Clinic. All rights reserved.</p>
          </footer>
        </>
      )}
    </main>
  );
};

export default App;