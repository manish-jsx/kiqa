'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Flip } from 'gsap/Flip';
import { TextPlugin } from 'gsap/TextPlugin';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Flip, TextPlugin);

const portfolioItems = [
  {
    id: 1,
    title: "Brand Photography Campaign",
    category: "Still Photography",
    description: "Professional brand photography featuring product shoots and lifestyle imagery for luxury fashion brand",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=400&fit=crop",
    technologies: ["Commercial Photography", "Product Styling", "Lighting Design", "Post-Production"]
  },
  {
    id: 2,
    title: "Motion Content Series",
    category: "Motion Content",
    description: "Dynamic video content creation for social media campaigns with cinematic storytelling",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop",
    technologies: ["Video Production", "Motion Graphics", "Color Grading", "Sound Design"]
  },
  {
    id: 3,
    title: "Corporate Brand Identity",
    category: "Brand Content",
    description: "Complete visual content strategy including photography, videography, and brand storytelling",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
    technologies: ["Brand Strategy", "Visual Identity", "Content Creation", "Campaign Development"]
  },
  {
    id: 4,
    title: "Event Broadcasting",
    category: "Broadcasting",
    description: "Live event coverage and broadcasting solutions for corporate conferences and brand activations",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop",
    technologies: ["Live Broadcasting", "Multi-Camera Setup", "Live Streaming", "Event Coverage"]
  },
  {
    id: 5,
    title: "Portrait Photography Collection",
    category: "Portrait Photography",
    description: "Professional portrait photography for executives, entrepreneurs, and creative professionals",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    technologies: ["Portrait Photography", "Studio Lighting", "Natural Light", "Retouching"]
  },
  {
    id: 6,
    title: "Fashion Editorial Shoot",
    category: "Fashion Photography",
    description: "High-fashion editorial photography with creative styling and dynamic compositions",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop",
    technologies: ["Fashion Photography", "Editorial Styling", "Creative Direction", "Magazine Layout"]
  }
];

export default function Portfolio() {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section entrance animations
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

    // Floating elements with spiral motion paths
    const floatingElements = document.querySelectorAll('.floating-portfolio-element');
    floatingElements.forEach((element, index) => {
      // Create spiral motion path
      const radius = 150 + index * 30;
      const centerX = 400;
      const centerY = 300;
      
      gsap.to(element, {
        duration: 20 + index * 5,
        repeat: -1,
        ease: "none",
        motionPath: {
          path: `M${centerX},${centerY} 
                 m${radius},0 
                 a${radius},${radius} 0 1,1 -${radius * 2},0 
                 a${radius},${radius} 0 1,1 ${radius * 2},0`,
          autoRotate: true
        }
      });

      // Scale pulsing
      gsap.to(element, {
        duration: 3 + index * 0.5,
        scale: 1.5,
        opacity: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Portfolio grid scroll animations
    ScrollTrigger.create({
      trigger: '.portfolio-grid',
      start: 'top 80%',
      end: 'bottom 20%',
      animation: gsap.timeline()
        .to('.portfolio-item', {
          duration: 1.2,
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          stagger: {
            amount: 1.5,
            grid: [3, 2],
            from: "random"
          },
          ease: "back.out(1.7)"
        })
    });

    // Individual portfolio item animations on hover
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          duration: 0.4,
          scale: 1.05,
          rotationY: 10,
          rotationX: 5,
          z: 50,
          ease: "power2.out"
        });
        
        gsap.to(item.querySelector('.portfolio-overlay'), {
          duration: 0.4,
          opacity: 1,
          y: 0,
          ease: "power2.out"
        });

        gsap.to(item.querySelector('.portfolio-image'), {
          duration: 0.4,
          scale: 1.1,
          ease: "power2.out"
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          duration: 0.4,
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          ease: "power2.out"
        });
        
        gsap.to(item.querySelector('.portfolio-overlay'), {
          duration: 0.4,
          opacity: 0,
          y: 20,
          ease: "power2.out"
        });

        gsap.to(item.querySelector('.portfolio-image'), {
          duration: 0.4,
          scale: 1,
          ease: "power2.out"
        });
      });
    });

    // Parallax background effects
    gsap.to('.parallax-portfolio-bg', {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: portfolioRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Split text into characters for animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div ref={portfolioRef} className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 text-white overflow-hidden">
      <Navigation />
      
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="floating-portfolio-element absolute rounded-full"
            style={{
              width: `${20 + index * 5}px`,
              height: `${20 + index * 5}px`,
              left: `${10 + index * 12}%`,
              top: `${15 + index * 10}%`,
              background: `linear-gradient(45deg, hsl(${240 + index * 30}, 70%, 60%), hsl(${280 + index * 25}, 80%, 70%))`
            }}
          />
        ))}
      </div>

      {/* Parallax background */}
      <div className="parallax-portfolio-bg fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-indigo-600/20"></div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 pt-32 pb-20 px-4 text-center">
        <h1 className="hero-title text-5xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
          {splitText("Portfolio")}
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
          Visual Storytelling Excellence
        </p>
        <p className="hero-description text-lg opacity-80 max-w-2xl mx-auto">
          Explore our collection of still photography, motion content, brand campaigns, and broadcasting projects that bring stories to life
        </p>
      </section>

      {/* Portfolio Grid */}
      <section ref={gridRef} className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className="portfolio-item glass-card rounded-2xl overflow-hidden transform-gpu"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="portfolio-image w-full h-64 object-cover"
                  />
                  <div className="portfolio-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 translate-y-5 flex items-end p-6">
                    <div className="text-center w-full">
                      <button className="aurora-cta-button mb-4">
                        View Project
                      </button>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {item.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <span className="text-sm text-purple-400 font-medium">{item.category}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Ready to Create Together?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Let&apos;s collaborate to bring your brand&apos;s story to life through compelling visual content and professional media production
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="aurora-cta-button text-lg px-12 py-4">
              Start Your Project
            </button>
            <button className="glass-card px-12 py-4 rounded-full text-lg font-semibold border border-white/20 hover:border-white/40 transition-all duration-300">
              View Process
            </button>
          </div>
        </div>
      </section>
        <Footer />
    </div>
  );
}
