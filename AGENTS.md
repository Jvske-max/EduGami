# 🛡️ Code Review Standards

## 🌟 General Principles
- Write clean, self-documenting code with meaningful variable names.
- Keep functions small and focused on a single responsibility (DRY principle).
- Prioritize readability and maintainability over clever "one-liners".
- Always handle errors gracefully and provide meaningful error logs.

## 📘 TypeScript
- **Strict Typing:** Avoid `any` at all costs. Use `unknown` if the type is truly dynamic, and narrow it down later.
- **Structures:** Prefer `interface` for object shapes; use `type` for unions and utility types.
- **Modern Syntax:** Utilize optional chaining (`?.`) and nullish coalescing (`??`) instead of deep logical `&&` checks.
- **Variables:** Use `const` by default. Only use `let` when reassignment is explicitly required. Never use `var`.

## ⚛️ React
- **Components:** Use functional components and hooks exclusively. No class components.
- **Exports:** Prefer named exports over default exports for better refactoring and IDE intellisense.
- **State:** Keep state as close to where it's used as possible. Avoid lifting state unnecessarily.
- **Hooks:** Do not suppress `eslint-plugin-react-hooks` exhaustive-deps warnings. Fix the dependencies instead.

## 🐍 Python
- **Style:** Adhere strictly to PEP 8 style guidelines.
- **Type Hints:** Enforce type hints for all function arguments and return values (e.g., `def process_data(items: list[str]) -> bool:`).
- **Documentation:** Write concise docstrings for all classes and public functions.
- **Idioms:** Leverage Pythonic features like list/dictionary comprehensions instead of raw `for` loops when mapping or filtering data.

## 🐦 Flutter (Dart)
- **Performance:** Use `const` constructors for widgets wherever possible to optimize the widget rebuild cycle.
- **Composition:** Break large `build` methods into smaller, separate `StatelessWidget` classes rather than using helper methods that return `Widget`.
- **Null Safety:** Strictly adhere to sound null safety. Avoid the bang operator (`!`); prefer safe unwrapping or fallback values (`??`).
- **Separation of Concerns:** Keep business logic completely separate from the UI components.

## 🤖 Godot (GDScript)
- **Static Typing:** Enforce strict static typing in GDScript 2.0 (e.g., `var speed: float = 300.0`, `func update_health() -> void:`).
- **Communication:** Follow the Godot paradigm: "Call down, signal up". Use Signals to communicate with parent nodes, and Exports/direct calls to communicate with child nodes.
- **Performance:** Cache node references using `@onready var` instead of repeatedly calling `$Node` or `get_node()` inside `_process()` or `_physics_process()`.
- **Naming Conventions:** Use `snake_case` for variables, functions, and file names. Use `PascalCase` for class names and node names.
