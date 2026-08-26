/* ============================================================
   ENVELOPE — tap anywhere to play the invitation-card video,
   WITH its own sound, at the same time the background song
   (js/main.js) starts. Once the video ends, we fade it out,
   unlock scrolling, and fire `wedding:opened` for the other
   modules (video.js) to react to.
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

  function startMusic() {
    if (typeof invitationConfig !== "undefined" && invitationConfig.music && invitationConfig.music.enabled) {
      const music = document.getElementById("bg-music");
      if (music) {
        music.volume = 0.55;
        music.play().catch(() => {
          /* still blocked for some reason — the global song toggle
             remains available as a manual fallback once it appears */
        });
      }
    }
  }

  function startPlayback() {
    if (hasStarted) return;
    hasStarted = true;

    const video = document.getElementById("envelope-video");
    const tapLayer = document.getElementById("envelope-tap-layer");
    tapLayer.classList.add("is-playing");

    // Start the background music right here, synchronously inside the
    // tap handler — this is the ONLY moment in the whole flow that
    // browsers reliably treat as a direct user gesture. Anything
    // fired later (even from a 350ms setTimeout) can get silently
    // blocked by autoplay-with-sound policies.
    startMusic();

    // A safety net: if the video can't play for any reason (codec
    // issue, slow connection, etc.) don't strand the visitor on a
    // black screen — move on to the invitation after a short wait.
    const fallbackTimer = setTimeout(finishOpening, 6000);

    // The opening clip plays with its OWN sound, at the same time as
    // the background song started above — both audible together,
    // exactly like a real invitation video with a soundtrack.
    video.muted = false;
    const attempt = video.play();
    if (attempt && attempt.catch) {
      attempt.catch(() => {
        // Autoplay-with-sound blocked for some reason — fall back to
        // muted rather than leaving the visitor on a stalled video.
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
      // the invitation instead of playing extended motion. Still a
      // genuine gesture, so still a valid moment to start the music.
      const openReduced = () => {
        startMusic();
        finishOpening();
      };
      envelope.addEventListener("click", openReduced, { once: true });
      envelope.addEventListener(
        "keydown",
        (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openReduced();
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
