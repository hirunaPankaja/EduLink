# EduLink 📚

EduLink is a full-stack web application built using Spring Boot, React, and MySQL in a microservices architecture. It offers students an interactive platform to access study materials, take quizzes, and challenge themselves under different subjects.

---

## ✨ Features

- 📄 **PDF Viewer**: Access and view study materials in PDF format by subject.
- 🧠 **Quizzes**: Take multiple-choice quizzes to test your understanding.
- 🏆 **Self Challenges**: Attempt timed or untimed challenges for self-evaluation.
- 📚 **Subject Categorization**: Content organized under multiple subjects for easy navigation.
- 🔍 **Progress Tracking** *(optional/extendable)*: Track quiz scores and completed challenges.

---

## 🛠️ Tech Stack

### Backend (Microservices)
- **Java Spring Boot**
- **Spring Data JPA**
- **REST APIs**
- **MySQL Database**

### Frontend
- **ReactJS**
- **Axios** for API communication
- **TailwindCSS / Bootstrap** (optional styling library)

---

## ⚙️ Microservices Overview

- `user-service`: Handles authentication, user profiles
- `content-service`: Manages PDFs and study materials
- `quiz-service`: Manages quizzes and self-challenges
- `gateway-service`: API gateway for routing
- `discovery-service` *(Eureka/Consul optional)*: Service registry (if used)

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Node.js + npm
- MySQL server
- Maven or Gradle
- Docker *(optional)*

### Backend Setup

```bash
# Clone the project
git clone https://github.com/<your-username>/EduLink.git
cd EduLink/backend

# Run each microservice individually or via Docker
./mvnw spring-boot:run
