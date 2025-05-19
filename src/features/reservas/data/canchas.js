export const obtenerCanchas = async () => {
  try {
    const respuesta = await fetch("./src/data/canchas.json");
    if (!respuesta.ok) {
      throw new Error("Error al cargar las canchas");
    }
    const canchas = await respuesta.json();
    return canchas;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo cargar la información de las canchas",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return [];
  }
};

export const obtenerTodasLasCanchasDisponibles = async () => {
  const canchas = await obtenerCanchas();
  return canchas.filter((cancha) => !cancha.mantenimiento);
};
