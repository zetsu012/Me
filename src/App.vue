<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const player = ref({ x: 51, y: 68 })
const stamina = ref(100)
const wallet = ref(0)
const mission = ref(0)
const inventoryOpen = ref(false)
const journalOpen = ref(false)
const dialogue = ref({ name: 'Ama Doma', text: 'The mountains remember every footstep. Come, I will show you home.', button: 'BEGIN JOURNEY' })
const toast = ref('')
const gift = ref(null)
const snow = Array.from({ length: 42 }, (_, i) => ({ x: (i * 37) % 100, y: (i * 71) % 100, d: 4 + (i % 7), s: 2 + (i % 4) }))
const keys = new Set()
let frame
let last = performance.now()

const missions = [
  { title: 'Welcome Home', text: 'Walk to the village well and meet Pema.', reward: 0, target: { x: 47, y: 58 }, action: 'Speak with Pema' },
  { title: 'The Wandering Yaks', text: 'Help Norbu herd the three wandering yaks home.', reward: 150, target: { x: 23, y: 70 }, action: 'Herd the yaks' },
  { title: 'Firewood Before the Storm', text: 'Chop and carry firewood down from the pine trail.', reward: 200, target: { x: 78, y: 59 }, action: 'Chop the marked logs' },
  { title: 'Medicine for the Hermit', text: 'Climb to Ho Tso and deliver the hermit’s medicine.', reward: 180, target: { x: 71, y: 25 }, action: 'Deliver medicine' },
  { title: 'Lanterns for the Festival', text: 'String the lanterns before twilight settles in.', reward: 250, target: { x: 51, y: 66 }, action: 'Hang the lanterns' },
  { title: 'Catch the Market Thief', text: 'A monkey stole Karma’s wares. Catch the rascal!', reward: 220, target: { x: 64, y: 70 }, action: 'Recover the stolen goods' },
  { title: 'The Proposal', text: 'Choose a gift in the market, then meet Pema at Ho Tso.', reward: 0, target: { x: 71, y: 25 }, action: 'Meet Pema at the lake' },
]

const currentMission = computed(() => missions[Math.min(mission.value, 6)])
const distance = computed(() => Math.hypot(player.value.x - currentMission.value.target.x, player.value.y - currentMission.value.target.y))
const canInteract = computed(() => distance.value < 7 && !dialogue.value)
const progress = computed(() => `${Math.min(mission.value + 1, 7)} / 7`)

const bark = (message) => {
  toast.value = message
  window.clearTimeout(bark.timer)
  bark.timer = window.setTimeout(() => (toast.value = ''), 3200)
}

function begin() {
  dialogue.value = null
  bark('NEW QUEST  •  Welcome Home')
}

function interact() {
  if (dialogue.value) return
  if (mission.value === 6) {
    if (distance.value >= 7) return bark('Follow the golden marker to Ho Tso')
    const lines = {
      sweets: 'You remembered I have a sweet tooth. Of course I’ll say yes.',
      momos: 'Out of everything, you bring me food? ...I love it. And yes.',
      bangle: 'You shouldn’t have spent so much—but yes. A thousand times, yes.',
      shawl: 'You chose this for me, not for show. Yes. Quietly, completely—yes.',
      flowers: 'You didn’t need to buy anything at all. You came. That is enough. Yes.',
      nothing: 'Empty-handed? Then promise me a lifetime of making it right.'
    }
    dialogue.value = { name: 'Pema', text: lines[gift.value?.id || 'nothing'], button: 'OUR STORY BEGINS', ending: true }
    return
  }
  if (distance.value >= 7) return bark('Follow the golden marker')
  const done = currentMission.value
  wallet.value += done.reward
  mission.value++
  const speaker = ['Pema', 'Norbu', 'Ama Doma', 'The Hermit', 'Tashi', 'Karma'][mission.value - 1]
  const lines = [
    'You still walk like the boy who left. Welcome home.',
    'Not bad for a boy who once let the yaks eat my scarf.',
    'The storm can come now. The village will be warm.',
    'A generous heart makes the steepest path light.',
    'Every lantern is a small sun. Tonight, you gave us a sky full.',
    'Fast feet, good heart. Take this—and don’t tell Pema I said so.'
  ]
  dialogue.value = { name: speaker, text: lines[mission.value - 1], button: mission.value === 6 ? 'CHOOSE A GIFT' : 'CONTINUE' }
}

function continueDialogue() {
  if (dialogue.value?.ending) {
    mission.value = 0; wallet.value = 0; gift.value = null; player.value = { x: 51, y: 68 }
    dialogue.value = { name: 'Kanchan Gaon', text: 'Some stories end at the lake. The best ones begin there.', button: 'PLAY AGAIN' }
    return
  }
  dialogue.value = null
  bark(`NEW QUEST  •  ${currentMission.value.title}`)
}

const gifts = [
  { id: 'momos', name: 'Pema’s favorite momos', shop: 'FOOD STALL', price: 80, icon: '♨' },
  { id: 'sweets', name: 'A box of local sweets', shop: 'MITHAI SHOP', price: 150, icon: '✦' },
  { id: 'shawl', name: 'Hand-woven shawl', shop: 'CRAFT STORE', price: 400, icon: '▰' },
  { id: 'bangle', name: 'Silver moon bangle', shop: 'SUNAR', price: 700, icon: '◯' },
  { id: 'flowers', name: 'Wild alpine flowers', shop: 'LAKE TRAIL', price: 0, icon: '❋' },
]

function buy(item) {
  if (gift.value) return bark('You may carry only one gift')
  if (wallet.value < item.price) return bark(`You need ₹${item.price - wallet.value} more`)
  wallet.value -= item.price
  gift.value = item
  bark(`${item.name} added to your satchel`)
}

function loop(now) {
  const dt = Math.min((now - last) / 16.67, 2); last = now
  if (!dialogue.value && !inventoryOpen.value && !journalOpen.value) {
    let dx = 0, dy = 0
    if (keys.has('w') || keys.has('arrowup')) dy--
    if (keys.has('s') || keys.has('arrowdown')) dy++
    if (keys.has('a') || keys.has('arrowleft')) dx--
    if (keys.has('d') || keys.has('arrowright')) dx++
    const sprint = keys.has('shift') && stamina.value > 0
    const speed = (sprint ? .34 : .19) * dt
    if (dx || dy) {
      const l = Math.hypot(dx, dy); dx /= l; dy /= l
      player.value.x = Math.max(8, Math.min(92, player.value.x + dx * speed))
      player.value.y = Math.max(14, Math.min(87, player.value.y + dy * speed))
      stamina.value = Math.max(0, stamina.value - (sprint ? .5 : -.18) * dt)
    } else stamina.value = Math.min(100, stamina.value + .35 * dt)
  }
  frame = requestAnimationFrame(loop)
}

function onKey(e) {
  const k = e.key.toLowerCase()
  if (['tab', ' '].includes(k)) e.preventDefault()
  if (e.type === 'keydown') {
    keys.add(k)
    if (k === 'e') interact()
    if (k === 'tab') inventoryOpen.value = !inventoryOpen.value
    if (k === 'j') journalOpen.value = !journalOpen.value
  } else keys.delete(k)
}

onMounted(() => { window.addEventListener('keydown', onKey); window.addEventListener('keyup', onKey); frame = requestAnimationFrame(loop) })
onBeforeUnmount(() => { window.removeEventListener('keydown', onKey); window.removeEventListener('keyup', onKey); cancelAnimationFrame(frame) })
</script>

<template>
  <main class="game-shell">
    <svg class="world" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-label="A painted view of Kanchan Gaon">
      <defs>
        <linearGradient id="sky" x2="0" y2="1"><stop stop-color="#071a2c"/><stop offset=".48" stop-color="#3c6475"/><stop offset="1" stop-color="#d89a6a"/></linearGradient>
        <linearGradient id="snow" x2="0" y2="1"><stop stop-color="#d7e4df"/><stop offset="1" stop-color="#76919a"/></linearGradient>
        <linearGradient id="ground" x2="0" y2="1"><stop stop-color="#304d49"/><stop offset="1" stop-color="#102a2e"/></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="1600" height="900" fill="url(#sky)"/>
      <circle cx="1260" cy="160" r="105" fill="#ffd9a3" opacity=".3" filter="url(#glow)"/>
      <path d="M0 390L245 120 405 320 610 70 820 330 1020 90 1230 330 1425 130 1600 350V570H0Z" fill="#213d4d"/>
      <path d="M130 265l115-145 65 110-42-17-26 33-31-28zM490 205L610 70l85 150-77-59-32 39-31-20zM900 245l120-155 90 158-80-61-33 44-38-22zM1328 235l97-105 88 145-78-48-25 33z" fill="url(#snow)" opacity=".95"/>
      <path d="M0 450 Q340 350 680 470T1600 420V900H0Z" fill="url(#ground)"/>
      <path d="M0 620 Q310 515 620 640T1180 565T1600 590" fill="none" stroke="#c6d3c7" stroke-width="23" opacity=".35"/>
      <path d="M760 900C730 780 810 720 785 625S930 475 1100 430" fill="none" stroke="#c2c0a8" stroke-width="38" opacity=".8"/>
      <ellipse cx="1120" cy="285" rx="150" ry="48" fill="#4bc0c0" opacity=".75"/><ellipse cx="1120" cy="277" rx="125" ry="29" fill="#8ce3da" opacity=".48"/>
      <g fill="#162f30" stroke="#183638" stroke-width="5">
        <path v-for="x in [80,155,250,1280,1370,1460,1510]" :key="x" :d="`M${x} 610l45-125 42 125h-26l33 80h-132l34-80z`"/>
      </g>
      <g class="terraces" fill="none" stroke="#708374" stroke-width="9" opacity=".7"><path d="M0 700q180-75 400-25"/><path d="M0 765q230-82 450-26"/><path d="M0 830q260-80 490-22"/></g>
      <g class="houses">
        <g v-for="(h,i) in [{x:600,y:610},{x:720,y:670},{x:850,y:600},{x:930,y:690},{x:520,y:720},{x:1040,y:625}]" :key="i" :transform="`translate(${h.x} ${h.y})`">
          <rect width="115" height="75" rx="3" fill="#8d6649"/><path d="M-14 8L57-38 130 8Z" fill="#342f31"/><rect x="47" y="38" width="24" height="37" fill="#412c25"/><rect x="15" y="25" width="18" height="18" fill="#ffbf67" filter="url(#glow)"/>
        </g>
      </g>
      <g transform="translate(790 590)"><rect x="-9" y="0" width="18" height="135" fill="#513a2c"/><circle cy="-15" r="62" fill="#24453e"/><path d="M-80-25Q0 10 90-38M-68-5Q5 30 78-10" stroke="#e89c4e" stroke-width="4" fill="none" stroke-dasharray="13 10"/></g>
      <g v-for="n in snow" :key="n.x+n.y" class="flake" :style="{ '--delay': `${n.d}s`, '--speed': `${n.s + 5}s` }"><circle :cx="n.x * 16" :cy="n.y * 9" r="2.3" fill="white" opacity=".8"/></g>
      <g class="quest-marker" :transform="`translate(${currentMission.target.x*16} ${currentMission.target.y*9})`"><path d="M0-38l8 13-8 13-8-13z" fill="#f5c86b"/><circle r="18" fill="none" stroke="#f5c86b" stroke-width="3"/></g>
      <g class="player" :transform="`translate(${player.x*16} ${player.y*9})`">
        <ellipse cy="27" rx="20" ry="8" fill="#07191d" opacity=".45"/><path d="M-13-2L-22 26M13-2L22 26" stroke="#20272d" stroke-width="10" stroke-linecap="round"/><path d="M-22-28Q0-42 22-28L15 8Q0 18-15 8Z" fill="#b34b3c"/><path d="M-8-42a12 12 0 1024 0 12 12 0 10-24 0" fill="#c78d69"/><path d="M-13-48q13-17 30 1" stroke="#18252a" stroke-width="9" stroke-linecap="round"/>
      </g>
    </svg>

    <header class="topbar">
      <div class="brand"><span class="crest">☼</span><div><b>KANCHAN GAON</b><small>HIMALAYAN STORIES</small></div></div>
      <div class="weather"><span>❄</span><div><b>LIGHT SNOW</b><small>EARLY EVENING · −4°C</small></div></div>
      <div class="wallet"><small>WALLET</small><b>₹ {{ wallet }}</b></div>
      <button class="icon-button" @click="journalOpen = !journalOpen">J <span>JOURNAL</span></button>
      <button class="icon-button" @click="inventoryOpen = !inventoryOpen">TAB <span>SATCHEL</span></button>
    </header>

    <aside class="quest-card">
      <div class="eyebrow"><span>MISSION {{ progress }}</span><i></i></div>
      <h1>{{ currentMission.title }}</h1>
      <p>{{ currentMission.text }}</p>
      <div class="objective"><span class="diamond"></span><div><small>CURRENT OBJECTIVE</small><b>{{ currentMission.action }}</b></div></div>
      <div class="reward" v-if="currentMission.reward"><span>REWARD</span><b>₹{{ currentMission.reward }}</b></div>
    </aside>

    <div class="compass"><span>W</span><i></i><b>N</b><i class="gold"></i><span>E</span></div>
    <div v-if="canInteract" class="interact"><kbd>E</kbd><div><small>INTERACT</small><b>{{ currentMission.action }}</b></div></div>
    <div v-if="toast" class="toast">{{ toast }}</div>

    <div class="controls"><div><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd><span>MOVE</span></div><div><kbd>⇧</kbd><span>SPRINT</span></div><div><kbd>E</kbd><span>INTERACT</span></div></div>
    <div class="stamina" :class="{ active: stamina < 99 }"><span>STAMINA</span><i><b :style="{width: stamina + '%'}"></b></i></div>

    <section v-if="dialogue" class="dialogue-panel">
      <div class="portrait">{{ dialogue.name.charAt(0) }}</div>
      <div class="dialogue-copy"><small>{{ dialogue.name }}</small><p>“{{ dialogue.text }}”</p></div>
      <button @click="dialogue.button === 'BEGIN JOURNEY' ? begin() : continueDialogue()">{{ dialogue.button }} <span>→</span></button>
    </section>

    <div v-if="inventoryOpen" class="overlay" @click.self="inventoryOpen = false">
      <section class="modal satchel">
        <button class="close" @click="inventoryOpen = false">×</button><span class="kicker">YOUR BELONGINGS</span><h2>Satchel & Wallet</h2>
        <div class="balance"><small>RUPEES SAVED</small><b>₹ {{ wallet }}</b></div>
        <div v-if="mission === 6" class="shop"><p>Choose one gift for Pema. What you bring will shape the ending.</p><button v-for="item in gifts" :key="item.id" @click="buy(item)" :disabled="!!gift || wallet < item.price"><i>{{ item.icon }}</i><span><small>{{ item.shop }}</small>{{ item.name }}</span><b>{{ item.price ? `₹${item.price}` : 'FREE' }}</b></button></div>
        <div v-else class="empty"><span>♢</span><p>{{ gift ? gift.name : 'Your satchel is light.' }}</p><small>Complete village missions to earn rupees and collect story items.</small></div>
      </section>
    </div>

    <div v-if="journalOpen" class="overlay" @click.self="journalOpen = false"><section class="modal journal"><button class="close" @click="journalOpen = false">×</button><span class="kicker">VILLAGE CHRONICLE</span><h2>My Journey</h2><ol><li v-for="(m,i) in missions" :key="m.title" :class="{done:i < mission, current:i===mission}"><span>{{ i < mission ? '✓' : i+1 }}</span><div><b>{{ m.title }}</b><small>{{ i < mission ? 'COMPLETED' : i === mission ? 'IN PROGRESS' : 'LOCKED' }}</small></div><em v-if="m.reward">₹{{ m.reward }}</em></li></ol></section></div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap');
.game-shell{height:100vh;min-height:650px;position:relative;overflow:hidden;background:#102a2e;color:#f5f0e5;font-family:'DM Sans',sans-serif;user-select:none}.world{position:absolute;width:100%;height:100%;inset:0}.game-shell:after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(3,13,19,.4),transparent 28%,transparent 60%,rgba(3,13,19,.55)),radial-gradient(circle at center,transparent 40%,rgba(3,13,19,.45));box-shadow:inset 0 0 120px #061419}.topbar{position:absolute;top:0;left:0;right:0;height:84px;z-index:2;display:flex;align-items:center;padding:0 36px;border-bottom:1px solid rgba(255,255,255,.14);background:linear-gradient(#06161ecc,transparent);gap:28px}.brand{display:flex;align-items:center;gap:12px;margin-right:auto}.brand b,.weather b{font-family:Cinzel,serif;font-size:16px;letter-spacing:2px}.brand small,.weather small{display:block;font-size:9px;letter-spacing:2.2px;color:#b3c0bd;margin-top:3px}.crest{font-size:25px;color:#e8b65c;border:1px solid #c79b4e;width:42px;height:42px;display:grid;place-items:center;transform:rotate(45deg)}.crest::first-letter{transform:rotate(-45deg)}.weather{display:flex;align-items:center;gap:10px;padding-right:28px;border-right:1px solid #ffffff2b}.weather>span{font-size:21px;color:#cfe9eb}.weather b{font-family:'DM Sans';font-size:10px}.wallet{min-width:80px}.wallet small{display:block;font-size:9px;letter-spacing:1.8px;color:#a9b8b8}.wallet b{font-family:Cinzel;font-size:19px;color:#f4ca78}.icon-button{background:#ffffff0c;border:1px solid #ffffff27;color:white;height:38px;padding:0 12px;font-size:10px;font-weight:700}.icon-button span{margin-left:7px;color:#b7c1c0;letter-spacing:1px}.quest-card{position:absolute;z-index:2;top:122px;left:36px;width:335px;padding:25px 25px 21px;background:linear-gradient(135deg,rgba(8,27,32,.94),rgba(11,35,38,.78));border:1px solid #ffffff20;border-left:3px solid #d4a650;box-shadow:0 18px 40px #07171980;backdrop-filter:blur(10px)}.eyebrow{display:flex;align-items:center;color:#e2b968;font-size:9px;letter-spacing:2px;font-weight:700}.eyebrow i{height:1px;background:#d4a65065;flex:1;margin-left:12px}.quest-card h1,.modal h2{font:600 27px/1.1 Cinzel,serif;margin:11px 0 9px}.quest-card p{font:13px/1.6 'DM Sans';color:#bfc8c5}.objective{display:flex;align-items:center;gap:13px;margin-top:19px;padding:13px 0;border-top:1px solid #ffffff16}.objective small{font-size:8px;letter-spacing:1.6px;color:#8ea4a1;display:block}.objective b{font-size:11px;letter-spacing:.4px}.diamond{width:9px;height:9px;background:#e9bd67;transform:rotate(45deg);box-shadow:0 0 15px #f5c873}.reward{display:flex;justify-content:space-between;align-items:center;background:#ffffff0b;padding:8px 11px;font-size:9px;letter-spacing:1.2px;color:#9fb0ae}.reward b{font:600 14px Cinzel;color:#f2c66d}.compass{position:absolute;z-index:2;top:103px;left:50%;transform:translateX(-50%);display:flex;gap:14px;align-items:center;color:#a9b5b1;font-size:10px}.compass i{width:45px;height:1px;background:#ffffff3b}.compass .gold{width:4px;height:11px;background:#e9b858}.compass b{color:white;font-family:Cinzel}.player{transition:transform .05s linear}.quest-marker{animation:bob 1.6s ease-in-out infinite}.flake{animation:snowfall var(--speed) linear infinite;animation-delay:calc(var(--delay) * -1)}@keyframes snowfall{to{transform:translateY(100px) translateX(18px)}}@keyframes bob{50%{transform:translateY(-9px)}}.controls{position:absolute;z-index:2;bottom:28px;left:36px;display:flex;gap:23px}.controls div{display:flex;align-items:center;gap:5px}.controls span{font-size:8px;letter-spacing:1.3px;color:#bdc6c3;margin-left:4px}kbd{font-family:'DM Sans';min-width:25px;height:25px;border:1px solid #ffffff47;background:#071b20b8;display:inline-grid;place-items:center;border-radius:2px;color:white;font-size:10px;box-shadow:inset 0 -2px #0005}.stamina{position:absolute;z-index:2;right:36px;bottom:35px;width:180px;opacity:0;transition:.3s}.stamina.active{opacity:1}.stamina span{font-size:8px;letter-spacing:1.5px}.stamina i{display:block;height:5px;background:#061317;margin-top:7px}.stamina b{display:block;height:100%;background:#e8bb65}.interact{position:absolute;z-index:3;left:50%;bottom:128px;transform:translateX(-50%);display:flex;align-items:center;gap:11px;background:#071a20dd;border:1px solid #e4b95c70;padding:10px 16px}.interact small{display:block;font-size:8px;color:#e7b95e;letter-spacing:1.5px}.interact b{font-size:11px}.toast{position:absolute;top:102px;left:50%;z-index:8;transform:translateX(-50%);padding:10px 20px;background:#071a20e8;border:1px solid #d5ae5e66;color:#f0cc82;font-size:10px;letter-spacing:1.5px}.dialogue-panel{position:absolute;z-index:6;bottom:80px;left:50%;transform:translateX(-50%);width:min(850px,calc(100% - 60px));min-height:142px;background:linear-gradient(100deg,#071b20f5,#102d30ed);border:1px solid #ffffff28;border-top:2px solid #c99b50;display:flex;align-items:center;padding:23px 26px;box-shadow:0 25px 70px #000a}.portrait{width:86px;height:86px;flex:none;border:1px solid #d9b56b;background:radial-gradient(circle at 50% 30%,#ad8262 0 20%,#283d3d 21% 45%,#132928 46%);display:grid;place-items:center;font:700 23px Cinzel;color:#fff;text-shadow:0 2px 4px #000}.dialogue-copy{padding:0 25px;flex:1}.dialogue-copy small,.kicker{color:#e2b866;font-size:9px;letter-spacing:2.3px;text-transform:uppercase;font-weight:700}.dialogue-copy p{font:500 19px/1.55 Cinzel,serif;margin-top:7px;color:#f1eadc}.dialogue-panel button{background:#c99b4f;border:0;padding:13px 18px;color:#102427;font-size:9px;font-weight:800;letter-spacing:1.2px;white-space:nowrap}.dialogue-panel button span{font-size:17px;margin-left:9px}.overlay{position:absolute;z-index:20;inset:0;background:#031014c9;backdrop-filter:blur(12px);display:grid;place-items:center}.modal{position:relative;width:min(630px,calc(100% - 40px));max-height:84vh;overflow:auto;background:#0a2226;border:1px solid #ffffff25;border-top:3px solid #d5a754;padding:32px;box-shadow:0 30px 100px #000}.close{position:absolute;right:18px;top:13px;border:0;background:none;color:#cad2cf;font-size:25px}.modal h2{font-size:31px}.balance{position:absolute;right:60px;top:34px;text-align:right}.balance small{display:block;color:#849a96;font-size:8px;letter-spacing:1.5px}.balance b{font:25px Cinzel;color:#efc570}.shop>p{color:#a9b8b5;font-size:12px;border-top:1px solid #ffffff19;padding:17px 0}.shop button{display:flex;width:100%;align-items:center;text-align:left;background:#ffffff08;border:1px solid #ffffff14;color:#eef2ed;padding:12px;margin-top:7px}.shop button:hover:not(:disabled){background:#d0a45618;border-color:#d0a456}.shop button:disabled{opacity:.38}.shop i{font-style:normal;width:38px;font-size:22px;color:#e3b760}.shop span{display:flex;flex-direction:column;flex:1;font-size:12px}.shop small{font-size:7px;letter-spacing:1.5px;color:#88a19c}.shop b{font:15px Cinzel;color:#e8c174}.empty{text-align:center;padding:55px 20px;border-top:1px solid #ffffff18}.empty>span{font-size:50px;color:#d2a95b}.empty p{font:18px Cinzel;margin:10px}.empty small{color:#869b98}.journal ol{list-style:none;margin-top:20px}.journal li{display:flex;align-items:center;gap:15px;padding:13px;border-top:1px solid #ffffff12;opacity:.38}.journal li.done,.journal li.current{opacity:1}.journal li.current{background:#ffffff09}.journal li>span{width:28px;height:28px;border:1px solid #78908c;display:grid;place-items:center;font-size:10px}.journal li.done>span{color:#eac46f;border-color:#eac46f}.journal li div{display:flex;flex-direction:column;flex:1}.journal li b{font:13px Cinzel}.journal li small{font-size:7px;letter-spacing:1.5px;color:#8fa39f}.journal li em{font:normal 12px Cinzel;color:#dbb866}
@media(max-width:800px){.topbar{height:66px;padding:0 15px}.weather,.icon-button span{display:none}.brand b{font-size:12px}.quest-card{top:82px;left:15px;width:285px;padding:18px}.quest-card h1{font-size:21px}.controls{left:15px;bottom:15px}.controls div:nth-child(n+2){display:none}.dialogue-panel{bottom:55px;min-height:170px;padding:18px}.portrait{display:none}.dialogue-copy{padding:0 12px}.dialogue-copy p{font-size:15px}.dialogue-panel{flex-wrap:wrap}.dialogue-panel button{margin-left:auto}.compass{top:76px}.stamina{display:none}}
</style>
