/**
 * Mouvement du site : GSAP + ScrollTrigger (hébergés dans assets/vendor).
 *
 * Tout est une amélioration progressive. Sans GSAP, sans JavaScript ou avec
 * prefers-reduced-motion, le site reste complet : la section "why" devient un
 * défilement horizontal natif, la pile de cartes reste collante en CSS, les mots
 * immenses restent pleins.
 *
 * Chaque animation a une raison :
 *  - le disque et le logo tournent avec le défilement : profondeur, le disque "joue" ;
 *  - la section "why" est épinglée : trois idées racontées dans l'ordre ;
 *  - les mots AI-assisted / AI-generated arrivent de côté et se remplissent :
 *    ils sont la différence entre les deux étiquettes ;
 *  - les cartes du studio se superposent : quatre étapes, une à la fois ;
 *  - le fil de la frise et les arcs du schéma se dessinent : ils montrent une progression.
 */
(function () {
  "use strict";

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  var mm = gsap.matchMedia();

  /* ------------------------------------------------------------------------
     Partout (ordinateur et mobile), sauf prefers-reduced-motion
     ------------------------------------------------------------------------ */
  mm.add("(prefers-reduced-motion: no-preference)", function () {
    // Le disque du hero tourne et grossit un peu pendant que le hero s'éloigne
    var hero = $(".hero");
    var record = $(".player .record");
    if (hero && record) {
      gsap.to(record, {
        rotation: 40,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      });
    }

    // Le logo de la page Créateurs descend lentement et grossit
    var logoArt = $(".hero__art--logo");
    if (logoArt) {
      gsap.to(logoArt, {
        yPercent: 16,
        scale: 1.1,
        ease: "none",
        scrollTrigger: { trigger: logoArt.closest("section"), start: "top top", end: "bottom top", scrub: true },
      });
    }

    // Les deux étiquettes géantes de la page Transparence se croisent
    $$(".hero__art--badges .badge").forEach(function (badge, i) {
      gsap.to(badge, {
        xPercent: i === 0 ? -18 : 18,
        yPercent: i === 0 ? -14 : 14,
        ease: "none",
        scrollTrigger: { trigger: badge.closest("section"), start: "top top", end: "bottom top", scrub: true },
      });
    });

    // Mots immenses : chacun arrive de son côté, se remplit, et se pose en place
    // (l'animation finit avant le milieu de l'écran : le mot est lisible en entier au repos)
    $$(".kinetic__item").forEach(function (item) {
      var word = $(".kinetic__word", item);
      if (!word) return;
      var dir = item.classList.contains("kinetic__item--gen") ? 1 : -1;
      var shift = window.matchMedia("(min-width: 861px)").matches ? 12 : 8;
      var trigger = { trigger: word, start: "top 92%", end: "top 48%", scrub: true };
      gsap.fromTo(word, { x: dir * shift + "vw" }, { x: 0, ease: "none", scrollTrigger: trigger });
      gsap.fromTo(word, { "--fill": "0%" }, { "--fill": "100%", ease: "none", scrollTrigger: trigger });
    });

    // Les cartes du studio rapetissent et s'assombrissent quand la suivante les recouvre
    // (jamais d'opacité : on lirait les mots à travers la carte du dessus)
    var cards = $$(".stack__card");
    if (window.matchMedia("(min-width: 861px)").matches) {
      cards.forEach(function (card, i) {
        var next = cards[i + 1];
        if (!next) return;
        var stickTop = 72 + 16 + (i + 1) * 22;
        gsap.to(card, {
          scale: 0.93,
          filter: "brightness(0.5)",
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top " + stickTop + "px", scrub: true },
        });
      });
    }

    // Appel final : le logo grossit et tourne derrière le titre
    $$(".cta").forEach(function (cta) {
      var mark = $(".cta__mark", cta);
      if (!mark) return;
      gsap.fromTo(
        mark,
        { scale: 0.55, rotation: -10 },
        { scale: 1.35, rotation: 8, ease: "none", scrollTrigger: { trigger: cta, start: "top bottom", end: "bottom top", scrub: true } }
      );
    });

    // Bento : chaque tuile arrive en montant, légèrement agrandie
    $$(".tile").forEach(function (tile) {
      gsap.from(tile, {
        opacity: 0,
        y: 70,
        scale: 0.94,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: tile, start: "top 92%", once: true },
      });
    });

    // Frise : le fil se dessine, chaque étape arrive de son côté
    var timeline = $(".timeline");
    if (timeline) {
      var line = $(".timeline__line", timeline);
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: timeline, start: "top 70%", end: "bottom 60%", scrub: true } }
        );
      }
      var wide = window.matchMedia("(min-width: 861px)").matches;
      $$(".timeline__item", timeline).forEach(function (item, i) {
        gsap.from(item, {
          opacity: 0,
          x: wide ? (i % 2 === 0 ? -70 : 70) : 40,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });
    }

    // Schéma des royalties : les arcs se remplissent
    var diagram = $(".diagram");
    if (diagram) {
      $$(".diagram__arc", diagram).forEach(function (arc, i) {
        var finalDash = arc.getAttribute("stroke-dasharray") || "50 100";
        gsap.fromTo(
          arc,
          { strokeDasharray: "0.01 100", opacity: 0 },
          {
            strokeDasharray: finalDash,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: diagram, start: "top " + (82 - i * 4) + "%", end: "center 52%", scrub: true },
          }
        );
      });
    }
  });

  /* ------------------------------------------------------------------------
     Ordinateur uniquement : section "why" épinglée, défilement horizontal
     ------------------------------------------------------------------------ */
  mm.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", function () {
    var why = $(".why");
    if (!why) return;
    var pin = $(".why__pin", why);
    var track = $(".why__track", why);
    if (!pin || !track) return;

    why.classList.add("is-pinned");
    pin.removeAttribute("tabindex");

    function distance() {
      return Math.max(0, track.scrollWidth - pin.clientWidth);
    }

    var base = {
      trigger: pin,
      start: "top top",
      end: function () {
        return "+=" + distance();
      },
      scrub: 1,
      invalidateOnRefresh: true,
    };

    gsap.to(track, {
      x: function () {
        return -distance();
      },
      ease: "none",
      scrollTrigger: Object.assign({ pin: true, anticipatePin: 1 }, base),
    });

    var bar = $(".why__progress span", why);
    if (bar) gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: base });

    // Les pictogrammes fantômes glissent à contre-courant : sensation de profondeur
    $$(".why__ghost", why).forEach(function (ghost) {
      gsap.fromTo(ghost, { x: -90 }, { x: 90, ease: "none", scrollTrigger: base });
    });

    return function () {
      why.classList.remove("is-pinned");
      pin.setAttribute("tabindex", "0");
    };
  });

  /* ------------------------------------------------------------------------
     Pointeur précis uniquement : les boutons de l'appel final sont magnétiques
     ------------------------------------------------------------------------ */
  mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", function () {
    var cleanups = [];

    $$(".cta .btn").forEach(function (btn) {
      btn.classList.add("is-magnetic");
      var xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
      var yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });

      function move(e) {
        var rect = btn.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * 0.3);
        yTo((e.clientY - (rect.top + rect.height / 2)) * 0.4);
      }

      function leave() {
        xTo(0);
        yTo(0);
      }

      btn.addEventListener("pointermove", move);
      btn.addEventListener("pointerleave", leave);
      cleanups.push(function () {
        btn.removeEventListener("pointermove", move);
        btn.removeEventListener("pointerleave", leave);
        btn.classList.remove("is-magnetic");
        gsap.set(btn, { clearProps: "x,y" });
      });
    });

    return function () {
      cleanups.forEach(function (fn) {
        fn();
      });
    };
  });

  /* ------------------------------------------------------------------------
     Recalcul des positions quand la mise en page change (polices, images),
     puis retour à l'ancre demandée dans l'adresse (les espaceurs d'épinglage
     décalent les sections après le saut natif du navigateur).
     ------------------------------------------------------------------------ */
  function settle() {
    ScrollTrigger.refresh();
    if (location.hash.length > 1) {
      var target = null;
      try {
        target = document.querySelector(location.hash);
      } catch (e) {
        target = null;
      }
      if (target) target.scrollIntoView();
    }
  }

  window.addEventListener("load", function () {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(settle);
    } else {
      settle();
    }
  });
})();
