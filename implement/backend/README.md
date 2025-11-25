# ClarityExpense Backend

Backend API for ClarityExpense personal expense tracking system.

**Last Updated:** November 18, 2025  
**Status:** � Module B3 Complete (86% Complete)  
**Current Phase:** Module B3 Complete, Module B4 Next

---

## Technology Stack

- **Java**: 17+
- **Framework**: Spring Boot 3.2.0
- **Database**: MySQL 8.0+
- **Security**: Spring Security with JWT (pending implementation)
- **Build Tool**: Maven
- **Libraries**: Lombok, JJWT (JSON Web Tokens), Spring Data JPA

---

## Prerequisites

- JDK 17 or higher
- Maven 3.6+
- MySQL 8.0+ running on localhost:3306

---

## Project Structure

```
src/main/java/com/clarityexpense/
├── ClarityExpenseApplication.java     # Main Spring Boot application
│
├── entity/                            # JPA Entities (4 files) ✅
│   ├── User.java                      # UserDetails, Lombok
│   ├── Category.java                  # @ManyToOne with User
│   ├── Transaction.java               # Relations to User & Category
│   └── TransactionType.java           # Enum: INCOME, EXPENSE
│
├── repository/                        # Spring Data JPA (3 files) ✅
│   ├── UserRepository.java            # findByEmail, existsByEmail
│   ├── CategoryRepository.java        # findByUserId, custom queries
│   └── TransactionRepository.java     # Pagination, JPQL aggregations
│
├── dto/                               # Data Transfer Objects (7 files) ✅
│   ├── RegisterRequestDto.java        # User registration
│   ├── LoginRequestDto.java           # Authentication
│   ├── JwtResponseDto.java            # JWT token response
│   ├── CategoryDto.java               # Category data
│   ├── TransactionDto.java            # Transaction data
│   ├── BalanceDto.java                # Balance summary
│   └── CategoryExpenseDto.java        # Category expenses
│
├── service/                           # Business Logic (3 files) ✅
│   ├── CategoryService.java           # CRUD, RFN-02 validation
│   ├── TransactionService.java        # CRUD, security checks
│   └── DashboardService.java          # Balance, aggregations
│
├── security/                          # Security & JWT (4 files) ✅
│   ├── UserDetailsServiceImpl.java    # Load user from database
│   ├── JwtUtil.java                   # Generate & validate tokens
│   ├── JwtRequestFilter.java          # Intercept HTTP requests
│   └── SecurityConfig.java            # Security filter chain, CORS
│
└── controller/                        # REST Controllers (0/4 files) ⏳
    ├── AuthController.java            # PENDING
    ├── CategoryController.java        # PENDING
    ├── TransactionController.java     # PENDING
    └── DashboardController.java       # PENDING
```

**Legend:** ✅ Complete | ⏭️ Next | ⏳ Pending

---

## Implementation Progress

| Module | Description | Files | Status | Completion |
|--------|-------------|-------|--------|------------|
| **B1** | Configuration & Entities | 8/8 | ✅ Complete | 100% |
| **B2** | Repositories & Services | 13/13 | ✅ Complete | 100% |
| **B3** | Security & JWT | 4/4 | ✅ Complete | 100% |
| **B4** | REST Controllers | 0/4 | ⏭️ Next | 0% |
| **TOTAL** | **Backend Implementation** | **25/29** | � In Progress | **86%** |

---

## Database Setup

1. **Install MySQL 8.0+** (if not already installed)

2. **Start MySQL service:**
   ```bash
   # macOS (Homebrew)
   brew services start mysql
   
   # Linux
   sudo systemctl start mysql
   ```

3. **The application will automatically create the database** on first run:
   - Database name: `clarityexpense`
   - Username: `root` (configurable in `application.properties`)
   - Password: `root` (configurable in `application.properties`)

4. **Configuration** (optional):
   Edit `src/main/resources/application.properties` to change database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/clarityexpense?createDatabaseIfNotExist=true
   spring.datasource.username=root
   spring.datasource.password=root
   ```

---

## Running the Application

```bash
# Navigate to backend directory
cd implement/backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The API will be available at: `http://localhost:8080`

---

## API Endpoints

### Authentication (Public) - ⏳ PENDING (Module B4)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Categories (Protected) - ⏳ PENDING (Module B4)
- `GET /api/categories` - Get user's categories
- `POST /api/categories` - Create new category

### Transactions (Protected) - ⏳ PENDING (Module B4)
- `GET /api/transactions` - Get user's transactions (paginated)
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/{id}` - Update transaction
- `DELETE /api/transactions/{id}` - Delete transaction

### Dashboard (Protected) - ⏳ PENDING (Module B4)
- `GET /api/dashboard/balance` - Get balance summary
- `GET /api/dashboard/expenses-by-category` - Get expenses grouped by category

---

## Architecture

### Layer Flow

```
┌─────────────────────────────────────────────┐
│          Client (Frontend)                  │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│      Controller Layer (Module B4)           │ ⏳ PENDING
│  - AuthController                           │
│  - CategoryController                       │
│  - TransactionController                    │
│  - DashboardController                      │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│    Security Filter Chain (Module B3)        │ ✅ IMPLEMENTED
│  - JwtRequestFilter (validate token)        │
│  - SecurityConfig (CORS, permissions)       │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│      Service Layer (Module B2)              │ ✅ IMPLEMENTED
│  - CategoryService (business logic)         │
│  - TransactionService (validation, RFN-02)  │
│  - DashboardService (calculations)          │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│    Repository Layer (Module B2)             │ ✅ IMPLEMENTED
│  - UserRepository                           │
│  - CategoryRepository                       │
│  - TransactionRepository                    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│      Entity Layer (Module B1)               │ ✅ IMPLEMENTED
│  - User (UserDetails)                       │
│  - Category                                 │
│  - Transaction                              │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│         Database (MySQL)                    │ ✅ CONFIGURED
│  - users                                    │
│  - category                                 │
│  - transaction                              │
└─────────────────────────────────────────────┘
```

---

## Key Features Implemented

### 1. RFN-01: Stateless API with JWT ✅

Complete JWT authentication system:

```java
// JwtUtil - Token generation
public String generateToken(UserDetails userDetails) {
    return Jwts.builder()
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
}

// JwtRequestFilter - Token validation on each request
if (jwtUtil.validateToken(jwt, userDetails)) {
    UsernamePasswordAuthenticationToken authToken = 
        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    SecurityContextHolder.getContext().setAuthentication(authToken);
}
```

**Features:**
- ✅ Token generation with 24-hour expiration
- ✅ Token validation on every request
- ✅ Stateless session management
- ✅ BCrypt password encoding
- ✅ CORS configured for http://localhost:3000

### 2. RFN-02: Data Isolation & Security ✅

Every service validates that users can only access their own data:

```java
// Example from TransactionService
Category category = categoryRepository.findById(dto.getCategoryId())
    .orElseThrow(() -> new IllegalArgumentException("Category not found"));

// Security check: verify category belongs to authenticated user
if (!category.getUser().getId().equals(user.getId())) {
    log.warn("User {} attempted to use category {} owned by another user", 
            user.getEmail(), category.getId());
    throw new SecurityException("You can only use your own categories");
}
```

**Coverage:**
- ✅ CategoryService: Filters by userId
- ✅ TransactionService: Validates category ownership
- ✅ DashboardService: All calculations scoped to userId
- ✅ DashboardService: All calculations scoped to userId

### 3. RFN-05: English Code Standard ✅

All code follows English naming conventions:
- Class names: `TransactionService`, `CategoryDto`
- Method names: `createCategory`, `getBalance`
- Variables: `totalIncome`, `categoryName`
- Comments: "Calculate balance for user"
- Logs: "Creating transaction for user"
- Validation: "Category name is required"

### 4. Lombok Usage ✅

Reduces boilerplate code by approximately 60%:

```java
// Without Lombok: ~40 lines
// With Lombok: ~15 lines

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDto {
    private Long id;
    private BigDecimal amount;
    private String description;
    private LocalDate date;
    private TransactionType type;
    private Long categoryId;
    private String categoryName;
}
```

### 5. Advanced JPQL Queries ✅

Custom queries for complex operations:

```java
// Expenses grouped by category
@Query("SELECT t.category.name as categoryName, SUM(t.amount) as totalAmount " +
       "FROM Transaction t " +
       "WHERE t.user.id = :userId AND t.type = 'EXPENSE' " +
       "AND t.date BETWEEN :startDate AND :endDate " +
       "GROUP BY t.category.id, t.category.name " +
       "ORDER BY totalAmount DESC")
List<Object[]> findExpensesByCategoryForUser(...);
```

### 6. Pagination Support ✅

Efficient handling of large datasets:

```java
Page<Transaction> findByUserId(Long userId, Pageable pageable);
```

---

## Database Schema

Generated automatically by Hibernate (ddl-auto=update):

```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transaction (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(19,2) NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,
    type VARCHAR(255) NOT NULL,  -- 'INCOME' or 'EXPENSE'
    user_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
);
```

---

## Code Quality

### Validation
- ✅ Jakarta Validation on all DTOs
- ✅ `@NotBlank`, `@NotNull`, `@Email`, `@Positive`, `@Size`
- ✅ Custom business validation in services

### Transaction Management
- ✅ `@Transactional` on all modifying operations
- ✅ Read-only transactions for queries

### Logging
- ✅ SLF4J logging in all services
- ✅ Security warnings for unauthorized access attempts
- ✅ Operation tracking (create, update, fetch)

### Error Handling
- ✅ Meaningful exception messages
- ✅ `IllegalArgumentException` for validation errors
- ✅ `SecurityException` for unauthorized access

---

## Next Steps

### Module B4: REST Controllers (4 files) - ⏭️ NEXT
1. `AuthController.java` - `/api/auth/register`, `/api/auth/login`
2. `CategoryController.java` - `/api/categories`
3. `TransactionController.java` - `/api/transactions`
4. `DashboardController.java` - `/api/dashboard/*`

**Estimated:** 4 prompts, ~300 lines of code, then backend is 100% complete!

---

## Development Notes

- All code generated by AI (RFN-04)
- English naming conventions throughout (RFN-05)
- Data isolation enforced at service layer (RFN-02)
- MySQL dialect and drivers configured
- JWT tokens will expire after 24 hours (configured)
- CORS will allow requests from `http://localhost:3000` (Frontend)

---

## Troubleshooting

### MySQL Connection Issues
```bash
# Check if MySQL is running
mysql -u root -p

# Grant permissions if needed
GRANT ALL PRIVILEGES ON clarityexpense.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### Build Errors
```bash
# Clean and rebuild
mvn clean install -U

# Skip tests if needed
mvn clean install -DskipTests
```

---

**For project progress tracking, see:** `../../CHECKLIST.md`
