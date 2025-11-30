"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { FilterPanel } from "@/components/filter-panel"
import { DealsList } from "@/components/deals-list"
import { fundingData } from "@/data/funding-data"

const sectors = Array.from(new Set(fundingData.flatMap((d) => d.sectors))).sort()
const stages = ["Pre-Seed", "Seed", "Series A", "Series B", "Series C", "Series C+", "Bridge", "Debt"]
const locations = Array.from(new Set(fundingData.map((d) => d.location))).sort()
const years = Array.from(new Set(fundingData.map((d) => new Date(d.date).getFullYear().toString()))).sort(
  (a, b) => Number(b) - Number(a),
)

export default function ExplorePage() {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [selectedStages, setSelectedStages] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [fundingRange, setFundingRange] = useState<[number, number]>([0, 10000])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [investorSearch, setInvestorSearch] = useState<string>("")
  const [sortBy, setSortBy] = useState<"date" | "amount">("date")
  const [showUndisclosed, setShowUndisclosed] = useState<boolean>(true)

  const filteredDeals = useMemo(() => {
    return fundingData
      .filter((deal) => {
        // Sector filter
        const sectorMatch = selectedSectors.length === 0 || deal.sectors.some((s) => selectedSectors.includes(s))

        // Stage filter
        const stageMatch = selectedStages.length === 0 || selectedStages.includes(deal.stage)

        // Location filter
        const locationMatch = selectedLocation === "" || deal.location === selectedLocation

        // Year filter
        const dealYear = new Date(deal.date).getFullYear().toString()
        const yearMatch = selectedYears.length === 0 || selectedYears.includes(dealYear)

        // Funding amount filter
        const amountMatch = deal.amount >= fundingRange[0] && deal.amount <= fundingRange[1]

        // Undisclosed filter
        const undisclosedMatch = showUndisclosed || deal.amount > 0

        // Company search
        const companyMatch =
          searchQuery === "" || deal.company.toLowerCase().includes(searchQuery.toLowerCase())

        // Investor search
        const investorMatch =
          investorSearch === "" ||
          deal.investors.some((inv) => inv.toLowerCase().includes(investorSearch.toLowerCase()))

        return (
          sectorMatch &&
          stageMatch &&
          locationMatch &&
          yearMatch &&
          amountMatch &&
          undisclosedMatch &&
          companyMatch &&
          investorMatch
        )
      })
      .sort((a, b) => {
        if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime()
        return b.amount - a.amount
      })
  }, [
    selectedSectors,
    selectedStages,
    selectedLocation,
    selectedYears,
    fundingRange,
    sortBy,
    showUndisclosed,
    searchQuery,
    investorSearch,
  ])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="py-8 md:py-12 border-b-4 border-black">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">EXPLORE DEALS</h1>
          <p className="text-gray-600 mt-2">Browse and filter the Indian startup funding landscape</p>
        </div>

        {/* Search Bar */}
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="neo-border px-4 py-3 text-sm font-semibold bg-white w-full focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <input
              type="text"
              placeholder="Search investors..."
              value={investorSearch}
              onChange={(e) => setInvestorSearch(e.target.value)}
              className="neo-border px-4 py-3 text-sm font-semibold bg-white w-full focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8">
          <FilterPanel
            sectors={sectors}
            stages={stages}
            locations={locations}
            years={years}
            selectedSectors={selectedSectors}
            setSelectedSectors={setSelectedSectors}
            selectedStages={selectedStages}
            setSelectedStages={setSelectedStages}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedYears={selectedYears}
            setSelectedYears={setSelectedYears}
            fundingRange={fundingRange}
            setFundingRange={setFundingRange}
            showUndisclosed={showUndisclosed}
            setShowUndisclosed={setShowUndisclosed}
          />

          <div className="md:col-span-3">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 pb-4 border-b-2 border-gray-300">
              <p className="text-sm font-semibold text-gray-600">SHOWING {filteredDeals.length} DEALS</p>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => {
                    setSelectedSectors([])
                    setSelectedStages([])
                    setSelectedLocation("")
                    setSelectedYears([])
                    setFundingRange([0, 10000])
                    setSearchQuery("")
                    setInvestorSearch("")
                    setShowUndisclosed(true)
                  }}
                  className="text-xs font-semibold text-green-700 hover:underline"
                >
                  CLEAR ALL FILTERS
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
                  className="border-3 border-black px-3 py-2 font-bold bg-white text-black text-sm cursor-pointer"
                >
                  <option value="date">Sort: Newest</option>
                  <option value="amount">Sort: Highest Amount</option>
                </select>
              </div>
            </div>

            <DealsList deals={filteredDeals} />
          </div>
        </div>
      </div>
    </div>
  )
}
