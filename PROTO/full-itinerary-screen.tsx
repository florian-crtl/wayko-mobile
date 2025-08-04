"use client"
import { Globe, ChevronDown, Plane, BedDouble, Car } from "lucide-react"

interface FullItineraryScreenProps {
  onClose: () => void
  onViewHotel: () => void
}

const itineraryData = {
  "MER. 3 SEPT.": {
    day: 1,
    events: [
      {
        type: "flight",
        icon: <Plane size={18} />,
        color: "bg-blue-100 text-blue-800",
        title: "CDG → YYZ",
        subtitle: "Départ",
        time: "12:40",
      },
      {
        type: "hotel",
        icon: <BedDouble size={18} />,
        color: "bg-orange-100 text-orange-800",
        title: "Renaissance Cancun Resort...",
        subtitle: "Enregistrement",
        time: "15:00",
      },
      {
        type: "flight",
        icon: <Plane size={18} />,
        color: "bg-blue-100 text-blue-800",
        title: "YYZ → CUN",
        subtitle: "Départ",
        time: "16:35",
      },
      {
        type: "car",
        icon: <Car size={18} />,
        color: "bg-purple-100 text-purple-800",
        title: "Europcar",
        subtitle: "Prise en charge",
        time: "17:15",
      },
    ],
  },
  "VEN. 12 SEPT.": {
    day: 10,
    events: [
      {
        type: "hotel",
        icon: <BedDouble size={18} />,
        color: "bg-orange-100 text-orange-800",
        title: "Renaissance Cancun Resort...",
        subtitle: "Départ",
        time: "12:00",
      },
      {
        type: "hotel",
        icon: <BedDouble size={18} />,
        color: "bg-orange-100 text-orange-800",
        title: "Ikal Tulum Hotel",
        subtitle: "Enregistrement",
        time: "15:00",
      },
    ],
  },
  "MAR. 23 SEPT.": {
    day: 20,
    events: [
      {
        type: "car",
        icon: <Car size={18} />,
        color: "bg-purple-100 text-purple-800",
        title: "Europcar",
        subtitle: "Remise",
        time: "10:30",
      },
      {
        type: "hotel",
        icon: <BedDouble size={18} />,
        color: "bg-orange-100 text-orange-800",
        title: "Ikal Tulum Hotel",
        subtitle: "Départ",
        time: "12:00",
      },
      {
        type: "flight",
        icon: <Plane size={18} />,
        color: "bg-blue-100 text-blue-800",
        title: "CUN → YUL",
        subtitle: "Départ",
        time: "14:00",
      },
      {
        type: "flight",
        icon: <Plane size={18} />,
        color: "bg-blue-100 text-blue-800",
        title: "YUL → CDG",
        subtitle: "Départ",
        time: "21:20",
      },
    ],
  },
}

/**
 * A full-screen component to display a detailed trip itinerary, day by day.
 */
export default function FullItineraryScreen({ onClose, onViewHotel }: FullItineraryScreenProps) {
  return (
    <div className="flex flex-col h-screen bg-neutral-50 font-sans">
      <header className="px-6 pt-12 pb-4 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-neutral-500">Cancún, Mexique</p>
            <h1 className="text-4xl font-bold text-black">Mon itinéraire</h1>
          </div>
          <button onClick={onClose} className="text-lg font-medium text-black pt-2">
            Fermer
          </button>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto px-4 pb-8">
        <div className="bg-white text-black rounded-2xl shadow-sm border border-neutral-200/80">
          <div className="p-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-neutral-800">
                <Globe size={20} />
                <h2 className="text-md font-semibold text-black">Itinéraire</h2>
              </div>
              <button className="flex items-center space-x-1 text-sm text-neutral-500">
                <span>Choisir une date</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div className="p-4">
            {Object.entries(itineraryData).map(([date, data], dayIndex) => (
              <div key={dayIndex} className="mb-6 last:mb-0">
                <div className="flex justify-between items-baseline mb-4">
                  <p className="font-bold text-black">{date}</p>
                  <p className="text-sm text-neutral-500">Jour {data.day}</p>
                </div>
                <div className="relative pl-5">
                  {/* Vertical line */}
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-neutral-200 -translate-x-1/2"></div>

                  <div className="space-y-6">
                    {data.events.map((event, eventIndex) => {
                      const isHotel = event.type === "hotel"
                      const EventWrapper = isHotel ? "button" : "div"
                      return (
                        <EventWrapper
                          key={eventIndex}
                          onClick={isHotel ? onViewHotel : undefined}
                          className="relative flex items-start w-full text-left"
                        >
                          <div className="z-10 flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center -translate-x-1/2 bg-white">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${event.color}`}>
                              {event.icon}
                            </div>
                          </div>
                          <div className="ml-4 flex-grow">
                            <p className="font-semibold text-black">{event.title}</p>
                            <p className="text-sm text-neutral-500">{event.subtitle}</p>
                          </div>
                          <p className="text-sm text-neutral-600">{event.time}</p>
                        </EventWrapper>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
