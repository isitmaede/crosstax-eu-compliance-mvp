// src/constants/vatRates.js

// Represents the data structure that would be fetched from Supabase
// Key: Country Code (ISO 3166-1 alpha-2)
export const VAT_RATES = {
  EE: { name: 'Estonia', rate: 0.22 }, // Seller/Default rate
  DE: { name: 'Germany', rate: 0.19 },
  FR: { name: 'France', rate: 0.20 },
  NL: { name: 'Netherlands', rate: 0.21 },
  ES: { name: 'Spain', rate: 0.21 },
  IT: { name: 'Italy', rate: 0.22 }, // Added for scalability example
};

// List of countries available as *Customer* locations
// Filter out countries that might not be relevant as a customer for the MVP
export const CUSTOMER_COUNTRIES = Object.keys(VAT_RATES)
  .filter(code => code !== 'EE');