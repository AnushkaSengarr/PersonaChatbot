# Persona Chatbot

A full-stack chatbot web application that lets users chat with famous personas (Narendra Modi, Donald Trump, Anushka Sengar) and receive responses in their unique styles. Built with React, Vite, Tailwind CSS (frontend) and Node.js/Express (backend).

---

## Features

- Chat with multiple personas, each with their own personality and response style.
- Modern UI with Tailwind CSS.
- Messages are saved in localStorage per persona.
- Backend generates persona-style responses using prompt engineering.
- Responsive design for desktop and mobile.

---

## Tech Stack

**Frontend:**  
- React 19  
- Vite  
- Tailwind CSS  
- React Router  
- Axios  
- Lucide React Icons

**Backend:**  
- Node.js  
- Express  
- OpenRouter API (OpenAI-compatible client)  
- Custom persona prompts (see `constant.js`)

---


## Project Structure

```
personachatbot/
├── backend/
│   ├── constant.js         # Persona definitions and prompts
│   ├── server.js           # Express server
│   └── ...                 # Other backend files
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── ChatPage.jsx
│   │   │   └── Home.jsx
│   │   ├── constants/
│   │   │   └── constant.js # Persona data for frontend
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

---

## Deployment

You can deploy the frontend and backend separately on platforms like Render, Vercel, or Netlify.

- **Frontend:** Static deployment (Vite build)
- **Backend:** Node.js server deployment

### Backend environment variables

Set these variables in the backend environment before starting the server:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openrouter/free
OPENROUTER_SITE_URL=https://your-frontend-url.example
OPENROUTER_APP_NAME=Persona Chatbot
```

`OPENROUTER_MODEL`, `OPENROUTER_SITE_URL`, and `OPENROUTER_APP_NAME` are optional. You can set `OPENROUTER_MODEL` to any model available on OpenRouter.

---

## Customization

- To add more personas, edit `backend/constant.js` and `frontend/src/constants/constant.js`.
- Update persona images and descriptions as needed.

---


