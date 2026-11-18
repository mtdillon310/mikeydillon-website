
/* -----------------------------------------
   M I K E Y  D I L L O N
   INTERACTIONS — VERSION 2.2
   THE SKETCHBOOK
------------------------------------------ */

// -----------------------------------------
// 1. SCROLL REVEALS
// -----------------------------------------

// Reveal elements as they enter the viewport.
// Content remains visible if JavaScript is unavailable.

const revealTargets = document.querySelectorAll(
  ".piece, .edition-mark"
);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (
  "IntersectionObserver" in window &&
  !prefersReducedMotion.matches
) {
  revealTargets.forEach((element) => {
    element.classList.add("reveal-ready");
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealTargets.forEach((element) => {
    revealObserver.observe(element);
  });
}


// -----------------------------------------
// 2. PAPER PARALLAX
// -----------------------------------------

// The paper texture moves more slowly than
// the foreground as the visitor scrolls.

const root = document.documentElement;

let scrollTicking = false;

function updatePaperParallax() {
  if (prefersReducedMotion.matches) {
    root.style.setProperty("--paper-parallax-y", "0px");
    scrollTicking = false;
    return;
  }

  const offset = window.scrollY * -0.12;

  root.style.setProperty(
    "--paper-parallax-y",
    `${offset}px`
  );

  scrollTicking = false;
}

function requestPaperParallaxUpdate() {
  if (!scrollTicking) {
    window.requestAnimationFrame(updatePaperParallax);
    scrollTicking = true;
  }
}

if (!prefersReducedMotion.matches) {
  window.addEventListener(
    "scroll",
    requestPaperParallaxUpdate,
    { passive: true }
  );

  updatePaperParallax();
}


// -----------------------------------------
// 3. POINTER INTERACTION
// -----------------------------------------

// A small pointer response on larger screens.
// Disabled on touch devices.

const canHover = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
);

if (canHover.matches) {
  document.querySelectorAll(".project-piece").forEach((piece) => {
    piece.addEventListener("pointermove", (event) => {
      const bounds = piece.getBoundingClientRect();

      const x =
        (event.clientX - bounds.left) / bounds.width - 0.5;

      const y =
        (event.clientY - bounds.top) / bounds.height - 0.5;

      piece.style.setProperty("--pointer-x", `${x * 5}px`);
      piece.style.setProperty("--pointer-y", `${y * 5}px`);
    });

    piece.addEventListener("pointerleave", () => {
      piece.style.removeProperty("--pointer-x");
      piece.style.removeProperty("--pointer-y");
    });
  });
}


// -----------------------------------------
// 4. HIDDEN COLOR MODE
// -----------------------------------------

// Type K E R N E anywhere on the page.

let secretSequence = "";
const secretWord = "KERNE";

document.addEventListener("keydown", (event) => {
  if (event.key.length !== 1) return;

  secretSequence += event.key.toUpperCase();

  secretSequence = secretSequence.slice(
    -secretWord.length
  );

  if (secretSequence === secretWord) {
    document.body.classList.toggle("secret-mode");
    secretSequence = "";
  }
});


// -----------------------------------------
// 5. A MESSAGE FOR THE CURIOUS
// -----------------------------------------

console.log(
  "%cYou've found the back room.",
  "font-family: Georgia; font-size: 18px; color: #286c68;"
);

console.log(
  "Some things are better left unexplained. ⟡"
);
