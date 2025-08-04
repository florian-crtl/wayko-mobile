"use client"

import { Calendar, Wallet } from "lucide-react"

interface HotelDetailScreenProps {
  onClose: () => void
}

/**
 * A full-screen component to display the details of a hotel reservation.
 */
export default function HotelDetailScreen({ onClose }: HotelDetailScreenProps) {
  const detailItems = [
    {
      icon: <Calendar size={20} className="text-neutral-400" />,
      label: "Enregistrement",
      date: "ven. 12 sept.",
      time: "15:00",
    },
    {
      icon: <Calendar size={20} className="text-neutral-400" />,
      label: "Départ",
      date: "ven. 23 sept.",
      time: "12:00",
    },
  ]

  return (
    <div className="flex flex-col h-screen bg-white font-sans">
      <header className="px-6 pt-12 pb-8 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-neutral-500">Cancún, Mexique</p>
            <h1 className="text-4xl font-bold text-black">Ikal Tulum Hotel</h1>
          </div>
          <button onClick={onClose} className="text-lg font-medium text-black pt-2">
            Fermer
          </button>
        </div>
      </header>

      <main className="flex-grow px-6 space-y-6">
        {/* Date Details */}
        <div className="space-y-4 border-b border-neutral-200 pb-6">
          {detailItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex items-center space-x-3 flex-grow">
                {item.icon}
                <span className="text-neutral-600">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-neutral-100 text-neutral-800 text-sm font-medium px-3 py-1.5 rounded-lg">
                  {item.date}
                </span>
                <span className="bg-neutral-100 text-neutral-800 text-sm font-medium px-3 py-1.5 rounded-lg">
                  {item.time}
                </span>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2">
            <span className="text-neutral-600">Nombre de jours</span>
            <span className="font-semibold text-black">11</span>
          </div>
        </div>

        {/* Reservation Details Card */}
        <div className="bg-neutral-100 rounded-xl p-5 space-y-4">
          <div>
            <p className="text-sm text-neutral-500 mb-1">Numéro de réservation</p>
            <p className="font-semibold text-black">BK2001992</p>
          </div>
          <div>
            <p className="text-sm text-neutral-500 mb-1">Adresse</p>
            <p className="font-semibold text-black leading-tight">
              Parque Nacional al Lado de Pancho Villa, 77760 Tulum, Mexique
            </p>
          </div>
        </div>

        {/* Cost Card */}
        <div className="border border-neutral-300 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Wallet size={20} className="text-black" />
            <span className="font-semibold text-black">Coût de l'hébergement</span>
          </div>
          <span className="text-neutral-500">920,00 €</span>
        </div>
      </main>
    </div>
  )
}
