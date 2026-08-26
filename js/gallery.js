/* ============================================================
   GALLERY — renders config.gallery into a responsive grid and
   powers a minimal swipe/keyboard-friendly lightbox.
   Add or remove photos by editing the array in config.js only.
   ============================================================ */

(function () {
  let images = [];
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    img.src = images[currentIndex];
    img.alt = `Wedding gallery photo ${currentIndex + 1} of ${images.length}`;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  function showRelative(offset) {
    currentIndex = (currentIndex + offset + images.length) % images.length;
    document.getElementById("lightbox-img").src = images[currentIndex];
  }

  function initGallery() {
    images = invitationConfig.gallery || [];
    const grid = document.getElementById("gallery-grid");
    if (!grid) return;

    if (images.length === 0) {
      document.getElementById("gallery").style.display = "none";
      return;
    }

    grid.innerHTML = images
      .map(
        (src, i) => `
        <div class="gallery-item reveal is-visible" data-index="${i}" role="button" tabindex="0" aria-label="Open photo ${i + 1}">
          <img src="${src}" alt="Wedding gallery photo ${i + 1}" loading="lazy"
               onerror="this.closest('.gallery-item').style.display='none'">
        </div>`
      )
      .join("");

    grid.querySelectorAll(".gallery-item").forEach((item) => {
      const open = () => openLightbox(Number(item.dataset.index));
      item.addEventListener("click", open);
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });

    document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
    document.getElementById("lightbox-prev").addEventListener("click", () => showRelative(-1));
    document.getElementById("lightbox-next").addEventListener("click", () => showRelative(1));
    document.getElementById("lightbox").addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      const lightbox = document.getElementById("lightbox");
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showRelative(-1);
      if (e.key === "ArrowRight") showRelative(1);
    });

    // Basic touch swipe support
    let touchStartX = 0;
    const lightbox = document.getElementById("lightbox");
    lightbox.addEventListener("touchstart", (e) => (touchStartX = e.changedTouches[0].clientX), { passive: true });
    lightbox.addEventListener(
      "touchend",
      (e) => {
        const delta = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) > 40) showRelative(delta > 0 ? -1 : 1);
      },
      { passive: true }
    );
  }

  window.initGallery = initGallery;
})();
