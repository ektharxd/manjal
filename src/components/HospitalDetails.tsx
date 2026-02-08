import React from 'react';

const HospitalDetails: React.FC = () => {
    return (
        <section id="location" className="py-24 bg-theme-base-alt relative overflow-hidden">
             {/* Background Glow */}
             <div className="absolute right-0 top-1/4 w-96 h-96 accent-glow-blue rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                    
                    {/* Map Side */}
                    <div className="w-full lg:w-1/2 relative group">
                        <div className="absolute inset-0 bg-white/5 rounded-3xl transform -rotate-2 transition-transform group-hover:rotate-0"></div>
                        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl bg-theme-surface">
                             
                             {/* Google Map Embed - Dark Mode Filter Applied */}
                             <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d3943.472760175138!2d76.71474107195183!3d8.741509455892455!3m2!1i1024!2i768!4f13.1!2m1!1smanjal%20ayurveda%20speciality%20clinic!5e0!3m2!1sen!2sin!4v1770539524752!5m2!1sen!2sin"
                                width="100%" 
                                height="100%" 
                                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                             ></iframe>
                            
                            {/* Overlay Badge */}
                            <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 flex items-center gap-3 shadow-lg">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                                    {/* @ts-ignore */}
                                    <iconify-icon icon="solar:map-point-bold-duotone" width="20"></iconify-icon>
                                </div>
                                <div>
                                    <p className="text-white text-xs font-bold font-inter-tight">Punnamood, Varkala</p>
                                    <a href="https://maps.app.goo.gl/h93LWNBg39tQkVZH8" target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-400 hover:text-white transition-colors flex items-center gap-1 mt-0.5">
                                        Open in Maps
                                        {/* @ts-ignore */}
                                        <iconify-icon icon="solar:arrow-right-up-linear"></iconify-icon>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2">
                        <span className="text-gray-400 text-xs font-bold tracking-widest uppercase font-inter-tight flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-gray-600"></span>
                            Location
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-6 font-inter-tight leading-tight">
                            Find Peace in <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Nature's Lap</span>
                        </h2>
                        <p className="text-gray-400 text-lg font-light mb-10 leading-relaxed border-l-2 border-white/10 pl-6">
                            Our clinic is nestled in the serene landscapes of Varkala, designed to disconnect you from chaos and reconnect you with your inner self.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 group-hover:bg-white group-hover:text-black transition-all duration-300">
                                    {/* @ts-ignore */}
                                    <iconify-icon icon="solar:map-point-linear" width="24"></iconify-icon>
                                </div>
                                <h4 className="text-white font-bold font-inter-tight mb-2">Visit Us</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Punnamood, Varkala<br/>
                                    Kerala, India
                                </p>
                            </div>

                            <div className="group">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 group-hover:bg-white group-hover:text-black transition-all duration-300">
                                    {/* @ts-ignore */}
                                    <iconify-icon icon="solar:clock-circle-linear" width="24"></iconify-icon>
                                </div>
                                <h4 className="text-white font-bold font-inter-tight mb-2">Opening Hours</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Mon - Sat: 9:00 AM - 7:00 PM<br/>
                                    Sunday: By Appointment
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HospitalDetails;