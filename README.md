# GyanSetu — Exploring the Essence of Every Faith

**Timeline:** Feb 2025 - Mar 2025
**Tech Stack:** MERN, Three.js, Tailwind CSS, OpenAI API, Firebase, Material UI, Vercel

---

## 🌍 Overview

GyanSetu is a Vedic literature preservation and cultural exploration platform that highlights wisdom across multiple religions — currently focusing on **Hinduism, Islam, Sikhism, and Christianity**. The platform combines modern web technologies, AI, and immersive 3D elements to create an engaging experience for users.

The vision of GyanSetu is to:

* Preserve ancient Vedic literature and other religious texts.
* Provide an **interactive, multi-faith learning environment**.
* Enable users to explore stories, music, events, and timelines from different faiths.
* Foster **cross-cultural understanding** using AI-powered storytelling and chatbots.

---

## ✨ Features

### 🔖 Landing Page

* Floating navigation bar with Home, Calendar, About, Contact, and Up buttons.
* Background looping video for an immersive entry experience.
* **3D models** (via Three.js) representing Hinduism, Islam, Sikhism, and Christianity with descriptions.
* FAQ-style section answering universal life questions (e.g., *“Why do bad things happen to good people?”*).

### 🔐 Authentication

* User sign-up/login integrated with **Firebase Authentication**.
* Redirects users to personalized religion-specific dashboards.

### 📅 Calendar & Events

* Floating pop-up calendar with alerts about upcoming events in the next 15 days.
* Provides **event significance** details when acknowledged.

### 📖 Religion-Specific Pages

* Common template for all religions (currently implemented for Hinduism; extendable to others).
* **Sections included:**

  * Video & thumbnail carousel with key concepts explained.
  * News updates related to the religion.
  * Music player with religious songs (20+ tracks).
  * Timeline of deities, avatars, and significant historical/religious events.

### 💬 AI Chatbot

* Neutral, unbiased chatbot built using **WordPress integration**.
* Answers faith-related questions as a universal guide.

### 📊 Dashboard Features

* **Profile Section** – placeholder frontend component.
* **Dashboard Modules:**

  * *Visit Places*: Suggested pilgrimage or significant locations.
  * *Talk to God*: Conversational feature where users can interact with deities using **Google Gemini API** + context framing.
  * *Quiz Module*: Users test their religious/cultural knowledge.
  * *Hanuman Chalisa*: Interactive verse-by-verse experience with:

    * Hindi to English translation.
    * Explanations in both languages for better understanding.

### 📚 AI Story Generator

* Built with **OpenAI API** + **Google Gemini API**.
* Users choose a religion and specific story.
* Story is generated and narrated via **Text-to-Speech (TTS)**.

---

## 🛠️ Tech Implementation

* **Frontend:** React (MERN stack), Tailwind CSS, Material UI, Three.js for 3D rendering.
* **Backend:** Node.js + Express.js.
* **Database:** MongoDB for storing users, events, and content.
* **Authentication:** Firebase Auth.
* **AI Models:** OpenAI API, Google Gemini API.
* **Deployment:** Hosted on Vercel.

---

## 🚀 Future Enhancements

* Expand to include more religions beyond the current four.
* Enhance profile management with backend integration.
* Add community discussion forums.
* Extend the timeline feature with more interactive visualizations.
* Build a multilingual support system for wider accessibility.

---

## 📂 Repository Structure

```
📦 GyanSetu
 ┣ 📂 frontend    # React + Tailwind + Three.js
 ┣ 📂 backend     # Node.js + Express + MongoDB
 ┣ 📄 README.md   # Project Documentation
 ┗ 📄 package.json
```

---

## 🔗 Links

* **Live Demo:** [Vercel Hosted Link](#)
* **GitHub Repo:** [Repository Link](#)

---

## 👨‍💻 Author

**Bhishma Dandekar (Uday Dandekar)**
Passionate about building AI-powered cultural and educational platforms that preserve ancient wisdom through modern technology.
