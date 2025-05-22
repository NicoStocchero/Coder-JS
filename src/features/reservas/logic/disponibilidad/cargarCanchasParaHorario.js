import { obtenerDeLocalStorage } from "../../../../data/storage.js";
import { obtenerTodasLasCanchasDisponibles } from "../../data/canchas.js";
import { mostrarOpcionesDeCancha } from "../../ui/components/mostrarOpcionesDeCancha.js";
import { comprobarReservaDisponible } from "./comprobarReservaDisponible.js";
import { notificarError } from "../../../../shared/ui/index.js";

// Calcula y muestra las combinaciones disponibles de cancha + duración
// para una fecha y hora determinadas. Se usa al crear o editar una reserva.

export const cargarCanchasParaHorario = async ({
  fecha,
  hora,
  reservasAExcluir = null, // ID de la reserva a excluir si se está editando
}) => {
  try {
    const canchasDisponibles = await obtenerTodasLasCanchasDisponibles(); // Trae el catálogo de canchas
    let reservas = obtenerDeLocalStorage("reservas") || []; // Trae las reservas guardadas

    if (reservasAExcluir) {
      reservas = reservas.filter((r) => r.id !== reservasAExcluir); // Elimina la reserva actual (modo edición)
    }

    const combinacionesDisponibles = []; // Guarda las combinaciones válidas

    for (const cancha of canchasDisponibles) {
      const { nombre, duracion } = cancha;

      for (const tiempo of duracion) {
        const disponible = comprobarReservaDisponible({
          cancha: nombre,
          fecha,
          hora,
          duracion: tiempo,
          reservas,
        });

        if (disponible) {
          combinacionesDisponibles.push({
            cancha: nombre,
            fecha,
            hora,
            duracion: tiempo,
          });
        }
      }
    }

    mostrarOpcionesDeCancha({ canchas: combinacionesDisponibles }); // Muestra las opciones disponibles en el UI
  } catch (error) {
    notificarError({ mensaje: "Error al cargar las canchas disponibles." }); // Notifica si algo falla
  }
};
