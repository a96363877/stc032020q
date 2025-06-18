import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { GoogleTagManager } from "@next/third-parties/google"

// Load local Arabic font

export const metadata: Metadata = {
  title: "دفع الفواتير",
  description: "دفع الفواتير وشحن الخطوط والحصول على العروض",
   viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      </head>
      <body className={`min-h-screen bg-background antialiased font-sans`}>
          {children}
          <Script
        id="tawk-to-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6852d16ccb1d751915625acb/1iu1o43vs';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />      </body>

    </html>
  )
}


import './globals.css'import Script from "next/script"

