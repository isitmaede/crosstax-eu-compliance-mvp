// src/pages/index.js
import VatForm from '../components/VatForm';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        🇪🇺 CrossTax: EU VAT Compliance MVP
      </h1>
      
      <VatForm />
      
      <footer className="mt-8 text-sm text-gray-500">
        <p>Built with Next.js, React, and Tailwind CSS. Demonstrating RegTech scalability.</p>
      </footer>
    </div>
  );
}