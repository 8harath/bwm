import Link from "next/link"
import type { FundingDeal } from "@/data/funding-data"

interface DealsCardGridProps {
  deals: FundingDeal[]
}

export function DealsCardGrid({ deals }: DealsCardGridProps) {
  if (deals.length === 0) {
    return (
      <div className="neo-border p-12 bg-white text-center">
        <p className="text-gray-600 font-semibold">No deals found matching your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.map((deal) => (
        <Link
          key={deal.id}
          href={`/deal/${deal.id}`}
          className="neo-border neo-hover p-6 bg-white block transition-transform"
        >
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2 hover:text-green-700 transition">{deal.company}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-green-700">${(deal.amount / 1000).toFixed(1)}M</span>
              <span className="text-sm font-bold text-gray-600">• {deal.stage}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {deal.sectors.map((sector) => (
                <span key={sector} className="text-xs font-bold px-2 py-1 bg-gray-100 border-2 border-black">
                  {sector}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t-2 border-gray-200">
              <span className="font-semibold">📍 {deal.location}</span>
              <span>{new Date(deal.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
