
"use strict";

/* =========================================
   LEGADO DE TREINADOR
   Banco de dados e sistema principal
========================================= */

const DB = {
  "Brasil": {
    icon: "🇧🇷",
    divs: [
      ["Série A", "elite", [
        "Atlético Paulista", "Rio Dourado", "Cruzeiro do Sul",
        "Flamengo Azul", "Grêmio Imperial", "Palmeiras Real",
        "Vila Carioca", "Bahia Atlântica", "Santos da Serra",
        "Minas Central", "Paraná Clube", "Goiás Verde",
        "Fortaleza Norte", "Ceará Unido", "Recife Náutico",
        "Porto Alegre FC"
      ]],
      ["Série B", "second", [
        "Bragança FC", "Litoral SC", "Amazonas Real",
        "Campinas Atlético", "Vitória Central", "Maringá Azul",
        "Joinville União", "Ponte Verde", "Guarani Paulista",
        "Criciúma Sul", "Londrina EC", "Cuiabá Oeste"
      ]]
    ]
  },

  "Inglaterra": {
    icon: "🏴",
    divs: [
      ["Premier Division", "elite", [
        "Manchester Royal", "Liverpool Red", "London United",
        "Chelsea Borough", "Arsenal City", "Tottenham North",
        "Newcastle Castle", "Aston Midland", "West Ham Town",
        "Brighton Coast", "Everton Blue", "Crystal Borough"
      ]],
      ["Championship", "second", [
        "Birmingham County", "Leeds Athletic", "Sunderland Albion",
        "Derby County", "Norwich Green", "Bristol City",
        "Coventry Blue", "Middlesbrough FC", "Sheffield North",
        "Watford Town"
      ]],
      ["League One", "third", [
        "Bolton Wanderers", "Portsmouth Harbor", "Reading Royals",
        "Charlton Athletic", "Blackpool Coast", "Wigan Borough"
      ]]
    ]
  },

  "Espanha": {
    icon: "🇪🇸",
    divs: [
      ["Liga Nacional", "elite", [
        "Madrid Royal", "Barcelona Azul", "Atlético Capital",
        "Sevilla Rojo", "Valencia Levante", "Bilbao Athletic",
        "Villarreal Gold", "Betis Andaluz", "Real Sociedad Norte",
        "Celta Vigo", "Mallorca Mar", "Osasuna Pamplona"
      ]],
      ["Liga 2", "second", [
        "Zaragoza Real", "Oviedo Norte", "Levante Valencia",
        "Málaga Costa", "Sporting Gijón", "Tenerife Isla",
        "Granada CF", "Eibar Industrial"
      ]]
    ]
  },

  "Itália": {
    icon: "🇮🇹",
    divs: [
      ["Serie Nacional", "elite", [
        "Milano Rosso", "Torino Real", "Roma Capital",
        "Napoli Vesúvio", "Lazio Bianca", "Firenze Viola",
        "Bologna Rosso", "Genova Azul", "Bergamo Atalanta",
        "Turim Piemonte", "Verona Arena", "Parma Ducal"
      ]],
      ["Serie 2", "second", [
        "Palermo Sicilia", "Bari Adriático", "Venezia Laguna",
        "Sampdoria Port", "Modena Giallo", "Pisa Torre",
        "Como Lago", "Brescia Nord"
      ]]
    ]
  },

  "Alemanha": {
    icon: "🇩🇪",
    divs: [
      ["Bundesliga", "elite", [
        "Munich Bayern", "Dortmund Amarelo", "Berlin Union",
        "Leverkusen 04", "Leipzig Red", "Frankfurt Adler",
        "Stuttgart Sul", "Hamburg Norte", "Bremen Werder",
        "Colônia Dom", "Gladbach Verde", "Hoffenheim 1899"
      ]],
      ["Bundesliga 2", "second", [
        "Nuremberg FC", "Hannover 96", "Hertha Berlin",
        "Düsseldorf Fortuna", "Kaiserslautern Rot",
        "Karlsruhe SC", "Dresden Dynamo", "Bochum Ruhr"
      ]]
    ]
  },

  "França": {
    icon: "🇫🇷",
    divs: [
      ["Ligue Nationale", "elite", [
        "Paris Saint", "Marseille Olympique", "Lyonnais Central",
        "Monaco Principado", "Lille Norte", "Rennes Rouge",
        "Nice Riviera", "Bordeaux Gironde", "Nantes Loire",
        "Toulouse Rose"
      ]],
      ["Ligue 2", "second", [
        "Auxerre Borgonha", "Metz Lorraine", "Caen Normand",
        "Grenoble Alpes", "Angers Loire", "Amiens Norte",
        "Troyes Azul", "Laval Mayenne"
      ]]
    ]
  },

  "Portugal": {
    icon: "🇵🇹",
    divs: [
      ["Liga Portugal", "elite", [
        "Lisboa Benfica", "Porto Dragão", "Sporting Verde",
        "Braga Minho", "Guimarães Vitória", "Boavista Porto",
        "Famalicão Norte", "Marítimo Ilha", "Rio Ave Verde",
        "Estoril Costa"
      ]],
      ["Liga 2", "second", [
        "Académica Coimbra", "Leixões Mar", "Nacional Madeira",
        "Farense Algarve", "Belenenses Lisboa", "Tondela Serra"
      ]]
    ]
  },

  "Argentina": {
    icon: "🇦🇷",
    divs: [
      ["Liga Argentina", "elite", [
        "Buenos Aires River", "Boca Capital", "Racing Avellaneda",
        "Independiente Rojo", "Rosario Central", "San Lorenzo Azul",
        "Lanús Granate", "Tigre Norte", "Belgrano Córdoba",
        "Talleres Córdoba"
      ]],
      ["Primera Nacional", "second", [
        "Quilmes Sur", "Banfield Verde", "Colón Santa Fé",
        "Gimnasia Plata", "Chacarita Juniors", "Almirante Brown"
      ]]
    ]
  },

  "Holanda": {
    icon: "🇳🇱",
    divs: [
      ["Eredivisie", "elite", [
        "Amsterdam Ajax", "Eindhoven PSV", "Rotterdam Feyenoord",
        "Alkmaar AZ", "Utrecht Central", "Twente Enschede",
        "Groningen Norte", "Heerenveen Frísia"
      ]],
      ["Eerste Divisie", "second", [
        "NAC Breda", "Willem Tilburg", "Groningen B",
        "Maastricht MVV", "Emmen Drenthe", "Dordrecht FC"
      ]]
    ]
  }
};

/* =========================================
   ESTADO DO JOGO
========================================= */

let selectedCountry = null;
let selectedDiv = null;
let selectedClub = null;
let game = null;
let timer = null;

const $ = id => document.getElementById(id);

function show(id) {
  document.querySelectorAll(".screen").forEach(el => {
    el.classList.remove("active");
  });

  const screen = $(id);
  if (screen) screen.classList.add("active");
}

/* =========================================
   SELEÇÃO DE PAÍS, DIVISÃO E CLUBE
========================================= */

function countries() {
  $("countryList").innerHTML = Object.entries(DB)
    .map(([name, data]) => `
      <button class="country ${selectedCountry === name ? "selected" : ""}"
              data-country="${name}">
        ${data.icon} <b>${name}</b>
        <small>${data.divs.length} divisões</small>
      </button>
    `).join("");

  document.querySelectorAll(".country").forEach(button => {
    button.onclick = () => {
      selectedCountry = button.dataset.country;
      selectedDiv = null;
      selectedClub = null;
      countries();
      divisions();
    };
  });
}

function divisions() {
  const list = selectedCountry ? DB[selectedCountry].divs : [];

  $("divisionList").innerHTML = list.length
    ? list.map((division, index) => `
        <button class="division ${selectedDiv === index ? "selected" : ""}"
                data-i="${index}">
          ${division[0]}
          <span>${division[1] === "elite" ? "1ª divisão" : "Divisão nacional"}</span>
        </button>
      `).join("")
    : '<p style="color:#7f998c">Escolha um país.</p>';

  document.querySelectorAll(".division").forEach(button => {
    button.onclick = () => {
      selectedDiv = Number(button.dataset.i);
      selectedClub = null;
      divisions();
      clubs();
    };
  });

  clubs();
}

function clubs() {
  const division = selectedCountry && selectedDiv !== null
    ? DB[selectedCountry].divs[selectedDiv]
    : null;

  $("clubList").innerHTML = division
    ? division[2].map((club, index) => `
        <button class="club ${selectedClub === club ? "selected" : ""}"
                data-club="${club}">
          <b>${club}</b>
          <small>${index < 3 ? "Favorito ao título" :
                    index < 6 ? "Briga por competições" :
                    "Objetivo: estabilidade"}</small>
        </button>
      `).join("")
    : '<p style="color:#7f998c">Escolha uma divisão para ver os clubes.</p>';

  $("selectionHint").textContent = division
    ? `${selectedCountry} • ${division[0]} • escolha seu clube`
    : "Selecione país e divisão.";

  document.querySelectorAll(".club").forEach(button => {
    button.onclick = () => {
      selectedClub = button.dataset.club;
      clubs();
    };
  });
}

/* =========================================
   JOGADORES E CRIAÇÃO DA CARREIRA
========================================= */

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makePlayers() {
  const first = [
    "Lucas", "Rafael", "Mateus", "Bruno", "Caio",
    "Diego", "Pedro", "Gustavo", "Henrique", "Felipe",
    "João", "Victor", "André", "Murilo", "Davi",
    "Thiago", "Enzo", "Arthur", "Nicolas", "Gabriel"
  ];

  const last = [
    "Silva", "Costa", "Mendes", "Ramos", "Oliveira",
    "Ferreira", "Alves", "Barbosa", "Martins", "Pereira",
    "Souza", "Rocha", "Teixeira", "Lima", "Carvalho"
  ];

  const positions = [
    "GOL", "ZAG", "ZAG", "LAT", "LAT", "VOL",
    "MEI", "MEI", "MEI", "ATA", "ATA", "ATA"
  ];

  return positions.map((position, index) => ({
    name: first[index] + " " + last[rand(0, last.length - 1)],
    pos: position,
    ov: rand(64, 84),
    age: rand(18, 32),
    value: rand(2, 28) / 2
  }));
}

function startCareer() {
  if (!selectedCountry || selectedDiv === null || !selectedClub) {
    alert("Escolha um país, uma divisão e um clube primeiro.");
    return;
  }

  const division = DB[selectedCountry].divs[selectedDiv];

  game = {
    club: selectedClub,
    country: selectedCountry,
    division: division[0],
    teams: [...division[2]],
    budget: 18.5,
    players: makePlayers(),
    season: "2026/27",
    opponent: division[2].find(team => team !== selectedClub) || "Rival FC",
    match: {
      m: 0, s: 0, h: 0, a: 0,
      run: false, spd: 1,
      shotsH: 0, shotsA: 0,
      attH: 0, attA: 0,
      pos: 50, finished: false
    },
    news: [
      "A diretoria apresentou suas metas para a temporada.",
      "O elenco iniciou a pré-temporada."
    ]
  };

  buildTable();
  renderGame();
  show("game");
  openTab("homeTab");
}

/* =========================================
   CAMPEONATO E PAINEL DO CLUBE
========================================= */

function buildTable() {
  game.table = game.teams.map((team, index) => ({
    t: team,
    p: index ? rand(0, 5) : 7,
    w: rand(1, 3),
    d: rand(0, 2),
    l: rand(0, 2),
    pts: rand(3, 10)
  })).sort((a, b) => b.pts - a.pts);
}

function renderGame() {
  if (!game) return;

  $("clubTitle").textContent = game.club;
  $("clubName").textContent = game.club;
  $("clubMeta").textContent = `${game.country} • ${game.division}`;
  $("budget").textContent = `€ ${game.budget.toFixed(1)} mi`;
  $("year").textContent = game.season;

  $("nextMatch").innerHTML =
    `<strong>${game.club}</strong><span> × </span><strong>${game.opponent}</strong>`;

  $("objectives").innerHTML = `
    <div class="stat">Objetivo da diretoria <b>Top 4</b></div>
    <div class="stat">Vitórias mínimas <b>12</b></div>
    <div class="stat">Orçamento salarial <b>€ 8,0 mi</b></div>
  `;

  $("news").innerHTML = game.news
    .map(news => `<div class="event">${news}</div>`).join("");

  $("squadTable").innerHTML =
    '<div class="row head"><span>Jogador</span><span>Pos</span><span>Idade</span><span>OVR</span><span>Valor</span></div>' +
    game.players.map(player => `
      <div class="row">
        <span>${player.name}</span>
        <span>${player.pos}</span>
        <span>${player.age}</span>
        <span>${player.ov}</span>
        <span>€ ${player.value.toFixed(1)}m</span>
      </div>
    `).join("");

  $("leagueTitle").textContent = `${game.division} — ${game.country}`;

  $("leagueTable").innerHTML =
    '<div class="row head"><span>Clube</span><span>J</span><span>V</span><span>D</span><span>Pts</span></div>' +
    game.table.map((row, index) => `
      <div class="row ${row.t === game.club ? "me" : ""}">
        <span>${index + 1}. ${row.t}</span>
        <span>${row.w + row.d + row.l}</span>
        <span>${row.w}</span>
        <span>${row.l}</span>
        <span>${row.pts}</span>
      </div>
    `).join("");

  const market = game.teams.filter(team => team !== game.club).slice(0, 6);
  const names = [
    "Marco Alves", "Rui Mendes", "Enzo Costa",
    "Daniel Rocha", "Leo Martins", "Caio Ramos"
  ];
  const positions = ["ATA", "MEI", "ZAG", "LAT", "VOL", "ATA"];

  $("market").innerHTML = market.map((club, index) => `
    <div class="market-card">
      <b>${names[index]}</b>
      <small>${club} • ${positions[index]} • OVR ${70 + index}</small>
      <p>Valor € ${(1.5 + index * 0.7).toFixed(1)}m</p>
      <button data-buy="${index}">Negociar</button>
    </div>
  `).join("");

  document.querySelectorAll("[data-buy]").forEach(button => {
    button.onclick = () => buy(Number(button.dataset.buy));
  });

  setupMatch();
}


function buy(index) {
  if (!game) return;

  const nomes = [
    "Marco Alves", "Rui Mendes", "Enzo Costa",
    "Daniel Rocha", "Leo Martins", "Caio Ramos"
  ];

  const posicoes = ["ATA", "MEI", "ZAG", "LAT", "VOL", "ATA"];
  const custo = 1.5 + index * 0.7;

  game.signedMarket = game.signedMarket || [];
  game.pendingTransfers = game.pendingTransfers || [];

  if (game.signedMarket.includes(index)) {
    alert("Esse jogador já foi contratado.");
    return;
  }

  if (game.budget < custo) {
    alert("Orçamento insuficiente.");
    return;
  }

  const jogador = {
    name: nomes[index],
    pos: posicoes[index],
    ov: 70 + index,
    age: rand(19, 29),
    value: custo
  };

  game.budget -= custo;
  game.signedMarket.push(index);

  const mes = Number((game.careerDate || "2026-07-01").slice(5, 7));
  const mesesAbertos = game.country === "Brasil"
    ? [1, 2, 7, 8]
    : [1, 7, 8];

  if (mesesAbertos.includes(mes)) {
    game.players.push(jogador);
    game.news.unshift(jogador.name + " chegou ao elenco.");
    alert(jogador.name + " contratado e disponível no elenco!");
  } else {
    game.pendingTransfers.push(jogador);
    game.news.unshift(jogador.name + " chegará na próxima janela.");
    alert(jogador.name + " contratado! Chegará na próxima janela.");
  }

  renderGame();
  openTab("marketTab");
}


function openTab(id) {
  document.querySelectorAll(".tabpage").forEach(page => {
    page.classList.remove("active");
  });

  const page = $(id);
  if (page) page.classList.add("active");

  document.querySelectorAll(".tab").forEach(button => {
    button.classList.toggle("active", button.dataset.tab === id);
  });
}

/* =========================================
   SIMULAÇÃO DA PARTIDA
========================================= */

function setupMatch() {
  const match = game.match;

  $("homeTeam").textContent = game.club;
  $("awayTeam").textContent = game.opponent;
  $("scoreH").textContent = match.h;
  $("scoreA").textContent = match.a;
  $("commentary").innerHTML =
    '<div class="event">A partida está pronta para começar.</div>';

  drawPitch();
  updateMatch();
}

function drawPitch() {
  const home = [
    [8, 50, "G"], [22, 18, "LD"], [28, 38, "Z1"],
    [28, 62, "Z2"], [22, 82, "LE"], [46, 35, "V"],
    [49, 50, "M"], [46, 67, "M"], [73, 22, "A"],
    [82, 50, "A"], [73, 78, "A"]
  ];

  const away = [
    [8, 50, "G"], [22, 18, "D"], [27, 38, "D"],
    [27, 62, "D"], [22, 82, "D"], [45, 35, "M"],
    [48, 50, "M"], [45, 66, "M"], [73, 25, "A"],
    [81, 50, "A"], [73, 75, "A"]
  ];

  $("playersH").innerHTML = "";
  $("playersA").innerHTML = "";

  function addPlayers(list, id, className) {
    list.forEach(player => {
      const element = document.createElement("div");
      element.className = "player " + className;
      element.textContent = player[2];
      element.style.top = player[0] + "%";
      element.style.left = player[1] + "%";
      $(id).appendChild(element);
    });
  }

  addPlayers(home, "playersH", "ph");
  addPlayers(away, "playersA", "pa");
}

function matchLog(message, className = "") {
  const element = document.createElement("div");
  element.className = "event " + className;
  element.textContent = message;
  $("commentary").prepend(element);
}

function updateMatch() {
  if (!game) return;

  const match = game.match;

  $("matchClock").textContent = match.finished
    ? "FIM DE JOGO"
    : match.m === 45 && !match.run
      ? "INTERVALO"
      : match.run
        ? String(match.m).padStart(2, "0") + ":" +
          String(match.s).padStart(2, "0")
        : "PRÉ-JOGO";

  $("scoreH").textContent = match.h;
  $("scoreA").textContent = match.a;

  $("stats").innerHTML = `
    <div class="stat">Posse <b>${Math.round(match.pos)}% — ${100 - Math.round(match.pos)}%</b></div>
    <div class="stat">Finalizações <b>${match.shotsH} — ${match.shotsA}</b></div>
    <div class="stat">Ataques perigosos <b>${match.attH} — ${match.attA}</b></div>
  `;
}

function moveBall(home) {
  $("ball").style.left = (home ? 54 + Math.random() * 40 : 6 + Math.random() * 40) + "%";
  $("ball").style.top = (10 + Math.random() * 80) + "%";

  const players = document.querySelectorAll(home ? ".ph" : ".pa");

  if (players.length) {
    const player = players[rand(0, players.length - 1)];
    player.classList.add("active");
    setTimeout(() => player.classList.remove("active"), 400);
  }
}

function matchTick() {
  if (!game || !game.match.run) return;

  const match = game.match;
  match.s += match.spd;

  if (match.s >= 60) {
    match.m += Math.floor(match.s / 60);
    match.s %= 60;
  }

  if (match.m >= 90) {
    match.m = 90;
    match.s = 0;
    match.run = false;
    match.finished = true;
    clearInterval(timer);
    matchLog(`FIM DE JOGO — ${match.h} x ${match.a}`);
  } else if (match.m === 45) {
    match.run = false;
    matchLog("INTERVALO — hora de ajustar a equipe.");
  } else if (Math.random() < 0.65) {
    const home = Math.random() < 0.55;
    if (home) match.attH++;
    else match.attA++;

    moveBall(home);

    if (Math.random() < 0.35) {
      if (home) match.shotsH++;
      else match.shotsA++;

      if (Math.random() < 0.11) {
        if (home) match.h++;
        else match.a++;

        matchLog("GOOOOOL! " + (home ? game.club : game.opponent) + " marca!");
      } else {
        matchLog((home ? game.club : game.opponent) +
          " finaliza, mas o goleiro salva.");
      }
    } else {
      matchLog((home ? game.club : game.opponent) +
        " avança com perigo.");
    }

    match.pos = Math.max(38, Math.min(62, match.pos + Math.random() * 4 - 2));
  }

  updateMatch();
}

function startMatch() {
  if (!game) {
    alert("Comece uma carreira antes de iniciar a partida.");
    return;
  }

  const match = game.match;
  if (match.finished || match.run) return;

  if (match.m === 45) {
    match.m = 46;
    match.s = 0;
    matchLog("Segundo tempo começou!");
  } else if (match.m === 0 && match.s === 0) {
    matchLog("Apita o árbitro! Bola rolando.");
  }

  match.run = true;
  clearInterval(timer);
  timer = setInterval(matchTick, 1000);
  updateMatch();
}

function pauseMatch() {
  if (game) {
    game.match.run = false;
    clearInterval(timer);
    updateMatch();
  }
}

/* =========================================
   SALVAMENTO E CARREGAMENTO
========================================= */

function saveGame() {
  if (!game) {
    alert("Não existe carreira para salvar.");
    return;
  }

  try {
    localStorage.setItem("fmcareer_current", JSON.stringify(game));
    alert("Carreira salva no dispositivo.");
  } catch (error) {
    alert("Não foi possível salvar: " + error.message);
  }
}

function loadGame() {
  try {
    const raw = localStorage.getItem("fmcareer_current");

    if (!raw) {
      alert("Nenhum jogo salvo encontrado neste dispositivo.");
      return;
    }

    game = JSON.parse(raw);

    if (!game || !game.match || !Array.isArray(game.players)) {
      game = null;
      alert("O arquivo salvo está inválido.");
      return;
    }

    game.match.run = false;
    clearInterval(timer);

    renderGame();
    show("game");
    openTab("homeTab");
  } catch (error) {
    alert("Erro ao carregar carreira: " + error.message);
  }
}

function saves() {
  const raw = localStorage.getItem("fmcareer_current");

  $("saveList").innerHTML = raw
    ? '<div class="save-item"><span>💾 Carreira atual</span><button id="quickLoad">Carregar</button></div>'
    : "";

  const button = $("quickLoad");
  if (button) button.onclick = loadGame;
}

/* =========================================
   EVENTOS DOS BOTÕES
========================================= */

function initializeGame() {
  $("newGame").onclick = () => {
    selectedCountry = null;
    selectedDiv = null;
    selectedClub = null;

    show("setup");
    countries();
    divisions();
  };

  $("loadGame").onclick = loadGame;

  document.querySelectorAll('[data-back="menu"]').forEach(button => {
    button.onclick = () => show("menu");
  });

  $("startCareer").onclick = startCareer;

  $("saveBtn").onclick = () => {
    if (!game) return;
    $("saveModal").classList.add("show");
    $("saveName").focus();
  };

  $("closeModal").onclick = () => {
    $("saveModal").classList.remove("show");
  };

  $("confirmSave").onclick = () => {
    saveGame();
    $("saveModal").classList.remove("show");
    saves();
  };

  $("menuBtn").onclick = () => {
    pauseMatch();
    show("menu");
    saves();
  };

  document.querySelectorAll(".tab").forEach(button => {
    button.onclick = () => openTab(button.dataset.tab);
  });

  $("startMatch").onclick = startMatch;
  $("pauseMatch").onclick = pauseMatch;

  document.querySelectorAll(".speed").forEach(button => {
    button.onclick = () => {
      if (!game) return;

      document.querySelectorAll(".speed").forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");
      game.match.spd = Number(button.dataset.speed);
    };
  });

  saves();
}

/* =========================================
   INICIALIZAÇÃO
========================================= */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeGame);
} else {
  initializeGame();
}

/* ==========================================
   LEGADO DE TREINADOR - EXPANSAO 1
   Gestao, treino, base, estadio e carreira
========================================== */
(function () {
  "use strict";

  function prepararJogo() {
    if (typeof game === "undefined" || !game) return false;

    if (!game.manager) {
      game.manager = {
        reputation: 50,
        salary: 10000,
        morale: 75
      };
    }

    if (!game.training) {
      game.training = {
        focus: "balanced",
        sessions: 0
      };
    }

    if (!game.academy) {
      game.academy = {
        level: 1,
        players: []
      };
    }

    if (!game.stadium) {
      game.stadium = {
        level: 1
      };
    }

    return true;
  }

  function dinheiro(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0
    });
  }

  function painelExpansao() {
    if (!prepararJogo()) {
      alert("Inicie ou carregue uma carreira primeiro.");
      return;
    }

    var antigo = document.getElementById("lt-expansao");
    if (antigo) antigo.remove();

    var painel = document.createElement("div");
    painel.id = "lt-expansao";
    painel.style.cssText =
      "position:fixed;inset:4%;z-index:99999;overflow:auto;" +
      "background:#101b25;color:#fff;padding:18px;" +
      "border:2px solid #42d392;border-radius:14px;" +
      "font-family:Arial,sans-serif;box-sizing:border-box";

    painel.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:center">
        <h2 style="margin:0;color:#42d392">LEGADO DE TREINADOR</h2>
        <button id="lt-fechar" style="padding:9px;background:#d94343;color:white;border:0;border-radius:6px">FECHAR ✕</button>
      </div>
      <p style="color:#bdc9d2">Central de desenvolvimento e gestão</p>
      <hr style="border-color:#344653">

      <h3>🏋️ Treinamento</h3>
      <p>Escolha o foco dos treinos da equipe.</p>
      <select id="lt-foco" style="padding:10px;width:100%;margin-bottom:8px">
        <option value="balanced">Treino equilibrado</option>
        <option value="attack">Ataque</option>
        <option value="defense">Defesa</option>
        <option value="physical">Preparação física</option>
      </select>
      <button id="lt-treinar" style="padding:12px;width:100%;background:#42d392;border:0;border-radius:7px;font-weight:bold">REALIZAR TREINAMENTO</button>
      <p id="lt-resultado"></p>

      <hr style="border-color:#344653">
      <h3>🌱 Categorias de base</h3>
      <p>Invista na estrutura para revelar jovens jogadores.</p>
      <p id="lt-base"></p>
      <button id="lt-revelar" style="padding:12px;width:100%;background:#237bc1;color:white;border:0;border-radius:7px">REVELAR JOVEM</button>
      <button id="lt-base-up" style="padding:12px;width:100%;margin-top:8px;background:#344653;color:white;border:0;border-radius:7px">MELHORAR BASE</button>
      <div id="lt-jovens"></div>

      <hr style="border-color:#344653">
      <h3>🏟️ Estádio</h3>
      <p id="lt-estadio"></p>
      <button id="lt-estadio-up" style="padding:12px;width:100%;background:#237bc1;color:white;border:0;border-radius:7px">AMPLIAR ESTÁDIO</button>

      <hr style="border-color:#344653">
      <h3>👔 Carreira do treinador</h3>
      <p id="lt-carreira"></p>
      <button id="lt-proposta" style="padding:12px;width:100%;background:#b88932;color:white;border:0;border-radius:7px">AVALIAR MINHA CARREIRA</button>
      <p id="lt-oferta"></p>
    `;

    document.body.appendChild(painel);

    function atualizar() {
      prepararJogo();

      document.getElementById("lt-base").textContent =
        "Nível da base: " + game.academy.level;

      document.getElementById("lt-estadio").textContent =
        "Nível do estádio: " + game.stadium.level;

      document.getElementById("lt-carreira").textContent =
        "Reputação: " + game.manager.reputation +
        " | Moral: " + game.manager.morale +
        " | Salário: " + dinheiro(game.manager.salary);

      document.getElementById("lt-jovens").innerHTML =
        "<h4>Jovens revelados</h4>" +
        (game.academy.players.length
          ? game.academy.players.map(function (p, i) {
              return "<p>" + (i + 1) + ". " + p.name +
                " — " + p.position + " — Nota " + p.rating +
                ' <button data-promover="' + i +
                '" style="padding:5px">Promover</button></p>';
            }).join("")
          : "<p>Nenhum jovem revelado ainda.</p>");
    }

    document.getElementById("lt-fechar").onclick = function () {
      painel.remove();
    };

    document.getElementById("lt-treinar").onclick = function () {
      var foco = document.getElementById("lt-foco").value;
      game.training.focus = foco;
      game.training.sessions++;

      var jogadores = Array.isArray(game.players) ? game.players :
        (game.team && Array.isArray(game.team.players) ? game.team.players : []);

      var atributo = foco === "attack" ? "attack" :
        foco === "defense" ? "defense" :
        foco === "physical" ? "stamina" : "overall";

      var melhorados = 0;

      jogadores.forEach(function (p) {
        if (p && typeof p[atributo] === "number" && p[atributo] < 99) {
          p[atributo] = Math.min(99, p[atributo] + 1);
          melhorados++;
        } else if (p && typeof p.overall === "number" &&
                   foco === "balanced" && p.overall < 99) {
          p.overall = Math.min(99, p.overall + 1);
          melhorados++;
        }
      });

      document.getElementById("lt-resultado").textContent =
        "Sessão " + game.training.sessions +
        " concluída. Jogadores com atributo melhorado: " +
        melhorados + ".";
      atualizar();
    };

    document.getElementById("lt-revelar").onclick = function () {
      var nomes = ["Lucas", "Gabriel", "Matheus", "Pedro", "Rafael",
        "Enzo", "Davi", "Caio", "Miguel", "Arthur"];
      var posicoes = ["GOL", "ZAG", "LAT", "MEI", "ATA"];

      var jovem = {
        name: nomes[Math.floor(Math.random() * nomes.length)] +
          " " + ["Silva", "Santos", "Oliveira", "Costa", "Souza"][
            Math.floor(Math.random() * 5)],
        age: 16 + Math.floor(Math.random() * 3),
        position: posicoes[Math.floor(Math.random() * posicoes.length)],
        rating: 50 + Math.floor(Math.random() * 16)
      };

      game.academy.players.push(jovem);
      document.getElementById("lt-resultado").textContent =
        "Novo jovem encontrado: " + jovem.name +
        ", " + jovem.age + " anos, " + jovem.position +
        ", nota " + jovem.rating + ".";
      atualizar();
    };

    document.getElementById("lt-base-up").onclick = function () {
      var custo = game.academy.level * 100000;

      if (typeof game.money === "number" && game.money >= custo) {
        game.money -= custo;
      } else if (typeof game.budget === "number" && game.budget >= custo) {
        game.budget -= custo;
      } else {
        alert("Saldo insuficiente ou orçamento não identificado. Custo: " +
          dinheiro(custo));
        return;
      }

      game.academy.level++;
      atualizar();
      alert("Centro de formação melhorado para nível " +
        game.academy.level + "!");
    };

    document.getElementById("lt-estadio-up").onclick = function () {
      var custo = game.stadium.level * 250000;

      if (typeof game.money === "number" && game.money >= custo) {
        game.money -= custo;
      } else if (typeof game.budget === "number" && game.budget >= custo) {
        game.budget -= custo;
      } else {
        alert("Saldo insuficiente ou orçamento não identificado. Custo: " +
          dinheiro(custo));
        return;
      }

      game.stadium.level++;
      atualizar();
      alert("Estádio ampliado para nível " + game.stadium.level + "!");
    };

    document.getElementById("lt-proposta").onclick = function () {
      game.manager.reputation = Math.min(100,
        game.manager.reputation + 1);

      var reputacao = game.manager.reputation;
      var salario = Math.round(
        game.manager.salary * (1 + reputacao / 1000)
      );

      document.getElementById("lt-oferta").textContent =
        reputacao >= 70
          ? "Seu treinador tem reputação elevada! Salário de referência: " +
            dinheiro(salario) + ". Esta é uma estimativa, não uma proposta real."
          : "Continue treinando a equipe e conquistando resultados. " +
            "Sua reputação atual é " + reputacao +
            ". Ainda não existe uma proposta real de outro clube.";
      atualizar();
    };

    document.getElementById("lt-jovens").onclick = function (evento) {
      var botao = evento.target.closest("[data-promover]");
      if (!botao) return;

      var indice = Number(botao.dataset.promover);
      var jovem = game.academy.players[indice];
      if (!jovem) return;

      if (!Array.isArray(game.players)) {
        alert("A estrutura atual dos jogadores do elenco precisa ser integrada antes de promover jovens.");
        return;
      }

      game.players.push({
        name: jovem.name,
        age: jovem.age,
        position: jovem.position,
        overall: jovem.rating
      });

      game.academy.players.splice(indice, 1);
      atualizar();
      alert(jovem.name + " foi adicionado ao elenco, se a estrutura aceitar novos jogadores.");
    };

    atualizar();
  }

  function instalarBotao() {
    if (document.getElementById("lt-abrir-expansao")) return;

    var botao = document.createElement("button");
    botao.id = "lt-abrir-expansao";
    botao.textContent = "🏆 GESTÃO AVANÇADA";
    botao.style.cssText =
      "position:fixed;bottom:14px;right:12px;z-index:99990;" +
      "padding:12px;background:#42d392;color:#102019;" +
      "font-weight:bold;border:0;border-radius:9px;" +
      "box-shadow:0 3px 10px #0008";

    botao.onclick = painelExpansao;
    document.body.appendChild(botao);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", instalarBotao);
  } else {
    instalarBotao();
  }
})();
