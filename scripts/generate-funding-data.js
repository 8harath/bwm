const fs = require('fs');
const path = require('path');

// Read all CSV files from funding_data directory
function getAllCSVFiles() {
  const fundingDataDir = path.join(__dirname, '../funding_data');
  const weekFolders = fs.readdirSync(fundingDataDir);
  const allDeals = [];

  weekFolders.forEach((folder) => {
    const folderPath = path.join(fundingDataDir, folder);
    const stats = fs.statSync(folderPath);

    if (stats.isDirectory()) {
      const csvPath = path.join(folderPath, 'data.csv');

      if (fs.existsSync(csvPath)) {
        const csvContent = fs.readFileSync(csvPath, 'utf-8');
        const deals = parseCSV(csvContent, folder);
        allDeals.push(...deals);
      }
    }
  });

  return allDeals;
}

// Parse CSV content
function parseCSV(content, weekFolder) {
  const lines = content.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.trim().replace(/^\uFEFF/, '')); // Remove BOM
  const deals = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);

    if (values.length >= headers.length) {
      const deal = {};
      headers.forEach((header, index) => {
        deal[header] = values[index] ? values[index].trim() : '';
      });

      // Transform to app format
      const transformed = transformDeal(deal, `${weekFolder}-${i}`, weekFolder);
      if (transformed) {
        deals.push(transformed);
      }
    }
  }

  return deals;
}

// Parse CSV line handling quoted values
function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current);

  return values;
}

// Transform deal to match app structure
function transformDeal(deal, id, weekFolder) {
  // Extract company name from URL or use as is
  let companyName = deal.Company || '';

  // Skip if company is missing
  if (!companyName || companyName.trim() === '') {
    return null;
  }

  // If company is a URL, extract domain name
  if (companyName.startsWith('http')) {
    try {
      const url = new URL(companyName);
      companyName = url.hostname.replace('www.', '').split('.')[0];
      companyName = companyName.charAt(0).toUpperCase() + companyName.slice(1);
    } catch (e) {
      return null;
    }
  }

  let amount = parseFloat(deal['Amount ($M)'] || deal.Amount || '0');

  // Handle NaN from parseFloat
  if (isNaN(amount)) {
    amount = 0;
  }

  const stage = deal.Series || deal.Stage || 'Not Disclosed';
  const sector = deal.Sector || 'General';
  const location = deal.HQ || deal.Location || 'India';
  const date = formatDate(deal.Date);
  const sourceUrl = deal.Source || deal.Company || '';

  // Skip if amount is 0 or missing AND series is not provided
  if (amount === 0 && stage === 'Not Disclosed') {
    return null;
  }

  return {
    id,
    company: companyName,
    amount: amount * 1000, // Convert $M to $K for consistency
    stage,
    sectors: [sector],
    investors: ['Not Disclosed'], // CSV doesn't have investor data
    leadInvestor: 'Not Disclosed',
    date,
    location,
    description: `${companyName} raised ${amount > 0 ? '$' + amount + 'M' : 'funding'} in ${stage} ${stage !== 'Not Disclosed' ? 'round' : ''}.`,
    sourceUrl,
    weekFolder
  };
}

// Format date to YYYY-MM-DD
function formatDate(dateStr) {
  if (!dateStr) return new Date().toISOString().split('T')[0];

  try {
    // Handle DD/MM/YYYY format
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  } catch (e) {
    console.error('Error parsing date:', dateStr);
  }

  return new Date().toISOString().split('T')[0];
}

// Generate TypeScript file
function generateTypeScriptFile(deals) {
  const sortedDeals = deals.sort((a, b) => new Date(b.date) - new Date(a.date));

  const content = `// Auto-generated from CSV files in funding_data/
// Last updated: ${new Date().toISOString()}
// Total deals: ${sortedDeals.length}

export interface FundingDeal {
  id: string;
  company: string;
  amount: number;
  stage: string;
  sectors: string[];
  investors: string[];
  leadInvestor: string;
  date: string;
  location: string;
  description: string;
  sourceUrl: string;
  weekFolder: string;
}

export const fundingData: FundingDeal[] = ${JSON.stringify(sortedDeals, null, 2)};
`;

  const outputPath = path.join(__dirname, '../data/funding-data.ts');
  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`✅ Generated funding-data.ts with ${sortedDeals.length} deals`);
}

// Main execution
try {
  console.log('📊 Reading CSV files from funding_data/...');
  const deals = getAllCSVFiles();
  console.log(`📈 Parsed ${deals.length} deals`);

  console.log('💾 Generating TypeScript file...');
  generateTypeScriptFile(deals);

  console.log('✨ Done!');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
