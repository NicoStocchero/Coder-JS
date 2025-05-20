export const crearBadge = ({ texto, clase = "badge-activo" }) => {
  const badge = document.createElement("span");
  badge.classList.add("badge", clase);
  badge.textContent = texto;
  return badge;
};
