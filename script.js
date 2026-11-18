
/* =========================================
   MIKEY DILLON — INTERACTIONS
========================================= */

// 1. SCROLL REVEALS

const revealElements = document.querySelectorAll(
  ".project, .notes, .about, .eyebrow"
);

revealElements.forEach((element) => {
  element.classList.add("reveal-ready");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


// 2. PROJECT CARD INTERACTIONS

const projects = document.querySelectorAll(".project");

projects.forEach((project) => {
  project.addEventListener("mouseenter", () => {
    project.classList.add("is-exploring");
  });

  project.addEventListener("mouseleave", () => {
    project.classList.remove("is-exploring");
  });
});


// 3. HIDDEN EASTER EGG

const secretSequence = ["k", "e", "r", "n", "e"];
let secretInput = [];

document.addEventListener("keydown", (event) => {
  if (event.key.length !== 1) return;

  secretInput.push(event.key.toLowerCase());

  if (secretInput.length > secretSequence.length) {
    secretInput.shift();
  }

  const matches = secretSequence.every(
    (letter, index) => secretInput[index] === letter
  );

  if (matches) {
    document.body.classList.toggle("secret-mode");
    secretInput = [];
  }
});


// 4. CONSOLE MESSAGE

console.log(
  "%cYou've found the beginning of something.",
  "font-size: 14px; color: #527d78; font-family: Georgia;"
);
