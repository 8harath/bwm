import { Header } from "@/components/header"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-12 pb-8 border-b-4 border-black">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">ABOUT</h1>
          <p className="text-lg text-gray-600">
            Your comprehensive source for Indian startup funding data
          </p>
        </div>

        {/* What is this */}
        <section className="neo-border p-8 bg-white mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-700">WHAT IS THIS?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Indian Startup Funding Tracker is a comprehensive database and analytics platform that tracks funding
            announcements across the Indian startup ecosystem from 2024-2025. Our mission is to make startup funding
            data accessible, searchable, and actionable for investors, entrepreneurs, students, researchers, and anyone
            interested in the Indian startup landscape.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We aggregate funding data from multiple trusted sources, normalize it, and present it in an easy-to-use
            interface with powerful filtering, search, and analytics capabilities.
          </p>
        </section>

        {/* Data Sources */}
        <section className="neo-border p-8 bg-white mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-700">DATA SOURCES</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our funding data is collected from authoritative sources in the Indian startup ecosystem:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">•</span>
              <div>
                <strong>Entrackr.com</strong> - Leading Indian startup news and analysis platform
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">•</span>
              <div>
                <strong>VCCircle.com</strong> - Comprehensive database of private equity and venture capital deals
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">•</span>
              <div>
                <strong>Inc42.com</strong> - India's leading startup media platform
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">•</span>
              <div>
                <strong>YourStory.com</strong> - Platform for entrepreneurs and startup news
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">•</span>
              <div>
                <strong>Company Press Releases</strong> - Official announcements from startups and investors
              </div>
            </li>
          </ul>
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> The current dataset contains curated sample data for demonstration purposes. Real
            data will be continuously updated from these sources.
          </p>
        </section>

        {/* Methodology */}
        <section className="neo-border p-8 bg-white mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-700">METHODOLOGY</h2>

          <h3 className="text-lg font-bold mb-2">Data Collection</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We monitor funding announcements from trusted sources daily. Each funding round is manually verified against
            multiple sources to ensure accuracy.
          </p>

          <h3 className="text-lg font-bold mb-2">Data Normalization</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We standardize data across the following dimensions:
          </p>
          <ul className="space-y-2 mb-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">•</span>
              <div>
                <strong>Funding Amounts:</strong> All amounts are converted to USD (thousands) for consistency
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">•</span>
              <div>
                <strong>Sectors:</strong> Categorized using industry-standard classifications (Fintech, Healthtech,
                E-commerce, etc.)
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">•</span>
              <div>
                <strong>Funding Stages:</strong> Standardized to Pre-Seed, Seed, Series A-F, Bridge, and Debt rounds
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">•</span>
              <div>
                <strong>Locations:</strong> City-level geography for Indian startups
              </div>
            </li>
          </ul>

          <h3 className="text-lg font-bold mb-2">Update Frequency</h3>
          <p className="text-gray-700 leading-relaxed">
            The database is updated weekly with new funding announcements. Historical data is continuously refined as
            more information becomes available.
          </p>
        </section>

        {/* Disclaimers */}
        <section className="neo-border p-8 bg-white mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-700">DISCLAIMERS</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">•</span>
              <div>
                <strong>Informational Purposes:</strong> This data is provided for informational and research purposes
                only. It should not be used as the sole basis for investment decisions.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">•</span>
              <div>
                <strong>Accuracy:</strong> While we strive for accuracy, funding data can be incomplete, estimated, or
                subject to change. Always verify critical information with official sources.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">•</span>
              <div>
                <strong>Completeness:</strong> Not all funding rounds are publicly disclosed. Our database reflects only
                publicly available information.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-700 font-bold">•</span>
              <div>
                <strong>No Affiliation:</strong> We are not affiliated with any of the startups, investors, or news
                sources mentioned on this platform.
              </div>
            </li>
          </ul>
        </section>

        {/* Features */}
        <section className="neo-border p-8 bg-white mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-700">FEATURES</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-2 border-gray-200 p-4">
              <h3 className="font-bold mb-2">🔍 Advanced Search</h3>
              <p className="text-sm text-gray-700">Search by company name, sector, investor, or location</p>
            </div>
            <div className="border-2 border-gray-200 p-4">
              <h3 className="font-bold mb-2">🎯 Smart Filtering</h3>
              <p className="text-sm text-gray-700">Filter by sector, stage, location, funding amount, and date range</p>
            </div>
            <div className="border-2 border-gray-200 p-4">
              <h3 className="font-bold mb-2">📊 Analytics Dashboard</h3>
              <p className="text-sm text-gray-700">
                Visualize trends, sector distribution, stage breakdown, and investor activity
              </p>
            </div>
            <div className="border-2 border-gray-200 p-4">
              <h3 className="font-bold mb-2">📥 Export Data</h3>
              <p className="text-sm text-gray-700">Download filtered results as CSV for further analysis</p>
            </div>
            <div className="border-2 border-gray-200 p-4">
              <h3 className="font-bold mb-2">📱 Mobile Responsive</h3>
              <p className="text-sm text-gray-700">Access from any device with optimized mobile experience</p>
            </div>
            <div className="border-2 border-gray-200 p-4">
              <h3 className="font-bold mb-2">🎨 Multiple Views</h3>
              <p className="text-sm text-gray-700">Switch between table, card, and compact list views</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="neo-border p-8 bg-white mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-700">CONTACT & FEEDBACK</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We welcome feedback, corrections, and suggestions to improve this platform.
          </p>
          <div className="space-y-3">
            <div>
              <strong className="text-sm">Report Data Errors:</strong>
              <p className="text-sm text-gray-600">
                If you notice incorrect or missing data, please let us know with the deal name and source link.
              </p>
            </div>
            <div>
              <strong className="text-sm">Feature Requests:</strong>
              <p className="text-sm text-gray-600">
                Have ideas for new features or analytics? We'd love to hear from you.
              </p>
            </div>
            <div>
              <strong className="text-sm">Data Partnerships:</strong>
              <p className="text-sm text-gray-600">
                If you're a data provider or news organization interested in partnership, reach out.
              </p>
            </div>
          </div>
        </section>

        {/* Built With */}
        <section className="neo-border p-8 bg-white">
          <h2 className="text-2xl font-bold mb-4 text-green-700">BUILT WITH</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This platform is built with modern web technologies for performance and user experience:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js 16",
              "React 19",
              "TypeScript",
              "Tailwind CSS",
              "Recharts",
              "Radix UI",
              "Vercel Analytics",
            ].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-gray-100 border-2 border-black text-sm font-bold">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/explore"
            className="inline-block neo-border px-8 py-4 bg-green-700 text-white font-bold hover:bg-green-800 transition text-lg"
          >
            EXPLORE FUNDING DATA →
          </Link>
        </div>
      </div>
    </div>
  )
}
