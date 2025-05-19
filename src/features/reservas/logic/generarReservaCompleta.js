import { crearIntervaloReserva } from "../../../helpers/fechas/crearIntervaloReserva.js";
import { obtenerJugadorSeleccionado } from "../ui/obtenerJugadorSeleccionado.js";

export const obtenerDatosReserva = () => {
  const { idJugador, nombreJugador } = obtenerJugadorSeleccionado();

  const reserva = {
    jugador: idJugador,
    nombre: nombreJugador,
    fecha: document.getElementById("fecha-seleccionada")?.value || "",
    hora: document.getElementById("hora-seleccionada")?.value || "",
    duracion: document.getElementById("duracion-seleccionada")?.value || "",
    cancha: document.getElementById("cancha-seleccionada")?.value || "",
  };
  return reserva;
};

export const validarDatosReserva = (reserva) => {
  const etiquetas = {
    jugador: " Jugador",
    fecha: "a Fecha",
    hora: " Horario",
    duracion: "a Cancha y su Duración",
  };
  for (const elemento in reserva) {
    if (!reserva[elemento]) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Seleccione un${etiquetas[elemento] || elemento}.`,
      });
      return false;
    }
  }
  return true;
};

export const generarReservaCompleta = (reserva) => {
  const intervalo = crearIntervaloReserva({
    fecha: reserva.fecha,
    horaInicio: reserva.hora,
    duracion: reserva.duracion,
  });
  const horaFin = intervalo.fin.format("HH:mm");

  const reservaID = crypto.randomUUID();
  const [nombreCancha, duracion] = reserva.cancha.split("-");

  const reservaCompleta = {
    id: reservaID,
    jugador: reserva.jugador,
    nombre: reserva.nombre,
    fecha: reserva.fecha,
    hora: reserva.hora,
    duracion: duracion.trim(),
    cancha: nombreCancha.trim(),
    horaFin,
  };

  return reservaCompleta;
};
