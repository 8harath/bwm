# Currency Configuration

## Updating USD to INR Conversion Rate

The funding data in SUDEVI is sourced in USD and converted to INR. As exchange rates fluctuate, you should update the conversion rate periodically to maintain accuracy.

### Current Rate
- **File:** `config/currency.js`
- **Current Rate:** 1 USD = ₹83.50 INR
- **Last Updated:** 2025-11-30

### How to Update

#### Step 1: Check Current Exchange Rate
Visit any reliable currency exchange site:
- https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=INR
- https://www.google.com/search?q=usd+to+inr

#### Step 2: Edit Configuration File
Open `config/currency.js` and update:

```javascript
module.exports = {
  USD_TO_INR: 84.25,  // Update this value
  LAST_UPDATED: '2025-12-15',  // Update this date
};
```

#### Step 3: Regenerate Funding Data
Run the data generation script:

```bash
npm run generate-data
```

This will:
- Re-parse all CSV files
- Apply the new conversion rate
- Generate updated `data/funding-data.ts`

#### Step 4: Restart Development Server
If the dev server is running:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Verification

After updating:
1. Visit http://localhost:3003/analytics
2. Check the yellow notice box at the top
3. Verify it shows your new rate and date
4. Check a few deal amounts to ensure they look correct

### Recommended Update Frequency

- **For Development:** Update monthly
- **For Production:** Update weekly or when rate changes significantly (>2%)

### Notes

- All amounts in the CSV files are in USD millions
- Conversion formula: `Amount (₹ Cr) = Amount ($M) × USD_TO_INR ÷ 10`
- Example: $2M at rate 83.50 = ₹16.7 Cr

### Need Help?

If you encounter issues after updating the rate:
1. Check that `config/currency.js` has valid JavaScript syntax
2. Ensure `USD_TO_INR` is a number (not a string)
3. Run `npm run generate-data` to see any error messages
4. Verify the generated file `data/funding-data.ts` has the correct comment at the top
