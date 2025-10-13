import { z } from "zod";

export const firstNameErrorMessages = {
  MIN_FIRST_NAME_LENGTH: "El nombre debe tener al menos 3 caracteres",
  INVALID_FIRST_NAME: "The first name cannot contain numbers or special characters"
};

export const lastNameErrorMessages = {
  MIN_LAST_NAME_LENGTH: "El apellido debe tener al menos 3 caracteres",
  INVALID_LAST_NAME: "The last name cannot contain numbers or special characters"
};

export const UserInfoModel = z.object({
  first_name: z
    .string()
    .min(3, firstNameErrorMessages.MIN_FIRST_NAME_LENGTH)
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, firstNameErrorMessages.INVALID_FIRST_NAME),
  last_name: z
    .string()
    .min(3, lastNameErrorMessages.MIN_LAST_NAME_LENGTH)
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, lastNameErrorMessages.INVALID_LAST_NAME)
});
