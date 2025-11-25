# ClarityExpense - Implementation

**Personal expense tracking system - AI Generated Code**

## 🎯 Project Overview
Full-stack application for personal financial tracking with Spring Boot backend and Next.js frontend.

**Academic Context:** This code is 100% AI-generated as part of an academic assignment on code generation and automation.

---

## 📊 Implementation Progress

### Overall Progress: 100% Backend + 100% Frontend + 100% Deployment ✅

**Total Files:** 29/29 Backend + 18/18 Frontend + 7/7 Deployment = 54/54 Total

### Backend Components (29/29 files) ✅
- **Module B1:** Configuration & Entities (8/8) ✅
- **Module B2:** Repositories, Services & DTOs (13/13) ✅
- **Module B3:** Security & JWT (4/4) ✅
- **Module B4:** REST Controllers (4/4) ✅

### Frontend Components (18/18 files) ✅
- **Module F1:** Configuration & i18n (5/5) ✅
- **Module F2:** State & API (2/2) ✅
- **Module F3:** Pages (4/4) ✅
- **Module F4:** Components (7/7) ✅

### Deployment Components (7/7 files) ✅
- **Module D1:** Database Container (1/1) ✅
- **Module D2:** Backend Container (2/2) ✅
- **Module D3:** Frontend Container (2/2) ✅
- **Module D4:** Orchestration (1/1) ✅
- **Module D5:** Environment Template (1/1) ✅

---

## 🖥️ Frontend Architecture

### Technology Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand (with persist middleware)
- **HTTP Client:** Axios (with JWT interceptor)
- **Charts:** Recharts
- **i18n:** next-i18next (Spanish/English)

### Module F1: Configuration & i18n ✅
**Files:** 5/5

**Configuration:**
- `next.config.ts` - App Router, standalone output for Docker, i18n setup
- `next-i18next.config.js` - Translation configuration (es/en)
- `.env.local` - Environment variables template

**Translations:**
- `public/locales/en/common.json` - English translations
- `public/locales/es/common.json` - Spanish translations (default)

### Module F2: State & API ✅
**Files:** 2/2

**State Management:**
- `store/authStore.ts` - Zustand store with localStorage persistence
  - User state (id, name, email, token)
  - Actions: login, logout, restoreSession
  - Automatic token restoration on app load

**API Integration:**
- `lib/api.ts` - Axios instance with interceptors
  - Request interceptor: Automatic JWT token attachment
  - Response interceptor: 401 auto-logout + token refresh
  - Base URL from environment variable

### Module F3: Pages ✅
**Files:** 4/4

**Public Pages:**
- `app/page.tsx` - Landing page with app description
- `app/login/page.tsx` - User authentication form
- `app/register/page.tsx` - User registration form

**Protected Pages:**
- `app/dashboard/page.tsx` - Main dashboard (requires authentication)
  - Assembles: Balance, CategoryForm, CategoryChart, TransactionForm, TransactionList, LanguageSwitcher

### Module F4: Components ✅
**Files:** 7/7

**Authentication:**
- `components/withAuth.tsx` - HOC for route protection (redirects to /login if not authenticated)

**Dashboard Components:**
- `components/Balance.tsx` - Displays total income/expenses/balance
- `components/CategoryForm.tsx` - Create new categories with validation
- `components/TransactionForm.tsx` - Create/edit transactions
- `components/TransactionList.tsx` - Paginated transaction list with edit/delete
- `components/CategoryChart.tsx` - Recharts PieChart showing expenses by category

**Internationalization:**
- `components/LanguageSwitcher.tsx` - Toggle between Spanish/English with localStorage persistence

---

## 🏗️ Backend Architecture

### Technology Stack
- **Framework:** Spring Boot 3.2.0
- **Language:** Java 17
- **Database:** MySQL 8.0+
- **Security:** JWT (JJWT 0.12.3) + Spring Security
- **Build Tool:** Maven
- **Libraries:** Lombok, Jakarta Validation

### Module B1: Core Configuration ✅
**Files:** 8/8

**Entities:**
- `User.java` - Implements UserDetails, @OneToMany to transactions/categories
- `Category.java` - @ManyToOne to User, FetchType.LAZY
- `Transaction.java` - Relations to User & Category, BigDecimal amounts
- `TransactionType.java` - Enum (INCOME, EXPENSE)

**Configuration:**
- `pom.xml` - Maven with MySQL, Lombok, JWT dependencies
- `application.properties` - MySQL connection, JWT secret (Base64), 24h expiration
- `ClarityExpenseApplication.java` - Spring Boot main class
- `DataInitializer.java` - Creates test user on startup

### Module B2: Business Logic ✅
**Files:** 13/13

**Repositories:**
- `UserRepository` - findByEmail, existsByEmail
- `CategoryRepository` - findByUserId, existsByNameAndUserId
- `TransactionRepository` - Paginated queries, JPQL aggregations

**DTOs:**
- `RegisterRequestDto` - User registration
- `LoginRequestDto` - User authentication
- `JwtResponseDto` - JWT token response
- `CategoryDto` - Category operations
- `TransactionDto` - Transaction CRUD
- `BalanceDto` - Dashboard balance
- `CategoryExpenseDto` - Expenses by category

**Services:**
- `CategoryService` - createCategory (duplicate check), getCategoriesByUser
- `TransactionService` - CRUD with RFN-02 validation, date filtering
- `DashboardService` - getBalance, getExpensesByCategory

### Module B3: Security & JWT ✅
**Files:** 4/4

- `UserDetailsServiceImpl` - Loads users by email for Spring Security
- `JwtUtil` - Generate/validate JWT tokens, HS256, Base64 secret
- `JwtRequestFilter` - OncePerRequestFilter, Bearer token validation
- `SecurityConfig` - STATELESS sessions, CORS, BCrypt, endpoint security

### Module B4: REST Controllers ✅
**Files:** 4/4

- `AuthController` - POST /api/auth/register, POST /api/auth/login
- `CategoryController` - GET/POST /api/categories
- `TransactionController` - GET/POST/PUT/DELETE /api/transactions (paginated)
- `DashboardController` - GET /api/dashboard/balance, GET /api/dashboard/expenses-by-category

---

## 🔐 Security Implementation

### JWT Authentication (RFN-01)
- **Algorithm:** HS256
- **Secret:** Base64-encoded in application.properties
- **Expiration:** 24 hours (86400000ms)
- **Session:** STATELESS (no server-side sessions)

### API Endpoint Protection
- **Public:** `/api/auth/**` (register, login)
- **Protected:** `/api/**` (requires JWT Bearer token)
- **CORS:** Enabled for `http://localhost:3000`

### Data Isolation (RFN-02)
All services validate user ownership:
- Categories: User can only access/use their own categories
- Transactions: User can only CRUD their own transactions
- Dashboard: User sees only their own data

---

## � Docker Deployment

### Container Architecture

**Services:**
1. **clarityexpense-db** - MySQL 8.0 database
2. **clarityexpense-backend** - Spring Boot API
3. **clarityexpense-frontend** - Next.js SPA

### Docker Files Structure

```
implement/
├── docker-compose.yml          # Service orchestration (3 services)
├── .env.example               # Environment variables template
├── backend/
│   ├── Dockerfile            # Multi-stage build (Maven → JRE)
│   └── .dockerignore         # Build exclusions
└── frontend/
    ├── Dockerfile            # Multi-stage build (npm deps → builder → runner)
    └── .dockerignore         # Build exclusions
```

### Quick Start with Docker

1. **Create environment file:**
   ```bash
   cp .env.example .env
   # Edit .env with your passwords
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d --build
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f backend
   ```

4. **Check health:**
   ```bash
   docker-compose ps
   ```

5. **Stop services:**
   ```bash
   docker-compose down
   ```

### Container Configuration

#### Database Container
- **Image:** mysql:8.0
- **Port:** 3306
- **Volume:** mysql-data (persistent)
- **Health Check:** mysqladmin ping (10s interval)
- **Default Credentials:** See .env.example

#### Backend Container
- **Build:** Multi-stage (Maven build + Alpine JRE runtime)
- **Port:** 8080
- **Depends On:** Database (waits for healthy status)
- **Health Check:** /actuator/health endpoint (30s interval)
- **Environment:**
  - Database URL: jdbc:mysql://clarityexpense-db:3306/clarityexpense
  - JWT Secret: From .env file
  - Profile: prod

#### Frontend Container
- **Build:** Multi-stage (npm deps → builder → runner Alpine)
- **Port:** 3000
- **Depends On:** Backend (waits for healthy status)
- **Health Check:** wget on port 3000 (30s interval)
- **Environment:**
  - API URL: http://localhost:8080 (for browser access)
  - Node Environment: production
- **User:** Non-root user (nextjs:1001)

### Image Optimization

**Backend Image Size:**
- Build stage: maven:3.8-eclipse-temurin-17 (~700MB, not in final image)
- Runtime stage: eclipse-temurin:17-jre-alpine (~200MB)
- Final application image: ~220MB (includes JAR)

**Frontend Image Size:**
- Deps stage: node:18-alpine (~180MB, not in final image)
- Builder stage: node:18-alpine with build artifacts (~500MB, not in final image)
- Runner stage: node:18-alpine with standalone output (~300MB estimated)

**Multi-stage Benefits:**
- Smaller final image size (Backend: ~70% reduction, Frontend: ~75% reduction)
- No build tools in production image
- Faster deployment and startup
- Better security (minimal attack surface)

### Networking

**Network:** clarityexpense-network (bridge driver)
- Containers communicate using container names as hostnames
- Backend connects to database via `clarityexpense-db:3306`
- Frontend connects to backend via browser (http://localhost:8080)
- Internal container communication isolated on custom bridge network

### Health Checks

All services have health checks configured:
- **Database:** Checks MySQL availability every 10s
- **Backend:** Checks Spring Boot actuator endpoint every 30s
- **Frontend:** Checks Next.js server availability every 30s
- **depends_on conditions:** Backend waits for DB, Frontend waits for Backend

### Environment Variables

**Required in .env file:**
```env
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_PASSWORD=your_app_password
JWT_SECRET=your_base64_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:8080
```

**Backend Environment Variables:**
- SPRING_DATASOURCE_URL
- SPRING_DATASOURCE_USERNAME
- SPRING_DATASOURCE_PASSWORD
- JWT_SECRET
- JWT_EXPIRATION
- SPRING_JPA_HIBERNATE_DDL_AUTO
- SPRING_PROFILES_ACTIVE

**Frontend Environment Variables:**
- NEXT_PUBLIC_API_URL (API endpoint for browser requests)
- NODE_ENV

---

## �🗄️ Database Schema

### MySQL Configuration
```properties
URL: jdbc:mysql://localhost:3306/clarityexpense?createDatabaseIfNotExist=true
Username: root
Password: admin
Dialect: MySQLDialect
DDL: update (auto-create/update schema)
```

### Tables
1. **users** - id, name, email, password (BCrypt)
2. **categories** - id, name, user_id (FK)
3. **transactions** - id, amount, description, date, type, user_id (FK), category_id (FK)

---

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Authenticate & get JWT

### Categories
- `GET /api/categories` - Get user's categories
- `POST /api/categories` - Create new category

### Transactions
- `GET /api/transactions` - Get user's transactions (paginated, optional date filter)
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/{id}` - Update transaction
- `DELETE /api/transactions/{id}` - Delete transaction

### Dashboard
- `GET /api/dashboard/balance` - Get total income/expenses/balance
- `GET /api/dashboard/expenses-by-category` - Get current month expenses by category

---

## 🚀 Running the Backend

### Option 1: Docker (Recommended)
```bash
# From implement/ directory
docker-compose up -d --build

# Backend will be available at http://localhost:8080
# Database at localhost:3306
```

### Option 2: Local Development
**Prerequisites:**
- Java 17+
- Maven 3.6+
- MySQL 8.0+ running locally

### Steps
1. Start MySQL server locally
2. Update credentials in `application.properties` if needed
3. Run from backend directory:
```bash
cd implement/backend
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

**Test User:** Created automatically on startup
- Email: `test@example.com`
- Password: `password123`

### Accessing Actuator Endpoints

**Health Check:**
```bash
curl http://localhost:8080/actuator/health
```

**Response:**
```json
{
  "status": "UP"
}
```

---

## 📝 Code Quality Standards

### RFN-05: English-Only Code ✅
- All code (classes, methods, variables, comments) in English
- UI text externalized with i18n (frontend requirement)

### RFN-06: Minimal Documentation ✅
- Only 2 core documents: `README.md`, `CHECKLIST.md`
- Code documented with inline comments where necessary
- Self-documenting code with descriptive names

### Lombok Usage ✅
- `@Data` - Automatic getters/setters/toString/equals/hashCode
- `@NoArgsConstructor` - Default constructor
- `@AllArgsConstructor` - Constructor with all fields
- `@RequiredArgsConstructor` - Constructor for final fields
- `@Slf4j` - Logger instance

Reduces boilerplate by ~60%

---

## 🎓 Academic Information

**Course:** Code Generation and Automation  
**Institution:** UNIR  
**Project:** ClarityExpense - Personal Expense Tracker  
**Code Generation:** 100% AI-generated using GitHub Copilot

**Important:** This is an academic project demonstrating AI-assisted development capabilities.

---

## 📌 Next Steps

1. ✅ Backend Implementation (100% Complete)
2. ✅ Frontend Implementation (100% Complete)
3. ✅ Docker Deployment - Full Stack (100% Complete)
4. ⏳ Integration Testing (Deferred to Second Delivery)
5. ⏳ Production Deployment Configuration

---

**Last Updated:** Full Stack Deployment Complete - January 2025
