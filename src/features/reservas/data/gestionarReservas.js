import {
  obtenerDeLocalStorage,
  guardarEnLocalStorage,
} from "../../../data/storage.js";

export const agregarReservaEnLocalStorage = (reserva) => {
  const reservas = obtenerDeLocalStorage("reservas") || [];
  reservas.push(reserva);
  guardarEnLocalStorage("reservas", reservas);
  return true;
};

export const eliminarReservaDeLocalStorage = (id) => {
  const reservas = obtenerDeLocalStorage("reservas") || [];
  const reservasActualizadas = reservas.filter((r) => r.id !== id);
  guardarEnLocalStorage("reservas", reservasActualizadas);
  return reservas.length !== reservasActualizadas.length;
};

export const actualizarReservaEnLocalStorage = (id, nuevaReserva) => {
  const reservas = obtenerDeLocalStorage("reservas") || [];
  const nuevas = reservas.map((reserva) =>
    reserva.id === id ? nuevaReserva : reserva
  );
  guardarEnLocalStorage("reservas", nuevas);
};
