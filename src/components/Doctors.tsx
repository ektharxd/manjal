import React, { useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const doctors = [
    {
        name: "Dr. Shyni",
        degree: "B.A.M.S, M.D (Ayurveda)",
        speciality: "Chief Physician & Founder",
        image: "/DR.jpg", 
        bio: "With over 5 years of clinical experience, Dr. Shyni specializes in neurological disorders and authentic detoxification therapies. She is dedicated to bringing the pure essence of Kerala Ayurveda to the modern world."
    }
];

const Doctors: React.FC = () => {
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const handleScroll = () => {
             // Only apply scroll-based grayscale on mobile/tablet (< 1024px)
            if (window.innerWidth >= 1024) {
                if (imageRef.current) imageRef.current.style.filter = '';
                return;
            }

            if (!imageRef.current) return;
            const rect = imageRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how close the image center is to the viewport center
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;
            const distance = Math.abs(viewportCenter - elementCenter);
            const maxDistance = windowHeight / 1.5; // Range of effect
            
            // 0 = fully colored (center), 1 = grayscale (edge)
            let grayscale = distance / maxDistance;
            grayscale = Math.min(Math.max(grayscale, 0), 1); 

            imageRef.current.style.filter = `grayscale(${grayscale})`;
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <section id="doctors" className="py-24 bg-theme-base border-t border-white/5 relative">
             <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            
            <div className="container mx-auto px-6">
                <ScrollReveal>
                <div className="text-center mb-16">
                    <span className="text-green-400 text-xs font-bold tracking-widest uppercase font-inter-tight">The Healer</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 font-inter-tight">Meet Our Chief Physician</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto font-light">
                        Guiding your journey to wellness with generations of wisdom and compassionate care.
                    </p>
                </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Quote */}
                    <div className="order-2 md:order-1 relative p-6 md:p-10">
                        <ScrollReveal delay="delay-100">
                        <span className="absolute -top-4 -left-4 text-[10rem] text-white/5 font-serif select-none leading-none">"</span>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight font-playfair relative z-10 italic tracking-wide">
                            True healing begins when the physician looks beyond symptoms and understands the person behind the disease.
                        </h3>
                        <div className="w-16 h-1.5 bg-green-500 rounded-full mt-8 shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                        </ScrollReveal>
                    </div>

                    {/* Doctor Card */}
                    <div className="flex justify-center md:justify-end order-1 md:order-2">
                        {doctors.map((doc, idx) => (
                            <ScrollReveal key={idx} delay="delay-200">
                            <div className="group bg-theme-surface rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden max-w-sm w-full">
                                
                                {/* Image Area */}
                                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                    <img 
                                        ref={imageRef}
                                        src={doc.image} 
                                        alt={doc.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 lg:filter lg:grayscale lg:group-hover:grayscale-0"
                                    />
                                    
                                    {/* Social/Contact Overlay - Slides up on hover */}
                                    <div className="absolute bottom-0 left-0 w-full p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <a href="#consultation" className="block w-full text-center bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold py-3 rounded-lg hover:bg-white hover:text-black transition-colors">
                                            Book Appointment
                                        </a>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="relative z-10 text-center">
                                    <h3 className="text-2xl font-bold text-white font-inter-tight">{doc.name}</h3>
                                    <p className="text-purple-400 text-xs font-bold uppercase tracking-wide mt-1 mb-4">{doc.degree}</p>
                                    <div className="w-10 h-[1px] bg-white/10 mb-4 mx-auto"></div>
                                    <p className="text-sm text-gray-300 font-medium mb-3">{doc.speciality}</p>
                                    <p className="text-sm text-gray-500 leading-relaxed font-light">{doc.bio}</p>
                                </div>

                            </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Doctors;