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
              <svg viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" stroke-width="2.5" width="13" height="13">
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="13" height="13">
                <circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/>
              </svg>
            </span>
            <span class="mb-status">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="12">
                <rect x="0" y="2" width="19" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
                <rect x="19.5" y="5" width="2" height="4" rx="1" fill="currentColor" opacity="0.5"/>
                <rect x="1.5" y="3.5" width="13" height="7" rx="1.5" fill="currentColor" opacity="0.8"/>
              </svg>
            </span>
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
            <svg viewBox="0 0 60 60" width="56" height="56"><defs><linearGradient id="dfi" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#42a5f5"/><stop offset="100%" stop-color="#1e88e5"/></linearGradient></defs><rect width="60" height="60" rx="14" fill="url(#dfi)"/><ellipse cx="22" cy="26" rx="9" ry="11" fill="#1a3a6b"/><ellipse cx="24" cy="24" rx="4" ry="5.5" fill="white"/><circle cx="23" cy="24" r="2.2" fill="#1a3a6b"/><ellipse cx="38" cy="26" rx="9" ry="11" fill="#f5f5f5"/><ellipse cx="40" cy="24" rx="4" ry="5.5" fill="white"/><circle cx="39" cy="24" r="2.2" fill="#444"/><path d="M15 37 Q22 43 29 37" stroke="#1a3a6b" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M31 37 Q38 42 45 37" stroke="#555" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>
          </div>
          <div class="dsk-icon-label">Finder</div>
        </div>
        <div class="dsk-icon" style="top:124px;right:16px" @dblclick="openApp('terminal')">
          <div class="dsk-icon-img">
            <svg viewBox="0 0 60 60" width="56" height="56"><defs><linearGradient id="dti" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3c3c3c"/><stop offset="100%" stop-color="#1a1a1a"/></linearGradient></defs><rect width="60" height="60" rx="14" fill="url(#dti)"/><text x="10" y="32" font-family="monospace" font-size="14" fill="#2ecc71" font-weight="bold">%</text><text x="20" y="32" font-family="monospace" font-size="12" fill="rgba(255,255,255,0.7)">ls</text><rect x="10" y="37" width="26" height="2" rx="1" fill="#2ecc71" opacity="0.4"/></svg>
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
        <TransitionGroup name="win">
        <div
          v-for="win in openWindows"
          :key="win.id"
          class="mac-window"
          :style="{ left: win.x+'px', top: win.y+'px', width: win.w+'px', height: win.h+'px', zIndex: win.z }"
          @mousedown="focusWin(win.id)"
        >
          <!-- Title Bar -->
          <div class="win-titlebar" @mousedown.stop="startDrag($event, win)">
            <div class="traffic-lights">
              <div class="tl red" @click.stop="closeWin(win.id)"><span class="tl-sym">×</span></div>
              <div class="tl yellow" @click.stop="minimizeWin(win.id)"><span class="tl-sym">−</span></div>
              <div class="tl green" @click.stop><span class="tl-sym">+</span></div>
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

            <!-- MUSIC -->
            <template v-else-if="win.app === 'music'">
              <div class="music-layout">
                <!-- Hidden YouTube iframe target -->
                <div id="yt-music-div" style="position:absolute;width:1px;height:1px;opacity:0.01;pointer-events:none;overflow:hidden"></div>

                <!-- Blurred background wash -->
                <div class="music-bg-wash" :style="{ background: currentMusicTrack.art }"></div>

                <!-- Left: vinyl art -->
                <div class="music-vinyl-side">
                  <div class="music-art-wrap">
                    <div class="music-art" :class="{ 'music-art-spin': musicIsPlaying }" :style="{ background: currentMusicTrack.art }">
                      <div class="music-vinyl-ring"></div>
                      <div class="music-vinyl-center"></div>
                      <div class="music-vinyl-hole"></div>
                    </div>
                    <div class="music-art-shadow" :style="{ background: currentMusicTrack.art }"></div>
                  </div>
                </div>

                <!-- Right: info + controls -->
                <div class="music-info-side">
                  <!-- Equalizer bars -->
                  <div class="music-eq" :class="{ 'music-eq-active': musicIsPlaying }">
                    <div v-for="b in 9" :key="b" class="music-eq-bar"
                      :style="{ animationDelay: (b * 0.07) + 's', animationDuration: (0.35 + b * 0.05) + 's' }"></div>
                  </div>

                  <!-- Track meta -->
                  <div class="music-meta">
                    <div class="music-track-name">{{ currentMusicTrack.title }}</div>
                    <div class="music-track-artist">{{ currentMusicTrack.artist }}</div>
                    <div class="music-track-album">{{ currentMusicTrack.album }}</div>
                  </div>

                  <!-- Play / Pause -->
                  <div class="music-controls">
                    <button class="mc-play" @click="toggleMusicPlay" :class="{ loading: !musicYtReady }">
                      <svg v-if="!musicIsPlaying" viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M8 5v14l11-7z"/></svg>
                      <svg v-else viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    </button>
                  </div>

                  <!-- Loading indicator -->
                  <div v-if="!musicYtReady" class="music-loading">
                    <div class="music-spin-ring"></div>
                    <span>Loading…</span>
                  </div>

                  <!-- Volume -->
                  <div class="music-vol-row">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" style="opacity:0.4;flex-shrink:0"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
                    <input type="range" min="0" max="100" v-model="musicVolume" @input="setMusicVolume" class="music-vol-slider"/>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" style="opacity:0.4;flex-shrink:0"><path d="M3 9v6h4l5 5V4L7 9H3zm16.5 3c0-4.53-2.5-8.44-6.18-10.4v20.8c3.68-1.96 6.18-5.87 6.18-10.4z"/></svg>
                  </div>
                </div>
              </div>
            </template>

            <!-- TETRIS -->
            <template v-else-if="win.app === 'tetris'">
              <div class="tetris-layout">
                <div class="tetris-main">
                  <div class="tetris-board">
                    <div v-for="(row, ri) in tetrisDisplayBoard" :key="ri" class="tetris-row">
                      <div
                        v-for="(cell, ci) in row"
                        :key="ci"
                        class="tetris-cell"
                        :style="cell ? { background: cell, boxShadow: 'inset 2px 2px 5px rgba(255,255,255,0.25), inset -1px -1px 3px rgba(0,0,0,0.5)' } : {}"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="tetris-sidebar">
                  <div class="tetris-next-label">Next</div>
                  <div class="tetris-next-board">
                    <div v-for="(row, ri) in tetrisNextBoard" :key="ri" class="tetris-row">
                      <div
                        v-for="(cell, ci) in row"
                        :key="ci"
                        class="tetris-cell tetris-cell-sm"
                        :style="cell ? { background: cell } : {}"
                      ></div>
                    </div>
                  </div>
                  <div class="tetris-stats">
                    <div class="tetris-stat-row"><span class="tetris-stat-label">Score</span><span class="tetris-stat-val">{{ tetrisScore }}</span></div>
                    <div class="tetris-stat-row"><span class="tetris-stat-label">Level</span><span class="tetris-stat-val">{{ tetrisLevel }}</span></div>
                    <div class="tetris-stat-row"><span class="tetris-stat-label">Lines</span><span class="tetris-stat-val">{{ tetrisLines }}</span></div>
                  </div>
                  <div class="tetris-btns">
                    <button
                      v-if="tetrisGameOver || !tetrisCurrent"
                      class="tetris-btn"
                      @click="startTetris"
                    >{{ tetrisGameOver ? 'Restart' : 'Start' }}</button>
                    <button v-else class="tetris-btn" @click="tetrisTogglePause">
                      {{ tetrisPaused ? 'Resume' : 'Pause' }}
                    </button>
                  </div>
                  <div class="tetris-hint">
                    <div>← → &nbsp;Move</div>
                    <div>↑ &nbsp;&nbsp;&nbsp;&nbsp;Rotate</div>
                    <div>↓ &nbsp;&nbsp;&nbsp;&nbsp;Soft drop</div>
                    <div>Space Hard drop</div>
                    <div>P &nbsp;&nbsp;&nbsp;&nbsp;Pause</div>
                  </div>
                </div>
                <div v-if="tetrisGameOver" class="tetris-overlay">
                  <div class="tetris-overlay-title">Game Over</div>
                  <div class="tetris-overlay-score">Score: {{ tetrisScore }}</div>
                  <button class="tetris-btn tetris-btn-lg" @click="startTetris">Play Again</button>
                </div>
                <div v-else-if="tetrisPaused" class="tetris-overlay">
                  <div class="tetris-overlay-title">Paused</div>
                  <button class="tetris-btn tetris-btn-lg" @click="tetrisTogglePause">Resume</button>
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
        </TransitionGroup>

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
                <div class="dock-icon-bg" v-html="getDockIcon(app.id)"></div>
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
  document.addEventListener('keydown', handleTetrisKey);
});

onUnmounted(() => {
  clearInterval(clockTimer);
  if (tetrisInterval) clearInterval(tetrisInterval);
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('keydown', handleTetrisKey);
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
  music:    { title: 'Music', w: 680, h: 420 },
  tetris:   { title: 'Tetris', w: 460, h: 520 },
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
  return { finder:'Finder', terminal:'Terminal', vscode:'Code', safari:'Safari', about:'System Information', music:'Music', tetris:'Tetris' }[id] || id;
}

function closeWin(id) { windows.value = windows.value.filter(w => w.id !== id); }
function minimizeWin(id) { const w = windows.value.find(w => w.id === id); if (w) w.minimized = true; }
function focusWin(id) { const w = windows.value.find(w => w.id === id); if (w) { w.z = ++zTop; focusedApp.value = appLabel(w.app); } }
function isOpen(appId) { return windows.value.some(w => w.app === appId && !w.minimized); }
const openWindows = computed(() => windows.value.filter(w => !w.minimized));

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
  { id:'finder',   name:'Finder'   },
  { id:'safari',   name:'Safari'   },
  { id:'music',    name:'Music'    },
  { id:'tetris',   name:'Tetris'   },
  { id:'terminal', name:'Terminal' },
  { id:'vscode',   name:'VS Code'  },
  { id:'',         name:'', sep:true },
  { id:'about',    name:'About'    },
];

function dockScale(i) {
  const d = Math.abs(hovDock.value - i);
  const s = hovDock.value < 0 ? 1 : d === 0 ? 1.55 : d === 1 ? 1.25 : d === 2 ? 1.08 : 1;
  const ty = hovDock.value >= 0 && d <= 2 ? -10 * Math.max(0, 1.55 - d * 0.5) : 0;
  return { transform: `scale(${s}) translateY(${ty}px)`, transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)' };
}

const dockIconSvgs = {
  finder: `<svg viewBox="0 0 60 60" width="54" height="54"><rect width="60" height="60" rx="14" fill="url(#fg)"/><defs><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#64b5f6"/><stop offset="100%" stop-color="#1565c0"/></linearGradient></defs><rect x="2" y="2" width="56" height="56" rx="13" fill="url(#fg2)"/><defs><linearGradient id="fg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#42a5f5"/><stop offset="100%" stop-color="#1e88e5"/></linearGradient></defs><ellipse cx="22" cy="26" rx="9" ry="11" fill="#1a3a6b"/><ellipse cx="24" cy="24" rx="4" ry="5.5" fill="white"/><circle cx="23" cy="24" r="2.2" fill="#1a3a6b"/><ellipse cx="38" cy="26" rx="9" ry="11" fill="#f5f5f5"/><ellipse cx="40" cy="24" rx="4" ry="5.5" fill="white"/><circle cx="39" cy="24" r="2.2" fill="#444"/><path d="M15 37 Q22 43 29 37" stroke="#1a3a6b" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M31 37 Q38 42 45 37" stroke="#555" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`,

  safari: `<svg viewBox="0 0 60 60" width="54" height="54"><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#64d2ff"/><stop offset="100%" stop-color="#007aff"/></linearGradient></defs><rect width="60" height="60" rx="14" fill="url(#sg)"/><circle cx="30" cy="30" r="19" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/><circle cx="30" cy="30" r="19" fill="rgba(255,255,255,0.08)"/><line x1="30" y1="11" x2="30" y2="49" stroke="rgba(255,255,255,0.2)" stroke-width="1"/><line x1="11" y1="30" x2="49" y2="30" stroke="rgba(255,255,255,0.2)" stroke-width="1"/><polygon points="30,13 34,26 30,24 26,26" fill="#ff4444"/><polygon points="30,47 26,34 30,36 34,34" fill="rgba(255,255,255,0.5)"/><circle cx="30" cy="30" r="3" fill="white" opacity="0.9"/></svg>`,

  terminal: `<svg viewBox="0 0 60 60" width="54" height="54"><defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3c3c3c"/><stop offset="100%" stop-color="#1a1a1a"/></linearGradient></defs><rect width="60" height="60" rx="14" fill="url(#tg)"/><text x="10" y="32" font-family="monospace" font-size="14" fill="#2ecc71" font-weight="bold">%</text><text x="20" y="32" font-family="monospace" font-size="12" fill="rgba(255,255,255,0.7)">ls</text><rect x="10" y="37" width="26" height="2" rx="1" fill="#2ecc71" opacity="0.4"/><text x="10" y="20" font-family="monospace" font-size="9" fill="rgba(255,255,255,0.25)">zsh — 80×24</text></svg>`,

  vscode: `<svg viewBox="0 0 60 60" width="54" height="54"><defs><linearGradient id="vg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2b5f9e"/><stop offset="100%" stop-color="#1a3d6e"/></linearGradient></defs><rect width="60" height="60" rx="14" fill="url(#vg)"/><path d="M43 10 L20 32 L12 24 L8 28 L20 41 L47 14 Z" fill="white" opacity="0.95"/><path d="M43 10 L47 14 L47 46 L43 50 L20 32 Z" fill="rgba(255,255,255,0.55)"/></svg>`,

  about: `<svg viewBox="0 0 60 60" width="54" height="54"><defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#555"/><stop offset="100%" stop-color="#1a1a1a"/></linearGradient></defs><rect width="60" height="60" rx="14" fill="url(#ag)"/><path d="M38 14C38 14 40 10 36 6C32 8 31 12 31 12C29 11 27 11 25 12C25 12 24 8 20 6C16 10 18 14 18 14C14 17 12 22 12 27C12 40 20 48 30 48C40 48 48 40 48 27C48 22 42 17 38 14Z" fill="white" opacity="0.9"/></svg>`,

  music: `<svg viewBox="0 0 60 60" width="54" height="54"><defs><linearGradient id="mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fc4494"/><stop offset="100%" stop-color="#c0392b"/></linearGradient></defs><rect width="60" height="60" rx="14" fill="url(#mg)"/><ellipse cx="22" cy="44" rx="9" ry="6" fill="white" opacity="0.9"/><ellipse cx="38" cy="41" rx="9" ry="6" fill="white" opacity="0.9"/><rect x="29" y="18" width="3.5" height="26" fill="white" opacity="0.9"/><rect x="45" y="14" width="3.5" height="27" fill="white" opacity="0.9"/><rect x="29" y="18" width="19" height="5" rx="2" fill="white" opacity="0.9"/></svg>`,

  tetris: `<svg viewBox="0 0 60 60" width="54" height="54"><defs><linearGradient id="tetg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a1a2e"/><stop offset="100%" stop-color="#0f0f1a"/></linearGradient></defs><rect width="60" height="60" rx="14" fill="url(#tetg)"/><rect x="8" y="10" width="10" height="10" rx="2" fill="#00f0f0"/><rect x="20" y="10" width="10" height="10" rx="2" fill="#00f0f0"/><rect x="32" y="10" width="10" height="10" rx="2" fill="#00f0f0"/><rect x="44" y="10" width="10" height="10" rx="2" fill="#00f0f0"/><rect x="8" y="22" width="10" height="10" rx="2" fill="#f0a000"/><rect x="8" y="34" width="10" height="10" rx="2" fill="#f0a000"/><rect x="20" y="34" width="10" height="10" rx="2" fill="#f0a000"/><rect x="32" y="34" width="10" height="10" rx="2" fill="#f0a000"/><rect x="32" y="22" width="10" height="10" rx="2" fill="#a000f0"/><rect x="44" y="22" width="10" height="10" rx="2" fill="#a000f0"/><rect x="44" y="34" width="10" height="10" rx="2" fill="#a000f0"/><rect x="20" y="22" width="10" height="10" rx="2" fill="#f00000"/><rect x="8" y="46" width="10" height="10" rx="2" fill="#00f000"/><rect x="20" y="46" width="10" height="10" rx="2" fill="#00f000"/><rect x="32" y="46" width="10" height="10" rx="2" fill="#00f000"/><rect x="44" y="46" width="10" height="10" rx="2" fill="#00f000"/></svg>`,
};

function getDockIcon(id) { return dockIconSvgs[id] || ''; }

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

// ─── MUSIC PLAYER ────────────────────────────────────────────────────────────
const musicTracks = [
  {
    title: 'Priya Phool',
    artist: 'Kobid Bazra ft. Sujan Chapagain',
    album: 'Unko Sweater OST',
    ytId: 'Jzyc5ynowtc',
    art: 'linear-gradient(135deg, #e879a0 0%, #9b59b6 50%, #5c3d8f 100%)',
    live: false,
  },
];

const musicTrackIdx = ref(0);
const musicIsPlaying = ref(false);
const musicVolume = ref(75);
const musicYtReady = ref(false);
let ytPlayer = null;
let ytApiLoaded = false;

const currentMusicTrack = computed(() => musicTracks[musicTrackIdx.value]);

function initYTPlayer() {
  if (ytApiLoaded || window.YT?.Player) {
    createYTPlayer();
    return;
  }
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  window.onYouTubeIframeAPIReady = () => { ytApiLoaded = true; createYTPlayer(); };
  document.head.appendChild(tag);
  ytApiLoaded = true;
}

function createYTPlayer() {
  nextTick(() => {
    const el = document.getElementById('yt-music-div');
    if (!el || !window.YT?.Player) {
      setTimeout(createYTPlayer, 300);
      return;
    }
    if (ytPlayer) { ytPlayer.destroy(); ytPlayer = null; }
    ytPlayer = new window.YT.Player('yt-music-div', {
      height: '1', width: '1',
      videoId: currentMusicTrack.value.ytId,
      playerVars: { autoplay: 1, controls: 0, rel: 0, playsinline: 1, fs: 0, disablekb: 1 },
      events: {
        onReady: (e) => {
          musicYtReady.value = true;
          e.target.setVolume(parseInt(musicVolume.value));
          e.target.playVideo();
          nextTick(() => {
            const s = document.querySelector('.music-vol-slider');
            if (s) s.style.setProperty('--val', musicVolume.value + '%');
          });
        },
        onStateChange: (e) => {
          musicIsPlaying.value = e.data === 1;
        },
      },
    });
  });
}

function toggleMusicPlay() {
  if (!ytPlayer || !musicYtReady.value) return;
  musicIsPlaying.value ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
}

function nextMusicTrack() {
  musicTrackIdx.value = (musicTrackIdx.value + 1) % musicTracks.length;
  if (ytPlayer && musicYtReady.value) {
    ytPlayer.loadVideoById(currentMusicTrack.value.ytId);
    if (musicIsPlaying.value) ytPlayer.playVideo();
  }
}

function prevMusicTrack() {
  musicTrackIdx.value = (musicTrackIdx.value - 1 + musicTracks.length) % musicTracks.length;
  if (ytPlayer && musicYtReady.value) {
    ytPlayer.loadVideoById(currentMusicTrack.value.ytId);
    if (musicIsPlaying.value) ytPlayer.playVideo();
  }
}

function setMusicVolume() {
  if (ytPlayer && musicYtReady.value) ytPlayer.setVolume(parseInt(musicVolume.value));
  const slider = document.querySelector('.music-vol-slider');
  if (slider) slider.style.setProperty('--val', musicVolume.value + '%');
}

function playMusicTrack(idx) {
  musicTrackIdx.value = idx;
  if (ytPlayer && musicYtReady.value) {
    ytPlayer.loadVideoById(currentMusicTrack.value.ytId);
    ytPlayer.playVideo();
    musicIsPlaying.value = true;
  }
}

watch(openWindows, (wins) => {
  const mwin = wins.find(w => w.app === 'music');
  if (mwin && !ytPlayer) {
    nextTick(() => initYTPlayer());
  }
  if (!mwin && ytPlayer) {
    ytPlayer.stopVideo();
    musicIsPlaying.value = false;
    ytPlayer.destroy();
    ytPlayer = null;
    musicYtReady.value = false;
  }
}, { deep: false });

// ─── TETRIS ──────────────────────────────────────────────────────────────────
const TETROMINOS = {
  I: { color: '#00f0f0', shapes: [[[0,0],[0,1],[0,2],[0,3]], [[0,2],[1,2],[2,2],[3,2]], [[2,0],[2,1],[2,2],[2,3]], [[0,1],[1,1],[2,1],[3,1]]] },
  O: { color: '#f0f000', shapes: [[[0,0],[0,1],[1,0],[1,1]]] },
  T: { color: '#a000f0', shapes: [[[0,1],[1,0],[1,1],[1,2]], [[0,1],[1,1],[2,1],[1,2]], [[1,0],[1,1],[1,2],[2,1]], [[0,1],[1,0],[1,1],[2,1]]] },
  S: { color: '#00f000', shapes: [[[0,1],[0,2],[1,0],[1,1]], [[0,1],[1,1],[1,2],[2,2]]] },
  Z: { color: '#f00000', shapes: [[[0,0],[0,1],[1,1],[1,2]], [[0,2],[1,1],[1,2],[2,1]]] },
  J: { color: '#0000f0', shapes: [[[0,0],[1,0],[1,1],[1,2]], [[0,1],[0,2],[1,1],[2,1]], [[1,0],[1,1],[1,2],[2,2]], [[0,1],[1,1],[2,0],[2,1]]] },
  L: { color: '#f0a000', shapes: [[[0,2],[1,0],[1,1],[1,2]], [[0,1],[1,1],[2,1],[2,2]], [[1,0],[1,1],[1,2],[2,0]], [[0,1],[0,2],[1,1],[2,1]]] },
};
const TETRO_TYPES = Object.keys(TETROMINOS);

function createEmptyBoard() { return Array.from({ length: 20 }, () => Array(10).fill(null)); }
function randomTetro() {
  const type = TETRO_TYPES[Math.floor(Math.random() * TETRO_TYPES.length)];
  return { type, rotation: 0, x: 3, y: 0 };
}

const tetrisBoard = ref(createEmptyBoard());
const tetrisCurrent = ref(null);
const tetrisNextPiece = ref(null);
const tetrisScore = ref(0);
const tetrisLines = ref(0);
const tetrisLevel = ref(1);
const tetrisGameOver = ref(false);
const tetrisPaused = ref(false);
let tetrisInterval = null;

function tetrisShape(piece) {
  const shapes = TETROMINOS[piece.type].shapes;
  return shapes[piece.rotation % shapes.length];
}

function tetrisCollides(piece, board, dx = 0, dy = 0, newRot = null) {
  const rot = newRot !== null ? newRot : piece.rotation;
  const shapes = TETROMINOS[piece.type].shapes;
  const shape = shapes[rot % shapes.length];
  for (const [r, c] of shape) {
    const nr = piece.y + r + dy;
    const nc = piece.x + c + dx;
    if (nr < 0 || nr >= 20 || nc < 0 || nc >= 10) return true;
    if (board[nr][nc]) return true;
  }
  return false;
}

function tetrisLockPiece(piece, board) {
  const color = TETROMINOS[piece.type].color;
  for (const [r, c] of tetrisShape(piece)) {
    const row = piece.y + r;
    const col = piece.x + c;
    if (row >= 0 && row < 20 && col >= 0 && col < 10) board[row][col] = color;
  }
}

function tetrisClearLines(board) {
  let cleared = 0;
  for (let r = 19; r >= 0; r--) {
    if (board[r].every(cell => cell !== null)) {
      board.splice(r, 1);
      board.unshift(Array(10).fill(null));
      cleared++;
      r++;
    }
  }
  return cleared;
}

const SCORE_TABLE = [0, 100, 300, 500, 800];

function tetrisSpawnNext() {
  const next = tetrisNextPiece.value || randomTetro();
  tetrisNextPiece.value = randomTetro();
  if (tetrisCollides(next, tetrisBoard.value)) {
    tetrisGameOver.value = true;
    tetrisCurrent.value = null;
    clearInterval(tetrisInterval);
    tetrisInterval = null;
    return;
  }
  tetrisCurrent.value = next;
}

function tetrisStep() {
  if (tetrisPaused.value || tetrisGameOver.value || !tetrisCurrent.value) return;
  const piece = tetrisCurrent.value;
  if (!tetrisCollides(piece, tetrisBoard.value, 0, 1)) {
    piece.y++;
  } else {
    const newBoard = tetrisBoard.value.map(row => [...row]);
    tetrisLockPiece(piece, newBoard);
    const cleared = tetrisClearLines(newBoard);
    tetrisBoard.value = newBoard;
    tetrisLines.value += cleared;
    tetrisScore.value += SCORE_TABLE[cleared] * tetrisLevel.value;
    const newLevel = Math.floor(tetrisLines.value / 10) + 1;
    if (newLevel !== tetrisLevel.value) {
      tetrisLevel.value = newLevel;
      clearInterval(tetrisInterval);
      tetrisInterval = setInterval(tetrisStep, Math.max(80, 800 - (tetrisLevel.value - 1) * 70));
    }
    tetrisCurrent.value = null;
    tetrisSpawnNext();
  }
}

function startTetris() {
  tetrisBoard.value = createEmptyBoard();
  tetrisScore.value = 0;
  tetrisLines.value = 0;
  tetrisLevel.value = 1;
  tetrisGameOver.value = false;
  tetrisPaused.value = false;
  tetrisCurrent.value = null;
  tetrisNextPiece.value = randomTetro();
  clearInterval(tetrisInterval);
  tetrisSpawnNext();
  tetrisInterval = setInterval(tetrisStep, 800);
}

function tetrisTogglePause() {
  if (tetrisGameOver.value || !tetrisCurrent.value) return;
  tetrisPaused.value = !tetrisPaused.value;
}

function tetrisMoveLeft() {
  if (!tetrisCurrent.value || tetrisPaused.value || tetrisGameOver.value) return;
  if (!tetrisCollides(tetrisCurrent.value, tetrisBoard.value, -1, 0)) tetrisCurrent.value.x--;
}

function tetrisMoveRight() {
  if (!tetrisCurrent.value || tetrisPaused.value || tetrisGameOver.value) return;
  if (!tetrisCollides(tetrisCurrent.value, tetrisBoard.value, 1, 0)) tetrisCurrent.value.x++;
}

function tetrisMoveDown() {
  if (!tetrisCurrent.value || tetrisPaused.value || tetrisGameOver.value) return;
  if (!tetrisCollides(tetrisCurrent.value, tetrisBoard.value, 0, 1)) {
    tetrisCurrent.value.y++;
    tetrisScore.value += 1;
  } else {
    tetrisStep();
  }
}

function tetrisRotate() {
  if (!tetrisCurrent.value || tetrisPaused.value || tetrisGameOver.value) return;
  const piece = tetrisCurrent.value;
  const shapes = TETROMINOS[piece.type].shapes;
  const newRot = (piece.rotation + 1) % shapes.length;
  for (const kick of [0, -1, 1, -2, 2]) {
    if (!tetrisCollides(piece, tetrisBoard.value, kick, 0, newRot)) {
      piece.rotation = newRot;
      piece.x += kick;
      return;
    }
  }
}

function tetrisHardDrop() {
  if (!tetrisCurrent.value || tetrisPaused.value || tetrisGameOver.value) return;
  const piece = tetrisCurrent.value;
  let drop = 0;
  while (!tetrisCollides(piece, tetrisBoard.value, 0, drop + 1)) drop++;
  tetrisScore.value += drop * 2;
  piece.y += drop;
  tetrisStep();
}

function handleTetrisKey(e) {
  const tetWin = windows.value.find(w => w.app === 'tetris' && !w.minimized);
  if (!tetWin) return;
  const allZ = windows.value.filter(w => !w.minimized).map(w => w.z);
  if (allZ.length && tetWin.z !== Math.max(...allZ)) return;
  switch (e.key) {
    case 'ArrowLeft':  e.preventDefault(); tetrisMoveLeft(); break;
    case 'ArrowRight': e.preventDefault(); tetrisMoveRight(); break;
    case 'ArrowDown':  e.preventDefault(); tetrisMoveDown(); break;
    case 'ArrowUp':    e.preventDefault(); tetrisRotate(); break;
    case ' ':          e.preventDefault(); tetrisHardDrop(); break;
    case 'p': case 'P': tetrisTogglePause(); break;
  }
}

const tetrisDisplayBoard = computed(() => {
  const display = tetrisBoard.value.map(row => [...row]);
  const piece = tetrisCurrent.value;
  if (!piece) return display;
  const shape = tetrisShape(piece);
  const color = TETROMINOS[piece.type].color;
  let ghostDrop = 0;
  const board = tetrisBoard.value;
  while (true) {
    let ok = true;
    for (const [r, c] of shape) {
      const nr = piece.y + r + ghostDrop + 1;
      const nc = piece.x + c;
      if (nr >= 20 || nc < 0 || nc >= 10 || board[nr]?.[nc]) { ok = false; break; }
    }
    if (!ok) break;
    ghostDrop++;
  }
  if (ghostDrop > 0) {
    for (const [r, c] of shape) {
      const row = piece.y + r + ghostDrop;
      const col = piece.x + c;
      if (row >= 0 && row < 20 && col >= 0 && col < 10 && !display[row][col]) {
        display[row][col] = color + '33';
      }
    }
  }
  for (const [r, c] of shape) {
    const row = piece.y + r;
    const col = piece.x + c;
    if (row >= 0 && row < 20 && col >= 0 && col < 10) display[row][col] = color;
  }
  return display;
});

const tetrisNextBoard = computed(() => {
  const board = Array.from({ length: 4 }, () => Array(4).fill(null));
  if (!tetrisNextPiece.value) return board;
  const { type } = tetrisNextPiece.value;
  const shape = TETROMINOS[type].shapes[0];
  const color = TETROMINOS[type].color;
  let minR = 9, maxR = 0, minC = 9, maxC = 0;
  for (const [r, c] of shape) { minR = Math.min(minR, r); maxR = Math.max(maxR, r); minC = Math.min(minC, c); maxC = Math.max(maxC, c); }
  const offR = Math.floor((4 - (maxR - minR + 1)) / 2) - minR;
  const offC = Math.floor((4 - (maxC - minC + 1)) / 2) - minC;
  for (const [r, c] of shape) {
    const nr = r + offR; const nc = c + offC;
    if (nr >= 0 && nr < 4 && nc >= 0 && nc < 4) board[nr][nc] = color;
  }
  return board;
});

watch(openWindows, (wins) => {
  const tWin = wins.find(w => w.app === 'tetris');
  if (!tWin && tetrisInterval) {
    clearInterval(tetrisInterval);
    tetrisInterval = null;
    tetrisBoard.value = createEmptyBoard();
    tetrisCurrent.value = null;
    tetrisNextPiece.value = null;
    tetrisGameOver.value = false;
    tetrisPaused.value = false;
    tetrisScore.value = 0;
    tetrisLines.value = 0;
    tetrisLevel.value = 1;
  }
}, { deep: false });
</script>

<style scoped>
/* ── ROOT ── */
.macos-root {
  position: fixed;
  inset: 0;
  z-index: 100;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif;
  user-select: none;
}

/* ── BOOT ── */
.boot-screen {
  position: absolute;
  inset: 0;
  background: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 52px;
}
.boot-logo { display: flex; align-items: center; justify-content: center; }
.boot-bar-wrap { width: 180px; }
.boot-bar-track {
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.15);
  border-radius: 3px;
  overflow: hidden;
}
.boot-bar-fill {
  height: 100%;
  background: rgba(255,255,255,0.85);
  border-radius: 3px;
  transition: width 0.05s linear;
}

/* ── LOGIN ── */
.login-screen {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background:
    radial-gradient(ellipse 120% 80% at 20% 110%, rgba(255,140,50,0.55) 0%, transparent 55%),
    radial-gradient(ellipse 80% 60% at 80% 110%, rgba(255,100,30,0.35) 0%, transparent 50%),
    linear-gradient(175deg, #0a1628 0%, #0e2040 30%, #1a1060 60%, #0a0820 100%);
  backdrop-filter: none;
}
.login-screen::before {
  content: '';
  position: absolute;
  inset: 0;
  backdrop-filter: blur(0px);
  background: rgba(0,0,0,0.18);
}
.login-time {
  position: relative;
  font-size: 96px;
  font-weight: 200;
  color: white;
  line-height: 1;
  letter-spacing: -4px;
  text-shadow: 0 2px 40px rgba(0,0,0,0.4);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
}
.login-date {
  position: relative;
  font-size: 17px;
  color: rgba(255,255,255,0.92);
  font-weight: 500;
  margin-bottom: 40px;
  letter-spacing: 0.01em;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
}
.login-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  animation: card-rise 0.7s cubic-bezier(0.34,1.4,0.64,1) both;
}
@keyframes card-rise {
  from { opacity: 0; transform: translateY(20px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.login-avatar {
  width: 76px; height: 76px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5e9bff 0%, #3468d8 100%);
  box-shadow: 0 4px 24px rgba(0,0,0,0.5), 0 0 0 3px rgba(255,255,255,0.18);
  display: flex; align-items: center; justify-content: center;
  font-size: 30px; font-weight: 600; color: white;
}
.login-name {
  color: rgba(255,255,255,0.95);
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 0.01em;
}
.login-pw-row { display: flex; align-items: center; gap: 8px; }
.login-pw-input {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 22px;
  padding: 9px 18px;
  color: white;
  font-size: 14px;
  width: 192px;
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  backdrop-filter: blur(12px);
  transition: background 0.2s, border-color 0.2s;
}
.login-pw-input:focus {
  background: rgba(255,255,255,0.22);
  border-color: rgba(255,255,255,0.5);
}
.login-pw-input::placeholder { color: rgba(255,255,255,0.4); }
.login-arrow {
  width: 34px; height: 34px;
  background: rgba(255,255,255,0.9);
  border: none;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;
}
.login-arrow:hover { background: white; transform: scale(1.08); }
.login-arrow svg { stroke: #1a1a2e; }
.login-hint { font-size: 12px; color: rgba(255,255,255,0.45); margin-top: 4px; }

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
    radial-gradient(ellipse 160% 100% at 15% 115%, rgba(255,155,60,0.75) 0%, rgba(255,100,30,0.4) 28%, transparent 52%),
    radial-gradient(ellipse 90% 70% at 78% 115%, rgba(255,120,40,0.45) 0%, transparent 45%),
    radial-gradient(ellipse 120% 80% at 50% -10%, rgba(80,120,220,0.35) 0%, transparent 50%),
    linear-gradient(185deg, #090d1a 0%, #0d1830 18%, #12255c 40%, #1a1050 60%, #251030 78%, #180818 100%);
}

/* ── MENU BAR ── */
.menubar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 28px;
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(20px) saturate(200%);
  -webkit-backdrop-filter: blur(20px) saturate(200%);
  border-bottom: none;
  box-shadow: 0 1px 0 rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  z-index: 200;
}
.menubar-left { display: flex; align-items: center; gap: 0; }
.menubar-right { display: flex; align-items: center; gap: 8px; }
.mb-item {
  position: relative;
  padding: 0 9px;
  height: 22px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  color: rgba(0,0,0,0.85);
  font-size: 13px;
  font-weight: 400;
  cursor: default;
  white-space: nowrap;
  gap: 4px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.mb-item:hover { background: rgba(0,0,0,0.08); }
.apple-btn { padding: 0 10px; }
.app-name { font-weight: 600; font-size: 13px; }
.mb-status {
  color: rgba(0,0,0,0.75);
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  display: flex;
  align-items: center;
  gap: 5px;
  -webkit-font-smoothing: antialiased;
}
.mb-dropdown {
  position: absolute;
  top: calc(100% + 3px);
  left: 0;
  min-width: 210px;
  background: rgba(246,246,246,0.92);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 8px;
  padding: 5px 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.1);
  z-index: 300;
}
.mb-drop-item {
  padding: 5px 16px;
  font-size: 13px;
  color: rgba(0,0,0,0.85);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
  border-radius: 4px;
  margin: 0 4px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.mb-drop-item:hover { background: #0066cc; color: white; }
.mb-drop-item:hover .mb-shortcut { color: rgba(255,255,255,0.7); }
.mb-drop-item.bold { font-weight: 600; }
.mb-drop-sep { height: 1px; background: rgba(0,0,0,0.1); margin: 4px 0; }
.mb-shortcut { color: rgba(0,0,0,0.35); font-size: 12px; }

/* ── DESKTOP ICONS ── */
.dsk-icon {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: default;
  width: 76px;
  transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1);
}
.dsk-icon:hover { transform: scale(1.06); }
.dsk-icon-img { display: flex; align-items: center; justify-content: center; }
.dsk-icon-label {
  color: white;
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.5);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  letter-spacing: 0;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background 0.15s;
}
.dsk-icon:hover .dsk-icon-label {
  background: rgba(0,81,211,0.75);
}

/* ── CONTEXT MENU ── */
.ctx-menu {
  position: absolute;
  min-width: 192px;
  background: rgba(246,246,246,0.92);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 10px;
  padding: 5px 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.1);
  z-index: 500;
}
.ctx-item {
  padding: 6px 16px;
  font-size: 13px;
  color: rgba(0,0,0,0.85);
  cursor: default;
  border-radius: 4px;
  margin: 0 4px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.ctx-item:hover { background: #0066cc; color: white; }
.ctx-sep { height: 1px; background: rgba(0,0,0,0.1); margin: 4px 0; }

/* ── MAC WINDOW ── */
.mac-window {
  position: absolute;
  border-radius: 12px;
  overflow: hidden;
  border: none;
  background: #f6f6f6;
  box-shadow:
    0 22px 70px rgba(0,0,0,0.5),
    0 4px 12px rgba(0,0,0,0.25),
    0 0 0 0.5px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
}
.win-titlebar {
  height: 52px;
  background: rgba(246,246,246,0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  padding: 0 14px;
  flex-shrink: 0;
  cursor: grab;
  position: relative;
}
.win-titlebar:active { cursor: grabbing; }
.traffic-lights { display: flex; gap: 8px; }
.tl {
  width: 12px; height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: filter 0.12s;
  position: relative;
  display: flex; align-items: center; justify-content: center;
  display: flex; align-items: center; justify-content: center;
}
.tl.red    { background: #FF5F57; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.18); }
.tl.yellow { background: #FFBD2E; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.18); }
.tl.green  { background: #28CA41; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.18); }
.tl:hover  { filter: brightness(0.88); }
.win-title {
  position: absolute;
  left: 0; right: 0;
  text-align: center;
  font-size: 13px;
  color: rgba(0,0,0,0.7);
  font-weight: 500;
  letter-spacing: -0.01em;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 80px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.win-body { flex: 1; overflow: hidden; display: flex; background: #ffffff; }

/* ── FINDER ── */
.finder-layout { display: flex; width: 100%; height: 100%; background: #ffffff; }
.finder-sidebar {
  width: 180px;
  background: rgba(246,246,246,0.95);
  border-right: 1px solid rgba(0,0,0,0.1);
  padding: 8px 0;
  flex-shrink: 0;
  overflow-y: auto;
}
.finder-section-label {
  font-size: 11px;
  font-weight: 600;
  color: rgba(0,0,0,0.4);
  padding: 8px 16px 3px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.finder-fav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  font-size: 13px;
  color: rgba(0,0,0,0.75);
  cursor: default;
  border-radius: 7px;
  margin: 0 5px;
  transition: background 0.1s;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.finder-fav-item:hover { background: rgba(0,0,0,0.06); }
.finder-fav-item.active { background: #0066cc; color: white; }
.fav-icon { font-size: 14px; }
.finder-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.finder-toolbar {
  height: 40px;
  background: rgba(248,248,248,0.95);
  border-bottom: 1px solid rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 10px;
  flex-shrink: 0;
}
.finder-toolbar-btns { display: flex; gap: 4px; }
.finder-tb-btn {
  background: rgba(0,0,0,0.06);
  border: none;
  border-radius: 5px;
  width: 26px; height: 22px;
  color: rgba(0,0,0,0.55);
  font-size: 15px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.1s;
}
.finder-tb-btn:hover { background: rgba(0,0,0,0.12); }
.finder-path-label {
  flex: 1;
  font-size: 13px;
  color: rgba(0,0,0,0.75);
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.finder-view-toggle { display: flex; gap: 2px; }
.fvt-btn {
  background: transparent;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 5px;
  width: 28px; height: 22px;
  color: rgba(0,0,0,0.5);
  cursor: pointer;
  font-size: 12px;
  transition: background 0.1s;
}
.fvt-btn.active { background: #0066cc; color: white; border-color: #0066cc; }
.finder-file-header {
  display: grid;
  grid-template-columns: 1fr 130px 80px 100px;
  padding: 4px 16px;
  font-size: 11px;
  color: rgba(0,0,0,0.4);
  font-weight: 500;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  flex-shrink: 0;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.finder-files-list { flex: 1; overflow-y: auto; padding: 4px 0; }
.finder-file-row {
  display: grid;
  grid-template-columns: 1fr 130px 80px 100px;
  padding: 5px 16px;
  font-size: 13px;
  color: rgba(0,0,0,0.85);
  cursor: default;
  transition: background 0.08s;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.finder-file-row:hover { background: rgba(0,0,0,0.05); }
.finder-file-row.selected { background: #0066cc; color: white; }
.finder-file-row.selected .ff-date,
.finder-file-row.selected .ff-size,
.finder-file-row.selected .ff-kind { color: rgba(255,255,255,0.75); }
.ff-name { display: flex; align-items: center; gap: 8px; }
.ff-icon { font-size: 15px; }
.ff-date, .ff-size, .ff-kind { color: rgba(0,0,0,0.45); font-size: 12px; display: flex; align-items: center; }

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
.about-layout {
  display: flex; width: 100%; height: 100%;
  background: rgba(246,246,246,0.98);
  align-items: center; justify-content: center;
  gap: 36px; padding: 28px;
}
.about-left { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.about-model {
  font-size: 15px; font-weight: 600; color: rgba(0,0,0,0.85);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.about-submodel {
  font-size: 12px; color: rgba(0,0,0,0.45);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.about-right { display: flex; flex-direction: column; gap: 9px; }
.about-title {
  font-size: 19px; font-weight: 600; color: rgba(0,0,0,0.85); margin-bottom: 5px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.about-spec-row {
  display: flex; gap: 16px; font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.about-spec-k { color: rgba(0,0,0,0.45); min-width: 90px; }
.about-spec-v { color: rgba(0,0,0,0.85); font-weight: 500; }
.about-more-btn {
  margin-top: 10px;
  padding: 7px 18px;
  background: rgba(0,0,0,0.06);
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  color: rgba(0,0,0,0.8);
  align-self: flex-start;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
  transition: background 0.15s;
}
.about-more-btn:hover { background: rgba(0,0,0,0.1); }

/* ── DOCK ── */
.dock-outer {
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 150;
}
.dock-inner {
  display: flex;
  align-items: flex-end;
  gap: 5px;
  padding: 8px 12px 10px;
  background: rgba(255,255,255,0.22);
  backdrop-filter: blur(32px) saturate(200%);
  -webkit-backdrop-filter: blur(32px) saturate(200%);
  border: 1px solid rgba(255,255,255,0.35);
  border-radius: 20px;
  box-shadow:
    0 8px 40px rgba(0,0,0,0.35),
    0 2px 8px rgba(0,0,0,0.2),
    inset 0 1px 0 rgba(255,255,255,0.5);
}
.dock-item { position: relative; cursor: pointer; display: flex; flex-direction: column; align-items: center; }
.dock-icon-wrap { position: relative; display: flex; flex-direction: column; align-items: center; }
.dock-icon-bg {
  width: 54px; height: 54px;
  border-radius: 13px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  transition: border-radius 0.15s;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4));
}
.dock-item:hover .dock-icon-bg {
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.55));
}
.dock-dot {
  width: 5px; height: 5px;
  background: rgba(255,255,255,0.85);
  border-radius: 50%;
  margin-top: 4px;
  box-shadow: 0 0 4px rgba(255,255,255,0.5);
}
.dock-tooltip {
  position: absolute;
  bottom: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  background: rgba(40,40,40,0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 7px;
  padding: 5px 11px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s, transform 0.15s;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  -webkit-font-smoothing: antialiased;
}
.dock-item:hover .dock-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.dock-divider { width: 1px; height: 46px; background: rgba(255,255,255,0.25); margin: 0 2px; align-self: center; }

/* ── MUSIC PLAYER ── */
.music-layout {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background: #0c0c0e;
  color: white;
  overflow: hidden;
}

/* Blurred color wash background */
.music-bg-wash {
  position: absolute;
  inset: -40px;
  opacity: 0.18;
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
  transition: opacity 0.5s;
}

/* Left vinyl side */
.music-vinyl-side {
  position: relative;
  z-index: 1;
  width: 300px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

/* Album art */
.music-art-wrap {
  position: relative;
  width: 210px;
  height: 210px;
  flex-shrink: 0;
}
.music-art {
  width: 210px;
  height: 210px;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 12px 48px rgba(0,0,0,0.7);
  transition: box-shadow 0.5s;
}
.music-art-spin {
  animation: vinyl-spin 10s linear infinite;
  box-shadow: 0 16px 60px rgba(0,0,0,0.75), 0 0 60px rgba(232,121,160,0.3);
}
@keyframes vinyl-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.music-vinyl-ring {
  position: absolute;
  inset: 14px;
  border-radius: 50%;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.07);
}
.music-vinyl-center {
  position: absolute;
  inset: 38%;
  border-radius: 50%;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,255,255,0.09);
}
.music-vinyl-hole {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 16px; height: 16px;
  border-radius: 50%;
  background: #0c0c0e;
  box-shadow: 0 0 0 1.5px rgba(255,255,255,0.1);
}
.music-art-shadow {
  position: absolute;
  bottom: -18px;
  left: 8%;
  width: 84%;
  height: 36px;
  border-radius: 50%;
  filter: blur(18px);
  opacity: 0.6;
  transform: scaleY(0.3);
}

/* Right info side */
.music-info-side {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 40px 40px 20px;
  gap: 22px;
}

/* Equalizer */
.music-eq {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 22px;
  opacity: 0;
  transition: opacity 0.4s;
}
.music-eq-active { opacity: 1; }
.music-eq-bar {
  width: 3px;
  background: linear-gradient(to top, #e879a0, #c084fc);
  border-radius: 2px;
  height: 4px;
  animation: none;
}
.music-eq-active .music-eq-bar {
  animation: eq-bounce 0.5s ease-in-out infinite alternate;
}
@keyframes eq-bounce {
  from { height: 3px; }
  to   { height: 20px; }
}

/* Meta */
.music-meta { display: flex; flex-direction: column; gap: 4px; }
.music-track-name {
  font-size: 26px;
  font-weight: 700;
  color: white;
  line-height: 1.15;
  letter-spacing: -0.3px;
}
.music-track-artist {
  font-size: 14px;
  color: rgba(255,255,255,0.55);
  font-weight: 400;
}
.music-track-album {
  font-size: 12px;
  color: rgba(232,121,160,0.75);
  font-weight: 500;
  margin-top: 2px;
}

/* Controls */
.music-controls { display: flex; align-items: center; }
.mc-play {
  width: 60px; height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e879a0, #9b59b6);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 28px rgba(232,121,160,0.5);
  transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.15s;
}
.mc-play:hover { transform: scale(1.1); box-shadow: 0 8px 36px rgba(232,121,160,0.65); }
.mc-play.loading { opacity: 0.55; cursor: default; transform: none; }

/* Loading */
.music-loading {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255,255,255,0.3);
  font-size: 12px;
}
.music-spin-ring {
  width: 16px; height: 16px;
  border: 2px solid rgba(232,121,160,0.2);
  border-top-color: #e879a0;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Volume */
.music-vol-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 260px;
}
.music-vol-slider {
  flex: 1;
  -webkit-appearance: none;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(to right, rgba(232,121,160,0.85) 0%, rgba(232,121,160,0.85) var(--val, 75%), rgba(255,255,255,0.1) var(--val, 75%));
  outline: none;
  cursor: pointer;
}
.music-vol-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 13px; height: 13px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 1px 5px rgba(0,0,0,0.5);
  cursor: pointer;
  transition: transform 0.1s;
}
.music-vol-slider::-webkit-slider-thumb:hover { transform: scale(1.3); }

/* ── TRAFFIC LIGHT SYMBOLS ── */
.tl-sym {
  font-size: 7px;
  font-weight: 900;
  color: rgba(0,0,0,0);
  line-height: 1;
  transition: color 0.1s;
  pointer-events: none;
  user-select: none;
}
.traffic-lights:hover .tl.red .tl-sym { color: rgba(140,30,20,0.7); }
.traffic-lights:hover .tl.yellow .tl-sym { color: rgba(100,70,0,0.6); }
.traffic-lights:hover .tl.green .tl-sym { color: rgba(0,80,20,0.6); }

/* ── WINDOW TRANSITIONS ── */
.win-enter-active {
  transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1);
}
.win-enter-from {
  opacity: 0;
  transform: scale(0.82) translateY(8px);
}
.win-leave-active {
  transition: opacity 0.16s ease, transform 0.16s ease;
  pointer-events: none;
}
.win-leave-to {
  opacity: 0;
  transform: scale(0.94);
}

/* ── CONTEXT MENU ANIMATION ── */
.ctx-menu {
  animation: ctx-pop 0.14s cubic-bezier(0.34,1.56,0.64,1);
  transform-origin: top left;
}
@keyframes ctx-pop {
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
}

/* ── BOOT LOGO ── */
.boot-logo svg {
  filter: none;
}

/* ── TRANSITIONS ── */
.boot-fade-leave-active { transition: opacity 0.5s ease; }
.boot-fade-leave-to { opacity: 0; }
.login-fade-enter-active { transition: opacity 0.6s ease; }
.login-fade-enter-from { opacity: 0; }
.login-fade-leave-active { transition: opacity 0.5s ease; }
.login-fade-leave-to { opacity: 0; }
.desktop-fade-enter-active { transition: opacity 0.8s ease; }
.desktop-fade-enter-from { opacity: 0; }

.logo-pop-enter-active { transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.34,1.56,0.64,1); }
.logo-pop-enter-from { opacity: 0; transform: scale(0.72); }
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

/* ── TETRIS ── */
.tetris-layout {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #0a0a14;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
.tetris-main {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-shrink: 0;
}
.tetris-board {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: #111122;
  padding: 4px;
  border: 1px solid #222244;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,200,255,0.08), inset 0 0 8px rgba(0,0,0,0.6);
}
.tetris-row {
  display: flex;
  gap: 1px;
}
.tetris-cell {
  width: 22px;
  height: 22px;
  background: #0d0d1f;
  border-radius: 2px;
  border: 1px solid #1a1a33;
  transition: background 0.04s;
}
.tetris-cell-sm {
  width: 16px;
  height: 16px;
}
.tetris-sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-width: 100px;
}
.tetris-next-label {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.tetris-next-board {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: #111122;
  padding: 6px;
  border: 1px solid #222244;
  border-radius: 4px;
  align-self: flex-start;
}
.tetris-stats {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.tetris-stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tetris-stat-label {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.tetris-stat-val {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  font-variant-numeric: tabular-nums;
  font-family: 'SF Mono', 'Monaco', monospace;
}
.tetris-btns { display: flex; flex-direction: column; gap: 6px; }
.tetris-btn {
  background: linear-gradient(135deg, #4c6ef5 0%, #3451c7 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.1s;
  letter-spacing: 0.02em;
}
.tetris-btn:hover { opacity: 0.88; transform: scale(1.03); }
.tetris-btn:active { transform: scale(0.97); }
.tetris-btn-lg { padding: 10px 24px; font-size: 14px; }
.tetris-hint {
  margin-top: auto;
  font-size: 10px;
  color: rgba(255,255,255,0.22);
  line-height: 1.7;
  font-family: 'SF Mono', 'Monaco', monospace;
}
.tetris-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.78);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  backdrop-filter: blur(4px);
  border-radius: 4px;
}
.tetris-overlay-title {
  font-size: 28px;
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
}
.tetris-overlay-score {
  font-size: 16px;
  color: rgba(255,255,255,0.6);
  margin-bottom: 6px;
}
</style>
