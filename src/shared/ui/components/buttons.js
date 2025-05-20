export const crearBotonInteractivo = ({
  texto,
  clase,
  tipo = "button",
  dataset = {},
  clasesExtra = [],
  onClick,
}) => {
  const boton = document.createElement("button");
  boton.classList.add(clase);
  clasesExtra.forEach((c) => boton.classList.add(c));
  boton.textContent = texto;
  boton.type = tipo;

  Object.entries(dataset).forEach(([key, value]) => {
    boton.dataset[key] = value;
  });

  if (typeof onClick === "function") {
    boton.addEventListener("click", onClick);
  }

  return boton;
};
