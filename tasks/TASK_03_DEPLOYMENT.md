# TASK 03: Deployment with Docker Containers

## Overview
Containerization strategy for ClarityExpense using Docker and Docker Compose to deploy the complete stack (MySQL database, Spring Boot backend, Next.js frontend).

---

## Objectives

1. Create Dockerfile for Spring Boot backend
2. Create Dockerfile for Next.js frontend
3. Configure docker-compose.yml for orchestration
4. Setup MySQL container with persistent data
5. Configure networking between containers
6. Implement environment-based configuration
7. Optimize images for production

---

## Module D1: Database Container

### Container Configuration
- **Image:** `mysql:8.0`
- **Container Name:** `clarityexpense-db`
- **Port Mapping:** `3306:3306`
- **Environment Variables:**
  - `MYSQL_ROOT_PASSWORD`: Root password
  - `MYSQL_DATABASE`: clarityexpense
  - `MYSQL_USER`: clarityapp
  - `MYSQL_PASSWORD`: User password
- **Volume:** `mysql-data:/var/lib/mysql` (persistent storage)
- **Health Check:** MySQL connection validation

### Files to Create
1. None (uses official MySQL image)

---

## Module D2: Backend Container

### Dockerfile Strategy
- **Base Image:** `eclipse-temurin:17-jre-alpine` (production)
- **Build Stage:** Maven build with `maven:3.8-eclipse-temurin-17`
- **Multi-stage Build:** Yes (reduce image size)

### Dockerfile Steps
1. **Build Stage:**
   - Copy pom.xml and download dependencies
   - Copy source code
   - Run `mvn clean package -DskipTests`
   
2. **Runtime Stage:**
   - Copy JAR from build stage
   - Expose port 8080
   - Define ENTRYPOINT with java -jar

### Container Configuration
- **Container Name:** `clarityexpense-backend`
- **Port Mapping:** `8080:8080`
- **Environment Variables:**
  - `SPRING_DATASOURCE_URL`: jdbc:mysql://clarityexpense-db:3306/clarityexpense
  - `SPRING_DATASOURCE_USERNAME`: clarityapp
  - `SPRING_DATASOURCE_PASSWORD`: ${DB_PASSWORD}
  - `JWT_SECRET`: ${JWT_SECRET}
- **Depends On:** clarityexpense-db
- **Health Check:** HTTP GET on /actuator/health

### Files to Create
1. `backend/Dockerfile` - Multi-stage build configuration
2. `backend/.dockerignore` - Exclude target/, .git/, etc.

---

## Module D3: Frontend Container

### Dockerfile Strategy
- **Base Image:** `node:18-alpine` (production)
- **Build Stage:** Node build with npm/yarn
- **Multi-stage Build:** Yes (reduce image size)

### Dockerfile Steps
1. **Dependencies Stage:**
   - Copy package.json and package-lock.json
   - Run `npm ci --only=production`
   
2. **Build Stage:**
   - Copy source code
   - Run `npm run build`
   
3. **Runtime Stage:**
   - Copy built files and node_modules
   - Expose port 3000
   - Define CMD with `npm start`

### Container Configuration
- **Container Name:** `clarityexpense-frontend`
- **Port Mapping:** `3000:3000`
- **Environment Variables:**
  - `NEXT_PUBLIC_API_URL`: http://localhost:8080
  - `NODE_ENV`: production
- **Depends On:** clarityexpense-backend

### Files to Create
1. `frontend/Dockerfile` - Multi-stage build configuration
2. `frontend/.dockerignore` - Exclude node_modules/, .next/, etc.

---

## Module D4: Docker Compose Orchestration

### docker-compose.yml Structure

```yaml
version: '3.8'

services:
  db:
    # MySQL configuration
  
  backend:
    # Spring Boot configuration
  
  frontend:
    # Next.js configuration

volumes:
  mysql-data:

networks:
  clarityexpense-network:
```

### Network Configuration
- **Network Name:** `clarityexpense-network`
- **Driver:** bridge
- **All services connected to same network**

### Volume Configuration
- **mysql-data:** Persistent storage for MySQL database

### Files to Create
1. `docker-compose.yml` - Root level orchestration
2. `.env.example` - Environment variables template

---

## Prompts Structure

### Prompt 14: Database Container Configuration
**Output:** Update `docker-compose.yml` with MySQL service

**Tasks:**
- Define MySQL 8.0 service
- Configure environment variables
- Setup persistent volume
- Add health check
- Configure restart policy

### Prompt 15: Backend Dockerfile
**Output:** `backend/Dockerfile`, `backend/.dockerignore`

**Tasks:**
- Create multi-stage Dockerfile
- Stage 1: Maven build
- Stage 2: Runtime with JRE
- Optimize layer caching
- Add .dockerignore

### Prompt 16: Backend Docker Compose Integration
**Output:** Update `docker-compose.yml` with backend service

**Tasks:**
- Define backend service
- Link to database service
- Configure environment variables
- Add health check
- Setup depends_on with condition

### Prompt 17: Frontend Dockerfile
**Output:** `frontend/Dockerfile`, `frontend/.dockerignore`

**Tasks:**
- Create multi-stage Dockerfile
- Stage 1: Dependencies
- Stage 2: Build
- Stage 3: Runtime
- Add .dockerignore

### Prompt 18: Frontend Docker Compose Integration
**Output:** Update `docker-compose.yml` with frontend service, `.env.example`

**Tasks:**
- Define frontend service
- Link to backend service
- Configure environment variables
- Complete network configuration
- Create .env.example template
- Add usage instructions in comments

---

## Environment Variables

### Required Variables (.env file)

```env
# Database
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_PASSWORD=your_app_password

# Backend
JWT_SECRET=your_base64_jwt_secret

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## Docker Commands Reference

### Build and Start All Services
```bash
docker-compose up -d --build
```

### View Logs
```bash
docker-compose logs -f
docker-compose logs -f backend
```

### Stop All Services
```bash
docker-compose down
```

### Stop and Remove Volumes
```bash
docker-compose down -v
```

### Rebuild Specific Service
```bash
docker-compose up -d --build backend
```

---

## Image Size Optimization

### Backend Image
- **Without optimization:** ~500MB
- **With multi-stage + Alpine:** ~200MB
- **Techniques:**
  - Use Alpine-based JRE
  - Multi-stage build
  - Layer caching optimization
  - Exclude unnecessary files

### Frontend Image
- **Without optimization:** ~1.2GB
- **With multi-stage + Alpine:** ~300MB
- **Techniques:**
  - Use Alpine Node
  - Multi-stage build
  - Production dependencies only
  - Next.js standalone output

---

## Health Checks

### Database Health Check
```yaml
healthcheck:
  test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
  interval: 10s
  timeout: 5s
  retries: 5
```

### Backend Health Check
```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:8080/actuator/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

---

## Production Considerations

### Security
- [ ] Use Docker secrets for sensitive data
- [ ] Don't hardcode passwords in docker-compose.yml
- [ ] Use environment variables from .env file
- [ ] Implement SSL/TLS certificates
- [ ] Configure firewall rules

### Performance
- [ ] Configure JVM memory limits for backend
- [ ] Set Node.js memory limits for frontend
- [ ] Implement connection pooling for database
- [ ] Use Redis for session storage (future enhancement)

### Monitoring
- [ ] Add Spring Boot Actuator endpoints
- [ ] Configure logging drivers
- [ ] Implement health checks for all services
- [ ] Consider Prometheus + Grafana for metrics

---

## Deployment Workflow

1. **Development:**
   ```bash
   docker-compose up -d
   ```

2. **Stop Development:**
   ```bash
   docker-compose down
   ```

3. **Production Build:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

4. **View Status:**
   ```bash
   docker-compose ps
   ```

5. **Access Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - MySQL: localhost:3306

---

## Validation Checklist

- [ ] All containers start successfully
- [ ] Database initializes with correct schema
- [ ] Backend connects to database
- [ ] Frontend connects to backend API
- [ ] Health checks pass for all services
- [ ] Data persists after container restart
- [ ] Environment variables load correctly
- [ ] Networks allow inter-service communication
- [ ] Port mappings work as expected
- [ ] Logs are accessible via docker-compose logs

---

## Files Summary

**Total Files to Create:** 5

1. `docker-compose.yml` - Orchestration configuration
2. `backend/Dockerfile` - Backend container image
3. `backend/.dockerignore` - Backend build exclusions
4. `frontend/Dockerfile` - Frontend container image
5. `frontend/.dockerignore` - Frontend build exclusions
6. `.env.example` - Environment variables template

---

**Estimated Time:** 2-3 hours  
**Complexity:** Medium  
**Dependencies:** Backend and Frontend implementations must be complete
