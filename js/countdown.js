/* ============================================================
   COUNTDOWN — reads config.event.isoDateTime and ticks live.
   Change the date in config.js; nothing here needs to change.
   ============================================================ */

(function () {
  let intervalId = null;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick(targetDate) {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    const grid = document.getElementById("countdown-grid");
    const arrived = document.getElementById("countdown-arrived");

    if (diff <= 0) {
      grid.style.display = "none";
      arrived.style.display = "block";
      clearInterval(intervalId);
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("cd-days").textContent = pad(days);
    document.getElementById("cd-hours").textContent = pad(hours);
    document.getElementById("cd-minutes").textContent = pad(minutes);
    document.getElementById("cd-seconds").textContent = pad(seconds);
  }

  function initCountdown() {
    if (!invitationConfig.countdown.enabled) {
      const section = document.getElementById("countdown");
      if (section) section.style.display = "none";
      return;
    }

    const targetDate = new Date(invitationConfig.event.isoDateTime);
    tick(targetDate);
    intervalId = setInterval(() => tick(targetDate), 1000);
  }

  window.initCountdown = initCountdown;
})();
