// Verifica si dos intervalos de tiempo se superponen
export const haySuperposicion = (
  { inicio: inicioNueva, fin: finNueva },
  { inicio: inicioExistente, fin: finExistente }
) => {
  return (
    inicioNueva.isBefore(finExistente) && finNueva.isAfter(inicioExistente)
  );
};
