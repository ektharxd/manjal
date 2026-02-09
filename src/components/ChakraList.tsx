import React, { useEffect, useRef } from 'react';
import { CHAKRAS } from '../constants';

interface ChakraListProps {
  activeChakra: string | null;
  onHover: (id: string | null) => void;
}

const ChakraList: React.FC<ChakraListProps> = ({ activeChakra, onHover }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0; // ensure list starts at top
  }, [activeChakra]);

  return (
    <div className="w-full max-w-md ml-auto pr-2 lg:pr-0 z-30 lg:-mt-6">
      <div
        ref={scrollRef}
        className="flex flex-col gap-2 bg-[rgba(10,10,12,0.6)] backdrop-blur-sm rounded-3xl p-3 border border-white/10 shadow-lg font-inter-tight"
      >
        {CHAKRAS.map((chakra, index) => {
          const isActive = activeChakra === chakra.id;

          return (
            <div
              key={chakra.id}
              onMouseEnter={() => onHover(chakra.id)}
              onMouseLeave={() => onHover(null)}
              className={`
                relative group flex flex-col p-3 md:p-4 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-sm
                ${isActive
                  ? 'bg-[#15151a]/90 border-white/10 -translate-x-2 shadow-2xl shadow-black/50 z-10'
                  : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5 opacity-70 hover:opacity-100 hover:-translate-x-1'
                }
              `}
            >

              <div className="flex items-start gap-4">
                {/* Icon Circle */}
                <div className={`
                  w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-base md:text-lg shrink-0 transition-all duration-500
                  ${isActive
                      ? `${chakra.color} text-white shadow-lg scale-105 ring-4 ring-white/5`
                      : 'bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300'
                  }
                `}>
                  {/* @ts-ignore */}
                  <iconify-icon icon={chakra.icon}></iconify-icon>
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className={`font-inter-tight font-bold text-lg leading-tight transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                        {chakra.sanskritName}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium mt-0.5 font-inter-tight">
                        {chakra.name} — {chakra.meaning}
                      </p>
                    </div>

                    {/* Affirmation Chip */}
                    <span className={`
                      font-inter-tight text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border transition-all duration-300 shrink-0
                      ${isActive
                        ? 'bg-white/10 border-white/20 text-white shadow-inner'
                        : 'bg-white/5 border-transparent text-gray-600'
                      }
                    `}>
                      {chakra.affirmation}
                    </span>
                  </div>

                  {/* Description - Accordion Effect */}
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="text-sm text-gray-400 leading-relaxed border-t border-white/10 pt-3 font-inter-tight">
                        {chakra.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Side Accent (Right side bar) */}
              <div className={`absolute right-0 top-6 bottom-6 w-1 rounded-l-full transition-all duration-500 ${isActive ? `${chakra.color} opacity-100` : 'bg-gray-800 opacity-0'}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChakraList;