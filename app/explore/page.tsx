"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { FilterPanel } from "@/components/filter-panel"
import { DealsList } from "@/components/deals-list"
import { DealsTable } from "@/components/deals-table"
import { DealsCardGrid } from "@/components/deals-card-grid"
import { fundingData } from "@/data/funding-data"
import { Grid, List, Table, ChevronLeft, ChevronRight, Download } from "lucide-react"

const sectors = Array.from(new Set(fundingData.flatMap((d) => d.sectors)))
const stages = ["Pre-Seed", "Seed", "Series A", "Series B", "Series C", "Series D", "Series E", "Series F", "Bridge", "Debt"]
const locations = Array.from(new Set(fundingData.map((d) => d.location)))

const DEALS_PER_PAGE = 20

export default function ExplorePage() {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [selectedStages, setSelectedStages] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [fundingRange, setFundingRange] = useState<[number, number]>([0, 30000])
  const [sortBy, setSortBy] = useState<"date" | "amount">("date")
  const [viewMode, setViewMode] = useState<"table" | "card" | "compact">("table")
  const [currentPage, setCurrentPage] = useState(1)

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

  const totalPages = Math.ceil(filteredDeals.length / DEALS_PER_PAGE)
  const paginatedDeals = filteredDeals.slice(
    (currentPage - 1) * DEALS_PER_PAGE,
    currentPage * DEALS_PER_PAGE
  )

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [selectedSectors, selectedStages, selectedLocation, fundingRange, sortBy])

  const exportToCSV = () => {
    const headers = ["Company", "Amount (USD)", "Stage", "Sectors", "Location", "Date", "Investors", "Source"]
    const rows = filteredDeals.map((deal) => [
      deal.company,
      deal.amount.toString(),
      deal.stage,
      deal.sectors.join("; "),
      deal.location,
      deal.date,
      deal.investors.join("; "),
      deal.sourceUrl,
    ])

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `indian-startup-funding-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

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
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b-2 border-gray-300">
              <p className="text-sm font-semibold text-gray-600">
                SHOWING {paginatedDeals.length} OF {filteredDeals.length} DEALS
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {/* View Mode Toggles */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`neo-border p-2 transition ${
                      viewMode === "table" ? "bg-green-700 text-white" : "bg-white hover:bg-gray-100"
                    }`}
                    title="Table View"
                  >
                    <Table className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("card")}
                    className={`neo-border p-2 transition ${
                      viewMode === "card" ? "bg-green-700 text-white" : "bg-white hover:bg-gray-100"
                    }`}
                    title="Card View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("compact")}
                    className={`neo-border p-2 transition ${
                      viewMode === "compact" ? "bg-green-700 text-white" : "bg-white hover:bg-gray-100"
                    }`}
                    title="Compact View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
                  className="border-3 border-black px-3 py-2 font-bold bg-white text-black text-sm cursor-pointer"
                >
                  <option value="date">Sort: Newest</option>
                  <option value="amount">Sort: Highest Amount</option>
                </select>

                {/* Export */}
                <button
                  onClick={exportToCSV}
                  className="neo-border px-3 py-2 font-bold bg-white hover:bg-gray-100 transition flex items-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
              </div>
            </div>

            {/* Deals Display */}
            {viewMode === "table" && <DealsTable deals={paginatedDeals} />}
            {viewMode === "card" && <DealsCardGrid deals={paginatedDeals} />}
            {viewMode === "compact" && <DealsList deals={paginatedDeals} />}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="neo-border p-2 bg-white hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`neo-border px-3 py-2 text-sm font-bold transition ${
                            currentPage === pageNum
                              ? "bg-green-700 text-white"
                              : "bg-white hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="neo-border p-2 bg-white hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
