import './globals.css';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Aurora Studios - Creative Production',
  description: 'Aurora Studios is a collective of passionate storytellers, innovative artists, and technical maestros dedicated to bringing compelling visual narratives to life.',
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
