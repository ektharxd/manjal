import React, { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handle = () => setScrolled(window.scrollY > 8);
        handle();
        window.addEventListener('scroll', handle, { passive: true });
        return () => window.removeEventListener('scroll', handle);
    }, []);

    return (
        <nav
            role="navigation"
            aria-label="Main navigation"
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#030305]/95 backdrop-blur-lg border-b border-white/10' : 'bg-[#030305]/80 backdrop-blur-md border-b border-white/5'}`}>
                <div className={`w-full px-6 md:px-12 ${scrolled ? 'h-14' : 'h-20'} flex items-center justify-between transition-all duration-300`}> 
                        <a href="#" aria-label="Go to home" className="relative flex flex-col leading-none group items-start focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded">
                                <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-14 rounded-full bg-gradient-to-b from-purple-500 to-transparent opacity-60 blur-sm pointer-events-none" aria-hidden="true"></span>
                                <span className={`text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-wide font-inter-tight transition-transform duration-300 transform ${scrolled ? 'scale-95' : 'scale-100'} group-hover:text-purple-300`}>MANJAL</span>
                <span className="text-[10px] md:text-xs text-gray-400 tracking-[0.05em] group-hover:text-purple-400 transition-colors uppercase font-medium">Ayurvedic Speciality Clinic</span>
            </a>
            
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-400 font-inter-tight">
                                <a href="#about" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded transition-colors" aria-label="About">About</a>
                                <a href="#therapies" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded transition-colors" aria-label="Therapies">Therapies</a>
                                <a href="#doctors" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded transition-colors" aria-label="Doctors">Doctors</a>
                                <a href="#location" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded transition-colors" aria-label="Location">Location</a>
                                <a href="#consultation" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded transition-colors" aria-label="Book">Book</a>
                        </div>

                        <div className="flex items-center gap-4">
                                <a href="#consultation" aria-label="Book consultation" className="bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold hover:bg-gray-200 transition-all flex items-center gap-2 font-inter-tight tracking-wide focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2">
                                        Book Consultation
                                        {/* @ts-ignore */}
                                        <iconify-icon icon="solar:arrow-right-linear" width="14"></iconify-icon>
                                </a>
                        </div>
                </div>
        </nav>
    );
};

export default Navbar;