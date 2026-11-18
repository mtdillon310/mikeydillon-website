
/* -----------------------------------------
   M I K E Y  D I L L O N
   INTERACTIONS — VERSION 2.3
------------------------------------------ */

// -----------------------------------------
// 1. SCROLL REVEALS
// -----------------------------------------

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

// The paper moves gently as the page scrolls.
// Movement is capped so the texture always
// covers the visible page.

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

  const movement = isMobile.matches ? 0.035 : 0.10;

  // Cap movement at 45px to prevent exposed edges.
  const offset = Math.max(
    -45,
    -(scrollPosition * movement)
  );

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

updatePaperParallax();

window.addEventListener(
  "scroll",
  requestParallaxUpdate,
  { passive: true }
);

window.addEventListener(
  "resize",
  requestParallaxUpdate,
  { passive: true }
);

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
