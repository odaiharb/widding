/* ============================================================
   SCRATCH — a "scratch card" reveal for the Day / Month / Year
   date cards. Values come from config.event.isoDateTime, so
   changing the date in config.js updates these automatically.
   ============================================================ */

(function () {
  function paintOverlay(canvas) {
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#d8b978");
    gradient.addColorStop(0.5, "#c9a75c");
    gradient.addColorStop(1, "#b6924f");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "600 13px serif";
    ctx.textAlign = "center";
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-Math.PI / 10);
    ctx.fillText("✦ SCRATCH ✦", 0, 0);
    ctx.restore();

    return ctx;
  }

  function setupScratchCard(card) {
    const canvas = card.querySelector(".scratch-canvas");
    const ctx = paintOverlay(canvas);
    let revealed = false;
    let isDown = false;

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const point = e.touches ? e.touches[0] : e;
      return {
        x: ((point.clientX - rect.left) / rect.width) * canvas.width,
        y: ((point.clientY - rect.top) / rect.height) * canvas.height,
      };
    }

    function scratch(e) {
      const { x, y } = getPos(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      checkRevealProgress();
    }

    function checkRevealProgress() {
      if (revealed) return;
      const { width, height } = canvas;
      const data = ctx.getImageData(0, 0, width, height).data;
      let cleared = 0;
      // Sample every 4th pixel's alpha channel for performance.
      for (let i = 3; i < data.length; i += 4 * 4) {
        if (data[i] === 0) cleared++;
      }
      const total = data.length / (4 * 4);
      if (cleared / total > 0.45) {
        revealed = true;
        canvas.classList.add("is-revealed");
      }
    }

    canvas.addEventListener("pointerdown", (e) => {
      isDown = true;
      scratch(e);
    });
    canvas.addEventListener("pointermove", (e) => {
      if (isDown) scratch(e);
    });
    window.addEventListener("pointerup", () => (isDown = false));

    // Keyboard / accessibility fallback: tap-and-hold isn't required —
    // a simple click reveals the card fully for anyone who can't scratch.
    canvas.addEventListener("dblclick", () => {
      revealed = true;
      canvas.classList.add("is-revealed");
    });
  }

  function initScratchDate() {
    const cards = document.querySelectorAll(".scratch-card");
    if (!cards.length) return;

    const date = new Date(invitationConfig.event.isoDateTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = String(date.getFullYear());
    const values = { day, month, year };

    cards.forEach((card) => {
      const valueEl = card.querySelector(".scratch-value");
      const field = valueEl.dataset.field;
      valueEl.textContent = values[field];
      setupScratchCard(card);
    });
  }

  window.initScratchDate = initScratchDate;
})();
