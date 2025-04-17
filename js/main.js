// VARIABLES INICIALES

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

const duracionesDisponibles = [
  { valor: 60, texto: "60 min" },
  { valor: 90, texto: "90 min" },
  { valor: 120, texto: "120 min" },
  { valor: 180, texto: "180 min" },
];

const jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];
const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

// FUNCIONES GENERALES Y VALIDACIONES

// Función para capitalizar la primera letra de cada palabra, inclusive si son varios nombres
function capitalizarPrimeraLetra(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarTelefono(telefono) {
  const regex = /^\d{10}$/;
  return regex.test(telefono);
}

// Función para calcular los turnos ocupados en base a la hora y duración
// Se asume que la duración es en minutos y se divide entre 30 para obtener el número de turnos ocupados
function calcularTurnosOcupados(hora, duracion) {
  const turno = [];
  const cantidadHoras = duracion / 30;
  const indiceHora = horasDisponibles.findIndex((h) => h.hora === hora);

  if (indiceHora === -1 || isNaN(cantidadHoras) || cantidadHoras < 1) return [];

  for (let i = 0; i < cantidadHoras; i++) {
    const horaReservada = horasDisponibles[indiceHora + i].hora;
    if (horaReservada) {
      turno.push(horaReservada);
    }
  }

  return turno;
}

// Función para validar si un turno está reservado
// Se compara la nueva reserva con las reservas existentes para ver si hay conflictos
function validarTurnoReservado(fecha, hora, duracion) {
  const nuevoTurno = calcularTurnosOcupados(hora, duracion);
  const turnosReservados = reservas.filter(
    (reserva) => reserva.fecha === fecha
  );

  for (const reserva of turnosReservados) {
    const horasReservadas = calcularTurnosOcupados(
      reserva.hora,
      reserva.duracion
    );
    const turnoOcupado = horasReservadas.some((horaReservada) =>
      nuevoTurno.includes(horaReservada)
    );

    if (turnoOcupado) {
      return false; // El turno está ocupado
    }
  }
  return true;
}

// FORMULARIOS

// Funciones para manejar los formularios de jugadores y reservas
function formularioJugador() {
  const formJugador = document.getElementById("form-jugador");
  const mensajeError = document.getElementById("mensaje-error");
  const tituloFormulario = document.getElementById("titulo-jugador");
  const botonJugador = document.getElementById("btn-jugador");

  if (!formJugador || !mensajeError) return;

  formJugador.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = capitalizarPrimeraLetra(
      document.getElementById("nombre")?.value.trim() || ""
    );
    const apellido = capitalizarPrimeraLetra(
      document.getElementById("apellido")?.value.trim() || ""
    );
    const email =
      document.getElementById("email")?.value.trim().toLowerCase() || "";
    const telefono = document.getElementById("telefono")?.value.trim() || "";

    // Limpiar mensajes anteriores
    mensajeError.textContent = "";
    mensajeError.className = "mensaje";
    mensajeError.style.display = "none";

    // Validaciones
    if (!nombre || !apellido || !email || !telefono) {
      mostrarMensaje("Por favor, completa todos los campos.", "error");
      return;
    }

    if (!validarEmail(email)) {
      mostrarMensaje("Por favor, ingresa un email válido.", "error");
      return;
    }

    if (!validarTelefono(telefono)) {
      mostrarMensaje("Por favor, ingresa un teléfono válido.", "error");
      return;
    }

    // Editando jugador
    const idEditando = parseInt(formJugador.dataset.editando || "0");

    // Verificamos si el email o teléfono ya están registrados
    const emailYaRegistrado = jugadores.some(
      (j) => j.email === email && j.id !== idEditando
    );
    if (emailYaRegistrado) {
      mostrarMensaje("Este email ya está registrado.", "error");
      return;
    }
    const telefonoYaRegistrado = jugadores.some(
      (j) => j.telefono === telefono && j.id !== idEditando
    );
    if (telefonoYaRegistrado) {
      mostrarMensaje("Este teléfono ya está registrado.", "error");
      return;
    }

    // Verificamos si el jugador está editando o es uno nuevo
    if (idEditando) {
      const index = jugadores.findIndex((j) => j.id === idEditando);
      if (index !== -1) {
        jugadores[index] = {
          id: idEditando,
          nombre,
          apellido,
          email,
          telefono,
        };
      }
      formJugador.dataset.editando = "";
      tituloFormulario.textContent = "Registrar jugador";
      botonJugador.textContent = "Guardar jugador";
    } else {
      const nuevoJugador = {
        id: jugadores.length + 1,
        nombre,
        apellido,
        email,
        telefono,
      };
      jugadores.push(nuevoJugador);
    }

    localStorage.setItem("jugadores", JSON.stringify(jugadores));
    cargarJugadoresEnSelect();
    mostrarJugadoresRegistrados();
    mostrarMensaje("Jugador guardado correctamente.", "exito");
    formJugador.reset();
  });
}

function formularioReserva() {
  const formReserva = document.getElementById("form-reserva");
  const mensajeError = document.getElementById("mensaje-error-reserva");
  const tituloFormulario = document.getElementById("titulo-formulario");
  const botonReserva = document.getElementById("btn-reserva");

  if (!formReserva || !mensajeError) return;

  formReserva.addEventListener("submit", function (e) {
    e.preventDefault();

    const jugadorId = parseInt(
      document.getElementById("jugador")?.value.trim() || ""
    );
    const fecha = document.getElementById("fecha")?.value.trim() || "";
    const hora = document.getElementById("hora")?.value.trim() || "";
    const duracion = parseInt(
      document.getElementById("duracion")?.value.trim() || "0"
    );

    mensajeError.textContent = "";

    if (!jugadorId || !fecha || !hora || !duracion) {
      mensajeError.textContent = "Por favor, completa todos los campos.";
      return;
    }

    const jugadorReservado = jugadores.find((j) => j.id === jugadorId);
    if (!jugadorReservado) {
      mensajeError.textContent = "Jugador no encontrado.";
      return;
    }

    const idEditando = parseInt(formReserva.dataset.editando || "0");

    // Verificamos que el turno esté libre (excepto si es el mismo)
    const conflicto = reservas.some((reserva) => {
      if (idEditando && reserva.id === idEditando) return false;
      if (reserva.fecha !== fecha) return false;
      const horas1 = calcularTurnosOcupados(reserva.hora, reserva.duracion);
      const horas2 = calcularTurnosOcupados(hora, duracion);
      return horas1.some((h) => horas2.includes(h));
    });

    if (conflicto) {
      mensajeError.textContent = "El turno ya está reservado.";
      return;
    }

    // Modo edición
    if (idEditando) {
      const index = reservas.findIndex((r) => r.id === idEditando);
      if (index !== -1) {
        reservas[index] = {
          id: idEditando,
          jugadorId,
          nombre: jugadorReservado.nombre,
          apellido: jugadorReservado.apellido,
          fecha,
          hora,
          duracion,
        };
      }
      formReserva.dataset.editando = "";
      // Volver a modo normal
      if (tituloFormulario) tituloFormulario.textContent = "Realizar reserva";
      if (botonReserva) botonReserva.textContent = "Guardar reserva";
    } else {
      // Nueva reserva
      const nuevaReserva = {
        id: reservas.length + 1,
        jugadorId,
        nombre: jugadorReservado.nombre,
        apellido: jugadorReservado.apellido,
        fecha,
        hora,
        duracion,
      };
      reservas.push(nuevaReserva);
    }

    localStorage.setItem("reservas", JSON.stringify(reservas));
    mostrarReservasRegistradas();
    mensajeError.textContent = `Reserva guardada con éxito para ${jugadorReservado.nombre} ${jugadorReservado.apellido} el ${fecha} a las ${hora}.`;
    formReserva.reset();
  });
}

// CARGAR SELECTS

function cargarJugadoresEnSelect() {
  const selectJugadores = document.getElementById("jugador");
  if (!selectJugadores) return; // Verificar si el elemento existe

  selectJugadores.innerHTML = ""; // Limpiar el select antes de cargar los jugadores

  jugadores.forEach((jugador) => {
    const option = document.createElement("option");
    option.value = jugador.id;
    option.textContent = `${jugador.nombre} ${jugador.apellido}`;
    selectJugadores.appendChild(option);
  });
}

function cargarHorasEnSelect() {
  const selectHoras = document.getElementById("hora");

  if (!selectHoras) return; // Verificar si el elemento existe

  selectHoras.innerHTML = ""; // Limpiar el select antes de cargar las horas

  horasDisponibles.forEach((h) => {
    const option = document.createElement("option");
    option.value = h.hora;
    option.textContent = h.hora;
    selectHoras.appendChild(option);
  });
}

// Generar fechas disponibles para los próximos 7 días
function generarFechasDisponibles() {
  const hoy = new Date();
  const fechas = [];
  for (let i = 0; i <= 7; i++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + i);
    fechas.push(fecha.toISOString().split("T")[0]);
  }
  return fechas;
}

// Formatear fecha legible para mostrar en el select
// Se usa el formato "es-AR" para español de Argentina
function formatearFechaLegible(fechaISO) {
  return new Date(fechaISO + "T00:00:00").toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

// Crear opción de fecha para el select
function crearOptionFecha(fecha) {
  const option = document.createElement("option");
  option.value = fecha;
  option.textContent = formatearFechaLegible(fecha);
  return option;
}

// Cargar fechas en el select de reservas
function cargarFechasEnSelect() {
  const selectFechas = document.getElementById("fecha");
  if (!selectFechas) return;

  selectFechas.innerHTML = "";

  // Opción inicial
  const opcionInicial = document.createElement("option");
  opcionInicial.value = "";
  opcionInicial.textContent = "Seleccionar fecha";
  selectFechas.appendChild(opcionInicial);

  const fechas = generarFechasDisponibles();

  fechas.forEach((fecha) => {
    const option = document.createElement("option");
    option.value = fecha;

    // Mostrar la fecha en formato legible
    option.textContent = new Date(fecha + "T00:00:00").toLocaleDateString(
      "es-AR",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
      }
    );

    selectFechas.appendChild(option);
  });
}

// Cargar duraciones en el select de reservas
function cargarDuracionesEnSelect() {
  const selectDuraciones = document.getElementById("duracion");

  if (!selectDuraciones) return; // Verificar si el elemento existe

  selectDuraciones.innerHTML = ""; // Limpiar el select antes de cargar las duraciones

  duracionesDisponibles.forEach((duracion) => {
    const opcion = document.createElement("option");
    opcion.value = duracion.valor;
    opcion.textContent = duracion.texto;
    selectDuraciones.appendChild(opcion);
  });
}

//  JUGADORES Y RESERVAS REGISTRADOS

// Mostrar mensaje de error o éxito
// Se usa un ID por defecto para el mensaje de error, pero se puede cambiar al llamar a la función
function mostrarMensaje(texto, tipo, idElemento = "mensaje-error") {
  const elemento = document.getElementById(idElemento);
  if (!elemento) return;

  elemento.innerHTML = `
    <i class="fa-solid ${
      tipo === "error" ? "fa-circle-exclamation" : "fa-circle-check"
    }"></i>
    ${texto}
  `;
  elemento.style.display = "flex";
  elemento.className = `mensaje ${
    tipo === "error" ? "mensaje-error" : "mensaje-exito"
  }`;
}

// Función para calcular la hora de fin de una reserva
function calcularHoraFin(horaInicio, duracion) {
  const [hora, minuto] = horaInicio.split(":").map(Number);
  const inicio = new Date();
  inicio.setHours(hora);
  inicio.setMinutes(minuto);
  inicio.setMinutes(inicio.getMinutes() + duracion);
  return inicio.toTimeString().slice(0, 5);
}

// Mostrar jugadores registrados en la sección correspondiente
function mostrarJugadoresRegistrados() {
  const contenedor = document.getElementById("lista-jugadores");
  if (!contenedor) return;
  contenedor.innerHTML = "";

  if (jugadores.length === 0) {
    const vacio = document.createElement("p");
    vacio.textContent = "No hay jugadores registrados.";
    contenedor.appendChild(vacio);
    return;
  }

  jugadores.forEach((jugador) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
  <div class="card-body">
    <div class="info-jugador">
      <div class="header-jugador">
        <i class="fa-solid fa-user icono-card"></i>
        <h3 class="nombre-jugador">
          ${jugador.nombre.toUpperCase()} ${jugador.apellido.toUpperCase()}
          <span class="badge badge-activo">Activo</span>
        </h3>
      </div>
      <p class="dato-icono">
        <i class="fa-solid fa-envelope"></i>
        <span>${jugador.email}</span>
      </p>
      <p class="dato-icono">
        <i class="fa-solid fa-phone"></i>
        <span>${jugador.telefono}</span>
      </p>
    </div>
    <div class="acciones-jugador">
      <button class="boton-secundario btn-editar-jugador" data-id="${
        jugador.id
      }">
        <i class="fa-solid fa-pen"></i> Editar
      </button>
      <button class="boton-principal btn-eliminar" data-id="${jugador.id}">
        <i class="fa-solid fa-trash"></i> Eliminar
      </button>
    </div>
  </div>
`;

    contenedor.appendChild(card);
  });

  document.querySelectorAll(".btn-editar-jugador").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const jugador = jugadores.find((j) => j.id === id);
      if (!jugador) return;

      document.getElementById("nombre").value = jugador.nombre;
      document.getElementById("apellido").value = jugador.apellido;
      document.getElementById("email").value = jugador.email;
      document.getElementById("telefono").value = jugador.telefono;
      document.getElementById("form-jugador").dataset.editando = jugador.id;
      document.getElementById("titulo-jugador").textContent =
        "Editando jugador";
      document.getElementById("btn-jugador").textContent = "Guardar cambios";
    });
  });

  document.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      mostrarModalConfirmacion("¿Eliminar este jugador?", () =>
        eliminarJugador(id)
      );
    });
  });
}

// Mostrar reservas registradas en la sección correspondiente
function mostrarReservasRegistradas() {
  const contenedor = document.getElementById("lista-reservas");
  const fechaFiltrada = document.getElementById("filtro-fecha")?.value;
  contenedor.innerHTML = "";

  const reservasFiltradas = fechaFiltrada
    ? reservas.filter((r) => r.fecha === fechaFiltrada)
    : reservas;

  if (reservasFiltradas.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "No hay reservas para esta fecha.";
    contenedor.appendChild(mensaje);
    return;
  }

  reservasFiltradas.forEach((reserva) => {
    const card = document.createElement("div");
    card.className = "card";

    const horaFin = calcularHoraFin(reserva.hora, reserva.duracion);

    card.innerHTML = `
  <div class="card-body">
    <div class="info-reserva">
      <div class="header-reserva">
        <i class="fa-solid fa-user icono-card"></i>
        <h3 class="nombre-jugador">
          ${reserva.nombre.toUpperCase()} ${reserva.apellido.toUpperCase()}
        </h3>
      </div>
      <p><i class="fa-solid fa-calendar-day"></i> ${formatearFechaLegible(
        reserva.fecha
      )}</p>
      <p><i class="fa-solid fa-clock"></i> ${reserva.hora} a ${horaFin} (${
      reserva.duracion
    } min)</p>
    </div>
    <div class="acciones-reserva">
      <button class="boton-secundario btn-editar" data-id="${reserva.id}">
        <i class="fa-solid fa-pen"></i> Editar
      </button>
      <button class="boton-principal btn-eliminar" data-id="${reserva.id}">
        <i class="fa-solid fa-trash"></i> Eliminar
      </button>
    </div>
  </div>
`;

    contenedor.appendChild(card);
  });

  conectarBotonesDeReserva();
}

// Conectar botones de editar y eliminar reservas
// Se usa para que los botones funcionen después de que se cargan las reservas
function conectarBotonesDeReserva() {
  document.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const reservaId = parseInt(btn.dataset.id);
      const reserva = reservas.find((r) => r.id === reservaId);
      if (!reserva) return;

      document.getElementById("jugador").value = reserva.jugadorId;
      document.getElementById("fecha").value = reserva.fecha;
      document.getElementById("hora").value = reserva.hora;
      document.getElementById("duracion").value = reserva.duracion;

      const form = document.getElementById("form-reserva");
      form.dataset.editando = reserva.id;

      document.getElementById("titulo-formulario").textContent =
        "Editando reserva";
      document.getElementById("btn-reserva").textContent = "Guardar cambios";
    });
  });

  document.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const reservaId = parseInt(btn.dataset.id);
      mostrarModalConfirmacion(
        "¿Estás seguro que querés eliminar esta reserva?",
        () => {
          eliminarReserva(reservaId);
        }
      );
    });
  });
}

// Eliminar jugador o reserva
function eliminarJugador(jugadorId) {
  const jugadorIndex = jugadores.findIndex((j) => j.id === jugadorId);
  if (jugadorIndex !== -1) {
    jugadores.splice(jugadorIndex, 1);
    localStorage.setItem("jugadores", JSON.stringify(jugadores));
    mostrarJugadoresRegistrados(); // Actualizar la lista de jugadores
  }
}
function eliminarReserva(reservaId) {
  const reservaIndex = reservas.findIndex((r) => r.id === reservaId);
  if (reservaIndex !== -1) {
    reservas.splice(reservaIndex, 1);
    localStorage.setItem("reservas", JSON.stringify(reservas));
    mostrarReservasRegistradas(); // Actualizar la lista de reservas
  }
}

// FILTROS
// Filtrar reservas por fecha seleccionada
// Se usa el evento change para detectar cuando se selecciona una fecha
function filtrarReservasPorFecha() {
  const fechaSeleccionada = document.getElementById("filtro-fecha").value;
  const listaReservas = document.getElementById("lista-reservas");

  if (!listaReservas) return;
  listaReservas.innerHTML = "";

  const reservasFiltradas = fechaSeleccionada
    ? reservas.filter((reserva) => reserva.fecha === fechaSeleccionada)
    : reservas;

  if (reservasFiltradas.length === 0) {
    const elemento = document.createElement("li");
    elemento.textContent = "No hay reservas para esta fecha.";
    listaReservas.appendChild(elemento);
    return;
  }

  reservasFiltradas.forEach((reserva) => {
    const elemento = document.createElement("li");
    elemento.innerHTML = `
      ${reserva.nombre} ${reserva.apellido} - ${reserva.fecha} - ${reserva.hora}
      <button class="btn-editar" data-id="${reserva.id}">Editar</button>
      <button class="btn-eliminar" data-id="${reserva.id}">Eliminar</button>
    `;
    listaReservas.appendChild(elemento);
  });

  // Volvemos a conectar los botones
  conectarBotonesDeReserva();
}
// Cargar fechas filtrables en el select de reservas
// Se usa para que el select tenga las fechas disponibles para filtrar
function cargarFechasFiltrables() {
  const selectFiltro = document.getElementById("filtro-fecha");
  if (!selectFiltro) return;

  selectFiltro.innerHTML = "";

  // Opción "todas"
  const opcionTodas = document.createElement("option");
  opcionTodas.value = "";
  opcionTodas.textContent = "Todas las fechas";
  selectFiltro.appendChild(opcionTodas);

  // Extraer fechas únicas de reservas
  const fechasUnicas = [...new Set(reservas.map((r) => r.fecha))];

  fechasUnicas.forEach((fecha) => {
    const option = document.createElement("option");
    option.value = fecha;
    option.textContent = formatearFechaLegible(fecha);
    selectFiltro.appendChild(option);
  });
}

// ESTADISTICAS
// Funciones para mostrar estadísticas de jugadores y reservas
// Se usan para mostrar información general sobre el sistema
function totalJugadores() {
  return jugadores.length;
}

function totalReservas() {
  return reservas.length;
}

function minutosTotalesReservados() {
  return reservas.reduce((total, reserva) => total + reserva.duracion, 0);
}

// Mostrar estadísticas en la sección correspondiente
function mostrarEstadisticas() {
  const statsContainer = document.getElementById("estadisticas");
  if (!statsContainer) return;

  statsContainer.innerHTML = `
    <div class="card">
      <h3>📊 Estadísticas</h3>
      <p><strong>Jugadores registrados:</strong> ${totalJugadores()}</p>
      <p><strong>Reservas totales:</strong> ${totalReservas()}</p>
      <p><strong>Minutos jugados:</strong> ${minutosTotalesReservados()} min</p>
    </div>
  `;
}

// MODALS
// Función para mostrar un modal de confirmación
// Se usa para confirmar acciones como eliminar un jugador o reserva
function mostrarModalConfirmacion(texto, callbackConfirmar) {
  const modal = document.getElementById("modal-confirmacion");
  const modalTexto = document.getElementById("modal-texto");
  const btnConfirmar = document.getElementById("btn-confirmar");
  const btnCancelar = document.getElementById("btn-cancelar");

  if (!modal || !modalTexto || !btnConfirmar || !btnCancelar) return;

  modalTexto.textContent = texto;
  modal.classList.remove("hidden");
  document.body.classList.add("modal-abierto");

  btnConfirmar.onclick = () => {
    callbackConfirmar();
    modal.classList.add("hidden");
    document.body.classList.remove("modal-abierto");
  };

  btnCancelar.onclick = () => {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-abierto");
  };
}

// INICIO DEL SISTEMA
/// Función para iniciar el sistema y cargar los formularios y datos iniciales
function iniciarSistema() {
  formularioJugador();
  formularioReserva();
  cargarJugadoresEnSelect();
  cargarHorasEnSelect();
  cargarFechasEnSelect();
  cargarFechasFiltrables();
  cargarDuracionesEnSelect();
  mostrarJugadoresRegistrados();
  mostrarReservasRegistradas();
  mostrarEstadisticas();
}

// Evento DOMContentLoaded para iniciar el sistema
// Se usa para asegurarse de que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", iniciarSistema);
// Evento change para filtrar reservas por fecha
// Se usa para detectar cuando se selecciona una fecha en el select de filtro
document
  .getElementById("filtro-fecha")
  ?.addEventListener("change", filtrarReservasPorFecha);
