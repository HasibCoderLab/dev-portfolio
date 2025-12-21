import React, { useState } from 'react'
import { Mail, MapPin, Github, Linkedin, Twitter, Send, MessageSquare } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../../utils/constants";
import FadeIn from "../animations/FadeIn";
const Contact = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.value]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefaul()

        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ type: 'error', message: 'please fill in all fields' })
            return
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        setStatus({ type: 'error', message: 'Please enter a valid email' });
        return;
    }

    setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to to you soon..' });
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setStatus({ type: '', message: '' }), 5000);

    const socialIcons = {
        github: Github,
        linkedin: Linkedin,
        twitter: Twitter
    }


    return (
        <section id="contact" className="">
            <div className="" >

                <div className="" />
                <div className="" />
                <div className="" />
            </div>

            <div className="">
                <FadeIn delay={0}>
                    <div className="">
                        <div className="">
                            <Briefcase className="" />
                            <span className="">Get in touch</span>
                        </div>
                        <h2 className="">Let's work  together</h2>
                        <p className="">Have a project in mind ? Let's discuss how we can bring your ideas to life</p>
                    </div>
                </FadeIn>
                {/* 2nd FadeIn */}

                <div className="">
                    <FadeIn delay={100}>
                        <div className="">
                            <form onSubmit={handleSubmit} className=''> 
                        <div>
                            <lable htmlFor="name" className="" > 
                                Name 
                                </lable>
                                <input 
                                type="text"
                                id="name"
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                className=''
                                placeholder='Your Name'
                                />
                                </div>

                                {/* Email */}

                                 <div>
                            <lable htmlFor="name" className="" > 
                                Name 
                                </lable>
                                <input 
                                type="email"
                                id="name"
                                name='name'
                                value={formData.email}
                                onChange={handleChange}
                                className=''
                                placeholder='Your email'
                                />
                                </div>



                                {/* Message */}


                                 <div>
                            <lable htmlFor="name" className="" > 
                                Name 
                                </lable>
                                <input 
                                type="text"
                                id="name"
                                name='name'
                                value={formData.message}
                                onChange={handleChange}
                                className=''
                                placeholder='Your message'
                                />
                                </div>

                        </div>
                    </FadeIn>
               

                )
}

                export default Contact