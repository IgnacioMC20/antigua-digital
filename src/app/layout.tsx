import Script from 'next/script';

// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>
    <Script
      src="//unpkg.com/react-scan/dist/auto.global.js"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
    {children}
  </>;
}
