import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

// You can add or remove photos from this list. 
// Files are loaded from the "public" folder.
// Note: Spaces in filenames should be replaced with %20 if they don't load.
const albumPhotos = [
    '/rebuilding-wallpaper.jpg',
    '/wallhaven-jeew7y.jpg',
    '/rebuilding-wallpaper - Copy.jpg',
    '/wallhaven-jeew7y - Copy.jpg',
    '/rebuilding-wallpaper - Copy (2).jpg',
    '/wallhaven-jeew7y - Copy (2).jpg',
    '/rebuilding-wallpaper - Copy (3).jpg',
    '/wallhaven-jeew7y - Copy (3).jpg',
    '/rebuilding-wallpaper - Copy (4).jpg',
    '/wallhaven-jeew7y - Copy (4).jpg'
];

const AboutGallery: React.FC = () => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    return (
        <section id="about" className="py-24 bg-theme-base-alt relative overflow-hidden">
            {/* Gallery Modal */}
            {isGalleryOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-0 md:p-8 animate-in fade-in duration-300">
                    {/* Header / Close Bar */}
                    <div className="w-full flex justify-end p-4 md:absolute md:top-6 md:right-6 z-50 bg-black/50 md:bg-transparent backdrop-blur-md md:backdrop-blur-none relative">
                        <button 
                            onClick={() => setIsGalleryOpen(false)}
                            className="bg-zinc-800/80 md:bg-transparent p-2 rounded-full text-white/70 hover:text-white transition-all hover:bg-zinc-700/50"
                        >
                            {/* @ts-ignore */}
                            <iconify-icon icon="solar:close-circle-bold" width="32" height="32" className="md:w-10 md:h-10"></iconify-icon>
                        </button>
                    </div>

                    <div className="w-full h-full md:max-w-7xl overflow-y-auto custom-scrollbar px-4 custom-safe-area-bottom pb-20 md:pb-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 pt-4 md:pt-0">
                            {albumPhotos.map((photo, index) => (
                                <div key={index} className="group relative break-inside-avoid">
                                    <div className="aspect-[4/5] md:aspect-square w-full rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative bg-zinc-900">
                                         <img 
                                            src={photo} 
                                            alt={`Gallery item ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    
                    {/* Left: Text Content */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <ScrollReveal>
                        <span className="text-purple-400 text-xs font-bold tracking-widest uppercase font-inter-tight flex items-center gap-2 mb-6">
                            <span className="w-6 h-[1px] bg-purple-500"></span>
                            Our Heritage
                        </span>
                        
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-inter-tight leading-tight">
                            Where Ancient Wisdom <br/> 
                            <span className="text-gray-500">Meets Modern Care</span>
                        </h2>
                        
                        <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
                            <p>
                                At Manjal Ayurveda, we believe that true healing begins when the body, mind, and spirit align. Established with a vision to preserve the purity of traditional Kerala Ayurveda, our clinic is a sanctuary away from the noise of the modern world.
                            </p>
                            <p>
                                Unlike commercial wellness centers, we focus on <strong className="text-white font-medium">Curative Ayurveda</strong>. Our architecture reflects this philosophy—using sustainable materials, open-air courtyards, and medicinal gardens that breathe life into your healing journey.
                            </p>
                        </div>

                        <div className="mt-10 flex items-center gap-8">
                            <div>
                                <h4 className="text-3xl font-bold text-white font-inter-tight">15+</h4>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Years Experience</p>
                            </div>
                            <div className="w-[1px] h-10 bg-white/10"></div>
                            <div>
                                <h4 className="text-3xl font-bold text-white font-inter-tight">5k+</h4>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Happy Patients</p>
                            </div>
                        </div>
                        </ScrollReveal>
                    </div>

                    {/* Right: Instagram Chat Style Gallery */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center">
                    <ScrollReveal delay="delay-200" className="w-full flex justify-center">
                        <div className="relative max-w-sm w-full">
                            
                            {/* Decorative Message Tail/Bubble effect */}
                            <div className="absolute -right-4 top-10 w-8 h-8 bg-[#1a1a1e] rotate-45 z-0 rounded-sm"></div>

                            {/* The Stack Container - Removed animate-pulse-slow */}
                            <div 
                                onClick={() => setIsGalleryOpen(true)}
                                className="bg-[#1a1a1e] p-2 rounded-[2rem] rounded-tr-none shadow-2xl border border-white/5 relative z-10 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                            >
                                
                                {/* Grid Layout similar to IG multi-image upload */}
                                <div className="grid grid-cols-2 gap-2 pointer-events-none">
                                    {/* Main Large Image */}
                                    <div className="col-span-2 relative group overflow-hidden rounded-2xl aspect-[16/9]">
                                        <div className="absolute inset-0 bg-gray-700"></div> 
                                        {/* Use first photo from local list */}
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                            style={{ backgroundImage: `url('${albumPhotos[0]}')` }}
                                        ></div>
                                    </div>

                                    {/* Small Image 1 */}
                                    <div className="relative group overflow-hidden rounded-2xl aspect-square">
                                        <div className="absolute inset-0 bg-gray-800"></div>
                                        {/* Use second photo */}
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                            style={{ backgroundImage: `url('${albumPhotos[1]}')` }}
                                        ></div>
                                    </div>

                                    {/* Small Image 2 */}
                                    <div className="relative group overflow-hidden rounded-2xl aspect-square">
                                        <div className="absolute inset-0 bg-gray-800"></div>
                                        {/* Use third photo */}
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                            style={{ backgroundImage: `url('${albumPhotos[2]}')` }}
                                        ></div>
                                        
                                        {/* "More" overlay effect */}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
                                            {/* @ts-ignore */}
                                            <iconify-icon icon="solar:gallery-wide-bold" className="text-white text-3xl drop-shadow-lg"></iconify-icon>
                                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-6 text-[10px] uppercase font-bold text-white/80 tracking-widest mt-1">View All</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timestamp / Meta look */}
                            <div className="flex justify-end mt-2 px-2 gap-1 items-center opacity-50">
                                <span className="text-[10px] text-gray-400 font-inter-tight">Sent from Manjal Clinic</span>
                                {/* @ts-ignore */}
                                <iconify-icon icon="solar:check-read-linear" className="text-blue-500 text-xs"></iconify-icon>
                            </div>

                        </div>
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutGallery;