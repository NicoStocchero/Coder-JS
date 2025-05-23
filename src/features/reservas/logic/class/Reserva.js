import { crearIntervaloReserva } from "../../../../shared/helpers/fechas/crearIntervaloReserva.js";

export class Reserva {
  constructor() {
    this.jugador = null;
    this.nombreJugador = null;
    this.fecha = null;
    this.hora = null;
    this.horaFin = null;
    this.duracion = null;
    this.cancha = null;
    this.canchaSeleccionada = null;
  }

  cargarDesdeObjeto(reserva) {
    this.jugador = reserva.jugador;
    this.nombreJugador = reserva.nombre ?? null;
    this.fecha = reserva.fecha;
    this.hora = reserva.hora;
    this.duracion = reserva.duracion;
    this.cancha = reserva.cancha;
    this.horaFin = reserva.horaFin ?? null;
    this.canchaSeleccionada = `${reserva.cancha}-${reserva.duracion}`;
  }

  calcularHoraFin() {
    const { fin } = crearIntervaloReserva({
      fecha: this.fecha,
      horaInicio: this.hora,
      duracion: this.duracion,
    });

    this.horaFin = fin.format("HH:mm");
  }

  obtenerDatos() {
    return {
      jugador: this.jugador,
      nombre: this.nombreJugador,
      fecha: this.fecha,
      hora: this.hora,
      horaFin: this.horaFin,
      duracion: this.duracion,
      cancha: this.cancha,
    };
  }

  resetear() {
    this.jugador = null;
    this.nombreJugador = null;
    this.fecha = null;
    this.hora = null;
    this.horaFin = null;
    this.duracion = null;
    this.cancha = null;
    this.canchaSeleccionada = null;
  }
}
