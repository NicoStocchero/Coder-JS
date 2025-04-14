// ------------------------------
// VARIABLES INICIALES
// ------------------------------

import { reservas, eliminarReserva, crearTarjeta } from "./main.js";

const modalCancelar = document.getElementById("modal-cancelar");
const detalleCancelar = document.getElementById("detalle-cancelar");
const botonSiCancelar = document.getElementById("btn-cancelar-confirmar");
const botonVolver = document.getElementById("btn-cancelar-volver");

const filtroTodos = document.getElementById("filtro-todos");
const filtroHoy = document.getElementById("filtro-hoy");
const filtroSemana = document.getElementById("filtro-semana");

let indiceAEliminar = null;

// ------------------------------
// FUNCIONES PRINCIPALES
// ------------------------------

function activarBotonesCancelar() {
  const botones = document.querySelectorAll(".btn-cancelar");

  for (const boton of botones) {
    boton.addEventListener("click", () => {
      indiceAEliminar = parseInt(boton.dataset.index);

      detalleCancelar.innerHTML = `
        <p>¿Seguro que querés cancelar esta reserva?</p>
        <p>Esta acción no se puede deshacer.</p>
      `;

      modalCancelar.classList.remove("hidden");
    });
  }
}

function cargarReservasEnPantalla() {
  const contenedor = document.getElementById("lista-reservas");
  contenedor.innerHTML = "";

  const reservasOrdenadas = [...reservas].sort((a, b) => {
    return new Date(`${a.fecha}T${a.hora}`) - new Date(`${b.fecha}T${b.hora}`);
  });

  reservasOrdenadas.forEach((reserva, index) => {
    const tarjeta = crearTarjeta(reserva, index);
    contenedor.appendChild(tarjeta);
  });

  activarBotonesCancelar();
}

function mostrarReservasFiltradas(lista) {
  const contenedor = document.getElementById("lista-reservas");
  contenedor.innerHTML = "";

  const ordenadas = [...lista].sort((a, b) => {
    return new Date(`${a.fecha}T${a.hora}`) - new Date(`${b.fecha}T${b.hora}`);
  });

  ordenadas.forEach((reserva, index) => {
    const tarjeta = crearTarjeta(reserva, index);
    contenedor.appendChild(tarjeta);
  });

  activarBotonesCancelar();
}

function contarTotalDeReservas() {
  return reservas.length;
}

function calcularHorasTotalesReservadas() {
  let totalMinutos = 0;
  for (const reserva of reservas) {
    totalMinutos += parseInt(reserva.duracion);
  }
  return totalMinutos / 60;
}

function contarClientesUnicos() {
  const emails = new Set();
  for (const reserva of reservas) {
    emails.add(reserva.email);
  }
  return emails.size;
}

function actualizarResumen() {
  document.getElementById("total-reservas").textContent =
    contarTotalDeReservas();
  document.getElementById("total-horas").textContent =
    calcularHorasTotalesReservadas() + " hs";
  document.getElementById("clientes-unicos").textContent =
    contarClientesUnicos();
}

function actualizarFiltroActivo(botonSeleccionado) {
  const botones = document.querySelectorAll(".filtro-turno");
  botones.forEach((boton) => boton.classList.remove("filtro-activo"));
  botonSeleccionado.classList.add("filtro-activo");
}

function filtrarReservas(tipo) {
  const hoy = new Date().toISOString().split("T")[0];
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() + 7);
  const fechaLimiteISO = fechaLimite.toISOString().split("T")[0];

  let resultado = [];

  if (tipo === "todos") {
    resultado = [...reservas];
  } else if (tipo === "hoy") {
    resultado = reservas.filter((r) => r.fecha === hoy);
  } else if (tipo === "semana") {
    resultado = reservas.filter(
      (r) => r.fecha > hoy && r.fecha <= fechaLimiteISO
    );
  }

  mostrarReservasFiltradas(resultado);
}

// ------------------------------
// EVENTOS DEL MODAL
// ------------------------------

botonSiCancelar.addEventListener("click", () => {
  if (indiceAEliminar !== null) {
    eliminarReserva(indiceAEliminar);
    cargarReservasEnPantalla();
    modalCancelar.classList.add("hidden");
    indiceAEliminar = null;
  }
});

botonVolver.addEventListener("click", () => {
  modalCancelar.classList.add("hidden");
  indiceAEliminar = null;
});

// ------------------------------
// EVENTOS DE LOS FILTROS
// ------------------------------

filtroTodos.addEventListener("click", () => {
  actualizarFiltroActivo(filtroTodos);
  filtrarReservas("todos");
});

filtroHoy.addEventListener("click", () => {
  actualizarFiltroActivo(filtroHoy);
  filtrarReservas("hoy");
});

filtroSemana.addEventListener("click", () => {
  actualizarFiltroActivo(filtroSemana);
  filtrarReservas("semana");
});

// ------------------------------
// INICIAR
// ------------------------------

function iniciarVistaReservas() {
  cargarReservasEnPantalla();
  actualizarResumen();
}

iniciarVistaReservas();
