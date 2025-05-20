Este proyecto es una aplicación modular desarrollada con JavaScript puro, orientada a la gestión de jugadores y reservas de un club de pádel.

## 📌 Objetivo

Simular el flujo completo de un sistema de reservas con alta interactividad, validaciones, almacenamiento local y experiencia de usuario optimizada.

---

## 🧱 Estructura del proyecto

El código sigue una arquitectura modular basada en features (`jugadores`, `reservas`) con separación clara entre responsabilidades:

src/
├── features/
│ ├── jugadores/
│ │ ├── data/ # Acceso a localStorage
│ │ ├── ui/ # Render de cards, formularios y eventos
│ │ └── initJugadores.js
│ ├── reservas/
│ │ ├── data/
│ │ ├── ui/
│ │ ├── logic/
│ │ ├── init/
│ │ └── initReservas.js
├── helpers/
│ ├── fechas/ # Cálculos de disponibilidad, rangos, etc.
│ ├── validation/ # Validaciones lógicas (no visuales)
├── shared/
│ └── ui/ # Funciones visuales reutilizables (DOM, alertas, selects)
├── data/ # Datos estáticos compartidos (ej: canchas.json)
└── main.js # Punto de entrada y orquestación

yaml
Copy
Edit

---

## ⚙️ Funcionalidades

### 🎯 Jugadores

- Alta de jugador con validación y normalización automática
- Visualización de jugadores activos
- Eliminación con confirmación y recarga automática

### 📅 Reservas

- Selección de jugador
- Generación dinámica de fechas disponibles
- Horarios según disponibilidad y lógica de superposición
- Canchas filtradas por fecha, hora y duración
- Confirmación y guardado en localStorage

---

## 🛠️ Tecnologías utilizadas

- JavaScript ES6+ (modular)
- SweetAlert2 (alertas y confirmaciones)
- FontAwesome (iconos)
- Day.js (formateo y manipulación de fechas)
- localStorage (persistencia de datos)
- Estructura inspirada en Clean Architecture para frontend

---

## ✅ Buenas prácticas aplicadas

- Separación de lógica visual, lógica de negocio y datos
- Helpers genéricos reutilizables
- Código sin `console.log`, `alert`, ni lógica acoplada
- Comentarios útiles y funciones bien nombradas
- Modularidad escalable para futuros features

---

## 🧪 Cómo iniciar la app

1. Cloná o descargá el repositorio.
2. Abrí `index.html` en tu navegador.
3. El sistema se inicializa automáticamente desde `main.js`:
   - Módulo Jugadores
   - Módulo Reservas

---

## 🙌 Autor

Desarrollado por **Nicolás Stocchero** como proyecto final para el curso de JavaScript en [Coderhouse](https://www.coderhouse.com/).

---

## 💬 Reflexión personal sobre el proceso

### 💡 ¿Por qué modularicé los botones?

Tuve que repetir la misma lógica para fechas, horarios y canchas, y ya se me estaba volviendo un lío.  
Lo separé en funciones como `crearBotonDesdeItem`, `asignarEventoDeSeleccion`, `marcarBotonSeleccionado`, etc.  
Todas usan un `config` que define qué mostrar y cómo.

Hice esta atomización porque me di cuenta de que estaba repitiendo pequeñas partes del código.  
Al principio había armado una sola función que hacía todo junto, pero no entendía dónde estaba el error, así que rehice todo en funciones chicas para poder debuggear mejor.

### 📘 Lección aprendida

Aprendí a **modularizar**: separar la lógica en funciones pequeñas, reutilizables y fáciles de testear.  
Me sirvió para detectar errores más rápido, entender mejor el flujo de mi app y evitar repetir código en fechas, horarios y canchas.

También aprendí que **no todos los bugs están en el JS**: a veces el problema es visual, como me pasó con una clase mal escrita en el CSS que me llevó 5 horas frente a la pantalla detectar.
