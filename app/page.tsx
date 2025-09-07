'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin);
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Create floating elements for motion paths
    const createFloatingElements = () => {
      const container = floatingElementsRef.current;
      if (!container) return;
      
      for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
          position: absolute;
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #0ae448, #abff84);
          border-radius: 50%;
          opacity: 0.6;
          z-index: 1;
        `;
        container.appendChild(element);
      }
    };
    
    createFloatingElements();

    // Hero section advanced animations
    const heroTl = gsap.timeline();
    
    // Animated background particles
    gsap.to('.floating-element', {
      duration: 'random(15, 25)',
      motionPath: {
        path: "M0,0 Q50,100 100,0 T200,0",
        autoRotate: true,
      },
      repeat: -1,
      ease: "none",
      stagger: {
        each: 2,
        from: "random"
      }
    });

    // Main hero animation with morphing text
    heroTl
      .to('.hero-title', { 
        opacity: 1, 
        y: 0,
        scale: 1, 
        rotationX: 0, 
        duration: 1.5, 
        ease: "elastic.out(1, 0.5)",
        transformOrigin: "center center"
      })
      .to('.hero-title', {
        text: {
          value: "KiQa Productions",
          delimiter: ""
        },
        duration: 2,
        ease: "none"
      }, "-=1")
      .to('.hero-subtitle', { 
        opacity: 1, 
        y: 0, 
        skewY: 0, 
        duration: 1.2, 
        ease: "back.out(2)" 
      }, "-=0.8")
      .to('.hero-cta', { 
        opacity: 1, 
        y: 0,
        scale: 1, 
        rotation: 0, 
        duration: 1, 
        ease: "bounce.out" 
      }, "-=0.5");

    // Parallax scrolling for hero background
    gsap.to('.hero-bg', {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // About section animations with morphing shapes
    const aboutCards = gsap.utils.toArray('.about-item');
    aboutCards.forEach((card: any, index) => {
      gsap.to(card, 
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Hover animations
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotation: 2,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Services section with motion paths and trajectory animations
    const serviceCards = gsap.utils.toArray('.service-card');
    
    // Create trajectory paths for service cards
    serviceCards.forEach((card: any, index) => {
      const delay = index * 0.2;
      
      gsap.to(card, 
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: delay,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 40%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating animation for service cards
      gsap.to(card, {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.5
      });
    });

    // CTA section with advanced morphing
    gsap.to('.cta-content', 
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Progressive text reveal for headings
    const headings = gsap.utils.toArray('h2, h3');
    headings.forEach((heading: any) => {
      const text = heading.textContent;
      heading.innerHTML = text.split('').map((char: string) => 
        `<span style="display: inline-block; opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');

      gsap.to(heading.children, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Cursor trail effect
    const createCursorTrail = () => {
      const trail = [];
      for (let i = 0; i < 10; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: linear-gradient(45deg, #0ae448, #abff84);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0;
          transform: scale(0);
        `;
        document.body.appendChild(dot);
        trail.push(dot);
      }

      let mouseX = 0, mouseY = 0;
      
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      trail.forEach((dot, index) => {
        gsap.to(dot, {
          x: mouseX,
          y: mouseY,
          duration: 0.3 + index * 0.1,
          ease: "power2.out"
        });
      });
    };

    createCursorTrail();
  }, []);

  return (
    <>
      <Navigation />
      <div ref={floatingElementsRef} className="fixed inset-0 pointer-events-none z-10"></div>
      
      <main className="pt-16 overflow-hidden">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="hero-bg absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82b7cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHw0OXx8ZmlsbSUyMHBhY2t8ZW58MHx8fHwxNzA4MTk5MDc3fDA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center opacity-30"></div>
          
          <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
            <h1 className="hero-title text-6xl md:text-8xl font-bold text-white mb-6 font-['Playfair_Display']">
              KiQa Productions
            </h1>
            <p className="hero-subtitle text-xl md:text-3xl text-gray-200 mb-12 max-w-3xl mx-auto font-light">
              Broadcasting & Media Production. Still & Motion Content 📸🎥🤳
            </p>
            <div className="hero-cta">
              <Link href="/contact" className="inline-block bg-gradient-to-r from-pink-500 to-orange-500 text-white px-12 py-6 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                Start Your Project
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="relative py-24 bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-8 font-['Playfair_Display']">
                Who We Are
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                KiQa Productions is a multidisciplinary creative collective specializing in broadcasting and media production. 
                We help brands produce compelling visual content, from stunning still photography to dynamic motion content. 
                Based in Mumbai and Dubai, we bring global perspectives to every project.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="about-item bg-gray-800/50 backdrop-blur-sm p-10 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-orange-400 mb-6 text-center font-['Playfair_Display']">Creativity</h3>
                <p className="text-gray-200 text-center leading-relaxed">
                  We believe in original storytelling and innovative visual content that captures attention and drives engagement for brands worldwide.
                </p>
              </div>
              
              <div className="about-item bg-gray-800/50 backdrop-blur-sm p-10 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-orange-400 mb-6 text-center font-['Playfair_Display']">Precision</h3>
                <p className="text-gray-200 text-center leading-relaxed">
                  Every frame matters. Our commitment to excellence ensures flawless execution from pre-production to final delivery.
                </p>
              </div>
              
              <div className="about-item bg-gray-800/50 backdrop-blur-sm p-10 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-orange-400 mb-6 text-center font-['Playfair_Display']">Innovation</h3>
                <p className="text-gray-200 text-center leading-relaxed">
                  Staying ahead with cutting-edge technology and fresh perspectives to deliver content that stands out in today&apos;s competitive market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="relative py-24 bg-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/20 via-transparent to-orange-900/20"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold text-white bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-8 font-['Playfair_Display']">
                Our Services
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="service-card group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-green-500/50 transition-all duration-500">
                <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1542204165-65bf26c2f470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHw3OXx8dmlkZW8lMjBwcm9kdWN0aW9ufGVufDB8fHx8MTcwODE5OTM4OXww&ixlib=rb-4.0.3&q=80&w=1080"
                    alt="Film & Video Production"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 font-['Playfair_Display']">
                    Still Photography
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    Professional photography services for brands, products, portraits, and events with expert composition and lighting.
                  </p>
                </div>
              </div>
              
              <div className="service-card group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-green-500/50 transition-all duration-500">
                <div className="aspect-video bg-gradient-to-br from-green-600 to-blue-600 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1517677208171-cd705204cd1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHw3MXx8ZmlsbSUyMGVkaXRpbmd8ZW58MHx8fHwxNzA4MTk5MjI4fDA&ixlib=rb-4.0.3&q=80&w=1080"
                    alt="Post-Production & Editing"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 font-['Playfair_Display']">
                    Motion Content
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    Dynamic video content, commercials, and motion graphics that tell compelling brand stories and engage audiences.
                  </p>
                </div>
              </div>
              
              <div className="service-card group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-green-500/50 transition-all duration-500">
                <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522204523234-87295a7845ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxNXx8Z3JhcGhpYyUyMGRlc2lnbnxlbnwwfHx8fDE3MDgyMDA3NzR8MA&ixlib=rb-4.0.3&q=80&w=1080"
                    alt="Motion Graphics & VFX"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 font-['Playfair_Display']">
                    Brand Content Creation
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    Comprehensive content creation for brands including social media content, campaigns, and visual storytelling.
                  </p>
                </div>
              </div>
              
              <div className="service-card group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-green-500/50 transition-all duration-500">
                <div className="aspect-video bg-gradient-to-br from-orange-600 to-red-600 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1534723485458-9635bf7c82c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHw1Nnx8YW5pbWF0aW9uJTIwc3R1ZGlvfGVufDB8fHx8MTcwODIwMTQwN3ww&ixlib=rb-4.0.3&q=80&w=1080"
                    alt="Animation Studio"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 font-['Playfair_Display']">
                    Broadcasting Solutions
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    Complete broadcasting and media production solutions for events, shows, and brand activations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="relative py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
            <div className="cta-content">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 font-['Playfair_Display']">
                Ready to Create Something Amazing?
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light">
                Let&apos;s collaborate to create stunning visual content that elevates your brand and captures your audience&apos;s attention
              </p>
              <Link href="/contact" className="inline-block bg-gradient-to-r from-pink-500 to-orange-500 text-white px-12 py-6 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                Start Your Journey
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}