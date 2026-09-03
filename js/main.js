/**
 * Kelvra Marketing Website — Interactive Scripts
 * Harmonic Canvas Voice Orb · Infinite Looping Marquee · Interactive FAQ · OS Detection
 */

document.addEventListener("DOMContentLoaded", () => {
  initVoiceOrbDemo();
  initFaqAccordion();
  initCloneCopy();
  detectUserOS();
});

/* ==========================================================================
   1. PROCEDURAL HARMONIC CANVAS VOICE ORB DEMO
   ========================================================================== */

function initVoiceOrbDemo() {
  const canvas = document.getElementById("marketingVoiceOrbCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const size = 120;

  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);

  let state = "listening"; // idle | listening | processing | dispatched
  let phase = 0;
  let amplitude = 0.65;
  const cx = size / 2;
  const cy = size / 2;

  const statusText = document.getElementById("demoOrbStatus");
  const transcriptText = document.getElementById("demoOrbTranscript");

  const phrases = [
    { s: "listening", status: "LISTENING", t: "create a workspace named nova-app and 6 sections of Claude Code" },
    { s: "processing", status: "DECOMPOSING", t: "Splitting task into 6 disjoint worktrees & verifying boundary locks..." },
    { s: "dispatched", status: "DISPATCHED", t: "✔ Swarm launched: 6 Claude Code agents executing concurrently in isolation" },
    { s: "listening", status: "LISTENING", t: "there's an error in session frontend, fix it" },
  ];
  let phraseIdx = 0;

  // Auto cycle states for showcase
  setInterval(() => {
    phraseIdx = (phraseIdx + 1) % phrases.length;
    const p = phrases[phraseIdx];
    state = p.s;
    if (statusText) statusText.innerText = p.status;
    if (transcriptText) transcriptText.innerText = p.t;
  }, 4200);

  // Click to cycle immediately
  canvas.addEventListener("click", () => {
    phraseIdx = (phraseIdx + 1) % phrases.length;
    const p = phrases[phraseIdx];
    state = p.s;
    if (statusText) statusText.innerText = p.status;
    if (transcriptText) transcriptText.innerText = p.t;
  });

  function render() {
    ctx.clearRect(0, 0, size, size);
    phase += 0.04;

    // Modulate amplitude naturally
    amplitude = 0.4 + Math.sin(phase * 1.5) * 0.25;

    // Ambient radial glow
    const glowColor = state === "dispatched" ? "rgba(82, 183, 136, 0.45)" : "rgba(217, 119, 87, 0.45)";
    const glowGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 54);
    glowGrad.addColorStop(0, glowColor);
    glowGrad.addColorStop(1, "rgba(20, 20, 18, 0)");
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 54, 0, Math.PI * 2);
    ctx.fill();

    if (state === "listening") {
      // Harmonic Sine Wave Layers
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        const points = 36;
        for (let i = 0; i <= points; i++) {
          const theta = (i / points) * Math.PI * 2;
          const wave = Math.sin(theta * 4 + phase * (2 + layer) + layer) * (amplitude * 12 + 2);
          const r = 32 + wave - layer * 4;
          const x = cx + Math.cos(theta) * r;
          const y = cy + Math.sin(theta) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = layer === 0 ? "#F0906F" : `rgba(217, 119, 87, ${0.7 - layer * 0.25})`;
        ctx.lineWidth = 2 - layer * 0.4;
        ctx.stroke();
      }

      // Radiant Core
      ctx.beginPath();
      ctx.arc(cx, cy, 18 + amplitude * 4, 0, Math.PI * 2);
      ctx.fillStyle = "#F0906F";
      ctx.fill();

    } else if (state === "processing") {
      // Spinning Orbital Rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(phase * 3);
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 1.5);
      ctx.strokeStyle = "#F0906F";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-phase * 2.2);
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 1.2);
      ctx.strokeStyle = "rgba(217, 119, 87, 0.5)";
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();

      // Pulsing Center
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

    } else if (state === "dispatched") {
      // Emerald Success Burst
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fillStyle = "#52B788";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx - 8, cy);
      ctx.lineTo(cx - 2, cy + 6);
      ctx.lineTo(cx + 9, cy - 5);
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

    } else {
      // Idle Core
      const r = 24 + Math.sin(phase) * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = "#D97757";
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. FAQ ACCORDION DISCLOSURE
   ========================================================================== */

function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    trigger?.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // Close peers for clean single-expansion feel
      faqItems.forEach((other) => other.classList.remove("open"));
      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });
}

/* ==========================================================================
   3. ONE-CLICK TERMINAL CLONE COPY
   ========================================================================== */

function initCloneCopy() {
  const copyBtn = document.getElementById("btnCopyClone");
  const cloneText = document.getElementById("cloneText");

  copyBtn?.addEventListener("click", async () => {
    if (!cloneText) return;
    try {
      await navigator.clipboard.writeText(cloneText.innerText.trim());
      copyBtn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#52B788" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span style="color: #52B788;">Copied!</span>
      `;
      setTimeout(() => {
        copyBtn.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          <span>Copy</span>
        `;
      }, 2000);
    } catch (e) {
      console.warn("Clipboard copy error:", e);
    }
  });
}

/* ==========================================================================
   4. OS DETECTION FOR DOWNLOAD BUTTONS
   ========================================================================== */

function detectUserOS() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  let os = "windows";

  if (userAgent.indexOf("mac") !== -1) os = "mac";
  else if (userAgent.indexOf("linux") !== -1) os = "linux";

  const primaryBtn = document.getElementById("btnHeroDownload");
  if (primaryBtn) {
    if (os === "mac") {
      primaryBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm1 5h-2v6h6v-2h-4V7z"/></svg>
        <span>Download for macOS</span>
      `;
    } else if (os === "linux") {
      primaryBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
        <span>Download for Linux</span>
      `;
    } else {
      primaryBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/></svg>
        <span>Download for Windows (x64)</span>
      `;
    }
  }
}
