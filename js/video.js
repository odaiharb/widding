/* ============================================================
   VIDEO — hero couple video playback. This clip is always
   silent (no audio control here at all — the background song
   has its own global toggle, see js/main.js). Plays in cinematic
   slow motion and loops forever without ever forcing the visitor
   to the next section.
   ============================================================ */

(function () {
  function initVideo() {
    const video = document.getElementById("couple-video");
    if (!video) return;

    // Cinematic slow-motion — the couple's walk plays at half speed.
    // Re-applied on a few events since some browsers reset
    // playbackRate when the source (re)loads.
    const SLOW_RATE = 0.5;
    video.muted = true; // permanently silent — never toggled anywhere
    video.playbackRate = SLOW_RATE;
    video.addEventListener("loadedmetadata", () => { video.playbackRate = SLOW_RATE; });
    video.addEventListener("play", () => { video.playbackRate = SLOW_RATE; });

    function play() {
      video.muted = true;
      video.playbackRate = SLOW_RATE;
      video.play().catch(() => {
        /* autoplay blocked — the visitor can still hit the play/pause
           button; nothing audio-related to fall back to here */
      });
    }

    // Kick off playback as soon as the envelope opens.
    document.addEventListener("wedding:opened", play);

    // Never let the loop leave a blank frame; if playback stalls,
    // quietly resume rather than surfacing an error to the visitor.
    video.addEventListener("stalled", play);
    video.addEventListener("ended", play); // safety net; loop attr already handles this
  }

  window.initVideo = initVideo;
})();
