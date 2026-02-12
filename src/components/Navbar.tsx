import React, { useEffect, useState } from 'react';

interface NavbarProps {
    onOpenServices?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenServices }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                        <a href="#" aria-label="Go to home" className="relative flex items-center gap-3 leading-none group items-center focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded">
                                <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-14 rounded-full bg-gradient-to-b from-purple-500 to-transparent opacity-60 blur-sm pointer-events-none" aria-hidden="true"></span>
                                <img
                                    src="/logo.png"
                                    alt="Manjal Ayurveda logo"
                                    className={`w-10 h-10 md:w-12 md:h-12 object-contain shrink-0 transition-transform duration-300 ${scrolled ? 'scale-95' : 'scale-100'}`}
                                />
                                <span className="flex flex-col items-start">
                                    <span className={`text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-wide font-inter-tight transition-transform duration-300 transform ${scrolled ? 'scale-95' : 'scale-100'} group-hover:text-purple-300`}>MANJAL</span>
                                    <span className="text-[10px] md:text-xs text-gray-400 tracking-[0.05em] group-hover:text-purple-400 transition-colors uppercase font-medium">Ayurvedic Speciality Clinic</span>
                                </span>
                        </a>
            
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-400 font-inter-tight">
                                <a href="#about" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded transition-colors" aria-label="About">About</a>
                                <button onClick={onOpenServices} className="hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded transition-colors text-left" aria-label="Treatments">Treatments</button>
                                <a href="#therapies" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded transition-colors" aria-label="Therapies">Therapies</a>
                                <a href="#doctors" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded transition-colors" aria-label="Doctors">Doctors</a>
                                <a href="#location" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded transition-colors" aria-label="Location">Location</a>
                                <a href="#consultation" className="hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded transition-colors" aria-label="Book">Book</a>
                        </div>

                        <div className="flex items-center gap-4">
                                <a href="#consultation" aria-label="Book consultation" className="relative hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-white/10 border border-white/10 hover:border-purple-500/50 hover:bg-white/5 overflow-hidden group transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite] z-0"></div>
                                        <span className="relative z-10 font-inter-tight tracking-wide">Book Consultation</span>
                                        {/* @ts-ignore */}
                                        <iconify-icon icon="solar:arrow-right-linear" width="16" class="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-purple-400"></iconify-icon>
                                </a>
                        </div>
                </div>
        </nav>
    );
};

export default Navbar;