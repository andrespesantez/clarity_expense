# ClarityExpense - Sistema de Control de Gastos Personales

**Sistema full-stack para gestión de finanzas personales - Código 100% Generado por IA**

---

## 🎯 Descripción del Proyecto

ClarityExpense es una aplicación web moderna para el seguimiento y control de gastos personales, desarrollada completamente mediante generación de código por IA como parte de una actividad académica de "Generación de Código y Automatización".

### Características Principales

- ✅ Registro y autenticación de usuarios (JWT + BCrypt)
- ✅ Gestión de categorías de gastos
- ✅ Registro de transacciones (ingresos/gastos)
- ✅ Visualización de balance y estadísticas
- ✅ Gráficos interactivos de gastos por categoría
- ✅ Internacionalización completa (Español/Inglés)
- ✅ Interfaz responsive con estilos globales reutilizables

---

## 🏗️ Arquitectura

### Stack Tecnológico

**Backend:**
- Spring Boot 3.2.0 (Java 17)
- Spring Security + JWT
- JPA/Hibernate
- MySQL 8.0

**Frontend:**
- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS + Estilos Globales
- Zustand (State Management)
- React-i18next
- Recharts (Visualización de datos)

**Deployment:**
- Docker + Docker Compose
- Multi-stage builds optimizados
- Health checks configurados
- Volúmenes persistentes

---

## 🚀 Inicio Rápido

### Prerequisitos

- Docker Desktop instalado
- Puertos libres: 3000 (Frontend), 8080 (Backend), 3306 (MySQL)

### Deployment con Docker Compose

```bash
# 1. Navegar al directorio de implementación
cd implement

# 2. Configurar variables de entorno (opcional)
cp .env.example .env
# Editar .env si es necesario

# 3. Construir y levantar todos los servicios
docker-compose up -d --build

# 4. Verificar que todos los servicios estén healthy
docker-compose ps

# Esperar ~30 segundos para que todos los servicios inicien completamente
```

### Acceso a la Aplicación

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080/api
- **Health Check:** http://localhost:8080/actuator/health

---

## 📁 Estructura del Proyecto

```
Actividad_1/
├── implement/              # Código de implementación
│   ├── backend/           # Spring Boot API
│   ├── frontend/          # Next.js App
│   ├── docker-compose.yml # Orquestación de servicios
│   └── README.md          # Documentación técnica detallada
├── plan/                  # Plan de desarrollo
│   └── PLAN.md
├── spec/                  # Especificaciones
│   └── SPECIFY.md
├── tasks/                 # Tareas de implementación
│   ├── TASK_01_BACKEND.md
│   └── TASK_02_FRONTEND.md
└── CHECKLIST.md          # Lista de verificación completa
```

---

## 🧪 Verificación del Sistema

### Health Checks

```bash
# Verificar estado de contenedores
docker-compose ps

# Verificar logs
docker-compose logs -f

# Verificar API del backend
curl http://localhost:8080/actuator/health

# Verificar frontend
curl http://localhost:3000
```

**Resultado Esperado:**
- ✅ MySQL: Healthy
- ✅ Backend: Healthy (status: UP)
- ✅ Frontend: Healthy (HTTP 200)

---

## 📚 Uso de la Aplicación

### 1. Registro de Usuario
- Acceder a http://localhost:3000/register
- Completar formulario (nombre, email, contraseña)
- La contraseña se encripta con BCrypt

### 2. Iniciar Sesión
- Acceder a http://localhost:3000/login
- Ingresar credenciales
- Se genera token JWT válido por 24 horas

### 3. Gestión de Categorías
- En el dashboard, clic en "Nueva Categoría"
- Crear categorías para organizar gastos
- Las categorías se usan al registrar transacciones

### 4. Registrar Transacciones
- Completar formulario con: tipo, monto, fecha, categoría, descripción
- Tipos: Ingreso o Gasto
- Las transacciones actualizan el balance automáticamente

### 5. Visualizar Datos
- **Balance:** Ingresos, Gastos, Balance Neto
- **Gráfico:** Distribución de gastos por categoría
- **Historial:** Lista de todas las transacciones

### 6. Cambiar Idioma
- Selector ES/EN en el header
- Todos los textos se traducen instantáneamente
- Preferencia guardada en localStorage

---

## 🛠️ Comandos Útiles

### Gestión de Docker

```bash
# Detener todos los servicios
docker-compose down

# Detener y eliminar datos (¡CUIDADO!)
docker-compose down -v

# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar un servicio específico
docker-compose restart backend
docker-compose restart frontend

# Acceder al shell del backend
docker exec -it clarityexpense-backend bash

# Acceder a MySQL CLI
docker exec -it clarityexpense-db mysql -u root -p clarityexpense
```

### Desarrollo

```bash
# Backend (desde implement/backend)
mvn clean package          # Compilar
mvn spring-boot:run        # Ejecutar localmente

# Frontend (desde implement/frontend)
npm install                # Instalar dependencias
npm run dev                # Servidor de desarrollo
npm run build              # Build de producción
```

---

## 🔐 Seguridad

- ✅ Autenticación JWT stateless
- ✅ Contraseñas hasheadas con BCrypt
- ✅ CORS configurado para localhost:3000
- ✅ Endpoints protegidos (excepto auth)
- ✅ Aislamiento de datos por usuario
- ✅ Protección contra SQL injection (JPA)

---

## 🌍 Internacionalización

La aplicación soporta completamente:
- 🇪🇸 Español (es)
- 🇬🇧 Inglés (en)

**Archivos de traducción:**
- `frontend/public/locales/es/common.json`
- `frontend/public/locales/en/common.json`

**Componentes traducidos:** 100%
- Todas las páginas (Login, Register, Dashboard)
- Todos los componentes (Balance, Forms, Lists, Charts)
- Mensajes de error y éxito

---

## 📊 Estado del Proyecto

### Implementación: 100% Completa ✅

- ✅ Backend: 29/29 archivos (100%)
- ✅ Frontend: 19/19 archivos (100%)
- ✅ Deployment: 7/7 archivos (100%)
- ✅ Estilos Globales: Implementados
- ✅ Internacionalización: 100% cobertura
- ✅ Docker: Todos los servicios operacionales

### Historias de Usuario MVP: 8/8 ✅

1. ✅ HdU-01: Registro de usuarios
2. ✅ HdU-02: Inicio de sesión
3. ✅ HdU-03: Crear categorías (con modal)
4. ✅ HdU-04: Ver categorías
5. ✅ HdU-05: Registrar transacciones
6. ✅ HdU-06: Ver historial
7. ✅ HdU-07: Calcular saldo
8. ✅ HdU-08: Internacionalización

### Funcionalidades Bonus: 1/1 ✅

- ✅ HdU-10: Gráfico de gastos por categoría

---

## 📖 Documentación Adicional

Para información técnica detallada:

- **Documentación Completa:** `implement/README.md`
- **Especificaciones:** `spec/SPECIFY.md`
- **Plan de Desarrollo:** `plan/PLAN.md`
- **Tareas Implementadas:** `tasks/`
- **Checklist de Progreso:** `CHECKLIST.md`

---

## 🎓 Contexto Académico

Este proyecto fue desarrollado como parte de la asignatura "Generación de Código y Automatización" de la Universidad Internacional de La Rioja (UNIR).

**Objetivo:** Demostrar el uso de IA para la generación automática de código en un proyecto full-stack completo.

**Metodología:**
- Especificación clara de requisitos
- Generación iterativa de código por IA
- Validación y deployment automatizado

**Resultado:** Sistema funcional 100% generado por IA, desplegado con Docker.

---

## 🙋 Soporte

Para consultas sobre la implementación, revisa:
1. La documentación técnica en `implement/README.md`
2. El checklist de progreso en `CHECKLIST.md`
3. Los logs de Docker: `docker-compose logs`

---

## 📄 Licencia

Proyecto académico - UNIR 2025

---

**Generado con ❤️ por IA**  
**Fecha:** Noviembre 2025
