'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    // Logo entrance animation
    gsap.to(logoRef.current, {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "back.out(1.7)",
      delay: 0.2
    });

    // Navigation items entrance
    gsap.to('.nav-item', {
      duration: 0.8,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.5
    });

    // Mobile menu animations with better performance
    if (isOpen) {
      // Prevent scrolling on body when menu is open
      document.body.style.overflow = 'hidden';
      
      // Show overlay
      gsap.set(overlayRef.current, { display: 'block', pointerEvents: 'auto' });
      gsap.to(overlayRef.current, { 
        opacity: 1, 
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Show menu panel
      gsap.set(menuRef.current, { display: 'block' });
      gsap.to(menuRef.current, { 
        x: 0, 
        duration: 0.5, 
        ease: "power3.out"
      });
      
      // Show menu items with delay
      gsap.set('.mobile-nav-item', { opacity: 1, x: 0 });
      gsap.fromTo('.mobile-nav-item', 
        { opacity: 0, x: 30 },
        {
          duration: 0.4,
          x: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3
        }
      );
    } else {
      // Re-enable scrolling
      document.body.style.overflow = 'unset';
      
      // Hide overlay
      gsap.to(overlayRef.current, { 
        opacity: 0, 
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none', pointerEvents: 'none' });
        }
      });
      
      // Hide menu panel
      gsap.to(menuRef.current, { 
        x: '100%', 
        duration: 0.4, 
        ease: "power3.out",
        onComplete: () => {
          gsap.set(menuRef.current, { display: 'none' });
        }
      });
    }

    // Cleanup function to reset body overflow
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" ref={logoRef} className="text-2xl font-bold text-white group">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                KiQa
              </span>
              <span className="text-white group-hover:text-cyan-400 transition-colors duration-300">
                Productions
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item relative text-white hover:text-cyan-400 transition-all duration-300 font-medium ${
                    pathname === item.href ? 'text-cyan-400' : ''
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-cyan-400 transition-colors relative z-[60] p-2 -mr-2"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-1.5 bg-cyan-400' : ''
                }`}></span>
                <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-1.5 bg-cyan-400' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden cursor-pointer"
        style={{ display: 'none', opacity: 0, pointerEvents: 'auto' }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(false);
        }}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className="fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 z-50 md:hidden shadow-2xl"
        style={{ display: 'none', transform: 'translateX(100%)' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="pt-20 px-6 h-full flex flex-col">
          {/* Close button inside menu */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-colors p-2"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-center mb-8">
            <h3 id="mobile-menu-title" className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              KiQa Productions
            </h3>
            <p className="text-gray-400 text-sm mt-2">Media & Broadcasting</p>
          </div>
          
          <nav className="flex-1">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  setTimeout(() => setIsOpen(false), 100); // Small delay to allow navigation
                }}
                className={`mobile-nav-item block py-4 px-2 text-lg font-bold text-white hover:text-cyan-400 active:text-cyan-300 border-b border-white/10 relative group ${
                  pathname === item.href ? 'text-cyan-400' : ''
                }`}
                style={{ opacity: 1, transform: 'translateX(0)' }}
                role="menuitem"
              >
                {item.label}
                <span className="absolute left-2 top-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-8 transform -translate-y-1/2"></span>
                {pathname === item.href && (
                  <span className="absolute right-2 top-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-y-1/2"></span>
                )}
              </Link>
            ))}
          </nav>
          
          {/* Contact info in mobile menu */}
          <div className="mt-auto pb-8 pt-6 border-t border-white/10">
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-3 font-semibold">Get in touch</p>
              <a href="mailto:hello@kiqaproductions.com" className="block text-white text-sm mb-2 hover:text-cyan-400 transition-colors">
                hello@kiqaproductions.com
              </a>
              <p className="text-gray-400 text-sm">Mumbai & Dubai</p>
            </div>
            
            {/* Social Media Icons */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-gray-400 text-sm mb-4 font-semibold">Follow Us</p>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/kiqaproductions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://linkedin.com/company/kiqaproductions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300"
                  aria-label="Follow us on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://youtube.com/@kiqaproductions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://behance.net/kiqaproductions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300"
                  aria-label="View our work on Behance"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;