# TAREA 01: Generación del Backend (Spring Boot)

Esta sección es una guía prescriptiva para dirigir al asistente de IA. El desarrollo debe ser **modular e incremental**. Se debe generar cada pieza, probarla (en la medida de lo posible) y luego usarla como contexto para generar la siguiente.

**IMPORTANTE - RFN-06:** 
- ❌ NO crear archivos de documentación adicionales (STATUS.md, REVIEW.md, etc.)
- ✅ Actualizar `README.md` del backend con cada avance
- ✅ Marcar tareas completadas en `CHECKLIST.md` raíz del proyecto

## 3.1. Módulo B1: Proyecto, Configuración y Entidades JPA

El fundamento del backend.

### Prompt 1 (Proyecto)

"Actúa como un desarrollador Java senior experto en Spring Boot. Genera un archivo `pom.xml` (Maven) para un proyecto Spring Boot 3.2+ con Java 17. El proyecto debe incluir las siguientes dependencias: 
- `spring-boot-starter-web` (para API REST)
- `spring-boot-starter-data-jpa` (para datos)
- `spring-boot-starter-security` (para seguridad)
- el driver de `mysql-connector-java` (para MySQL)
- `lombok` (para reducir el código repetitivo)

Además, incluye las dependencias de `io.jsonwebtoken` necesarias para JWT: `jjwt-api`, `jjwt-impl` y `jjwt-jackson`."

### Prompt 2 (Configuración)

"Genera el contenido del archivo `application.properties`. Debe incluir las configuraciones para la conexión a una base de datos MySQL: `spring.datasource.url`, `spring.datasource.username` y `spring.datasource.password`. Establece `spring.jpa.hibernate.ddl-auto` en `update` para el desarrollo y configura el dialecto de MySQL."

### Prompt 3 (Entidades)

"Genera las entidades JPA (Java Persistence API) utilizando anotaciones de Lombok (@Data, @NoArgsConstructor, @AllArgsConstructor) para reducir código repetitivo. Sigue estas especificaciones y relaciones exactas:

**Entidad User**: Debe tener `id` (Long, PK), `name` (String), `email` (String, único) y `password` (String). Esta entidad debe implementar la interfaz `UserDetails` de Spring Security para integrarse con la autenticación. Usa Lombok para generar getters, setters y constructores.

**Entidad Category**: Debe tener `id` (Long, PK) y `name` (String). Debe tener una relación `@ManyToOne` con User, indicando que un usuario puede tener muchas categorías. Usa Lombok para reducir código repetitivo.

**Entidad Transaction**: Debe tener `id` (Long, PK), `amount` (BigDecimal), `description` (String), `date` (LocalDate) y un enum llamado `TransactionType` (con valores INCOME, EXPENSE). Debe tener una relación `@ManyToOne` con User y una relación `@ManyToOne` con Category."

### Tabla 3.1: Modelo de Datos (Entidades JPA y Relaciones)

Esta tabla define la fuente de verdad para el Prompt 3.

| Entidad | Campo | Tipo de Dato | Anotaciones JPA / Spring | Relación |
|---------|-------|--------------|--------------------------|----------|
| **User** | id | Long | @Id, @GeneratedValue | (PK) |
| | name | String | @NotBlank | |
| | email | String | @Column(unique=true), @Email | |
| | password | String | @NotBlank | |
| | transactions | List\<Transaction\> | @OneToMany(mappedBy="user") | User (1) → Transaction (N) |
| | categories | List\<Category\> | @OneToMany(mappedBy="user") | User (1) → Category (N) |
| **Category** | id | Long | @Id, @GeneratedValue | (PK) |
| | name | String | @NotBlank | |
| | user | User | @ManyToOne, @JoinColumn(name="user_id") | Category (N) → User (1) |
| **Transaction** | id | Long | @Id, @GeneratedValue | (PK) |
| | amount | BigDecimal | @NotNull | |
| | description | String | | |
| | date | LocalDate | @NotNull | |
| | type | TransactionType | @Enumerated(EnumType.STRING) | (Enum: INCOME, EXPENSE) |
| | user | User | @ManyToOne, @JoinColumn(name="user_id") | Transaction (N) → User (1) |
| | category | Category | @ManyToOne, @JoinColumn(name="category_id") | Transaction (N) → Category (1) |

## 3.2. Módulo B2: Repositorios y Servicios (CRUD)

Construyendo la lógica de acceso a datos y de negocio.

### Prompt 4 (Repositorios)

"Genera las interfaces de Spring Data JPA (Repositorios) para las entidades User, Category y Transaction.

- **UserRepository** debe extender `JpaRepository` e incluir el método `Optional<User> findByEmail(String email)`.
- **CategoryRepository** debe extender `JpaRepository` e incluir el método `List<Category> findByUserId(Long userId)`.
- **TransactionRepository** debe extender `JpaRepository` e incluir el método `List<Transaction> findByUserId(Long userId)` (o una versión paginada: `Page<Transaction> findByUserId(Long userId, Pageable pageable)`)."

### Prompt 5 (Servicios)

"Genera la capa de servicio (@Service).

- Crea **CategoryService** con métodos `createCategory(CategoryDto data, User user)` y `getCategoriesByUser(User user)`.
- Crea **TransactionService** con métodos `createTransaction(TransactionDto data, User user)` y `getTransactionsByUser(User user, Pageable pageable)`.

Todos los métodos de servicio que modifican datos (como `createTransaction`) deben estar anotados con `@Transactional` para asegurar la atomicidad."

## 3.3. Módulo B3: Seguridad (Spring Security y JWT)

Este es el módulo más complejo y requiere una secuencia de prompts precisa.

### Prompt 6 (UserDetailsService)

"Genera una clase `UserDetailsServiceImpl` que implemente la interfaz `UserDetailsService` de Spring Security. Debe inyectar `UserRepository` y sobreescribir el método `loadUserByUsername(String username)`, usándolo para buscar al usuario por email (llamando a `findByEmail`)."

### Prompt 7 (Utilidades JWT)

"Genera una clase de utilidad `JwtUtil`. Esta clase debe tener métodos para: 
- `String generateToken(UserDetails userDetails)` (para crear el token)
- `boolean validateToken(String token, UserDetails userDetails)` (para validarlo)
- `String extractUsername(String token)` (para obtener el email del token)

Utiliza una clave secreta (secret key) para firmar los tokens."

### Prompt 8 (Filtro JWT)

"Genera una clase de filtro llamada `JwtRequestFilter` que extienda `OncePerRequestFilter`. Dentro del método `doFilterInternal`, debe:

1. Extraer el token JWT del encabezado `Authorization`.
2. Verificar que el encabezado comience con `Bearer `.
3. Extraer el nombre de usuario (email) usando `JwtUtil`.
4. Validar el token usando `JwtUtil`.
5. Si el token es válido, cargar los `UserDetails` (usando `UserDetailsServiceImpl`) y establecer la autenticación en el `SecurityContextHolder`."

### Prompt 9 (Configuración de Seguridad)

"Genera la clase de configuración de seguridad principal (`SecurityConfig`). Esta clase debe estar anotada con `@Configuration` y `@EnableWebSecurity`. Dentro de esta clase:

- Define un bean para `PasswordEncoder` que devuelva `BCryptPasswordEncoder`.
- Define un bean para `AuthenticationManager`.
- Define el bean principal `SecurityFilterChain`. Este prompt es crítico:
  - Dentro del `SecurityFilterChain`, deshabilita CSRF (`csrf -> csrf.disable()`).
  - Configura la gestión de sesión para que sea STATELESS (`sessionManagement -> session.sessionCreationPolicy(SecurityCreationPolicy.STATELESS)`).
  - Configura la autorización de solicitudes (`authorizeHttpRequests`): los endpoints `/api/auth/**` deben ser públicos (`permitAll()`). Todos los demás endpoints (`/api/**`) deben requerir autenticación (`authenticated()`).
  - Añade el `JwtRequestFilter` (del Prompt 8) en la cadena de filtros, antes del filtro `UsernamePasswordAuthenticationFilter`.
  - Configura CORS para permitir solicitudes desde http://localhost:3000 (el cliente Next.js)."

## 3.4. Módulo B4: Exposición de la API REST (Controladores)

La capa final que consume el frontend.

### Prompt 10 (AuthController)

"Genera un `@RestController` llamado `AuthController` mapeado a `/api/auth`.

- **POST /register**: Debe aceptar un DTO de registro, encriptar la contraseña usando el `PasswordEncoder`, guardar el nuevo `User` y devolver una respuesta de éxito (ej. 201 Created).
- **POST /login**: Debe aceptar un DTO de login (email, password). Usar `AuthenticationManager` para autenticar. Si tiene éxito, generar un token JWT usando `JwtUtil` y devolverlo en una respuesta DTO (ej. `JwtResponse(String token)`)."

### Prompt 11 (TransactionController)

"Genera un `@RestController` llamado `TransactionController` mapeado a `/api/transactions`.

Este controlador debe estar protegido (requiere autenticación).

- **GET /**: Debe obtener todas las transacciones del usuario autenticado (paginadas).
- **POST /**: Debe aceptar un DTO de transacción, crear la nueva transacción y devolver 201 Created.

**Directiva de Seguridad Crítica (RFN-02)**: En todos los métodos de este controlador, el `User` autenticado siempre debe obtenerse del `SecurityContextHolder` (ej. usando la anotación `@AuthenticationPrincipal User userDetails`). Nunca confíes en un `userId` enviado en el cuerpo (payload) de la solicitud. Asegúrate de que el `TransactionService` use este objeto `User` para filtrar y guardar datos."

### Prompt 12 (DashboardController)

"Genera un `@RestController` llamado `DashboardController` mapeado a `/api/dashboard`.

- **GET /balance**: Debe llamar a un método de servicio que calcule y devuelva un DTO `BalanceDto` (con `totalIncome`, `totalExpense` y `currentBalance`) para el usuario autenticado.
- **GET /expenses-by-category**: Debe devolver una `List<CategoryExpenseDto>` (con `categoryName` y `totalAmount`) para el mes actual. Pide a la IA que genere la consulta JPQL personalizada en el `TransactionRepository` para agregar los gastos por categoría para el usuario y el rango de fechas actual."

## Tabla 3.2: Catálogo de Endpoints de la API REST (Contrato de API)

| Método | Ruta | Seguridad | Descripción |
|--------|------|-----------|-------------|
| POST | /api/auth/register | Pública | Registra un nuevo usuario. |
| POST | /api/auth/login | Pública | Autentica y devuelve un JWT. |
| GET | /api/categories | Privada (JWT) | Obtiene la lista de categorías del usuario. |
| POST | /api/categories | Privada (JWT) | Crea una nueva categoría para el usuario. |
| GET | /api/transactions | Privada (JWT) | Obtiene las transacciones del usuario (paginadas). |
| POST | /api/transactions | Privada (JWT) | Crea una nueva transacción para el usuario. |
| GET | /api/dashboard/balance | Privada (JWT) | Obtiene el balance (ingresos, gastos, total). |
| GET | /api/dashboard/expenses-by-category | Privada (JWT) | Obtiene datos agregados de gastos por categoría para el gráfico. |
