const basePath = "/login";

export const LoginRoutes = {
  login: `${basePath}`,
  logout: `/logout`,
  confirm: `${basePath}/confirm`,
  authCallback: `${basePath}/auth/code-callback`,
  userInfo: `${basePath}/user-info`,
  authResetPassword: "/auth/reset-password",
  forgotPassword: `${basePath}/forgot-password`,
  authConfirm: "/auth/confirm",
};
