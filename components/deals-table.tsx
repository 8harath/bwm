import Link from "next/link"
import type { FundingDeal } from "@/data/funding-data"

interface DealsTableProps {
  deals: FundingDeal[]
}

export function DealsTable({ deals }: DealsTableProps) {
  if (deals.length === 0) {
    return (
      <div className="neo-border p-12 bg-white text-center">
        <p className="text-gray-600 font-semibold">No deals found matching your filters.</p>
      </div>
    )
  }

  return (
    <div className="neo-border bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-3 border-black bg-gray-100">
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">Company</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">Stage</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide hidden md:table-cell">
                Sector
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide hidden lg:table-cell">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide hidden xl:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, index) => (
              <tr
                key={deal.id}
                className={`border-b-2 border-gray-200 hover:bg-gray-50 transition ${
                  index === deals.length - 1 ? "border-b-0" : ""
                }`}
              >
                <td className="px-4 py-4">
                  <Link href={`/deal/${deal.id}`} className="font-bold text-sm hover:text-green-700 transition">
                    {deal.company}
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <span className="font-bold text-green-700">${(deal.amount / 1000).toFixed(1)}M</span>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-block px-2 py-1 text-xs font-bold border-2 border-black bg-white">
                    {deal.stage}
                  </span>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <span className="text-sm text-gray-700">{deal.sectors[0]}</span>
                  {deal.sectors.length > 1 && (
                    <span className="text-xs text-gray-500 ml-1">+{deal.sectors.length - 1}</span>
                  )}
                </td>
                <td className="px-4 py-4 hidden lg:table-cell">
                  <span className="text-sm text-gray-700">{deal.location}</span>
                </td>
                <td className="px-4 py-4 hidden xl:table-cell">
                  <span className="text-sm text-gray-600">
                    {new Date(deal.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
