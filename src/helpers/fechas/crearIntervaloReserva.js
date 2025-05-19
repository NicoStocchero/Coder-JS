export const crearIntervaloReserva = ({ fecha, horaInicio, duracion }) => {
  const inicio = dayjs(`${fecha} ${horaInicio}`);
  const fin = inicio.add(duracion, "minute");

  return {
    inicio,
    fin,
  };
};
