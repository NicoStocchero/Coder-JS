import { obtenerDeLocalStorage } from "../../../../data/storage.js";
import { obtenerTodasLasCanchasDisponibles } from "../../data/canchas.js";
import { mostrarOpcionesDeCancha } from "../../ui/mostrarOpcionesDeCancha.js";
import { comprobarReservaDisponible } from "./comprobarReservaDisponible.js";
import { notificarError } from "../../../../shared/ui/index.js";

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
    notificarError({ mensaje: "Error al cargar las canchas disponibles." });
  }
};
