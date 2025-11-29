"use client"

import { useState, useMemo } from "react"
import { fundingData } from "@/data/funding-data"
import Link from "next/link"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return fundingData
      .filter(
        (d) =>
          d.company.toLowerCase().includes(q) ||
          d.sectors.some((s) => s.toLowerCase().includes(q)) ||
          d.investors.some((i) => i.toLowerCase().includes(q)),
      )
      .slice(0, 8)
  }, [query])

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search companies, sectors, investors..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="w-full neo-border px-4 py-3 font-semibold text-sm focus:outline-none bg-white"
      />

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 neo-border border-t-0 bg-white z-10 max-h-80 overflow-y-auto">
          {results.map((deal) => (
            <Link
              key={deal.id}
              href={`/deal/${deal.id}`}
              className="block px-4 py-3 border-b-2 border-gray-200 hover:bg-gray-100 text-sm"
              onClick={() => {
                setQuery("")
                setIsOpen(false)
              }}
            >
              <div className="font-bold">{deal.company}</div>
              <div className="text-xs text-gray-600">
                {deal.sectors.join(", ")} • {deal.stage}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
