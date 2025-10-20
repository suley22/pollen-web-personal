import NextImage from "next/image";

// Stub temporal para evitar errores de importación en el build.
export function Image(props) {
  return (
    <NextImage alt={props.alt || "image"} width={500} height={300} {...props} />
  );
}
