import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {};

// Configuration object tells the next-pwa plugin
const withPWAConfig = withPWA({
    dest: 'public', // Destination directory for the PWA files
    disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
    register: true, // Register the PWA service worker
    skipWaiting: true, // Skip waiting for service worker activation
});

export default withPWAConfig(nextConfig);
