/* Esta función genera un array de horarios disponibles para el día actual
 Los horarios son cada 30 minutos desde las 8:00 AM hasta las 11:00 PM
 Cada horario tiene una propiedad "disponible" que indica si está disponible o no
*/
export const generarHorariosDelDia = () => {
  const horarios = [];

  let horaInicio = dayjs().startOf("day").hour(8); // Hora de inicio a las 8:00 AM
  const horaFin = dayjs().startOf("day").hour(23); // Hora de fin a las 11:00 PM

  while (horaInicio.isBefore(horaFin)) {
    const horaFormateada = horaInicio.format("HH:mm");
    let disponible = true; // Se asume que inicalmente está disponible
    horarios.push({
      hora: horaFormateada,
      disponible: disponible,
    });
    horaInicio = horaInicio.add(30, "minute"); // Sumar 30 minutos
  }

  return horarios;
};
