import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const Consultation: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        therapy: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Format the message for WhatsApp with Unicode Escapes to prevent encoding errors
        const whatsappMessage = `
\uD83C\uDF3F *New Appointment Request* \uD83C\uDF3F

\uD83D\uDC64 *Name:* ${formData.name || 'Not provided'}
\uD83D\uDCDE *Phone:* ${formData.phone || 'Not provided'}

\uD83D\uDCC5 *Date:* ${formData.date || 'Flexible'}
\u23F0 *Time:* ${formData.time || 'Flexible'}

\uD83E\uDDD8 *Treatment:* ${formData.therapy || 'General Consultation'}

\uD83D\uDCDD *Concerns:* 
${formData.message || 'None provided'}

----------------------------
_Sent via Manjal Ayurveda Website_
`.trim();

        const encodedMessage = encodeURIComponent(whatsappMessage);
        // Using the verified contact number
        const whatsappUrl = `https://wa.me/917907178727?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section id="consultation" className="py-24 bg-theme-base relative border-t border-white/5">
            <div className="container mx-auto px-6">
                
                <div className="max-w-4xl mx-auto bg-theme-surface rounded-3xl overflow-hidden border border-white/5 flex flex-col md:flex-row shadow-2xl">
                    
                    {/* Left: Contact & WhatsApp */}
                    <div className="w-full md:w-2/5 bg-theme-surface-strong p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                        {/* Decorative Circle */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>

                        <div>
                            <span className="text-green-400 text-xs font-bold tracking-widest uppercase font-inter-tight">Fastest Way</span>
                            <h3 className="text-2xl font-bold text-white mt-4 mb-2 font-inter-tight">Instant Booking</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                Connect with our Ayurveda specialists directly via WhatsApp for quick appointments and queries.
                            </p>
                        </div>

                        <a 
                            href="https://wa.me/918086728253" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-white-forced py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] group"
                        >
                            {/* @ts-ignore */}
                            <iconify-icon icon="logos:whatsapp-icon" width="24"></iconify-icon>
                            <span className="font-inter-tight">Chat on WhatsApp</span>
                            {/* @ts-ignore */}
                            <iconify-icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform"></iconify-icon>
                        </a>

                        <div className="mt-8 pt-8 border-t border-white/10">
                             <p className="text-gray-500 text-xs font-inter-tight text-center">
                                Typical response time: <span className="text-white">Under 10 mins</span>
                             </p>
                        </div>
                    </div>

                    {/* Right: Detailed Form */}
                    <div className="w-full md:w-3/5 p-8 md:p-12 bg-[#0a0a0c]">
                        <h3 className="text-2xl font-bold text-white mb-6 font-inter-tight">Book Consultation</h3>
                        
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe" 
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors" 
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Phone</label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 ..." 
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors" 
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Preferred Date</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-white transition-colors pointer-events-none">
                                            {/* @ts-ignore */}
                                            <iconify-icon icon="solar:calendar-date-bold-duotone" width="20"></iconify-icon>
                                        </div>
                                        <input 
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pl-12 py-3.5 text-white focus:outline-none focus:border-white/30 transition-all shadow-inner appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                            placeholder="Select Date"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 group-hover:text-gray-400">
                                            {/* @ts-ignore */}
                                            <iconify-icon icon="solar:alt-arrow-down-linear" width="14"></iconify-icon>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Preferred Time</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-white transition-colors pointer-events-none">
                                            {/* @ts-ignore */}
                                            <iconify-icon icon="solar:clock-circle-bold-duotone" width="20"></iconify-icon>
                                        </div>
                                        <input 
                                            type="time" 
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pl-12 py-3.5 text-white focus:outline-none focus:border-white/30 transition-all shadow-inner appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 group-hover:text-gray-400">
                                            {/* @ts-ignore */}
                                            <iconify-icon icon="solar:alt-arrow-down-linear" width="14"></iconify-icon>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Preferred Therapy (Optional)</label>
                                <div className="relative">
                                    <select 
                                        name="therapy"
                                        value={formData.therapy}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-[#0a0a0c] text-gray-500">Select a treatment...</option>
                                        <option value="panchakarma" className="bg-[#0a0a0c]">Panchakarma (Detox)</option>
                                        <option value="abhyanga" className="bg-[#0a0a0c]">Abhyanga (Massage)</option>
                                        <option value="shirodhara" className="bg-[#0a0a0c]">Shirodhara (Relaxation)</option>
                                        <option value="consultation" className="bg-[#0a0a0c]">General Ayurvedic Consultation</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        {/* @ts-ignore */}
                                        <iconify-icon icon="solar:alt-arrow-down-linear" width="16"></iconify-icon>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Message</label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={3} 
                                    placeholder="Tell us about your health concerns..." 
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors resize-none mb-2"
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-inter-tight flex items-center justify-center gap-2">
                                Request Appointment
                                {/* @ts-ignore */}
                                <iconify-icon icon="logos:whatsapp-icon" width="20"></iconify-icon>
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Consultation;