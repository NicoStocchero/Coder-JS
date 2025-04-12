// --- Arrays y variables ---
// Array de horas disponibles
const horasDisponibles = [
  { id: 1, hora: "08:00" },
  { id: 2, hora: "08:30" },
  { id: 3, hora: "09:00" },
  { id: 4, hora: "09:30" },
  { id: 5, hora: "10:00" },
  { id: 6, hora: "10:30" },
  { id: 7, hora: "11:00" },
  { id: 8, hora: "11:30" },
  { id: 9, hora: "12:00" },
  { id: 10, hora: "12:30" },
  { id: 11, hora: "13:00" },
  { id: 12, hora: "13:30" },
  { id: 13, hora: "14:00" },
  { id: 14, hora: "14:30" },
  { id: 15, hora: "15:00" },
  { id: 16, hora: "15:30" },
  { id: 17, hora: "16:00" },
  { id: 18, hora: "16:30" },
  { id: 19, hora: "17:00" },
  { id: 20, hora: "17:30" },
  { id: 21, hora: "18:00" },
  { id: 22, hora: "18:30" },
  { id: 23, hora: "19:00" },
  { id: 24, hora: "19:30" },
  { id: 25, hora: "20:00" },
  { id: 26, hora: "20:30" },
  { id: 27, hora: "21:00" },
  { id: 28, hora: "21:30" },
  { id: 29, hora: "22:00" },
  { id: 30, hora: "22:30" },
  { id: 31, hora: "23:00" },
];

// Cargar reservas desde localStorage o iniciar con array vacío
const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

// --- Funciones ---
// Función para generar fechas dinámicas (hoy + 7 días)
function generarFechasDisponibles() {
  const fechas = [];
  const hoy = new Date();
  for (let i = 0; i < 7; i++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + i);
    fechas.push(fecha.toISOString().split("T")[0]);
  }
  return fechas;
}

// Función para convertir fecha ISO a formato legible para el usuario
function formatearFechaParaSelect(fechaISO) {
  const opciones = { weekday: "long", day: "numeric", month: "long" };
  const fecha = new Date(fechaISO + "T00:00:00");
  let formateada = fecha.toLocaleDateString("es-AR", opciones);
  return formateada.charAt(0).toUpperCase() + formateada.slice(1);
}

// Función para cargar las fechas en el select
function cargarFechasEnSelect() {
  const fechas = generarFechasDisponibles();
  const selectFecha = document.getElementById("fecha");
  if (!selectFecha) return;
  fechas.forEach((fecha) => {
    const option = document.createElement("option");
    option.value = fecha;
    option.textContent = formatearFechaParaSelect(fecha);
    selectFecha.appendChild(option);
  });
  selectFecha.selectedIndex = 0;
}
cargarFechasEnSelect();

// Función para cargar las horas en el select
function cargarHorasEnSelect() {
  const selectHora = document.getElementById("hora");
  if (!selectHora) return;
  horasDisponibles.forEach((hora) => {
    const option = document.createElement("option");
    option.value = hora.hora;
    option.textContent = hora.hora;
    selectHora.appendChild(option);
  });
  selectHora.selectedIndex = 0;
}
cargarHorasEnSelect();

// Función para calcular la hora final de la reserva
function calcularHoraFinal(horaInicio, duracion) {
  const duracionTurnos = duracion / 30;
  const indexHoraInicio = horasDisponibles.findIndex(
    (h) => h.hora === horaInicio
  );
  if (indexHoraInicio === -1) return "Error: Hora de inicio no válida";

  const indexHoraFinal = indexHoraInicio + duracionTurnos;
  if (indexHoraFinal >= horasDisponibles.length)
    return "Error: La duración excede el horario disponible";

  return horasDisponibles[indexHoraFinal].hora;
}

// Función para verificar la disponibilidad del turno
function verificarDisponibilidad(fecha, horaInicio, horaFinal) {
  const reservasDelDia = reservas.filter((r) => r.fecha === fecha);
  const indexInicioNueva = horasDisponibles.findIndex(
    (h) => h.hora === horaInicio
  );
  const indexFinalNueva = horasDisponibles.findIndex(
    (h) => h.hora === horaFinal
  );
  return !reservasDelDia.some((r) => {
    const iInicio = horasDisponibles.findIndex((h) => h.hora === r.hora);
    const iFinal = horasDisponibles.findIndex((h) => h.hora === r.horaFinal);
    return iInicio <= indexFinalNueva && iFinal >= indexInicioNueva;
  });
}

// Seleccionar elementos
const seleccionarHora = document.getElementById("hora");
const seleccionarFecha = document.getElementById("fecha");
const seleccionarDuracion = document.getElementById("duracion");

// Mostrar previsualización al cambiar cualquier campo
if (seleccionarFecha && seleccionarHora && seleccionarDuracion) {
  seleccionarFecha.addEventListener("change", mostrarPrevisualizacion);
  seleccionarHora.addEventListener("change", mostrarPrevisualizacion);
  seleccionarDuracion.addEventListener("change", mostrarPrevisualizacion);
}

// Función para mostrar la previsualización de la reserva
function mostrarPrevisualizacion() {
  const seleccionarHora = document.getElementById("hora");
  const seleccionarFecha = document.getElementById("fecha");
  const seleccionarDuracion = document.getElementById("duracion");
  if (!seleccionarHora || !seleccionarFecha || !seleccionarDuracion) return;

  const fechaSeleccionada = seleccionarFecha.value;
  const horaSeleccionada = seleccionarHora.value;
  const duracionSeleccionada = seleccionarDuracion.value;
  if (!fechaSeleccionada || !horaSeleccionada || !duracionSeleccionada) return;

  const duracionEnMinutos = parseInt(duracionSeleccionada);
  const horaFinalCalculada = calcularHoraFinal(
    horaSeleccionada,
    duracionEnMinutos
  );

  const preview = document.getElementById("previsualizar-reserva");
  if (!preview) return;

  preview.innerHTML = "";
  preview.classList.remove("fade-in");
  void preview.offsetWidth;

  if (horaFinalCalculada.includes("Error")) {
    preview.textContent =
      "No se puede reservar esa duración en ese horario debido a que excede el horario disponible (23hs).";
  } else {
    const fechaFormateada = formatearFechaParaSelect(fechaSeleccionada);
    preview.innerHTML = `
      <strong>📅 ${fechaFormateada}</strong>
      <strong>⏰ De ${horaSeleccionada} a ${horaFinalCalculada} hs</strong>
    `;
  }
  preview.classList.add("fade-in");
}

// Función para mostrar UNA reserva en pantalla
function mostrarReserva(reserva) {
  const lista = document.getElementById("lista-reservas");
  if (!lista) return;
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>👤 ${reserva.nombre} ${reserva.apellido}</strong><br>
    📅 ${reserva.fecha} - ⏰ ${reserva.hora} a ${reserva.horaFinal} hs
  `;
  lista.appendChild(li);
}

// Función para cargar TODAS las reservas guardadas
function cargarReservas() {
  reservas.forEach(mostrarReserva);
}
cargarReservas();

// Evento del formulario
const formReserva = document.getElementById("form-reserva");
if (formReserva) {
  formReserva.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const duracion = document.getElementById("duracion").value;
    const mensajeError = document.getElementById("mensajesDeError");
    mensajeError.innerHTML = "";

    const duracionEnMinutos = parseInt(duracion);
    const horaFinal = calcularHoraFinal(hora, duracionEnMinutos);
    if (horaFinal.includes("Error")) {
      mensajeError.textContent =
        "No se puede reservar esa duración en ese horario.";
      return;
    }

    if (
      nombre.length < 3 ||
      apellido.length < 3 ||
      !email.includes("@") ||
      !/^\d{10}$/.test(telefono)
    ) {
      mensajeError.textContent = "Verificá los datos ingresados.";
      return;
    }

    const disponible = verificarDisponibilidad(fecha, hora, horaFinal);
    if (!disponible) {
      mensajeError.textContent = "El turno no está disponible.";
      return;
    }

    const nuevaReserva = {
      nombre,
      apellido,
      email,
      telefono,
      fecha,
      hora,
      duracion,
      horaFinal,
    };
    reservas.push(nuevaReserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));
    mostrarReserva(nuevaReserva);
    formReserva.reset();
  });
}

// --- EXPORTAR PARA OTROS MÓDULOS ---
export { reservas, mostrarReserva, cargarReservas };
