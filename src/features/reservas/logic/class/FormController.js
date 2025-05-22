import {
  guardarEnLocalStorage,
  obtenerDeLocalStorage,
} from "../../../../data/storage.js";
import { guardarRegistroEditado } from "../../../../shared/ui/index.js";
import { notificarExito } from "../../../../shared/ui/index.js  ";
import { crearIntervaloReserva } from "../../../../shared/helpers/fechas/crearIntervaloReserva.js";
import { iniciarHorarios } from "../../init/iniciarHorarios.js";
import { cargarCanchasParaHorario } from "../disponibilidad/cargarCanchasParaHorario.js";
import { actualizarTextoBoton } from "../../ui/formReservas.js";
import { Reserva } from "../class/Reserva.js";
import {
  abrirSliderReserva,
  cerrarSliderReserva,
} from "../../ui/components/abrirSliderReservas.js";
import { mostrarJugadoresParaSeleccionar } from "../../ui/components/mostrarJugadores.js";

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

  confirmar() {
    const datosReserva = this.reserva.obtenerDatos();
    if (validarDatosReserva(datosReserva) === false) {
      return;
    }

    if (this.modoEdicion) {
      guardarRegistroEditado("reservas", this.idReservaEditando, datosReserva);
    } else {
      datosReserva.id = crypto.randomUUID();
      const reservas = obtenerDeLocalStorage("reservas") || [];
      reservas.push(datosReserva);
      guardarEnLocalStorage("reservas", reservas);
    }

    const { fin } = crearIntervaloReserva({
      fecha: datosReserva.fecha,
      horaInicio: datosReserva.hora,
      duracion: datosReserva.duracion,
    });

    const horaFin = fin.format("HH:mm");

    notificarExito({
      titulo: "Reserva Confirmada",
      html: `
          <p><strong>Jugador:</strong> ${datosReserva.jugador}</p>
          <p><strong>Fecha:</strong> ${datosReserva.fecha}</p>
          <p><strong>Horario:</strong> ${datosReserva.hora} - ${horaFin}</p>
          <p><strong>Cancha:</strong> ${datosReserva.cancha}</p>
        `,
    });

    this.resetearFormulario();
  }

  resetearFormulario() {
    cerrarSliderReserva();
    this.reserva = new Reserva();
    this.modoEdicion = false;
    this.idReservaEditando = null;
  }
}
