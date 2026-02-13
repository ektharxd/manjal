import React, { useState, Suspense, lazy } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoadingIntro from './components/LoadingIntro';

const AboutGallery = lazy(() => import('./components/AboutGallery'));
const Therapies = lazy(() => import('./components/Therapies'));
const Doctors = lazy(() => import('./components/Doctors'));
const HospitalDetails = lazy(() => import('./components/HospitalDetails'));
const Consultation = lazy(() => import('./components/Consultation'));
const AllServices = lazy(() => import('./components/AllServices'));
const FloatingDock = lazy(() => import('./components/FloatingDock'));

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showAllServices, setShowAllServices] = useState(false);

  return (
    <main className="w-full min-h-screen bg-[#030305] text-white relative">
      <LoadingIntro onComplete={() => setLoading(false)} />

      {showAllServices ? (
        <Suspense fallback={<div className="p-8 text-center">Loading services…</div>}>
          <AllServices onBack={() => setShowAllServices(false)} />
        </Suspense>
      ) : (
        <>
          <Navbar onOpenServices={() => setShowAllServices(true)} />
          <Hero />

          <Suspense fallback={<div className="h-24" />}>
            <AboutGallery />
          </Suspense>

          <Suspense fallback={<div className="h-24" />}>
            <Therapies />
          </Suspense>

          <Suspense fallback={<div className="h-24" />}>
            <Doctors />
          </Suspense>

          <Suspense fallback={<div className="h-24" />}>
            <HospitalDetails />
          </Suspense>

          <Suspense fallback={<div className="h-24" />}>
            <Consultation />
          </Suspense>

          <Suspense fallback={<div className="h-24" />}>
            <FloatingDock onOpenServices={() => setShowAllServices(true)} />
          </Suspense>

          <footer className="py-8 bg-black text-center text-gray-600 text-xs border-t border-white/5 font-inter-tight">
            <p>&copy; {new Date().getFullYear()} Manjal Ayurveda Speciality Clinic. All rights reserved.</p>
          </footer>
        </>
      )}
      <Analytics />
    </main>
  );
};

export default App;