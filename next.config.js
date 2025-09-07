/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['gsap'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'TweenLite': 'gsap/TweenLite',
      'TweenMax': 'gsap/TweenMax',
      'TimelineLite': 'gsap/TimelineLite',
      'TimelineMax': 'gsap/TimelineMax',
    };
    return config;
  },
  images: {
    domains: [],
    unoptimized: true,
  },
  trailingSlash: false,
};

module.exports = nextConfig;
