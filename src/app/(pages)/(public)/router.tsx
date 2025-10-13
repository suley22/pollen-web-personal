export const PublicRoutes = {
  home: `/`,
  about: `/about`,
  contact: `/contact`,
  faqs: `/faqs`,
  terms: `/terms`,
  privacy: `/privacy`,
};

export const LoginRoutes = {
  login: `/login`,
  register: `/register`,
  forgotPassword: `/forgot-password`,
  resetPassword: `/reset-password`,
};

export const PUBLIC_ROUTES = Object.values(PublicRoutes).concat(
  Object.values(LoginRoutes),
);
