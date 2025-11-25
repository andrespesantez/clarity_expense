# CHECKLIST: Plan de Tareas e Integración

Utiliza esta lista de verificación para rastrear el progreso de la generación e integración de código entre el backend y el frontend.

**Última Actualización:** Enero 2025  
**Estado Actual:** Backend 100% + Frontend 100% + Deployment 100% Completado

---

## 📊 Resumen de Progreso

### Backend
- ✅ **Módulo B1:** Configuración y Modelo de Datos (100%) - 8 archivos
- ✅ **Módulo B2:** Repositorios y Servicios (100%) - 13 archivos
- ✅ **Módulo B3:** Seguridad y JWT (100%) - 4 archivos
- ✅ **Módulo B4:** Controladores REST (100%) - 4 archivos

**Total Backend:** 29/29 archivos (100%)

### Frontend
- ✅ **Módulo F1:** Proyecto Base (100%) - 5 archivos (Prompts 13-17)
- ✅ **Módulo F2:** Estilos Globales (100%) - 2 archivos (Prompts 18-19)
- ✅ **Módulo F3:** Autenticación (100%) - 3 archivos (Prompts 20-21)
- ✅ **Módulo F4:** Dashboard y CRUD (100%) - 9 archivos (Prompts 22-26)

**Total Frontend:** 19/19 archivos (100%) - **14 prompts totales**

### Deployment
- ✅ **Módulo D1:** Database Container (100%) - MySQL 8.0 configurado
- ✅ **Módulo D2:** Backend Container (100%) - Dockerfile multi-stage + docker-compose
- ✅ **Módulo D3:** Frontend Container (100%) - Dockerfile multi-stage + docker-compose
- ✅ **Módulo D4:** Orchestration (100%) - DB + Backend + Frontend configurados
- ✅ **Módulo D5:** Environment Template (100%) - .env.example completo

**Total Deployment:** 7/7 archivos (100%)

**Total Proyecto:** 55/55 archivos (100%) - Backend + Frontend + Deployment completado

---

## 🎯 Estructura Optimizada del Frontend

El frontend se desarrolló con:

1. **F1: Proyecto Base** (Prompts 13-17) → Configuración, i18n, Zustand, Axios
2. **F2: Estilos Globales** (Prompts 18-19) → globals.css + tailwind.config.ts
3. **F3: Autenticación** (Prompts 20-21) → Login/Register usando estilos globales
4. **F4: Dashboard** (Prompts 22-26) → Componentes usando estilos globales

**Resultado:** 14 prompts totales

---

## 📝 Política de Documentación (RFN-06)

✅ **Archivos Permitidos:**
- `README.md` (backend) - Información del proyecto, arquitectura, progreso
- `README.md` (frontend) - Cuando se implemente
- `CHECKLIST.md` (este archivo) - Seguimiento de tareas

❌ **NO Crear:**
- Archivos de estado por módulo (STATUS.md, REVIEW.md)
- Documentos de resumen por tarea completada
- Archivos de estructura duplicada

---

## Fase 1: Backend - Configuración y Modelo de Datos

- [x] Proyecto Spring Boot inicializado (con web, data-jpa, security, mysql, lombok, jjwt).
- [x] Archivo application.properties configurado para conectar a MySQL.
- [x] Entidad JPA User generada (implementando UserDetails de Spring Security, usando Lombok).
- [x] Entidad JPA Category generada (con relación @ManyToOne a User, FetchType.LAZY, usando Lombok).
- [x] Entidad JPA Transaction generada (con relaciones @ManyToOne a User y Category, FetchType.LAZY, usando Lombok).
- [x] DTOs (Data Transfer Objects) generados (RegisterRequestDto, LoginRequestDto, TransactionDto, CategoryDto, BalanceDto, CategoryExpenseDto, JwtResponseDto).
- [x] Repositorios Spring Data JPA generados (UserRepository, CategoryRepository, TransactionRepository con queries JPQL personalizadas).
- [x] Servicios de negocio generados (CategoryService, TransactionService, DashboardService con validación RFN-02).
- [ ] **Prueba de Integración 1.1 (Validación de Esquema)**: Ejecutar `mvn spring-boot:run`. Conectar a la base de datos MySQL. Confirmar que las tablas `users`, `category`, y `transaction` han sido creadas por Hibernate.

## Fase 2: Backend - Autenticación y API Pública

- [x] PasswordEncoder (BCrypt) definido como @Bean.
- [x] UserDetailsService personalizado implementado (carga usuario por findByEmail).
- [x] JwtUtil (o JwtService) generado (para generar, validar y extraer claims).
- [x] JwtRequestFilter generado (para interceptar `Authorization: Bearer...` y establecer SecurityContext).
- [x] SecurityConfig (Bean SecurityFilterChain) generado (habilitando STATELESS, deshabilitando CSRF, configurando permitAll para `/api/auth/**` y authenticated para `/api/**`).
- [x] AuthController generado con endpoints públicos `POST /api/auth/register` y `POST /api/auth/login`.
- [ ] **Prueba de Integración 2.1 (Registro)**: Usar Postman. `POST /api/auth/register` con JSON de usuario. Confirmar 200 OK y verificar la base de datos (contraseña hasheada).
- [ ] **Prueba de Integración 2.2 (Login)**: Usar Postman. `POST /api/auth/login` con credenciales. Confirmar 200 OK y recibir un JwtResponseDTO con un token.
- [ ] **Prueba de Integración 2.3 (Seguridad)**: Usar Postman. `GET /api/transactions` sin token JWT. Confirmar 401 Unauthorized o 403 Forbidden.

## Fase 3: Backend - API Protegida (CRUD)

- [x] TransactionService y CategoryService generados (con lógica de negocio y validación de propiedad de datos, RFN-02).
- [x] DashboardService generado (con cálculo de balance y agregación por categoría).
- [x] TransactionController generado (con GET, POST, PUT, DELETE).
- [x] CategoryController generado (con GET, POST).
- [x] DashboardController generado (con `GET /api/dashboard/balance` y `GET /api/dashboard/expenses-by-category`).
- [ ] **Prueba de Integración 3.1 (API Protegida)**: Usar Postman.
  - Obtener token de la Prueba 2.2.
  - Adjuntar token como `Authorization: Bearer <token>`.
  - `POST /api/categories` para crear una categoría.
  - `POST /api/transactions` para crear una transacción usando el ID de la categoría.
  - `GET /api/transactions` para verificar que la transacción es devuelta.
  - `GET /api/dashboard/balance` para verificar que los totales son correctos.

## Fase 4: Frontend - Configuración Base y Sistema de Estilos

**Módulo F1: Proyecto Base (Prompts 13-17)**
- [x] Proyecto Next.js inicializado (con Tailwind CSS y TypeScript).
- [x] Dependencias instaladas: `npm install axios zustand recharts next-i18next` (incluye i18n para traducciones).
- [x] Sistema de internacionalización (i18n) configurado con archivos de idioma (es.json, en.json).
- [x] Store de Zustand (useAuthStore) creado (con estado `token`, `user`, `isAuthenticated` y acciones `login`, `logout`).
- [x] Instancia de axios (`lib/api.ts`) creada con `baseURL` (http://localhost:8080).
- [x] Interceptor de request de Axios implementado (para adjuntar token JWT desde useAuthStore).

**Módulo F2: Sistema de Estilos Globales (Prompts 18-19)** ⭐ **EJECUTADO ANTES DE CREAR COMPONENTES UI**
- [x] `app/globals.css` actualizado con 50+ clases CSS personalizadas (vanilla CSS sin @apply).
  - [x] Clases de botones (`.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-outline`, `.btn-success`)
  - [x] Clases de cards (`.card`, `.card-hover`)
  - [x] Clases de formularios (`.input-field`, `.select-field`, `.textarea-field`, `.label`, `.error-message`)
  - [x] Clases de layout (`.container-centered`, `.container-app`, `.section-spacing`)
  - [x] Clases de texto (`.text-heading`, `.text-subheading`, `.text-muted`, `.text-error`)
  - [x] Clases de badges (`.badge`, `.badge-success`, `.badge-danger`, `.badge-warning`, `.badge-info`)
  - [x] Clases de tablas (`.table`, `.table-header`, `.table-row`, `.table-cell`, `.table-cell-header`)
  - [x] Clases de modal (`.modal-backdrop`, `.modal-panel`, `.modal-header`, `.modal-body`, `.modal-footer`)
  - [x] Clases de links (`.link`, `.link-primary`)
  - [x] Soporte dark mode incluido
- [x] `tailwind.config.ts` creado con tema personalizado completo:
  - [x] 6 paletas de colores × 10 tonos (primary, secondary, success, danger, warning, info)
  - [x] Spacing personalizado (18, 88, 100, 128)
  - [x] Shadows personalizadas (soft, strong)
  - [x] Animations (fade-in, slide-up, slide-down)

- [ ] **Prueba de Integración 4.1 (CORS)**: Iniciar ambos servidores. Asegurarse de que el backend (SecurityConfig) tiene `.cors()` configurado para permitir http://localhost:3000.
- [ ] **Prueba de Integración 4.2 (Estilos Globales)**: Verificar que globals.css y tailwind.config.ts están correctamente configurados antes de crear componentes UI.

## Fase 5: Frontend - Autenticación (Módulo F3: Prompts 20-21)

**IMPORTANTE:** Estos componentes YA usan las clases globales definidas en Fase 4 (Módulo F2)

- [x] Páginas `app/login/page.tsx` y `app/register/page.tsx` creadas usando clases globales:
  - [x] `.card` para contenedor de formularios
  - [x] `.input-field` para inputs de email y contraseña
  - [x] `.label` para etiquetas de formulario
  - [x] `.btn-primary` para botones de submit
  - [x] `.link` para enlaces de navegación
  - [x] Lógica onSubmit que llama a axios y `useAuthStore.login()`
- [x] Componente HOC `withAuth.tsx` creado para proteger rutas (redirige a `/login` si `!isAuthenticated`).

- [ ] **Prueba de Integración 5.1 (Flujo de Login)**: Abrir http://localhost:3000/login. Iniciar sesión. Verificar que useAuthStore se actualiza y se redirige a `/dashboard`.
- [ ] **Prueba de Integración 5.2 (Ruta Protegida)**: Cerrar sesión (limpiar estado/storage). Intentar acceder a http://localhost:3000/dashboard. Confirmar redirección a `/login`.

## Fase 6: Frontend - Dashboard y CRUD (Módulo F4: Prompts 22-26)

- [x] Componente `Balance.tsx` creado usando `.card`, `.text-subheading`, clases de color para valores.
- [x] Componente `CategoryChart.tsx` creado usando `.card`, `.text-subheading`, Recharts para visualización.
- [x] Componente `TransactionForm.tsx` creado usando:
  - [x] `.input-field`, `.select-field`, `.textarea-field` para formulario
  - [x] `.label` para etiquetas
  - [x] `.btn-primary` para botón submit
  - [x] `useEffect` para cargar categorías desde `GET /api/categories`
  - [x] `onSubmit` para `POST /api/transactions`
- [x] Componente `TransactionList.tsx` creado usando:
  - [x] `.table`, `.table-header`, `.table-row`, `.table-cell` para tabla
  - [x] `.badge-success` para transacciones INCOME
  - [x] `.badge-danger` para transacciones EXPENSE
  - [x] `useEffect` + `api.get('/api/transactions')`
- [x] Componente `CategoryForm.tsx` creado como modal usando:
  - [x] `.modal-backdrop`, `.modal-panel`, `.modal-header`, `.modal-body`, `.modal-footer`
  - [x] `.input-field` para nombre de categoría
  - [x] `.btn-primary` y `.btn-secondary` para botones
  - [x] Props: isOpen, onClose, onSuccess
- [x] Componente `LanguageSwitcher.tsx` creado usando `.btn-outline` para selector ES/EN.
- [x] Página `app/dashboard/page.tsx` creada usando:
  - [x] `.container-app` para contenedor principal
  - [x] `.section-spacing` para espaciado entre secciones
  - [x] `.text-heading` para título
  - [x] `.btn-primary` para botón "Nueva Categoría"
  - [x] Gestión de estado del modal (useState isModalOpen)
  - [x] Ensamblaje de todos los componentes en layout responsivo
- [x] Archivos de traducción actualizados con claves para modal (addButton, close) en ES y EN.
- [ ] **Prueba de Integración 6.1 (Visualización de Datos)**: Iniciar sesión. Ir a `/dashboard`. Verificar que:
  - [ ] El componente Balance muestra las cifras correctas de la API.
  - [ ] El componente CategoryChart muestra el gráfico de Recharts.
  - [ ] El formulario TransactionForm muestra las categorías en el desplegable.
  - [ ] La lista TransactionList muestra las transacciones existentes.
  - [ ] El modal CategoryForm se abre al hacer clic en "Nueva Categoría".
  - [ ] El modal se cierra correctamente (botón X, botón Cerrar, clic en backdrop).
  - [ ] El selector de idioma cambia los textos entre ES/EN correctamente.
- [ ] **Prueba de Integración 6.2 (CRUD Completo)**:
  - [ ] (Create Category) Crear una nueva categoría en el modal y verificar que se cierra automáticamente.
  - [ ] Verificar que la nueva categoría aparece en el selector de TransactionForm.
  - [ ] (Create Transaction) Usar el formulario para añadir una nueva transacción. Verificar que la lista se actualiza.
  - [ ] (Read) Recargar la página y verificar que la nueva transacción persiste.
  - [ ] (Update) Implementar funcionalidad de edición (post-MVP).
  - [ ] (Delete) Implementar funcionalidad de eliminación (post-MVP).
- [ ] **Prueba de Integración 6.3 (Estilos Globales)**: Verificar que:
  - [ ] Los estilos se aplican correctamente en todos los componentes
  - [ ] Los botones mantienen consistencia visual (`.btn-primary`, `.btn-secondary`, etc.)
  - [ ] Los inputs y formularios tienen apariencia uniforme (`.input-field`, `.select-field`)
  - [ ] Las cards tienen el mismo diseño (`.card`)
  - [ ] Las tablas usan clases globales (`.table`, `.table-row`, etc.)
  - [ ] Los modales usan clases globales (`.modal-backdrop`, `.modal-panel`, etc.)
  - [ ] Los badges de tipo de transacción se muestran correctamente (`.badge-success`, `.badge-danger`)
  - [ ] Los estados (hover, focus, disabled) funcionan correctamente
  - [ ] El build de Next.js se completa sin errores

## Fase 7: Deployment - Containerización con Docker

- [x] docker-compose.yml creado con configuración de MySQL (servicio db).
- [x] MySQL configurado con volumen persistente `mysql-data`.
- [x] Health check configurado para MySQL (mysqladmin ping).
- [x] Dockerfile multi-stage creado para backend (Maven build + JRE runtime).
- [x] backend/.dockerignore creado (excluye target/, .git/, etc.).
- [x] Backend service agregado a docker-compose.yml (depends_on db).
- [x] Backend health check configurado (actuator/health endpoint).
- [x] Spring Boot Actuator agregado al pom.xml.
- [x] SecurityConfig actualizado para permitir /actuator/health público.
- [x] application.properties configurado con endpoints de Actuator.
- [x] Dockerfile multi-stage creado para frontend (npm build + Node runtime).
- [x] frontend/.dockerignore creado (excluye node_modules/, .next/, etc.).
- [x] Frontend service agregado a docker-compose.yml (depends_on backend).
- [x] Frontend health check configurado (wget on port 3000).
- [x] next.config.ts actualizado con output: 'standalone' para Docker.
- [x] Network configurado en docker-compose.yml (clarityexpense-network).
- [x] Archivo .env.example actualizado con template completo de variables de entorno.
- [x] **Prueba de Integración 7.1 (Build y Start)**: Ejecutar `docker-compose up -d --build`. Confirmar que los 3 contenedores inician correctamente.
- [x] **Prueba de Integración 7.2 (Conectividad)**: Verificar que:
  - [x] Backend puede conectarse a MySQL (revisar logs).
  - [x] Frontend puede hacer requests al backend (http://localhost:3000).
  - [x] Backend responde en health check (actuator/health retorna status UP).
  - [x] Frontend responde en puerto 3000 (HTTP 200).
- [x] **Prueba de Integración 7.3 (Health Checks)**: Ejecutar `docker-compose ps`. Confirmar que todos los servicios muestran estado "healthy".
