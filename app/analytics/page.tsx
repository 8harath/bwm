"use client"

import { Header } from "@/components/header"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="py-8 md:py-12 border-b-4 border-black">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">ANALYTICS</h1>
          <p className="text-gray-600 mt-2">Trends, insights, and patterns in Indian startup funding</p>
        </div>

        <AnalyticsDashboard />
      </div>
    </div>
  )
}
