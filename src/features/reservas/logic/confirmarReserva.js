import { obtenerDatosReserva } from "../ui/obtenerDatosReserva.js";
import { validarDatosReserva } from "../../../shared/validators/index.js";
import { generarReservaCompleta } from "./generarReservaCompleta.js";
import { agregarReservaEnLocalStorage } from "../data/gestionarReservas.js";
import { resetearFormularioReserva } from "./resetearReserva.js";
import { notificarExito } from "../../../shared/ui/index.js";

/* Orquesta el flujo completo de la reserva
- Valida los datos de la reserva
- Genera la reserva completa
- Agrega la reserva al almacenamiento local
- Muestra un mensaje de éxito
*/

export const confirmarReserva = async () => {
  const datosReserva = obtenerDatosReserva();

  if (validarDatosReserva(datosReserva) === false) {
    return;
  }

  const reservaCompleta = generarReservaCompleta(datosReserva);
  agregarReservaEnLocalStorage(reservaCompleta);

  notificarExito({
    titulo: "Reserva Confirmada",
    html: `
      <p><strong>Jugador:</strong> ${reservaCompleta.nombre}</p>
      <p><strong>Fecha:</strong> ${dayjs(reservaCompleta.fecha)
        .locale("es")
        .format("dddd D MMMM")}</p>
      <p><strong>Horario:</strong> ${reservaCompleta.hora} - ${
      reservaCompleta.horaFin
    }</p>
      <p><strong>Cancha:</strong> ${reservaCompleta.cancha}</p>
    `,
  });

  resetearFormularioReserva();
};
