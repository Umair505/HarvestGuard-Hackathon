🌾GolaGhor

A Tech-Based Solution to Reduce Food Loss in Bangladesh.

HarvestGuard (locally known as Golaghor) is a smart agricultural platform designed to empower farmers with data-driven insights, weather forecasts, and AI-powered crop health analysis. Our mission aligns with SDG 12.3 to halve global food waste by providing farmers with the tools they need to secure their harvest.

🌐 Live Demo: https://golaghor.vercel.app/

🚀 Key Features

1. Hyper-Local Weather & Advisory 🌦️

Real-time weather updates based on the farmer's Upazila (OpenWeatherMap API).

Smart actionable advice in Bangla (e.g., "Heavy rain expected tomorrow, cover your paddy stack").

2. AI Crop Health Scanner (Visual RAG) 🤖

Upload photos of crops or pests.

Gemini AI analyzes the image to identify diseases (e.g., "Blast Disease") or freshness status ("Fresh" vs "Rotten").

Provides instant, localized treatment plans in Bangla.

3. Smart Alert System (Logic Engine) ⚠️

A decision engine that combines Weather + Crop Type + Storage Condition.

Triggers critical alerts (e.g., Heat Shock risk for potatoes) and simulates SMS notifications.

4. Community Risk Map 🗺️

Interactive map showing regional risk levels (High/Medium/Low) using Leaflet.js.

Anonymized data points to foster community awareness without compromising privacy.

5. Farmer Dashboard 📊

Offline-first architecture using localStorage with auto-sync capabilities.

Manage harvest batches, track inventory weight, and monitor storage types.

Gamification system with achievement badges.

🛠️ Tech Stack

Frontend

Framework: Next.js 14 (App Router)

Language: JavaScript (ES6+) / JSX

Styling: Tailwind CSS

UI Components: Shadcn UI (Radix Primitives)

Animations: Framer Motion

Icons: Lucide React

Maps: React Leaflet & Leaflet.js

Backend & Database

API: Next.js API Routes (Serverless functions)

Database: MongoDB (via native MongoDB driver)

Authentication: NextAuth.js (Session management)

AI & Third-Party APIs

Generative AI: Google Gemini API (Model: gemini-1.5-flash)

Weather Data: OpenWeatherMap API

💻 Getting Started

Follow these steps to set up the project locally on your machine.

Prerequisites

Node.js (Version 18 or higher recommended)

MongoDB (Local or Atlas connection string)

1. Clone the Repository

git clone [https://github.com/your-username/harvest-guard.git](https://github.com/your-username/harvest-guard.git)
cd harvest-guard


2. Install Dependencies

npm install
# or
yarn install


3. Configure Environment Variables

Create a .env.local file in the root directory and add the following keys:

# Database Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/harvestguard

# Authentication (NextAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_random_string

# External APIs
OPENWEATHER_API_KEY=your_openweather_api_key
GEMINI_API_KEY=your_google_gemini_api_key
HUGGINGFACE_API_KEY=your_huggingface_key_if_used


4. Initialize Shadcn UI (If adding new components)

The project is already pre-configured, but if you need to add new UI components:

npx shadcn@latest add [component-name]


5. Run the Development Server

npm run dev


Open http://localhost:3000 with your browser to see the application.

📂 Project Structure

├── app/                  # Next.js App Router
│   ├── api/              # Backend API routes (Auth, Batches, AI)
│   ├── dashboard/        # Farmer dashboard page
│   ├── pest-detect/      # AI Scanner feature
│   ├── risk-map/         # Interactive Map feature
│   └── page.js           # Landing page
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI primitives (Button, Card, etc.)
│   ├── Navbar.jsx        # Responsive navigation
│   └── FarmerDashboard.jsx # Main Dashboard Logic
├── lib/                  # Utility functions & DB connection
│   └── dbConnect.js      # MongoDB connection helper
└── public/               # Static assets (images, logos)


🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request for any feature enhancements or bug fixes.

📜 License

This project is licensed under the MIT License.

<p align="center">
Made with ❤️ for the Farmers of Bangladesh 🇧🇩
</p>
