'use client' ;
import { useState, useMemo } from 'react';
import { CUSTOMER_COUNTRIES, VAT_RATES } from '../constants/vatRates';
import { calculateVATTax } from '../utils/vatCalculator';

// You would use this hook later for Supabase interaction
// import useSupabaseLogger from '../hooks/useSupabaseLogger'; 

export default function VatForm() {
  const [customerCountry, setCustomerCountry] = useState('FR');
  const [isB2B, setIsB2B] = useState(false);
  const [saleAmount, setSaleAmount] = useState(''); // Use string for input flexibility
  const [isLoading, setIsLoading] = useState(false);

  // ⚡ Performance/Optimization: Only recalculate when key inputs change
  const result = useMemo(() => {
    return calculateVATTax(customerCountry, isB2B, saleAmount);
  }, [customerCountry, isB2B, saleAmount]);

  // const { logTransaction } = useSupabaseLogger(); // Hook to be used later

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!result) return; // Prevent submission if validation fails (amount is zero/invalid)
    
    setIsLoading(true);

    // ***********************************************
   //  Future Supabase Logging Here
    // await logTransaction(result); 
    // ***********************************************

    // Simulating API latency (improves UX/demonstrates readiness)
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
  };

  const isFormValid = saleAmount > 0;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg border border-blue-200">
      
      {/* Seller Country (Fixed for Context) */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Seller Location</label>
        <div className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed">
          {VAT_RATES.EE.name} ({VAT_RATES.EE.rate * 100}%)
        </div>
        <p className="text-xs text-gray-500 mt-1">
          The seller is assumed to be an Estonian-based company (VAT ID required).
        </p>
      </div>

      {/* 1. Customer Country */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Country (Place of Supply)</label>
        <select
          value={customerCountry}
          onChange={(e) => setCustomerCountry(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {CUSTOMER_COUNTRIES.map(code => (
            <option key={code} value={code}>
              {VAT_RATES[code].name}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          The VAT rate is based on the customer's country for B2C sales.
        </p>
      </div>

      {/* 2. Sale Amount */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Sale Amount (€)</label>
        <input
          type="number"
          placeholder="0.00"
          value={saleAmount}
          onChange={(e) => setSaleAmount(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          min="0"
        />
        {!isFormValid && saleAmount.length > 0 && (
            <p className="text-xs text-red-500 mt-1">⚠️ Please enter a valid sale amount greater than 0.</p>
        )}
      </div>
      
      {/* 3. B2B Checkbox */}
      <div className="mb-8 flex items-center">
        <input
          type="checkbox"
          id="isB2B"
          checked={isB2B}
          onChange={(e) => setIsB2B(e.target.checked)}
          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="isB2B" className="ml-2 block text-base text-gray-800 font-medium">
          Is the Customer a VAT-Registered Business? (B2B)
        </label>
        {/* 🪄 UX/UI: Tooltip concept */}
        <span 
            className="ml-2 text-sm text-gray-500 cursor-help" 
            title="Checking this enables the Reverse Charge mechanism (0% VAT on invoice)."
        >
            ℹ️
        </span>
      </div>

      {/* Button and Result Area */}
      <button
        type="submit"
        disabled={isLoading || !isFormValid}
        className={`w-full p-4 rounded-xl font-bold transition duration-300 
          ${isLoading || !isFormValid
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
          }`}
      >
        {isLoading ? 'Processing Compliance Report...' : 'GENERATE COMPLIANCE RESULT'}
      </button>

      {/* Result Display */}
      {result && isFormValid && (
        <div className="mt-8 p-6 bg-green-50 rounded-xl border-l-4 border-green-500 text-gray-800 shadow-inner">
          <h2 className="text-xl font-bold mb-3 text-green-700">✅ Compliance Report Generated</h2>
          
          <div className="grid grid-cols-2 gap-y-2 mb-4 text-lg">
            <p className="font-medium text-gray-600">Applied VAT Rate:</p>
            <p className="font-bold text-right">{result.appliedRate}%</p>
            
            <p className="font-medium text-gray-600">Calculated VAT:</p>
            <p className="font-bold text-right">€{result.vatAmount}</p>

            <p className="font-medium text-gray-600 border-t pt-2">Total Invoice Amount:</p>
            <p className="font-bold text-right text-blue-600 border-t pt-2">€{result.totalInvoice}</p>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700">
              <span className="font-bold">Legal Note Required on Invoice:</span>
              <br />
              <span className="italic text-green-800 text-base">"{result.legalNote}"</span>
            </p>
          </div>
        </div>
      )}
    </form>
  );
}