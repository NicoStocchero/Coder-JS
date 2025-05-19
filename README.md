#js-coderhouse

Alumno: Nicolás Stocchero
Proyecto: Simulador de reservas

Desarrollé una aplicación que permite registrar jugadores y gestionar reservas de canchas, aplicando únicamente los contenidos vistos hasta la clase 7. El proyecto cumple con los criterios obligatorios:

✅ Uso de arrays y objetos para almacenar jugadores y reservas

✅ Interacción con el usuario exclusivamente a través del DOM

✅ Generación dinámica de elementos (select, li, etc.) usando appendChild y createElement

✅ Validaciones de campos con mensajes visibles en pantalla (sin alert, prompt ni console.log)

✅ Uso de localStorage para guardar y recuperar datos

✅ Lógica de validación para evitar superposición de turnos

✅ Diseño claro, inputs organizados, formularios diferenciados y mensajes accesibles

✅ Incluye funciones de editar y eliminar tanto jugadores como reservas

✅ Filtro funcional por fecha de reserva

¿Por qué modularicé los botones?
Tuve que repetir la misma lógica para fechas, horarios y canchas, y ya se me estaba volviendo un lío.
Lo separé en funciones como crearBotonDesdeItem, asignarEventoDeSeleccion, marcarBotonSeleccionado, etc.
Todas usan un config que define qué mostrar y cómo.
Hice esta atomización porque me di cuenta de que estaba repitiendo pequeñas partes del código.
Al principio había armado una sola función que hacía todo junto, pero no entendía dónde estaba el error, así que rehice todo en funciones chicas para poder debuggear mejor.

Lección aprendida
Aprendí a modularizar: separar la lógica en funciones pequeñas, reutilizables y fáciles de testear.
Me sirvió para detectar errores más rápido, entender mejor el flujo de mi app y evitar repetir código en fechas, horarios y canchas.
También me di cuenta de que no todos los bugs están en el JS: a veces el problema es visual, como me pasó con una clase mal escrita en el CSS que me llevó 5 horas frente a la pantalla detectar.
