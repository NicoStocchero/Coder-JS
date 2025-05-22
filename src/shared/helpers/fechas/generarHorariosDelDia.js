// Genera los horarios del día en bloques de 30 minutos, desde 8:00 hasta 23:00
// Cada horario incluye la hora formateada y una marca de disponibilidad
export const generarHorariosDelDia = () => {
  const horarios = [];

  let horaInicio = dayjs().startOf("day").hour(8); // Comienza a las 8:00 AM
  const horaFin = dayjs().startOf("day").hour(23); // Termina a las 11:00 PM

  while (horaInicio.isBefore(horaFin)) {
    const horaFormateada = horaInicio.format("HH:mm");
    horarios.push({
      hora: horaFormateada,
      disponible: true, // Por defecto se marca como disponible
    });
    horaInicio = horaInicio.add(30, "minute"); // Avanza en bloques de 30 min
  }

  return horarios;
};
