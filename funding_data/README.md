# Funding Data

This directory contains weekly funding data for Indian startups organized by week and quarter.

## Structure

```
funding_data/
├── W1 Q1 FY25/
│   └── data.csv
├── W1 Q2 FY25/
│   └── data.csv
├── W2 Q1 FY25/
│   └── data.csv
...
```

## CSV Format

Each `data.csv` file contains the following columns:
- **Company**: Company website URL
- **Amount ($M)**: Funding amount in millions USD
- **Date**: Date of funding announcement (DD/MM/YYYY)
- **HQ**: Headquarters location
- **Sector**: Business sector/category
- **Series**: Funding stage (Seed, Series A, Series B, etc.)
- **Source**: News article URL

## Data Integration

The CSV files are automatically parsed and integrated into the frontend application during build time.

### How it works:

1. **Data Generation Script**: `scripts/generate-funding-data.js`
   - Reads all CSV files from `funding_data/`
   - Parses and validates the data
   - Generates `data/funding-data.ts` with TypeScript types

2. **Automatic Build Integration**:
   ```bash
   npm run generate-data  # Manually generate data
   npm run dev           # Auto-generates data before dev server
   npm run build         # Auto-generates data before production build
   ```

3. **Usage in Frontend**:
   ```typescript
   import { fundingData } from '@/data/funding-data'

   // Access all funding deals
   const allDeals = fundingData

   // Filter by sector
   const fintechDeals = fundingData.filter(deal =>
     deal.sectors.includes('Fintech')
   )
   ```

## Adding New Data

To add new weekly funding data:

1. Create a new folder: `funding_data/W[X] Q[Y] FY[Z]/`
2. Add your CSV file as: `data.csv`
3. Ensure CSV follows the format above
4. Run `npm run generate-data` to regenerate the TypeScript file

## Data Stats

- **Total Folders**: 100 weeks
- **Total Deals**: ~1316 validated deals
- **Date Range**: January 2024 - November 2025
- **Auto-generated**: `data/funding-data.ts`
