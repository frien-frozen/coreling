import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://coreling.org"),
  title: {
    default: "Coreling — Local AI, orchestrated.",
    template: "%s | Coreling",
  },
  description:
    "Run private AI on your machine — persistent memory, vision, and dual engine modes. Zero cloud. Zero telemetry. One command to start.",
  keywords: [
    "local AI", "private AI", "offline AI", "local LLM",
    "air-gapped AI", "AI assistant", "coreling", "on-device AI",
  ],
  authors: [{ name: "Coreling", url: "https://coreling.org" }],
  creator: "Coreling",
  publisher: "Coreling",

  icons: {
    icon: "/corelingfavicon.svg",
    shortcut: "/corelingfavicon.svg",
    apple: "/corelingfavicon.svg",
  },

  manifest: "/manifest.json",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coreling.org",
    siteName: "Coreling",
    title: "Coreling — Local AI, orchestrated.",
    description:
      "Run private AI on your machine — persistent memory, vision, and dual engine modes. Zero cloud. Zero telemetry.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Coreling — Local AI, orchestrated.",
    description:
      "Run private AI on your machine — persistent memory, vision, dual engine modes. Zero cloud.",
    creator: "@coreling",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Coreling",
  },

  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Coreling",
    "theme-color": "#000000",
    "msapplication-TileColor": "#000000",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
