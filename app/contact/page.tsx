'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Contact() {
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  });

  useEffect(() => {
    // Split text animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const text = heroTitle.textContent || '';
      heroTitle.innerHTML = text.split('').map(char => 
        `<span class="char inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
    }

    // Hero section entrance animation
    const heroTl = gsap.timeline();
    
    heroTl
      .to('.hero-title .char', {
        duration: 1,
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "back.out(1.7)"
      })
      .to('.hero-subtitle', {
        duration: 1.2,
        scale: 1,
        opacity: 1,
        rotation: 0,
        ease: "back.out(1.7)"
      }, "-=0.5")
      .to('.hero-description', {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power3.out"
      }, "-=0.7");

    // Form and contact info animations
    ScrollTrigger.create({
      trigger: '.contact-content',
      start: 'top 80%',
      animation: gsap.timeline()
        .to('.contact-form', {
          duration: 1.2,
          x: 0,
          opacity: 1,
          ease: "power3.out"
        })
        .to('.contact-info', {
          duration: 1.2,
          x: 0,
          opacity: 1,
          ease: "power3.out"
        }, "-=0.8")
        .to('.form-field', {
          duration: 0.8,
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.5")
    });

    // Floating elements
    const floatingElements = document.querySelectorAll('.floating-contact-element');
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        duration: 15 + index * 5,
        repeat: -1,
        ease: "none",
        motionPath: {
          path: `M0,0 Q${100 + index * 50},${-50 - index * 20} ${200 + index * 80},0 T${400 + index * 100},${50 + index * 30}`,
          autoRotate: true
        }
      });

      gsap.to(element, {
        duration: 3 + index * 0.5,
        scale: 1.5,
        opacity: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Input focus animations
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, {
          duration: 0.3,
          scale: 1.02,
          borderColor: '#06b6d4',
          ease: "power2.out"
        });
      });

      input.addEventListener('blur', () => {
        gsap.to(input, {
          duration: 0.3,
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          ease: "power2.out"
        });
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add submission animation
    gsap.to('.submit-button', {
      duration: 0.2,
      scale: 0.95,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
    
    console.log('Form submitted:', formData);
    // You would typically send this data to your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 text-white overflow-hidden">
      <Navigation />
      
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="floating-contact-element absolute rounded-full"
            style={{
              width: `${20 + index * 6}px`,
              height: `${20 + index * 6}px`,
              left: `${5 + index * 12}%`,
              top: `${10 + index * 10}%`,
              background: `linear-gradient(45deg, hsl(${200 + index * 30}, 70%, 60%), hsl(${240 + index * 25}, 80%, 70%))`
            }}
          />
        ))}
      </div>

      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <section ref={heroRef} className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Let&apos;s Create Together
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl mb-6 text-gray-300">
              Ready to create compelling visual content with KiQa Productions?
            </p>
            <p className="hero-description text-lg opacity-80 max-w-2xl mx-auto text-gray-400">
              Get in touch with our team to discuss your next project and discover how we can help your brand tell its story through captivating still and motion content.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section ref={formRef} className="contact-content py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="contact-form">
                <div className="glass-card p-8 rounded-3xl">
                  <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Start Your Project
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="form-field">
                      <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-300">Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="projectType" className="block text-sm font-medium mb-2 text-gray-300">Project Type *</label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-all duration-300"
                        >
                          <option value="">Select project type</option>
                          <option value="web-development">Web Development</option>
                          <option value="motion-design">Motion Design</option>
                          <option value="brand-identity">Brand Identity</option>
                          <option value="ux-ui-design">UX/UI Design</option>
                          <option value="consulting">Consulting</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium mb-2 text-gray-300">Budget Range</label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-all duration-300"
                        >
                          <option value="">Select budget range</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="50k-100k">$50,000 - $100,000</option>
                          <option value="over-100k">Over $100,000</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-field">
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Project Details *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 resize-none"
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="submit-button aurora-cta-button w-full text-lg py-4 form-field"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="contact-info space-y-8">
                <div className="glass-card p-8 rounded-3xl">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Studio Locations</h4>
                        <p className="text-gray-300">Mumbai, India<br />Dubai, UAE</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Instagram</h4>
                        <p className="text-gray-300">@kiqa_productions</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Email</h4>
                        <p className="text-gray-300">hello@kiqaproductions.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-3xl">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    Office Hours
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monday - Friday</span>
                      <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Saturday</span>
                      <span className="text-white font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Sunday</span>
                      <span className="text-gray-400">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-3xl">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Why Choose KiQa Productions?
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                      <span className="text-gray-300">Expert still photography and motion content creation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                      <span className="text-gray-300">Multidisciplinary creative projects for brands</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
                      <span className="text-gray-300">Global perspective with Mumbai & Dubai presence</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                      <span className="text-gray-300">Broadcasting & media production expertise</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
