"use client"

import { useState } from "react"
import type React from "react"
import Image from "next/image"
import { ChevronLeft, Calendar, UserPlus, Wallet, Minus, Plus } from "lucide-react"
import type { FC } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface CreateVoyageScreenProps {
  onBack: () => void
  onSave: (data: { date?: DateRange; travelers: number; budget: string; currency: string }) => void
}

// A reusable card component for the form inputs
const InfoCard: FC<{
  icon: React.ReactNode
  label: string
  text: string
  isPlaceholder: boolean
}> = ({ icon, label, text, isPlaceholder }) => (
  <div className="w-full bg-white rounded-xl p-4 flex items-center space-x-4 text-left shadow-md">
    <div className="text-gray-800">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-lg font-semibold ${isPlaceholder ? "text-gray-400" : "text-black"}`}>{text}</p>
    </div>
  </div>
)

/**
 * CreateVoyageScreen component for defining trip details.
 */
export default function CreateVoyageScreen({ onBack, onSave }: CreateVoyageScreenProps) {
  const [date, setDate] = useState<DateRange | undefined>()
  const [travelers, setTravelers] = useState(1)
  const [budget, setBudget] = useState("")
  const [currency, setCurrency] = useState("EUR")

  const handleSaveClick = () => {
    onSave({ date, travelers, budget, currency })
  }

  const formatTravelersText = () => {
    if (travelers === 1) return "1 voyageur"
    return `${travelers} voyageurs`
  }

  const formatBudgetText = () => {
    if (!budget) return "Définir un budget"
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(Number(budget))
  }

  const formatDateText = () => {
    if (!date?.from) return "Définir une date"
    if (!date.to) return format(date.from, "d LLL, y", { locale: fr })
    return `${format(date.from, "d LLL", { locale: fr })} - ${format(date.to, "d LLL, y", { locale: fr })}`
  }

  return (
    <div className="relative w-full h-screen font-sans">
      {/* Background Image */}
      <Image
        src="/placeholder.svg?width=400&height=800"
        alt="View of clouds from above"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-700/30 to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-full p-6 text-white">
        <header className="flex items-center justify-center mb-8">
          <button onClick={onBack} className="absolute left-6">
            <ChevronLeft size={28} />
          </button>
          <h1 className="text-3xl font-bold">Nom du voyage</h1>
        </header>

        <main className="flex-grow flex flex-col justify-center space-y-4">
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full">
                <InfoCard
                  icon={<Calendar size={24} />}
                  label="Dates de voyage"
                  text={formatDateText()}
                  isPlaceholder={!date?.from}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
                locale={fr}
              />
            </PopoverContent>
          </Popover>

          {/* Travelers Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full">
                <InfoCard
                  icon={<UserPlus size={24} />}
                  label="Nombre de voyageur"
                  text={formatTravelersText()}
                  isPlaceholder={false}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="flex items-center justify-between">
                <p className="font-medium">Voyageurs</p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={() => setTravelers(Math.max(1, travelers - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-bold w-8 text-center">{travelers}</span>
                  <Button variant="outline" size="icon" onClick={() => setTravelers(travelers + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Budget Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full">
                <InfoCard
                  icon={<Wallet size={24} />}
                  label="Budget de voyage"
                  text={formatBudgetText()}
                  isPlaceholder={!budget}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Définir le budget</h4>
                  <p className="text-sm text-muted-foreground">Entrez le montant et sélectionnez la devise.</p>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Input
                    type="number"
                    placeholder="1000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="col-span-2 h-9"
                  />
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Devise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </main>

        <footer className="mt-auto">
          <button
            onClick={handleSaveClick}
            className="w-full bg-white text-black font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-200 transition-colors"
          >
            Enregistrer
          </button>
        </footer>
      </div>
    </div>
  )
}
