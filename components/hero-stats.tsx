import { fundingData } from "@/data/funding-data"

export function HeroStats() {
  const totalFunding = fundingData.reduce((sum, d) => sum + d.amount, 0)
  const totalDeals = fundingData.length
  const sectors = Array.from(new Set(fundingData.flatMap((d) => d.sectors)))
  const topSector = sectors.reduce(
    (acc, sector) => {
      const count = fundingData.filter((d) => d.sectors.includes(sector)).length
      return count > acc.count ? { sector, count } : acc
    },
    { sector: "", count: 0 },
  )
  const largestDeal = fundingData.reduce((max, d) => (d.amount > max.amount ? d : max))

  return (
    <div>
      <div className="mb-12 pb-8 border-b-4 border-black">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-2 leading-tight">
          INDIAN STARTUP FUNDING TRACKER
        </h1>
        <p className="text-gray-600 text-lg">Discover, analyze, and understand the funding landscape</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="neo-border neo-hover p-6 bg-white">
          <div className="text-3xl font-bold text-green-700 mb-2">₹{(totalFunding / 1000).toFixed(1)}B</div>
          <div className="text-xs font-bold uppercase text-gray-600">Total Funding</div>
        </div>
        <div className="neo-border neo-hover p-6 bg-white">
          <div className="text-3xl font-bold text-green-700 mb-2">{totalDeals}</div>
          <div className="text-xs font-bold uppercase text-gray-600">Total Deals</div>
        </div>
        <div className="neo-border neo-hover p-6 bg-white">
          <div className="text-3xl font-bold text-green-700 mb-2">{topSector.count}</div>
          <div className="text-xs font-bold uppercase text-gray-600">{topSector.sector}</div>
        </div>
        <div className="neo-border neo-hover p-6 bg-white">
          <div className="text-3xl font-bold text-green-700 mb-2">₹{(largestDeal.amount / 100).toFixed(0)}Cr</div>
          <div className="text-xs font-bold uppercase text-gray-600">Largest Deal</div>
        </div>
      </div>
    </div>
  )
}
