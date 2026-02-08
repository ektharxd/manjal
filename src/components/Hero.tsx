import React, { useState, useEffect } from 'react';
import MeditatingSilhouette from './MeditatingSilhouette';
import ChakraList from './ChakraList';
import { CHAKRAS } from '../constants';

const Hero: React.FC = () => {
  const [activeChakra, setActiveChakra] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mobileListRef = React.useRef<HTMLDivElement>(null);

  const handleHover = (id: string | null) => {
    setIsHovering(!!id);
    setActiveChakra(id);
  };

  // Auto-cycle effect (loops through chakras when at the top and not hovering)
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.scrollY < 50 && !isHovering) {
        setActiveChakra((prev) => {
          const currentIndex = CHAKRAS.findIndex((c) => c.id === prev);
          const nextIndex = (currentIndex + 1) % CHAKRAS.length;
          return CHAKRAS[nextIndex].id;
        });
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovering]);

  // Scroll logic for mobile/tablet/desktop to activate chakras
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;
      
      // Range where activation happens (e.g., first 50% of the screen height scrolling)
      // We map scroll position to chakra index (0 to 6)
      const activationRange = screenHeight; 
      
      if (scrollY < activationRange) {
        // Calculate index based on progress
        const index = Math.floor((scrollY / activationRange) * CHAKRAS.length);
        const safeIndex = Math.min(Math.max(index, 0), CHAKRAS.length - 1);
        
        if (activeChakra !== CHAKRAS[safeIndex].id) {
           setActiveChakra(CHAKRAS[safeIndex].id);
        }
      } else {
        // Only clear if we are significantly past the hero section
        if (scrollY > activationRange + 300) {
            if (activeChakra !== null) setActiveChakra(null);
        } else {
             if (activeChakra !== CHAKRAS[CHAKRAS.length - 1].id) {
                setActiveChakra(CHAKRAS[CHAKRAS.length - 1].id);
             }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to active chakra card in mobile/tablet view safely
  useEffect(() => {
    if (activeChakra && mobileListRef.current) {
        const activeCard = document.getElementById(`mobile-chakra-${activeChakra}`);
        if(activeCard) {
            const container = mobileListRef.current;
            const cardLeft = activeCard.offsetLeft;
            const cardWidth = activeCard.offsetWidth;
            const containerWidth = container.offsetWidth;
            
            // Calculate center position
            const targetScroll = cardLeft - (containerWidth / 2) + (cardWidth / 2);
            
            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    }
  }, [activeChakra]);

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
        <div className="w-full lg:w-1/3 flex justify-center items-center relative lg:order-none mb-8 lg:mb-0">
            <MeditatingSilhouette 
                activeChakra={activeChakra} 
                onHover={handleHover} 
            />
        </div>

          {/* Right Content (Chakra List) */}
          <div className="w-full lg:w-1/3 h-full flex items-center lg:items-start justify-end hidden lg:flex">
             <ChakraList 
                activeChakra={activeChakra} 
                onHover={handleHover} 
             />
        </div>

        {/* Mobile/Tablet Horizontal List for Chakras */}
        <div 
            ref={mobileListRef}
            className="lg:hidden w-full mt-8 overflow-x-auto pb-8 flex gap-4 snap-x px-6 no-scrollbar z-20"
        >
            {CHAKRAS.map((chakra) => {  
                const isActive = activeChakra === chakra.id;
                return (
                <div 
                    key={chakra.id}
                    id={`mobile-chakra-${chakra.id}`}
                    onClick={() => setActiveChakra(isActive ? null : chakra.id)}
                    className={`snap-center shrink-0 w-64 p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                        isActive 
                        ? 'bg-[#15151a]/90 border-white/20 shadow-xl scale-100' 
                        : 'bg-white/5 border-white/5 text-gray-400'
                    }`}
                >
                    <div className="flex items-center gap-4 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${isActive ? chakra.color + ' text-white' : 'bg-white/10'}`}>
                             {/* @ts-ignore */}
                            <iconify-icon icon={chakra.icon}></iconify-icon>
                        </div>
                        <h3 className={`font-bold font-inter-tight ${isActive ? 'text-white' : 'text-gray-400'}`}>{chakra.name}</h3>
                    </div>
                    <p className="text-xs text-gray-500 font-inter-tight line-clamp-2">{chakra.description}</p>
                    <div className={`mt-3 text-[10px] font-bold tracking-widest uppercase ${isActive ? 'text-white/60' : 'text-gray-600'}`}>
                        {chakra.sanskritName}
                    </div>
                </div>
            )})}
        </div>

      </div>
    </section>
  );
};

export default Hero;