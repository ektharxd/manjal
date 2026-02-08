import React, { useEffect, useState } from 'react';

interface FloatingDockProps {
    onOpenServices?: () => void;
}

const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenServices }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    if (!isVisible) return null;

    const menuItems = [
        { label: 'About', icon: 'solar:info-circle-bold-duotone', href: '#about', color: 'bg-blue-500' },
        { label: 'Treatments', icon: 'solar:medical-kit-bold-duotone', action: onOpenServices, color: 'bg-purple-500' },
        { label: 'Therapies', icon: 'solar:leaf-bold-duotone', href: '#therapies', color: 'bg-green-500' },
        { label: 'Doctors', icon: 'solar:stethoscope-bold-duotone', href: '#doctors', color: 'bg-indigo-500' },
        { label: 'Location', icon: 'solar:map-point-bold-duotone', href: '#location', color: 'bg-orange-500' },
        { label: 'Book', icon: 'solar:calendar-bold-duotone', href: '#consultation', color: 'bg-teal-500' },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
            
            {/* WhatsApp Style Menu Overlay */}
            {isMenuOpen && (
                <div className="mb-2 w-[90vw] max-w-[320px] bg-[#121214]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 fade-in zoom-in-95 duration-200 origin-bottom">
                     <div className="grid grid-cols-3 gap-y-6 gap-x-4">
                        {menuItems.map((item, idx) => (
                            <button 
                                key={idx}
                                onClick={() => {
                                    if (item.action) item.action();
                                    else if (item.href) window.location.href = item.href;
                                    setIsMenuOpen(false);
                                }}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className={`w-14 h-14 rounded-full ${item.color}/10 border border-white/5 flex items-center justify-center transition-all group-active:scale-95 group-hover:bg-white/5`}>
                                     {/* @ts-ignore */}
                                    <iconify-icon icon={item.icon} width="28" class={`text-${item.color.split('-')[1]}-400`}></iconify-icon>
                                </div>
                                <span className="text-white/80 text-xs font-medium tracking-wide">{item.label}</span>
                            </button>
                        ))}
                     </div>
                </div>
            )}

            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 shadow-2xl flex items-center gap-1 sm:gap-2">
                
                {/* Menu Toggle Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`w-12 h-12 flex items-center justify-center rounded-full transition-all relative border border-white/5 ${isMenuOpen ? 'bg-white text-black rotate-90' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                >
                    {/* @ts-ignore */}
                    <iconify-icon icon={isMenuOpen ? "solar:close-circle-bold" : "solar:widget-add-bold-duotone"} width="24"></iconify-icon>
                </button>

                <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

                {/* Call */}
                <a href="tel:+918086728253" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/5 transition-all">
                    {/* @ts-ignore */}
                    <iconify-icon icon="solar:phone-calling-bold-duotone" width="22"></iconify-icon>
                </a>

                 {/* WhatsApp */}
                 <a href="https://wa.me/917907178727" target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 border border-[#25D366]/20 transition-all">
                    {/* @ts-ignore */}
                    <iconify-icon icon="logos:whatsapp-icon" width="20"></iconify-icon>
                </a>
            </div>
        </div>
    );
};

export default FloatingDock;
