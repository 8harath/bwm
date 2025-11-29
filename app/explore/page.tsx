"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { FilterPanel } from "@/components/filter-panel"
import { DealsList } from "@/components/deals-list"
import { fundingData } from "@/data/funding-data"

const sectors = Array.from(new Set(fundingData.flatMap((d) => d.sectors)))
const stages = ["Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Bridge", "Debt"]
const locations = Array.from(new Set(fundingData.map((d) => d.location)))

export default function ExplorePage() {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [selectedStages, setSelectedStages] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [fundingRange, setFundingRange] = useState<[number, number]>([0, 1000])
  const [sortBy, setSortBy] = useState<"date" | "amount">("date")

  const filteredDeals = useMemo(() => {
    return fundingData
      .filter((deal) => {
        const sectorMatch = selectedSectors.length === 0 || deal.sectors.some((s) => selectedSectors.includes(s))
        const stageMatch = selectedStages.length === 0 || selectedStages.includes(deal.stage)
        const locationMatch = selectedLocation === "" || deal.location === selectedLocation
        const amountMatch = deal.amount >= fundingRange[0] && deal.amount <= fundingRange[1]
        return sectorMatch && stageMatch && locationMatch && amountMatch
      })
      .sort((a, b) => {
        if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime()
        return b.amount - a.amount
      })
  }, [selectedSectors, selectedStages, selectedLocation, fundingRange, sortBy])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="py-8 md:py-12 border-b-4 border-black">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">EXPLORE DEALS</h1>
          <p className="text-gray-600 mt-2">Browse and filter the Indian startup funding landscape</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8">
          <FilterPanel
            sectors={sectors}
            stages={stages}
            locations={locations}
            selectedSectors={selectedSectors}
            setSelectedSectors={setSelectedSectors}
            selectedStages={selectedStages}
            setSelectedStages={setSelectedStages}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            fundingRange={fundingRange}
            setFundingRange={setFundingRange}
          />

          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-300">
              <p className="text-sm font-semibold text-gray-600">SHOWING {filteredDeals.length} DEALS</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
                className="border-3 border-black px-3 py-2 font-bold bg-white text-black text-sm cursor-pointer"
              >
                <option value="date">Sort: Newest</option>
                <option value="amount">Sort: Highest Amount</option>
              </select>
            </div>

            <DealsList deals={filteredDeals} />
          </div>
        </div>
      </div>
    </div>
  )
}
