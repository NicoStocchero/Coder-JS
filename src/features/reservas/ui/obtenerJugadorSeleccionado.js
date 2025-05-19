export const obtenerJugadorSeleccionado = () => {
  const selectJugador = document.getElementById("jugadores");
  return {
    idJugador: selectJugador?.value || "",
    nombreJugador:
      selectJugador?.options[selectJugador.selectedIndex]?.text || "",
  };
};
