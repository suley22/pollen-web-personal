# Configuración de Variables de Entorno

## Error: OpenAI API key is missing

Para resolver el error `AI_LoadAPIKeyError`, necesitas configurar la variable de entorno `OPENAI_API_KEY`.

### Pasos para configurar:

1. **Crear archivo `.env.local`** en la raíz del proyecto:

   ```bash
   touch .env.local
   ```

2. **Agregar la variable de entorno** en `.env.local`:

   ```
   OPENAI_API_KEY=tu_clave_api_de_openai_aqui
   ```

3. **Obtener una clave API de OpenAI:**
   - Ve a [OpenAI Platform](https://platform.openai.com/api-keys)
   - Inicia sesión o crea una cuenta
   - Crea una nueva clave API
   - Copia la clave y pégala en tu archivo `.env.local`

4. **Reiniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

### Ejemplo de archivo `.env.local`:

```
OPENAI_API_KEY=sk-1234567890abcdef...
```

### Nota de Seguridad:

- Nunca subas el archivo `.env.local` a tu repositorio de Git
- El archivo ya está incluido en `.gitignore` para proteger tu clave API
