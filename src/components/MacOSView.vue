<template>
  <div class="macos-root" @mousemove="onMouseMove" @mouseup="stopDrag" @click="closeMenus">

    <!-- BOOT SCREEN -->
    <Transition name="boot-fade">
      <div v-if="phase === 'boot'" class="boot-screen">
        <Transition name="logo-pop">
          <div v-if="logoVisible" class="boot-logo">
            <svg viewBox="0 0 814 1000" fill="white" width="54" height="66">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-150.3-93.8c-52.3-64-102.7-165.8-102.7-262.8C0 482.1 119.5 328.6 240.3 328.6c59.5 0 109.2 38.4 146.4 38.4 35.7 0 91.7-40.8 160.3-40.8 26.4 0 128.4 2.6 198 96.6zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
            </svg>
          </div>
        </Transition>
        <Transition name="bar-slide">
          <div v-if="barVisible" class="boot-bar-wrap">
            <div class="boot-bar-track">
              <div class="boot-bar-fill" :style="{ width: bootProgress + '%' }"></div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- LOGIN SCREEN -->
    <Transition name="login-fade">
      <div v-if="phase === 'login'" class="login-screen" @click="proceedToDesktop">
        <div class="login-time">{{ loginTimeStr }}</div>
        <div class="login-date">{{ loginDateStr }}</div>
        <div class="login-card" @click.stop>
          <div class="login-avatar">A</div>
          <div class="login-name">Ankit Chhetri</div>
          <div class="login-pw-row">
            <input
              ref="passwordInput"
              v-model="password"
              type="password"
              placeholder="Password"
              class="login-pw-input"
              @keydown.enter="proceedToDesktop"
            />
            <button class="login-arrow" @click="proceedToDesktop">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" width="13" height="13">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          <div class="login-hint">Press Enter to login</div>
        </div>
      </div>
    </Transition>

    <!-- DESKTOP -->
    <Transition name="desktop-fade">
      <div v-if="phase === 'desktop'" class="desktop" @contextmenu.prevent="showCtxMenu($event)">

        <!-- Wallpaper -->
        <div class="wallpaper"></div>

        <!-- MENU BAR -->
        <div class="menubar" @click.stop>
          <div class="menubar-left">
            <div class="mb-item apple-btn" @click="toggleMenu('apple')">
              <svg viewBox="0 0 814 1000" fill="currentColor" width="13" height="16">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-150.3-93.8c-52.3-64-102.7-165.8-102.7-262.8C0 482.1 119.5 328.6 240.3 328.6c59.5 0 109.2 38.4 146.4 38.4 35.7 0 91.7-40.8 160.3-40.8 26.4 0 128.4 2.6 198 96.6zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
              </svg>
              <div v-if="activeMenu === 'apple'" class="mb-dropdown">
                <div class="mb-drop-item bold" @click.stop="openApp('about')">About This Mac</div>
                <div class="mb-drop-sep"></div>
                <div class="mb-drop-item">System Settings...</div>
                <div class="mb-drop-item">App Store...</div>
                <div class="mb-drop-sep"></div>
                <div class="mb-drop-item">Sleep</div>
                <div class="mb-drop-item">Restart...</div>
                <div class="mb-drop-item" @click.stop="reboot">Shut Down...</div>
              </div>
            </div>
            <div class="mb-item app-name">{{ focusedApp }}</div>
            <div class="mb-item" @click.stop="toggleMenu('file')">
              File
              <div v-if="activeMenu === 'file'" class="mb-dropdown">
                <div class="mb-drop-item">New Window <span class="mb-shortcut">⌘N</span></div>
                <div class="mb-drop-item">New Tab <span class="mb-shortcut">⌘T</span></div>
                <div class="mb-drop-sep"></div>
                <div class="mb-drop-item">Close Window <span class="mb-shortcut">⌘W</span></div>
              </div>
            </div>
            <div class="mb-item" @click.stop="toggleMenu('edit')">Edit</div>
            <div class="mb-item" @click.stop="toggleMenu('view')">View</div>
            <div class="mb-item" @click.stop="toggleMenu('go')">Go</div>
            <div class="mb-item" @click.stop="toggleMenu('window')">Window</div>
          </div>
          <div class="menubar-right">
            <span class="mb-status">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="14" height="14">
                <path stroke-linecap="round" d="M1.5 8.5C5 5 8.6 3 12 3s7 2 10.5 5.5M5 12c1.9-2 4.3-3 7-3s5.1 1 7 3M8.5 15.5C9.6 14.4 10.8 14 12 14s2.4.4 3.5 1.5"/>
                <circle cx="12" cy="19" r="0.75" fill="currentColor"/>
              </svg>
            </span>
            <span class="mb-status">{{ menuBarClock }}</span>
          </div>
        </div>

        <!-- Desktop Icons -->
        <div class="dsk-icon" style="top:48px;right:16px" @dblclick="openApp('finder')">
          <div class="dsk-icon-img">
            <svg viewBox="0 0 40 40" width="48" height="48">
              <rect width="40" height="40" rx="9" fill="url(#finder-grad)"/>
              <defs>
                <linearGradient id="finder-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#56c1ff"/>
                  <stop offset="100%" stop-color="#007aff"/>
                </linearGradient>
              </defs>
              <ellipse cx="14" cy="20" rx="7" ry="9" fill="#f0f0f0"/>
              <ellipse cx="26" cy="20" rx="7" ry="9" fill="white"/>
              <circle cx="12" cy="18" r="2.5" fill="#007aff"/>
              <circle cx="28" cy="18" r="2.5" fill="#555"/>
              <path d="M11 24 Q14 27 17 24" stroke="#007aff" stroke-width="1.5" fill="none" stroke-linecap="round"/>
              <path d="M23 24 Q26 26 29 24" stroke="#555" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="dsk-icon-label">Finder</div>
        </div>
        <div class="dsk-icon" style="top:122px;right:16px" @dblclick="openApp('terminal')">
          <div class="dsk-icon-img">
            <svg viewBox="0 0 40 40" width="48" height="48">
              <rect width="40" height="40" rx="9" fill="#1a1a1a"/>
              <text x="7" y="24" font-family="monospace" font-size="13" fill="#00ff41">&#62;_</text>
            </svg>
          </div>
          <div class="dsk-icon-label">Terminal</div>
        </div>

        <!-- Context Menu -->
        <div v-if="ctxVisible" class="ctx-menu" :style="{ left: ctxX+'px', top: ctxY+'px' }" @click.stop>
          <div class="ctx-item" @click="openApp('finder'); ctxVisible=false">Open Finder</div>
          <div class="ctx-item" @click="openApp('terminal'); ctxVisible=false">Open Terminal</div>
          <div class="ctx-sep"></div>
          <div class="ctx-item" @click="openApp('about'); ctxVisible=false">About This Mac</div>
        </div>

        <!-- WINDOWS -->
        <div
          v-for="win in windows"
          v-show="!win.minimized"
          :key="win.id"
          class="mac-window"
          :style="{ left: win.x+'px', top: win.y+'px', width: win.w+'px', height: win.h+'px', zIndex: win.z }"
          @mousedown="focusWin(win.id)"
        >
          <!-- Title Bar -->
          <div class="win-titlebar" @mousedown.stop="startDrag($event, win)">
            <div class="traffic-lights">
              <div class="tl red" @click.stop="closeWin(win.id)" title="Close"></div>
              <div class="tl yellow" @click.stop="minimizeWin(win.id)" title="Minimize"></div>
              <div class="tl green" @click.stop title="Zoom"></div>
            </div>
            <div class="win-title">{{ win.title }}</div>
          </div>

          <!-- Window Body -->
          <div class="win-body">

            <!-- FINDER -->
            <template v-if="win.app === 'finder'">
              <div class="finder-layout">
                <div class="finder-sidebar">
                  <div class="finder-section-label">Favorites</div>
                  <div v-for="f in finderFavs" :key="f.name"
                    class="finder-fav-item" :class="{ active: finderFolder === f.name }"
                    @click="finderFolder = f.name; finderSel = null">
                    <span class="fav-icon">{{ f.icon }}</span> {{ f.name }}
                  </div>
                  <div class="finder-section-label" style="margin-top:12px">Locations</div>
                  <div class="finder-fav-item">
                    <span class="fav-icon">💻</span> MacBook Pro
                  </div>
                </div>
                <div class="finder-main">
                  <div class="finder-toolbar">
                    <div class="finder-toolbar-btns">
                      <button class="finder-tb-btn" @click="finderGoUp">‹</button>
                      <button class="finder-tb-btn" style="opacity:0.4" disabled>›</button>
                    </div>
                    <div class="finder-path-label">{{ finderFolder }}</div>
                    <div class="finder-view-toggle">
                      <button class="fvt-btn active">⊞</button>
                      <button class="fvt-btn">☰</button>
                    </div>
                  </div>
                  <div class="finder-file-header">
                    <span>Name</span><span>Date Modified</span><span>Size</span><span>Kind</span>
                  </div>
                  <div class="finder-files-list">
                    <div v-for="file in currentFinderFiles" :key="file.name"
                      class="finder-file-row" :class="{ selected: finderSel === file.name }"
                      @click="finderSel = file.name"
                      @dblclick="handleFinderOpen(file, win)">
                      <span class="ff-name">
                        <span class="ff-icon">{{ file.type === 'folder' ? '📁' : fileIcon(file.name) }}</span>
                        {{ file.name }}
                      </span>
                      <span class="ff-date">{{ file.date }}</span>
                      <span class="ff-size">{{ file.size }}</span>
                      <span class="ff-kind">{{ file.type === 'folder' ? 'Folder' : fileKind(file.name) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- TERMINAL -->
            <template v-else-if="win.app === 'terminal'">
              <div class="terminal-layout" @click="focusTerminalInput">
                <div class="term-output" ref="termOutput">
                  <div v-for="(line, i) in termLines" :key="i">
                    <span v-if="line.t === 'sys'" class="term-sys">{{ line.v }}</span>
                    <span v-else-if="line.t === 'prompt'"><span class="term-prompt">{{ termPS1 }}</span><span class="term-cmd"> {{ line.v }}</span></span>
                    <pre v-else-if="line.t === 'out'" class="term-out">{{ line.v }}</pre>
                    <pre v-else-if="line.t === 'neo'" class="term-neo" v-html="line.v"></pre>
                  </div>
                  <div class="term-current-line">
                    <span class="term-prompt">{{ termPS1 }}</span>
                    <span class="term-cmd"> {{ termInput }}</span><span class="term-cursor">█</span>
                  </div>
                </div>
                <input ref="termInputEl" v-model="termInput" class="term-hidden-input"
                  @keydown.enter="runCmd"
                  @keydown.up.prevent="histUp"
                  @keydown.down.prevent="histDown" />
              </div>
            </template>

            <!-- VS CODE -->
            <template v-else-if="win.app === 'vscode'">
              <div class="vsc-layout">
                <div class="vsc-sidebar">
                  <div class="vsc-sidebar-title">EXPLORER</div>
                  <div class="vsc-tree-item folder">📂 me</div>
                  <div v-for="f in vscFiles" :key="f"
                    class="vsc-tree-item file indent1"
                    :class="{ active: vscActiveFile === f }"
                    @click="vscActiveFile = f">
                    <span class="vsc-file-dot" :class="vscFileDotClass(f)"></span> {{ f }}
                  </div>
                  <div class="vsc-tree-item folder indent1">📂 components</div>
                  <div v-for="f in vscComponentFiles" :key="f"
                    class="vsc-tree-item file indent2"
                    :class="{ active: vscActiveFile === f }"
                    @click="vscActiveFile = f">
                    <span class="vsc-file-dot green"></span> {{ f }}
                  </div>
                </div>
                <div class="vsc-editor-area">
                  <div class="vsc-tabs">
                    <div v-for="f in vscOpenTabs" :key="f"
                      class="vsc-tab" :class="{ active: vscActiveFile === f }"
                      @click="vscActiveFile = f">
                      {{ f }}
                      <span class="vsc-tab-close" @click.stop="closeVscTab(f)">×</span>
                    </div>
                  </div>
                  <div class="vsc-editor">
                    <div class="vsc-line-nums">
                      <div v-for="n in vscLineCount" :key="n" class="vsc-ln">{{ n }}</div>
                    </div>
                    <pre class="vsc-code" v-html="vscContent"></pre>
                  </div>
                </div>
              </div>
            </template>

            <!-- SAFARI -->
            <template v-else-if="win.app === 'safari'">
              <div class="safari-layout">
                <div class="safari-bar">
                  <div class="safari-nav-btns">
                    <button class="safari-nav-btn">‹</button>
                    <button class="safari-nav-btn">›</button>
                  </div>
                  <div class="safari-url-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#34c759" stroke-width="2" width="11" height="11"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    <span class="safari-url-text">ankitchhetri.dev</span>
                  </div>
                  <button class="safari-nav-btn">↻</button>
                </div>
                <div class="safari-content">
                  <div class="safari-hero">
                    <h1>Hi My Name is<br/><span class="safari-name">Ankit Chhetri</span></h1>
                    <div class="safari-badge">Software Engineer</div>
                  </div>
                  <div class="safari-section">
                    <h2>Projects</h2>
                    <div class="safari-grid">
                      <div class="safari-card" v-for="p in safariProjects" :key="p.name">
                        <h3>{{ p.name }}</h3>
                        <p>{{ p.desc }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="safari-section">
                    <h2>Skills</h2>
                    <div class="safari-skills">
                      <span v-for="s in safariSkills" :key="s" class="safari-skill-chip">{{ s }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- ABOUT THIS MAC -->
            <template v-else-if="win.app === 'about'">
              <div class="about-layout">
                <div class="about-left">
                  <svg viewBox="0 0 60 60" width="72" height="72">
                    <rect width="60" height="60" rx="14" fill="#1a1a2e"/>
                    <rect x="5" y="8" width="50" height="34" rx="4" fill="#2d2d44"/>
                    <rect x="8" y="11" width="44" height="28" rx="2" fill="#0a0a1a"/>
                    <rect x="20" y="42" width="20" height="3" fill="#3a3a5c"/>
                    <rect x="15" y="45" width="30" height="2" rx="1" fill="#3a3a5c"/>
                    <circle cx="30" cy="25" r="8" fill="#4c6ef5" opacity="0.8"/>
                    <text x="26" y="29" font-size="10" fill="white" font-family="monospace">M</text>
                  </svg>
                  <div class="about-model">MacBook Pro</div>
                  <div class="about-submodel">14-inch, 2024</div>
                </div>
                <div class="about-right">
                  <div class="about-title">Ankit's MacBook Pro</div>
                  <div class="about-spec-row"><span class="about-spec-k">Chip</span><span class="about-spec-v">Apple M3 Pro</span></div>
                  <div class="about-spec-row"><span class="about-spec-k">Memory</span><span class="about-spec-v">18 GB</span></div>
                  <div class="about-spec-row"><span class="about-spec-k">macOS</span><span class="about-spec-v">Sequoia 15.4</span></div>
                  <div class="about-spec-row"><span class="about-spec-k">Serial</span><span class="about-spec-v">C02GK3LJML7H</span></div>
                  <div class="about-spec-row"><span class="about-spec-k">Storage</span><span class="about-spec-v">512 GB SSD</span></div>
                  <button class="about-more-btn">More Info...</button>
                </div>
              </div>
            </template>

          </div>
        </div>

        <!-- DOCK -->
        <div class="dock-outer">
          <div class="dock-inner">
            <div v-for="(app, i) in dockApps" :key="app.id"
              class="dock-item"
              :class="{ 'dock-sep': app.sep }"
              @click="!app.sep && openApp(app.id)"
              @mouseenter="hovDock = i"
              @mouseleave="hovDock = -1"
              :title="app.name">
              <div v-if="!app.sep" class="dock-icon-wrap" :style="dockScale(i)">
                <div class="dock-icon-bg" :style="{ background: app.bg }">
                  <span v-if="app.emoji" class="dock-emoji">{{ app.emoji }}</span>
                  <span v-else class="dock-label-icon">{{ app.label }}</span>
                </div>
                <div v-if="isOpen(app.id)" class="dock-dot"></div>
                <div class="dock-tooltip">{{ app.name }}</div>
              </div>
              <div v-else class="dock-divider"></div>
            </div>
          </div>
        </div>

      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';

// ─── PHASE ───────────────────────────────────────────────────────────────────
const phase = ref('boot');
const logoVisible = ref(false);
const barVisible = ref(false);
const bootProgress = ref(0);
const password = ref('');
const passwordInput = ref(null);

// ─── CLOCK ───────────────────────────────────────────────────────────────────
const menuBarClock = ref('');
const loginTimeStr = ref('');
const loginDateStr = ref('');

function tick() {
  const now = new Date();
  menuBarClock.value = now.toLocaleString('en-US', { weekday:'short', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
  loginTimeStr.value = now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:false });
  loginDateStr.value = now.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
}
let clockTimer = null;

// ─── BOOT SEQUENCE ───────────────────────────────────────────────────────────
onMounted(() => {
  tick();
  clockTimer = setInterval(tick, 1000);

  setTimeout(() => { logoVisible.value = true; }, 200);
  setTimeout(() => { barVisible.value = true; }, 800);

  const startT = Date.now();
  const dur = 2800;
  function animBar() {
    const elapsed = Date.now() - startT;
    bootProgress.value = Math.min((elapsed / dur) * 100, 100);
    if (elapsed < dur) {
      requestAnimationFrame(animBar);
    } else {
      setTimeout(() => {
        phase.value = 'login';
        nextTick(() => passwordInput.value?.focus());
      }, 350);
    }
  }
  setTimeout(() => requestAnimationFrame(animBar), 800);
});

onUnmounted(() => {
  clearInterval(clockTimer);
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', stopDrag);
});

function proceedToDesktop() {
  phase.value = 'desktop';
  setTimeout(() => openApp('finder'), 600);
  setTimeout(() => openApp('terminal'), 900);
}

function reboot() {
  windows.value = [];
  phase.value = 'boot';
  logoVisible.value = false;
  barVisible.value = false;
  bootProgress.value = 0;
  activeMenu.value = null;
  setTimeout(() => { logoVisible.value = true; }, 200);
  setTimeout(() => { barVisible.value = true; }, 800);
  const startT = Date.now();
  const dur = 2800;
  function animBar() {
    const elapsed = Date.now() - startT;
    bootProgress.value = Math.min((elapsed / dur) * 100, 100);
    if (elapsed < dur) { requestAnimationFrame(animBar); }
    else { setTimeout(() => { phase.value = 'login'; nextTick(() => passwordInput.value?.focus()); }, 350); }
  }
  setTimeout(() => requestAnimationFrame(animBar), 800);
}

// ─── MENU BAR ────────────────────────────────────────────────────────────────
const activeMenu = ref(null);
const focusedApp = ref('Finder');

function toggleMenu(name) { activeMenu.value = activeMenu.value === name ? null : name; }
function closeMenus() { activeMenu.value = null; ctxVisible.value = false; }

// ─── CONTEXT MENU ────────────────────────────────────────────────────────────
const ctxVisible = ref(false);
const ctxX = ref(0);
const ctxY = ref(0);

function showCtxMenu(e) {
  ctxX.value = e.clientX;
  ctxY.value = e.clientY;
  ctxVisible.value = true;
}

// ─── WINDOWS ─────────────────────────────────────────────────────────────────
const windows = ref([]);
let zTop = 10;
let dragWin = null, dragDx = 0, dragDy = 0;

const appCfg = {
  finder:   { title: 'Finder', w: 720, h: 460 },
  terminal: { title: 'Terminal — zsh — 80×24', w: 640, h: 400 },
  vscode:   { title: 'me — Visual Studio Code', w: 820, h: 540 },
  safari:   { title: 'Ankit Chhetri — Safari', w: 860, h: 560 },
  about:    { title: 'About This Mac', w: 500, h: 320 },
};

function openApp(id) {
  const ex = windows.value.find(w => w.app === id);
  if (ex) { ex.minimized = false; ex.z = ++zTop; focusedApp.value = appLabel(id); return; }
  const cfg = appCfg[id] || { title: id, w: 600, h: 400 };
  const off = windows.value.length * 22;
  windows.value.push({ id: Date.now(), app: id, title: cfg.title, x: 100+off, y: 44+off, w: cfg.w, h: cfg.h, minimized: false, z: ++zTop });
  focusedApp.value = appLabel(id);
}

function appLabel(id) {
  return { finder:'Finder', terminal:'Terminal', vscode:'Code', safari:'Safari', about:'System Information' }[id] || id;
}

function closeWin(id) { windows.value = windows.value.filter(w => w.id !== id); }
function minimizeWin(id) { const w = windows.value.find(w => w.id === id); if (w) w.minimized = true; }
function focusWin(id) { const w = windows.value.find(w => w.id === id); if (w) { w.z = ++zTop; focusedApp.value = appLabel(w.app); } }
function isOpen(appId) { return windows.value.some(w => w.app === appId && !w.minimized); }

function startDrag(e, win) {
  dragWin = win; dragDx = e.clientX - win.x; dragDy = e.clientY - win.y;
  win.z = ++zTop;
}

function onMouseMove(e) {
  if (!dragWin) return;
  dragWin.x = Math.max(0, e.clientX - dragDx);
  dragWin.y = Math.max(28, e.clientY - dragDy);
}

function stopDrag() { dragWin = null; }

// ─── DOCK ────────────────────────────────────────────────────────────────────
const hovDock = ref(-1);
const dockApps = [
  { id:'finder',   name:'Finder',   emoji:'',  label:'', bg:'linear-gradient(160deg,#56c1ff,#007aff)' },
  { id:'safari',   name:'Safari',   emoji:'🧭', label:'', bg:'linear-gradient(160deg,#34aadc,#0071e3)' },
  { id:'terminal', name:'Terminal', emoji:'',  label:'>_', bg:'#1a1a1a' },
  { id:'vscode',   name:'VS Code',  emoji:'',  label:'⌨', bg:'linear-gradient(160deg,#1e1e3f,#4c6ef5)' },
  { id:'',         name:'',         sep:true },
  { id:'about',    name:'About',    emoji:'ℹ️', label:'', bg:'linear-gradient(160deg,#636e72,#2d3436)' },
];

function dockScale(i) {
  const d = Math.abs(hovDock.value - i);
  const s = hovDock.value < 0 ? 1 : d === 0 ? 1.5 : d === 1 ? 1.25 : 1;
  return { transform: `scale(${s}) translateY(${hovDock.value >= 0 && d <= 1 ? -8*(1.5-d*0.25) : 0}px)`, transition: 'transform 0.15s ease' };
}

// ─── FINDER ──────────────────────────────────────────────────────────────────
const finderFavs = [
  { name:'Desktop',     icon:'🖥️' },
  { name:'Documents',   icon:'📄' },
  { name:'Downloads',   icon:'⬇️' },
  { name:'Applications',icon:'📦' },
  { name:'Projects',    icon:'💼' },
];

const finderData = {
  Desktop:      [
    { name:'portfolio', type:'folder', date:'Today',         size:'--' },
    { name:'about.txt', type:'file',   date:'Today',         size:'1 KB' },
    { name:'resume.pdf',type:'file',   date:'Apr 20, 2026',  size:'245 KB' },
  ],
  Documents:    [
    { name:'WebMD',      type:'folder', date:'May 1, 2026',  size:'--' },
    { name:'Notes.md',   type:'file',   date:'May 4, 2026',  size:'8 KB' },
    { name:'ideas.txt',  type:'file',   date:'Apr 28, 2026', size:'2 KB' },
  ],
  Downloads:    [
    { name:'Xcode_15.dmg',    type:'file', date:'Mar 12, 2026', size:'7.3 GB' },
    { name:'node-v22.tar.gz', type:'file', date:'Feb 3, 2026',  size:'34 MB' },
  ],
  Applications: [
    { name:'Visual Studio Code.app', type:'folder', date:'Apr 15, 2026', size:'--' },
    { name:'Google Chrome.app',      type:'folder', date:'May 1, 2026',  size:'--' },
    { name:'Slack.app',              type:'folder', date:'Apr 22, 2026', size:'--' },
    { name:'iTerm.app',              type:'folder', date:'Mar 8, 2026',  size:'--' },
  ],
  Projects:     [
    { name:'AI-Gateway',  type:'folder', date:'May 3, 2026',  size:'--' },
    { name:'MCP-Gen',     type:'folder', date:'Apr 29, 2026', size:'--' },
    { name:'portfolio',   type:'folder', date:'Today',        size:'--' },
    { name:'Jerry-AI',    type:'folder', date:'Mar 14, 2026', size:'--' },
  ],
};

const finderFolder = ref('Desktop');
const finderSel = ref(null);
const currentFinderFiles = computed(() => finderData[finderFolder.value] || []);

function finderGoUp() { finderFolder.value = 'Desktop'; finderSel.value = null; }

function handleFinderOpen(file, win) {
  if (file.type === 'folder') {
    if (finderData[file.name]) finderFolder.value = file.name;
  } else if (file.name.endsWith('.txt')) {
    openApp('terminal');
  }
}

function fileIcon(name) {
  if (name.endsWith('.pdf')) return '📕';
  if (name.endsWith('.md')) return '📝';
  if (name.endsWith('.txt')) return '📃';
  if (name.endsWith('.dmg')) return '💿';
  if (name.endsWith('.gz') || name.endsWith('.zip')) return '🗜️';
  return '📄';
}
function fileKind(name) {
  if (name.endsWith('.pdf')) return 'PDF Document';
  if (name.endsWith('.md'))  return 'Markdown File';
  if (name.endsWith('.txt')) return 'Plain Text';
  if (name.endsWith('.dmg')) return 'Disk Image';
  if (name.endsWith('.gz'))  return 'Archive';
  return 'Document';
}

// ─── TERMINAL ────────────────────────────────────────────────────────────────
const termPS1 = 'ankit@MacBook-Pro ~ %';
const termLines = ref([
  { t:'sys',  v:'Last login: ' + new Date().toLocaleString() + ' on ttys000' },
  { t:'prompt', v:'neofetch' },
  { t:'neo', v:`<span style="color:#56c1ff">                    'c.         </span>  <span style="color:#cdd3de">ankit@MacBook-Pro.local</span>
<span style="color:#56c1ff">                 ,xNMM.         </span>  <span style="color:#cdd3de">-----------------------</span>
<span style="color:#56c1ff">               .OMMMMo          </span>  <span style="color:#7dd3fc">OS:</span> macOS Sequoia 15.4
<span style="color:#56c1ff">               OMMM0,           </span>  <span style="color:#7dd3fc">Host:</span> MacBook Pro 14-inch 2024
<span style="color:#56c1ff">     .;loddo:' loolloddol;.     </span>  <span style="color:#7dd3fc">Kernel:</span> Darwin 24.4.0
<span style="color:#56c1ff">   cKMMMMMMMMMMNWMMMMMMMMMM0:   </span>  <span style="color:#7dd3fc">Shell:</span> zsh 5.9
<span style="color:#56c1ff"> .KMMMMMMMMMMMMMMMMMMMMMMMWd.   </span>  <span style="color:#7dd3fc">CPU:</span> Apple M3 Pro
<span style="color:#56c1ff"> XMMMMMMMMMMMMMMMMMMMMMMMX.     </span>  <span style="color:#7dd3fc">Memory:</span> 5.2G / 18G
<span style="color:#56c1ff"> ;MMMMMMMMMMMMMMMMMMMMMMMM:     </span>  <span style="color:#7dd3fc">Disk:</span> 142G / 512G
<span style="color:#56c1ff"> .MMMMMMMMMMMMMMMMMMMMMMMMX.    </span>  <span style="color:#7dd3fc">Node:</span> v22.5.0
<span style="color:#56c1ff">  kMMMMMMMMMMMMMMMMMMMMMMMMWd.  </span>  <span style="color:#7dd3fc">Python:</span> 3.11.9
<span style="color:#56c1ff">  .XMMMMMMMMMMMMMMMMMMMMMMMMMMk </span>  <span style="color:#7dd3fc">npm:</span> 10.8.2` },
]);
const termInput = ref('');
const termInputEl = ref(null);
const termOutput = ref(null);
const termHistory = ref([]);
let termHistIdx = -1;

const termCmds = {
  whoami:  () => [{ t:'out', v:'ankit' }],
  pwd:     () => [{ t:'out', v:'/Users/ankit' }],
  date:    () => [{ t:'out', v: new Date().toString() }],
  clear:   () => { termLines.value = []; return []; },
  help: () => [{ t:'out', v:`Available commands:
  whoami        who you are
  pwd           print working directory
  ls            list files
  cat about.txt view bio
  cat resume.txt view resume
  neofetch      system info
  open finder   open Finder
  open safari   open Safari
  open vscode   open VS Code
  git log       recent commits
  node -e       run JS
  date          current date
  clear         clear terminal
  help          show this help` }],
  ls: () => [{ t:'out', v:`Desktop/    Documents/  Downloads/  Applications/
Projects/   .zshrc      .gitconfig  .npmrc` }],
  'ls -la': () => [{ t:'out', v:`total 64
drwxr-xr-x   12 ankit  staff   384 May  5 09:42 .
drwxr-xr-x    8 root   wheel   256 Jan  1 00:00 ..
-rw-r--r--    1 ankit  staff   892 May  3 14:20 .gitconfig
-rw-r--r--    1 ankit  staff   156 Apr 28 11:04 .npmrc
-rw-r--r--    1 ankit  staff  2431 May  1 09:15 .zshrc
drwxr-xr-x    8 ankit  staff   256 May  5 09:42 Desktop
drwxr-xr-x   14 ankit  staff   448 May  4 16:30 Documents
drwxr-xr-x    6 ankit  staff   192 Apr 30 12:00 Downloads
drwxr-xr-x   24 ankit  staff   768 May  2 10:11 Projects` }],
  'cat about.txt': () => [{ t:'out', v:`Hi! I'm Ankit Chhetri
================================
Software Engineer at WebMD (Aug 2024 - Present)
B.Tech • Sikkim Manipal University • CGPA: 8.6

Current Projects:
  → AI Gateway Service       (LLM routing & load balancing)
  → AI SDLC Platform         (Dev lifecycle automation)
  → Productivity Metrics     (Engineering analytics)

Skills:
  Languages : Python, TypeScript, JavaScript
  Frameworks: Vue 3, React, FastAPI, Django, Flask
  Cloud      : AWS (Lambda, S3, EC2, RDS)
  Tools      : Docker, Git, VS Code, Wrangler

Contact: achhetri@webmd.net` }],
  'cat resume.txt': () => [{ t:'out', v:`ANKIT CHHETRI — Software Engineer
===================================
WebMD       Associate SWE     Aug 2024 – Present
NIC         Intern            Jun 2023 – Jul 2023
NIT Raipur  Research Intern   Dec 2022 – Jan 2023

Education:
  Sikkim Manipal University — B.Tech (CGPA 8.6)

Projects: AI-Gateway, MCP-Generator, Jerry AI, News Wrapper
GitHub: github.com/ankitchhetri` }],
  neofetch: () => [{ t:'neo', v:`<span style="color:#56c1ff">                    'c.         </span>  <span style="color:#cdd3de">ankit@MacBook-Pro.local</span>
<span style="color:#56c1ff">                 ,xNMM.         </span>  <span style="color:#cdd3de">-----------------------</span>
<span style="color:#56c1ff">               .OMMMMo          </span>  <span style="color:#7dd3fc">OS:</span> macOS Sequoia 15.4
<span style="color:#56c1ff">               OMMM0,           </span>  <span style="color:#7dd3fc">Host:</span> MacBook Pro 14-inch 2024
<span style="color:#56c1ff">     .;loddo:' loolloddol;.     </span>  <span style="color:#7dd3fc">Kernel:</span> Darwin 24.4.0
<span style="color:#56c1ff">   cKMMMMMMMMMMNWMMMMMMMMMM0:   </span>  <span style="color:#7dd3fc">Shell:</span> zsh 5.9
<span style="color:#56c1ff"> .KMMMMMMMMMMMMMMMMMMMMMMMWd.   </span>  <span style="color:#7dd3fc">CPU:</span> Apple M3 Pro
<span style="color:#56c1ff"> XMMMMMMMMMMMMMMMMMMMMMMMX.     </span>  <span style="color:#7dd3fc">Memory:</span> 5.2G / 18G` }],
  'git log': () => [{ t:'out', v:`\x1b[33mcommit 5e3c11b\x1b[0m (HEAD -> main, origin/main)
Author: Ankit Chhetri <achhetri@webmd.net>
Date:   Mon May 5 09:00:00 2026

    feat: add macOS emulation view

\x1b[33mcommit fd031a7\x1b[0m
    removed the deploy config command

\x1b[33mcommit 09feffb\x1b[0m
    added wrangler to have proper project name` }],
  'open finder':  () => { openApp('finder');  return [{ t:'out', v:'' }]; },
  'open safari':  () => { openApp('safari');  return [{ t:'out', v:'' }]; },
  'open vscode':  () => { openApp('vscode');  return [{ t:'out', v:'' }]; },
  'open terminal':() => { return [{ t:'out', v:'Terminal is already open.' }]; },
  'node -e "console.log(1+1)"': () => [{ t:'out', v:'2' }],
  'python3 --version': () => [{ t:'out', v:'Python 3.11.9' }],
  'node --version': () => [{ t:'out', v:'v22.5.0' }],
};

function runCmd() {
  const cmd = termInput.value.trim();
  if (!cmd) return;
  termHistory.value.push(cmd);
  termHistIdx = termHistory.value.length;
  termLines.value.push({ t:'prompt', v: cmd });
  const handler = termCmds[cmd];
  if (handler) {
    const result = handler();
    if (result) termLines.value.push(...result);
  } else {
    termLines.value.push({ t:'out', v:`zsh: command not found: ${cmd}` });
  }
  termInput.value = '';
  nextTick(() => {
    if (termOutput.value) termOutput.value.scrollTop = termOutput.value.scrollHeight;
    termInputEl.value?.focus();
  });
}

function histUp() {
  if (termHistIdx > 0) { termHistIdx--; termInput.value = termHistory.value[termHistIdx]; }
}
function histDown() {
  if (termHistIdx < termHistory.value.length - 1) { termHistIdx++; termInput.value = termHistory.value[termHistIdx]; }
  else { termHistIdx = termHistory.value.length; termInput.value = ''; }
}
function focusTerminalInput() { termInputEl.value?.focus(); }

// ─── VS CODE ─────────────────────────────────────────────────────────────────
const vscFiles = ['App.vue', 'main.js'];
const vscComponentFiles = ['HeroSection.vue', 'MacOSView.vue', 'SidebarNav.vue', 'NavigationDots.vue'];
const vscActiveFile = ref('App.vue');
const vscOpenTabs = ref(['App.vue', 'main.js']);

watch(vscActiveFile, (f) => { if (!vscOpenTabs.value.includes(f)) vscOpenTabs.value.push(f); });

function closeVscTab(f) {
  vscOpenTabs.value = vscOpenTabs.value.filter(t => t !== f);
  if (vscActiveFile.value === f) vscActiveFile.value = vscOpenTabs.value[0] || 'App.vue';
}

function vscFileDotClass(f) {
  if (f.endsWith('.vue')) return 'green';
  if (f.endsWith('.js'))  return 'yellow';
  return 'blue';
}

const vscContents = {
  'App.vue': `<span class="vc-tag">&lt;script setup&gt;</span>
<span class="vc-kw">import</span> { ref } <span class="vc-kw">from</span> <span class="vc-str">"vue"</span>
<span class="vc-kw">import</span> SidebarNav <span class="vc-kw">from</span> <span class="vc-str">"./components/SidebarNav.vue"</span>
<span class="vc-kw">import</span> MacOSView  <span class="vc-kw">from</span> <span class="vc-str">"./components/MacOSView.vue"</span>
<span class="vc-kw">import</span> HeroSection <span class="vc-kw">from</span> <span class="vc-str">"./components/HeroSection.vue"</span>

<span class="vc-kw">const</span> currentView <span class="vc-op">=</span> <span class="vc-fn">ref</span>(<span class="vc-str">"home"</span>)
<span class="vc-tag">&lt;/script&gt;</span>

<span class="vc-tag">&lt;template&gt;</span>
  <span class="vc-tag">&lt;div</span> <span class="vc-attr">class</span>=<span class="vc-str">"min-h-screen"</span><span class="vc-tag">&gt;</span>
    <span class="vc-tag">&lt;SidebarNav</span> <span class="vc-attr">v-model</span>=<span class="vc-str">"currentView"</span> <span class="vc-tag">/&gt;</span>
    <span class="vc-tag">&lt;MacOSView</span> <span class="vc-attr">v-if</span>=<span class="vc-str">"currentView==='macos'"</span> <span class="vc-tag">/&gt;</span>
    <span class="vc-tag">&lt;div</span> <span class="vc-attr">v-if</span>=<span class="vc-str">"currentView==='home'"</span> <span class="vc-attr">class</span>=<span class="vc-str">"home-view"</span><span class="vc-tag">&gt;</span>
      <span class="vc-tag">&lt;HeroSection</span> <span class="vc-tag">/&gt;</span>
    <span class="vc-tag">&lt;/div&gt;</span>
  <span class="vc-tag">&lt;/div&gt;</span>
<span class="vc-tag">&lt;/template&gt;</span>`,

  'main.js': `<span class="vc-kw">import</span> { createApp } <span class="vc-kw">from</span> <span class="vc-str">'vue'</span>
<span class="vc-kw">import</span> <span class="vc-str">'./assets/main.css'</span>
<span class="vc-kw">import</span> App <span class="vc-kw">from</span> <span class="vc-str">'./App.vue'</span>

<span class="vc-fn">createApp</span>(App).<span class="vc-fn">mount</span>(<span class="vc-str">'#app'</span>)`,

  'MacOSView.vue': `<span class="vc-comment">// macOS emulation component</span>
<span class="vc-comment">// Boot → Login → Desktop</span>
<span class="vc-tag">&lt;script setup&gt;</span>
<span class="vc-kw">import</span> { ref, onMounted } <span class="vc-kw">from</span> <span class="vc-str">'vue'</span>

<span class="vc-kw">const</span> phase <span class="vc-op">=</span> <span class="vc-fn">ref</span>(<span class="vc-str">'boot'</span>)
<span class="vc-kw">const</span> windows <span class="vc-op">=</span> <span class="vc-fn">ref</span>([])

<span class="vc-fn">onMounted</span>(() <span class="vc-op">=&gt;</span> {
  <span class="vc-comment">// animate boot progress bar</span>
  <span class="vc-fn">animateBootProgress</span>()
})
<span class="vc-tag">&lt;/script&gt;</span>`,

  'HeroSection.vue': `<span class="vc-tag">&lt;template&gt;</span>
  <span class="vc-tag">&lt;div</span> <span class="vc-attr">class</span>=<span class="vc-str">"hero-section"</span><span class="vc-tag">&gt;</span>
    <span class="vc-tag">&lt;h1&gt;</span>Hi My Name is Ankit Chhetri<span class="vc-tag">&lt;/h1&gt;</span>
    <span class="vc-tag">&lt;div</span> <span class="vc-attr">class</span>=<span class="vc-str">"badge"</span><span class="vc-tag">&gt;</span>Software Engineer<span class="vc-tag">&lt;/div&gt;</span>
    <span class="vc-tag">&lt;button</span> <span class="vc-attr">@click</span>=<span class="vc-str">"$emit('start-slideshow')"</span><span class="vc-tag">&gt;</span>
      ▶ Watch About me
    <span class="vc-tag">&lt;/button&gt;</span>
  <span class="vc-tag">&lt;/div&gt;</span>
<span class="vc-tag">&lt;/template&gt;</span>`,

  'SidebarNav.vue': `<span class="vc-tag">&lt;script setup&gt;</span>
<span class="vc-kw">const</span> props <span class="vc-op">=</span> <span class="vc-fn">defineProps</span>({
  modelValue: String,
  isPlaying: Boolean
})
<span class="vc-kw">const</span> emit <span class="vc-op">=</span> <span class="vc-fn">defineEmits</span>([<span class="vc-str">'update:modelValue'</span>])
<span class="vc-tag">&lt;/script&gt;</span>`,
};

const vscContent = computed(() => vscContents[vscActiveFile.value] || '<span class="vc-comment">// Select a file</span>');
const vscLineCount = computed(() => {
  const lines = (vscContents[vscActiveFile.value] || '').split('\n').length;
  return Array.from({ length: lines }, (_, i) => i + 1);
});

// ─── SAFARI ──────────────────────────────────────────────────────────────────
const safariProjects = [
  { name:'AI Gateway Service', desc:'LLM routing & load balancing for production workloads' },
  { name:'MCP Generator',      desc:'AI-powered tool generation platform' },
  { name:'Virtual Assistant Jerry', desc:'Voice-enabled AI assistant with NLP' },
  { name:'AI SDLC Platform',   desc:'Development lifecycle automation with AI' },
];
const safariSkills = ['Vue 3','React','TypeScript','Python','FastAPI','Django','AWS','Docker','VS Code Extensions'];
</script>

<style scoped>
/* ── ROOT ── */
.macos-root {
  position: fixed;
  inset: 0;
  z-index: 100;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
  user-select: none;
}

/* ── BOOT ── */
.boot-screen {
  position: absolute;
  inset: 0;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;
}
.boot-logo { display: flex; align-items: center; justify-content: center; }
.boot-bar-wrap { width: 200px; }
.boot-bar-track { width: 100%; height: 4px; background: rgba(255,255,255,0.15); border-radius: 2px; overflow: hidden; }
.boot-bar-fill { height: 100%; background: white; border-radius: 2px; transition: width 0.05s linear; }

/* ── LOGIN ── */
.login-screen {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: radial-gradient(ellipse at 40% 30%, #2d1b69 0%, #0f0c29 50%, #000 100%);
}
.login-time { font-size: 88px; font-weight: 200; color: white; line-height: 1; letter-spacing: -3px; }
.login-date { font-size: 20px; color: rgba(255,255,255,0.8); font-weight: 300; margin-bottom: 32px; }
.login-card { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.login-avatar {
  width: 72px; height: 72px; border-radius: 50%;
  background: linear-gradient(135deg, #4c6ef5, #7c3aed);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; font-weight: 600; color: white;
  box-shadow: 0 0 0 3px rgba(255,255,255,0.2);
}
.login-name { color: white; font-size: 17px; font-weight: 400; }
.login-pw-row { display: flex; align-items: center; gap: 8px; }
.login-pw-input {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  padding: 8px 14px;
  color: white;
  font-size: 14px;
  width: 180px;
  outline: none;
  backdrop-filter: blur(10px);
}
.login-pw-input::placeholder { color: rgba(255,255,255,0.5); }
.login-arrow {
  width: 32px; height: 32px;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}
.login-arrow:hover { background: rgba(255,255,255,0.35); }
.login-hint { font-size: 12px; color: rgba(255,255,255,0.4); }

/* ── DESKTOP ── */
.desktop {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.wallpaper {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 20%, rgba(124,58,237,0.6) 0%, transparent 45%),
    radial-gradient(ellipse at 80% 10%, rgba(76,110,245,0.5) 0%, transparent 40%),
    radial-gradient(ellipse at 60% 80%, rgba(16,185,129,0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 10% 90%, rgba(245,158,11,0.3) 0%, transparent 45%),
    linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
}

/* ── MENU BAR ── */
.menubar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 28px;
  background: rgba(20,20,30,0.82);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  z-index: 200;
}
.menubar-left { display: flex; align-items: center; gap: 2px; }
.menubar-right { display: flex; align-items: center; gap: 10px; }
.mb-item {
  position: relative;
  padding: 0 8px;
  height: 22px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  color: white;
  font-size: 13px;
  cursor: default;
  white-space: nowrap;
  gap: 4px;
}
.mb-item:hover { background: rgba(255,255,255,0.12); }
.apple-btn { padding: 0 10px; font-size: 15px; }
.app-name { font-weight: 600; font-size: 13px; }
.mb-status { color: rgba(255,255,255,0.85); font-size: 12px; display: flex; align-items: center; gap: 5px; }
.mb-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: rgba(30,30,42,0.95);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 6px;
  padding: 4px 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  z-index: 300;
  margin-top: 2px;
}
.mb-drop-item {
  padding: 4px 16px;
  font-size: 13px;
  color: rgba(255,255,255,0.85);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
}
.mb-drop-item:hover { background: #4c6ef5; color: white; }
.mb-drop-item.bold { font-weight: 600; }
.mb-drop-sep { height: 1px; background: rgba(255,255,255,0.1); margin: 4px 0; }
.mb-shortcut { color: rgba(255,255,255,0.4); font-size: 12px; }

/* ── DESKTOP ICONS ── */
.dsk-icon {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: default;
  width: 72px;
}
.dsk-icon:hover .dsk-icon-label { color: white; }
.dsk-icon-img { display: flex; align-items: center; justify-content: center; }
.dsk-icon-label {
  color: rgba(255,255,255,0.85);
  font-size: 11px;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0,0,0,0.8);
  white-space: nowrap;
}

/* ── CONTEXT MENU ── */
.ctx-menu {
  position: absolute;
  min-width: 180px;
  background: rgba(30,30,42,0.96);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 4px 0;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  z-index: 500;
}
.ctx-item { padding: 5px 16px; font-size: 13px; color: rgba(255,255,255,0.85); cursor: default; }
.ctx-item:hover { background: #4c6ef5; color: white; }
.ctx-sep { height: 1px; background: rgba(255,255,255,0.1); margin: 4px 0; }

/* ── MAC WINDOW ── */
.mac-window {
  position: absolute;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.08);
  display: flex;
  flex-direction: column;
  background: #1e1e2e;
}
.win-titlebar {
  height: 40px;
  background: linear-gradient(180deg, #2a2a3e 0%, #252535 100%);
  display: flex;
  align-items: center;
  padding: 0 14px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(0,0,0,0.3);
  cursor: grab;
}
.win-titlebar:active { cursor: grabbing; }
.traffic-lights { display: flex; gap: 7px; }
.tl {
  width: 12px; height: 12px; border-radius: 50%; cursor: pointer;
  transition: filter 0.15s;
}
.tl:hover { filter: brightness(1.3); }
.tl.red    { background: #ff5f57; box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.15); }
.tl.yellow { background: #febc2e; box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.15); }
.tl.green  { background: #28c840; box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.15); }
.win-title {
  flex: 1;
  text-align: center;
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  font-weight: 500;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 80px;
}
.win-body { flex: 1; overflow: hidden; display: flex; }

/* ── FINDER ── */
.finder-layout { display: flex; width: 100%; height: 100%; }
.finder-sidebar {
  width: 180px;
  background: rgba(255,255,255,0.04);
  border-right: 1px solid rgba(255,255,255,0.07);
  padding: 8px 0;
  flex-shrink: 0;
  overflow-y: auto;
}
.finder-section-label {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.3);
  padding: 6px 16px 2px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.finder-fav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  font-size: 13px;
  color: rgba(255,255,255,0.75);
  cursor: default;
  border-radius: 6px;
  margin: 0 4px;
  transition: background 0.1s;
}
.finder-fav-item:hover { background: rgba(255,255,255,0.06); }
.finder-fav-item.active { background: rgba(76,110,245,0.3); color: #7dd3fc; }
.fav-icon { font-size: 14px; }
.finder-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.finder-toolbar {
  height: 38px;
  background: rgba(255,255,255,0.03);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 10px;
  flex-shrink: 0;
}
.finder-toolbar-btns { display: flex; gap: 2px; }
.finder-tb-btn {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 5px;
  width: 24px; height: 22px;
  color: rgba(255,255,255,0.7);
  font-size: 14px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.finder-path-label { flex: 1; font-size: 13px; color: rgba(255,255,255,0.6); font-weight: 500; }
.finder-view-toggle { display: flex; gap: 2px; }
.fvt-btn {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 4px;
  width: 26px; height: 22px;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  font-size: 12px;
}
.fvt-btn.active { background: rgba(76,110,245,0.3); color: #7dd3fc; }
.finder-file-header {
  display: grid;
  grid-template-columns: 1fr 130px 80px 100px;
  padding: 4px 16px;
  font-size: 11px;
  color: rgba(255,255,255,0.3);
  font-weight: 500;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-shrink: 0;
}
.finder-files-list { flex: 1; overflow-y: auto; padding: 4px 0; }
.finder-file-row {
  display: grid;
  grid-template-columns: 1fr 130px 80px 100px;
  padding: 5px 16px;
  font-size: 13px;
  color: rgba(255,255,255,0.75);
  cursor: default;
  transition: background 0.1s;
}
.finder-file-row:hover { background: rgba(255,255,255,0.05); }
.finder-file-row.selected { background: rgba(76,110,245,0.25); color: #bdd5ff; }
.ff-name { display: flex; align-items: center; gap: 8px; }
.ff-icon { font-size: 15px; }
.ff-date, .ff-size, .ff-kind { color: rgba(255,255,255,0.4); font-size: 12px; display: flex; align-items: center; }

/* ── TERMINAL ── */
.terminal-layout {
  flex: 1;
  background: #0d1117;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: text;
}
.term-output {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
  font-family: 'SF Mono', 'Fira Code', Menlo, Monaco, monospace;
  font-size: 12.5px;
  line-height: 1.6;
  color: #cdd3de;
}
.term-sys { color: rgba(255,255,255,0.35); font-size: 11.5px; }
.term-prompt { color: #56c1ff; font-weight: 600; }
.term-cmd { color: #cdd3de; }
.term-out { margin: 0; color: rgba(255,255,255,0.7); white-space: pre-wrap; word-break: break-word; }
.term-neo { margin: 0; color: #cdd3de; white-space: pre; font-size: 11.5px; line-height: 1.5; }
.term-current-line { display: flex; align-items: baseline; gap: 0; margin-top: 2px; }
.term-cursor { color: #56c1ff; animation: blink 1s step-end infinite; font-size: 13px; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
.term-hidden-input { position: absolute; opacity: 0; pointer-events: none; left: -9999px; }

/* ── VS CODE ── */
.vsc-layout { display: flex; width: 100%; height: 100%; background: #1e1e2e; }
.vsc-sidebar {
  width: 200px;
  background: #16162a;
  border-right: 1px solid rgba(255,255,255,0.06);
  overflow-y: auto;
  flex-shrink: 0;
  padding: 8px 0;
}
.vsc-sidebar-title {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.3);
  padding: 8px 14px 6px;
}
.vsc-tree-item {
  padding: 3px 14px;
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}
.vsc-tree-item:hover { background: rgba(255,255,255,0.05); }
.vsc-tree-item.active { background: rgba(76,110,245,0.2); color: white; }
.vsc-tree-item.folder { color: rgba(255,255,255,0.5); cursor: default; }
.indent1 { padding-left: 26px; }
.indent2 { padding-left: 40px; }
.vsc-file-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.vsc-file-dot.green  { background: #28c840; }
.vsc-file-dot.yellow { background: #febc2e; }
.vsc-file-dot.blue   { background: #4c6ef5; }
.vsc-editor-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.vsc-tabs {
  display: flex;
  background: #16162a;
  border-bottom: 1px solid rgba(0,0,0,0.3);
  flex-shrink: 0;
  overflow-x: auto;
}
.vsc-tab {
  padding: 0 16px;
  height: 35px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  border-right: 1px solid rgba(0,0,0,0.2);
  white-space: nowrap;
  flex-shrink: 0;
}
.vsc-tab.active { background: #1e1e2e; color: white; border-bottom: 1px solid #4c6ef5; }
.vsc-tab-close { opacity: 0; color: rgba(255,255,255,0.5); font-size: 15px; line-height: 1; }
.vsc-tab:hover .vsc-tab-close { opacity: 1; }
.vsc-editor { flex: 1; display: flex; overflow: auto; }
.vsc-line-nums {
  padding: 12px 0;
  min-width: 44px;
  text-align: right;
  padding-right: 12px;
  color: rgba(255,255,255,0.18);
  font-family: 'SF Mono', Menlo, monospace;
  font-size: 13px;
  line-height: 1.7;
  background: #1e1e2e;
  flex-shrink: 0;
  border-right: 1px solid rgba(255,255,255,0.05);
}
.vsc-ln { height: 22px; display: flex; align-items: center; justify-content: flex-end; }
.vsc-code {
  flex: 1;
  padding: 12px 20px;
  margin: 0;
  font-family: 'SF Mono', 'Fira Code', Menlo, monospace;
  font-size: 13px;
  line-height: 1.7;
  color: #cdd3de;
  white-space: pre;
  overflow: visible;
  background: #1e1e2e;
}
:deep(.vc-tag)     { color: #7dd3fc; }
:deep(.vc-kw)      { color: #c084fc; }
:deep(.vc-str)     { color: #86efac; }
:deep(.vc-fn)      { color: #fbbf24; }
:deep(.vc-attr)    { color: #7dd3fc; }
:deep(.vc-op)      { color: #94a3b8; }
:deep(.vc-comment) { color: #4b5563; font-style: italic; }

/* ── SAFARI ── */
.safari-layout { display: flex; flex-direction: column; width: 100%; height: 100%; background: #fff; }
.safari-bar {
  height: 44px;
  background: #f5f5f7;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 10px;
  flex-shrink: 0;
}
.safari-nav-btns { display: flex; gap: 2px; }
.safari-nav-btn {
  width: 28px; height: 28px;
  background: transparent;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  color: #666;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.safari-nav-btn:hover { background: rgba(0,0,0,0.08); }
.safari-url-wrap {
  flex: 1;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
}
.safari-url-text { font-size: 13px; color: #333; }
.safari-content { flex: 1; overflow-y: auto; background: white; }
.safari-hero {
  padding: 60px 40px 40px;
  background: linear-gradient(135deg, #1a1a2e 0%, #302b63 100%);
  color: white;
  text-align: center;
}
.safari-hero h1 { font-size: 36px; font-weight: 700; line-height: 1.2; margin: 0 0 20px; }
.safari-name { color: #7dd3fc; }
.safari-badge {
  display: inline-block;
  padding: 6px 18px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  font-size: 14px;
  backdrop-filter: blur(10px);
}
.safari-section { padding: 32px 40px; }
.safari-section h2 { font-size: 22px; font-weight: 600; color: #1a1a2e; margin: 0 0 16px; }
.safari-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.safari-card {
  background: #f8f8fc;
  border: 1px solid #e8e8f0;
  border-radius: 12px;
  padding: 16px;
}
.safari-card h3 { font-size: 14px; font-weight: 600; color: #1a1a2e; margin: 0 0 6px; }
.safari-card p { font-size: 13px; color: #666; margin: 0; line-height: 1.4; }
.safari-skills { display: flex; flex-wrap: wrap; gap: 8px; }
.safari-skill-chip {
  padding: 5px 14px;
  background: #eef0ff;
  border: 1px solid #c8d0ff;
  border-radius: 20px;
  font-size: 13px;
  color: #3730a3;
  font-weight: 500;
}

/* ── ABOUT THIS MAC ── */
.about-layout { display: flex; width: 100%; height: 100%; background: #f0f0f5; align-items: center; justify-content: center; gap: 40px; padding: 24px; }
.about-left { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.about-model { font-size: 14px; font-weight: 600; color: #1a1a2e; }
.about-submodel { font-size: 12px; color: #666; }
.about-right { display: flex; flex-direction: column; gap: 10px; }
.about-title { font-size: 18px; font-weight: 600; color: #1a1a2e; margin-bottom: 4px; }
.about-spec-row { display: flex; gap: 16px; font-size: 13px; }
.about-spec-k { color: #666; min-width: 90px; }
.about-spec-v { color: #1a1a2e; font-weight: 500; }
.about-more-btn {
  margin-top: 8px;
  padding: 7px 18px;
  background: linear-gradient(180deg, #fff 0%, #f0f0f5 100%);
  border: 1px solid #ccc;
  border-radius: 7px;
  font-size: 13px;
  cursor: pointer;
  color: #1a1a2e;
  align-self: flex-start;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.about-more-btn:hover { background: linear-gradient(180deg, #f0f0f5 0%, #e8e8f0 100%); }

/* ── DOCK ── */
.dock-outer {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 150;
}
.dock-inner {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 18px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
}
.dock-item { position: relative; cursor: pointer; display: flex; flex-direction: column; align-items: center; }
.dock-icon-wrap { position: relative; display: flex; flex-direction: column; align-items: center; }
.dock-icon-bg {
  width: 52px; height: 52px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  overflow: hidden;
}
.dock-emoji { font-size: 26px; line-height: 1; }
.dock-label-icon { font-size: 18px; color: white; font-weight: 700; font-family: monospace; }
.dock-dot {
  width: 4px; height: 4px;
  background: rgba(255,255,255,0.8);
  border-radius: 50%;
  margin-top: 3px;
}
.dock-tooltip {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(20,20,30,0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  color: white;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;
}
.dock-item:hover .dock-tooltip { opacity: 1; }
.dock-divider { width: 1px; height: 52px; background: rgba(255,255,255,0.2); margin: 0 4px; }

/* ── TRANSITIONS ── */
.boot-fade-leave-active { transition: opacity 0.5s ease; }
.boot-fade-leave-to { opacity: 0; }
.login-fade-enter-active { transition: opacity 0.6s ease; }
.login-fade-enter-from { opacity: 0; }
.login-fade-leave-active { transition: opacity 0.5s ease; }
.login-fade-leave-to { opacity: 0; }
.desktop-fade-enter-active { transition: opacity 0.8s ease; }
.desktop-fade-enter-from { opacity: 0; }

.logo-pop-enter-active { transition: opacity 0.8s ease, transform 0.8s ease; }
.logo-pop-enter-from { opacity: 0; transform: scale(0.85); }
.bar-slide-enter-active { transition: opacity 0.5s ease; }
.bar-slide-enter-from { opacity: 0; }

/* ── SCROLLBARS ── */
.term-output::-webkit-scrollbar,
.finder-sidebar::-webkit-scrollbar,
.finder-files-list::-webkit-scrollbar,
.vsc-sidebar::-webkit-scrollbar,
.safari-content::-webkit-scrollbar { width: 6px; }
.term-output::-webkit-scrollbar-track,
.finder-files-list::-webkit-scrollbar-track,
.vsc-sidebar::-webkit-scrollbar-track { background: transparent; }
.term-output::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
.finder-files-list::-webkit-scrollbar-thumb,
.vsc-sidebar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 3px; }
.safari-content::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 3px; }
</style>
