import './globals.css';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'KiQa Productions - Broadcasting & Media Production',
  description: 'KiQa Productions specializes in high-quality broadcasting and media production services, bringing your vision to life through innovative storytelling and cutting-edge technology.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Playfair+Display:wght@700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body style={{ fontFamily: "'Montserrat', sans-serif" }}>{children}</body>
    </html>
  );
}
