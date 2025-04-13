// ------------------------------
// VARIABLES INICIALES
// ------------------------------

// Horas posibles para reservar
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

// Cargar reservas previas si existen
const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

// Elementos de selección de fecha y hora
const seleccionarHora = document.getElementById("hora");
const seleccionarFecha = document.getElementById("fecha");
const seleccionarDuracion = document.getElementById("duracion");

// Elementos del formulario
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");

// Elementos del modal de confirmación
const modalConfirmacion = document.getElementById("modal-confirmacion");
const detalleConfirmacion = document.getElementById("detalle-confirmacion");
const botonConfirmar = document.getElementById("btn-confirmar");
const botonCancelar = document.getElementById("btn-cancelar");
let reservaPendiente = null;

// ------------------------------
// FUNCIONES PARA FECHAS
// ------------------------------

// Esta función genera un array con las fechas disponibles para reservar
// (hoy y los próximos 6 días)
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

// Esta función formatea una fecha en formato ISO a un formato legible
// (ejemplo: "2025-05-15" a "Miércoles 15 de mayo")
function formatearFecha(fechaISO) {
  const opciones = { weekday: "long", day: "numeric", month: "long" };
  const fecha = new Date(fechaISO + "T00:00:00");
  const legible = fecha.toLocaleDateString("es-AR", opciones);
  return legible.charAt(0).toUpperCase() + legible.slice(1);
}

// ------------------------------
// FUNCIONES DE CARGA DE FECHAS Y HORAS
// ------------------------------

// Esta función carga las fechas disponibles en el select de fechas
function cargarFechas() {
  const fechas = generarFechasDisponibles();
  for (const f of fechas) {
    const opcion = document.createElement("option");
    opcion.value = f;
    opcion.textContent = formatearFecha(f);
    seleccionarFecha.appendChild(opcion);
  }
}

// Esta función carga las horas disponibles en el select de horas
function cargarHoras() {
  for (const h of horasDisponibles) {
    const opcion = document.createElement("option");
    opcion.value = h.hora;
    opcion.textContent = h.hora;
    seleccionarHora.appendChild(opcion);
  }
}

// Esta función calcula la hora final de una reserva a partir de la hora de inicio y la duración
function calcularHoraFinal(inicio, duracion) {
  const turnos = duracion / 30;
  const iInicio = horasDisponibles.findIndex((h) => h.hora === inicio);
  if (iInicio === -1) return null;
  const iFinal = iInicio + turnos;
  return horasDisponibles[iFinal] ? horasDisponibles[iFinal].hora : null;
}

// Esta función verifica si un turno está disponible en una fecha específica comparando las reservas existentes
function esTurnoDisponible(fecha, inicio, fin) {
  const delDia = reservas.filter((r) => r.fecha === fecha);
  const iNuevoInicio = horasDisponibles.findIndex((h) => h.hora === inicio);
  const iNuevoFin = horasDisponibles.findIndex((h) => h.hora === fin);

  return !delDia.some((r) => {
    const iExistenteInicio = horasDisponibles.findIndex(
      (h) => h.hora === r.hora
    );
    const iExistenteFin = horasDisponibles.findIndex(
      (h) => h.hora === r.horaFinal
    );
    return iExistenteInicio < iNuevoFin && iExistenteFin > iNuevoInicio;
  });
}

// ------------------------------
// FORMULARIO Y PREVISUALIZACIÓN
// ------------------------------

// Esta función muestra una previsualización de la reserva
function mostrarPrevisualizacion() {
  const preview = document.getElementById("previsualizar-reserva");
  if (!preview) return;

  const horaFinal = calcularHoraFinal(
    seleccionarHora.value,
    parseInt(seleccionarDuracion.value)
  );
  preview.innerHTML = "";

  if (!horaFinal) {
    preview.textContent = "No se puede reservar esa duración.";
    return;
  }

  preview.innerHTML = `
    <strong>📅 ${formatearFecha(seleccionarFecha.value)}</strong>
    <strong>⏰ De ${seleccionarHora.value} a ${horaFinal} hs</strong>
  `;
}

// Esta función activa la previsualización de la reserva al cambiar los selects
function activarPrevisualizacion() {
  seleccionarFecha.addEventListener("change", mostrarPrevisualizacion);
  seleccionarHora.addEventListener("change", mostrarPrevisualizacion);
  seleccionarDuracion.addEventListener("change", mostrarPrevisualizacion);
}

// ------------------------------
// RESERVAS
// ------------------------------

// Esta función crea una tarjeta de reserva
function crearTarjeta(reserva) {
  const contenedor = document.getElementById("lista-reservas");
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("card-reserva");

  tarjeta.innerHTML = `
    <p><strong>👤 ${reserva.nombre} ${reserva.apellido}</strong></p>
    <p>📅 ${formatearFecha(reserva.fecha)}</p>
    <p>⏰ De ${reserva.hora} a ${reserva.horaFinal} hs</p>
    <p>⌛ ${reserva.duracion} minutos</p>
    <p>📧 ${reserva.email}</p>
  `;

  contenedor.appendChild(tarjeta);
}

// Esta funcion carga las reservas y las ordena por fecha y hora
function cargarReservas() {
  const contenedor = document.getElementById("lista-reservas");
  contenedor.innerHTML = "";

  const copia = reservas.slice();
  copia.sort(
    (a, b) =>
      new Date(`${a.fecha}T${a.hora}`) - new Date(`${b.fecha}T${b.hora}`)
  );

  for (const reserva of copia) {
    crearTarjeta(reserva);
  }
}

// Esta función obtiene los datos del formulario y los devuelve como un objeto
function obtenerDatos() {
  return {
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    telefono: telefono.value,
    fecha: seleccionarFecha.value,
    hora: seleccionarHora.value,
    duracion: parseInt(seleccionarDuracion.value),
  };
}

// Esta función valida los datos del formulario y devuelve un mensaje de error si hay algún problema
function validarDatos({ nombre, apellido, email, telefono }) {
  if (nombre.length < 2) return "Nombre muy corto.";
  if (apellido.length < 2) return "Apellido muy corto.";
  if (!/\S+@\S+\.\S+/.test(email)) return "Email no válido.";
  if (!/^\d{10}$/.test(telefono)) return "Teléfono no válido.";
  return null;
}

// Esta función crea una reserva a partir de los datos del formulario
function crearReserva(datos) {
  const horaFinal = calcularHoraFinal(datos.hora, datos.duracion);
  if (!horaFinal) return null;
  if (!esTurnoDisponible(datos.fecha, datos.hora, horaFinal)) return null;
  return { ...datos, horaFinal };
}

// Esta función guarda la reserva en el array de reservas y en el localStorage
function guardarReserva(reserva) {
  reservas.push(reserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));

  const contenedor = document.getElementById("lista-reservas");
  if (contenedor) {
    crearTarjeta(reserva);
  }
}

// Esta función muestra el modal de confirmación y activa los botones de confirmar y cancelar
function mostrarModalConfirmacion(reserva) {
  reservaPendiente = reserva;

  detalleConfirmacion.innerHTML = `
    <p>¿Querés confirmar la reserva?</p>
    <p>📅 ${formatearFecha(reserva.fecha)}</p>
    <p>⏰ De ${reserva.hora} a ${reserva.horaFinal} hs</p>
    <p>⌛ ${reserva.duracion} minutos</p>
  `;

  modalConfirmacion.classList.remove("hidden");

  botonConfirmar.addEventListener("click", () => {
    if (reservaPendiente) {
      guardarReserva(reservaPendiente);
      document.getElementById("form-reserva").reset();
      modalConfirmacion.classList.add("hidden");
      reservaPendiente = null;
    }
  });

  botonCancelar.addEventListener("click", () => {
    modalConfirmacion.classList.add("hidden");
    reservaPendiente = null;
  });
}

// ------------------------------
// EVENTO PRINCIPAL
// ------------------------------

// Esta función prepara el formulario para que al enviarlo se validen los datos y se guarde la reserva
function prepararFormulario() {
  const form = document.getElementById("form-reserva");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const error = document.getElementById("mensajesDeError");
    error.innerHTML = "";

    const datos = obtenerDatos();
    const mensaje = validarDatos(datos);

    if (mensaje) {
      error.textContent = mensaje;
      return;
    }

    const reserva = crearReserva(datos);

    if (!reserva) {
      error.textContent = "El turno no está disponible.";
      return;
    }

    mostrarModalConfirmacion(reserva);
    form.reset();
  });
}

// Esta función permite eliminar una reserva
function eliminarReserva(index) {
  reservas.splice(index, 1);
  localStorage.setItem("reservas", JSON.stringify(reservas));
}

// ------------------------------
// INICIAR
// ------------------------------

// Esta función se ejecuta al cargar la página y llama a las funciones necesarias para inicializar la página
function iniciarFuncionesDeReserva() {
  const formularioReserva = document.getElementById("form-reserva");

  if (formularioReserva) {
    cargarFechas();
    cargarHoras();
    activarPrevisualizacion();
    prepararFormulario();
  }
}

document.addEventListener("DOMContentLoaded", iniciarFuncionesDeReserva);

// ------------------------------
// EXPORTAR (si se usa en otro archivo)
// ------------------------------

export {
  reservas,
  crearTarjeta,
  cargarReservas,
  eliminarReserva,
  formatearFecha,
};
