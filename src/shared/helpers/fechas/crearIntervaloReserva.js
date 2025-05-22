// Crea un intervalo de reserva basado en fecha, hora de inicio y duración
export const crearIntervaloReserva = ({ fecha, horaInicio, duracion }) => {
  const inicio = dayjs(`${fecha} ${horaInicio}`);
  const fin = inicio.add(duracion, "minute");

  return {
    inicio,
    fin,
  };
};
