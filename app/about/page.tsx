'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin);

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section complex entrance animation
    const heroTl = gsap.timeline();
    
    heroTl
      .to('.hero-title .word', {
        duration: 1.2,
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "back.out(2)",
        transformOrigin: "bottom center"
      })
      .to('.hero-subtitle', {
        duration: 1,
        scale: 1,
        opacity: 1,
        rotation: 0,
        ease: "back.out(1.7)"
      }, "-=0.5")
      .to('.hero-cta', {
        duration: 0.8,
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.3");

    // Floating elements with physics-based motion
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
      // Create complex motion path
      const path = `M0,0 Q${100 + index * 50},${-100 - index * 20} ${200 + index * 80},${-50 + index * 30} T${400 + index * 100},${index * 40} Q${600 + index * 120},${100 + index * 50} ${800 + index * 140},0`;
      
      gsap.to(element, {
        duration: 25 + index * 8,
        repeat: -1,
        ease: "none",
        motionPath: {
          path: path,
          autoRotate: 45,
          offsetX: index * 150,
          offsetY: index * 80
        }
      });

      // Morphing scale and opacity
      gsap.to(element, {
        duration: 3 + index,
        scale: 1.8,
        opacity: 0.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Story section scroll-triggered animations
    ScrollTrigger.create({
      trigger: '.story-section',
      start: 'top 80%',
      end: 'bottom 20%',
      animation: gsap.timeline()
        .to('.story-text .line', {
          duration: 1,
          y: 0,
          opacity: 1,
          stagger: 0.2,
          ease: "power3.out"
        })
        .to('.story-image', {
          duration: 1.5,
          scale: 1,
          rotation: 0,
          opacity: 1,
          ease: "back.out(1.7)"
        }, "-=0.8")
        .to('.story-background', {
          duration: 2,
          backgroundPosition: "100% 0%",
          ease: "power2.inOut"
        }, 0)
    });

    // Team section with complex stagger animations
    ScrollTrigger.create({
      trigger: '.team-section',
      start: 'top 70%',
      animation: gsap.timeline()
        .to('.team-member', {
          duration: 1,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          stagger: {
            amount: 1.5,
            grid: "auto",
            from: "random"
          },
          ease: "back.out(1.7)"
        })
        .to('.team-title', {
          duration: 1.2,
          text: "Meet Our Creative Force",
          ease: "power2.inOut"
        }, "-=1")
    });

    // Values section with morphing animations
    ScrollTrigger.create({
      trigger: '.values-section',
      start: 'top 75%',
      animation: gsap.timeline()
        .to('.value-card', {
          duration: 1,
          opacity: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          stagger: 0.3,
          ease: "power3.out"
        })
        .to('.value-icon', {
          duration: 0.8,
          scale: 1,
          rotation: 0,
          stagger: 0.2,
          ease: "back.out(2)"
        }, "-=0.5")
    });

    // Parallax effects for background elements
    gsap.to('.parallax-bg-1', {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to('.parallax-bg-2', {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top bottom", 
        end: "bottom top",
        scrub: true
      }
    });

    // Interactive hover animations for team members
    document.querySelectorAll('.team-member').forEach(member => {
      member.addEventListener('mouseenter', () => {
        gsap.to(member, {
          duration: 0.4,
          scale: 1.1,
          rotationY: 10,
          z: 100,
          ease: "power2.out"
        });
        
        gsap.to(member.querySelector('.member-overlay'), {
          duration: 0.4,
          opacity: 1,
          y: 0,
          ease: "power2.out"
        });
      });

      member.addEventListener('mouseleave', () => {
        gsap.to(member, {
          duration: 0.4,
          scale: 1,
          rotationY: 0,
          z: 0,
          ease: "power2.out"
        });
        
        gsap.to(member.querySelector('.member-overlay'), {
          duration: 0.4,
          opacity: 0,
          y: 20,
          ease: "power2.out"
        });
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Helper function to split text into words for animation
  const splitWords = (text: string) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="word inline-block mr-3">
        {word}
      </span>
    ));
  };

  const teamMembers = [
    {
      name: "RITIQA PARAB",
      role: "Creative Director & Photographer",
      image: "/api/placeholder/300/300",
      bio: "Visionary photographer and creative director leading KiQa Productions with expertise in multidisciplinary content creation"
    },
    {
      name: "Mumbai Team", 
      role: "Production Specialists",
      image: "/api/placeholder/300/300",
      bio: "Skilled production team handling still photography, motion content, and brand activations in Mumbai"
    },
    {
      name: "Dubai Team",
      role: "Broadcasting & Media",
      image: "/api/placeholder/300/300", 
      bio: "Professional broadcasting and media production specialists creating content for the Middle Eastern market"
    },
    {
      name: "Content Creators",
      role: "Visual Storytellers",
      image: "/api/placeholder/300/300",
      bio: "Creative collective producing compelling visual narratives for brands across various platforms"
    }
  ];

  const values = [
    {
      icon: "�",
      title: "Authenticity",
      description: "Creating genuine visual stories that reflect the true essence of brands and their values"
    },
    {
      icon: "✨",
      title: "Excellence", 
      description: "Delivering exceptional quality in every frame, every edit, and every creative decision"
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "Working closely with brands to understand their vision and bring it to life authentically"
    },
    {
      icon: "�",
      title: "Creativity",
      description: "Pushing creative boundaries to produce compelling content that stands out in today&apos;s competitive landscape"
    }
  ];

  return (
    <div ref={aboutRef} className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <Navigation />
      
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="floating-element absolute rounded-full"
            style={{
              width: `${30 + index * 10}px`,
              height: `${30 + index * 10}px`,
              left: `${5 + index * 15}%`,
              top: `${10 + index * 12}%`,
              background: `linear-gradient(45deg, hsl(${200 + index * 40}, 70%, 60%), hsl(${250 + index * 30}, 80%, 70%))`
            }}
          />
        ))}
      </div>

      {/* Parallax backgrounds */}
      <div className="parallax-bg-1 fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20"></div>
      </div>
      <div className="parallax-bg-2 fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-l from-pink-500/20 via-violet-500/20 to-indigo-500/20"></div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 pt-32 pb-24 px-4 text-center">
        <h1 className="hero-title text-5xl md:text-8xl font-bold mb-8 text-white bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          {splitWords("About KiQa Productions")}
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
          We are visual storytellers, transforming brand narratives into compelling still and motion content that captivates and inspires
        </p>
        <button className="hero-cta aurora-cta-button">
          Discover Our Journey
        </button>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="story-section relative z-10 py-24 px-4">
        <div className="story-background absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" 
             style={{ backgroundSize: '200% 100%', backgroundPosition: '0% 0%' }}></div>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="story-text space-y-8">
              <div className="line">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                  Our Story
                </h2>
              </div>
              <div className="line">
                <p className="text-lg opacity-90 leading-relaxed">
                  Founded by creative director and photographer RITIQA PARAB, KiQa Productions emerged from a passion for 
                  storytelling through visual media and a commitment to helping brands create authentic connections.
                </p>
              </div>
              <div className="line">
                <p className="text-lg opacity-90 leading-relaxed">
                  Our journey began with a vision to bridge the gap between artistic expression and commercial storytelling. 
                  Today, we specialize in multidisciplinary creative projects, producing compelling still and motion content 
                  that resonates with audiences across the globe.
                </p>
              </div>
              <div className="line">
                <p className="text-lg opacity-90 leading-relaxed">
                  From our bases in Mumbai and Dubai, we&apos;ve helped brands tell their stories through captivating 
                  visual content that not only showcases their products but also embodies their values and vision.
                </p>
              </div>
            </div>
            <div className="story-image">
              <div className="glass-card p-8 rounded-3xl">
                <div className="w-full h-80 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                  <div className="text-6xl">🌟</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="team-section relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="team-title text-4xl md:text-6xl font-bold text-center mb-16 text-white bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">
            Meet Our Creative Force
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="team-member glass-card p-6 rounded-2xl transform-gpu"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="member-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center opacity-0 translate-y-5">
                    <p className="text-sm text-center p-4">{member.bio}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-purple-400 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="values-section relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card glass-card p-8 rounded-2xl text-center"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              >
                <div className="value-icon text-5xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            Ready to Create Magic?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Let&apos;s collaborate to bring your vision to life with compelling visual content and authentic storytelling
          </p>
          <button className="aurora-cta-button text-lg px-12 py-4">
            Start Your Journey
          </button>
        </div>
      </section>
        <Footer />
    </div>
  );
}
