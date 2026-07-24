# 🎮 EduGami — Entorno Virtual de Enseñanza y Aprendizaje (EVEA) Gamificado

> **EduGami** es una plataforma educativa híbrida desarrollada para la **Universidad Alejandro de Humboldt** que fusiona la gestión académica de un LMS tradicional (como Google Classroom o Moodle) con la energía, motivación y mecánicas de juego del micro-aprendizaje (al estilo Duolingo y los logros de Steam).

---

## 📋 Tabla de Contenidos
- [🎯 Visión General](#-visión-general)
- [✨ Funcionalidades de la Aplicación](#-funcionalidades-de-la-aplicación)
  - [👨‍🎓 Módulo del Estudiante](#-módulo-del-estudiante)
  - [👨‍🏫 Módulo del Docente](#-módulo-del-docente)
  - [📱 Experiencia Móvil & UX/UI](#-experiencia-móvil--uxui)
- [⚡ Stack Tecnológico](#-stack-tecnológico)
- [⚠️ Limitantes a Nivel de Proyecto](#️-limitantes-a-nivel-de-proyecto)
- [📁 Estructura del Repositorio](#-estructura-del-repositorio)
- [🚀 Instalación y Ejecución Local](#-instalación-y-ejecución-local)
- [✒️ Autores y Créditos](#️-autores-y-créditos)

---

## 🎯 Visión General

El objetivo de EduGami es combatir la deserción y la desmotivación estudiantil mediante la gamificación directa de los cortes académicos universitarios. Permite a los docentes publicar tareas tradicionales y micro-quizzes interactivos, mientras que los estudiantes ganan puntos de experiencia (XP), mantienen rachas de estudio diarias, escalan niveles y desbloquean logros en una tabla de clasificación global en tiempo real.

---

## ✨ Funcionalidades de la Aplicación

### 👨‍🎓 Módulo del Estudiante

* **Dashboard Inteligente**: Presentación dinámica según el estado del estudiante. Si hay quizzes pendientes, la mascota búho lo incita a continuar; si completó todo, el búho descansa recomendando pausa.
* **Aulas Virtuales Estilo Classroom**: Vista unificada por materias donde el estudiante consulta tareas pendientes, fechas límite y actividades entregadas.
* **Misiones y Quizzes Gamificados**: Resolución de quizzes interactivos de opción múltiple con recompensa inmediata de XP y puntuación.
* **Sistema de Racha Diaria (Streak)**: Contador de días consecutivos completando micro-lecciones (`🔥 Racha`).
* **Niveles de Juego y Experiencia**: Progreso continuo donde cada 200 XP otorgan un nuevo Nivel de Estudiante.
* **Sistema de Logros Estilo Steam**: Medallas e insignias desbloqueables clasificadas por rareza (*Común, Raro, Épico, Legendario*) como *El Búho Nocturno*, *Velocidad de Rayo*, *Acumulador de XP*, *Liga Diamante*, entre otros.
* **Liga Diamante (Leaderboard Global)**: Tabla de clasificación pública ordenada por el XP total acumulado entre todos los alumnos.
* **Inscripción por Código de Aula**: Permite unirse rápidamente a cualquier asignatura utilizando el código único generado por el docente.

---

### 👨‍🏫 Módulo del Docente

* **Centro de Comando del Docente**: Panel sintético con indicadores clave de rendimiento (Total de Aulas, Alumnos Inscritos, Entregas Pendientes por Calificar).
* **Gestión Completa de Aulas**: Creación, actualización de nombre/sección/color distintivo y eliminación permanente de aulas virtuales.
* **Generación de Códigos Únicos**: Emisión automática de identificadores alfanuméricos copiables con un solo clic para compartir con los alumnos.
* **Creador de Tareas Tradicionales**: Asignación de evaluaciones con fecha de entrega, descripción detallada y vinculación al corte académico correspondiente.
* **Creador de Quizzes y Micro-Lecciones**: Herramienta de diseño de trivias con recompensa de XP configurable y creación de preguntas de opción múltiple.
* **Quiz Wizard Focus Mode**: Creador dedicado con vista previa interactiva en vivo que simula el teléfono del estudiante mientras el profesor redacta la lección.
* **Módulo de Calificación y Retroalimentación**: Evaluación en escala de **0 a 20 puntos** con espacio de comentarios personalizados e inspección directa del trabajo entregado mediante URL.
* **Directorio de Estudiantes y Métricas**: Listado consolidado de alumnos inscritos, total de actividades completadas por cada uno y cálculo automático de la nota acumulada.

---

### 📱 Experiencia Móvil & UX/UI

* **Diseño 100% Responsivo**: Layouts totalmente fluidos ajustados a smartphones, tablets y pantallas de escritorio.
* **Navegación Táctil Móvil**: Barra superior con avatar e indicadores de rendimiento, junto a una barra inferior fija (*Bottom Nav*) con safe-area padding para pulgar.
* **Micro-interacciones Táctiles**: Efectos táctiles en botones (`tactile`), transiciones con Framer Motion y paleta de colores vibrante inspirada en Duolingo y plataformas modernas.

---

## ⚡ Stack Tecnológico

### Frontend (Aplicación Web & PWA)
* **Framework Core**: React 19 + TypeScript.
* **Enrutamiento y SSR**: TanStack Start & TanStack Router.
* **Gestión de Estado y Servidor**: TanStack Query (React Query v5).
* **Estilos**: Tailwind CSS v4 con variables personalizadas y animaciones CSS nativas.
* **Iconografía & Animación**: Lucide React Icons & Framer Motion.
* **Cliente HTTP**: Axios con interceptores JWT.

### Backend (Servidor de API Rest)
* **Entorno de Ejecución**: Bun / Node.js.
* **Framework**: Express v5.
* **ORM & Base de Datos**: Prisma ORM con PostgreSQL.
* **Caché y Sesiones**: Redis.
* **Autenticación & Seguridad**: JSON Web Tokens (JWT) y cifrado de contraseñas con Bcrypt.

### Herramientas y Despliegue
* **Empaquetador**: Vite v8 + Nitro Engine.
* **Infraestructura**: Vercel Serverless / Docker Compose.

---

## ⚠️ Limitantes a Nivel de Proyecto

Al tratarse de un prototipo académico de nivel universitario para la **Universidad Alejandro de Humboldt**, el proyecto cuenta con los siguientes alcances y limitaciones:

1. **Almacenamiento de Archivos**: Las entregas de tareas se realizan mediante el envío de enlaces externos (Google Drive, Docs, GitHub, OneDrive) para evitar la complejidad y costos de un servidor S3/Cloudinary de archivos binarios pesados.
2. **Formato de Quizzes**: Las evaluaciones gamificadas están orientadas a formato de **opción múltiple con respuesta única**, optimizadas para resolución en sesiones cortas de 3 a 5 minutos.
3. **Escala de Calificación**: El motor de notas está configurado bajo el sistema educativo venezolano estándar (escala de 0.0 a 20.0 puntos).
4. **Algoritmo de Racha Simplificado**: El cálculo de la racha diaria se realiza en función del registro de actividad en la base de datos sin requerir trabajadores cron en segundo plano ejecutándose a medianoche para reinicios forzados.
5. **Entorno de Red Local/Producción**: Requiere conectividad con el servidor backend desplegado o el contenedor de PostgreSQL local configurado en las variables de entorno (`.env`).

---

## 📁 Estructura del Repositorio

```text
EduGami/
├── edugami-backend/          # Código fuente del Servidor API (Express + Prisma + Bun)
│   ├── prisma/               # Esquema de BD PostgreSQL y semillas de datos (Seed)
│   └── src/                  # Controladores, rutas y middlewares de autenticación
├── src/                      # Código fuente del Frontend (React 19 + TanStack)
│   ├── api/                  # Configuración e interceptores de Axios
│   ├── assets/               # Ilustraciones y recursos gráficos de la mascota búho
│   ├── components/           # Componentes UI (Dashboard, TeacherDashboard, Modales, Navbars)
│   ├── data/                 # Mocks y utilidades
│   ├── routes/               # Rutas de TanStack Router (__root, index, teacher, quiz-wizard, etc.)
│   └── services/             # Servicios de conexión con la API backend
├── package.json              # Dependencias del Frontend
├── vite.config.ts            # Configuración de Vite y TanStack Start
└── README.md                 # Documentación principal del proyecto
```

---

## 🚀 Instalación y Ejecución Local

### Requisitos Previos
* **Node.js** (v18 o superior) o **Bun** instalado.
* **PostgreSQL** en ejecución local o una URL de base de datos remota.

### 1. Clonar el repositorio
```bash
git clone https://github.com/Jvske-max/EduGami.git
cd EduGami
```

### 2. Configurar y Levantar el Backend
```bash
cd edugami-backend
npm install   # o bun install

# Configura las variables de entorno
cp .env.example .env
# Edita DATABASE_URL y JWT_SECRET en el archivo .env

# Sincronizar la base de datos y sembrar datos iniciales
npx prisma db push
npm run seed

# Iniciar servidor backend
npm run dev   # Ejecuta en http://localhost:3000
```

### 3. Configurar y Levantar el Frontend
En una nueva terminal, navega a la raíz del proyecto:
```bash
cd EduGami
npm install

# Iniciar servidor de desarrollo
npm run dev   # Ejecuta en http://localhost:3000 o puerto asignado por Vite
```

---

## ✒️ Autores y Créditos

Desarrollado como proyecto académico de 8vo Semestre para la **Universidad Alejandro de Humboldt**.

* **Fernando Silva** — *Desarrollador Principal & Arquitecto de Software*

---
*EduGami — Uniendo rigor académico y micro-aprendizaje gamificado.* 🚀
