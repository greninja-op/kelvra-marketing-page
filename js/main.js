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
   CODE MODE LIVE WALKTHROUGH DEMO (Carbon Copy Bench Simulation)
   ========================================================================== */

function initCodeModeWalkthroughDemo() {
  const stage = document.getElementById("codeModeStage");
  if (!stage) return;

  const scenes = {
    1: document.getElementById("simScene1"),
    2: document.getElementById("simScene2"),
    3: document.getElementById("simScene3"),
    4: document.getElementById("simScene4"),
  };

  const stepPills = document.querySelectorAll(".step-pill-btn");
  const scrubberFill = document.getElementById("theaterScrubberFill");
  const statusText = document.getElementById("theaterStatusText");
  const whyText = document.getElementById("theaterWhyText");
  const playPauseBtn = document.getElementById("btnTheaterPlayPause");
  const playIcon = document.getElementById("theaterPlayIcon");
  const pauseIcon = document.getElementById("theaterPauseIcon");
  const playPauseText = document.getElementById("theaterPlayPauseText");
  const restartBtn = document.getElementById("btnTheaterRestart");

  const explanations = {
    1: "<strong>Zero-Friction Orchestration:</strong> Launching multiple CLI tools manually requires juggling separate terminal windows. Kelvra’s pre-flight launcher lets you select any engine (Claude, AntiGravity, Codex, Gemini) and allocate up to 6 seats in a single click.",
    2: "<strong>Worktree Isolation:</strong> When multiple autonomous agents edit the same working copy simultaneously, they trigger git lockups and destroy each other's code. Kelvra isolates every session in its own Git worktree branch sandbox.",
    3: "<strong>Native TUI &amp; PromptGuard:</strong> No dumbed-down wrappers. You get the genuine CLI agent experience (AntiGravity, Claude, Codex) with an added AST security layer preventing indirect prompt injections before execution.",
    4: "<strong>Parallel Swarm Velocity:</strong> Backend, frontend, database, test, and security agents run concurrently. Instead of waiting sequentially, full-stack features ship 5× faster with zero context contamination."
  };

  const statusLabels = {
    1: "STEP 1/4 · PRE-FLIGHT LAUNCHER",
    2: "STEP 2/4 · WORKTREE ISOLATION",
    3: "STEP 3/4 · TUI DIRECTIVE & AST",
    4: "STEP 4/4 · 6-AGENT SWARM RUNNING"
  };

  let currentStep = 1;
  let isPlaying = true;
  let stepTimeout = null;
  let typingInterval = null;

  function setStep(stepNum, userInitiated = false) {
    currentStep = stepNum;

    // Clear typing if any
    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
    }
    if (stepTimeout) {
      clearTimeout(stepTimeout);
      stepTimeout = null;
    }

    // Toggle scenes
    Object.keys(scenes).forEach((num) => {
      if (scenes[num]) {
        scenes[num].classList.toggle("active", parseInt(num) === stepNum);
      }
    });

    // Update step pills
    stepPills.forEach((pill) => {
      const pNum = parseInt(pill.getAttribute("data-step"));
      pill.classList.toggle("active", pNum === stepNum);
    });

    // Update scrubber & labels
    const pct = stepNum === 1 ? 25 : stepNum === 2 ? 50 : stepNum === 3 ? 75 : 100;
    if (scrubberFill) scrubberFill.style.width = pct + "%";
    if (statusText) statusText.innerText = statusLabels[stepNum];
    if (whyText && explanations[stepNum]) whyText.innerHTML = explanations[stepNum];

    // Trigger step-specific animations
    if (stepNum === 1) {
      runScene1Animation();
    } else if (stepNum === 2) {
      runScene2Animation();
    } else if (stepNum === 3) {
      runScene3Animation();
    } else if (stepNum === 4) {
      runScene4Animation();
    }
  }

  function runScene1Animation() {
    const cursor = document.getElementById("simVirtualCursor");
    const launchBtn = document.getElementById("simBtnLaunch");

    if (cursor) {
      cursor.style.transform = "translate(0, 0)";
      setTimeout(() => {
        if (currentStep !== 1) return;
        cursor.style.transform = "translate(-80px, -20px) scale(0.92)";
        if (launchBtn) {
          launchBtn.style.transform = "scale(0.96)";
          setTimeout(() => {
            if (launchBtn) launchBtn.style.transform = "";
          }, 200);
        }
      }, 2400);
    }

    if (isPlaying) {
      stepTimeout = setTimeout(() => {
        setStep(2);
      }, 4200);
    }
  }

  function runScene2Animation() {
    if (isPlaying) {
      stepTimeout = setTimeout(() => {
        setStep(3);
      }, 4000);
    }
  }

  function runScene3Animation() {
    const textTarget = document.getElementById("simTypingText");
    const promptGuardPill = document.getElementById("simPromptGuardPill");
    const promptGuardText = document.getElementById("simPromptGuardText");

    if (!textTarget) return;
    textTarget.innerText = "";
    if (promptGuardPill) {
      promptGuardPill.style.color = "#E5A93C";
      promptGuardPill.style.borderColor = "rgba(229,169,60,0.3)";
      promptGuardPill.style.background = "rgba(229,169,60,0.1)";
    }
    if (promptGuardText) promptGuardText.innerText = "PromptGuard: Scanning AST...";

    const directiveStr = 'Refactor auth store to ed25519 tokens & fix session race condition';
    let charIdx = 0;

    typingInterval = setInterval(() => {
      if (charIdx < directiveStr.length) {
        textTarget.innerText += directiveStr[charIdx];
        charIdx++;
      } else {
        clearInterval(typingInterval);
        typingInterval = null;

        // PromptGuard verification
        setTimeout(() => {
          if (currentStep !== 3) return;
          if (promptGuardPill) {
            promptGuardPill.style.color = "#52B788";
            promptGuardPill.style.borderColor = "rgba(82, 183, 136, 0.4)";
            promptGuardPill.style.background = "rgba(82, 183, 136, 0.15)";
          }
          if (promptGuardText) promptGuardText.innerText = "✔ 100% Clean · 0 Injections";

          if (isPlaying) {
            stepTimeout = setTimeout(() => {
              setStep(4);
            }, 1800);
          }
        }, 400);
      }
    }, 45);
  }

  function runScene4Animation() {
    const ffFill = document.getElementById("simFfFill");
    const ffPercent = document.getElementById("simFfPercent");

    if (ffFill) ffFill.style.width = "0%";
    if (ffPercent) ffPercent.innerText = "RUNNING...";

    let progress = 0;
    const progressInterval = setInterval(() => {
      if (currentStep !== 4) {
        clearInterval(progressInterval);
        return;
      }
      progress += 4;
      if (progress <= 100) {
        if (ffFill) ffFill.style.width = progress + "%";
        if (ffPercent) ffPercent.innerText = progress + "% COMPLETE";
      } else {
        clearInterval(progressInterval);
        if (ffPercent) ffPercent.innerText = "100% COMPLETE";

        if (isPlaying) {
          stepTimeout = setTimeout(() => {
            setStep(1);
          }, 6000);
        }
      }
    }, 120);
  }

  // Hook Step Pills
  stepPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const step = parseInt(pill.getAttribute("data-step"));
      setStep(step, true);
    });
  });

  // Play / Pause Toggle
  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", () => {
      isPlaying = !isPlaying;
      if (playIcon) playIcon.style.display = isPlaying ? "none" : "inline";
      if (pauseIcon) pauseIcon.style.display = isPlaying ? "inline" : "none";
      if (playPauseText) playPauseText.innerText = isPlaying ? "Pause" : "Play";

      if (isPlaying) {
        setStep(currentStep);
      } else {
        if (stepTimeout) clearTimeout(stepTimeout);
        if (typingInterval) clearInterval(typingInterval);
      }
    });
  }

  // Restart Button
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      isPlaying = true;
      if (playIcon) playIcon.style.display = "none";
      if (pauseIcon) pauseIcon.style.display = "inline";
      if (playPauseText) playPauseText.innerText = "Pause";
      setStep(1, true);
    });
  }

  // Synchronize Section 3 Mode Cards with Theater Mode Switcher
  const modeCards = document.querySelectorAll(".mode-card-interactive");
  const theaterTabBtns = document.querySelectorAll(".theater-tab-btn");
  const codeStage = document.getElementById("codeModeStage");
  const agentStage = document.getElementById("agentModeStage");
  const chatStage = document.getElementById("chatModeStage");

  function switchModeTheater(mode) {
    // Update card selection
    modeCards.forEach((c) => {
      c.classList.toggle("active", c.getAttribute("data-mode") === mode);
    });

    // Update theater tabs
    theaterTabBtns.forEach((t) => {
      t.classList.toggle("active", t.getAttribute("data-target-mode") === mode);
    });

    // Switch visible stage
    if (codeStage) codeStage.style.display = mode === "code" ? "flex" : "none";
    if (agentStage) agentStage.style.display = mode === "agent" ? "flex" : "none";
    if (chatStage) chatStage.style.display = mode === "chat" ? "flex" : "none";

    const codeActions = document.getElementById("codeTheaterActions");
    const stepPillsContainer = document.getElementById("theaterStepPills");
    const scrubber = document.querySelector(".theater-scrubber-track");

    if (mode === "code") {
      if (codeActions) codeActions.style.display = "inline-flex";
      if (stepPillsContainer) stepPillsContainer.style.display = "flex";
      if (scrubber) scrubber.style.display = "block";
      isPlaying = true;
      setStep(1);
    } else {
      if (codeActions) codeActions.style.display = "none";
      if (stepPillsContainer) stepPillsContainer.style.display = "none";
      if (scrubber) scrubber.style.display = "none";
      if (stepTimeout) clearTimeout(stepTimeout);
      if (typingInterval) clearInterval(typingInterval);
      if (whyText) {
        if (mode === "agent") {
          whyText.innerHTML = "<strong>Autonomous DAG Decomposition:</strong> Agent Mode constructs a directed acyclic graph breaking high-level directives into parallel subtasks with conflict-free resource allocation.";
        } else {
          whyText.innerHTML = "<strong>Pair Programming &amp; Artifacts:</strong> Chat Mode pairs reasoning models with an integrated right-hand artifact drawer showing diffs, architecture plans, and live web previews.";
        }
      }
      if (statusText) {
        statusText.innerText = mode.toUpperCase() + " MODE PREVIEW";
      }
    }
  }

  modeCards.forEach((card) => {
    card.addEventListener("click", () => {
      const mode = card.getAttribute("data-mode");
      if (mode) switchModeTheater(mode);
    });
  });

  theaterTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-target-mode");
      if (mode) switchModeTheater(mode);
    });
  });

  const btnSwitchFromAgent = document.getElementById("btnSwitchToCodeFromAgent");
  const btnSwitchFromChat = document.getElementById("btnSwitchToCodeFromChat");
  if (btnSwitchFromAgent) {
    btnSwitchFromAgent.addEventListener("click", () => switchModeTheater("code"));
  }
  if (btnSwitchFromChat) {
    btnSwitchFromChat.addEventListener("click", () => switchModeTheater("code"));
  }

  // Start the simulation loop at Step 1
  setStep(1);
}

// Wire Mobile Showcase & Hero Mode Switcher & Code Mode Walkthrough on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initMobileShowcaseAutoplay();
  initHeroModeSwitcher();
  initCodeModeWalkthroughDemo();
});


