import { procesarJugador } from "../logic/procesarJugador.js";
import {
  notificarExito,
  notificarError,
  guardarRegistroEditado,
} from "../../../shared/ui/index.js";
import { renderizarJugadores } from "./cargarJugadores.js";

const crearFormularioJugadorEditable = (jugador) => {
  return `
  <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${jugador.nombre}" />
  <input id="swal-apellido" class="swal2-input" placeholder="Apellido" value="${jugador.apellido}" />
  <input id="swal-email" class="swal2-input" placeholder="Email" value="${jugador.email}" />
  <input id="swal-telefono" class="swal2-input" placeholder="Teléfono" value="${jugador.telefono}" />
`;
};

const obtenerDatosModalJugador = () => {
  const popup = Swal.getPopup();
  return {
    nombre: popup.querySelector("#swal-nombre").value,
    apellido: popup.querySelector("#swal-apellido").value,
    email: popup.querySelector("#swal-email").value,
    telefono: popup.querySelector("#swal-telefono").value,
  };
};

export const mostrarModalEditarJugador = (id, tipo, etiqueta, jugador) => {
  Swal.fire({
    title: `Editar ${etiqueta}`,
    html: crearFormularioJugadorEditable(jugador),
    focusConfirm: false,
    preConfirm: () => {
      const datos = obtenerDatosModalJugador();
      const resultado = procesarJugador(datos);

      if (!resultado.valido) {
        const primerError = Object.values(resultado.errores).find(Boolean);
        Swal.showValidationMessage(primerError);
        return false;
      }

      const fueEditado = guardarRegistroEditado(tipo, id, resultado.datos);
      if (!fueEditado) {
        notificarError({ mensaje: `No se pudo actualizar el ${etiqueta}.` });
        return false;
      }

      return resultado.datos;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      notificarExito({
        titulo: `${etiqueta} actualizado`,
        mensaje: `Los datos se guardaron correctamente.`,
      });

      renderizarJugadores();
    }
  });
};
