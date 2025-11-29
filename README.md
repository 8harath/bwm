# Indian Startup Funding Tracker

A comprehensive platform for tracking and analyzing Indian startup funding rounds from 2024-2025. Built with Next.js, TypeScript, and modern web technologies.

![Version](https://img.shields.io/badge/version-0.1.0-green)
![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## 🚀 Features

### Core Functionality
- **107+ Funding Deals**: Comprehensive database of Indian startup funding from 2024-2025
- **Advanced Search**: Search by company name, sector, investor, or location
- **Smart Filtering**: Multi-dimensional filtering by sector, stage, location, funding amount, and date range
- **Multiple View Modes**: Table, Card, and Compact list views
- **Pagination**: 20 deals per page with smooth navigation
- **Export to CSV**: Download filtered results for offline analysis

### Analytics Dashboard
- **Funding Over Time**: Line chart showing monthly funding trends
- **Sector Distribution**: Bar chart of funding by sector
- **Stage Breakdown**: Pie chart of funding stages
- **Deal Size Distribution**: Histogram of deal sizes
- **Monthly Deal Flow**: Bar chart showing number of deals per month
- **Top Investors**: Ranked list of most active investors

### User Experience
- **Mobile Responsive**: Optimized for all device sizes
- **Neo-Brutalism Design**: Bold, high-contrast design with forest green accents
- **Fast Performance**: Client-side filtering and optimized rendering
- **SEO Optimized**: Dynamic meta tags for each deal page
- **Similar Deals**: Discover related funding rounds
- **Accessible Navigation**: Mobile-friendly hamburger menu

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0.3** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5.x** - Type safety
- **Tailwind CSS 4.1.9** - Utility-first CSS

### UI Components
- **Radix UI** - Accessible component primitives
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Vercel Analytics** - Usage analytics

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- pnpm, npm, or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/indian-startup-funding-tracker.git
cd indian-startup-funding-tracker
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
# or
yarn install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
bwm/
├── app/                      # Next.js App Router pages
│   ├── about/               # About/Methodology page
│   ├── analytics/           # Analytics dashboard
│   ├── deal/[id]/          # Individual deal pages
│   ├── explore/            # Browse all deals
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
│
├── components/              # React components
│   ├── ui/                 # Radix UI components
│   ├── analytics-dashboard.tsx
│   ├── deal-card.tsx
│   ├── deal-detail.tsx
│   ├── deals-card-grid.tsx
│   ├── deals-list.tsx
│   ├── deals-table.tsx
│   ├── filter-panel.tsx
│   ├── header.tsx
│   ├── hero-stats.tsx
│   ├── quick-insights.tsx
│   ├── recent-deals-section.tsx
│   └── search-bar.tsx
│
├── data/                    # Data files
│   └── funding-data.ts     # Funding deals database
│
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── public/                  # Static assets
├── styles/                  # Additional styles
│
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: Forest Green (#1A5D1A, #2D5016)
- **Background**: White (#FFFFFF)
- **Text**: Black (#000000)
- **Borders**: Black (3-4px)
- **Accents**: Various shades of green

### Typography
- **Font Family**: Space Grotesk
- **Headings**: Bold, uppercase, tight tracking
- **Body**: Regular weight, relaxed line height

### Components
- **Cards**: 3px black borders with hard drop shadows
- **Buttons**: Bold with neo-brutalist hover effects
- **Inputs**: 3px borders with focus states

## 📊 Data Structure

The funding data follows this structure:

```typescript
interface FundingDeal {
  id: string                    // Unique identifier
  company: string              // Startup name
  amount: number               // Funding amount (in thousands USD)
  stage: string                // Funding stage (Seed, Series A, etc.)
  sectors: string[]            // Industry sectors
  investors: string[]          // List of investors
  leadInvestor: string         // Lead investor
  date: string                 // Funding date (YYYY-MM-DD)
  location: string             // City
  description: string          // Company description
  sourceUrl: string            // News source URL
}
```

## 🔄 Adding New Data

To add new funding deals:

1. Open `/data/funding-data.ts`
2. Add a new object to the `fundingData` array
3. Follow the existing structure
4. Ensure unique `id` values

Example:
```typescript
{
  id: "108",
  company: "YourStartup",
  amount: 5000,  // $5M = 5000 thousands
  stage: "Series A",
  sectors: ["Fintech", "Payments"],
  investors: ["Sequoia Capital India", "Accel"],
  leadInvestor: "Sequoia Capital India",
  date: "2025-12-01",
  location: "Bangalore",
  description: "Description of the startup...",
  sourceUrl: "https://source.com/article"
}
```

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

No environment variables required for the current version. If you add external APIs or databases, create a `.env.local` file:

```bash
# .env.local
NEXT_PUBLIC_API_URL=your_api_url
```

## 🧪 Scripts

```bash
# Development
pnpm dev          # Start development server

# Build
pnpm build        # Create production build
pnpm start        # Start production server

# Linting
pnpm lint         # Run ESLint
```

## 📈 Performance

- **Initial Load**: < 2s on 3G
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 90+
- **Bundle Size**: Optimized with code splitting

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for all new files
- Follow existing naming conventions
- Run `pnpm lint` before committing
- Keep components small and focused

## 📝 License

This project is for educational and demonstration purposes.

## 🙏 Acknowledgments

- **Data Sources**: Entrackr, VCCircle, Inc42, YourStory
- **Design Inspiration**: Neo-brutalism trend
- **Icons**: Lucide React
- **Charts**: Recharts library

## 📞 Contact

For questions, suggestions, or data corrections:
- Create an issue on GitHub
- Contact via project website

## 🗺️ Roadmap

### Version 0.2.0
- [ ] Real-time data sync with news sources
- [ ] User accounts and saved searches
- [ ] Email notifications for new deals
- [ ] Advanced analytics (YoY growth, sector trends)
- [ ] Investor profiles and portfolios

### Version 0.3.0
- [ ] API endpoints for data access
- [ ] Dark mode
- [ ] Company profiles with funding history
- [ ] Comparison tools
- [ ] Mobile app (React Native)

## ⚠️ Known Issues

- None at this time

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Recharts](https://recharts.org/)

---

**Built with ❤️ for the Indian startup ecosystem**
