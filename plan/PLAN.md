# PLAN: Estrategia de Implementación (ClarityExpense)

Este documento establece la estrategia de implementación para el proyecto ClarityExpense, definiendo el enfoque modular e incremental que se seguirá para la generación del código mediante IA.

## Filosofía de Desarrollo

El desarrollo seguirá un enfoque **modular e incremental**, donde se generará cada pieza, se probará (en la medida de lo posible) y luego se usará como contexto para generar la siguiente.

## Arquitectura del Sistema

### Stack Tecnológico

- **Frontend**: Next.js (modo SPA)
- **Backend**: Spring Boot 3.2+ con Java 17, utilizando Lombok para reducir código repetitivo
- **Base de Datos**: MySQL 8.0+
- **Autenticación**: JWT (JSON Web Tokens)
- **Gestión de Estado**: Zustand
- **Estilos**: Tailwind CSS
- **Visualización**: Recharts

### Convenciones de Código

- **Idioma**: Todo el código (clases, métodos, variables, comentarios) debe escribirse en **inglés**
- **Internacionalización**: Los textos de la UI del frontend se gestionarán mediante sistema i18n/traducción
- **Lombok**: Se utilizará para reducir boilerplate en el backend (getters, setters, constructores)
- **Componentes Reutilizables**: El frontend debe maximizar la creación de componentes reutilizables siguiendo estos principios:
  - Crear componentes pequeños y enfocados en una única responsabilidad
  - Extraer lógica común cuando se repita en 2 o más lugares
  - Diseñar componentes con props configurables para máxima reutilización
  - Evitar duplicación de código en componentes similares
  - Organizar en estructura: `ui/`, `forms/`, `layout/`, `shared/`
- **Estilos Globales**: Implementar sistema de estilos reutilizables usando Tailwind CSS:
  - Definir clases personalizadas en `globals.css` para patrones repetitivos
  - Usar `@layer components` para botones, cards, inputs, etc.
  - Configurar tema personalizado en `tailwind.config.ts`
  - Evitar duplicación de estilos en componentes
  - Mantener consistencia visual mediante variables CSS y clases reutilizables

### Documentación

- **Política**: Documentación mínima y centralizada (RFN-06)
- **Archivos permitidos**:
  - `README.md` (por componente: backend/frontend) - Información del proyecto, arquitectura, progreso
  - `CHECKLIST.md` (raíz) - Seguimiento de tareas y pruebas de integración
- **Restricciones**: 
  - ❌ NO crear archivos separados por cada módulo o tarea
  - ✅ Actualizar README.md con cada avance
  - ✅ Marcar tareas completadas en CHECKLIST.md

### Estructura de Módulos

El proyecto se divide en tres grandes tareas:

1. **TAREA 01: Backend (Spring Boot)** - Ver `tasks/TASK_01_BACKEND.md`
2. **TAREA 02: Frontend (Next.js SPA)** - Ver `tasks/TASK_02_FRONTEND.md`
3. **TAREA 03: Deployment (Docker Containers)** - Ver `tasks/TASK_03_DEPLOYMENT.md`

## Estrategia de Integración

La integración se realizará en **7 fases progresivas**, cada una con sus propias pruebas de integración:

### Fase 1: Backend - Configuración y Modelo de Datos
Establecer la base del backend con las entidades JPA y configuraciones iniciales.

### Fase 2: Backend - Autenticación y API Pública
Implementar el sistema de autenticación JWT y los endpoints públicos.

### Fase 3: Backend - API Protegida (CRUD)
Desarrollar los servicios y controladores para las operaciones CRUD protegidas.

### Fase 4: Frontend - Configuración y Estado
Configurar el proyecto Next.js con Zustand y Axios.

### Fase 5: Integración Full-Stack (Autenticación)
Conectar el flujo de autenticación entre frontend y backend.

### Fase 6: Integración Full-Stack (CRUD y Visualización)
Integrar completamente las operaciones CRUD y la visualización de datos.

### Fase 7: Deployment - Containerización con Docker
Crear contenedores Docker para base de datos, backend y frontend, con orquestación via Docker Compose.

## Seguimiento del Progreso

Utiliza el archivo `CHECKLIST.md` para realizar el seguimiento detallado de cada tarea y prueba de integración.

## Referencias

- Especificación completa: `spec/SPECIFY.md`
- Tareas de backend: `tasks/TASK_01_BACKEND.md`
- Tareas de frontend: `tasks/TASK_02_FRONTEND.md`
- Tareas de deployment: `tasks/TASK_03_DEPLOYMENT.md`
