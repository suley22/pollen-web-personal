import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("El email no es válido"),
  password: z
    .string()
    .min(8, "Debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^a-zA-Z0-9]/, "Debe contener al menos un símbolo"),
});
