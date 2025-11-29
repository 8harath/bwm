"use client"

import { useMemo } from "react"
import { fundingData } from "@/data/funding-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function AnalyticsDashboard() {
  const [fundingByMonth, fundingBySector, fundingByStage, topInvestors] = useMemo(() => {
    // Funding over time
    const monthMap = new Map<string, number>()
    fundingData.forEach((d) => {
      const month = new Date(d.date).toLocaleString("default", { month: "short", year: "2-digit" })
      monthMap.set(month, (monthMap.get(month) || 0) + d.amount)
    })
    const fundingOverTime = Array.from(monthMap.entries()).map(([month, amount]) => ({
      month,
      amount: Math.round(amount / 100),
    }))

    // By sector
    const sectorMap = new Map<string, { count: number; amount: number }>()
    fundingData.forEach((d) => {
      d.sectors.forEach((sector) => {
        const current = sectorMap.get(sector) || { count: 0, amount: 0 }
        sectorMap.set(sector, { count: current.count + 1, amount: current.amount + d.amount })
      })
    })
    const bySektor = Array.from(sectorMap.entries())
      .map(([name, { count, amount }]) => ({ name, value: Math.round(amount / 100), deals: count }))
      .sort((a, b) => b.value - a.value)

    // By stage
    const stageMap = new Map<string, { count: number; amount: number }>()
    fundingData.forEach((d) => {
      const current = stageMap.get(d.stage) || { count: 0, amount: 0 }
      stageMap.set(d.stage, { count: current.count + 1, amount: current.amount + d.amount })
    })
    const byStage = Array.from(stageMap.entries())
      .map(([stage, { count, amount }]) => ({ stage, count, amount: Math.round(amount / 100) }))
      .sort((a, b) => b.amount - a.amount)

    // Top investors
    const investorMap = new Map<string, { count: number; amount: number }>()
    fundingData.forEach((d) => {
      d.investors.forEach((inv) => {
        const current = investorMap.get(inv) || { count: 0, amount: 0 }
        investorMap.set(inv, { count: current.count + 1, amount: current.amount + d.amount })
      })
    })
    const topInv = Array.from(investorMap.entries())
      .map(([name, { count, amount }]) => ({ name, deals: count, amount: Math.round(amount / 100) }))
      .sort((a, b) => b.deals - a.deals)
      .slice(0, 8)

    return [fundingOverTime, bySektor, byStage, topInv]
  }, [])

  const colors = ["#1A5D1A", "#0D3D0D", "#2A7D2A", "#3A9D3A", "#4ABD4A", "#5ACD5A", "#6ADD6A", "#7AED7A"]

  return (
    <div className="py-12 space-y-12">
      {/* Funding Over Time */}
      <div className="neo-border p-6 md:p-8 bg-white">
        <h3 className="text-lg font-bold uppercase mb-6 text-green-700">FUNDING OVER TIME</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={fundingByMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#000" />
            <XAxis dataKey="month" stroke="#000" />
            <YAxis stroke="#000" />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "4px solid #000" }}
              formatter={(value) => `₹${value}Cr`}
            />
            <Line type="monotone" dataKey="amount" stroke="#1A5D1A" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sector Breakdown */}
      <div className="neo-border p-6 md:p-8 bg-white">
        <h3 className="text-lg font-bold uppercase mb-6 text-green-700">FUNDING BY SECTOR</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fundingBySector}>
            <CartesianGrid strokeDasharray="3 3" stroke="#000" />
            <XAxis dataKey="name" stroke="#000" />
            <YAxis stroke="#000" />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "4px solid #000" }}
              formatter={(value) => `₹${value}Cr`}
            />
            <Bar dataKey="value" fill="#1A5D1A" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stage Distribution */}
        <div className="neo-border p-6 md:p-8 bg-white">
          <h3 className="text-lg font-bold uppercase mb-6 text-green-700">BY STAGE</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={fundingByStage} dataKey="amount" nameKey="stage" cx="50%" cy="50%" outerRadius={80}>
                {fundingByStage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}Cr`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Investors */}
        <div className="neo-border p-6 md:p-8 bg-white">
          <h3 className="text-lg font-bold uppercase mb-6 text-green-700">TOP INVESTORS</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {topInvestors.map((inv, i) => (
              <div key={inv.name} className="flex justify-between items-center pb-2 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm w-6 text-center text-green-700">{i + 1}.</span>
                  <div>
                    <div className="font-bold text-sm">{inv.name}</div>
                    <div className="text-xs text-gray-600">{inv.deals} deals</div>
                  </div>
                </div>
                <div className="font-bold text-green-700">₹{inv.amount}Cr</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
