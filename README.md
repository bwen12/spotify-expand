# 😱 Very Cool Spotify Clone

A Spotify clone built for uploading unreleased/leaked music. Features include real-time chat, activity sharing, and full support for uploading albums and tracks. 

-  PLAY ALL SONGS FREE 🥶🥶🥶
-  Upload songs and create custom albums within the admin page
-  **Real-time chat** via **Socket.IO** 
-  **Real-time Activity sharing** (see who’s online & what they’re listening to)
-  very cool UI

Live Demo: [spotify-expand.onrender.com](https://spotify-expand.onrender.com)


## Screenshot

<img width="750" height="934" alt="image" src="https://github.com/user-attachments/assets/2ca511a8-205e-4d68-97df-85847176c02a" />


## Tech Stack

- **Frontend:** React + TypeScript + TailwindCSS + Zustand + ShadCN UI + Framer Motion  
- **Backend:** Node.js + Express + MongoDB + Mongoose + Multer  
- **Real-time:** Socket.IO  
- **Auth:** Clerk (dev mode only – limited by free hosting domain)
- **Media Storage:** Cloudinary  
- **Deployment:** Render (for both frontend and backend)


## Deployment

The app is fully deployed and live on Render for demo use:

- **Frontend:** [spotify-expand.onrender.com](https://spotify-expand.onrender.com)
- **Backend/API:** Render auto-deployment using a monorepo with build scripts


## ⚙️ Setup

To run locally:

```bash
git clone https://github.com/bwen12/spotify-expand.git
cd Spotify-Clone

# Frontend setup
cd frontend/spotify-clone
npm install
npm run dev

# Backend setup
cd backend
npm install
npm run dev
