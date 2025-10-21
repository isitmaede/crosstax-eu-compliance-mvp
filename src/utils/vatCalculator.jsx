import { VAT_RATES } from "../constants/vatRates";

/**
 * Core function to calculate cross-border EU VAT based on B2B/B2C rules.
 * @param {string} customerCountryCode - The two-letter code of the customer's country.
 * @param {boolean} isB2B - True if the customer is a VAT-registered business.
 * @param {number} saleAmount - The value of the sale before tax.
 * @returns {object} The calculation results (vatAmount, appliedRate, totalInvoice, legalNote).
 */
export const calculateVATTax = (customerCountryCode, isB2B, saleAmount) => {
  const amount = parseFloat(saleAmount) || 0;
  if (amount <= 0) {
    return null; // Return null if amount is invalid, handled by the form
  }

  let appliedRate = 0;
  let legalNote = "";

  // 1. Determine the applied VAT rate based on B2B/B2C
  if (isB2B) {
    // Rule B2B: Reverse Charge Mechanism (VAT is zero-rated on the invoice)
    appliedRate = 0;
    legalNote =
      "VAT Reverse Charge Applied (Art. 196, EU VAT Directive). The business buyer is liable for VAT.";
  } else {
    // Rule B2C (VAT MOSS/OSS): Destination Principle (rate of the customer's country)
    const rateData = VAT_RATES[customerCountryCode];
    if (rateData) {
      appliedRate = rateData.rate;
      legalNote = `Standard VAT rate of ${
        rateData.rate * 100
      }% applied (B2C, Destination Principle).`;
    } else {
      // Fallback in case country code is not in the list (should not happen with structured inputs)
      appliedRate = VAT_RATES.EE.rate; // Use seller's default rate
      legalNote = `Warning: Fallback VAT rate of ${
        VAT_RATES.EE.rate * 100
      }% applied.`;
    }
  }

  // 2. Perform Calculations
  const vatAmount = amount * appliedRate;

  return {
    vatAmount: parseFloat(vatAmount.toFixed(2)),
    appliedRate: appliedRate * 100,
    totalInvoice: parseFloat((amount + vatAmount).toFixed(2)),
    legalNote,
  };
};
