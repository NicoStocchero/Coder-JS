// Genera un array de fechas disponibles para los próximos 7 días
// Cada item incluye una fecha en formato ISO y una etiqueta formateada para la UI
export const generarFechasDisponibles = () => {
  const fechasDisponibles = [];
  const fechaActual = dayjs();

  for (let i = 0; i < 7; i++) {
    const sumarDias = fechaActual.add(i, "day");
    const fechaFormateada = sumarDias.locale("es").format("ddd D MMMM"); // Ej: "lun. 21 mayo"

    fechasDisponibles.push({
      fecha: sumarDias.format("YYYY-MM-DD"), // Para lógica y comparaciones
      etiqueta: fechaFormateada, // Para mostrar en los botones
    });
  }

  return fechasDisponibles;
};
