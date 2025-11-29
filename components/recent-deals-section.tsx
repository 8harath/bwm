"use client"

import Link from "next/link"
import { fundingData } from "@/data/funding-data"
import { DealCard } from "./deal-card"

export function RecentDealsSection() {
  const recentDeals = fundingData.slice(0, 6)

  return (
    <section className="mb-16">
      <div className="flex justify-between items-end mb-8 pb-6 border-b-4 border-black">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">RECENT DEALS</h2>
        <Link href="/explore" className="font-bold text-sm text-green-700 hover:underline">
          VIEW ALL →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </section>
  )
}
