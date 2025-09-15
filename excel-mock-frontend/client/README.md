<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->

# 🤖 AI Interviewer (Excel Mock Interview Project)

An **AI-powered Interview Simulation** built with **React (frontend)** and **FastAPI (backend)**.  
The app simulates an interview process, asks both **MCQ and open-ended questions**, evaluates answers using **Gemini AI**, and provides a **detailed feedback report** at the end.

---

## 🚀 Features

- 🎬 Animated AI Interviewer introduction  
- 📝 Collects candidate details (Name, Age, Course)  
  - Conditional course input (extra field appears if "Other" is selected)  
- Open-ended (text answers)
- ⏳ Time-bound questions (default 60 seconds each)  
- ⏭️ Skip option if unanswered  
- ✅ Evaluation with Gemini AI (`grader.py`)  
- 📊 Final report with feedback & scores  

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- TailwindCSS
- Animated typing effect

**Backend:**
- FastAPI (Python)
- Pydantic for validation
- Gemini API for intelligent evaluation
- CORS support

---



