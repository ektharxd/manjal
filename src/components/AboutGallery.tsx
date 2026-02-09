import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import '../styles/gallery.css';

type PhotoAsset = {
    id: string;
    alt: string;
    base: string;
};

// You can add or remove photos from this list.
// Files are loaded from the "public" folder.
// Expected structure per photo (example base: /gallery/1-1):
// - /gallery/1-1-400.jpg
// - /gallery/1-1-800.jpg
// - /gallery/1-1-1200.jpg
// - /gallery/1-1-400.webp
// - /gallery/1-1-800.webp
// - /gallery/1-1-1200.webp
// - /gallery/1-1-400.avif
// - /gallery/1-1-800.avif
// - /gallery/1-1-1200.avif
// - /gallery/1-1-lqip.jpg
const albumPhotos: PhotoAsset[] = [
    { id: '1 (1)', alt: 'Gallery item 1', base: '/gallery/1%20(1)' },
    { id: '1 (2)', alt: 'Gallery item 2', base: '/gallery/1%20(2)' },
    { id: '1 (3)', alt: 'Gallery item 3', base: '/gallery/1%20(3)' },
    { id: '1 (4)', alt: 'Gallery item 4', base: '/gallery/1%20(4)' },
    { id: '1 (5)', alt: 'Gallery item 5', base: '/gallery/1%20(5)' },
    { id: '1 (6)', alt: 'Gallery item 6', base: '/gallery/1%20(6)' },
    { id: '1 (7)', alt: 'Gallery item 7', base: '/gallery/1%20(7)' },
    { id: '1 (8)', alt: 'Gallery item 8', base: '/gallery/1%20(8)' },
    { id: '1 (9)', alt: 'Gallery item 9', base: '/gallery/1%20(9)' },
    { id: '1 (10)', alt: 'Gallery item 10', base: '/gallery/1%20(10)' },
    { id: '1 (11)', alt: 'Gallery item 11', base: '/gallery/1%20(11)' },
    { id: '1 (12)', alt: 'Gallery item 12', base: '/gallery/1%20(12)' },
    { id: '1 (13)', alt: 'Gallery item 13', base: '/gallery/1%20(13)' },
    { id: '1 (14)', alt: 'Gallery item 14', base: '/gallery/1%20(14)' },
    { id: '1 (15)', alt: 'Gallery item 15', base: '/gallery/1%20(15)' },
    { id: '1 (16)', alt: 'Gallery item 16', base: '/gallery/1%20(16)' },
    { id: '1 (17)', alt: 'Gallery item 17', base: '/gallery/1%20(17)' },
    { id: '1 (18)', alt: 'Gallery item 18', base: '/gallery/1%20(18)' },
    { id: '1 (19)', alt: 'Gallery item 19', base: '/gallery/1%20(19)' },
];

const imageSizes = [400, 800, 1200];
const buildSrcSet = (base: string, ext: 'jpg' | 'webp' | 'avif') =>
    imageSizes.map((size) => `${base}-${size}.${ext} ${size}w`).join(', ');
const getSizedSrc = (base: string, size: number, ext: 'jpg' | 'webp' | 'avif' = 'jpg') => `${base}-${size}.${ext}`;
const getDefaultSrc = (base: string) => getSizedSrc(base, 800, 'jpg');
const getLqip = (base: string) => `${base}-lqip.jpg`;

const LazyImage: React.FC<{
    photo: PhotoAsset;
    sizes: string;
    className?: string;
    photosLoadStarted: boolean;
    rootId?: string;
    onClick?: () => void;
}> = ({ photo, sizes, className = '', photosLoadStarted, rootId = 'gallery-scroll', onClick }) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!photosLoadStarted) return;
        const node = wrapperRef.current;
        if (!node) return;

        const rootEl = document.getElementById(rootId) || null;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        obs.disconnect();
                    }
                });
            },
            // Larger rootMargin so images just outside the viewport start loading earlier on mobile
            { root: rootEl, rootMargin: '600px 0px', threshold: 0.01 }
        );

        obs.observe(node);
        return () => obs.disconnect();
    }, [photosLoadStarted, rootId]);

    return (
        <div
            ref={wrapperRef}
            className={className}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {visible ? (
                <div className="relative w-full h-full overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
                        style={{ backgroundImage: `url('${getLqip(photo.base)}')` }}
                    ></div>
                    <picture>
                        <source type="image/avif" srcSet={buildSrcSet(photo.base, 'avif')} sizes={sizes} />
                        <source type="image/webp" srcSet={buildSrcSet(photo.base, 'webp')} sizes={sizes} />
                        <img
                            src={getDefaultSrc(photo.base)}
                            srcSet={buildSrcSet(photo.base, 'jpg')}
                            sizes={sizes}
                            alt={photo.alt}
                            className="relative w-full h-full object-cover transition-opacity duration-300 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            loading="lazy"
                            decoding="async"
                            onLoad={(e) => {
                                const img = e.currentTarget as HTMLImageElement;
                                setLoaded(true);
                                // ensure visible after load
                                img.style.visibility = 'visible';
                            }}
                            style={{ visibility: loaded ? 'visible' : 'hidden' }}
                        />
                    </picture>
                </div>
            ) : (
                <div
                    className="w-full h-full loading-placeholder animate-pulse"
                    style={{ backgroundImage: `url('${getLqip(photo.base)}')` }}
                />
            )}
        </div>
    );
};

const AboutGallery: React.FC = () => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [photosLoadStarted, setPhotosLoadStarted] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        let t: number | undefined;
        if (isGalleryOpen) {
            // Defer starting image loads slightly so the opening animation can finish
            // and avoid heavy main-thread work immediately on click.
            // Reduced from 180ms to 60ms so images start loading faster on slower devices.
            t = window.setTimeout(() => setPhotosLoadStarted(true), 60);
        } else {
            setPhotosLoadStarted(false);
            if (t) clearTimeout(t);
        }

        return () => {
            if (t) clearTimeout(t);
        };
    }, [isGalleryOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (activeIndex === null) return;
            if (e.key === 'Escape') setActiveIndex(null);
            if (e.key === 'ArrowLeft') setActiveIndex((i) => (i === null ? null : (i - 1 + albumPhotos.length) % albumPhotos.length));
            if (e.key === 'ArrowRight') setActiveIndex((i) => (i === null ? null : (i + 1) % albumPhotos.length));
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [activeIndex]);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (activeIndex !== null) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = prev; };
        }
        return;
    }, [activeIndex]);

    const openAt = (index: number) => {
        // Close the modal when opening the fullscreen lightbox to avoid overlay stacking
        setIsGalleryOpen(false);
        setActiveIndex(index);
    };

    const closeLightbox = () => setActiveIndex(null);

    const prev = () => setActiveIndex((i) => (i === null ? null : (i - 1 + albumPhotos.length) % albumPhotos.length));
    const next = () => setActiveIndex((i) => (i === null ? null : (i + 1) % albumPhotos.length));

    return (
        <section id="about" className="py-24 bg-theme-base-alt relative overflow-hidden">
            <div className="breathing-ritual" aria-hidden="true"></div>
            {/* Gallery Modal */}
            {isGalleryOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm will-change-transform flex flex-col items-center justify-center p-0 md:p-8 animate-in fade-in duration-300">
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

                    <div id="gallery-scroll" className="w-full h-full md:max-w-7xl overflow-y-auto custom-scrollbar px-4 custom-safe-area-bottom pb-20 md:pb-0">
                        <div className="cinematic-hero">
                            <picture>
                                <source type="image/avif" srcSet={buildSrcSet(albumPhotos[0].base, 'avif')} sizes="100vw" />
                                <source type="image/webp" srcSet={buildSrcSet(albumPhotos[0].base, 'webp')} sizes="100vw" />
                                <img
                                    src={getDefaultSrc(albumPhotos[0].base)}
                                    srcSet={buildSrcSet(albumPhotos[0].base, 'jpg')}
                                    sizes="100vw"
                                    alt="Gallery hero"
                                    className="cinematic-hero-image"
                                    decoding="async"
                                />
                            </picture>
                            <div className="cinematic-hero-vignette"></div>
                            <div className="cinematic-hero-leak"></div>
                            <div className="cinematic-hero-grain"></div>
                        </div>
                        <div className="gallery-grid cinematic-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 pt-4 md:pt-0">
                            {albumPhotos.map((photo, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="gallery-item group relative"
                                        style={{ ['--reveal-index' as const]: index } as React.CSSProperties}
                                    >
                                        <div className="gallery-card w-full rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative bg-zinc-900">
                                            <LazyImage
                                                photo={photo}
                                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                                                photosLoadStarted={photosLoadStarted}
                                                rootId="gallery-scroll"
                                                onClick={() => openAt(index)}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Lightbox / Fullscreen viewer */}
                    {activeIndex !== null && (
                        <div
                            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95"
                            onClick={closeLightbox}
                        >
                            <button onClick={closeLightbox} className="absolute top-6 right-6 z-[80] bg-black/40 p-2 rounded-full text-white/80 hover:text-white">
                                {/* @ts-ignore */}
                                <iconify-icon icon="solar:close-circle-bold" width="28" height="28"></iconify-icon>
                            </button>

                            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-6 z-[80] text-white/60 hover:text-white text-3xl">‹</button>
                            <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                                <picture>
                                    <source type="image/avif" srcSet={buildSrcSet(albumPhotos[activeIndex].base, 'avif')} sizes="90vw" />
                                    <source type="image/webp" srcSet={buildSrcSet(albumPhotos[activeIndex].base, 'webp')} sizes="90vw" />
                                    <img
                                        src={getDefaultSrc(albumPhotos[activeIndex].base)}
                                        srcSet={buildSrcSet(albumPhotos[activeIndex].base, 'jpg')}
                                        sizes="90vw"
                                        alt={albumPhotos[activeIndex].alt}
                                        className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                                        decoding="async"
                                    />
                                </picture>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-6 z-[80] text-white/60 hover:text-white text-3xl">›</button>
                        </div>
                    )}

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    
                    {/* Left: Text Content */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <ScrollReveal>
                        <span className="breathing-subtitle text-purple-400 text-xs font-bold tracking-widest uppercase font-inter-tight flex items-center gap-2 mb-6">
                            <span className="w-6 h-[1px] bg-purple-500"></span>
                            Our Heritage
                        </span>
                        
                        <h2 className="breathing-title text-3xl md:text-5xl font-bold text-white mb-8 font-inter-tight leading-tight">
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
                                <h4 className="text-3xl font-bold text-white font-inter-tight">5+</h4>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Years Experience</p>
                            </div>
                            <div className="w-[1px] h-10 bg-white/10"></div>
                            <div>
                                <h4 className="text-3xl font-bold text-white font-inter-tight">900+</h4>
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
                                            style={{ backgroundImage: `url('${getSizedSrc(albumPhotos[0].base, 800, 'jpg')}')` }}
                                        ></div>
                                    </div>

                                    {/* Small Image 1 */}
                                    <div className="relative group overflow-hidden rounded-2xl aspect-square">
                                        <div className="absolute inset-0 bg-gray-800"></div>
                                        {/* Use second photo */}
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                            style={{ backgroundImage: `url('${getSizedSrc(albumPhotos[1].base, 800, 'jpg')}')` }}
                                        ></div>
                                    </div>

                                    {/* Small Image 2 */}
                                    <div className="relative group overflow-hidden rounded-2xl aspect-square">
                                        <div className="absolute inset-0 bg-gray-800"></div>
                                        {/* Use third photo */}
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                            style={{ backgroundImage: `url('${getSizedSrc(albumPhotos[2].base, 800, 'jpg')}')` }}
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