# Prompt para el agente de IA (EduGami LMS)

Copia y pega esto en tu agente, adjuntando `edugami-changes.json`.

---

Actúa como desarrollador frontend senior en el proyecto **EduGami LMS** (React 19 + TanStack Start/Router, Vite 7, Tailwind CSS v4, TypeScript, lucide-react, textos en español).

Te adjunto el archivo `edugami-changes.json`, que es la **especificación exacta** de los cambios de interfaz que debes implementar. Trátalo como fuente de verdad: no inventes pantallas, campos ni rutas que no estén ahí.

## Tareas

1. **Sistema de diseño**: asegúrate de que existan en `src/styles.css` (dentro de `@theme`) los tokens `brand-*` definidos en `design_system.tokens`, y la utilidad `tactile` descrita. Si ya existen, no los dupliques.
2. **Assets**: crea/verifica los archivos listados en `assets`. Si falta `mascot-owl-sleeping.png`, genera un búho durmiendo en **el mismo estilo flat vector** que el búho existente (mismos colores, mismo trazo), con burbuja "zZ" y fondo transparente.
3. **Pantalla de login** (`src/routes/login.tsx`) según el cambio `auth-login`.
4. **Pantalla de registro** (`src/routes/register.tsx`) según el cambio `auth-register`.
5. **Dashboard** (`src/routes/index.tsx`) según el cambio `dashboard-hero-empty-state`: el hero central debe alternar entre el estado "hay quiz" y el estado "sin quizzes" (búho durmiendo, fondo azul tenue, botón deshabilitado) usando la bandera `hasQuizAvailable`.

## Reglas de implementación

- Usa **solo** los tokens `brand-*` para color; prohibido `text-white`/`bg-[#...]` como color de marca.
- Nada de `react-router-dom`: la navegación es con `@tanstack/react-router` (`<Link to="/login">`).
- Cada ruta define su propio `head()` con `title`, `description`, `og:title` y `og:description` únicos (ver campo `head` de cada cambio).
- Los formularios son solo UI por ahora: sin llamadas al backend, pero con estado controlado y validación básica de HTML (`required`, `type="email"`).
- Componentes pequeños y legibles; extrae subcomponentes cuando un archivo pase de ~250 líneas.
- Responsivo: split-screen desde `md`, una sola columna en móvil.
- Accesibilidad: cumple todo lo listado en `accessibility`.

## Criterios de aceptación

Antes de dar por terminado, verifica uno por uno los puntos de `acceptance_criteria` del JSON y reporta cuáles cumples. Si algo del JSON entra en conflicto con el código existente, explícalo en vez de romper lo que ya funciona.
