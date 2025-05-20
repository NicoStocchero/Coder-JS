/* Esta función genera un array de fechas disponibles para los próximos 7 días
 Cada fecha tiene una propiedad "fecha" que contiene la fecha en formato ISO para poder usar filtros
 y una propiedad "etiqueta" que contiene la fecha formateada para mostrar en la UI
*/
export const generarFechasDisponibles = () => {
  const fechasDisponibles = [];
  const fechaActual = dayjs();

  for (let i = 0; i < 7; i++) {
    const sumarDias = fechaActual.add(i, "day"); // Sumar días a la fecha actual y establecer el locale a español
    const fechaFormateada = sumarDias.locale("es").format("ddd D MMMM"); // Ejemplo: "Lun 1 Enero". Para mostrar en la UI
    let etiquetaDia = fechaFormateada;

    fechasDisponibles.push({
      fecha: sumarDias.format("YYYY-MM-DD"), // Formatea la fecha en ISO para poder usar filtros
      etiqueta: etiquetaDia,
    });
  }

  return fechasDisponibles;
};
