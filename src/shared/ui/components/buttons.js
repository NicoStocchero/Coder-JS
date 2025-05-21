export const crearBotonInteractivo = ({
  texto,
  clase,
  tipo = "button",
  dataset = {},
  clasesExtra = [],
  onClick,
  usarHTML = false,
}) => {
  const boton = document.createElement("button");
  boton.classList.add(clase);
  clasesExtra.forEach((c) => boton.classList.add(c));
  boton.type = tipo;

  if (usarHTML) {
    boton.innerHTML = texto;
  } else {
    boton.textContent = texto;
  }

  Object.entries(dataset).forEach(([key, value]) => {
    boton.dataset[key] = value;
  });

  if (typeof onClick === "function") {
    boton.addEventListener("click", onClick);
  }

  return boton;
};
