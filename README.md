# Chatterly 💬

Chatterly is a real-time chat web application designed to enable instant, secure, and engaging communication between users. It supports both one-on-one and group conversations with modern messaging features powered by WebSockets.


## 🚀 Overview

Chatterly is built as a full-stack web application that allows users to register, authenticate securely, and communicate in real time. By leveraging **WebSockets**, the platform ensures instant message delivery, while a robust backend architecture guarantees scalability and maintainability.

The application is designed with a clean user interface and focuses on performance, security, and a smooth user experience.


## ✨ Key Features

### 🔐 User Registration & Authentication

* Secure user signup and login
* JWT-based authentication
* Private access to chat history

### ⚡ Real-time Messaging

* Instant message delivery using **Socket.io**
* Low-latency communication

### 👤 One-on-One & 👥 Group Chats

* Private one-on-one conversations
* Create, join, and leave group chats

### 📝 Message Formatting

* Text messages
* Emojis 😄
* Image and multimedia sharing

### 🔔 Notifications

* Push notifications for new messages
* Alerts even when the app is not in the foreground

### 🟢 User Presence

* Online / Offline status indicators
* Real-time presence updates
* Typing indicators

### 🕘 Message History

* Persistent chat history
* Lazy loading of older messages on scroll

### 🔍 Search Functionality

* Find users and group chats easily

### 📎 File Uploads

* Share images and documents
* Files stored securely in cloud storage

### 😊 Emoji Picker

* Built-in emoji picker for expressive conversations


## 🛠 Technology Stack

### Frontend

* **Angular**
* HTML5
* CSS3
* TypeScript

### Backend

* **Node.js**
* **Express.js**
* RESTful APIs

### Database

* **MongoDB** (NoSQL)
* Stores user data, chat rooms, and message history

### Real-time Communication

* **Socket.io** (WebSockets)

### Authentication

* **JWT (JSON Web Tokens)**

### File Storage

* Cloud storage (AWS S3)

### Deployment

* **Frontend:** Vercel
* **Backend:** Render


## 🧱 Backend Architecture

The backend follows the **Service–Repository Pattern**, ensuring:

* Clear separation of concerns
* Better scalability
* Easier testing and maintenance

**Architecture Layers:**

* **Controller Layer** – Handles HTTP requests & responses
* **Service Layer** – Business logic
* **Repository Layer** – Database interactions
* **Socket Layer** – Real-time communication logic


## 📦 Installation & Setup

### Prerequisites

* Node.js
* MongoDB
* Angular CLI

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
ng serve
```

---

## 🔐 Environment Variables

Create a `.env` file in the backend directory with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SOCKET_PORT=your_socket_port
CLOUD_STORAGE_KEY=your_key
```


## 📌 Future Enhancements

* Message reactions
* Read receipts
* Voice & video calls
* End-to-end encryption
* Message pinning

---

## 👨‍💻 Author

**Muhammed Adeeb**
Full Stack Developer

---

## 📄 License

This project is for educational purposes and personal use.

---

✨ *Chatterly – Connect. Chat. Instantly.*
