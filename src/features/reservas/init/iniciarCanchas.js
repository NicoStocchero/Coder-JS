import { cargarCanchasParaHorario } from "../logic/disponibilidad/cargarCanchasParaHorario.js";

export const iniciarCanchas = async () => {
  const horarios = document.getElementById("horarios-disponibles");
  horarios.addEventListener("click", async (event) => {
    const boton = event.target.closest("button");
    if (!boton) return;

    const horaSeleccionada = boton.dataset.hora;
    const fechaSeleccionada =
      document.getElementById("fecha-seleccionada").value;

    await cargarCanchasParaHorario({
      fecha: fechaSeleccionada,
      hora: horaSeleccionada,
      reservas: JSON.parse(localStorage.getItem("reservas")) || [],
    });
  });
};
