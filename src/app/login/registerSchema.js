import { z } from "zod";

export const emailErrorMessages = {
  EMAIL_NOT_VALID: "El email no es válido",
};

export const passwordErrorMessages = {
  MIN_PASSWORD_LENGTH: "Mínimo 8 caracteres",
  MIN_UPPERCASE_LETTER: "Al menos una mayúscula",
  MIN_PASSWORD_NUMBER: "Al menos un número",
  MIN_PASSWORD_SYMBOL: "Al menos un símbolo",
};

export const UserInfoModel = z.object({
  email: z.email(emailErrorMessages.EMAIL_NOT_VALID),
  password: z
    .string()
    .min(8, passwordErrorMessages.MIN_PASSWORD_LENGTH)
    .regex(/[A-Z]/, passwordErrorMessages.MIN_UPPERCASE_LETTER)
    .regex(/[0-9]/, passwordErrorMessages.MIN_PASSWORD_NUMBER)
    .regex(/[^a-zA-Z0-9]/, passwordErrorMessages.MIN_PASSWORD_SYMBOL),
});
