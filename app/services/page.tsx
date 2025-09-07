'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { Flip } from 'gsap/Flip';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin, Flip);

const services = [
  {
    id: 1,
    title: "Still Photography",
    subtitle: "Capturing Perfect Moments",
    description: "Professional photography services for brands, products, portraits, and events with expert composition and lighting",
    features: ["Product Photography", "Portrait & Fashion", "Event Coverage", "Commercial Shoots"],
    icon: "�",
    color: "from-blue-500 to-cyan-500",
    delay: 0
  },
  {
    id: 2,
    title: "Motion Content",
    subtitle: "Dynamic Visual Storytelling",
    description: "Engaging video content, commercials, and motion graphics that tell compelling brand stories and drive engagement",
    features: ["Brand Videos", "Commercials", "Motion Graphics", "Social Media Content"],
    icon: "�",
    color: "from-purple-500 to-pink-500",
    delay: 0.2
  },
  {
    id: 3,
    title: "Brand Content Creation",
    subtitle: "Multi-Platform Content",
    description: "Comprehensive content creation strategy for brands across multiple platforms and mediums",
    features: ["Content Strategy", "Social Media Content", "Campaign Visuals", "Brand Storytelling"],
    icon: "🎨",
    color: "from-emerald-500 to-teal-500",
    delay: 0.4
  },
  {
    id: 4,
    title: "Broadcasting Solutions",
    subtitle: "Professional Media Production",
    description: "Complete broadcasting and media production solutions for events, shows, and brand activations",
    features: ["Live Broadcasting", "Event Coverage", "Studio Production", "Media Distribution"],
    icon: "�",
    color: "from-orange-500 to-red-500",
    delay: 0.6
  },
  {
    id: 5,
    title: "E-commerce Solutions",
    subtitle: "Digital Commerce Excellence",
    description: "Complete e-commerce platforms with advanced features and conversion optimization",
    features: ["Custom Platforms", "Payment Integration", "Inventory Management", "Analytics"],
    icon: "🛒",
    color: "from-violet-500 to-purple-500",
    delay: 0.8
  },
  {
    id: 6,
    title: "Consulting",
    subtitle: "Strategic Digital Guidance",
    description: "Expert consultation on digital transformation and technology implementation",
    features: ["Digital Strategy", "Tech Stack Planning", "Performance Audits", "Team Training"],
    icon: "📊",
    color: "from-cyan-500 to-blue-500",
    delay: 1.0
  }
];

export default function Services() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section entrance animation
    const heroTl = gsap.timeline();
    
    heroTl
      .to('.hero-title .char', {
        duration: 1,
        y: 0,
        opacity: 1,
        stagger: 0.03,
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

    // Floating elements with complex trajectories
    const floatingElements = document.querySelectorAll('.floating-service-element');
    floatingElements.forEach((element, index) => {
      // Create organic motion paths
      const pathPoints = [
        `M0,0`,
        `Q${50 + index * 30},${-80 - index * 10}`,
        `${120 + index * 40},${-40 + index * 20}`,
        `T${250 + index * 60},${20 + index * 15}`,
        `Q${350 + index * 80},${80 + index * 25}`,
        `${450 + index * 100},${40 - index * 10}`,
        `T${600 + index * 120},0`
      ].join(' ');
      
      gsap.to(element, {
        duration: 30 + index * 10,
        repeat: -1,
        ease: "none",
        motionPath: {
          path: pathPoints,
          autoRotate: true,
          offsetX: index * 100,
          offsetY: index * 60
        }
      });

      // Pulsing and morphing
      gsap.to(element, {
        duration: 4 + index * 0.5,
        scale: 2,
        opacity: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Services grid scroll animations
    ScrollTrigger.create({
      trigger: '.services-grid',
      start: 'top 70%',
      end: 'bottom 30%',
      animation: gsap.timeline()
        .to('.service-card', {
          duration: 1.2,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          stagger: {
            amount: 2,
            grid: [3, 2],
            from: "random"
          },
          ease: "back.out(1.7)"
        })
        .to('.service-icon', {
          duration: 0.8,
          scale: 1,
          rotation: 0,
          stagger: 0.1,
          ease: "back.out(2)"
        }, "-=1")
    });

    // Process section animations
    ScrollTrigger.create({
      trigger: '.process-section',
      start: 'top 80%',
      animation: gsap.timeline()
        .to('.process-step', {
          duration: 1,
          x: 0,
          opacity: 1,
          stagger: 0.3,
          ease: "power3.out"
        })
        .to('.process-connector', {
          duration: 0.8,
          scaleX: 1,
          stagger: 0.2,
          ease: "power2.out"
        }, "-=0.5")
    });

    // CTA section animations
    ScrollTrigger.create({
      trigger: ctaRef.current,
      start: 'top 80%',
      animation: gsap.timeline()
        .to(ctaRef.current, {
          duration: 1,
          y: 0,
          opacity: 1,
          ease: "power3.out"
        })
    });

    // Interactive hover effects for service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          duration: 0.4,
          scale: 1.05,
          rotationY: 10,
          rotationX: 5,
          z: 100,
          ease: "power2.out"
        });
        
        gsap.to(card.querySelector('.service-overlay'), {
          duration: 0.4,
          opacity: 1,
          y: 0,
          ease: "power2.out"
        });

        gsap.to(card.querySelector('.service-icon'), {
          duration: 0.3,
          rotation: 360,
          scale: 1.2,
          ease: "back.out(1.7)"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          duration: 0.4,
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          ease: "power2.out"
        });
        
        gsap.to(card.querySelector('.service-overlay'), {
          duration: 0.4,
          opacity: 0,
          y: 20,
          ease: "power2.out"
        });

        gsap.to(card.querySelector('.service-icon'), {
          duration: 0.3,
          rotation: 0,
          scale: 1,
          ease: "power2.out"
        });
      });
    });

    // Parallax backgrounds
    gsap.to('.parallax-services-bg', {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Text morphing effects
    const morphText = () => {
      gsap.to('.morph-services-text', {
        duration: 0.8,
        text: "Transform Your Vision",
        ease: "power2.inOut",
        delay: 3
      });
    };
    morphText();

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

  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "Understanding your vision, goals, and requirements through comprehensive research"
    },
    {
      number: "02", 
      title: "Strategy",
      description: "Developing a strategic roadmap with clear milestones and deliverables"
    },
    {
      number: "03",
      title: "Design",
      description: "Creating stunning visuals and user experiences that captivate your audience"
    },
    {
      number: "04",
      title: "Development",
      description: "Building robust, scalable solutions with cutting-edge technology"
    },
    {
      number: "05",
      title: "Launch",
      description: "Deploying your project with comprehensive testing and optimization"
    },
    {
      number: "06",
      title: "Growth", 
      description: "Ongoing support and enhancements to ensure continued success"
    }
  ];

  return (
    <div ref={servicesRef} className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <Navigation />
      
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="floating-service-element absolute rounded-full"
            style={{
              width: `${15 + index * 8}px`,
              height: `${15 + index * 8}px`,
              left: `${2 + index * 10}%`,
              top: `${5 + index * 9}%`,
              background: `linear-gradient(45deg, hsl(${180 + index * 25}, 70%, 60%), hsl(${220 + index * 20}, 80%, 70%))`
            }}
          />
        ))}
      </div>

      {/* Parallax background */}
      <div className="parallax-services-bg fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20"></div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 pt-32 pb-20 px-4 text-center">
        <h1 className="hero-title text-5xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {splitText("Our Services")}
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
          <span className="morph-services-text">Broadcasting & Media Production</span>
        </p>
        <p className="hero-description text-lg opacity-80 max-w-2xl mx-auto">
          From still photography to dynamic motion content, we help brands create compelling visual stories that capture attention and drive engagement
        </p>
      </section>

      {/* Services Grid */}
      <section ref={gridRef} className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="service-card glass-card p-8 rounded-2xl transform-gpu relative overflow-hidden"
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 rounded-2xl`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="service-icon text-4xl mb-6 inline-block">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 font-medium">{service.subtitle}</p>
                  <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                  
                  {/* Features list */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <span className="text-green-400 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="aurora-btn w-full">
                    Learn More
                  </button>
                </div>

                {/* Hover overlay */}
                <div className="service-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 translate-y-5 flex items-end justify-center p-8 rounded-2xl">
                  <button className="aurora-cta-button">
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="process-section relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Our Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step relative">
                <div className="glass-card p-8 rounded-2xl h-full">
                  <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
                
                {/* Connector line */}
                {index < processSteps.length - 1 && (
                  <div className="process-connector absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform -translate-y-1/2 hidden lg:block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={ctaRef} className="cta-section relative z-10 py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Let&apos;s discuss how we can bring your brand&apos;s story to life with compelling visual content and professional production
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="aurora-cta-button text-lg px-12 py-4">
              Start Your Project
            </button>
            <button className="glass-card px-12 py-4 rounded-full text-lg font-semibold border border-white/20 hover:border-white/40 transition-all duration-300">
              View Portfolio
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
