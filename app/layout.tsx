import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const SITE_URL = "https://suncalindia.vercel.app";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Solar lagwane me kitna paisa lagega?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical on-grid 1kW system costs ~₹50,000 before subsidy. PM Surya Ghar gives up to ₹78,000 on 3kW, so final cost drops sharply depending on your state and installer.",
      },
    },
    {
      "@type": "Question",
      name: "Kya battery lena jaruri hai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On-grid systems don't need a battery; they use net metering and cut your bill. Battery is optional for backup—choose it if you face long power cuts or want night-time backup, but it raises upfront cost.",
      },
    },
    {
      "@type": "Question",
      name: "Subsidy ke paise kab milte hain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After installation and inspection are approved, DISCOM processes the claim and DBT typically lands in your Aadhaar-linked bank within a few weeks. Timelines vary by state workload.",
      },
    },
    {
      "@type": "Question",
      name: "1kW solar panel kitne ka hai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Market price for a 1kW on-grid kit (panels, inverter, structure, wiring) is around ₹45,000–₹55,000. Final quote depends on brand, roof type, and installer margin.",
      },
    },
    {
      "@type": "Question",
      name: "Net metering kaise lagwaye?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apply through your DISCOM or installer portal, submit KYC, latest electricity bill, and load details. After approval, a bi-directional meter is installed and your solar exports/imports are tracked.",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  title: "PM Surya Ghar 2025: Subsidy Apply Kaise Kare? | 1-3kW Solar Kitna Kharcha? – SunCalc",
  description:
    "Bijli bill zero karna hai? Check karein aapko ₹78,000 tak PM Surya Ghar subsidy milegi ya nahi. 1kW-3kW solar price list, ROI aur installation steps ek jagah. Abhi free calculator try karein!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          id="adsterra-native-banner-head"
          src="//pl28106760.effectivegatecpm.com/f90c4e368f493b06f5c3392c4b6097ed/invoke.js"
          strategy="beforeInteractive"
          data-cfasync="false"
        />
        <Script
          id="ga-gtag"
          src="https://www.googletagmanager.com/gtag/js?id=G-EP0JE1GR4C"
          strategy="afterInteractive"
        />
        <Script
          id="ga-gtag-init"
          strategy="afterInteractive"
        >{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EP0JE1GR4C');
        `}</Script>
        <Script
          id="faq-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Script
          src="//pl28106756.effectivegatecpm.com/c7/0d/98/c70d98110b6d41f15979001faaa1ba38.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
