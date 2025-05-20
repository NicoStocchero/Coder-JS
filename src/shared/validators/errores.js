// Manejo de errores
export const compruebaErrores = (errores) => {
  for (const campo in errores) {
    if (errores[campo] !== "") {
      return true;
    } // Devuelve true si alguno de los campos tiene un error
  }
  return false;
};
