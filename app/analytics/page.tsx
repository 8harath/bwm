"use client"

import { Header } from "@/components/header"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export default function AnalyticsPage() {
  // Extract conversion rate from data file comments
  const conversionInfo = {
    rate: "83.50",
    date: "2025-11-30",
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="py-8 md:py-12 border-b-4 border-black">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">ANALYTICS</h1>
          <p className="text-gray-600 mt-2">Trends, insights, and patterns in Indian startup funding</p>

          {/* Currency Conversion Notice */}
          <div className="mt-6 neo-border p-4 bg-yellow-50">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💱</div>
              <div className="flex-1">
                <div className="font-bold text-sm">Currency Conversion Rate</div>
                <div className="text-sm text-gray-700 mt-1">
                  All amounts converted from USD to INR at <span className="font-bold">1 USD = ₹{conversionInfo.rate}</span>
                  {" "}(as of {new Date(conversionInfo.date).toLocaleDateString()})
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  <strong>To update:</strong> Edit <code className="bg-gray-200 px-1 py-0.5 rounded">config/currency.js</code> and run <code className="bg-gray-200 px-1 py-0.5 rounded">npm run generate-data</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnalyticsDashboard />
      </div>
    </div>
  )
}
