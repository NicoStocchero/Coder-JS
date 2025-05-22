// Crea un botón personalizado con ícono, dataset, clases y evento onClick opcional
export const crearBotonInteractivo = ({
  texto,
  clase,
  tipo = "button",
  icono = "",
  dataset = {},
  clasesExtra = [],
  onClick,
  usarHTML = false,
}) => {
  const boton = document.createElement("button");

  boton.classList.add(clase);
  clasesExtra.forEach((c) => boton.classList.add(c));
  boton.type = tipo;

  // Agrega ícono si se especifica
  if (icono) {
    const iconoElemento = document.createElement("i");
    iconoElemento.className = icono;
    boton.appendChild(iconoElemento);
  }

  // Inserta el texto en el botón (como texto plano o HTML)
  if (usarHTML) {
    boton.innerHTML += texto;
  } else {
    boton.textContent += texto;
  }

  // Asigna atributos dataset al botón
  Object.entries(dataset).forEach(([key, value]) => {
    boton.dataset[key] = value;
  });

  // Asocia función al evento click si se pasa como prop
  if (typeof onClick === "function") {
    boton.addEventListener("click", onClick);
  }

  return boton;
};
