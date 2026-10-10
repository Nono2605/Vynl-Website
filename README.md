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
favicon.png, apple-touch-icon.png
vercel.json            { "framework": null }
```

## Lancer en local

```bash
python3 -m http.server 8110
```

Puis ouvrir `http://localhost:8110`. En local, le catalogue interroge
`http://localhost:4000` (l'API) ; s'il ne répond pas, la section reste
simplement masquée.

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
- **Mots d'étiquette = titres** : « AI-assisted » et « AI-generated » sont des
  `h3` visibles (pas de badge en doublon), dimensionnés pour tenir en entier dans
  la largeur sur ordinateur comme sur mobile.

## À savoir

- **Liens vers les apps** : ils vivent dans `js/config.js` et sont injectés via
  `data-link="<clé>"`. Le `href` écrit dans le HTML n'est qu'un repli sans JS.
- **CORS** : le catalogue appelle l'API depuis le navigateur. Le domaine de ce
  site doit figurer dans `CORS_ALLOWED_ORIGINS` sur Render, sinon la section
  « New AI tracks, just pressed » ne s'affichera jamais (sans erreur visible).
- **Aucune donnée inventée** : pas de faux artistes ni de chiffres. Les
  fonctionnalités pas encore construites sont marquées « Coming ».
- **Animation du disque** : purement décorative. Elle démarre à l'arrêt si le
  visiteur a activé `prefers-reduced-motion`.
- **Thème** : sombre uniquement, comme dans la DA (le mode clair n'est pas prévu
  pour le site).
- **À ajouter plus tard** : pages légales (confidentialité, conditions), image
  de partage Open Graph (demande une URL absolue du domaine final), `sitemap.xml`
  et `robots.txt` une fois le domaine définitif connu.
