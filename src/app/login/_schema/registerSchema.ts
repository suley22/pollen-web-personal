import { z } from "zod";

export const emailErrorMessages = {
  EMAIL_NOT_VALID: "Email is not valid",
};

export const passwordErrorMessages = {
  MIN_PASSWORD_LENGTH: "Minimum 8 characters",
  MIN_UPPERCASE_LETTER: "At least one uppercase letter",
  MIN_PASSWORD_NUMBER: "At least one number",
  MIN_PASSWORD_SYMBOL: "At least one symbol",
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
