"use client"

import Image from "next/image"

/**
 * WelcomeScreen component inspired by the Wayko app screenshot.
 * It features a title, a card with a background image, a brand name,
 * a tagline, and a call-to-action button.
 * This component is built with Next.js and styled with Tailwind CSS.
 */
interface WelcomeScreenProps {
  onNavigate: () => void
}

export default function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-white font-sans p-4 pt-16">
      <h1 className="text-3xl font-bold text-black mb-8">Bienvenue</h1>

      <div className="relative w-full max-w-sm h-[60vh] max-h-[500px] bg-black rounded-3xl overflow-hidden shadow-2xl">
        {/* Background Image */}
        <Image
          src="/placeholder.svg?width=400&height=600"
          alt="Planet Earth from space"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        {/* Black overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-6">
          <div className="flex-grow flex flex-col items-center justify-center">
            <h2 className="text-8xl font-bold tracking-tight">Wayko</h2>
            <p className="mt-2 text-lg">Planifiez moins. Profitez plus.</p>
          </div>

          <button
            onClick={onNavigate}
            className="mt-auto bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold py-3 px-8 rounded-full transition-all hover:bg-white/30"
          >
            Créer un voyage
          </button>
        </div>
      </div>
    </main>
  )
}
