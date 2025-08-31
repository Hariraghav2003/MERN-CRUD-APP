
# MERN CRUD Dashboard 🚀

This project is a **MERN CRUD Dashboard** application that supports multiple databases:
- **MongoDB**
- **SQL**
- **DynamoDB (via Docker)**

It provides a **full-stack dashboard** with CRUD operations, API integration, and containerized database support.

---

## 📂 Project Structure

```
src/
├── backend/                # Node.js + Express backend
│   ├── config/             # DB configurations
│   ├── controller/         # Controllers for CRUD logic
│   ├── model/              # Database models
│   ├── routes/             # API routes
│   ├── tests/              # Unit/Integration tests
│   ├── Server.js           # Backend entry point
│   ├── package.json        # Backend dependencies
│   
│
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   ├── src/                # React source
│   │   ├── assets/         # Images, icons
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Dashboard pages
│   │   ├── style/          # CSS files
│   │   ├── App.js          # Main React app
│   │   └── index.js        # Entry point
│   ├── package.json        # Frontend dependencies
│   
│
├── docker-compose.yml      # Docker config (DynamoDB)
```

---

## ⚙️ Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Databases:**
  - MongoDB
  - SQL (PostgreSQL/MySQL support)
  - DynamoDB (via Docker)  
- **Containerization:** Docker  
- **Testing:** Jest  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/mern-crud-dashboard.git
cd mern-crud-dashboard
```

### 2. Setup Environment Variables

**Backend `.env`:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/dashboard
SQL_URI=postgres://user:password@localhost:5432/dashboard
DYNAMO_ENDPOINT=http://localhost:8000
```

**Frontend `.env`:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

### 3. Install Dependencies

#### Backend
```bash
cd src/backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

---

### 4. Run DynamoDB via Docker
```bash
docker-compose up -d
```

This will spin up **DynamoDB Local** on port `8000`.

---

### 5. Run the Application

#### Backend
```bash
cd src/backend
npm start
```

#### Frontend
```bash
cd ../frontend
npm start
```

---

## 📊 Features

- Dashboard UI with CRUD operations
- MongoDB + SQL + DynamoDB integration
- Dockerized DynamoDB
- API-based architecture
- Modular code structure

---

## 🐳 Docker Commands (DynamoDB)

Start DynamoDB:
```bash
docker-compose up --build -d
```

Stop containers:
```bash
docker-compose down
```

---

## 📩 License

Created by Hariraghav.S

---

## 📬 Contact

[![Email](https://img.shields.io/badge/email-hariraghava21s@gmail.com-blue?style=flat&logo=gmail)](mailto:hariraghava21s@gmail.com)

---

## 🌐 Connect with Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Hariraghav.S-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/hariraghav962003/)

Happy Coding! 🎯
