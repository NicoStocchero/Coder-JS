import { obtenerDeLocalStorage } from "../../../../data/storage.js";
import { obtenerTodasLasCanchasDisponibles } from "../../../../data/canchas.js";
import { mostrarOpcionesDeCancha } from "../../ui/mostrarOpcionesDeCancha.js";
import { comprobarReservaDisponible } from "./comprobarReservaDisponible.js";

export const cargarCanchasParaHorario = async ({ fecha, hora }) => {
  try {
    const canchasDisponibles = await obtenerTodasLasCanchasDisponibles();
    const reservas = obtenerDeLocalStorage("reservas") || [];

    const combinacionesDisponibles = [];

    for (const cancha of canchasDisponibles) {
      const { nombre, duracion } = cancha;

      for (const tiempo of duracion) {
        if (
          comprobarReservaDisponible({
            cancha: nombre,
            fecha,
            hora,
            duracion: tiempo,
            reservas,
          })
        ) {
          combinacionesDisponibles.push({
            cancha: nombre,
            fecha,
            hora,
            duracion: tiempo,
          });
        }
      }
    }

    mostrarOpcionesDeCancha({ canchas: combinacionesDisponibles });
  } catch (error) {
    Swal.fire({
      title: "Error inesperado",
      text: "Ocurrió un problema al procesar las canchas disponibles.",
      icon: "error",
    });
  }
};
