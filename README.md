# Apply Pannu Bro – Digital Service Management Platform

A Full Stack MERN web application built for Apply Pannu Bro to manage digital services, process orders, and handle customer queries.

## Tech Stack
* **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Zustand, i18next
* **Backend**: Node.js, Express, MongoDB (Atlas), Mongoose
* **Authentication**: JWT, bcryptjs
* **Utilities**: PDFKit (Invoices), Nodemailer (Emails), WhatsApp Click-to-Chat

## Getting Started Locally

### Prerequisites
* Node.js (v18+)
* MongoDB URI (Atlas or Local)

### Backend Setup
1. Navigate to the \`backend\` folder:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a \`.env\` file using \`.env.example\` as a template.
4. Start the server:
   \`\`\`bash
   npm start
   # or for development
   npm run dev
   \`\`\`

### Frontend Setup
1. Navigate to the \`frontend\` folder:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Deployment Instructions

### 1. MongoDB Atlas
1. Create a cluster on MongoDB Atlas.
2. In Network Access, allow all IPs (\`0.0.0.0/0\`).
3. Get the Connection String and add it to your Backend \`.env\` as \`MONGODB_URI\`.

### 2. Backend (Render / Railway)
1. Push your code to GitHub.
2. Create a new Web Service on Render or Railway.
3. Connect your GitHub repository.
4. Root Directory: \`backend\`
5. Build Command: \`npm install\`
6. Start Command: \`node server.js\`
7. Add Environment Variables (\`MONGODB_URI\`, \`JWT_SECRET\`, etc.).
8. Deploy!

### 3. Frontend (Vercel)
1. Create a new project on Vercel.
2. Connect your GitHub repository.
3. Root Directory: \`frontend\`
4. Framework Preset: Vite
5. Add Environment Variables (e.g., \`VITE_API_URL\` pointing to your Render backend URL).
6. Deploy!
