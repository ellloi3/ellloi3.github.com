// app.js
// Uses inline SVG strings in CHARACTERS.imageSVG and creates data URIs for thumbnails and arena images.

(() => {
  // DOM references
  const screens = {
    home: document.getElementById('home'),
    select: document.getElementById('select'),
    battle: document.getElementById('battle'),
    win: document.getElementById('win'),
    lose: document.getElementById('lose')
  };

  const startBtn = document.getElementById('startBtn');
  const charactersGrid = document.getElementById('charactersGrid');
  const backToHome = document.getElementById('backToHome');

  // Battle elements
  const playerAvatar = document.getElementById('playerAvatar');
  const aiAvatar = document.getElementById('aiAvatar');
  const playerNameEl = document.getElementById('playerName');
  const aiNameEl = document.getElementById('aiName');
  const playerHPBar = document.getElementById('playerHP');
  const aiHPBar = document.getElementById('aiHP');
  const playerHPText = document.getElementById('playerHPText');
  const aiHPText = document.getElementById('aiHPText');
  const battleLog = document.getElementById('battleLog');
  const attackBtn = document.getElementById('attackBtn');
  const specialBtn = document.getElementById('specialBtn');
  const autoBtn = document.getElementById('autoBtn');

  // Visual arena elements (img tags in index.html)
  const playerArt = document.getElementById('playerArt');
  const aiArt = document.getElementById('aiArt');
  const impact = document.getElementById('impact');

  // Win/Lose controls
  const winToSelect = document.getElementById('winToSelect');
  const loseToSelect = document.getElementById('loseToSelect');
  const winText = document.getElementById('winText');
  const loseText = document.getElementById('loseText');

  // App state
  let playerChar = null;
  let aiChar = null;
  let state = null; // { playerHP, aiHP, autoMode, turn, playerAttacks, aiAttacks, aiDefend }

  // Utilities
  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('visible'));
    screens[name].classList.add('visible');
  }

  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
  function randInt(min, max){ return Math.floor(Math.random()*(max-min+1)) + min; }

  // helper: create data URI from SVG string
  function svgToDataUri(svgString) {
    if (!svgString) return '';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svgString.trim());
  }

  // Initialize select grid from CHARACTERS (from characters.js)
  function renderCharacters() {
    charactersGrid.innerHTML = '';
    CHARACTERS.forEach(c => {
      const card = document.createElement('div');
      card.className = 'card';
      const imgSrc = c.imageSVG ? svgToDataUri(c.imageSVG) : '';
      const imgHtml = imgSrc ? `<img src="${imgSrc}" alt="${c.name}" style="width:56px;height:56px;object-fit:contain;border-radius:8px">` : `<div class="avatar ${c.colorClass}">${c.short}</div>`;
      card.innerHTML = `
        ${imgHtml}
        <div class="info">
          <div class="name">${c.name}</div>
          <div class="desc">HP ${c.maxHP} • ATK ${c.attackMin}-${c.attackMax} • Special after ${c.specialRequired} attacks</div>
        </div>
      `;
      card.addEventListener('click', () => onSelectCharacter(c.id));
      charactersGrid.appendChild(card);
    });
  }

  // Select player's character
  function onSelectCharacter(id) {
    playerChar = CHARACTERS.find(ch => ch.id === id);
    startBattle();
  }

  // Start a battle: AI chooses random opponent (not same id)
  function startBattle() {
    // choose AI character randomly, avoid the player's pick
    const possible = CHARACTERS.filter(c => c.id !== playerChar.id);
    aiChar = possible[randInt(0, possible.length - 1)];

    // initialize state
    state = {
      playerHP: playerChar.maxHP,
      aiHP: aiChar.maxHP,
      autoMode: false,
      turn: 'player', // player goes first
      playerAttacks: 0,
      aiAttacks: 0,
      aiDefend: false
    };

    // render UI
    playerAvatar.className = `avatar ${playerChar.colorClass}`;
    playerAvatar.textContent = playerChar.short;
    aiAvatar.className = `avatar ${aiChar.colorClass}`;
    aiAvatar.textContent = aiChar.short;
    playerNameEl.textContent = playerChar.name;
    aiNameEl.textContent = aiChar.name;

    // set visual arena images using data URIs built from the inline SVG
    playerArt.src = playerChar.imageSVG ? svgToDataUri(playerChar.imageSVG) : '';
    aiArt.src = aiChar.imageSVG ? svgToDataUri(aiChar.imageSVG) : '';

    updateHPUI();
    appendLog(`<div>Opponent: <strong>${aiChar.name}</strong> has been chosen by the AI.</div>`);
    showScreen('battle');
  }

  function updateHPUI() {
    const pPerc = Math.round((state.playerHP / playerChar.maxHP) * 100);
    const aPerc = Math.round((state.aiHP / aiChar.maxHP) * 100);
    playerHPBar.style.width = `${clamp(pPerc,0,100)}%`;
    aiHPBar.style.width = `${clamp(aPerc,0,100)}%`;
    playerHPText.textContent = `HP: ${Math.max(0, state.playerHP)} / ${playerChar.maxHP}`;
    aiHPText.textContent = `HP: ${Math.max(0, state.aiHP)} / ${aiChar.maxHP}`;

    if (pPerc < 30) playerHPBar.style.background = 'linear-gradient(90deg,#f97316,#ef4444)';
    else playerHPBar.style.background = 'linear-gradient(90deg,#34d399,#10b981)';
    if (aPerc < 30) aiHPBar.style.background = 'linear-gradient(90deg,#f97316,#ef4444)';
    else aiHPBar.style.background = 'linear-gradient(90deg,#34d399,#10b981)';

    updateSpecialUI();
  }

  function updateSpecialUI() {
    const pReq = playerChar.specialRequired;
    const pHave = state.playerAttacks;
    const pReady = pHave >= pReq;
    specialBtn.disabled = !pReady;
    specialBtn.textContent = pReady ? `Special (Ready)` : `Special (${pHave}/${pReq})`;
    autoBtn.textContent = state.autoMode ? 'Auto: ON' : 'Auto';
  }

  // Simple damage calculation
  function calcDamage(attacker, isSpecial=false) {
    const base = randInt(attacker.attackMin, attacker.attackMax);
    return Math.round(base * (isSpecial ? attacker.specialMultiplier : 1));
  }

  function appendLog(html) {
    const el = document.createElement('div');
    el.innerHTML = html;
    battleLog.prepend(el);
  }

  // Visual animation utilities
  function animateAttack(side, isSpecial=false) {
    const attackerImg = side === 'player' ? playerArt : aiArt;
    const defenderImg = side === 'player' ? aiArt : playerArt;

    attackerImg.classList.remove('attack', 'special');
    defenderImg.classList.remove('hit');
    void attackerImg.offsetWidth;

    if (isSpecial) attackerImg.classList.add('special');
    if (side === 'player') attackerImg.classList.add('attack', 'player'); else attackerImg.classList.add('attack', 'ai');

    setTimeout(() => {
      defenderImg.classList.add('hit');
      impact.classList.add('show');
      impact.style.width = isSpecial ? '110px' : '70px';
      impact.style.height = isSpecial ? '110px' : '70px';
      impact.style.background = isSpecial ? 'radial-gradient(circle, rgba(255,240,160,0.95), rgba(255,160,60,0.08))' : 'radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0.05))';
      setTimeout(() => impact.classList.remove('show'), 200);
    }, 180);

    setTimeout(() => {
      attackerImg.classList.remove('attack', 'player', 'ai');
      defenderImg.classList.remove('hit');
      attackerImg.classList.remove('special');
    }, 700);
  }

  // AI decision function (uses attack count restriction for special)
  function aiChooseAction() {
    const aiHPPercent = state.aiHP / aiChar.maxHP;
    const playerHPPercent = state.playerHP / playerChar.maxHP;
    let roll = Math.random();

    if (aiHPPercent < 0.3 && roll < 0.6) return 'defend';
    if (state.aiAttacks >= aiChar.specialRequired) {
      if (playerHPPercent < 0.25 && roll < 0.75) return 'special';
      if (roll < 0.65) return 'attack';
      return 'special';
    }
    return (roll < 0.85) ? 'attack' : 'defend';
  }

  // Player action handlers
  function playerAttack(isSpecial=false) {
    if (!state) return;
    if (state.turn !== 'player') return;
    if (isSpecial && state.playerAttacks < playerChar.specialRequired) {
      appendLog(`<em>Special not ready — you need ${playerChar.specialRequired - state.playerAttacks} more attack(s).</em>`);
      specialBtn.classList.add('shake');
      setTimeout(()=> specialBtn.classList.remove('shake'), 300);
      return;
    }

    const dmg = calcDamage(playerChar, isSpecial);
    let finalDmg = dmg;
    if (state.aiDefend) {
      finalDmg = Math.round(finalDmg * 0.5);
      state.aiDefend = false;
      appendLog(`<em>${aiChar.name} braces, reducing damage.</em>`);
    }

    state.aiHP -= finalDmg;
    if (isSpecial) {
      appendLog(`<strong>${playerChar.name}</strong> used SPECIAL and deals <strong>${finalDmg}</strong> damage!`);
      state.playerAttacks = 0;
    } else {
      appendLog(`<strong>${playerChar.name}</strong> attacks and deals <strong>${finalDmg}</strong> damage!`);
      state.playerAttacks = (state.playerAttacks || 0) + 1;
    }

    animateAttack('player', isSpecial);
    updateHPUI();
    checkBattleEndThenProceed('player');
  }

  function checkBattleEndThenProceed(lastActor) {
    if (state.aiHP <= 0) { endBattle(true); return; }
    if (state.playerHP <= 0) { endBattle(false); return; }

    if (lastActor === 'player') {
      state.turn = 'ai';
      setTimeout(aiTurn, 700);
    } else {
      state.turn = 'player';
      if (state.autoMode) {
        setTimeout(() => {
          const pReady = state.playerAttacks >= playerChar.specialRequired;
          const choice = pReady ? ((Math.random() < 0.45) ? 'special' : 'attack') : 'attack';
          if (choice === 'special') playerAttack(true); else playerAttack(false);
        }, 600);
      }
    }
  }

  function aiTurn() {
    if (!state || state.turn !== 'ai') return;
    let action = aiChooseAction();
    if (action === 'special' && state.aiAttacks < aiChar.specialRequired) action = 'attack';

    if (action === 'defend') {
      appendLog(`<em>${aiChar.name} defends and braces for impact.</em>`);
      state.aiDefend = true;
      checkBattleEndThenProceed('ai');
      return;
    }

    if (action === 'attack') {
      const dmg = calcDamage(aiChar, false);
      state.playerHP -= dmg;
      appendLog(`<strong>${aiChar.name}</strong> attacks and deals <strong>${dmg}</strong> damage!`);
      state.aiAttacks = (state.aiAttacks || 0) + 1;
      animateAttack('ai', false);
      updateHPUI();
      checkBattleEndThenProceed('ai');
      return;
    }

    if (action === 'special') {
      const dmg = calcDamage(aiChar, true);
      state.playerHP -= dmg;
      appendLog(`<strong>${aiChar.name}</strong> uses SPECIAL and deals <strong>${dmg}</strong> damage!`);
      state.aiAttacks = 0;
      animateAttack('ai', true);
      updateHPUI();
      checkBattleEndThenProceed('ai');
      return;
    }

    checkBattleEndThenProceed('ai');
  }

  function endBattle(didPlayerWin) {
    state.autoMode = false;
    if (didPlayerWin) {
      winText.textContent = `You defeated ${aiChar.name}!`;
      showScreen('win');
    } else {
      loseText.textContent = `${aiChar.name} defeated you...`;
      showScreen('lose');
    }
  }

  // Wire buttons
  startBtn.addEventListener('click', () => {
    renderCharacters();
    showScreen('select');
  });

  backToHome.addEventListener('click', () => showScreen('home'));

  attackBtn.addEventListener('click', () => { if (!state) return; playerAttack(false); });
  specialBtn.addEventListener('click', () => { if (!state) return; playerAttack(true); });
  autoBtn.addEventListener('click', () => {
    if (!state) return;
    state.autoMode = !state.autoMode;
    autoBtn.textContent = state.autoMode ? 'Auto: ON' : 'Auto';
    if (state.autoMode && state.turn === 'player') {
      setTimeout(() => {
        const pReady = state.playerAttacks >= playerChar.specialRequired;
        const choice = pReady ? ((Math.random() < 0.35) ? 'special' : 'attack') : 'attack';
        if (choice === 'special') playerAttack(true); else playerAttack(false);
      }, 400);
    }
    updateSpecialUI();
  });

  winToSelect.addEventListener('click', () => { renderCharacters(); showScreen('select'); });
  loseToSelect.addEventListener('click', () => { renderCharacters(); showScreen('select'); });

  // initial render
  renderCharacters();
  showScreen('home');

  // keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (!state) return;
    if (screens.battle.classList.contains('visible')) {
      if (e.key === 'a') attackBtn.click();
      if (e.key === 's') specialBtn.click();
      if (e.key === 'd') autoBtn.click();
    }
  });

})();
