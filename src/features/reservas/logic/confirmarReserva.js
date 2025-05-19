/* Orquesta el flujo completo de la reserva
- Valida los datos de la reserva
- Genera la reserva completa
- Agrega la reserva al almacenamiento local
- Muestra un mensaje de éxito
*/
import {
  obtenerDatosReserva,
  validarDatosReserva,
  generarReservaCompleta,
} from "./generarReservaCompleta.js";
import { agregarReservaEnLocalStorage } from "../data/gestionarReservas.js";

export const confirmarReserva = () => {
  const datosReserva = obtenerDatosReserva();

  if (validarDatosReserva(datosReserva) === false) {
    return;
  }

  const reservaCompleta = generarReservaCompleta(datosReserva);
  agregarReservaEnLocalStorage(reservaCompleta);

  Swal.fire({
    icon: "success",
    title: "Reserva Confirmada",
    text: `La reserva para el jugador ${reservaCompleta.jugador} ha sido confirmada.`,
  });
};
