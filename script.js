
/* -----------------------------------------
   M I K E Y  D I L L O N
   INTERACTIONS — VERSION 2.2
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
// 2. SUBTLE POINTER MOVEMENT
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
// 3. PAPER TEXTURE PARALLAX
// -----------------------------------------

// The paper texture moves slightly slower than the page.
// This creates a subtle sense of depth as you scroll.

const isMobile = window.matchMedia("(max-width: 700px)");

let parallaxFrame = null;

function updatePaperParallax() {
  if (prefersReducedMotion.matches) {
    document.body.style.setProperty(
      "--paper-parallax-y",
      "0px"
    );
    return;
  }

  const scrollPosition = window.scrollY;

  // Gentle movement on desktop, even gentler on mobile.
  const movement = isMobile.matches ? 0.035 : 0.10;

  const offset = -(scrollPosition * movement);

  document.body.style.setProperty(
    "--paper-parallax-y",
    `${offset}px`
  );
}

function requestParallaxUpdate() {
  if (parallaxFrame !== null) return;

  parallaxFrame = window.requestAnimationFrame(() => {
    updatePaperParallax();
    parallaxFrame = null;
  });
}

// Set the initial position.
updatePaperParallax();

// Update as the page scrolls.
window.addEventListener(
  "scroll",
  requestParallaxUpdate,
  { passive: true }
);

// Keep the effect responsive to screen size changes.
window.addEventListener(
  "resize",
  requestParallaxUpdate,
  { passive: true }
);

// Respect changes to the user's motion preference.
prefersReducedMotion.addEventListener("change", () => {
  updatePaperParallax();
});


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
// 5. CONSOLE EASTER EGG
// -----------------------------------------

console.log(
  "%cYou've found the back room.",
  "font-family: Georgia; font-size: 18px; color: #286c68;"
);

console.log(
  "Some things are better left unexplained. ⟡"
);
