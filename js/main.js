/* ============================================================
   MAIN — applies invitationConfig to the DOM, then boots every
   feature module. This is the only file that reads config.js
   and writes it into the page; every other module either reacts
   to events or manages one isolated feature.
   ============================================================ */

(function () {
  function applyConfig() {
    const { couple, event, media, content, quran } = invitationConfig;
    const monogram = couple.monogram;
    const fullNames = `${couple.groom} & ${couple.bride}`;

    // ---- Envelope ----
    // (the opening screen is now the invitation-card video itself —
    // nothing text-based to inject here)

    // ---- Preloader ----
    document.getElementById("preloader-monogram").textContent = monogram;
    document.getElementById("preloader-names").textContent = fullNames;

    // ---- Hero video ----
    const video = document.getElementById("couple-video");
    const source = video.querySelector("source");
    if (source.getAttribute("src") !== media.coupleVideo) {
      source.src = media.coupleVideo;
      video.setAttribute("poster", media.couplePoster);
      video.load();
    }

    // ---- Envelope video ----
    const envVideo = document.getElementById("envelope-video");
    const envSource = envVideo.querySelector("source");
    if (envSource.getAttribute("src") !== media.envelopeVideo) {
      envSource.src = media.envelopeVideo;
      envVideo.setAttribute("poster", media.envelopePoster);
      envVideo.load();
    }

    // ---- Quran ----
    document.getElementById("quran-verse").textContent = quran.verse;
    document.getElementById("quran-ref").textContent = quran.reference;
    document.querySelector(".bismillah").textContent = quran.bismillah;

    // ---- Hero ----
    document.getElementById("hero-names").innerHTML =
      `${couple.groom} <span class="amp">&amp;</span> ${couple.bride}`;

    // ---- Formal "invited" section ----
    document.getElementById("invited-groom").textContent = couple.groom;
    document.getElementById("invited-groom-family").innerHTML = couple.groomFamily;
    document.getElementById("invited-bride").textContent = couple.bride;
    document.getElementById("invited-bride-family").innerHTML = couple.brideFamily;
    document.getElementById("family-message").textContent = content.familyMessage;

    // ---- Names ----
    document.getElementById("names-monogram").textContent = monogram.replace("&", " & ");
    document.getElementById("names-display").innerHTML =
      `${couple.groom}<span class="amp">&amp;</span>${couple.bride}`;

    // ---- Message ----
    document.getElementById("invitation-message").textContent = content.invitationMessage;

    // ---- Nikkah details ----
    document.getElementById("nikkah-title").textContent = event.title;
    document.getElementById("nikkah-date").textContent = `${event.day}، ${event.displayDate}`;
    document.getElementById("nikkah-time").textContent = event.time;
    document.getElementById("nikkah-venue").textContent = event.venue;

    // ---- Venue ----
    document.getElementById("venue-image").src = media.venueImage;
    document.getElementById("venue-name").textContent = event.venue;
    document.getElementById("venue-address").textContent = event.address;
    document.getElementById("venue-maps").href = event.mapsUrl;
    document.getElementById("venue-directions").href = event.directionsUrl;

    // ---- Closing ----
    document.getElementById("closing-monogram").textContent = monogram.replace("&", " & ");
    document.getElementById("closing-names").textContent = fullNames;
    document.getElementById("closing-message").textContent = content.finalMessage;

    document.title = `${couple.groom} & ${couple.bride} — ${event.title}`;
  }

  function initTimeline() {
    const track = document.getElementById("timeline-track");
    const items = invitationConfig.timeline || [];
    if (!track || !items.length) {
      const section = document.getElementById("timeline");
      if (section) section.style.display = "none";
      return;
    }

    track.innerHTML = items
      .map(
        (item) => `
        <div class="timeline-item">
          <div class="timeline-time">${item.time}</div>
          <div class="timeline-label">${item.title}</div>
        </div>`
      )
      .join("");
  }

  function initPlayToggle() {
    const btn = document.getElementById("play-toggle");
    const video = document.getElementById("couple-video");
    if (!btn || !video) return;

    btn.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        btn.classList.remove("is-paused");
        btn.setAttribute("aria-pressed", "false");
        btn.setAttribute("aria-label", "Pause video");
      } else {
        video.pause();
        btn.classList.add("is-paused");
        btn.setAttribute("aria-pressed", "true");
        btn.setAttribute("aria-label", "Play video");
      }
    });
  }

  function boot() {
    applyConfig();
    initSectionDecor();
    initEnvelope();
    initVideo();
    initPlayToggle();
    initCountdown();
    initScratchDate();
    initTimeline();
    initGallery();
    initMusic();
    initScrollReveals();

    // Preloader: hide once fonts/layout have settled, capped so it
    // never blocks the visitor for long.
    const hidePreloader = () => document.getElementById("preloader").classList.add("preloader-hidden");
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => setTimeout(hidePreloader, 350));
    } else {
      setTimeout(hidePreloader, 600);
    }
    setTimeout(hidePreloader, 1400); // hard cap
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
