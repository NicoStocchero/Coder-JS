import {
  guardarEnLocalStorage,
  obtenerDeLocalStorage,
} from "../../../../data/storage.js";
import { guardarRegistroEditado } from "../../../../shared/ui/index.js";
import { notificarExito } from "../../../../shared/ui/index.js  ";
import { crearIntervaloReserva } from "../../../../shared/helpers/fechas/crearIntervaloReserva.js";
import { iniciarHorarios } from "../../init/iniciarHorarios.js";
import { cargarCanchasParaHorario } from "../disponibilidad/cargarCanchasParaHorario.js";
import {
  actualizarTextoBoton,
  estadoFormularioReserva,
} from "../../ui/formReservas.js";
import { Reserva } from "../class/Reserva.js";
import {
  abrirSliderReserva,
  cerrarSliderReserva,
} from "../../ui/components/abrirSliderReservas.js";
import { mostrarJugadoresParaSeleccionar } from "../../ui/components/mostrarJugadores.js";
import { mostrarReservasRegistradas } from "../../ui/components/card/mostrarReservas.js";

export class FormController {
  constructor() {
    this.reserva = new Reserva();
    this.modoEdicion = false;
    this.idReservaEditando = null;
  }

  iniciarEdicion(reservaExistente) {
    abrirSliderReserva();

    this.modoEdicion = true;
    this.idReservaEditando = reservaExistente.id;

    estadoFormularioReserva.modoEdicion = true;
    estadoFormularioReserva.idReservaEditando = reservaExistente.id;

    this.reserva.cargarDesdeObjeto(reservaExistente);
    this.renderFormulario();
  }

  renderFormulario() {
    const duracion = this.reserva.duracion ?? 60;

    mostrarJugadoresParaSeleccionar({ id: this.reserva.jugador });

    if (this.reserva.fecha) {
      iniciarHorarios(this.reserva.fecha, duracion);
    }
    if (this.reserva.fecha && this.reserva.hora) {
      cargarCanchasParaHorario({
        fecha: this.reserva.fecha,
        hora: this.reserva.hora,
        reservasAExcluir: this.idReservaEditando,
      });
    }

    actualizarTextoBoton();
  }

  actualizarDesdeFormulario() {
    const jugadores = obtenerDeLocalStorage("jugadores");
    const selectJugador = document.getElementById("jugadores");
    const jugadorId = selectJugador?.value;

    const jugador = jugadores.find((j) => j.id === jugadorId);

    this.reserva.jugador = jugadorId;
    this.reserva.nombreJugador = jugador
      ? `${jugador.nombre} ${jugador.apellido}`
      : null;
    this.reserva.fecha = document.getElementById("fecha-seleccionada")?.value;
    this.reserva.hora = document.getElementById("hora-seleccionada")?.value;
    this.reserva.duracion = document.getElementById(
      "duracion-seleccionada"
    )?.value;
    this.reserva.cancha = document.getElementById("cancha-seleccionada")?.value;
  }

  confirmar() {
    this.actualizarDesdeFormulario();
    this.reserva.calcularHoraFin();

    const datosReserva = this.reserva.obtenerDatos();

    if (this.modoEdicion) {
      datosReserva.id = this.idReservaEditando;
      guardarRegistroEditado("reservas", this.idReservaEditando, datosReserva);
    } else {
      datosReserva.id = crypto.randomUUID();
      const reservas = obtenerDeLocalStorage("reservas") || [];
      reservas.push(datosReserva);
      guardarEnLocalStorage("reservas", reservas);
    }

    notificarExito({
      titulo: "Reserva Confirmada",
      html: `
          <p><strong>Jugador:</strong> ${datosReserva.nombre}</p>
          <p><strong>Fecha:</strong> ${datosReserva.fecha}</p>
          <p><strong>Horario:</strong> ${datosReserva.hora} - ${datosReserva.horaFin}</p>
          <p><strong>Cancha:</strong> ${datosReserva.cancha}</p>
        `,
    });

    mostrarReservasRegistradas();

    this.resetearFormulario();
  }

  resetearFormulario() {
    cerrarSliderReserva();
    this.reserva = new Reserva();
    this.modoEdicion = false;
    this.idReservaEditando = null;
  }
}
