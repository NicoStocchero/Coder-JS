import { $id, manejarEventoEditar } from "../../../shared/ui/index.js";
import { formController } from "./init.js";

// Asocia la lógica al botón de editar reserva dentro del contenedor de reservas
// Cuando se hace clic, precarga todos los campos del formulario con los datos de la reserva actual
export const iniciarEdicionReserva = () => {
  manejarEventoEditar({
    contenedor: $id("lista-reservas"),
    tipo: "reservas",
    etiqueta: "reserva",
    selector: ".btn-editar-reserva",

    funcion: (_id, _tipo, _etiqueta, reserva) => {
      formController.iniciarEdicion(reserva); // Cambia el modo a edición
    },
  });
};
