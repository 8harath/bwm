import { Header } from "@/components/header"
import { DealDetail } from "@/components/deal-detail"
import { fundingData } from "@/data/funding-data"
import type { Metadata } from "next"

interface DealPageProps {
  params: { id: string }
}

export async function generateStaticParams() {
  return fundingData.map((deal) => ({
    id: deal.id,
  }))
}

export async function generateMetadata({ params }: DealPageProps): Promise<Metadata> {
  const deal = fundingData.find((d) => d.id === params.id)

  if (!deal) {
    return {
      title: "Deal Not Found | Indian Startup Funding Tracker",
    }
  }

  const formattedAmount = `$${(deal.amount / 1000).toFixed(1)}M`

  return {
    title: `${deal.company} raises ${formattedAmount} in ${deal.stage} | Indian Startup Funding Tracker`,
    description: deal.description,
    keywords: [
      deal.company,
      "startup funding",
      "Indian startups",
      deal.stage,
      ...deal.sectors,
      deal.location,
      "venture capital",
      "funding round",
    ].join(", "),
    openGraph: {
      title: `${deal.company} - ${formattedAmount} ${deal.stage}`,
      description: deal.description,
      type: "article",
      publishedTime: deal.date,
      tags: deal.sectors,
    },
    twitter: {
      card: "summary_large_image",
      title: `${deal.company} raises ${formattedAmount}`,
      description: deal.description,
    },
  }
}

export default function DealPage({ params }: DealPageProps) {
  const deal = fundingData.find((d) => d.id === params.id)

  if (!deal) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Deal Not Found</h1>
          <p className="text-gray-600">The deal you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <DealDetail deal={deal} />
    </div>
  )
}
