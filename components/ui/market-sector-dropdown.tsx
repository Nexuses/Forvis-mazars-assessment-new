"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Market sector options based on the image
const MARKET_SECTORS = [
  "Accommodation",
  "Accounting, tax preparation, bookkeeping, and payroll services",
  "Administration of economic programs",
  "Administration of environmental quality programs",
  "Administration of housing programs, urban planning, and community development",
  "Administration of human resource programs",
  "Administrative and support services",
  "Aerospace product and parts manufacturing",
  "Air transportation",
  "Ambulatory health care services",
  "Amusement, gambling, and recreation industries",
  "Animal production and aquaculture",
  "Apparel manufacturing",
  "Beverage and tobacco product manufacturing",
  "Broadcasting except internet -",
  "Building material and garden equipment and supplies dealers",
  "Clothing and clothing accessories stores",
  "Commercial banking",
  "Computer and electronic product manufacturing",
  "Computer systems design and related services",
  "Construction of buildings",
  "Consumer lending",
  "Couriers and messengers",
  "Credit card issuing",
  "Credit unions",
  "Crop production",
  "Data processing, hosting, and related services",
  "Direct insurance except life, health, and medical - carriers",
  "Direct life, health, and medical insurance carriers",
  "Educational services",
  "Electric power generation, transmission and distribution",
  "Electrical equipment, appliance, and component manufacturing",
  "Electronics and appliance stores",
  "Executive, legislative, and other general government support",
  "Fabricated metal product manufacturing",
  "Financial transactions processing, reserve, and clearinghouse activities",
  "Fishing, hunting and trapping",
  "Food and beverage stores",
  "Food manufacturing",
  "Food services and drinking places",
  "Forestry and logging",
  "Furniture and home furnishings stores",
  "Furniture and related product manufacturing",
  "Gasoline stations",
  "General merchandise stores",
  "Health and personal care stores",
  "Heavy and civil engineering construction",
  "Hospitals",
  "Insurance and employee benefit funds",
  "Justice, public order, and safety activities",
  "Leather and allied product manufacturing",
  "Legal services",
  "Lessors of nonfinancial intangible assets except copyrighted works -",
  "Machinery manufacturing",
  "Management of companies and enterprises",
  "Management, scientific, and technical consulting services",
  "Merchant wholesalers, durable goods",
  "Merchant wholesalers, nondurable goods",
  "Mining except oil and gas",
  "Miscellaneous manufacturing",
  "Miscellaneous store retailers",
  "Monetary authorities - central bank",
  "Mortgage and nonmortgage loan brokers",
  "Motion picture and sound recording industries",
  "Motor vehicle and parts dealers",
  "Motor vehicle manufacturing",
  "Museums, historical sites, and similar institutions",
  "National security and international affairs",
  "Natural gas distribution",
  "Non-metallic mineral product manufacturing",
  "Nonstore retailers",
  "Nursing and residential care facilities",
  "Oil and gas extraction",
  "Other chemical product and preparation manufacturing",
  "Other credit intermediation and related activities",
  "Other information services",
  "Other insurance related activities",
  "Other investment pools and funds",
  "Other professional, scientific, and technical services",
  "Other transportation equipment manufacturing",
  "Paper manufacturing",
  "Performing arts, spectator sports, and related industries",
  "Personal and laundry services",
  "Petroleum and coal products manufacturing",
  "Pharmaceutical and medicine manufacturing",
  "Pipeline transportation",
  "Plastics and rubber products manufacturing",
  "Postal service",
  "Primary metal manufacturing",
  "Printing and related support activities",
  "Private households",
  "Publishing industries except internet",
  "Rail transportation",
  "Real estate",
  "Reinsurance carriers",
  "Religious, grantmaking, civic, professional, and similar organisation",
  "Rental and leasing services",
  "Repair and maintenance",
  "Sales financing",
  "Savings institutions",
  "Scenic and sightseeing transportation",
  "Securities, commodity contracts, and other financial investments and related activities",
  "Social assistance",
  "Space research and technology",
  "Specialty trade contractors",
  "Sporting goods, hobby, musical instrument, and book stores",
  "Support activities for agriculture and forestry",
  "Support activities for mining",
  "Support activities for transportation",
  "Telecommunications",
  "Textile mills",
  "Textile product mills",
  "Transit and ground passenger transportation",
  "Truck transportation",
  "Warehousing and storage",
  "Waste management and remediation services",
  "Water transportation",
  "Water, sewage and other systems",
  "Wholesale electronic markets and agents and brokers",
  "Wood product manufacturing"
];

interface MarketSectorDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function MarketSectorDropdown({ value, onChange, className, placeholder = "Please select an option" }: MarketSectorDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter market sectors based on search term
  const filteredMarketSectors = MARKET_SECTORS.filter(marketSector =>
    marketSector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleMarketSectorSelect = (marketSector: string) => {
    onChange(marketSector);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={handleDropdownToggle}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 text-left border border-gray-300 rounded-md bg-white",
          "focus:outline-none focus:ring-2 focus:ring-[#3B3FA1] focus:border-[#3B3FA1]",
          "hover:border-gray-400 transition-colors duration-200"
        )}
      >
        <span className={cn(value ? "text-gray-900" : "text-gray-500")}>
          {value || placeholder}
        </span>
        <ChevronDown className={cn(
          "h-4 w-4 text-gray-400 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search market sectors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B3FA1] focus:border-[#3B3FA1]"
              />
            </div>
          </div>

          {/* Market Sectors List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredMarketSectors.length > 0 ? (
              <>
                {filteredMarketSectors.map((marketSector) => (
                  <button
                    key={marketSector}
                    type="button"
                    onClick={() => handleMarketSectorSelect(marketSector)}
                    className={cn(
                      "w-full px-4 py-3 text-left text-sm hover:bg-gray-100 transition-colors duration-150",
                      "flex items-center justify-between",
                      value === marketSector && "bg-[#3B3FA1]/10 text-[#3B3FA1] font-medium"
                    )}
                  >
                    <span>{marketSector}</span>
                    {value === marketSector && (
                      <Check className="h-4 w-4 text-[#3B3FA1]" />
                    )}
                  </button>
                ))}
                <div className="h-2"></div>
              </>
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">
                No market sectors found matching &quot;{searchTerm}&quot;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 