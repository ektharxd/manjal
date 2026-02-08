import React from 'react';
import { CHAKRAS } from '../constants';

interface MeditatingSilhouetteProps {
  activeChakra: string | null;
  onHover: (id: string | null) => void;
}

const MeditatingSilhouette: React.FC<MeditatingSilhouetteProps> = ({ activeChakra, onHover }) => {
  
  // Helper to get active color or default gold/white
  const getActiveColor = () => {
    if (activeChakra) {
        const chakra = CHAKRAS.find(c => c.id === activeChakra);
        return chakra ? chakra.color : 'bg-white';
    }
    return 'bg-white'; // Default neutral energy
  };

  const activeColorClass = getActiveColor();

  return (
    <div className="chakra-silhouette relative w-full max-w-[600px] max-h-[80vh] aspect-square flex justify-center mx-auto mt-4 md:mt-0">
        
      {/* --- REALISTIC AURA LAYERS (The Auric Egg) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Layer 1: Etheric Body (Closest to skin) */}
        <div className={`
            absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] rounded-[50%] 
            blur-[30px] mix-blend-screen transition-all duration-700
            animate-[aura-breathe_4s_ease-in-out_infinite]
            ${activeChakra 
                ? activeColorClass.replace('bg-', 'bg-').replace('500', '500/40').replace('600', '600/40').replace('400', '400/40') 
                : 'bg-blue-100/10'
            }
        `}></div>

        {/* Layer 2: Emotional Body (Fluid, moving) */}
        <div className={`
            absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[75%] rounded-[45%] 
            blur-[50px] mix-blend-screen transition-all duration-1000 delay-100
            animate-[aura-rotate_20s_linear_infinite]
            ${activeChakra 
                ? activeColorClass.replace('bg-', 'bg-').replace('500', '500/20').replace('600', '600/20').replace('400', '400/20') 
                : 'bg-indigo-300/5'
            }
        `}
        style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
        ></div>

        {/* Layer 3: Mental/Casual Body (Outer shell) */}
        <div className={`
            absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[85%] rounded-[50%] 
            blur-[70px] mix-blend-screen transition-all duration-1000 delay-200
            animate-[aura-breathe_8s_ease-in-out_infinite_reverse]
            ${activeChakra 
                ? activeColorClass.replace('bg-', 'bg-').replace('500', '500/10').replace('600', '600/10').replace('400', '400/10') 
                : 'bg-purple-900/10'
            }
        `}></div>
        
        {/* Dynamic Rays (Magnetic Texture) */}
        <div className={`absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[120%] rounded-full animate-[aura-rotate_60s_linear_infinite] opacity-30
             bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.05)_20deg,transparent_40deg,rgba(255,255,255,0.02)_60deg,transparent_90deg,rgba(255,255,255,0.05)_120deg,transparent_360deg)]
        `}></div>

      </div>

      {/* SVG Container */}
      <svg 
        viewBox="0 0 800 800" 
        className="w-full h-full drop-shadow-[0_0_25px_rgba(255,255,255,0.1)] z-10 relative overflow-visible" 
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Prana Flow Gradient - Full Chakra Spectrum */}
          <linearGradient id="pranaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="4%" stopColor="#8b5cf6" /> {/* Crown */}
            <stop offset="12%" stopColor="#4f46e5" /> {/* Third Eye */}
            <stop offset="21%" stopColor="#22d3ee" /> {/* Throat */}
            <stop offset="35%" stopColor="#16a34a" /> {/* Heart */}
            <stop offset="48%" stopColor="#facc15" /> {/* Solar */}
            <stop offset="61%" stopColor="#ea580c" /> {/* Sacral */}
            <stop offset="76%" stopColor="#dc2626" /> {/* Root */}
          </linearGradient>

          {/* Magnetic Field Gradient (Energy waves) */}
          <linearGradient id="magneticGradient" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stopColor="white" stopOpacity="0.0" />
             <stop offset="20%" stopColor="white" stopOpacity="0.1" />
             <stop offset="50%" stopColor="white" stopOpacity="0.4" />
             <stop offset="80%" stopColor="white" stopOpacity="0.1" />
             <stop offset="100%" stopColor="white" stopOpacity="0.0" />
          </linearGradient>

          {/* Light Mode Magnetic Gradient (Black/Dark) */}
          <linearGradient id="magneticGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.0" />
             <stop offset="20%" stopColor="#8b5cf6" stopOpacity="0.1" />
             <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
             <stop offset="80%" stopColor="#8b5cf6" stopOpacity="0.1" />
             <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
          </linearGradient>

          <filter id="energyGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- MAGNETIC FIELD LINES (Toroidal Flow) --- */}
        {/* Adjusted for viewBox 0 0 800 800. Center is now 400. */}
        <g>
             {/* Central Axis Flow (Behind) */}
             <path d="M 400,30 L 400,610" stroke="url(#magneticGradient)" strokeWidth="60" filter="url(#energyGlow)" opacity="0.05" />

             {/* 
                Animated Field Lines 
                Using `animate-magnetic-flow` class which uses `stroke-dashoffset` keyframes.
                `stroke-dasharray` must be set to create the 'ants' or 'flow' effect.
                Values like "5 5" create small dashes. "50 50" create longer segments.
             */}
             
             {/* Left Field Loop - Inner */}
             <path 
                d="M 400,30 C 100,10 -150,300 400,610" 
                fill="none" 
                stroke="url(#pranaGradient)" 
                strokeWidth="0.5" 
                strokeDasharray="10 15" 
                className="animate-magnetic-flow" 
                opacity="0.3" 
             />
             
             {/* Left Field Loop - Outer */}
             <path 
                d="M 400,30 C 200,50 100,350 400,610" 
                fill="none" 
                stroke="url(#pranaGradient)" 
                strokeWidth="0.8" 
                strokeDasharray="20 30" 
                className="animate-magnetic-flow" 
                style={{ animationDuration: '7s' }} 
                opacity="0.4" 
             />
             
             {/* Right Field Loop - Inner */}
             <path 
                d="M 400,30 C 700,10 950,300 400,610" 
                fill="none" 
                stroke="url(#pranaGradient)" 
                strokeWidth="0.5" 
                strokeDasharray="10 15" 
                className="animate-magnetic-flow" 
                style={{ animationDirection: 'reverse' }}
                opacity="0.3" 
             />
             
             {/* Right Field Loop - Outer */}
             <path 
                d="M 400,30 C 600,50 700,350 400,610" 
                fill="none" 
                stroke="url(#pranaGradient)" 
                strokeWidth="0.8" 
                strokeDasharray="20 30" 
                className="animate-magnetic-flow" 
                style={{ animationDuration: '7s', animationDirection: 'reverse' }} 
                opacity="0.4" 
             />
             
             {/* Horizontal Intersecting Orbits (Spinning, not flowing) */}
             <ellipse cx="400" cy="320" rx="350" ry="100" fill="none" stroke="url(#magneticGradient)" strokeWidth="0.5" className="animate-[spin_12s_linear_infinite]" style={{transformOrigin: '400px 320px'}} opacity="0.2" />
             <ellipse cx="400" cy="320" rx="350" ry="100" fill="none" stroke="url(#magneticGradient)" strokeWidth="0.5" className="animate-[spin_12s_linear_infinite_reverse]" style={{transformOrigin: '400px 320px', transform: 'rotate(90deg)'}} opacity="0.2" />
        </g>


        {/* --- USER PROVIDED SILHOUETTE --- */}
        <g transform="translate(16, -24) scale(1.5)">
            <g transform="translate(0, 512) scale(0.1, -0.1)" fill="white" fillOpacity="0.1">
                <path d="M2575 4745 c-16 2 -40 0 -51 -4 -12 -5 -31 -22 -44 -38 -17 -22 -21
                -36 -17 -68 4 -26 15 -48 32 -62 17 -15 39 -23 65 -23 26 0 48 8 65 23 17 14
                28 36 32 63 4 35 1 46 -23 73 -16 17 -42 33 -59 36z"/>
                <path d="M2767 4620 c-1 0 -8 -5 -15 -12 -7 -7 -12 -18 -12 -26 0 -8 23 -35
                52 -60 28 -26 66 -70 84 -98 18 -28 43 -80 55 -115 17 -50 22 -86 22 -169 0
                -83 -5 -119 -22 -170 -13 -35 -33 -83 -47 -105 -13 -22 -45 -62 -71 -88 -26
                -26 -72 -60 -103 -75 -47 -23 -67 -27 -145 -27 -75 0 -98 4 -140 24 -27 14
                -75 50 -106 80 -34 35 -67 81 -86 121 -17 36 -36 89 -42 118 -6 29 -11 86 -11
                125 0 40 7 99 15 131 8 32 27 83 43 114 15 31 53 83 85 115 31 33 57 65 57 72
                0 7 -7 18 -15 25 -12 10 -21 8 -51 -10 -19 -13 -54 -45 -76 -73 -22 -28 -50
                -71 -62 -96 -13 -25 -32 -71 -42 -101 -15 -42 -19 -84 -19 -180 0 -96 4 -138
                19 -180 10 -30 29 -76 42 -101 12 -25 41 -69 64 -97 22 -29 56 -62 75 -75 35
                -22 35 -22 35 -98 0 -65 -4 -85 -28 -130 -20 -38 -41 -62 -72 -81 -29 -17 -82
                -34 -145 -47 -65 -13 -128 -34 -180 -60 -51 -25 -101 -60 -139 -97 -32 -31
                -73 -81 -92 -110 -19 -29 -43 -75 -53 -103 -11 -27 -50 -199 -86 -383 -37
                -183 -73 -349 -81 -368 -8 -19 -22 -43 -32 -54 -9 -10 -107 -94 -217 -186
                -110 -92 -234 -202 -275 -246 -41 -43 -128 -147 -193 -231 -65 -84 -123 -156
                -130 -160 -7 -4 -106 -10 -220 -13 -205 -5 -209 -5 -228 -29 -10 -13 -19 -36
                -19 -53 0 -20 13 -43 45 -77 24 -26 68 -59 98 -74 29 -14 65 -29 80 -32 l26
                -7 -29 -37 c-16 -20 -36 -53 -45 -74 -8 -20 -18 -63 -21 -95 -5 -41 -1 -76 10
                -116 10 -32 28 -75 40 -95 13 -20 42 -53 65 -74 24 -21 74 -59 113 -84 38 -25
                102 -60 142 -79 40 -18 111 -44 157 -57 46 -14 125 -30 174 -37 62 -9 150 -11
                286 -7 107 4 265 14 350 23 84 8 218 26 296 39 78 13 202 38 275 54 73 17 180
                43 237 60 79 22 111 27 129 20 14 -5 86 -25 160 -44 74 -19 203 -48 286 -64
                83 -17 223 -39 311 -50 88 -12 228 -25 310 -31 83 -5 204 -10 270 -10 66 0
                163 7 215 15 52 9 134 29 182 45 48 16 111 41 140 56 29 14 89 50 134 80 44
                29 99 74 123 99 23 25 51 67 62 92 11 26 23 75 26 108 4 42 0 79 -11 118 -9
                32 -24 61 -35 66 -13 7 -24 6 -36 -3 -17 -12 -17 -15 0 -66 12 -37 16 -70 12
                -110 -2 -31 -14 -74 -25 -96 -11 -22 -40 -58 -64 -80 -23 -22 -63 -54 -88 -71
                -25 -17 -81 -48 -125 -71 -44 -22 -117 -51 -161 -65 -45 -14 -122 -31 -170
                -38 -59 -8 -156 -10 -289 -6 -110 4 -265 14 -345 22 -80 9 -212 27 -295 41
                -82 13 -220 41 -305 60 -85 20 -161 39 -168 43 -8 5 22 18 75 34 48 15 120 31
                158 36 39 5 167 13 285 17 140 4 226 11 247 20 21 8 35 22 39 38 3 14 3 37 0
                51 l-6 25 204 0 c201 0 205 0 212 22 4 15 1 25 -12 35 -14 10 -76 13 -270 13
                l-253 0 -141 85 c-77 47 -151 87 -163 90 -16 4 -64 -18 -171 -80 -82 -47 -156
                -90 -163 -97 -8 -6 -13 -21 -11 -32 2 -12 12 -22 23 -24 11 -1 85 36 165 82
                l145 85 35 -21 c19 -11 104 -61 188 -112 83 -50 152 -93 152 -97 0 -3 -118
                -11 -262 -17 -192 -8 -283 -17 -338 -30 -41 -11 -151 -43 -245 -71 -93 -29
                -233 -68 -310 -86 -77 -19 -201 -46 -276 -59 -74 -14 -216 -34 -315 -46 -98
                -11 -271 -23 -384 -27 -136 -4 -235 -2 -294 6 -48 7 -125 24 -170 38 -44 14
                -117 43 -161 65 -44 23 -100 54 -125 71 -25 17 -65 49 -88 71 -24 22 -53 58
                -65 81 -16 30 -22 58 -22 115 0 65 4 82 29 128 17 30 44 63 60 75 26 18 45 22
                116 22 69 0 92 4 121 21 19 12 195 151 390 309 195 159 387 316 427 349 40 34
                98 92 128 130 31 38 71 100 89 137 19 37 75 170 125 296 51 125 95 232 99 236
                4 4 22 -39 39 -95 17 -57 36 -130 43 -163 7 -33 12 -121 12 -195 0 -98 -6
                -160 -21 -225 -11 -50 -53 -176 -93 -280 -39 -105 -80 -202 -90 -216 -10 -15
                -33 -33 -51 -42 -26 -12 -103 -17 -372 -25 -269 -7 -340 -12 -347 -23 -5 -8
                -8 -21 -6 -29 2 -13 47 -15 342 -12 187 1 355 7 374 12 18 5 48 19 66 31 17
                12 41 36 53 53 12 17 55 120 96 229 44 114 85 242 97 300 16 75 21 137 21 232
                0 76 -7 163 -16 210 -9 44 -37 147 -63 228 -29 91 -53 152 -64 157 -10 6 -22
                5 -31 -3 -8 -7 -68 -145 -132 -307 -65 -162 -133 -323 -152 -358 -20 -34 -57
                -88 -83 -120 -29 -35 -219 -196 -470 -401 -232 -188 -436 -350 -453 -359 -28
                -13 -47 -14 -150 -4 -77 7 -134 18 -165 32 -26 11 -65 37 -85 58 -21 20 -38
                40 -38 44 0 4 86 8 191 8 156 0 197 3 225 16 24 12 78 71 173 193 77 97 174
                211 218 253 43 43 164 148 268 235 154 128 195 168 218 210 22 41 42 126 97
                400 60 301 75 358 106 422 25 50 57 94 99 136 41 40 89 74 136 98 48 23 105
                42 162 51 49 9 108 24 130 35 23 10 61 38 85 62 24 25 51 66 62 96 11 30 20
                78 20 109 l0 56 33 -9 c17 -4 68 -8 112 -8 44 0 92 3 108 8 l27 7 0 -54 c0
                -31 9 -79 20 -109 11 -30 38 -71 62 -96 24 -24 62 -52 85 -62 22 -11 81 -26
                130 -34 57 -10 114 -28 162 -51 49 -25 94 -57 136 -99 42 -41 75 -87 99 -136
                31 -64 46 -121 106 -421 49 -247 76 -361 94 -396 15 -30 50 -71 88 -104 35
                -30 124 -104 198 -165 74 -61 172 -149 217 -195 45 -45 140 -157 210 -247 82
                -105 140 -170 163 -182 30 -17 59 -19 227 -19 106 0 193 -4 193 -8 0 -4 -17
                -24 -37 -44 -21 -21 -60 -47 -87 -59 -34 -15 -87 -25 -167 -32 -107 -9 -120
                -9 -152 9 -20 10 -225 173 -456 362 -248 202 -438 365 -465 397 -24 30 -59 80
                -77 111 -17 31 -87 194 -154 363 -120 298 -124 306 -151 306 -26 0 -29 -6 -61
                -100 -19 -55 -45 -142 -58 -193 -14 -51 -29 -139 -34 -195 -6 -65 -7 -138 -1
                -202 6 -55 19 -137 30 -181 12 -45 52 -165 91 -265 39 -101 80 -198 92 -216
                12 -17 39 -43 60 -57 22 -14 58 -28 81 -30 22 -3 232 -11 466 -17 l425 -10 53
                -42 c29 -23 69 -54 89 -70 20 -15 54 -32 77 -38 30 -8 73 -8 158 0 70 7 141
                20 175 32 39 15 75 40 115 78 46 45 58 63 58 88 0 17 -9 41 -19 54 -19 24 -23
                24 -228 29 -114 3 -214 9 -221 13 -7 5 -65 77 -130 160 -64 84 -155 192 -201
                240 -47 48 -157 147 -245 220 -88 73 -180 150 -205 172 -24 22 -52 58 -62 80
                -9 22 -47 191 -84 375 -37 184 -76 356 -86 383 -11 26 -34 72 -53 101 -19 29
                -59 78 -91 109 -31 30 -83 69 -115 86 -32 17 -78 38 -102 47 -24 8 -79 22
                -123 30 -50 9 -96 24 -124 42 -32 19 -53 43 -73 81 -23 44 -28 66 -28 125 0
                68 2 74 26 87 14 7 49 38 77 69 29 31 66 83 84 115 17 33 39 89 49 125 9 37
                17 104 17 155 1 50 -5 115 -12 145 -7 30 -28 87 -47 127 -19 39 -57 97 -85
                128 -29 31 -65 63 -80 70 -15 8 -30 15 -32 15z m384 -2107 c4 -4 48 -111 99
                -236 50 -126 106 -260 125 -297 19 -38 55 -95 81 -127 25 -32 62 -73 82 -91
                21 -19 164 -137 320 -264 156 -127 281 -232 279 -234 -2 -2 -174 0 -383 6
                -208 6 -393 13 -411 15 -17 3 -45 18 -61 33 -20 19 -49 79 -100 209 -39 101
                -81 218 -92 260 -11 43 -25 123 -31 178 -6 55 -8 129 -4 165 3 36 11 92 16
                125 6 33 24 106 41 163 17 56 35 99 39 95z"/>
                <path d="M2560 4410 c-33 0 -48 -6 -71 -29 -20 -21 -29 -39 -29 -63 0 -18 7
                -44 16 -57 9 -13 32 -29 50 -37 29 -12 39 -12 68 0 18 8 41 24 50 37 9 13 16
                39 16 57 0 24 -9 42 -29 63 -23 23 -38 29 -71 29z"/>
                <path d="M1484 3560 c-12 0 -25 -7 -28 -16 -3 -9 -3 -21 1 -27 4 -7 47 -58 97
                -114 49 -57 93 -103 97 -103 4 0 14 3 23 6 9 3 16 15 16 26 0 11 -41 67 -92
                124 -64 73 -98 104 -114 104z"/>
                <path d="M3636 3560 c-16 0 -49 -30 -112 -101 -49 -55 -91 -110 -92 -121 -2
                -11 2 -25 10 -29 7 -5 18 -9 24 -9 6 0 51 46 100 103 50 56 93 107 97 114 4 6
                4 18 1 27 -3 9 -16 16 -28 16z"/>
                <path d="M2560 3520 c-26 0 -48 -8 -65 -23 -17 -14 -28 -36 -32 -63 -5 -36 -1
                -46 25 -75 25 -28 37 -34 72 -34 35 0 47 6 72 34 26 29 30 39 25 75 -4 27 -15
                49 -32 63 -17 15 -39 23 -65 23z"/>
                <path d="M2575 1373 c-11 4 -34 0 -52 -8 -17 -7 -39 -25 -49 -39 -12 -19 -15
                -37 -11 -64 4 -22 17 -46 32 -59 17 -15 39 -23 64 -23 23 0 48 8 64 20 15 12
                29 36 33 56 4 20 2 46 -4 59 -6 13 -21 30 -34 38 -13 8 -32 17 -43 20z"/>
                <path d="M2066 995 c-11 3 -34 -2 -51 -10 -16 -9 -44 -25 -62 -36 -22 -14 -33
                -28 -33 -44 0 -12 7 -26 16 -29 9 -4 38 6 68 23 l51 30 90 -52 89 -52 -506 -5
                c-363 -4 -510 -8 -518 -16 -7 -7 -9 -21 -5 -33 l6 -21 559 0 560 0 16 25 c15
                23 15 27 1 49 -9 13 -70 55 -138 95 -67 39 -131 74 -143 76z"/>
                <path d="M2560 870 c-26 0 -48 -8 -65 -23 -17 -14 -28 -36 -32 -63 -4 -33 -1
                -45 21 -71 14 -17 38 -33 53 -36 16 -3 42 1 60 8 17 7 39 25 48 39 13 19 16
                37 12 64 -4 22 -17 46 -32 60 -18 15 -39 22 -65 22z"/>
            </g>
        </g>
        
        {/* Central Channel (Sushumna) - Connects Crown (32) to Root (608) */}
        <path
            d="M 400,608 L 400,32"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#energyGlow)"
            opacity="0.9"
            className="animate-pulse"
        />
        
        {/* Ping effects on channel */}
        <circle cx="400" cy="320" r="3" fill="white" className="animate-[ping_3s_linear_infinite]" />
      </svg>

      {/* Chakra Points Layer */}
      <div className="absolute inset-0 z-20">
        {CHAKRAS.map((chakra) => {
          const isActive = activeChakra === chakra.id;

          return (
            <div
              key={chakra.id}
              className={`absolute left-1/2 -translate-x-1/2 cursor-pointer group flex items-center justify-center ${chakra.position}`}
              onMouseEnter={() => onHover(chakra.id)}
              onMouseLeave={() => onHover(null)}
            >
                {/* Connecting line to right (Only visible on large screens) */}
                <div className={`hidden lg:block absolute left-full top-1/2 h-[1px] bg-gradient-to-r from-white/30 to-transparent transition-all duration-300 origin-left pointer-events-none
                    ${isActive ? 'w-[150px] opacity-100' : 'w-0 opacity-0'}
                `}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
                </div>

                {/* Outer Ring Animation - Expands from center */}
                <div className={`absolute rounded-full border border-white/20 transition-all duration-700 pointer-events-none
                    ${isActive ? 'w-24 h-24 opacity-100 scale-100 rotate-180' : 'w-0 h-0 opacity-0 scale-0 rotate-0'}
                `} style={{borderStyle: 'dashed'}}></div>

                 {/* Core Point Container */}
                <div className="relative flex items-center justify-center">
                    
                    {/* Active Glow/Pulse Effect */}
                    {isActive && (
                        <div className={`absolute inset-0 rounded-full ${chakra.color} blur-xl animate-pulse-active opacity-60`} style={{ color: 'inherit' }}></div>
                    )}

                    {/* The Dot Itself */}
                    <div 
                        className={`
                            relative rounded-full transition-all duration-500 ease-out z-20 flex items-center justify-center
                            ${isActive 
                                ? `w-10 h-10 ${chakra.color} shadow-[0_0_30px_currentColor] text-${chakra.color.split('-')[1]}-400 scale-110` 
                                : `w-3 h-3 bg-white/60 hover:bg-white hover:scale-150 animate-pulse-slow shadow-[0_0_10px_rgba(255,255,255,0.5)]`
                            }
                        `}
                    >
                        {/* Inner white core for active state */}
                        {isActive && <div className="w-full h-full bg-white/30 rounded-full animate-ping absolute"></div>}
                        {isActive && <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>}
                    </div>
                </div>

                {/* Tooltip for Mobile */}
                <div className={`lg:hidden absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-gray-900 border border-white/10 p-2 rounded-lg whitespace-nowrap z-50 transition-all duration-300 pointer-events-none
                    ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                `}>
                    <p className="text-xs font-bold text-white font-inter-tight">{chakra.sanskritName}</p>
                    <p className="text-[10px] text-gray-400">{chakra.affirmation}</p>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MeditatingSilhouette;