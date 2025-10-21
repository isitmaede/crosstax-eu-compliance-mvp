# 🇪🇺 CrossTax MVP: EU Cross-Border VAT Compliance Calculator

![GitHub language count](https://img.shields.io/github/languages/count/isitmaede/crosstax-eu-compliance-mvp)
![GitHub top language](https://img.shields.io/github/languages/top/isitmaede/crosstax-eu-compliance-mvp)
[![Vercel Deployment Status](https://vercel-badge.vercel.app/api/your-vercel-domain-name/status)]() 
## 🌟 Overview: The RegTech Solution

CrossTax is a Minimum Viable Product (MVP) designed to solve the complexity of European Union Cross-Border VAT for digital companies and e-commerce businesses operating from Estonia.

This tool acts as a Compliance Engine, instantly applying the correct VAT rate based on the Place of Supply (B2B vs. B2C) and generating the required Legal Note for the invoice.

---

## ✨ Key Innovations for Scalability

The architecture is explicitly designed to meet the requirements of a fast-growing RegTech startup.

1.  Decoupled Architecture: Business logic is entirely separated from data and presentation, ensuring high testability and maintainability.
    * src/utils/vatCalculator.js: Contains the core, pure, rule-based VAT calculation logic.
    * src/constants/vatRates.js: Simulates a database layer (easily migrated to Supabase/PostgreSQL).
2.  Compliance-Focused Output: The core value proposition is not just the number, but the automatic generation of the VAT Legal Note, critical for auditing and compliance (e.g., Reverse Charge text).
3.  Performance Optimization: Utilizes React's useMemo hook within the form component (VatForm.jsx) to ensure real-time calculation efficiency and a superior user experience.

---

## 💡 Core VAT Logic Implemented

The application successfully implements the two primary EU VAT rules:

| Rule | Description | VAT Rate Applied |
| :--- | :--- | :--- |
| B2C (Business to Consumer) | Destination Principle: VAT is charged at the rate of the *customer's* country (using the VAT OSS scheme). | Variable (e.g., France 20%, Germany 19%). |
| B2B (Business to Business) | Reverse Charge Mechanism: VAT is legally shifted to the business buyer, allowing the seller to zero-rate the supply. | 0% on the invoice. |

---

## 🛠 Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| Framework | Next.js (React) | Modern, scalable architecture for a production-ready application. |
| Styling | Tailwind CSS | Utility-first framework for rapid, maintainable UI development. |
| Language | JavaScript (ES6+) | Core language for the application logic. |
| Deployment | Vercel | Seamless, zero-configuration hosting (as an MVP demo). |
| Future Integration | Supabase | Planned integration for dynamic rate fetching, user management, and transaction logging (SaaS monetization). |

---

## 🚀 Getting Started (Local Development)

To run the project locally, follow these steps:

1.  Clone the Repository:
        git clone [https://github.com/isitmaede/crosstax-eu-compliance-mvp.git](https://github.com/isitmaede/crosstax-eu-compliance-mvp.git)
    cd crosstax-eu-compliance-mvp
    
2.  Install Dependencies:
        npm install
    # or yarn install
    
3.  Run the Development Server:
        npm run dev
    
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🛣 Future Roadmap (Next Steps for SaaS)

This MVP provides the foundation. The next phases involve:

1.  Database Integration: Migrating VAT rates from src/constants/vatRates.js to a hosted database (Supabase) to enable dynamic, instant rate updates.
2.  Authentication/Subscriptions: Implementing user login and a paid subscription model (SaaS) based on transaction volume.
3.  API Endpoints: Developing a simple API for integration into other accounting systems.

---

## 🧑‍💻 Founder & Contact

* Name : Mohammed Ahmad Younes
 
* Role: Founder & Lead Developer

* Email: mohammedahmadyounes@gmail.com
