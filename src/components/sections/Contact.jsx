import React, { useState } from 'react';
import { Mail, MapPin, Github, Linkedin, Twitter, Send, MessageSquare, Briefcase, ExternalLink } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../../utils/constants";
import FadeIn from "../animations/FadeIn";

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation logic inside submit
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ type: 'error', message: 'Please fill in all fields' });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus({ type: 'error', message: 'Please enter a valid email' });
            return;
        }

        // Success Simulation
        setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon..' });
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-[#030712]">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn delay={0}>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-semibold mb-6 backdrop-blur-sm">
                            <MessageSquare className="w-4 h-4" />
                            <span className="tracking-wider uppercase">Get in touch</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                            Let's work together
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Have a project in mind? Let's discuss how we can bring your ideas to life.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                    {/* Left Side: Contact Info */}
                    <FadeIn delay={0.2} direction="left">
                        <div className="space-y-8">
                            <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl backdrop-blur-md">
                                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <Mail className="w-5 h-5 text-primary group-hover:text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Email Me</p>
                                            <p className="text-white font-medium mt-1">{PERSONAL_INFO.email || "hello@yourdomain.com"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <MapPin className="w-5 h-5 text-primary group-hover:text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Location</p>
                                            <p className="text-white font-medium mt-1">{PERSONAL_INFO.location || "Dhaka, Bangladesh"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="mt-10 pt-8 border-t border-white/5">
                                    <p className="text-white font-semibold mb-4">Follow My Work</p>
                                    <div className="flex gap-4">
                                        {[
                                            { Icon: Github, link: SOCIAL_LINKS.github },
                                            { Icon: Linkedin, link: SOCIAL_LINKS.linkedin },
                                            { Icon: Twitter, link: SOCIAL_LINKS.twitter }
                                        ].map((social, i) => (
                                            <a
                                                key={i}
                                                href={social.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:border-primary transition-all"
                                            >
                                                <social.Icon className="w-5 h-5" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Right Side: Form */}
                    <FadeIn delay={0.4} direction="right">
                        <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl backdrop-blur-md relative overflow-hidden">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white transition-all placeholder:text-gray-600"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white transition-all placeholder:text-gray-600"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project..."
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white transition-all resize-none placeholder:text-gray-600"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full group relative flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-primary/20 overflow-hidden"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <span>Send Message</span>
                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>

                                {status.message && (
                                    <div className={`p-4 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300 ${
                                        status.type === 'success' 
                                        ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                    }`}>
                                        <p className="text-sm font-medium flex items-center gap-2">
                                            {status.type === 'success' ? '✓' : '⚠'} {status.message}
                                        </p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default Contact;