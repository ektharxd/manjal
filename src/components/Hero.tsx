import React, { useState, useEffect } from 'react';
import MeditatingSilhouette from './MeditatingSilhouette';
import ChakraList from './ChakraList';
import { CHAKRAS } from '../constants';

const Hero: React.FC = () => {
  const [activeChakra, setActiveChakra] = useState<string | null>(null);

  // Scroll logic for mobile/tablet to activate chakras
  useEffect(() => {
    const handleScroll = () => {
      // Only run on mobile/tablet (smaller than lg breakpoint)
      if (window.innerWidth >= 1024) return;

      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;
      
      // Range where activation happens (e.g., first 50% of the screen height scrolling)
      // We map scroll position to chakra index (0 to 6)
      const activationRange = screenHeight * 0.5; 
      
      if (scrollY < activationRange) {
        // Calculate index based on progress
        const index = Math.floor((scrollY / activationRange) * CHAKRAS.length);
        const safeIndex = Math.min(Math.max(index, 0), CHAKRAS.length - 1);
        
        // Reverse order because usually we want Crown -> Root or Root -> Crown?
        // CHAKRAS array is [Crown, Third Eye ... Root] (Top to Bottom)
        // If we scroll down, we usually scan down the body. So index 0 at top is correct.
        
        setActiveChakra(CHAKRAS[safeIndex].id);
      } else {
        // If scrolled past, keep the last one or clear? Let's clear after a bit more scroll
        if (scrollY > activationRange + 100) {
            setActiveChakra(null);
        } else {
            setActiveChakra(CHAKRAS[CHAKRAS.length - 1].id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#030305] pt-24 lg:pt-20">
      
      {/* --- Ambient Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,20,40,0.5),_rgba(3,3,5,1))]"></div>
        
        {/* Subtle Stars */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full blur-[1px] animate-pulse opacity-50"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-purple-300 rounded-full blur-[1px] animate-pulse opacity-30" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative h-full flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Content (Text) */}
        <div className="w-full lg:w-1/3 text-center lg:text-left mb-10 lg:mb-0 relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 text-[10px] font-bold tracking-widest uppercase mb-6 backdrop-blur-sm font-inter-tight">
                {/* @ts-ignore */}
                <iconify-icon icon="solar:leaf-linear" width="12"></iconify-icon>
                <span>Traditional Healing</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1] font-inter-tight">
                MANJAL <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-fuchsia-200 to-white">
                    AYURVEDA
                </span><br/>
                <span className="text-2xl md:text-3xl font-light text-gray-400">SPECIALITY CLINIC</span>
            </h1>
            
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-md mx-auto lg:mx-0 mb-8 font-inter-tight">
                Experience authentic Ayurvedic treatments tailored to restore your natural balance. Discover the ancient wisdom of healing in a modern sanctuary.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#therapies" className="px-8 py-3.5 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-inter-tight">
                    Our Therapies
                    {/* @ts-ignore */}
                    <iconify-icon icon="solar:alt-arrow-down-linear" width="16"></iconify-icon>
                </a>
                <a href="#location" className="px-8 py-3.5 bg-transparent border border-white/20 text-white rounded-full font-bold text-sm hover:bg-white/5 transition-colors font-inter-tight">
                    Visit Us
                </a>
            </div>
        </div>

        {/* Center Content (Visualization) */}
        <div className="w-full lg:w-1/3 flex justify-center items-center relative order-first lg:order-none mb-8 lg:mb-0">
            <MeditatingSilhouette 
                activeChakra={activeChakra} 
                onHover={setActiveChakra} 
            />
        </div>

          {/* Right Content (Chakra List) */}
          <div className="w-full lg:w-1/3 h-full flex items-center lg:items-start justify-end hidden md:flex">
             <ChakraList 
                activeChakra={activeChakra} 
                onHover={setActiveChakra} 
             />
        </div>

        {/* Mobile-only Horizontal List for Chakras */}
        <div className="md:hidden w-full mt-4 overflow-x-auto pb-6 flex gap-3 snap-x px-4 no-scrollbar">
            {/* Indicator */}
            <div className="w-full text-center text-xs text-gray-600 font-inter-tight uppercase tracking-wider">
                Explore Energy Centers
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;