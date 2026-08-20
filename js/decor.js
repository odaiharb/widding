/* ============================================================
   DECOR — adds one consistent, restrained decoration set to every
   section using the couple's own artwork: two hanging lanterns at
   the top corners, a blue flower spray in each of the two bottom
   corners (rotated 180°, nothing at the top corners so the lanterns
   stay uncluttered), and a soft, transparent bouquet at the very
   bottom. Injected once from here so every section stays visually
   identical and the markup never has to be hand-duplicated (that
   duplication is exactly what caused the earlier clutter).
   ============================================================ */

(function () {
  const DECOR_HTML = `
    <img class="decor-lantern decor-lantern--left" src="assets/images/decor/lantern.webp" alt="" aria-hidden="true">
    <img class="decor-lantern decor-lantern--right" src="assets/images/decor/lantern.webp" alt="" aria-hidden="true">
    <img class="decor-corner decor-corner--bl" src="assets/images/decor/blue-flowers.webp" alt="" aria-hidden="true">
    <img class="decor-corner decor-corner--br" src="assets/images/decor/blue-flowers.webp" alt="" aria-hidden="true">
    <img class="decor-bouquet" src="assets/images/decor/vintage-bouquet.webp" alt="" aria-hidden="true">
  `;

  // Dark burgundy sections just need a touch more brightness so the
  // artwork stays legible; see .section-decor--dark in invitation.css.
  const DARK_SECTIONS = new Set(["countdown", "closing"]);

  function initSectionDecor() {
    const sections = document.querySelectorAll("main#invitation > .section");

    sections.forEach((section) => {
      const wrap = document.createElement("div");
      wrap.className = "section-decor";
      if (DARK_SECTIONS.has(section.id)) {
        wrap.classList.add("section-decor--dark");
      }
      wrap.innerHTML = DECOR_HTML;
      section.insertBefore(wrap, section.firstChild);
    });
  }

  window.initSectionDecor = initSectionDecor;
})();
