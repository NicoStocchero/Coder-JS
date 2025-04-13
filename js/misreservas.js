// ------------------------------
// VARIABLES INICIALES
// ------------------------------

import { reservas, eliminarReserva, formatearFecha } from "./main.js";

// Elementos del modal de cancelación
const modalCancelar = document.getElementById("modal-cancelar");
const detalleCancelar = document.getElementById("detalle-cancelar");
const botonSiCancelar = document.getElementById("btn-cancelar-confirmar");
const botonVolver = document.getElementById("btn-cancelar-volver");

let indiceAEliminar = null;

// ------------------------------
// FUNCIONES
// ------------------------------

function cargarReservasEnPantalla() {
  const contenedor = document.getElementById("lista-reservas");
  contenedor.innerHTML = "";

  const copia = [...reservas].sort(
    (a, b) =>
      new Date(`${a.fecha}T${a.hora}`) - new Date(`${b.fecha}T${b.hora}`)
  );

  copia.forEach((reserva, index) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("card-reserva");

    tarjeta.innerHTML = `
      <div class="estado-fecha">
        <p class="fecha-reserva"><i class="fas fa-calendar-day"></i> <strong>${formatearFecha(
          reserva.fecha
        )}</strong></p>
        <span class="badge-estado">Confirmada</span>
      </div>

      <h4><i class="fas fa-user"></i> ${reserva.nombre.toUpperCase()} ${reserva.apellido.toUpperCase()}</h4>
      <p><i class="fas fa-envelope"></i> ${reserva.email}</p>
      <p><i class="fas fa-clock"></i> De ${reserva.hora} a ${
      reserva.horaFinal
    } hs</p>
      <p><i class="fas fa-hourglass-half"></i> ${reserva.duracion} minutos</p>
      <button class="btn-cancelar" data-index="${index}">Cancelar</button>
    `;

    contenedor.appendChild(tarjeta);
  });

  activarBotonesCancelar();
}

// Esta función activa los botones de cancelar de cada tarjeta
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

// ------------------------------
// BOTONES DEL MODAL
// ------------------------------

// Si confirma la cancelación, se elimina la reserva
botonSiCancelar.addEventListener("click", () => {
  if (indiceAEliminar !== null) {
    eliminarReserva(indiceAEliminar);
    cargarReservasEnPantalla();
    modalCancelar.classList.add("hidden");
    indiceAEliminar = null;
  }
});

// Si decide no cancelar, se cierra el modal
botonVolver.addEventListener("click", () => {
  modalCancelar.classList.add("hidden");
  indiceAEliminar = null;
});

// ------------------------------
// INICIAR
// ------------------------------

// Esta función se ejecuta al cargar la página
function iniciarVistaReservas() {
  cargarReservasEnPantalla();
}

document.addEventListener("DOMContentLoaded", iniciarVistaReservas);
