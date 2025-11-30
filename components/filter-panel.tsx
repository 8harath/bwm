"use client"

interface FilterPanelProps {
  sectors: string[]
  stages: string[]
  locations: string[]
  years: string[]
  selectedSectors: string[]
  setSelectedSectors: (s: string[]) => void
  selectedStages: string[]
  setSelectedStages: (s: string[]) => void
  selectedLocation: string
  setSelectedLocation: (l: string) => void
  selectedYears: string[]
  setSelectedYears: (y: string[]) => void
  fundingRange: [number, number]
  setFundingRange: (r: [number, number]) => void
  showUndisclosed: boolean
  setShowUndisclosed: (b: boolean) => void
}

export function FilterPanel({
  sectors,
  stages,
  locations,
  years,
  selectedSectors,
  setSelectedSectors,
  selectedStages,
  setSelectedStages,
  selectedLocation,
  setSelectedLocation,
  selectedYears,
  setSelectedYears,
  fundingRange,
  setFundingRange,
  showUndisclosed,
  setShowUndisclosed,
}: FilterPanelProps) {
  return (
    <div className="neo-border p-6 bg-white h-fit md:sticky md:top-24">
      <h3 className="font-bold text-lg uppercase mb-6 text-green-700">FILTERS</h3>

      {/* Sectors */}
      <div className="mb-8 pb-6 border-b-2 border-gray-200">
        <h4 className="font-bold text-sm uppercase mb-3">Sector</h4>
        <div className="space-y-2">
          {sectors.map((sector) => (
            <label key={sector} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSectors.includes(sector)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSectors([...selectedSectors, sector])
                  } else {
                    setSelectedSectors(selectedSectors.filter((s) => s !== sector))
                  }
                }}
                className="w-5 h-5 border-2 border-black cursor-pointer"
              />
              <span className="text-sm">{sector}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stages */}
      <div className="mb-8 pb-6 border-b-2 border-gray-200">
        <h4 className="font-bold text-sm uppercase mb-3">Stage</h4>
        <div className="space-y-2">
          {stages.map((stage) => (
            <label key={stage} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedStages.includes(stage)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedStages([...selectedStages, stage])
                  } else {
                    setSelectedStages(selectedStages.filter((s) => s !== stage))
                  }
                }}
                className="w-5 h-5 border-2 border-black cursor-pointer"
              />
              <span className="text-sm">{stage}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-8 pb-6 border-b-2 border-gray-200">
        <h4 className="font-bold text-sm uppercase mb-3">Location</h4>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full neo-border px-3 py-2 text-sm font-semibold bg-white text-black cursor-pointer"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Year Filter */}
      <div className="mb-8 pb-6 border-b-2 border-gray-200">
        <h4 className="font-bold text-sm uppercase mb-3">Year</h4>
        <div className="max-h-40 overflow-y-auto space-y-2">
          {years.map((year) => (
            <label key={year} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedYears.includes(year)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedYears([...selectedYears, year])
                  } else {
                    setSelectedYears(selectedYears.filter((y) => y !== year))
                  }
                }}
                className="w-5 h-5 border-2 border-black cursor-pointer"
              />
              <span className="text-sm">{year}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Funding Range */}
      <div className="mb-8 pb-6 border-b-2 border-gray-200">
        <h4 className="font-bold text-sm uppercase mb-3">Funding Range (₹Cr)</h4>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600">Min: ₹{fundingRange[0]}Cr</label>
            <input
              type="range"
              min="0"
              max="10000"
              step="10"
              value={fundingRange[0]}
              onChange={(e) => setFundingRange([Number(e.target.value), fundingRange[1]])}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Max: ₹{fundingRange[1]}Cr</label>
            <input
              type="range"
              min="0"
              max="10000"
              step="10"
              value={fundingRange[1]}
              onChange={(e) => setFundingRange([fundingRange[0], Number(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Undisclosed Amounts */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={showUndisclosed}
            onChange={(e) => setShowUndisclosed(e.target.checked)}
            className="w-5 h-5 border-2 border-black cursor-pointer"
          />
          <span className="text-sm font-semibold">Show Undisclosed Amounts</span>
        </label>
      </div>
    </div>
  )
}
