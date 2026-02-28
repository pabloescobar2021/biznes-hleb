import type { Metadata } from "next";
import { Geist, Geist_Mono,Cormorant_Garamond, Geologica } from "next/font/google";
import "./globals.css";
import "./cssStyles.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
});

const geologica = Geologica({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: "Бизнес и хлеб",
  description: "Бизнес и хлеб",
  icons:{
    icon:"/images/logo1.png",
    apple:"/images/logo1.png"
  }
};






export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${cormorant.variable} ${geologica.variable} antialiased`}
      >
        <Header></Header>
        {children}
        <Footer/>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Бизнес и хлеб",
              "image": "https://site.ru/logo.png",
              "telephone": "+7XXXXXXXXXX",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Самара",
                "addressRegion": "Самарская область",
                "addressCountry": "RU"
              },
              "areaServed": {
                "@type": "AdministrativeArea",
                "name": "Самарская область"
              },
              "url": "https://site.ru/orekhi-optom-samara"
            })
          }}
        />

      </body>
    </html>
  );
}
