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

const galleryItems = [
  {
    id: 1,
    title: "Commercial Photography",
    category: "Product Photography",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&h=300&fit=crop",
    description: "Professional product photography for luxury brands and retail campaigns"
  },
  {
    id: 2,
    title: "Portrait Sessions",
    category: "Portrait Photography",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
    description: "Executive and professional portrait photography with creative lighting"
  },
  {
    id: 3,
    title: "Brand Campaign Video",
    category: "Motion Content",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
    description: "Dynamic video content creation for social media and brand campaigns"
  },
  {
    id: 4,
    title: "Fashion Editorial",
    category: "Fashion Photography",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop",
    description: "High-fashion editorial shoots with creative styling and composition"
  },
  {
    id: 5,
    title: "Event Coverage",
    category: "Event Photography",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
    description: "Professional event photography and live broadcasting services"
  },
  {
    id: 6,
    title: "Lifestyle Photography",
    category: "Lifestyle Photography",
    image: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400&h=300&fit=crop",
    description: "Authentic lifestyle photography capturing real moments and emotions"
  },
  {
    id: 7,
    title: "Brand Documentary",
    category: "Documentary Film",
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop",
    description: "Documentary-style brand storytelling through film and photography"
  },
  {
    id: 8,
    title: "Creative Portraits",
    category: "Creative Photography",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop",
    description: "Artistic portrait photography with innovative lighting and concepts"
  }
];

const categories = ["All", "Product Photography", "Portrait Photography", "Motion Content", "Fashion Photography", "Event Photography", "Lifestyle Photography", "Documentary Film", "Creative Photography"];

export default function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);
  const cursorTrailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Hero section entrance animation
    const heroTl = gsap.timeline();
    
    heroTl
      .to('.hero-title .char', {
        duration: 0.8,
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "back.out(1.7)"
      })
      .to('.hero-subtitle', {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power3.out"
      }, "-=0.5")
      .to('.hero-description', {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power2.out"
      }, "-=0.7");

    // Floating elements with complex motion paths
    floatingElementsRef.current.forEach((element, index) => {
      if (element) {
        gsap.set(element, {
          xPercent: -50,
          yPercent: -50
        });

        // Create spiral motion path
        const spiral = `M0,0 Q${100 + index * 20},${-50 - index * 10} ${200 + index * 30},0 T${400 + index * 40},${50 + index * 15} T${600 + index * 50},0`;
        
        gsap.to(element, {
          duration: 20 + index * 5,
          repeat: -1,
          ease: "none",
          motionPath: {
            path: spiral,
            autoRotate: true,
            offsetX: index * 100,
            offsetY: index * 50
          }
        });

        // Pulsing and scaling animation
        gsap.to(element, {
          duration: 2 + index * 0.5,
          scale: 1.5,
          opacity: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    });

    // Filter buttons animation
    gsap.to('.filter-btn', {
      duration: 0.6,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 1
    });

    // Gallery items entrance with complex animations
    gsap.to('.gallery-item', {
      duration: 1,
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      stagger: {
        amount: 1.5,
        grid: "auto",
        from: "center"
      },
      ease: "back.out(1.7)",
      delay: 1.5
    });

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: '.gallery-grid',
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        gsap.to('.parallax-bg', {
          duration: 2,
          y: -100,
          ease: "power2.out"
        });
      }
    });

    // Individual gallery item scroll animations
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(item, {
            duration: 0.8,
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            ease: "power3.out"
          });
        }
      });

      // Hover animations for gallery items
      const itemElement = item as HTMLElement;
      itemElement.addEventListener('mouseenter', () => {
        gsap.to(item, {
          duration: 0.3,
          scale: 1.05,
          rotationY: 5,
          rotationX: 5,
          z: 50,
          ease: "power2.out"
        });
        
        gsap.to(item.querySelector('.item-overlay'), {
          duration: 0.3,
          opacity: 1,
          y: 0,
          ease: "power2.out"
        });
      });

      itemElement.addEventListener('mouseleave', () => {
        gsap.to(item, {
          duration: 0.3,
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          ease: "power2.out"
        });
        
        gsap.to(item.querySelector('.item-overlay'), {
          duration: 0.3,
          opacity: 0,
          y: 20,
          ease: "power2.out"
        });
      });
    });

    // Cursor trail effect
    let mouseX = 0, mouseY = 0;
    let trailElements: HTMLDivElement[] = [];
    
    // Create trail elements
    for (let i = 0; i < 10; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.position = 'fixed';
      trail.style.width = `${8 - i * 0.5}px`;
      trail.style.height = `${8 - i * 0.5}px`;
      trail.style.background = `hsl(${180 + i * 20}, 70%, 60%)`;
      trail.style.borderRadius = '50%';
      trail.style.pointerEvents = 'none';
      trail.style.zIndex = '9999';
      trail.style.opacity = (1 - i * 0.1).toString();
      document.body.appendChild(trail);
      trailElements.push(trail);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animate trail elements
    const animateTrail = () => {
      let x = mouseX, y = mouseY;
      
      trailElements.forEach((trail, index) => {
        gsap.to(trail, {
          duration: 0.3 + index * 0.02,
          x: x - 4,
          y: y - 4,
          ease: "power2.out"
        });
      });
      
      requestAnimationFrame(animateTrail);
    };
    animateTrail();

    // Text morphing animation for category labels
    const morphText = () => {
      gsap.to('.morph-text', {
        duration: 0.5,
        text: "Explore Our Work",
        ease: "power2.inOut",
        delay: 3
      });
    };
    morphText();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      trailElements.forEach(trail => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleFilterClick = (category: string) => {
    const items = document.querySelectorAll('.gallery-item');
    const state = Flip.getState(items);

    // Filter logic here
    items.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (category === 'All' || itemCategory === category) {
        (item as HTMLElement).style.display = 'block';
      } else {
        (item as HTMLElement).style.display = 'none';
      }
    });

    // Animate with Flip
    Flip.from(state, {
      duration: 0.7,
      ease: "power2.inOut",
      stagger: 0.05,
      absolute: true,
      onEnter: elements => gsap.fromTo(elements, 
        { opacity: 0, scale: 0 }, 
        { opacity: 1, scale: 1, duration: 0.5 }
      ),
      onLeave: elements => gsap.to(elements, 
        { opacity: 0, scale: 0, duration: 0.3 }
      )
    });
  };

  // Split text into characters for animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div ref={galleryRef} className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 text-white overflow-hidden">
      <Navigation />
      
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            ref={el => {
              if (el) floatingElementsRef.current[index] = el;
            }}
            className="motion-path-element"
            style={{
              width: `${20 + index * 5}px`,
              height: `${20 + index * 5}px`,
              left: `${10 + index * 12}%`,
              top: `${15 + index * 10}%`,
              background: `linear-gradient(45deg, hsl(${180 + index * 30}, 70%, 60%), hsl(${220 + index * 25}, 80%, 70%))`
            }}
          />
        ))}
      </div>

      {/* Parallax background */}
      <div className="parallax-bg fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 pt-32 pb-20 px-4 text-center">
        <h1 className="hero-title text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {splitText("Gallery")}
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
          <span className="morph-text">Visual Stories That Inspire</span>
        </p>
        <p className="hero-description text-lg opacity-80 max-w-2xl mx-auto">
          Immerse yourself in a collection of captivating photography, motion content, and brand storytelling 
          that showcases the power of visual communication
        </p>
      </section>

      {/* Filter Section */}
      <section ref={filterRef} className="relative z-10 px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={category}
                className="filter-btn aurora-btn px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
                onClick={() => handleFilterClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section ref={gridRef} className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className="gallery-item glass-card p-6 transform-gpu"
                data-category={item.category}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="item-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center opacity-0 translate-y-5">
                    <button className="aurora-cta-button mb-4">
                      View Project
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-blue-400 font-medium">{item.category}</span>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Animation Showcase */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Beyond Imagination
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { title: "Motion Paths", desc: "Complex trajectory animations" },
              { title: "3D Transforms", desc: "Immersive spatial experiences" },
              { title: "Scroll Triggers", desc: "Interactive storytelling" }
            ].map((feature, index) => (
              <div
                key={index}
                className="gsap-stagger-item service-card p-8 rounded-2xl"
              >
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
        <Footer />
    </div>
  );
}
