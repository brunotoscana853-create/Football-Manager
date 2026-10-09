const DB={
"Brasil":{"icon":"🇧🇷","divs":[
["Série A","elite",["Atlético Paulista","Rio Dourado","Cruzeiro do Sul","Flamengo Azul","Grêmio Imperial","Palmeiras Real","Vila Carioca","Bahia Atlântica","Santos da Serra","Minas Central","Paraná Clube","Goiás Verde","Fortaleza Norte","Ceará Unido","Recife Náutico","Porto Alegre FC"]],
["Série B","second",["Bragança FC","Litoral SC","Amazonas Real","Campinas Atlético","Vitória Central","Maringá Azul","Joinville União","Ponte Verde","Guarani Paulista","Criciúma Sul","Londrina EC","Cuiabá Oeste"]]],
"Inglaterra":{"icon":"🏴","divs":[
["Premier Division","elite",["Manchester Royal","Liverpool Red","London United","Chelsea Borough","Arsenal City","Tottenham North","Newcastle Castle","Aston Midland","West Ham Town","Brighton Coast","Everton Blue","Crystal Borough"]],
["Championship","second",["Birmingham County","Leeds Athletic","Sunderland Albion","Derby County","Norwich Green","Bristol City","Coventry Blue","Middlesbrough FC","Sheffield North","Watford Town"]],
["League One","third",["Bolton Wanderers","Portsmouth Harbor","Reading Royals","Charlton Athletic","Blackpool Coast","Wigan Borough"]]],
"Espanha":{"icon":"🇪🇸","divs":[["Liga Nacional","elite",["Madrid Royal","Barcelona Azul","Atlético Capital","Sevilla Rojo","Valencia Levante","Bilbao Athletic","Villarreal Gold","Betis Andaluz","Real Sociedad Norte","Celta Vigo","Mallorca Mar","Osasuna Pamplona"]],["Liga 2","second",["Zaragoza Real","Oviedo Norte","Levante Valencia","Málaga Costa","Sporting Gijón","Tenerife Isla","Granada CF","Eibar Industrial"]]]},
"Itália":{"icon":"🇮🇹","divs":[["Serie Nacional","elite",["Milano Rosso","Torino Real","Roma Capital","Napoli Vesúvio","Lazio Bianca","Firenze Viola","Bologna Rosso","Genova Azul","Bergamo Atalanta","Turim Piemonte","Verona Arena","Parma Ducal"]],["Serie 2","second",["Palermo Sicilia","Bari Adriático","Venezia Laguna","Sampdoria Port","Modena Giallo","Pisa Torre","Como Lago","Brescia Nord"]]]},
"Alemanha":{"icon":"🇩🇪","divs":[["Bundesliga","elite",["Munich Bayern","Dortmund Amarelo","Berlin Union","Leverkusen 04","Leipzig Red","Frankfurt Adler","Stuttgart Sul","Hamburg Norte","Bremen Werder","Colônia Dom","Gladbach Verde","Hoffenheim 1899"]],["Bundesliga 2","second",["Nuremberg FC","Hannover 96","Hertha Berlin","Düsseldorf Fortuna","Kaiserslautern Rot","Karlsruhe SC","Dresden Dynamo","Bochum Ruhr"]]]},
"França":{"icon":"🇫🇷","divs":[["Ligue Nationale","elite",["Paris Saint","Marseille Olympique","Lyonnais Central","Monaco Principado","Lille Norte","Rennes Rouge","Nice Riviera","Bordeaux Gironde","Nantes Loire","Toulouse Rose"]],["Ligue 2","second",["Auxerre Borgonha","Metz Lorraine","Caen Normand","Grenoble Alpes","Angers Loire","Amiens Norte","Troyes Azul","Laval Mayenne"]]]},
"Portugal":{"icon":"🇵🇹","divs":[["Liga Portugal","elite",["Lisboa Benfica","Porto Dragão","Sporting Verde","Braga Minho","Guimarães Vitória","Boavista Porto","Famalicão Norte","Marítimo Ilha","Rio Ave Verde","Estoril Costa"]],["Liga 2","second",["Académica Coimbra","Leixões Mar","Nacional Madeira","Farense Algarve","Belenenses Lisboa","Tondela Serra"]]]},
"Argentina":{"icon":"🇦🇷","divs":[["Liga Argentina","elite",["Buenos Aires River","Boca Capital","Racing Avellaneda","Independiente Rojo","Rosario Central","San Lorenzo Azul","Lanús Granate","Tigre Norte","Belgrano Córdoba","Talleres Córdoba"]],["Primera Nacional","second",["Quilmes Sur","Banfield Verde","Colón Santa Fé","Gimnasia Plata","Chacarita Juniors","Almirante Brown"]]]},
"Holanda":{"icon":"🇳🇱","divs":[["Eredivisie","elite",["Amsterdam Ajax","Eindhoven PSV","Rotterdam Feyenoord","Alkmaar AZ","Utrecht Central","Twente Enschede","Groningen Norte","Heerenveen Frísia"]],["Eerste Divisie","second",["NAC Breda","Willem Tilburg","Groningen B","Maastricht MVV","Emmen Drenthe","Dordrecht FC"]]]}
};

let selectedCountry=null, selectedDiv=null, selectedClub=null;
let game=null, timer=null;

const $=id=>document.getElementById(id);
function show(id){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));$(id).classList.add('active')}
function countries(){
  $('countryList').innerHTML=Object.entries(DB).map(([n,d])=>`<button class="country ${selectedCountry===n?'selected':''}" data-country="${n}">${d.icon} <b>${n}</b><small>${d.divs.length} divisões</small></button>`).join('');
  document.querySelectorAll('.country').forEach(b=>b.onclick=()=>{selectedCountry=b.dataset.country;selectedDiv=null;selectedClub=null;countries();divisions()})
}
function divisions(){
  const ds=selectedCountry?DB[selectedCountry].divs:[];
  $('divisionList').innerHTML=ds.length?ds.map((d,i)=>`<button class="division ${selectedDiv===i?'selected':''}" data-i="${i}">${d[0]}<span>${d[1]==='elite'?'1ª divisão':'Divisão nacional'}</span></button>`).join(''):'<p style="color:#7f998c">Escolha um país.</p>';
  document.querySelectorAll('.division').forEach(b=>b.onclick=()=>{selectedDiv=+b.dataset.i;selectedClub=null;divisions();clubs()});
  clubs()
}
function clubs(){
  const ds=selectedCountry&&selectedDiv!==null?DB[selectedCountry].divs[selectedDiv]:null;
  $('clubList').innerHTML=ds?ds[2].map((c,i)=>`<button class="club ${selectedClub===c?'selected':''}" data-club="${c}"><b>${c}</b><small>${i<3?'Favorito ao título':i<6?'Briga por competições':'Objetivo: estabilidade'}</small></button>`).join(''):'<p style="color:#7f998c">Escolha uma divisão para ver os clubes.</p>';
  $('selectionHint').textContent=ds?`${selectedCountry} • ${ds[0]} • escolha seu clube`:'Selecione país e divisão.';
  document.querySelectorAll('.club').forEach(b=>b.onclick=()=>{selectedClub=b.dataset.club;clubs()})
}
function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}
function makePlayers(club){
 const first=['Lucas','Rafael','Mateus','Bruno','Caio','Diego','Pedro','Gustavo','Henrique','Felipe','João','Victor','André','Murilo','Davi','Thiago','Enzo','Arthur','Nicolas','Gabriel'];
 const last=['Silva','Costa','Mendes','Ramos','Oliveira','Ferreira','Alves','Barbosa','Martins','Pereira','Souza','Rocha','Teixeira','Lima','Carvalho'];
 const pos=['GOL','ZAG','ZAG','LAT','LAT','VOL','MEI','MEI','MEI','ATA','ATA','ATA'];
 return pos.map((p,i)=>({name:first[i]+' '+last[rand(0,last.length-1)],pos:p,ov:rand(64,84),age:rand(18,32),value:rand(1,14)/2}));
}
function startCareer(){
 if(!selectedClub){alert('Escolha um clube primeiro.');return}
 const d=DB[selectedCountry].divs[selectedDiv];
 game={club:selectedClub,country:selectedCountry,division:d[0],teams:d[2],budget:18.5,players:makePlayers(selectedClub),season:'2026/27',opponent:d[2].find(x=>x!==selectedClub)||'Rival FC',match:{m:0,s:0,h:0,a:0,run:false,spd:1,shotsH:0,shotsA:0,attH:0,attA:0,pos:50,finished:false},news:['A diretoria apresentou suas metas para a temporada.','O elenco iniciou a pré-temporada.']};
 buildTable();renderGame();show('game');openTab('homeTab')
}
function buildTable(){game.table=game.teams.map((t,i)=>({t,p:i?rand(0,5):7,w:rand(1,3),d:rand(0,2),l:rand(0,2),pts:rand(3,10)})).sort((a,b)=>b.pts-a.pts)}
function renderGame(){
 $('clubTitle').textContent=game.club;$('clubName').textContent=game.club;$('clubMeta').textContent=`${game.country} • ${game.division}`;$('budget').textContent=`€ ${game.budget.toFixed(1)} mi`;$('year').textContent=game.season;
 $('nextMatch').innerHTML=`<strong>${game.club}</strong><span>×</span><strong>${game.opponent}</strong>`;
 $('objectives').innerHTML='<div class="stat">Objetivo da diretoria <b>Top 4</b></div><div class="stat">Vitórias mínimas <b>12</b></div><div class="stat">Orçamento salarial <b>€ 8,0 mi</b></div>';
 $('news').innerHTML=game.news.map(n=>`<div class="event">${n}</div>`).join('');
 $('squadTable').innerHTML='<div class="row head"><span>Jogador</span><span>Pos</span><span>Idade</span><span>OVR</span><span>Valor</span></div>'+game.players.map(p=>`<div class="row"><span>${p.name}</span><span>${p.pos}</span><span>${p.age}</span><span>${p.ov}</span><span>€ ${p.value.toFixed(1)}m</span></div>`).join('');
 $('leagueTitle').textContent=`${game.division} — ${game.country}`;
 $('leagueTable').innerHTML='<div class="row head"><span>Clube</span><span>J</span><span>V</span><span>D</span><span>Pts</span></div>'+game.table.map((r,i)=>`<div class="row ${r.t===game.club?'me':''}"><span>${i+1}. ${r.t}</span><span>${r.w+r.d+r.l}</span><span>${r.w}</span><span>${r.l}</span><span>${r.pts}</span></div>`).join('');
 const market=game.teams.filter(x=>x!==game.club).slice(0,6);
 $('market').innerHTML=market.map((c,i)=>`<div class="market-card"><b>${['Marco Alves','Rui Mendes','Enzo Costa','Daniel Rocha','Leo Martins','Caio Ramos'][i]}</b><small>${c} • ${['ATA','MEI','ZAG','LAT','VOL','ATA'][i]} • OVR ${70+i}</small><p>Valor € ${(1.5+i*.7).toFixed(1)}m</p><button onclick="buy(${i})">Negociar</button></div>`).join('');
 setupMatch()
}
function buy(i){const cost=1.5+i*.7;if(game.budget<cost){alert('Orçamento insuficiente.');return}game.budget-=cost;game.news.unshift('O clube abriu negociação por um novo reforço.');renderGame();openTab('marketTab')}
function openTab(id){document.querySelectorAll('.tabpage').forEach(x=>x.classList.remove('active'));$(id).classList.add('active');document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.tab===id))}
function setupMatch(){
 const m=game.match;$('homeTeam').textContent=game.club;$('awayTeam').textContent=game.opponent;$('scoreH').textContent=m.h;$('scoreA').textContent=m.a;$('commentary').innerHTML='<div class="event">A partida está pronta para começar.</div>';drawPitch();updateMatch()
}
function drawPitch(){
 const h=[[8,50,'G'],[22,18,'LD'],[28,38,'Z1'],[28,62,'Z2'],[22,82,'LE'],[46,35,'V'],[49,50,'M'],[46,67,'M'],[73,22,'A'],[82,50,'A'],[73,78,'A']];
 const a=[[8,50,'G'],[22,18,'D'],[27,38,'D'],[27,62,'D'],[22,82,'D'],[45,35,'M'],[48,50,'M'],[45,66,'M'],[73,25,'A'],[81,50,'A'],[73,75,'A']];
 $('playersH').innerHTML='';$('playersA').innerHTML='';
 const make=(arr,id,cl)=>arr.forEach(p=>{let e=document.createElement('div');e.className='player '+cl;e.textContent=p[2];e.style.top=p[0]+'%';e.style.left=p[1]+'%';$(id).appendChild(e)});
 make(h,'playersH','ph');make(a,'playersA','pa')
}
function matchLog(t,c=''){let e=document.createElement('div');e.className='event '+c;e.innerHTML=t;$('commentary').prepend(e)}
function updateMatch(){const m=game.match;$('matchClock').textContent=m.finished?'FIM DE JOGO':m.m===45&&!m.run?'INTERVALO':m.run?String(m.m).padStart(2,'0')+':'+String(m.s).padStart(2,'0'):'PRÉ-JOGO';$('scoreH').textContent=m.h;$('scoreA').textContent=m.a;$('stats').innerHTML=`<div class="stat">Posse <b>${Math.round(m.pos)}% — ${100-Math.round(m.pos)}%</b></div><div class="stat">Finalizações <b>${m.shotsH} — ${m.shotsA}</b></div><div class="stat">Ataques perigosos <b>${m.attH} — ${m.attA}</b></div>`}
function moveBall(home){$('ball').style.left=(home?54+Math.random()*40:6+Math.random()*40)+'%';$('ball').style.top=(10+Math.random()*80)+'%';let q=document.querySelectorAll(home?'.ph':'.pa');if(q.length){let e=q[rand(0,q.length-1)];e.classList.add('active');setTimeout(()=>e.classList.remove('active'),400)}}
function matchTick(){const m=game.match;if(!m.run)return;m.s+=m.spd;if(m.s>=60){m.m+=Math.floor(m.s/60);m.s%=60}if(m.m===45){m.run=false;matchLog('<b>⏸ INTERVALO</b> — hora de ajustar a equipe.')}else if(m.m>=90){m.m=90;m.s=0;m.run=false;m.finished=true;matchLog(`<b>🏁 FIM DE JOGO</b> — ${m.h} x ${m.a}`)}else if(Math.random()<.65){const home=Math.random()<.55+(game.division.includes('2')?0:0.03);home?m.attH++:m.attA++;moveBall(home);if(Math.random()<.35){home?m.shotsH++:m.shotsA++;if(Math.random()<.11){home?m.h++:m.a++;matchLog('⚽ <b>GOOOOOOL!</b> '+(home?game.club+' marca!':game.opponent+' marca!'),'goal')}else matchLog((home?game.club:game.opponent)+' finaliza, mas o goleiro salva.')}else matchLog((home?game.club:game.opponent)+' avança com perigo.');m.pos=Math.max(38,Math.min(62,m.pos+(Math.random()*4-2)))}updateMatch()}
function startMatch(){const m=game.match;if(m.finished)return;if(m.m===45){m.m=46;m.s=0;matchLog('🔔 Segundo tempo começou!')}else if(m.m===0&&m.s===0)matchLog('🔔 Apita o árbitro! Bola rolando.');m.run=true;clearInterval(timer);timer=setInterval(matchTick,1000);updateMatch()}
function pauseMatch(){game.match.run=false;clearInterval(timer);updateMatch()}
function saveGame(){localStorage.setItem('fmcareer_current',JSON.stringify(game));alert('Carreira salva no navegador.')}
function loadGame(){const raw=localStorage.getItem('fmcareer_current');if(!raw){alert('Nenhum jogo salvo encontrado neste navegador.');return}game=JSON.parse(raw);renderGame();show('game');openTab('homeTab')}
function saves(){const raw=localStorage.getItem('fmcareer_current');$('saveList').innerHTML=raw?'<div class="save-item"><span>💾 Carreira atual</span><button id="quickLoad">Carregar</button></div>':'';if($('quickLoad'))$('quickLoad').onclick=loadGame}
document.getElementById('newGame').onclick=()=>{show('setup');countries();divisions()}
document.getElementById('loadGame').onclick=loadGame;
document.querySelectorAll('[data-back="menu"]').forEach(b=>b.onclick=()=>show('menu'));
document.getElementById('startCareer').onclick=startCareer;
document.getElementById('saveBtn').onclick=()=>{$('saveModal').classList.add('show');$('saveName').focus()};
document.getElementById('closeModal').onclick=()=>$('saveModal').classList.remove('show');
document.getElementById('confirmSave').onclick=()=>{saveGame();$('saveModal').classList.remove('show');saves()};
document.getElementById('menuBtn').onclick=()=>{pauseMatch();show('menu');saves()};
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>openTab(b.dataset.tab));
document.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>openTab(b.dataset.open));
document.getElementById('startMatch').onclick=startMatch;document.getElementById('pauseMatch').onclick=pauseMatch;
document.querySelectorAll('.speed').forEach(b=>b.onclick=()=>{document.querySelectorAll('.speed').forEach(x=>x.classList.remove('active'));b.classList.add('active');game.match.spd=+b.dataset.speed});
saves();