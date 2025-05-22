import { compruebaErrores } from "../../validators/index.js";
import { notificarError } from "../../ui/index.js";

// Valida que la reserva tenga todos los campos requeridos
// Muestra notificación si falta algún dato esencial
export const validarDatosReserva = (reserva) => {
  const errores = {
    jugador: reserva.jugador ? "" : "Debe seleccionar un jugador.",
    fecha: reserva.fecha ? "" : "Debe elegir una fecha.",
    hora: reserva.hora ? "" : "Debe seleccionar un horario.",
    duracion: reserva.duracion ? "" : "Debe elegir una cancha y su duración.",
  };

  if (compruebaErrores(errores)) {
    const primerCampo = Object.keys(errores).find((campo) => errores[campo]);
    notificarError({
      titulo: "Error al confirmar la reserva",
      mensaje: errores[primerCampo],
    });
    return false;
  }

  return true;
};
