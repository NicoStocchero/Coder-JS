import { $id, manejarEventoEditar } from "../../../shared/ui/index.js";
import { prepararEdicionReserva } from "../ui/mostrarReservaParaEditar.js";
import { generarFechasDisponibles } from "../../../shared/helpers/fechas/generarFechasDisponibles.js";
import { mostrarFechasDisponibles } from "../ui/components/mostrarFechasDisponibles.js";
import { mostrarJugadoresParaSeleccionar } from "../ui/components/mostrarJugadores.js";
import { iniciarHorarios } from "./iniciarHorarios.js";
import { marcarBotonSeleccionado, setValue } from "../../../shared/ui/index.js";
import { cargarCanchasParaHorario } from "../logic/disponibilidad/cargarCanchasParaHorario.js";
import { actualizarTextoBoton } from "../ui/formReservas.js";

// Asocia la lógica al botón de editar reserva dentro del contenedor de reservas
// Cuando se hace clic, precarga todos los campos del formulario con los datos de la reserva actual
export const iniciarEdicionReserva = () => {
  manejarEventoEditar({
    contenedor: $id("lista-reservas"),
    tipo: "reservas",
    etiqueta: "reserva",
    selector: ".btn-editar-reserva",

    funcion: async (_id, _tipo, _etiqueta, reserva) => {
      prepararEdicionReserva(reserva); // Precarga el formulario con los datos de la reserva actual

      const fechas = generarFechasDisponibles();
      mostrarFechasDisponibles(fechas, reserva.fecha); // Muestra las fechas disponibles y selecciona la actual

      mostrarJugadoresParaSeleccionar(reserva.jugador); // Marca el jugador actual como seleccionado

      const horarios = await iniciarHorarios(reserva.fecha, reserva.duracion); // Muestra los horarios disponibles para esa duración
      marcarBotonSeleccionado(
        "horarios-disponibles",
        "btn-horario",
        "hora-seleccionada",
        "hora",
        reserva.hora
      ); // Marca el horario original como seleccionado

      await cargarCanchasParaHorario({
        fecha: reserva.fecha,
        hora: reserva.hora,
        reservasAExcluir: reserva.id, // Se excluye esta reserva para no bloquear su propio horario
      });

      // Marca la cancha actual como seleccionada en el input y en el botón correspondiente
      const valorCancha = `${reserva.cancha}-${reserva.duracion}`;
      setTimeout(() => {
        const inputCancha = $id("cancha-seleccionada");
        if (inputCancha) inputCancha.value = valorCancha;

        const botones = $id("canchas-disponibles")?.querySelectorAll(
          ".btn-cancha"
        );
        const botonAMarcar = Array.from(botones || []).find(
          (btn) => btn.dataset.valor === valorCancha
        );
        if (botonAMarcar) botonAMarcar.click();
      }, 50);

      actualizarTextoBoton(); // Cambia el texto del botón del formulario para que diga "Editar"
    },
  });
};
