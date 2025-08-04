"use client"

import type React from "react"
import Image from "next/image"
import {
  MoreHorizontal,
  Plane,
  BedDouble,
  Car,
  Mail,
  Globe,
  ChevronDown,
  ArrowRight,
  Folder,
  Ticket,
  FileImage,
  LinkIcon,
} from "lucide-react"
import type { DateRange } from "react-day-picker"
import { differenceInDays } from "date-fns"

interface TripDetailScreenProps {
  onClose: () => void
  tripData: {
    date?: DateRange
  }
  onViewFullItinerary: () => void
}

const CategoryButton = ({
  icon,
  label,
  count,
  color,
}: {
  icon: React.ReactNode
  label: string
  count: number
  color: string
}) => (
  <button
    className={`relative flex flex-col items-center justify-center w-28 h-28 rounded-2xl text-white font-bold shadow-lg transition-transform hover:scale-105 ${color}`}
  >
    <div className="absolute top-2 right-2 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
      {count}
    </div>
    {icon}
    <span className="mt-2 text-lg">{label}</span>
  </button>
)

const FlightInfoCard = () => (
  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%]">
    <div className="bg-white rounded-2xl shadow-xl p-4 text-black">
      <div className="flex justify-between items-center text-center">
        <div className="w-1/3">
          <p className="text-sm text-gray-500">Paris</p>
          <p className="text-3xl font-bold">CDG</p>
          <p className="text-sm">12:40</p>
        </div>
        <div className="w-1/3 flex flex-col items-center">
          <p className="text-xs text-gray-500">AC873</p>
          <div className="w-full flex items-center">
            <div className="w-full h-0.5 bg-blue-200"></div>
            <Plane size={20} className="text-blue-500 mx-1" />
            <div className="w-full h-0.5 bg-blue-200"></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">mer. 3 sept.</p>
        </div>
        <div className="w-1/3">
          <p className="text-sm text-gray-500">Toronto</p>
          <p className="text-3xl font-bold">YYZ</p>
          <p className="text-sm">14:50</p>
        </div>
      </div>
    </div>
  </div>
)

const OrganisationCard = () => (
  <div className="bg-neutral-950 text-white rounded-2xl p-6 mt-8">
    <div className="flex items-center space-x-3">
      <Mail size={24} />
      <h2 className="text-xl font-bold">Organisation</h2>
    </div>
    <hr className="border-neutral-800 my-4" />
    <div className="text-center">
      <p className="mb-5 text-neutral-300 font-light">
        Transférez vos mails de réservations à #adresse-email et laissez Wayko organiser votre itinéraire
        automatiquement pour votre voyage.
      </p>
      <button className="bg-neutral-700/60 backdrop-blur-sm border border-white/10 text-white font-semibold py-3 px-10 rounded-full transition-all hover:bg-neutral-700/80">
        Copier
      </button>
      <button className="text-neutral-400 underline text-sm mt-3 block w-full">Comment ça marche ?</button>
    </div>
  </div>
)

const ItineraryCard = ({ onViewFullItinerary }: { onViewFullItinerary: () => void }) => {
  const events = [
    {
      icon: <Plane size={18} />,
      color: "bg-blue-100 text-blue-800",
      title: "CDG → YYZ",
      subtitle: "Départ",
      time: "12:40",
    },
    {
      icon: <BedDouble size={18} />,
      color: "bg-orange-100 text-orange-800",
      title: "Renaissance Cancun Resort...",
      subtitle: "Enregistrement",
      time: "15:00",
    },
    {
      icon: <Plane size={18} />,
      color: "bg-blue-100 text-blue-800",
      title: "YYZ → CUN",
      subtitle: "Départ",
      time: "16:35",
    },
    {
      icon: <Car size={18} />,
      color: "bg-purple-100 text-purple-800",
      title: "Europcar",
      subtitle: "Prise en charge",
      time: "17:15",
    },
  ]

  return (
    <div className="bg-white text-black rounded-2xl mt-8 border border-neutral-200">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-neutral-600">
            <Globe size={24} />
            <h2 className="text-xl font-semibold text-black">Itinéraire</h2>
          </div>
          <button className="flex items-center space-x-1 text-sm text-neutral-500">
            <span>Choisir une date</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
      <hr className="border-neutral-200" />
      <div className="p-6">
        <p className="font-bold text-lg mb-6">Jour 1</p>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-neutral-200"></div>

          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={index} className="relative flex items-start">
                <div
                  className={`z-10 flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${event.color}`}
                >
                  {event.icon}
                </div>
                <div className="ml-6 flex-grow">
                  <p className="font-bold text-black">{event.title}</p>
                  <p className="text-sm text-neutral-500">{event.subtitle}</p>
                </div>
                <p className="text-sm text-neutral-600">{event.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="border-neutral-200" />
      <div className="p-6">
        <button onClick={onViewFullItinerary} className="flex items-center space-x-2 text-black text-lg font-semibold">
          <span>Voir tous les jours</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}

const DocumentsCard = () => {
  const docIcons = [
    { icon: <Ticket size={24} /> },
    { icon: <Mail size={24} /> },
    { icon: <FileImage size={24} /> },
    { icon: <LinkIcon size={24} /> },
  ]

  return (
    <div className="bg-white text-black rounded-2xl mt-8 border border-neutral-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <Folder size={28} className="text-neutral-500" />
          <h2 className="text-xl font-bold text-black">Documents</h2>
        </div>
      </div>
      <div className="bg-neutral-100 px-6 py-12 text-center">
        <div className="flex justify-center items-center space-x-4 mb-6">
          {docIcons.map((item, index) => (
            <div
              key={index}
              className="w-14 h-14 bg-white/70 rounded-full flex items-center justify-center text-neutral-400"
            >
              {item.icon}
            </div>
          ))}
        </div>
        <p className="text-neutral-600 max-w-xs mx-auto mb-6">
          Commencez à importer vos documents de voyage et suivez votre itinéraire déjà organisé.
        </p>
        <button className="bg-black text-white font-semibold py-3 px-6 rounded-full transition-colors hover:bg-neutral-800">
          Importer un document
        </button>
      </div>
    </div>
  )
}

export default function TripDetailScreen({ onClose, tripData, onViewFullItinerary }: TripDetailScreenProps) {
  const daysUntilDeparture = () => {
    if (!tripData.date?.from) return ""
    const today = new Date()
    const departure = new Date(tripData.date.from)
    const diffDays = differenceInDays(departure, today)
    return diffDays > 0 ? `Départ dans ${diffDays} jours à ...` : "Voyage en cours ou passé"
  }

  return (
    <div className="flex flex-col h-screen bg-white font-sans p-6">
      <header className="flex items-center justify-between mb-4 flex-shrink-0">
        <button>
          <MoreHorizontal size={28} className="text-black" />
        </button>
        <button onClick={onClose} className="text-lg font-medium text-black">
          Fermer
        </button>
      </header>

      <main className="flex-grow overflow-y-auto">
        <div className="mb-4">
          <p className="text-gray-500">{daysUntilDeparture()}</p>
          <h1 className="text-5xl font-bold text-black">Cancún</h1>
        </div>

        <div className="relative mb-20">
          <Image
            src="/images/cancun.jpg"
            alt="Beach in Cancún"
            width={400}
            height={300}
            className="rounded-3xl w-full object-cover shadow-lg"
          />
          <FlightInfoCard />
        </div>

        <div className="flex justify-around">
          <CategoryButton icon={<Plane size={40} />} label="Transport" count={2} color="bg-blue-500" />
          <CategoryButton icon={<BedDouble size={40} />} label="Hôtel" count={2} color="bg-orange-500" />
          <CategoryButton icon={<Car size={40} />} label="Location" count={1} color="bg-purple-600" />
        </div>

        <OrganisationCard />
        <ItineraryCard onViewFullItinerary={onViewFullItinerary} />
        <DocumentsCard />
      </main>
    </div>
  )
}
