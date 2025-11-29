"use client"

import { DealCard } from "./deal-card"

interface Deal {
  id: string
  company: string
  amount: number
  stage: string
  sectors: string[]
  investors: string[]
  date: string
  location: string
}

interface DealsListProps {
  deals: Deal[]
}

export function DealsList({ deals }: DealsListProps) {
  if (deals.length === 0) {
    return (
      <div className="neo-border p-12 text-center bg-white">
        <p className="text-gray-600 font-semibold">No deals found. Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  )
}
