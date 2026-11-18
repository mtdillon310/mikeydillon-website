
/* -----------------------------------------
   M I K E Y  D I L L O N
   INTERACTIONS — VERSION 2.1
------------------------------------------ */

// Reveal elements as they enter the viewport.
// Content remains visible if JavaScript is unavailable.

const revealTargets = document.querySelectorAll(
  ".piece, .edition-mark"
);

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
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

// A small pointer response on larger screens.
// Disabled on touch devices.

const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

if (canHover.matches) {
  document.querySelectorAll(".project-piece").forEach((piece) => {
    piece.addEventListener("pointermove", (event) => {
      const bounds = piece.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      piece.style.setProperty("--pointer-x", `${x * 5}px`);
      piece.style.setProperty("--pointer-y", `${y * 5}px`);
    });

    piece.addEventListener("pointerleave", () => {
      piece.style.removeProperty("--pointer-x");
      piece.style.removeProperty("--pointer-y");
    });
  });
}

// Hidden color mode.
// Type K E R N E anywhere on the page.

let secretSequence = "";
const secretWord = "KERNE";

document.addEventListener("keydown", (event) => {
  if (event.key.length !== 1) return;

  secretSequence += event.key.toUpperCase();
  secretSequence = secretSequence.slice(-secretWord.length);

  if (secretSequence === secretWord) {
    document.body.classList.toggle("secret-mode");
    secretSequence = "";
  }
});

// A tiny console message for the curious.

console.log(
  "%cYou've found the back room.",
  "font-family: Georgia; font-size: 18px; color: #286c68;"
);
console.log(
  "Some things are better left unexplained. ⟡"
);
