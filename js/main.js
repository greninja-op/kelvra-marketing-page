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
      faqItems.forEach((other) => {
        other.classList.remove("open");
        const otherTrigger = other.querySelector(".faq-trigger");
        if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
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
   5. INDEPENDENT MOBILE SHOWCASE ENGINE (§6)
   Smooth auto-playing video-like interactive simulation for Kelvra Mobile
   ========================================================================== */

function initMobileShowcaseAutoplay() {
  const showcaseSection = document.getElementById("mobile-showcase");
  if (!showcaseSection) return;

  const scenarios = ["companion", "telemetry", "terminal", "review", "voice"];
  const layerMap = {
    companion: document.getElementById("layerCompanion"),
    telemetry: document.getElementById("layerTelemetry"),
    terminal: document.getElementById("layerTerminal"),
    review: document.getElementById("layerReview"),
    voice: document.getElementById("layerVoice")
  };

  const scenarioBtns = showcaseSection.querySelectorAll(".mobile-scenario-btn");
  const navTabs = showcaseSection.querySelectorAll(".m-nav-item");
  const phoneFrame = showcaseSection.querySelector(".iphone-hardware-frame");
  const terminalLogs = document.getElementById("mTermLiveLogs");

  let currentIndex = 0;
  let autoplayInterval = null;
  let isPaused = false;

  const terminalSequence = [
    { text: "$ git worktree add .worktrees/fe-mobile", cls: "term-code", prefix: "$ " },
    { text: "• Synchronizing branch state over mesh...", cls: "text-muted" },
    { text: "✔ Worktree locked at .worktrees/fe-mobile", cls: "text-emerald" },
    { text: "$ npm run dev -- --host", cls: "term-code", prefix: "$ " },
    { text: "• Compiling Vite 5.4 application bundle...", cls: "text-muted" },
    { text: "✔ Ready in 138ms: http://localhost:5173/", cls: "text-emerald" },
    { text: "• Interactive PTY attached (PID: 8192)", cls: "text-coral", style: "color:#D97757;" }
  ];

  function runTerminalSimulation() {
    if (!terminalLogs) return;
    terminalLogs.innerHTML = "";
    terminalSequence.forEach((line, idx) => {
      setTimeout(() => {
        const row = document.createElement("div");
        row.className = "term-row";
        if (line.style) row.setAttribute("style", line.style);

        if (line.prefix) {
          const promptSpan = document.createElement("span");
          promptSpan.className = "term-prompt";
          promptSpan.textContent = line.prefix;
          row.appendChild(promptSpan);
        }

        const textSpan = document.createElement("span");
        textSpan.className = line.cls;
        textSpan.textContent = line.text.replace(line.prefix || "", "");
        row.appendChild(textSpan);

        terminalLogs.appendChild(row);
      }, idx * 280);
    });
  }

  function switchScenario(scenarioKey, isManual = false) {
    const targetIdx = scenarios.indexOf(scenarioKey);
    if (targetIdx !== -1) {
      currentIndex = targetIdx;
    }

    // Update scenario control buttons
    scenarioBtns.forEach((btn) => {
      if (btn.getAttribute("data-scenario") === scenarioKey) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update bottom nav tabs
    navTabs.forEach((tab) => {
      if (tab.getAttribute("data-tab-name") === scenarioKey) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    // Update viewport layers
    Object.keys(layerMap).forEach((key) => {
      const layer = layerMap[key];
      if (layer) {
        if (key === scenarioKey) {
          layer.classList.add("active");
        } else {
          layer.classList.remove("active");
        }
      }
    });

    // Layer-specific micro-animations
    if (scenarioKey === "terminal") {
      runTerminalSimulation();
    }

    // If triggered manually by user, pause autoplay briefly then resume
    if (isManual) {
      clearInterval(autoplayInterval);
      setTimeout(startAutoplay, 6000);
    }
  }

  function startAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      if (!isPaused) {
        currentIndex = (currentIndex + 1) % scenarios.length;
        switchScenario(scenarios[currentIndex], false);
      }
    }, 3800);
  }

  // Hook button clicks
  scenarioBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const scenario = btn.getAttribute("data-scenario");
      if (scenario) switchScenario(scenario, true);
    });
  });

  navTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.getAttribute("data-tab-name");
      if (tabName) switchScenario(tabName, true);
    });
  });

  // Pause on hover
  if (phoneFrame) {
    phoneFrame.addEventListener("mouseenter", () => { isPaused = true; });
    phoneFrame.addEventListener("mouseleave", () => { isPaused = false; });
  }

  // Interactive Diff Review Buttons
  const btnApprove = document.getElementById("btnDiffApprove");
  const btnReject = document.getElementById("btnDiffReject");

  if (btnApprove) {
    btnApprove.addEventListener("click", () => {
      btnApprove.textContent = "✔ Merged to main";
      btnApprove.style.background = "#52B788";
      btnApprove.style.color = "#0B0B09";
      setTimeout(() => {
        btnApprove.textContent = "✔ Approve & Merge";
        btnApprove.style.background = "";
        btnApprove.style.color = "";
      }, 2500);
    });
  }

  if (btnReject) {
    btnReject.addEventListener("click", () => {
      btnReject.textContent = "Revision Requested";
      btnReject.style.color = "#F87171";
      btnReject.style.borderColor = "#F87171";
      setTimeout(() => {
        btnReject.textContent = "Reject";
        btnReject.style.color = "";
        btnReject.style.borderColor = "";
      }, 2500);
    });
  }

  // Initial activate & start timer
  switchScenario(scenarios[0], false);
  startAutoplay();
}

/* ==========================================================================
   5. HERO WINDOW TRI-MODAL SWITCHER (CHAT / CODE / AGENT)
   Directional Spatial Transitions with Physics Matching Kelvra Bench
   ========================================================================== */

function initHeroModeSwitcher() {
  const switchContainer = document.getElementById("mockupModeSwitch");
  const viewport = document.getElementById("mockupViewport");
  if (!switchContainer || !viewport) return;

  const tabs = switchContainer.querySelectorAll(".mockup-mode-tab");
  const panes = {
    chat: document.getElementById("mockupViewChat"),
    code: document.getElementById("mockupViewCode"),
    agent: document.getElementById("mockupViewAgent"),
  };

  const modeIndices = { chat: 0, code: 1, agent: 2 };
  let currentMode = "code";
  let isTransitioning = false;
  let transitionTimer = null;

  function switchMode(targetMode) {
    if (targetMode === currentMode || isTransitioning) return;
    const oldMode = currentMode;
    const oldPane = panes[oldMode];
    const newPane = panes[targetMode];
    if (!newPane) return;

    isTransitioning = true;
    currentMode = targetMode;

    // Update active tab buttons
    tabs.forEach((tab) => {
      const isTarget = tab.dataset.mode === targetMode;
      tab.classList.toggle("active", isTarget);
      tab.setAttribute("aria-selected", isTarget ? "true" : "false");
    });

    // Spatial directional physics: Right tab -> view enters from right; Left tab -> view enters from left
    const isFromRight = (modeIndices[targetMode] ?? 0) >= (modeIndices[oldMode] ?? 0);
    const inClass = isFromRight ? "mode-transition-in-right" : "mode-transition-in-left";
    const outClass = isFromRight ? "mode-transition-out-left" : "mode-transition-out-right";

    if (transitionTimer) {
      clearTimeout(transitionTimer);
      transitionTimer = null;
    }

    // Clean up any remaining classes from all panes
    Object.values(panes).forEach((pane) => {
      if (!pane) return;
      pane.classList.remove(
        "mode-transition-in-right",
        "mode-transition-in-left",
        "mode-transition-out-left",
        "mode-transition-out-right"
      );
    });

    // Start directional transition
    if (oldPane) {
      oldPane.classList.add(outClass);
    }
    newPane.classList.add("active", inClass);

    transitionTimer = setTimeout(() => {
      if (oldPane && oldPane !== newPane) {
        oldPane.classList.remove("active", outClass);
      }
      newPane.classList.remove(inClass);
      isTransitioning = false;
      transitionTimer = null;
    }, 290);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const mode = tab.dataset.mode;
      if (mode) switchMode(mode);
    });
  });

  // Micro-interactions: Chat Diff Review Drawer Buttons
  const chatApproveBtn = document.querySelector(".btn-drawer-approve");
  const chatRejectBtn = document.querySelector(".btn-drawer-reject");

  if (chatApproveBtn) {
    chatApproveBtn.addEventListener("click", () => {
      const orig = chatApproveBtn.innerHTML;
      chatApproveBtn.innerHTML = "✔ Approved &amp; Merged";
      chatApproveBtn.style.background = "#52B788";
      chatApproveBtn.style.color = "#0B0B09";
      setTimeout(() => {
        chatApproveBtn.innerHTML = orig;
        chatApproveBtn.style.background = "";
        chatApproveBtn.style.color = "";
      }, 2400);
    });
  }

  if (chatRejectBtn) {
    chatRejectBtn.addEventListener("click", () => {
      const orig = chatRejectBtn.innerHTML;
      chatRejectBtn.innerHTML = "Changes Requested";
      chatRejectBtn.style.color = "#F87171";
      chatRejectBtn.style.borderColor = "#F87171";
      setTimeout(() => {
        chatRejectBtn.innerHTML = orig;
        chatRejectBtn.style.color = "";
        chatRejectBtn.style.borderColor = "";
      }, 2400);
    });
  }

  // Micro-interactions: Chat History selection
  const chatItems = document.querySelectorAll(".chat-history-mockup-item");
  chatItems.forEach((item) => {
    item.addEventListener("click", () => {
      chatItems.forEach((ci) => ci.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // Micro-interactions: Agent Roster selection
  const agentRows = document.querySelectorAll(".agent-roster-row");
  agentRows.forEach((row) => {
    row.addEventListener("click", () => {
      agentRows.forEach((ar) => ar.classList.remove("active"));
      row.classList.add("active");
    });
  });
}

/* ==========================================================================
   AUTHENTIC KELVRA BENCH LIVE AUTOMATION
   Pure desktop simulation: Pre-flight Launcher -> 3x2 Magnetic Grid
   Simultaneous execution across 6 terminals without video bars or scrubbers
   ========================================================================== */

function initBenchLiveAutomation() {
  const container = document.getElementById("benchShowcaseContainer");
  if (!container) return;

  const launcherPanel = document.getElementById("benchLauncherPanel");
  const gridPanel = document.getElementById("benchGridPanel");
  const pointer = document.getElementById("benchDemoPointer");
  const countPill6 = document.getElementById("benchDemoCount6");
  const launchBtn = document.getElementById("benchDemoLaunchBtn");
  const tuiTyped = document.getElementById("benchTuiTypedText");
  const promptGuardBadge = document.getElementById("benchPromptGuardBadge");
  const promptGuardText = document.getElementById("benchPromptGuardText");
  const stream1 = document.getElementById("benchStream1");
  const pane1 = document.getElementById("benchPane1");
  const panes = [
    pane1,
    document.getElementById("benchPane2"),
    document.getElementById("benchPane3"),
    document.getElementById("benchPane4"),
    document.getElementById("benchPane5"),
    document.getElementById("benchPane6")
  ].filter(Boolean);

  let currentTimer = null;
  let typingInterval = null;
  let isRunning = true;

  const directivePrompt = "Refactor auth store to ed25519 tokens & fix session race condition";

  function clearAllTimers() {
    if (currentTimer) clearTimeout(currentTimer);
    if (typingInterval) clearInterval(typingInterval);
    currentTimer = null;
    typingInterval = null;
  }

  function startCycle() {
    clearAllTimers();

    // 1. Show Launcher Panel, hide Terminal Grid
    if (launcherPanel) launcherPanel.classList.add("active");
    if (gridPanel) gridPanel.classList.remove("active");

    // Reset Launcher states
    if (pointer) {
      pointer.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
      pointer.style.transform = "translate(0, 0)";
      pointer.style.opacity = "1";
    }
    if (tuiTyped) tuiTyped.textContent = "";
    if (promptGuardBadge) promptGuardBadge.style.display = "none";
    if (stream1) stream1.style.opacity = "0.2";

    // 2. Animate Pointer towards Count 6 and Launch button
    currentTimer = setTimeout(() => {
      if (!isRunning) return;
      // Move pointer toward session count 6
      if (pointer && countPill6) {
        pointer.style.transform = "translate(-280px, -60px) scale(0.96)";
      }

      currentTimer = setTimeout(() => {
        if (!isRunning) return;
        if (countPill6) {
          countPill6.classList.add("active");
        }
        // Move pointer to Launch Button
        if (pointer) {
          pointer.style.transform = "translate(-12px, -8px) scale(0.92)";
        }

        currentTimer = setTimeout(() => {
          if (!isRunning) return;
          // Click button
          if (launchBtn) {
            launchBtn.style.transform = "scale(0.95)";
            setTimeout(() => {
              if (launchBtn) launchBtn.style.transform = "";
            }, 180);
          }

          // 3. Transition to 3x2 Terminal Grid
          currentTimer = setTimeout(() => {
            if (!isRunning) return;
            if (pointer) pointer.style.opacity = "0";
            if (launcherPanel) launcherPanel.classList.remove("active");
            if (gridPanel) gridPanel.classList.add("active");

            // Focus AntiGravity pane & start typing directive
            if (pane1) pane1.classList.add("focused");
            runDirectiveAndSimultaneousSwarm();
          }, 600);
        }, 1100);
      }, 1000);
    }, 1200);
  }

  function runDirectiveAndSimultaneousSwarm() {
    if (!tuiTyped) return;
    tuiTyped.textContent = "";
    let charIdx = 0;

    // Type prompt character by character
    typingInterval = setInterval(() => {
      if (!isRunning) {
        clearInterval(typingInterval);
        return;
      }
      if (charIdx < directivePrompt.length) {
        tuiTyped.textContent += directivePrompt[charIdx];
        charIdx++;
      } else {
        clearInterval(typingInterval);
        typingInterval = null;

        // PromptGuard scan badge appears
        if (promptGuardBadge) {
          promptGuardBadge.style.display = "inline-flex";
          if (promptGuardText) {
            promptGuardText.textContent = "PromptGuard: Scanning AST... [Verifying tokens]";
          }
        }

        currentTimer = setTimeout(() => {
          if (!isRunning) return;
          if (promptGuardText) {
            promptGuardText.textContent = "✔ 100% Clean · 0 Injections · AST Validated";
          }
          if (stream1) {
            stream1.style.transition = "opacity 0.4s ease";
            stream1.style.opacity = "1";
          }

          // 4. Simultaneous Swarm Activity across all 6 terminals
          panes.forEach((p) => {
            p.style.transition = "border-color 0.4s ease, box-shadow 0.4s ease";
            p.style.borderColor = "rgba(229, 169, 60, 0.45)";
            p.style.boxShadow = "0 0 16px rgba(229, 169, 60, 0.12)";
          });

          // Keep swarm running for 6.5s to show simultaneous process
          currentTimer = setTimeout(() => {
            if (!isRunning) return;
            panes.forEach((p) => {
              p.style.borderColor = "";
              p.style.boxShadow = "";
            });

            // Loop back to Launcher smoothly
            currentTimer = setTimeout(() => {
              if (!isRunning) return;
              startCycle();
            }, 2500);
          }, 6500);
        }, 600);
      }
    }, 38);
  }

  // Interactivity: Topbar Mode Buttons
  const modeButtons = document.querySelectorAll(".bench-mode-btn");
  const modeCards = document.querySelectorAll(".mode-card-interactive");

  function setActiveMode(mode) {
    modeButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-mode") === mode);
    });
    modeCards.forEach((card) => {
      card.classList.toggle("active", card.getAttribute("data-mode") === mode);
    });

    if (mode === "code") {
      isRunning = true;
      startCycle();
    } else {
      clearAllTimers();
      const targetSection = document.getElementById(mode === "agent" ? "agentShowcase" : "heroMockup");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode");
      if (mode) setActiveMode(mode);
    });
  });

  modeCards.forEach((card) => {
    card.addEventListener("click", () => {
      const mode = card.getAttribute("data-mode");
      if (mode) setActiveMode(mode);
    });
  });

  // Start the live automation
  startCycle();
}

// Wire Mobile Showcase & Hero Mode Switcher & Bench Live Automation on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initMobileShowcaseAutoplay();
  initHeroModeSwitcher();
  initBenchLiveAutomation();
});



