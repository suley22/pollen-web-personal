export default function CircularProgress({
  value,
  size = 120, // diámetro mínimo de referencia
  strokeWidth = 12,
  label,
  showLabel = true,
  trackClassName = "text-gray-200 dark:text-gray-700",
  progressClassName = "text-pink-600",
  textClassName = "text-gray-800",
  roundedCaps = true,
  ariaLabel = "Progreso",
  fluid = false, // llena el contenedor padre (si define alto/ancho)
  autoFit = true, // ⬅ NUEVO: ajusta el diámetro al contenido
  contentGap = 0, // separación entre número y caption
  contentPadding = 8, // margen interno extra alrededor del texto
}) {
  const pct = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;

  // Tamaños tipográficos solicitados
  const numberPx = 28;
  const captionPx = 12;

  // Diámetro mínimo necesario para que entren número + caption verticalmente
  // InnerDiameter ≈ finalSize - strokeWidth (aprox, por el stroke centrado)
  const minInnerByContent =
    numberPx + captionPx + contentGap + contentPadding * 2;
  const finalSize = Math.max(size, minInnerByContent + strokeWidth);

  const radius = (finalSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - pct / 100);

  const wrapperClass = fluid
    ? "relative grid place-items-center aspect-square w-full h-full"
    : "relative grid place-items-center";
  const wrapperStyle = fluid
    ? undefined
    : { width: autoFit ? finalSize : size, height: autoFit ? finalSize : size };

  return (
    <div
      className={wrapperClass}
      style={wrapperStyle}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      title={`${Math.round(pct)}%`}
    >
      <svg
        className="-rotate-90"
        width="100%"
        height="100%"
        viewBox={`0 0 ${finalSize} ${finalSize}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Track */}
        <circle
          cx={finalSize / 2}
          cy={finalSize / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={trackClassName}
          fill="none"
        />
        {/* Progreso */}
        <circle
          cx={finalSize / 2}
          cy={finalSize / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={progressClassName}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap={roundedCaps ? "round" : "butt"}
          style={{ transition: "stroke-dashoffset 300ms ease" }}
        />
      </svg>

      {showLabel && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center ${textClassName}`}
          style={{ padding: contentPadding }}
        >
          <span
            className="leading-none font-semibold"
            style={{ fontWeight: 700, fontSize: numberPx }}
          >
            {label ?? `${Math.round(pct)}%`}
          </span>
          <span
            className="leading-none font-normal font-sans"
            style={{
              fontSize: captionPx,
              marginTop: contentGap,
            }}
          >
            Complete
          </span>
        </div>
      )}
    </div>
  );
}
