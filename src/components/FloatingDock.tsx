import React, { useEffect, useRef, useState } from 'react';

interface FloatingDockProps {
    onOpenServices?: () => void;
}

const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenServices }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glow, setGlow] = useState({ x: 0, y: 0 });
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            // Always visible on mobile, scroll trigger on desktop
            if (window.innerWidth < 768) { 
                setIsVisible(true);
            } else {
                setIsVisible(window.scrollY > 100);
            }
        };
        
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        return () => {
             window.removeEventListener('scroll', handleScroll);
             window.removeEventListener('resize', handleScroll);
        }
    }, []);

    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reduceMotion.matches) return;

        const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
        const updateTilt = (x: number, y: number) => {
            const nextTilt = { x: clamp(x, -1, 1), y: clamp(y, -1, 1) };
            setTilt({ x: nextTilt.x * 6, y: nextTilt.y * 6 });
            setGlow({ x: nextTilt.x * 16, y: nextTilt.y * 12 });
        };

        const schedule = (x: number, y: number) => {
            if (rafRef.current !== null) return;
            rafRef.current = window.requestAnimationFrame(() => {
                updateTilt(x, y);
                rafRef.current = null;
            });
        };

        const handlePointer = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = (event.clientY / window.innerHeight) * 2 - 1;
            schedule(x, y);
        };

        const handleOrientation = (event: DeviceOrientationEvent) => {
            const gamma = event.gamma ?? 0; // left/right
            const beta = event.beta ?? 0; // front/back
            const x = clamp(gamma / 30, -1, 1);
            const y = clamp(beta / 45, -1, 1);
            schedule(x, y);
        };

        window.addEventListener('pointermove', handlePointer, { passive: true });
        window.addEventListener('deviceorientation', handleOrientation, true);
        return () => {
            window.removeEventListener('pointermove', handlePointer);
            window.removeEventListener('deviceorientation', handleOrientation);
            if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
        };
    }, []);

    useEffect(() => {
        const sectionIds = ['about', 'therapies', 'doctors', 'location', 'consultation'];
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((node): node is HTMLElement => Boolean(node));

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0.01 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    if (!isVisible) return null;

    const menuItems = [
        { label: 'About', icon: 'solar:info-circle-bold-duotone', href: '#about', color: 'bg-blue-500' },
        { label: 'Treatments', icon: 'solar:medical-kit-bold-duotone', action: onOpenServices, color: 'bg-purple-500' },
        { label: 'Therapies', icon: 'solar:leaf-bold-duotone', href: '#therapies', color: 'bg-green-500' },
        { label: 'Doctors', icon: 'solar:stethoscope-bold-duotone', href: '#doctors', color: 'bg-indigo-500' },
        { label: 'Location', icon: 'solar:map-point-bold-duotone', href: '#location', color: 'bg-orange-500' },
        { label: 'Book', icon: 'solar:calendar-bold-duotone', href: '#consultation', color: 'bg-teal-500' },
    ];

    const magnetOffsets: Record<string, number> = {
        about: -4,
        therapies: -2,
        doctors: 0,
        location: 2,
        consultation: 4,
    };
    const glowColors: Record<string, string> = {
        about: 'rgba(59, 130, 246, 0.35)',
        therapies: 'rgba(34, 197, 94, 0.35)',
        doctors: 'rgba(99, 102, 241, 0.35)',
        location: 'rgba(249, 115, 22, 0.35)',
        consultation: 'rgba(20, 184, 166, 0.35)',
    };
    const magnetOffset = activeSection ? magnetOffsets[activeSection] ?? 0 : 0;
    const glowColor = activeSection ? glowColors[activeSection] ?? 'rgba(16, 185, 129, 0.35)' : 'rgba(16, 185, 129, 0.35)';
    const dockTransform = `translate3d(0, ${magnetOffset}px, 0) rotateX(${(-tilt.y).toFixed(2)}deg) rotateY(${tilt.x.toFixed(2)}deg)`;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4" style={{ perspective: '800px' }}>
            
            {/* WhatsApp Style Menu Overlay */}
            {isMenuOpen && (
                <div id="floating-nav" className="mb-2 w-[90vw] max-w-[320px] bg-[#121214]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 fade-in zoom-in-95 duration-200 origin-bottom">
                     <div className="grid grid-cols-3 gap-y-6 gap-x-4">
                        {menuItems.map((item, idx) => {
                            const isActive = Boolean(activeSection && item.href === `#${activeSection}`);
                            return (
                            <button 
                                key={idx}
                                onClick={() => {
                                    if (item.action) item.action();
                                    else if (item.href) window.location.href = item.href;
                                    setIsMenuOpen(false);
                                }}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div
                                    className={`w-14 h-14 rounded-full ${item.color}/10 border border-white/5 flex items-center justify-center transition-all group-active:scale-95 group-hover:bg-white/5 ${isActive ? 'ring-2 ring-white/40 scale-105' : ''}`}
                                >
                                     {/* @ts-ignore */}
                                    <iconify-icon icon={item.icon} width="28" class={`text-${item.color.split('-')[1]}-400`}></iconify-icon>
                                </div>
                                <span className="text-white/80 text-xs font-medium tracking-wide">{item.label}</span>
                            </button>
                        );
                        })}
                     </div>
                </div>
            )}

            <div
                className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 shadow-2xl flex items-center gap-3 sm:gap-4 relative transform-gpu"
                style={{ transform: dockTransform, transition: 'transform 160ms ease-out', willChange: 'transform' }}
            >
                <span
                    className="pointer-events-none absolute -inset-6 rounded-full blur-2xl opacity-70"
                    style={{
                        background: `radial-gradient(60% 60% at 50% 50%, ${glowColor} 0%, rgba(0,0,0,0) 70%)`,
                        transform: `translate3d(${glow.x}px, ${glow.y}px, 0)`,
                    }}
                ></span>
                
                {/* Menu Toggle Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={isMenuOpen}
                    aria-controls="floating-nav"
                    className={`w-12 h-12 flex items-center justify-center rounded-full transition-all relative border border-white/5 ${isMenuOpen ? 'bg-white text-black rotate-90' : 'bg-emerald-500/90 text-black shadow-lg shadow-emerald-500/30 hover:bg-emerald-400/90'}`}
                >
                    {!isMenuOpen && (
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-emerald-500 text-black shadow-md">
                            Navigation
                        </span>
                    )}
                    {!isMenuOpen && (
                        <span className="absolute inset-0 rounded-full ring-2 ring-emerald-400/60 animate-ping"></span>
                    )}
                    {/* @ts-ignore */}
                    <iconify-icon icon={isMenuOpen ? "solar:close-circle-bold" : "solar:widget-add-bold-duotone"} width="24"></iconify-icon>
                </button>

                <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

                {/* Call */}
                <a
                    href="tel:+918086728253"
                    aria-label="Call the clinic"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/5 transition-all relative"
                >
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-white/90 text-black shadow-md">
                        Call
                    </span>
                    {/* @ts-ignore */}
                    <iconify-icon icon="solar:phone-calling-bold-duotone" width="22"></iconify-icon>
                </a>

                 {/* WhatsApp */}
                 <a
                    href="https://wa.me/917907178727"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 border border-[#25D366]/20 transition-all relative"
                >
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-[#25D366] text-black shadow-md">
                        WhatsApp
                    </span>
                    {/* @ts-ignore */}
                    <iconify-icon icon="logos:whatsapp-icon" width="20"></iconify-icon>
                </a>
            </div>
        </div>
    );
};

export default FloatingDock;
