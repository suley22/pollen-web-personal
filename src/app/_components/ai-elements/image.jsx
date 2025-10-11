// Stub temporal para evitar errores de importación en el build.
export function Image(props) {
  return <img alt={props.alt || "image"} {...props} />;
}
