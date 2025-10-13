const basePath = "/login";

export const LoginRoutes = {
  login: `${basePath}`,
  logout: `/logout`,
  userInfo: `${basePath}/user-info`, //TODO: Mover al perfil del usuario
  forgotPassword: `${basePath}/forgot-password`,
  authConfirm: `${basePath}/auth/confirm`,
  authResetPassword: `${basePath}/auth/reset-password`,
  authCodeCallback: `${basePath}/auth/code-callback`,
};
