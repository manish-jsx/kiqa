'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Footer entrance animation on scroll
    ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top 90%',
      animation: gsap.timeline()
        .to('.footer-section', {
          duration: 1,
          y: 0,
          opacity: 1,
          stagger: 0.2,
          ease: "power3.out"
        })
        .to('.footer-social-icon', {
          duration: 0.6,
          scale: 1,
          rotation: 0,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.5")
    });

    // Floating animation for social icons
    document.querySelectorAll('.footer-social-icon').forEach((icon, index) => {
      gsap.to(icon, {
        duration: 2 + index * 0.5,
        y: -5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      });
    });
  }, []);

  return (
    <footer ref={footerRef} className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 border-t border-white/10 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="footer-section col-span-1 md:col-span-2">
            <Link href="/" className="text-3xl font-bold text-white mb-6 block group">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                KiQa
              </span>
              <span className="text-white group-hover:text-cyan-400 transition-colors duration-300">
                Productions
              </span>
            </Link>
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
              Broadcasting & media production company helping brands produce multidisciplinary creative projects. 
              We specialize in still and motion content that captivates and inspires audiences worldwide.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="footer-social-icon text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-icon text-gray-400 hover:text-purple-400 transition-all duration-300 transform hover:scale-110">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-icon text-gray-400 hover:text-pink-400 transition-all duration-300 transform hover:scale-110">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-icon text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-icon text-gray-400 hover:text-red-400 transition-all duration-300 transform hover:scale-110">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="text-white font-bold mb-6 text-lg bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group">
                <span className="w-0 h-0.5 bg-cyan-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                Still Photography
              </Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group">
                <span className="w-0 h-0.5 bg-cyan-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                Motion Content
              </Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group">
                <span className="w-0 h-0.5 bg-cyan-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                Brand Content
              </Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group">
                <span className="w-0 h-0.5 bg-cyan-400 group-hover:w-4 transition-all duration-300 mr-2"></span>
                Broadcasting
              </Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="text-white font-bold mb-6 text-lg bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Contact</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Mumbai & Dubai
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                @kiqa_productions
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                hello@kiqaproductions.com
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-r-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 KiQa Productions. All rights reserved. Photography by RITIQA PARAB.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300">Terms of Service</Link>
            <Link href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300">Cookies</Link>
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-50"></div>
    </footer>
  );
};

export default Footer;