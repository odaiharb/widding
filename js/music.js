/* ============================================================
   MUSIC — optional ambient background track. Never autoplays
   before a user gesture. Shares the hero video's sound toggle
   so the invitation only has one, minimal audio control.
   ============================================================ */

(function () {
  function initMusic() {
    const audio = document.getElementById("bg-music");
    if (!audio || !invitationConfig.music.enabled) return;

    audio.volume = 0.55;

    document.addEventListener("wedding:sound-toggled", (e) => {
      if (e.detail.on) {
        audio.play().catch(() => {
          /* ignore — browser may still block until a direct gesture */
        });
      } else {
        audio.pause();
      }
    });
  }

  window.initMusic = initMusic;
})();
