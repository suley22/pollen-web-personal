const basePath = "/auth";

export const LoginRoutes = {
  login: `/login`,
  logout: `${basePath}/logout`,
  confirm: `${basePath}/confirm`,
  callback: `${basePath}/callback`,
  userInfo: `/login/user-info`,
};
