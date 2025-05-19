import { crearIntervaloReserva } from "../../../helpers/fechas/crearIntervaloReserva.js";

export const obtenerDatosReserva = () => {
  const reserva = {
    jugador: document.getElementById("jugadores")?.value || "",
    fecha: document.getElementById("fecha-seleccionada")?.value || "",
    hora: document.getElementById("hora-seleccionada")?.value || "",
    duracion: document.getElementById("duracion-seleccionada")?.value || "",
    cancha: document.getElementById("cancha-seleccionada")?.value || "",
  };
  return reserva;
};

export const validarDatosReserva = (reserva) => {
  const etiquetas = {
    jugador: "Jugador",
    fecha: "Fecha",
    hora: "Hora",
    duracion: "Duración",
    cancha: "Cancha",
  };
  for (const elemento in reserva) {
    if (!reserva[elemento]) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `El campo ${
          etiquetas[elemento] || elemento
        } no puede estar vacío.`,
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
    fecha: reserva.fecha,
    hora: reserva.hora,
    duracion: duracion.trim(),
    cancha: nombreCancha.trim(),
    horaFin,
  };

  return reservaCompleta;
};
