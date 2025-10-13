# GitHub Actions Workflows

Este proyecto utiliza GitHub Actions para automatizar la validación de código y el proceso de CI/CD.

## Workflows Configurados

### 1. 🔍 `lint.yml` - Validación ESLint Simple

**Cuándo se ejecuta:**

- En Pull Requests hacia `main` y `develop`
- En push directo a `main`

**Qué hace:**

- Instala dependencias
- Ejecuta ESLint
- Falla si hay errores de linting

### 2. 🚀 `ci.yml` - Pipeline CI/CD Completo

**Cuándo se ejecuta:**

- En Pull Requests hacia `main` y `develop`
- En push directo a `main`

**Qué hace:**

- Validación de calidad de código (ESLint)
- Verificación de build
- Validación específica para PRs
- Reportes detallados

### 3. ⚡ `quick-lint.yml` - Lint Rápido

**Cuándo se ejecuta:**

- Solo cuando se modifican archivos JS/TS/JSX/TSX
- En Pull Requests

**Qué hace:**

- Lint optimizado solo en archivos relevantes
- Ejecución rápida (< 5 minutos)
- No permite warnings (--max-warnings 0)

## Configuración del Proyecto

### Scripts de npm requeridos:

```json
{
  "scripts": {
    "lint": "eslint ./src",
    "build": "next build"
  }
}
```

### Archivos monitoreados:

- `src/**/*.{js,jsx,ts,tsx}` - Código fuente
- `package.json` y `package-lock.json` - Dependencias
- `eslint.config.mjs` - Configuración ESLint

## Cómo funciona

1. **En Pull Requests:** Se ejecutan todos los checks de validación
2. **En Push a main:** Se ejecuta la validación completa
3. **Optimización:** Los workflows se cancelan automáticamente si hay un nuevo push

## Estados de los Checks

- ✅ **Passed:** Todo correcto, se puede hacer merge
- ❌ **Failed:** Hay errores que deben corregirse
- 🟡 **In Progress:** Los checks están ejecutándose

## Solución de Problemas

Si un workflow falla:

1. **ESLint errors:** Ejecuta `npm run lint` localmente y corrige los errores
2. **Build errors:** Ejecuta `npm run build` localmente para verificar
3. **Dependencies:** Asegúrate de que `package-lock.json` esté actualizado

## Configuración Adicional

Los workflows están configurados con:

- **Timeout:** 10 minutos máximo por job
- **Node.js:** Versión 18
- **Cache:** npm cache habilitado para mejor rendimiento
- **Concurrency:** Cancela runs anteriores automáticamente
