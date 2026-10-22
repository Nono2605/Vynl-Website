# Vynl, site vitrine

Site marketing statique de Vynl, la plateforme de streaming de musique IA
(AI-generated et AI-assisted). HTML, CSS et JavaScript natifs : pas de
framework, pas de build, aucune dépendance. Il oriente vers l'app auditeur et
le Creator Studio, et affiche le catalogue réel via l'API publique.

## Pages

| Fichier | Contenu |
| --- | --- |
| `index.html` | Accueil : hero (disque géant), bande défilante, pourquoi Vynl (défilement horizontal épinglé), les 2 étiquettes, catalogue réel, studio (pile de cartes), appel final |
| `creators.html` | Creator Studio : bento incliné des fonctionnalités (Live / Coming), frise verticale en 4 étapes, prérequis |
| `transparency.html` | Étiquettes AI-assisted / AI-generated, royalties centrées sur l'utilisateur |
| `roadmap.html` | Avancement de la beta : ce qui est en ligne et ce qui reste à construire (musique AI-assisted, abonnements, publicité, royalties, versements, textes légaux, migration de la base) et, en tête, les quatre règles de la bêta. Les étapes sont écrites en dur dans le HTML (une `li` par étape, classe `road__item--live` pour « Live ») ; le compteur du hero est un attribut `--v` (pourcentage) et un texte à mettre à jour à la main |
| `privacy.html`, `terms.html`, `creator-terms.html`, `legal-notice.html` | **Brouillons juridiques**, à relire avec un juriste (voir « Pages légales » plus bas) |
| `404.html` | Page introuvable (chemins absolus : elle est servie à l'adresse demandée) |

## Structure

```
css/style.css          tokens de design + tous les composants
js/config.js           URLs des autres apps et de l'API (seul endroit à modifier)
js/main.js             liens, menu mobile, disque, apparition au scroll, éclairage des tuiles, catalogue
js/motion.js           scénographie au défilement (GSAP + ScrollTrigger), tout est optionnel
assets/vendor/         GSAP 3.12.7 et ScrollTrigger, hébergés localement (116 Ko)
assets/fonts/          Dela Gothic One et Sora (latin, hébergées localement)
assets/icons.svg       sprite d'icônes Phosphor (regular, play et pause en fill)
assets/vynl-icon.png   icône du logo, 192 px (en-tête et pied de page)
assets/vynl-logo-720.webp   logo en grand, avec transparence (hero Créateurs, filigrane de l'appel final)
favicon.ico, favicon-32.png, favicon-192.png, apple-touch-icon.png   (favicon.png : ancien fichier, plus référencé)
vercel.json            { "framework": null, "cleanUrls": true }
```

## Lancer en local

```bash
python3 -m http.server 8110
```

Puis ouvrir `http://localhost:8110`. En local, le catalogue interroge
`http://localhost:4000` (l'API) ; s'il ne répond pas, la section reste
simplement masquée.

**URLs propres.** Sur Vercel, `cleanUrls` sert `/roadmap` et redirige
`/roadmap.html` vers `/roadmap`. Les liens du HTML gardent `.html` pour que la
navigation marche aussi avec ce serveur Python, qui ne connaît pas les URLs
propres (le visiteur est simplement redirigé).

## Identité

Direction artistique « studio d'écoute nocturne » : un fond très sombre et une
seule source de lumière bleue qui fait briller le vinyle. Règle : 80 % de
sombre, 15 % de bleu, 5 % de cyan (le cyan est rare : ce qui est actif).

| Token | Valeur | Usage |
| --- | --- | --- |
| `--vynl-nuit` | `#050816` | fond principal |
| `--vynl-abysse` | `#0B1130` | menu mobile, fonds de disque |
| `--vynl-vinyle` | `#17204F` | survols |
| `--vynl-sillon` | `#32428C` | bordures (à 40 %), pistes de progression |
| `--vynl-bleu` / `--vynl-bleu-profond` | `#0059F9` / `#001CB2` | boutons, survol |
| `--vynl-cyan` | `#19E3FF` | accent rare : actif, focus, badge AI-generated |
| `--vynl-reflet` | `#90BFE9` | reflets du disque |
| `--vynl-indigo` / `--vynl-ocean` | `#1C2C8C` / `#0F4A9E` | teintes des sections et des panneaux |
| `--vynl-azur` / `--vynl-azur-clair` / `--vynl-ciel` | `#3D8BFF` / `#94BFFF` / `#6FD6FF` | détails, mots mis en valeur, icônes |

Texte : blanc `#FFFFFF`, bleu-gris `#A9B4D6`, bleu-gris foncé `#6B77A6`
(réservé à la ligne légale, jamais sur fond bleu : le contraste y est trop bas).

Polices : **Dela Gothic One** pour la marque et les deux grands titres
d'impact (hero et appel final, jamais sous 24 px), **Sora** pour tout le
reste. Formes : boutons en pilule de 48 px, panneaux 24 px, cartes 16 px,
badges 8 px. Une seule lueur forte par écran, animations de 200 à 500 ms.
Seul dégradé sur du texte : l'accent des titres de hero.

## Principes de mise en page

- **Pas de trait entre les sections** : les sections bleues (`.section--tint`)
  se fondent dans le fond. Le dégradé est transparent aux deux bouts (rampe en
  S sur `--fade`) et déborde de `--blend` sur les voisines sans bouger le
  contenu, donc deux sections bleues qui se suivent se mélangent sans creux.
- **Un seul H1 par page**, des H2 qui portent de vrais mots-clés (musique IA,
  artistes IA). Pas de H2 décoratifs : les titres du pied de page sont des `p`.
- **Aucun tiret long** dans le texte visible (point, virgule ou deux-points).
- **Mouvement motivé** : chaque animation a une raison (voir l'en-tête de
  `js/motion.js`). Le disque et le logo tournent avec le défilement ; la section
  « why » est épinglée et défile à l'horizontale (trois idées, dans l'ordre) ;
  les mots AI-assisted / AI-generated arrivent de côté et se remplissent ; les
  cartes du studio se superposent en s'assombrissant ; le fil de la frise et les
  arcs du schéma se dessinent. Avec `prefers-reduced-motion`, sans JavaScript ou
  si GSAP ne charge pas : la section « why » devient un défilement horizontal
  natif, la pile de cartes reste collante en CSS pur, les mots sont déjà pleins.
- **Même scénographie sur mobile et sur ordinateur** : la section « why » est
  épinglée sur les deux (panneaux à 82 % de la largeur sur mobile), la pile de
  cartes reste collante, le disque déborde, le bento garde son inclinaison. Seuls
  les effets au curseur (éclairage des tuiles, boutons magnétiques) sont réservés
  aux pointeurs précis. `ScrollTrigger.config({ ignoreMobileResize: true })`
  évite que la barre d'adresse mobile ne décale les sections épinglées.
- **Ordre de création des animations** : `js/motion.js` crée la section épinglée
  EN PREMIER (avec `refreshPriority`). Un épinglage décale tout ce qui est en
  dessous et ScrollTrigger calcule les positions dans l'ordre de création : créé
  après, il laissait les mots des étiquettes, la pile et l'appel final déjà
  terminés dès le chargement (le remplissage vide vers plein ne se voyait plus).
- **Mots d'étiquette = titres** : « AI-assisted » et « AI-generated » sont des
  `h3` visibles (pas de badge en doublon), dimensionnés pour tenir en entier dans
  la largeur sur ordinateur comme sur mobile.

## À savoir

- **Liens vers les apps** : ils vivent dans `js/config.js` et sont injectés via
  `data-link="<clé>"`. Le `href` écrit dans le HTML n'est qu'un repli sans JS.
- **CORS** : le catalogue appelle l'API depuis le navigateur. Le domaine de ce
  site (`https://www.vynl.ch`) doit figurer dans `CORS_ALLOWED_ORIGINS` sur Render, sinon la section
  « New AI tracks, just pressed » ne s'affichera jamais (sans erreur visible).
- **Aucune donnée inventée** : pas de faux artistes ni de chiffres. Les
  fonctionnalités pas encore construites sont marquées « Coming ».
- **Animation du disque** : purement décorative. Elle démarre à l'arrêt si le
  visiteur a activé `prefers-reduced-motion`.
- **Thème** : sombre uniquement, comme dans la DA (le mode clair n'est pas prévu
  pour le site).
- **La roadmap reflète le code** : une étape est « Live » seulement si la
  fonction marche dans l'API, le Studio ou l'app d'écoute (à vérifier dans leur
  code, pas de mémoire). Tout ce que la vitrine promet sans que ce soit en ligne
  doit avoir une étape « Coming » et une mention discrète sous la promesse :
  `<p class="dev-note">… <a href="roadmap.html#next">See the roadmap</a></p>` (anneau
  gris comme les étapes « Coming »). À retirer, avec l'étape passée en « Live »,
  quand la fonction sort. Pendant la bêta : seule la musique déclarée AI-generated
  est acceptée (règle de l'API et de l'admin, `provenance.ts`).
- **Domaines** : le site est sur `www.vynl.ch` (`vynl.ch` redirige vers `www`),
  l'app d'écoute sur `app.vynl.ch`, le Studio sur `creator.vynl.ch`. Ces adresses
  vivent dans `js/config.js` ; le `href` écrit dans le HTML est le repli sans JS et
  doit rester identique. L'API est sur `api.vynl.ch` (domaine personnalisé du service
  Render ; l'ancienne adresse `music-app-api-9cjg.onrender.com` répond toujours).
- **À ajouter plus tard** : image de partage Open Graph, `canonical`, `og:url`,
  `sitemap.xml` et `robots.txt` (le domaine est connu : `https://www.vynl.ch`).

## Pages légales (brouillons)

`privacy.html`, `terms.html`, `creator-terms.html` et `legal-notice.html` sont des
**exemples**, écrits à partir de l'inventaire de
`Vynl-App-1.1.2/V1.1.2/docs/PRIVACY_POLICY_DRAFT.md` et du code de l'API, pour être
relus avec un juriste (droit suisse nLPD et RGPD). Un bandeau « Draft for legal
review » est affiché en haut de chaque page.

- Les champs à remplir sont des `<span class="ph">[…]</span>` (société, adresse,
  contacts, durées, droit applicable). Les retrouver : `grep -n 'class="ph"' *.html`.
- Les pages portent `<meta name="robots" content="noindex">` : **à retirer** une fois
  les textes validés, ainsi que le bandeau, la ligne « Draft v0.1 » et le
  « (Draft) » des titres.
- Les liens du pied de page (`Privacy`, `Terms`, `Creator Terms`, `Legal notice`)
  sont sur toutes les pages. Les futures URLs `PRIVACY_POLICY_URL` et `TERMS_URL`
  de l'app auditeur sont `/privacy` et `/terms`.
- Le Studio affiche encore un texte provisoire pour les Creator Terms : il doit
  pointer vers `https://www.vynl.ch/creator-terms`.
