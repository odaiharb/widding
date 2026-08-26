/* ============================================================
   MUSIC — the background song. Started once, synchronously,
   from the visitor's very first tap (see js/envelope.js — that
   is the only moment browsers reliably allow audio-with-sound
   to begin). This file just wires up the single, global,
   always-visible toggle button that lets the visitor mute or
   unmute that song at any point while scrolling.
   ============================================================ */

(function () {
  function initMusic() {
    const audio = document.getElementById("bg-music");
    const toggle = document.getElementById("global-sound-toggle");
    if (!audio || !toggle) return;

    if (!invitationConfig.music || !invitationConfig.music.enabled) {
      toggle.style.display = "none";
      return;
    }

    audio.volume = 0.55;

    // Reveal the toggle only once the invitation has actually opened
    // (no point showing a song control while the opening video is
    // still playing over it).
    document.addEventListener("wedding:opened", () => {
      toggle.classList.add("is-visible");
    });

    toggle.addEventListener("click", () => {
      const nowMuted = !audio.muted;
      audio.muted = nowMuted;
      toggle.classList.toggle("is-muted", nowMuted);
      toggle.setAttribute("aria-pressed", String(!nowMuted));

      // If the visitor muted it while paused for any reason, a tap
      // to unmute should also make sure playback actually resumes.
      if (!nowMuted && audio.paused) {
        audio.play().catch(() => {});
      }
    });
  }

  window.initMusic = initMusic;
})();
