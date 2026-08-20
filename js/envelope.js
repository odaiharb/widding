/* ============================================================
   ENVELOPE — tap anywhere to play the invitation-card video.
   The wax seal, crest, and reveal all live inside that clip;
   once it finishes, we fade it out, unlock scrolling, and fire
   `wedding:opened` for the other modules (video.js) to react to.
   ============================================================ */

(function () {
  let hasStarted = false;
  let hasOpened = false;

  function finishOpening() {
    if (hasOpened) return;
    hasOpened = true;

    const envelope = document.getElementById("envelope");
    envelope.classList.add("flash");

    setTimeout(() => {
      envelope.classList.add("envelope-hidden");
    }, 350);

    setTimeout(() => {
      unlockScroll();
      document.dispatchEvent(new CustomEvent("wedding:opened"));
    }, 700);
  }

  function startPlayback() {
    if (hasStarted) return;
    hasStarted = true;

    const video = document.getElementById("envelope-video");
    const tapLayer = document.getElementById("envelope-tap-layer");
    tapLayer.classList.add("is-playing");

    // A safety net: if the video can't play for any reason (codec
    // issue, slow connection, etc.) don't strand the visitor on a
    // black screen — move on to the invitation after a short wait.
    const fallbackTimer = setTimeout(finishOpening, 6000);

    video.muted = false;
    const attempt = video.play();
    if (attempt && attempt.catch) {
      attempt.catch(() => {
        // Autoplay-with-sound blocked — retry muted, it's still a
        // direct response to the visitor's tap so this should work.
        video.muted = true;
        video.play().catch(() => {
          clearTimeout(fallbackTimer);
          finishOpening();
        });
      });
    }

    video.addEventListener(
      "ended",
      () => {
        clearTimeout(fallbackTimer);
        finishOpening();
      },
      { once: true }
    );
  }

  function initEnvelope() {
    const envelope = document.getElementById("envelope");
    lockScroll();

    if (prefersReducedMotion) {
      // Skip the video entirely; a single tap fades straight into
      // the invitation instead of playing extended motion.
      envelope.addEventListener("click", finishOpening, { once: true });
      envelope.addEventListener(
        "keydown",
        (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            finishOpening();
          }
        },
        { once: true }
      );
      return;
    }

    envelope.addEventListener("click", startPlayback);
    envelope.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        startPlayback();
      }
    });
  }

  window.initEnvelope = initEnvelope;
})();
