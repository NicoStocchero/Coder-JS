export const notificarExito = ({ titulo, mensaje, html }) => {
  Swal.fire({
    icon: "success",
    title: titulo || undefined,
    text: mensaje || undefined,
    html: html || undefined,
    confirmButtonText: "Aceptar",
  });
};

export const notificarError = ({ titulo = "", mensaje = "" }) => {
  Swal.fire({
    icon: "error",
    title: titulo || undefined,
    text: mensaje || "Ocurrió un error inesperado.",
  });
};

export const notificarConfirmacion = async ({
  titulo,
  mensaje,
  confirmText = "Sí",
  cancelText = "Cancelar",
}) => {
  const resultado = await Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });

  return resultado.isConfirmed;
};
