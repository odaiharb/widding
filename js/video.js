/* ============================================================
   VIDEO — hero couple video playback + minimal sound control.
   Starts muted (mobile autoplay rules), unmutes on the same
   user gesture that already opened the envelope, and loops
   forever without ever forcing the visitor to the next section.
   ============================================================ */

(function () {
  function initVideo() {
    const video = document.getElementById("couple-video");
    const soundToggle = document.getElementById("sound-toggle");
    if (!video || !soundToggle) return;

    // Cinematic slow-motion — the couple's walk plays at half speed.
    // Re-applied on a few events since some browsers reset
    // playbackRate when the source (re)loads.
    const SLOW_RATE = 0.5;
    video.playbackRate = SLOW_RATE;
    video.addEventListener("loadedmetadata", () => { video.playbackRate = SLOW_RATE; });
    video.addEventListener("play", () => { video.playbackRate = SLOW_RATE; });

    let userWantsSound = false;

    function play() {
      video.playbackRate = SLOW_RATE;
      const attempt = video.play();
      if (attempt && attempt.catch) {
        attempt.catch(() => {
          // Autoplay was blocked — keep muted and let the visitor
          // opt in via the sound toggle instead of erroring out.
          video.muted = true;
        });
      }
    }

    // Kick off playback as soon as the envelope opens (this reuses
    // the tap gesture the visitor already made, satisfying mobile
    // autoplay-with-sound restrictions for the *next* toggle tap).
    document.addEventListener("wedding:opened", play);

    soundToggle.addEventListener("click", () => {
      userWantsSound = !userWantsSound;
      video.muted = !userWantsSound;
      if (userWantsSound) play();
      soundToggle.classList.toggle("is-muted", !userWantsSound);
      soundToggle.setAttribute("aria-pressed", String(userWantsSound));

      document.dispatchEvent(
        new CustomEvent("wedding:sound-toggled", { detail: { on: userWantsSound } })
      );
    });

    // Never let the loop leave a blank frame; if playback stalls,
    // quietly resume rather than surfacing an error to the visitor.
    video.addEventListener("stalled", play);
    video.addEventListener("ended", play); // safety net; loop attr already handles this
  }

  window.initVideo = initVideo;
})();
