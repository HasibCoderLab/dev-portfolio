import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Send,
  MessageSquare,
} from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../../utils/constants";
import   from "../animations/ ";

const Contact = () => {
  // ✅ LOGIC FROM 1st CODE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all fields" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email" });
      return;
    }

    setStatus({
      type: "success",
      message: "Message sent successfully! I'll get back to you soon..",
    });

    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setStatus({ type: "", message: "" }), 5000);
  };

  // ✅ ICON MAP (safe)
  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#030712]">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <  delay={0}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-semibold mb-6 backdrop-blur-sm">
              <MessageSquare className="w-4 h-4" />
              <span className="tracking-wider uppercase">Get in touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-linear-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              Let's work together
            </h2>
            <p className="text-gray-400 text-lg">
              Have a project in mind? Let's discuss how we can bring your ideas to
              life.
            </p>
          </div>
        </ >

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* LEFT SIDE */}
          <  delay={0.2} direction="left">
            <div className="bg-white/3 border border-white/10 p-8 rounded-3xl backdrop-blur-md space-y-8">
              <h3 className="text-2xl font-bold text-white">
                Contact Information
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">
                    Email
                  </p>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-white font-medium break-all hover:text-primary"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">
                    Location
                  </p>
                  <p className="text-white font-medium">
                    {PERSONAL_INFO.location || "Dhaka, Bangladesh"}
                  </p>
                </div>
              </div>

              {/* SOCIAL */}
              <div className="pt-6 border-t border-white/5">
                <p className="text-white font-semibold mb-4">
                  Connect with me
                </p>
                <div className="flex gap-4">
                  {Object.entries(SOCIAL_LINKS).slice(0, 3).map(([key, url]) => {
                    const Icon = socialIcons[key];
                    return (
                      Icon && (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:border-primary transition-all"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          </ >

          {/* RIGHT SIDE FORM */}
          <  delay={0.4} direction="right">
            <form
              onSubmit={handleSubmit}
              className="bg-white/3 border border-white/10 p-8 rounded-3xl backdrop-blur-md space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-600 focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can I help you?"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-600 resize-none focus:ring-2 focus:ring-primary/50"
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20"
              >
                Send Message
                <Send className="w-5 h-5" />
              </button>

              {status.message && (
                <div
                  className={`p-4 rounded-2xl ${
                    status.type === "success"
                      ? "bg-green-500/10 border border-green-500/20 text-green-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}
                >
                  {status.message}
                </div>
              )}
            </form>
          </ >
        </div>
      </div>
    </section>
  );
};

export default Contact;
