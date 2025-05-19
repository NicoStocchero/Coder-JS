/* Esta función recibe un array de horarios y una fecha seleccionada
 y actualiza la propiedad "disponible" de cada horario según la fecha seleccionada
 La función verifica si la fecha seleccionada es hoy o pasada
 y actualiza la disponibilidad de los horarios en consecuencia
*/
export const disponibilidadHorarios = (horarios, fechaSeleccionada) => {
  const hoy = dayjs(fechaSeleccionada).isSame(horaActual, "day");
  const fechaPasada = dayjs(fechaSeleccionada).isBefore(horaActual, "day");

  for (const horario of horarios) {
    if (fechaPasada) {
      horario.disponible = false; // Si la fecha es pasada, no está disponible
    } else if (hoy) {
      const horaSeleccionada = dayjs(`${fechaSeleccionada} ${horario.hora}`);
      if (horaSeleccionada.isBefore(horaActual)) {
        horario.disponible = false; // Si la hora seleccionada es pasada, no está disponible
      } else {
        horario.disponible = true; // Si la hora seleccionada es futura, está disponible
      }
    } else {
      horario.disponible = true; // Si no es hoy ni pasado, está disponible
    }
  }
};
