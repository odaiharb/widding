/* ============================================================
   INTERACTIONS — shared, generic DOM behaviour used across
   the whole invitation (scroll reveals, reduced-motion flag).
   ============================================================ */

const prefersReducedMotion =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fades + slides elements with the `.reveal` class into view the
 * first time they cross into the viewport. Cheap (IntersectionObserver)
 * and respects prefers-reduced-motion by revealing instantly.
 */
function initScrollReveals() {
  const targets = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

function lockScroll() {
  document.body.classList.add("no-scroll");
}

function unlockScroll() {
  document.body.classList.remove("no-scroll");
}
