import React, { useEffect, useState } from 'react';

interface LoadingIntroProps {
    onComplete: () => void;
}

const LoadingIntro: React.FC<LoadingIntroProps> = ({ onComplete }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Start fade out after 2 seconds
        const timer = setTimeout(() => {
            setFadeOut(true);
            // Call onComplete after transition finishes
            setTimeout(onComplete, 800); 
        }, 2000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div 
            className={`fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${fadeOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'}`}
        >
            <div className="relative flex flex-col items-center">
                
                {/* Signature Container with Glass Effect */}
                <div className="relative mb-8 p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden group">
                    {/* Shimmer effect inside the card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    
                    {/* The Sign Image - Inverted to white if it's black, or kept as is. Assuming PNG with transparency */}
                    {/* Added filter brightness/invert assuming user might upload a black signature. If it's already white, this might need adj. Safe to assume white text on dark bg. */}
                    <img 
                        src="/sign.png" 
                        alt="Developer Signature" 
                        className="h-24 md:h-32 w-auto object-contain filter invert opacity-90 animate-[pulse_3s_ease-in-out_infinite]" 
                    />
                </div>

                {/* Development Text */}
                <div className="text-center space-y-3 relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-300 font-inter-tight animate-gradient-x">
                        Website Under Development
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-gray-500 text-xs uppercase tracking-[0.2em]">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                        <span>Crafting Experience</span>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
            </div>
        </div>
    );
};

export default LoadingIntro;
