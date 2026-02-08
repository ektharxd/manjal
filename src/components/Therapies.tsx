import React from 'react';
import ScrollReveal from './ScrollReveal';

const treatments = [
    {
        name: 'Shirodhara',
        description: 'Reduce Stress & Anxiety',
        icon: 'ri:drop-fill',
        color: 'text-purple-400'
    },
    {
        name: 'Abhyanga',
        description: 'Calming for the Nerves',
        icon: 'solar:hand-stars-bold-duotone',
        color: 'text-amber-400'
    },
    {
        name: 'Navarakizhi',
        description: 'Provide strength & rejuvenate the tissues',
        icon: 'solar:bone-bold-duotone',
        color: 'text-orange-400'
    },
    {
        name: 'Elakizhi',
        description: 'Relieves body pain & stiffness',
        icon: 'solar:leaf-bold-duotone',
        color: 'text-lime-400'
    },
    {
        name: 'Shirovasthi',
        description: 'Balance the Vatha and Kapha',
        icon: 'ph:head-circuit-duotone',
        color: 'text-blue-400'
    },
    {
        name: 'Thala Pothichil',
        description: 'Improves the quality of sleep',
        icon: 'solar:sleeping-bold-duotone',
        color: 'text-indigo-400'
    },
    {
        name: 'Karnapooranam',
        description: 'Helps overcome common to chronic ear complications',
        icon: 'lucide:ear',
        color: 'text-pink-400'
    },
    {
        name: 'Udwarthanam',
        description: 'Reduces excess fat',
        icon: 'solar:body-bold-duotone',
        color: 'text-rose-400'
    },
    {
        name: 'Pizhichil',
        description: 'Relieving body pain and increasing rejuvenation',
        icon: 'solar:waterdrops-bold-duotone',
        color: 'text-cyan-400'
    },
    {
        name: 'Nasyam',
        description: 'Heals migraines and headaches',
        icon: 'healthicons:nose',
        color: 'text-emerald-400'
    },
    {
        name: 'Ksheera Dhara',
        description: 'Boost skin glow & relax body and mind',
        icon: 'solar:sun-fog-bold-duotone',
        color: 'text-yellow-400'
    },
    {
        name: 'Takra Dhara',
        description: 'Helps overcome stress & calms the nervous system',
        icon: 'solar:meditation-round-bold-duotone',
        color: 'text-teal-400'
    },
    {
        name: 'Kashaya Dhara',
        description: 'Improves circulation to the skin',
        icon: 'solar:heart-pulse-bold-duotone',
        color: 'text-red-400'
    },
    {
        name: 'Mukh Lepam',
        description: 'Exfoliate the skin',
        icon: 'lucide:sparkles',
        color: 'text-fuchsia-400'
    },
    {
        name: 'Rejuvenation Massage',
        description: 'Holistic massage to revitalize body and mind',
        icon: 'mdi:spa',
        color: 'text-violet-400'
    },
    {
        name: 'Shiropichu',
        description: 'Reduces burning sensation in the scalp',
        icon: 'lucide:snowflake',
        color: 'text-sky-400'
    },
    {
        name: 'Kati Vasti',
        description: 'Strengthening the low back muscles',
        icon: 'icon-park-twotone:muscle',
        color: 'text-orange-500'
    },
    {
        name: 'Janu Vasti',
        description: 'Relief of knee joint pain',
        icon: 'solar:walking-round-bold-duotone',
        color: 'text-green-500'
    },
    {
        name: 'Upanaha Sweda',
        description: 'Relieves pain, swelling & nourishes tissues',
        icon: 'lucide:bandage',
        color: 'text-amber-500'
    },
    {
        name: 'Avagaha Sweda',
        description: 'Treatment of Vata-related issues',
        icon: 'solar:bath-bold-duotone',
        color: 'text-blue-500'
    }
];

const Therapies: React.FC = () => {
    return (
        <section id="therapies" className="py-24 bg-[#469869] border-t border-white/5 relative overflow-hidden">
            {/* Background Texture (matching green radial accent) */}
            <div className="absolute inset-0 opacity-24 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_#2f7a59,_transparent)]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal>
                <div className="text-center mb-16">
                    <span className="text-purple-400 text-xs font-bold tracking-widest uppercase font-inter-tight">Our Specialities</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 font-inter-tight">Therapeutic Treatments</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto font-light">
                        Ancient Ayurvedic therapies curated to heal, rejuvenate, and restore your body's vital energy.
                    </p>
                </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {treatments.map((item, idx) => (
                        <ScrollReveal key={idx} delay={`delay-${(idx % 3) * 100}`}>
                        <div className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 h-full">
                            <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl mb-6 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                {/* @ts-ignore */}
                                <iconify-icon icon={item.icon}></iconify-icon>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 font-inter-tight">{item.name}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-light">{item.description}</p>
                        </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Therapies;