"use client"

import Image from "next/image"
import { Plus, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

interface MyTripsScreenProps {
  onNewTrip: () => void
  onViewTrip: () => void
  tripData: {
    date?: DateRange
    travelers: number
    budget: string
    currency: string
  }
}

/**
 * MyTripsScreen component to display a user's saved trips.
 */
export default function MyTripsScreen({ onNewTrip, onViewTrip, tripData }: MyTripsScreenProps) {
  const { date } = tripData

  const formatDate = () => {
    if (!date?.from) return "Date non définie"
    const start = format(date.from, "dd MMMM", { locale: fr })
    const end = date.to ? format(date.to, "dd MMMM", { locale: fr }) : ""
    return end ? `${start} → ${end}` : start
  }

  const daysUntilDeparture = () => {
    if (!date?.from) return ""
    const today = new Date()
    const departure = new Date(date.from)
    const diffTime = departure.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? `Départ dans ${diffDays} jours` : "Voyage en cours ou passé"
  }

  return (
    <div className="flex flex-col h-screen bg-white font-sans p-6">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-black">Mes Voyages</h1>
      </header>

      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center space-x-1">
          <span className="text-3xl font-bold text-black">2025</span>
          <ChevronDown size={24} className="text-black" />
        </button>
        <button
          onClick={onNewTrip}
          className="flex items-center space-x-2 bg-black text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-800 transition-colors"
        >
          <Plus size={20} />
          <span>Nouveau</span>
        </button>
      </div>

      <main className="flex-grow">
        <button onClick={onViewTrip} className="w-full text-left">
          <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-xl">
            <Image src="/images/cancun.jpg" alt="Beach in Cancún" layout="fill" objectFit="cover" className="z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 z-10"></div>
            <div className="relative z-20 flex flex-col justify-end h-full p-6 text-white">
              <p className="text-sm font-medium">{daysUntilDeparture()}</p>
              <h2 className="text-4xl font-bold">Cancún</h2>
              <p className="text-md mt-1">{formatDate()}</p>
            </div>
          </div>
        </button>
      </main>
    </div>
  )
}
