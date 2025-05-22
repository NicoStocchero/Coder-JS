Este proyecto es una aplicación modular desarrollada con JavaScript puro, orientada a la gestión de jugadores y reservas de un club de pádel.

## 📌 Objetivo

Simular el flujo completo de un sistema de reservas con UX clara, validaciones y almacenamiento persistente en localStorage.

---

## 🧱 Estructura del proyecto

El código sigue una arquitectura modular basada en features (`jugadores`, `reservas`) con separación clara entre responsabilidades:

src/
├── features/ # Módulos funcionales (jugadores, reservas)
│ ├── jugadores/
│ │ ├── data/ # Acceso a localStorage
│ │ ├── logic/ # Lógica de validación y guardado
│ │ └── ui/ # Formulario y renderizado
│ └── reservas/
│ ├── data/
│ ├── init/ # Inicialización del módulo
│ ├── logic/ # Lógica general
│ │ └── disponibilidad/ # Verificación de horarios y canchas
│ └── ui/ # Componentes visuales de reservas
├── shared/
│ ├── helpers/ # Funciones comunes (listas, fechas)
│ └── ui/ # Helpers de UI, DOM, botones, mensajes
├── validators/ # Validadores de campos, normalización y errores
├── data/ # Datos compartidos (si se simulan externos)
├── index.html # Página principal
└── README.md # Documentación del proyecto

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
3. El sistema se inicializa automáticamente desde `js/main.js`:
   - Módulo Jugadores
   - Módulo Reservas

---

## 🙌 Autor

Desarrollado por **Nicolás Stocchero** como proyecto final para el curso de JavaScript en [Coderhouse](https://www.coderhouse.com/).

---

## 💬 Reflexión personal sobre el desarrollo

### 💡 Decisiones clave

Noté que estaba repitiendo la misma lógica para fechas, horarios y canchas. Eso me llevó a modularizar toda la lógica de botones interactivos en funciones como `crearBotonDesdeItem`, `asignarEventoDeSeleccion`, `marcarBotonSeleccionado`, etc., que funcionan mediante un objeto `config`.  
Este patrón me permitió desacoplar completamente la UI de cada módulo, simplificar el mantenimiento y reutilizar componentes sin duplicar código.

También reorganicé el proyecto por **features y capas (UI, lógica, datos)**, inspirándome en principios de Clean Architecture para frontend.

---

### 🧠 Lo que aprendí

- La importancia de **modularizar y abstraer patrones repetidos**
- Cómo **refactorizar sin romper** el flujo de la app
- A manejar el **estado del formulario** (modo edición vs. creación) de forma centralizada
- Que a veces los bugs no están en el código, sino en el DOM o el CSS mal aplicado

---

### ⚙️ Mejoras implementadas

- Eliminé cualquier dependencia de `innerHTML`, `console.log` o `alert`, usando `createElement`, notificaciones visuales (`SweetAlert2`) y helpers personalizados
- Validación completa del formulario (estructura, campos requeridos, solapamiento de horarios)
- Uso de `dayjs`, `validator.js`, `localStorage` y otras utilidades para lógica de negocio simulada
- Separación de responsabilidades en módulos reutilizables (`shared/`, `validators/`, `features/`)

---

### 🧭 Sobre la edición de reservas

Sé que la lógica de edición puede parecer extensa, pero está dividida paso a paso:

- Se precargan los datos en los inputs (`setValue`)
- Se renderiza la UI reactiva igual que si se estuviera creando una reserva
- Se controla el estado con `modoEdicion` y se actualiza localStorage

Preferí separar cada parte antes que meter todo en una única función.  
Esto me ayudó a mantener la lógica clara y evitar errores en la sincronización del formulario.

---
