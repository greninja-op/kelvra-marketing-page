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

/* ==========================================================================
   5. SCROLLYTELLING ENGINE (§6 & §7)
   Shared sticky step-index controller for Mobile ↔ Laptop Remote & Voice Demos
   ========================================================================== */

function initScrollytelling() {
  const scrollySections = document.querySelectorAll(".scrolly-section");
  if (!scrollySections.length) return;

  scrollySections.forEach((section) => {
    const isMobileDemo = section.id === "mobile-remote-demo";
    const totalSteps = isMobileDemo ? 6 : 5;
    const pills = section.querySelectorAll(".scrolly-step-pill");
    const callout = section.querySelector(".scrolly-callout");
    const calloutStep = section.querySelector(".callout-step");
    const calloutTitle = section.querySelector(".callout-title");
    const calloutDesc = section.querySelector(".callout-desc");
    const connectorPath = section.querySelector(".connector-path");

    // Copy specifications for §6 Mobile Remote Demo
    const mobileStepData = {
      1: {
        pill: "1. Phone Home",
        step: "STEP 1 OF 6 · HOME SCREEN",
        title: "Native Android & iOS Companion",
        desc: "Kelvra Mobile docks into your local network via zero-config mDNS or authenticated WebSocket tunnel. The authentic Kelvra mark sits ready on your device.",
        target: ".home-app-icon"
      },
      2: {
        pill: "2. Tap Kelvra",
        step: "STEP 2 OF 6 · INSTANT LAUNCH",
        title: "Hardware Tap & Secure Handshake",
        desc: "Tapping the Kelvra application instantly exchanges ed25519 pairing credentials with the local daemon running on your primary workstation.",
        target: ".home-app-icon"
      },
      3: {
        pill: "3. Mobile Shell",
        step: "STEP 3 OF 6 · REALTIME APP SHELL",
        title: "Compact 5-Tab Command Surface",
        desc: "The app opens directly to your active swarm context. Seamlessly switch between Companion stage, Agent Swarm, Terminal Grid, Worktree Diff, and System Settings.",
        target: ".phone-bottom-nav"
      },
      4: {
        pill: "4. Companion Stage",
        step: "STEP 4 OF 6 · ANGEL BOT MASCOT",
        title: "Pixel-Art Agent Mascot Engine",
        desc: "Realtime rendering of the 32x32 angel bot mascot mirroring the active state of your swarm (idle, thinking, reviewing, or error alerts) right on your handheld device.",
        target: ".mobile-mascot-box"
      },
      5: {
        pill: "5. Live Telemetry",
        step: "STEP 5 OF 6 · HARDWARE SENSORS",
        title: "Live CPU, VRAM & GPU Metrics",
        desc: "Direct metrics stream monitoring your workstation's hardware utilization, 6 concurrent worktrees, and token throughput without alt-tabbing away from your work.",
        target: ".mobile-telemetry-card"
      },
      6: {
        pill: "6. Diff Review",
        step: "STEP 6 OF 6 · HUMAN-IN-THE-LOOP",
        title: "One-Tap Pull Request Diff Approval",
        desc: "Inspect live color-coded additions and deletions produced by background agents. Approve, reject, or request revisions with a single thumb tap.",
        target: ".mobile-diff-viewer"
      }
    };

    // Copy specifications for §7 Voice Agent Demo
    const voiceStepData = {
      1: {
        pill: "1. Open Agent",
        step: "STEP 1 OF 5 · AGENT DRAWER",
        title: "Realtime Voice Directive Drawer",
        desc: "Swipe up or tap to reveal the modal voice command interface. The floating canvas orb mirrors the workstation's harmonic audio visualizer.",
        target: ".voice-drawer-header"
      },
      2: {
        pill: "2. Select Space",
        step: "STEP 2 OF 5 · CONTEXT SELECTION",
        title: "Targeted Worktree Routing",
        desc: "Select the exact workspace or task branch to target. Directives are automatically bound to disjoint branch environments without touching master.",
        target: ".voice-target-selector"
      },
      3: {
        pill: "3. Push-to-Talk",
        step: "STEP 3 OF 5 · DICTATION STREAM",
        title: "Push-to-Hold Speech Capture",
        desc: "Hold the terracotta microphone to capture your directive. Audio streams through local Whisper models with zero latency and zero cloud telemetry.",
        target: ".voice-mic-hero"
      },
      4: {
        pill: "4. Send Directive",
        step: "STEP 4 OF 5 · WEBSOCKET DISPATCH",
        title: "Signed RPC Dispatch",
        desc: "Tapping Dispatch pushes the parsed directive directly to the laptop's Kelvra Bench orchestrator over an end-to-end encrypted connection.",
        target: ".voice-action-btn.primary"
      },
      5: {
        pill: "5. Swarm Compiles",
        step: "STEP 5 OF 5 · LAPTOP EXECUTION",
        title: "Parallel Agent Execution & Live Diff",
        desc: "The laptop receives the directive, isolates files into worktree branches, spins up 3 parallel agents, and renders unified PR diffs instantly.",
        target: ".mockup-laptop-frame"
      }
    };

    const stepDictionary = isMobileDemo ? mobileStepData : voiceStepData;

    // Track current step to prevent redundant DOM updates
    let currentActiveStep = 1;

    // Handle scroll calculation
    function onScroll() {
      const rect = section.getBoundingClientRect();
      const scrollHeight = section.offsetHeight - window.innerHeight;

      if (scrollHeight <= 0) return;

      // Calculate progress 0..1 through the section
      const progress = Math.min(Math.max(-rect.top / scrollHeight, 0), 1);

      // Determine step 1..totalSteps
      let step = Math.floor(progress * totalSteps) + 1;
      if (step > totalSteps) step = totalSteps;

      if (step !== currentActiveStep) {
        currentActiveStep = step;
        updateStepUI(step);
      }

      // Smooth connector line update
      updateConnectorLine(step);
    }

    function updateStepUI(step) {
      section.setAttribute("data-step", step);

      // Update pills
      pills.forEach((pill) => {
        const pillStep = parseInt(pill.getAttribute("data-step-target"), 10);
        if (pillStep === step) {
          pill.classList.add("active");
        } else {
          pill.classList.remove("active");
        }
      });

      // Update callout box
      const data = stepDictionary[step];
      if (data && callout) {
        if (calloutStep) calloutStep.textContent = data.step;
        if (calloutTitle) calloutTitle.textContent = data.title;
        if (calloutDesc) calloutDesc.textContent = data.desc;
      }

      // Voice demo dynamic text simulation
      if (!isMobileDemo) {
        const liveTranscript = section.querySelector("#voiceLiveTranscript");
        const laptopPrompt = section.querySelector("#voiceLaptopPrompt");
        if (step >= 3 && liveTranscript) {
          liveTranscript.textContent = "“Refactor authentication store to use ed25519 cryptographic tokens with test coverage”";
          liveTranscript.style.color = "#F5F1EA";
        } else if (liveTranscript) {
          liveTranscript.textContent = "Hold microphone and speak directive...";
          liveTranscript.style.color = "#8A8780";
        }

        if (step >= 4 && laptopPrompt) {
          laptopPrompt.textContent = "“Refactor authentication store to use ed25519 tokens with test coverage”";
        }
      }
    }

    function updateConnectorLine(step) {
      if (!connectorPath) return;

      const data = stepDictionary[step];
      if (!data || !data.target) {
        connectorPath.setAttribute("d", "");
        return;
      }

      const targetEl = section.querySelector(data.target);
      const calloutEl = section.querySelector(".scrolly-callout");
      const svgEl = section.querySelector(".scrolly-connector-svg");

      if (!targetEl || !calloutEl || !svgEl) {
        connectorPath.setAttribute("d", "");
        return;
      }

      const svgRect = svgEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const calloutRect = calloutEl.getBoundingClientRect();

      // Start at callout left center or bottom
      const startX = calloutRect.left - svgRect.left;
      const startY = calloutRect.top + calloutRect.height / 2 - svgRect.top;

      // End at target right center or top center
      let endX, endY;
      if (targetRect.left > calloutRect.right) {
        // Callout is to the left of target
        endX = targetRect.left - svgRect.left;
        endY = targetRect.top + targetRect.height / 2 - svgRect.top;
      } else {
        // Callout is below or to the right
        endX = targetRect.right - svgRect.left;
        endY = targetRect.top + targetRect.height / 2 - svgRect.top;
      }

      // Draw bezier curve connector
      const cp1X = startX + (endX - startX) * 0.5;
      const cp1Y = startY;
      const cp2X = startX + (endX - startX) * 0.5;
      const cp2Y = endY;

      connectorPath.setAttribute("d", `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`);
    }

    // Click pill to jump directly to step
    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const targetStep = parseInt(pill.getAttribute("data-step-target"), 10);
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const scrollHeight = section.offsetHeight - window.innerHeight;
        const targetScroll = sectionTop + ((targetStep - 0.5) / totalSteps) * scrollHeight;

        window.scrollTo({
          top: targetScroll,
          behavior: "smooth"
        });
      });
    });

    // Window scroll & resize listeners
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      onScroll();
      updateConnectorLine(currentActiveStep);
    }, { passive: true });

    // Initial setup
    updateStepUI(1);
    setTimeout(() => {
      updateConnectorLine(1);
    }, 200);
  });
}

// Wire Scrollytelling on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initScrollytelling();
});
