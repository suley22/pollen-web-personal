
export default function CircularProgress({
  value,
  size = 120, // tamaño de referencia (y fallback)
  strokeWidth = 12,
  label,
  showLabel = true,
  trackClassName = "text-gray-200 dark:text-gray-700",
  progressClassName = "text-pink-600",
  textClassName = "text-gray-800",
  roundedCaps = true,
  ariaLabel = "Progreso",
  fluid = false, // <= NUEVO: si true, llena el alto del contenedor
}) {
  const pct = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - pct / 100);

  // Estilos según modo
  const boxClasses = fluid
    ? "relative grid place-items-center aspect-square w-full h-full"
    : "relative grid place-items-center";
  const boxStyle = fluid
    ? { minWidth: size, minHeight: size } // por si el padre no tiene alto aún
    : { width: size, height: size };

  return (
    <div
      className={boxClasses}
      style={boxStyle}
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
        viewBox={`0 0 ${size} ${size}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={trackClassName}
          fill="none"
        />
        {/* Progreso */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
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
        <span
          className={`absolute inset-0 grid place-items-center font-semibold ${textClassName}`}
          style={{ fontSize: Math.max(12, size * 0.18) }}
        >
          {label ?? `${Math.round(pct)}%`}
        </span>
      )}
    </div>
  );
}
