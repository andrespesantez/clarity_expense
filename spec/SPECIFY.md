# ESPECIFICACIÓN: Documento de Especificación Funcional (ClarityExpense)

Esta sección constituye la "Definición del proyecto" formal, según lo requerido por la Tarea 1 de la actividad académica. Establece el alcance, la visión y los requisitos funcionales que guiarán al asistente de IA en la generación de código.

## 1.1. Visión General del Sistema

Se propone el desarrollo de "ClarityExpense", una aplicación web de control de gastos personales. El sistema se implementará como una Aplicación de Página Única (SPA, Single Page Application), adhiriéndose a una arquitectura desacoplada.

La arquitectura tecnológica seleccionada es:

- **Frontend**: Next.js, configurado para operar en modo SPA (renderizado del lado del cliente).
- **Backend**: Una API RESTful robusta y sin estado (stateless) construida con Java (versión 17+) y el framework Spring Boot (versión 3+), utilizando Lombok para reducir código repetitivo.
- **Base de Datos**: MySQL 8.0+.

El requisito no funcional primordial, que rige todo el proceso de desarrollo, es la restricción académica: el **100% del código fuente** (Java, Next.js, CSS, SQL/JPQL) debe ser generado por un asistente de IA. El desarrollador actuará como un director de proyecto y arquitecto de software, especificando requisitos, formulando prompts, integrando el código generado y depurando las respuestas del asistente hasta obtener un producto funcional.

## 1.2. Requisitos del Producto Mínimo Viable (MVP)

Dada la restricción de no poder escribir código manualmente, la depuración se convierte en la tarea más crítica y costosa en tiempo. Un error complejo de la IA no puede ser "arreglado rápidamente" por el desarrollador; debe ser corregido mediante un prompt de refinamiento.

Por lo tanto, adoptar un enfoque de Producto Mínimo Viable (MVP) no es solo una buena práctica de desarrollo, sino una necesidad estratégica para este proyecto. Al limitar el alcance inicial a las funcionalidades centrales, reducimos la superficie de error de la IA y hacemos que el proceso de depuración sea manejable.

El MVP se centrará en el ciclo de usuario principal: **Autenticación → Registro de Transacciones → Visualización de Saldo**. Características como la presupuestación avanzada, la edición o la exportación de datos, aunque se definen, se consideran post-MVP.

## 1.3. Tabla: Historias de Usuario del MVP

La siguiente tabla detalla las Historias de Usuario (HdU) que definen el alcance del MVP. Estas historias serán la base para formular los prompts al asistente de IA y servirán como criterios de aceptación primarios para validar la funcionalidad.

| ID | Módulo | Historia de Usuario | Requisitos de Aceptación |
|----|--------|---------------------|--------------------------|
| **HdU-01** | Autenticación | Como un nuevo usuario, quiero registrarme en la aplicación con mi email y contraseña para poder tener una cuenta personal. | 1. El formulario debe aceptar nombre, email y contraseña.<br>2. El email debe ser validado y ser único en la base de datos.<br>3. La contraseña debe almacenarse encriptada (usando BCrypt). |
| **HdU-02** | Autenticación | Como un usuario registrado, quiero iniciar sesión con mi email y contraseña para poder acceder a mi panel de control. | 1. El formulario debe aceptar email y contraseña.<br>2. Al validar las credenciales, el backend debe generar y devolver un JSON Web Token (JWT).<br>3. Si las credenciales son incorrectas, se debe mostrar un mensaje de error claro. |
| **HdU-03** | Categorías | Como usuario, quiero poder crear categorías de gastos (ej. "Comida", "Transporte") para organizar mis transacciones. | 1. Debe existir un botón o acción para abrir un modal/panel de creación de categorías.<br>2. El modal debe contener un formulario simple para añadir una nueva categoría por nombre.<br>3. Las categorías deben estar asociadas al usuario autenticado.<br>4. El modal debe cerrarse automáticamente tras crear exitosamente una categoría.<br>5. El formulario debe estar accesible desde el dashboard principal. |
| **HdU-04** | Categorías | Como usuario, quiero ver todas mis categorías disponibles para poder seleccionar una al registrar un gasto. | 1. La aplicación debe poder obtener y mostrar una lista de todas las categorías creadas por el usuario (ej. en un menú desplegable). |
| **HdU-05** | Transacciones | Como usuario, quiero registrar un nuevo gasto o ingreso para llevar un control de mis finanzas. | 1. Debe existir un formulario para registrar una transacción.<br>2. Campos requeridos: Monto (numérico), Fecha, Tipo (Gasto o Ingreso), Descripción (opcional).<br>3. El formulario debe incluir un selector para asignar una Categoría (de HdU-04). |
| **HdU-06** | Transacciones | Como usuario, quiero ver un historial de mis transacciones recientes para revisar mis movimientos. | 1. Se debe mostrar una lista o tabla de todas las transacciones del usuario.<br>2. La lista debe estar ordenada por fecha, de más reciente a más antigua.<br>3. Cada ítem debe mostrar al menos: Fecha, Descripción, Monto y Categoría. |
| **HdU-07** | Dashboard | Como usuario, quiero ver mi saldo actual (Ingresos Totales - Gastos Totales) en el dashboard para conocer mi estado financiero de un vistazo. | 1. El sistema debe calcular SUM(Ingresos) - SUM(Gastos) de todas las transacciones del usuario.<br>2. Este saldo, junto con los totales de ingresos y gastos, debe mostrarse de forma prominente en el panel de control. |
| **HdU-08** | Internacionalización | Como usuario, quiero poder cambiar el idioma de la interfaz entre Español e Inglés para usar la aplicación en mi idioma preferido. | 1. Debe existir un selector de idioma visible en la interfaz principal.<br>2. El cambio de idioma debe aplicarse inmediatamente sin recargar la página.<br>3. La preferencia de idioma debe persistir entre sesiones.<br>4. Todos los textos de UI deben traducirse (botones, labels, mensajes, placeholders). |

## 1.4. Requisitos Funcionales (Post-MVP)

Las siguientes funcionalidades se definen para la evolución del producto, una vez que el MVP esté estable:

- **HdU-09 (Gestión de Presupuestos)**: Como usuario, quiero definir un límite de presupuesto mensual para una o más categorías y ver mi progreso de gasto contra ese límite.

- **HdU-10 (Visualización de Datos)**: Como usuario, quiero ver un gráfico (de tarta o barras) en mi dashboard que muestre mis gastos distribuidos por categoría para el mes en curso. ✅ **Implementado**

- **HdU-11 (CRUD Completo de Transacciones)**: Como usuario, quiero poder editar y eliminar transacciones existentes.

- **HdU-12 (Gestión de Categorías)**: Como usuario, quiero poder editar y eliminar categorías existentes (cuando no tienen transacciones asociadas).

- **HdU-13 (Exportación de Datos)**: Como usuario, quiero poder exportar mi historial de transacciones a un archivo CSV para mis registros personales.

- **HdU-14 (Filtros Avanzados)**: Como usuario, quiero poder filtrar mis transacciones por rango de fechas, categoría y tipo (ingreso/gasto) para análisis más específicos.

## 1.5. Requisitos No Funcionales (RFN)

Estos requisitos son fundamentales para la arquitectura y la seguridad del sistema:

**RFN-01 (Seguridad de API)**: La API del backend debe ser stateless. La autenticación y autorización se gestionarán exclusivamente mediante tokens JWT. Todos los endpoints de la API, excepto los de registro (`/api/auth/register`) e inicio de sesión (`/api/auth/login`), deben estar protegidos y requerir un token JWT válido.

**RFN-02 (Propiedad y Aislamiento de Datos)**: Este es un requisito de seguridad crítico. Un usuario autenticado solo debe poder ver, crear, modificar o eliminar sus propios datos. En ningún caso un usuario debe poder acceder a la información (transacciones, categorías) de otro usuario. Esto debe implementarse a nivel de servicio y repositorio en el backend.

**RFN-03 (Arquitectura SPA)**: El frontend Next.js debe funcionar como una SPA estricta. Todo el renderizado de la interfaz de usuario y la obtención de datos se realizarán en el lado del cliente (Client-Side Rendering). No se utilizarán funciones de Next.js del lado del servidor como `getServerSideProps` o Server Actions para la obtención de datos de la aplicación.

**RFN-04 (Restricción de Proceso de Desarrollo)**: Reitera el requisito académico. Todo el código será generado por un asistente de IA. El desarrollador es responsable de guiar, especificar, integrar y depurar las respuestas del asistente.

**RFN-05 (Idioma del Código)**: Todo el código fuente (clases, métodos, variables, comentarios) debe estar escrito en **inglés**. Esto incluye:
- Nombres de clases, métodos, variables y constantes en el backend (Java/Spring Boot)
- Nombres de componentes, funciones, variables y comentarios en el frontend (Next.js/TypeScript)
- Mensajes de log y excepciones internas del sistema
- Comentarios en el código

Los textos visibles para el usuario final en la interfaz (labels, mensajes de error, títulos, etc.) deben implementarse mediante un sistema de internacionalización (i18n) o etiquetas de traducción en el frontend. Estos textos pueden estar en español en archivos de configuración de idioma separados (ej. `es.json`, `en.json`), pero el código que los maneja debe estar en inglés.

**Ejemplo de implementación:**
- ❌ Incorrecto: `const nombreUsuario = "Ingrese su nombre"`
- ✅ Correcto: `const userName = t('user.name.placeholder')` donde `t()` es una función de traducción que lee de archivos de idioma.

**RFN-06 (Documentación Mínima y Centralizada)**: El proyecto debe mantener una documentación limpia y centralizada, evitando la proliferación de archivos innecesarios. Se deben utilizar únicamente los siguientes archivos de documentación:

**Archivos de Documentación Permitidos:**
1. **`README.md`** (por componente: backend, frontend) - Información del proyecto, setup, arquitectura
2. **`CHECKLIST.md`** (raíz del proyecto) - Seguimiento de avances y pruebas de integración

**Restricciones:**
- ❌ NO crear archivos separados para cada tipo de información (IMPLEMENTATION_REVIEW.md, PROJECT_STRUCTURE.md, STATUS.md, etc.)
- ❌ NO crear documentos de resumen por cada tarea o módulo completado
- ❌ NO duplicar información en múltiples archivos
- ✅ Actualizar README.md con el progreso del proyecto
- ✅ Actualizar CHECKLIST.md marcando tareas completadas
- ✅ Consolidar toda la información relevante en los 2-3 archivos permitidos

**Justificación:** Mantener el proyecto limpio, fácil de navegar y evitar información fragmentada o desactualizada en múltiples documentos.

**RFN-07 (Containerización con Docker)**: La aplicación debe ser desplegable mediante contenedores Docker para garantizar portabilidad y facilitar el deployment. Los requisitos específicos incluyen:

**Contenedores Requeridos:**
1. **MySQL Container** - Base de datos con almacenamiento persistente
2. **Backend Container** - API Spring Boot con imagen optimizada
3. **Frontend Container** - Aplicación Next.js con configuración de producción

**Orquestación:**
- Se debe utilizar **Docker Compose** para orquestar los tres contenedores
- Los contenedores deben comunicarse a través de una red privada de Docker
- Las variables de entorno sensibles (contraseñas, JWT secret) deben externalizarse

**Optimización:**
- Utilizar **multi-stage builds** para minimizar el tamaño de las imágenes
- Usar imágenes base Alpine cuando sea posible (node:alpine, eclipse-temurin:17-jre-alpine)
- Implementar health checks para cada servicio
- Configurar volúmenes persistentes para la base de datos

**Archivos de Configuración:**
- `docker-compose.yml` - Orquestación de servicios
- `backend/Dockerfile` - Build del backend con Maven
- `frontend/Dockerfile` - Build del frontend con Node.js
- `.dockerignore` - Exclusión de archivos innecesarios en cada componente
- `.env.example` - Template de variables de entorno

**Justificación:** Facilitar el deployment en cualquier entorno (desarrollo, testing, producción) con un simple `docker-compose up`, garantizando consistencia entre entornos.

**RFN-08 (Componentes Reutilizables)**: El código del frontend debe maximizar la creación de componentes reutilizables para promover la mantenibilidad, escalabilidad y adherencia a principios DRY (Don't Repeat Yourself). Los requisitos específicos incluyen:

**Principios de Diseño:**
- Crear componentes pequeños y enfocados en una única responsabilidad
- Extraer lógica común en componentes compartidos cuando se repita en 2 o más lugares
- Diseñar componentes con props configurables para maximizar su reutilización
- Evitar duplicación de código en componentes similares

**Ejemplos de Componentes Reutilizables:**
- **Componentes UI Básicos**: Botones, inputs, modales, cards, badges
- **Componentes de Layout**: Headers, sidebars, containers, grids
- **Componentes de Formulario**: Form fields, validadores, mensajes de error
- **Componentes de Visualización**: Tablas, listas, gráficos con configuración flexible

**Estructura Recomendada:**
```
components/
  ├── ui/           # Componentes UI primitivos (Button, Input, Modal)
  ├── forms/        # Componentes de formulario reutilizables
  ├── layout/       # Componentes de estructura (Header, Sidebar)
  └── shared/       # Otros componentes compartidos
```

**Criterios de Reutilización:**
- ✅ Componente parametrizable mediante props
- ✅ No contiene lógica de negocio específica hardcodeada
- ✅ Puede usarse en diferentes contextos sin modificación
- ✅ Tiene una interfaz (props) clara y documentada
- ❌ No duplicar componentes con funcionalidad similar
- ❌ No crear componentes "god" que hacen demasiado

**Justificación:** La reutilización de componentes reduce el tiempo de desarrollo, facilita el mantenimiento, garantiza consistencia visual y funcional en toda la aplicación, y permite escalar el proyecto de manera eficiente.

**RFN-09 (Estilos Globales Reutilizables)**: El frontend debe implementar un sistema de estilos globales mediante Tailwind CSS y clases CSS personalizadas para promover la consistencia visual y la reutilización de estilos en toda la aplicación. Los requisitos específicos incluyen:

**Principios de Diseño de Estilos:**
- Utilizar las utilidades de Tailwind CSS como base para el sistema de diseño
- Crear clases CSS personalizadas para patrones repetitivos en archivos globales
- Definir variables CSS para colores, espaciados y tipografías consistentes
- Evitar estilos inline cuando existan clases reutilizables equivalentes

**Archivos de Estilos Globales:**
```
app/
  └── globals.css         # Estilos globales, variables CSS, clases personalizadas
```

**Patrones de Estilos Reutilizables:**
- **Botones**: Clases para variantes (primary, secondary, danger, outline)
- **Cards**: Estilos consistentes para contenedores de contenido
- **Forms**: Inputs, labels, mensajes de error con estilos unificados
- **Layouts**: Contenedores, grids, spacing systems
- **Estados**: Hover, focus, disabled, loading con comportamiento uniforme
- **Colores**: Paleta definida mediante variables CSS o Tailwind config
- **Tipografía**: Tamaños, pesos y familias consistentes

**Ejemplo de Implementación:**
```css
/* globals.css */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold 
           hover:bg-blue-700 transition disabled:opacity-50;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
  
  .input-field {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg 
           focus:ring-2 focus:ring-blue-500 focus:border-transparent;
  }
}
```

**Configuración de Tailwind:**
- Extender la configuración de Tailwind en `tailwind.config.ts` con colores y spacing personalizados
- Definir el tema de la aplicación (colores primarios, secundarios, estados)
- Configurar variantes personalizadas si es necesario

**Criterios de Buenas Prácticas:**
- ✅ Usar clases de utilidad de Tailwind para estilos únicos
- ✅ Crear clases personalizadas para patrones que se repiten 3+ veces
- ✅ Mantener coherencia en nombres de clases (nomenclatura BEM o semántica)
- ✅ Documentar clases personalizadas complejas con comentarios
- ❌ No duplicar estilos en múltiples componentes
- ❌ No usar valores mágicos (hardcoded) para colores o tamaños
- ❌ No mezclar diferentes sistemas de estilos (CSS modules, styled-components) con Tailwind

**Ventajas:**
- Consistencia visual en toda la aplicación
- Facilidad de mantenimiento (cambios centralizados)
- Menor tamaño del bundle CSS (reutilización efectiva)
- Desarrollo más rápido al reutilizar clases existentes
- Facilita el theming y cambios de diseño globales

**Justificación:** Un sistema de estilos globales bien estructurado reduce la duplicación de código CSS, garantiza una experiencia de usuario coherente, facilita cambios de diseño a nivel de aplicación y mejora la productividad del desarrollo frontend.

