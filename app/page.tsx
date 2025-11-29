import { Header } from "@/components/header"
import { HeroStats } from "@/components/hero-stats"
import { RecentDealsSection } from "@/components/recent-deals-section"
import { QuickInsights } from "@/components/quick-insights"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12 md:px-6 md:py-16">
        <HeroStats />
        <RecentDealsSection />
        <QuickInsights />
      </main>
    </div>
  )
}
