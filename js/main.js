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

const jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];

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
const modalJugador = document.getElementById("modal-jugador");
const botonConfirmarJugador = document.getElementById("btn-confirmar-jugador");
const botonCancelarJugador = document.getElementById("btn-cancelar-jugador");
const detalleJugador = document.getElementById("detalle-jugador");

let reservaPendiente = null;

// Esta función capitaliza el primer carácter de una cadena
function capitalizar(texto) {
  return texto
    .toLowerCase()
    .split(" ")
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}

// Esta función activa el menú lateral y muestra el submenú correspondiente al ícono seleccionado
function menuLateral() {
  const iconos = document.querySelectorAll(".nav-item");
  const todosLosSubmenus = document.querySelectorAll(".submenu");
  const cajaSubmenus = document.querySelector(".submenus");

  // Al hacer clic en un ícono, mostrar el submenú correspondiente
  iconos.forEach((icono) => {
    icono.addEventListener("click", () => {
      const nombreMenu = icono.dataset.menu;

      todosLosSubmenus.forEach((bloque) => {
        bloque.style.display = "none";
      });

      const submenuActual = document.getElementById(`menu-${nombreMenu}`);
      if (submenuActual) {
        cajaSubmenus.style.display = "flex";
        submenuActual.style.display = "flex";
      }
    });
  });
}

function guardarJugadorDesdeFormulario() {
  const mensajeError = document.getElementById("mensaje-error-jugador");
  mensajeError.textContent = "";

  const nombre = capitalizar(document.getElementById("nombre").value.trim());
  const apellido = capitalizar(
    document.getElementById("apellido").value.trim()
  );
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  const yaExiste = jugadores.some(
    (jugador) =>
      jugador.email.toLowerCase() === email.toLowerCase() ||
      jugador.telefono === telefono
  );

  if (yaExiste) {
    mensajeError.textContent = "Ya existe un jugador con ese email o teléfono.";
    return;
  }

  const nuevoJugador = {
    id: Date.now(),
    nombre,
    apellido,
    email,
    telefono,
  };

  jugadores.push(nuevoJugador);
  localStorage.setItem("jugadores", JSON.stringify(jugadores));

  document.getElementById("form-jugador").reset();

  document
    .querySelector("#dropdown-jugador .dropdown-opciones")
    .classList.remove("abierto");

  mostrarOpcionesDeJugadores();
}

// ------------------------------
// FUNCIONES PARA FECHAS
// ------------------------------

// Esta función genera un array con las fechas disponibles para reservar
// (hoy y los próximos 6 días)
function generarFechasDisponibles() {
  const fechas = [];
  const hoy = new Date();

  // Ciclo for para generar fechas desde hoy hasta 6 días adelante
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

function mostrarOpcionesDeJugadores() {
  const lista = document.querySelector("#dropdown-jugador .dropdown-opciones");
  const boton = document.querySelector("#dropdown-jugador .dropdown-toggle");
  const campoJugador = document.getElementById("jugador");

  const jugadoresActualizados =
    JSON.parse(localStorage.getItem("jugadores")) || [];

  lista.innerHTML = "";

  jugadoresActualizados.forEach((jugador) => {
    const item = document.createElement("li");
    item.textContent = `${jugador.nombre} ${jugador.apellido}`;
    item.dataset.valor = jugador.id;

    item.addEventListener("click", () => {
      campoJugador.value = jugador.id;

      boton.textContent = item.textContent;

      lista.classList.remove("abierto");
      mostrarPrevisualizacion();
    });

    lista.appendChild(item);
  });

  // Este evento SÍ debe quedar
  boton.addEventListener("click", () => {
    lista.classList.toggle("abierto");
  });
}

// Esta función carga las fechas disponibles en el menú desplegable
function mostrarOpcionesDeFecha() {
  const fechas = generarFechasDisponibles();
  const lista = document.querySelector("#dropdown-fecha .dropdown-opciones");
  const boton = document.querySelector("#dropdown-fecha .dropdown-toggle");
  const campoFecha = document.getElementById("fecha");

  lista.innerHTML = ""; // Limpiamos la lista antes de agregar

  fechas.forEach((fechaISO) => {
    const fechaLegible = formatearFecha(fechaISO);
    const opcion = document.createElement("li");
    opcion.textContent = fechaLegible;
    opcion.dataset.valor = fechaISO;

    // Al hacer clic en una opción, se actualiza el input y se cierra el menú
    opcion.addEventListener("click", () => {
      campoFecha.value = fechaISO;
      boton.textContent = fechaLegible;
      lista.classList.remove("abierto");
    });

    lista.appendChild(opcion);
  });

  boton.addEventListener("click", () => {
    lista.classList.toggle("abierto");
  });
}

// Esta función carga las horas disponibles en el menú desplegable
function mostrarOpcionesDeHora() {
  const lista = document.querySelector("#dropdown-hora .dropdown-opciones");
  const boton = document.querySelector("#dropdown-hora .dropdown-toggle");
  const campoHora = document.getElementById("hora");

  lista.innerHTML = ""; // Limpiamos antes de cargar

  horasDisponibles.forEach((horaObj) => {
    const item = document.createElement("li");
    item.textContent = `${horaObj.hora} hs`;
    item.dataset.valor = horaObj.hora;

    item.addEventListener("click", () => {
      campoHora.value = horaObj.hora;
      boton.textContent = item.textContent;
      lista.classList.remove("abierto");
      if (typeof mostrarPrevisualizacion === "function") {
        mostrarPrevisualizacion();
      }
    });

    lista.appendChild(item);
  });

  boton.addEventListener("click", () => {
    lista.classList.toggle("abierto");
  });
}

// Esta función carga las duraciones disponibles en el menú desplegable
function mostrarOpcionesDeDuracion() {
  const duraciones = [
    { texto: "60 min", valor: "60" },
    { texto: "90 min", valor: "90" },
    { texto: "120 min", valor: "120" },
  ];

  const lista = document.querySelector("#dropdown-duracion .dropdown-opciones");
  const boton = document.querySelector("#dropdown-duracion .dropdown-toggle");
  const campoDuracion = document.getElementById("duracion");

  lista.innerHTML = "";

  duraciones.forEach((opcion) => {
    const item = document.createElement("li");
    item.textContent = opcion.texto;
    item.dataset.valor = opcion.valor;

    item.addEventListener("click", () => {
      campoDuracion.value = opcion.valor;
      boton.textContent = opcion.texto;
      lista.classList.remove("abierto");
      mostrarPrevisualizacion();
    });

    lista.appendChild(item);
  });

  boton.addEventListener("click", () => {
    lista.classList.toggle("abierto");
  });
}

// Esta función configura el cierre de los dropdowns al hacer clic fuera de ellos
function configurarCierreDropdowns() {
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#dropdown-duracion")) {
      document
        .querySelector("#dropdown-duracion .dropdown-opciones")
        ?.classList.remove("abierto");
    }
    if (!e.target.closest("#dropdown-fecha")) {
      document
        .querySelector("#dropdown-fecha .dropdown-opciones")
        ?.classList.remove("abierto");
    }
    if (!e.target.closest("#dropdown-hora")) {
      document
        .querySelector("#dropdown-hora .dropdown-opciones")
        ?.classList.remove("abierto");
    }
    if (!e.target.closest(".sidebar")) {
      document.querySelector(".submenus").style.display = "none";
      document.querySelectorAll(".submenu").forEach((bloque) => {
        bloque.style.display = "none";
      });
    }
  });
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

// Esta función cambió muchas veces, ya que antes previsualizaba el texto en la pantalla. Pero para mejorar la UX, quise implementar un modal luego.
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
function crearTarjeta(reserva, index) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("card-reserva");

  tarjeta.innerHTML = `
    <div class="estado-fecha">
      <p class="hora-turno"><i class="fas fa-clock"></i> ${reserva.hora} a ${
    reserva.horaFinal
  } hs</p>
      <span class="badge-estado">Confirmada</span>
    </div>
    <h4>
      <i class="fas fa-user"></i> ${reserva.nombre.toUpperCase()} ${reserva.apellido.toUpperCase()}
    </h4>
    <p class="fecha-turno">
      <i class="fas fa-calendar-day"></i> ${formatearFecha(reserva.fecha)}
    </p>
    <p>
      <i class="fas fa-hourglass-half"></i> ${reserva.duracion} minutos
    </p>
    <p>
      <i class="fas fa-envelope"></i> ${reserva.email}
    </p>
    <button class="btn-cancelar" data-index="${index}">Cancelar</button>
  `;

  return tarjeta;
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
  const jugadorId = document.getElementById("jugador").value;

  const jugadoresActualizados =
    JSON.parse(localStorage.getItem("jugadores")) || [];
  const jugador = jugadoresActualizados.find((j) => j.id == jugadorId);

  return {
    nombre: jugador?.nombre || "",
    apellido: jugador?.apellido || "",
    email: jugador?.email || "",
    telefono: jugador?.telefono || "",
    fecha: seleccionarFecha.value,
    hora: seleccionarHora.value,
    duracion: parseInt(seleccionarDuracion.value),
  };
}

// Esta función valida los datos del formulario y devuelve un mensaje de error si hay algún problema
function validarDatos({ nombre, apellido, email, telefono }) {
  if (nombre.length < 2) return "Nombre muy corto.";
  if (apellido.length < 2) return "Apellido muy corto.";
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!regexEmail.test(email)) return "Email no válido.";
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
    const nuevaTarjeta = crearTarjeta(reserva, reservas.length - 1);
    contenedor.appendChild(nuevaTarjeta);
  }
}

// Funcion con mucha ayuda de IA.
// Esta función muestra el modal de confirmación y activa los botones de confirmar y cancelar
function mostrarModalConfirmacion(reserva) {
  reservaPendiente = reserva;

  detalleConfirmacion.innerHTML = `
  <p><i class="fas fa-question-circle"></i> ¿Querés confirmar la reserva?</p>
  <p><i class="fas fa-user"></i> ${reserva.nombre} ${
    reserva.apellido
  }</p> <!-- ✅ agregado -->
  <p><i class="fas fa-calendar-day"></i> ${formatearFecha(reserva.fecha)}</p>
  <p><i class="fas fa-clock"></i> De ${reserva.hora} a ${
    reserva.horaFinal
  } hs</p>
  <p><i class="fas fa-hourglass-half"></i> ${reserva.duracion} minutos</p>
`;

  modalConfirmacion.classList.remove("hidden");

  // Misma solucion que la IA. No se que hace cloneNode, pero me lo arregló.
  const nuevoBotonConfirmar = botonConfirmar.cloneNode(true);
  const nuevoBotonCancelar = botonCancelar.cloneNode(true);
  botonConfirmar.parentNode.replaceChild(nuevoBotonConfirmar, botonConfirmar);
  botonCancelar.parentNode.replaceChild(nuevoBotonCancelar, botonCancelar);
  nuevoBotonConfirmar.addEventListener("click", () => {
    if (reservaPendiente) {
      guardarReserva(reservaPendiente);
      document.getElementById("form-reserva").reset();
      modalConfirmacion.classList.add("hidden");
      reservaPendiente = null;
    }
  });

  nuevoBotonCancelar.addEventListener("click", () => {
    modalConfirmacion.classList.add("hidden");
    reservaPendiente = null;
  });
}
function mostrarModalJugadorConfirmacion(jugador) {
  detalleJugador.innerHTML = `
    <p><i class="fas fa-question-circle"></i> ¿Querés agregar este jugador?</p>
    <p><i class="fas fa-user"></i> ${jugador.nombre} ${jugador.apellido}</p>
    <p><i class="fas fa-envelope"></i> ${jugador.email}</p>
    <p><i class="fas fa-phone"></i> ${jugador.telefono}</p>
  `;

  modalJugador.classList.remove("hidden");

  // 🚫 Estas constantes no se pueden volver a usar con el mismo nombre, así que usamos nuevos
  const nuevoBtnConfirmarJugador = botonConfirmarJugador.cloneNode(true);
  const nuevoBtnCancelarJugador = botonCancelarJugador.cloneNode(true);

  // Reemplazamos en el DOM
  botonConfirmarJugador.parentNode.replaceChild(
    nuevoBtnConfirmarJugador,
    botonConfirmarJugador
  );
  botonCancelarJugador.parentNode.replaceChild(
    nuevoBtnCancelarJugador,
    botonCancelarJugador
  );

  // Listeners NUEVOS
  nuevoBtnConfirmarJugador.addEventListener("click", () => {
    jugadores.push(jugador);
    localStorage.setItem("jugadores", JSON.stringify(jugadores));
    document.getElementById("form-jugador").reset();
    mostrarOpcionesDeJugadores();
    modalJugador.classList.add("hidden");
  });

  nuevoBtnCancelarJugador.addEventListener("click", () => {
    modalJugador.classList.add("hidden");
  });
}

// ------------------------------
// EVENTO PRINCIPAL
// ------------------------------

// Esta función prepara el formulario para que al enviarlo se validen los datos y se guarde la reserva
function prepararFormularioReserva() {
  const form = document.getElementById("form-reserva");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const datos = obtenerDatos();
      const mensajeError = document.getElementById("mensajesDeError");
      mensajeError.textContent = "";

      const mensaje = validarDatos(datos);
      if (mensaje) {
        mensajeError.textContent = mensaje;
        return;
      }

      const reserva = crearReserva(datos);
      if (!reserva) {
        mensajeError.textContent = "Turno no disponible.";
        return;
      }

      mostrarModalConfirmacion(reserva);
    });
  }
}

function prepararFormularioJugador() {
  const form = document.getElementById("form-jugador");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const datos = {
        nombre: capitalizar(nombre.value.trim()),
        apellido: capitalizar(apellido.value.trim()),
        email: email.value.trim(),
        telefono: telefono.value.trim(),
      };

      const mensajeError = document.getElementById("mensaje-error-jugador");
      mensajeError.textContent = "";

      const mensaje = validarDatos(datos);
      if (mensaje) {
        mensajeError.textContent = mensaje;
        return;
      }

      // Reutilizamos la misma lógica: agregamos ID y mandamos al modal
      const nuevoJugador = { ...datos, id: Date.now() };
      mostrarModalJugadorConfirmacion(nuevoJugador);
    });
  }
}

// Esta función permite eliminar una reserva
function eliminarReserva(index) {
  reservas.splice(index, 1);
  localStorage.setItem("reservas", JSON.stringify(reservas));
}

// ------------------------------
// INICIAR TODO
// ------------------------------

// Esta función se ejecuta al cargar la página y llama a las funciones necesarias para inicializar la página
function iniciarFuncionesDeReserva() {
  const formularioReserva = document.getElementById("form-reserva");

  if (formularioReserva) {
    menuLateral();
    mostrarOpcionesDeJugadores();
    mostrarOpcionesDeFecha();
    mostrarOpcionesDeHora();
    mostrarOpcionesDeDuracion();
    configurarCierreDropdowns();
    activarPrevisualizacion();
    prepararFormularioJugador();
    prepararFormularioReserva();
  }
}

document.addEventListener("DOMContentLoaded", iniciarFuncionesDeReserva);

// ------------------------------
// EXPORTAR FUNCIONES
// ------------------------------

export {
  reservas,
  crearTarjeta,
  cargarReservas,
  eliminarReserva,
  formatearFecha,
};
