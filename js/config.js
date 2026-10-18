/**
 * Configuration centrale du site vitrine.
 *
 * Seul endroit où vivent les URLs des autres briques (app auditeur, studio
 * créateur, API). Les liens du HTML les lisent via data-link="<clé>".
 * Changer un domaine = modifier ce fichier, rien d'autre.
 */
window.VYNL = {
  links: {
    app: "https://app.vynl.ch",
    login: "https://app.vynl.ch/login",
    signup: "https://app.vynl.ch/signup",
    creator: "https://creator.vynl.ch",
    creatorLogin: "https://creator.vynl.ch/login",
    creatorSignup: "https://creator.vynl.ch/signup",
  },

  // Le site ne parle qu'à l'API, jamais directement à Supabase.
  apiBase:
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://music-app-api-9cjg.onrender.com",
};
