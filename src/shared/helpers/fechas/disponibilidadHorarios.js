// Actualiza la propiedad "disponible" de cada horario según la fecha seleccionada
export const disponibilidadHorarios = (horarios, fechaSeleccionada) => {
  const horaActual = dayjs();

  const hoy = dayjs(fechaSeleccionada).isSame(horaActual, "day");
  const fechaPasada = dayjs(fechaSeleccionada).isBefore(horaActual, "day");

  for (const horario of horarios) {
    if (fechaPasada) {
      horario.disponible = false; // No se puede reservar en días pasados
    } else if (hoy) {
      const horaSeleccionada = dayjs(`${fechaSeleccionada} ${horario.hora}`);
      horario.disponible = horaSeleccionada.isAfter(horaActual); // Solo futuras
    } else {
      horario.disponible = true; // Fechas futuras completas habilitadas
    }
  }
};
