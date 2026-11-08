(function(){
"use strict";
var EN = /^en/i.test(document.documentElement.lang || '');
function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }
var C = {sky:'#94BECB', sky2:'#BCD6DF', peach:'#FADFC3', ink:'#484746', ink2:'#3d3c3b', deep:'#2E6B80'};

/* ======================= REFERENCES ======================= */
var REFS = {
  michaelsen:{s:'Michaelsen et al. (2004)', full:'Michaelsen, L. K., Knight, A. B., & Fink, L. D. (2004). Team-Based Learning: A Transformative Use of Small Groups in College Teaching. Stylus. (국역: 팀 기반 학습, 학지사, 2009)', url:'https://www.routledge.com/Team-Based-Learning-A-Transformative-Use-of-Small-Groups-in-College-Teaching/Michaelsen-Knight-Fink/p/book/9781579220860'},
  vygotsky:{s:'Vygotsky (1978)', full:'Vygotsky, L. S. (1978). Mind in Society: The Development of Higher Psychological Processes. Harvard University Press.', url:''},
  heller1992:{s:'Heller et al. (1992)', full:'Heller, P., Keith, R., & Anderson, S. (1992). Teaching problem solving through cooperative grouping. Part 1: Group versus individual problem solving. American Journal of Physics, 60, 627–636.', url:'https://doi.org/10.1119/1.17117'},
  johnson1999:{s:'Johnson & Johnson (1999)', full:'Johnson, D. W., & Johnson, R. T. (1999). Making cooperative learning work. Theory Into Practice, 38(2), 67–73.', url:'https://doi.org/10.1080/00405849909543834'},
  black1998:{s:'Black & Wiliam (1998)', full:'Black, P., & Wiliam, D. (1998). Assessment and classroom learning. Assessment in Education: Principles, Policy & Practice, 5(1), 7–74.', url:'https://doi.org/10.1080/0969595980050102'},
  shindler2004:{s:'Shindler (2004)', full:'Shindler, J. V. (2004). "Greater than the sum of the parts?" Examining the soundness of collaborative exams in teacher education courses. Innovative Higher Education, 28, 273–283.', url:'https://doi.org/10.1023/B:IHIE.0000018910.08228.39'},
  zipp2007:{s:'Zipp (2007)', full:'Zipp, J. F. (2007). Learning by exams: The impact of two-stage cooperative tests. Teaching Sociology, 35(1), 62–76.', url:'https://doi.org/10.1177/0092055X0703500105'},
  giuliodori2008:{s:'Giuliodori et al. (2008)', full:'Giuliodori, M. J., Lujan, H. L., & DiCarlo, S. E. (2008). Collaborative group testing benefits high- and low-performing students. Advances in Physiology Education, 32(4), 274–278.', url:'https://doi.org/10.1152/advan.00101.2007'},
  leight2012:{s:'Leight et al. (2012)', full:'Leight, H., Saunders, C., Calkins, R., & Withers, M. (2012). Collaborative testing improves performance but not content retention in a large-enrollment introductory biology class. CBE—Life Sciences Education, 11(4), 392–401.', url:'https://doi.org/10.1187/cbe.12-04-0048'},
  wieman2014:{s:'Wieman et al. (2014)', full:'Wieman, C. E., Rieger, G. W., & Heiner, C. E. (2014). Physics exams that promote collaborative learning. The Physics Teacher, 52(1), 51–53.', url:'https://doi.org/10.1119/1.4849159'},
  rieger2014:{s:'Rieger & Heiner (2014)', full:'Rieger, G. W., & Heiner, C. E. (2014). Examinations that support collaborative learning: The students\' perspective. Journal of College Science Teaching, 43(4), 41–47.', url:'https://doi.org/10.2505/4/jcst14_043_04_41'},
  jangmazur2015:{s:'Jang & Mazur (2015)', full:'Jang, H., & Mazur, E. (2015). A key for team exams: Balanced teams. AAPT Summer Meeting.', url:''},
  jang2017:{s:'Jang et al. (2017)', full:'Jang, H., Lasry, N., Miller, K., & Mazur, E. (2017). Collaborative exams: Cheating? Or learning? American Journal of Physics, 85(3), 223–227.', url:'https://doi.org/10.1119/1.4974744'},
  rempel2021:{s:'Rempel et al. (2021)', full:'Rempel, B. P., Dirks, M. B., & McGinitie, E. G. (2021). Two-stage testing reduces student-perceived exam anxiety in introductory chemistry. Journal of Chemical Education, 98(8), 2527–2535.', url:'https://doi.org/10.1021/acs.jchemed.1c00219'},
  lee2022:{s:'Lee et al. (2022)', full:'Lee, T. R. C., Pye, M., Lilje, O., Nguyen, H. D., Hockey, S., de Bruyn, M., & van den Berg, F. T. (2022). Two-stage examinations in STEM: A narrative literature review. International Journal of Innovation in Science and Mathematics Education, 30, 73–90.', url:'https://doi.org/10.30722/IJISME.30.05.005'},
  levy2023:{s:'Levy et al. (2023)', full:'Levy, D., Svoronos, T., & Klinger, M. (2023). Two-stage examinations: Can examinations be more formative experiences? Active Learning in Higher Education, 24(2), 79–94.', url:'https://doi.org/10.1177/1469787418801668'},
  jang2024:{s:'Jang et al. (2024)', full:'Jang, H., Rashid, J., & Lee, J. (2024). A qualitative study of the experiences and perceptions of Korean undergraduates regarding two-stage examinations. Sustainability, 16(18), 8273.', url:'https://doi.org/10.3390/su16188273'},
  jang2025:{s:'Jang (2025)', full:'Jang, H. (2025). Less is more: A multimodal exploration of how limited AI shapes team physics problem solving. New Physics: Sae Mulli, 75(5), 449–467.', url:'https://doi.org/10.3938/NPSM.75.449'},
  hutchins1995:{s:'Hutchins (1995)', full:'Hutchins, E. (1995). Cognition in the Wild. MIT Press.', url:'https://mitpress.mit.edu/9780262082310/cognition-in-the-wild/'}
};

/* ======================= MASCOT ======================= */
function mascot(o){
  o = o || {};
  var acc = o.acc || '', eyes = o.eyes || 'normal';
  var s = '<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">';
  if (acc === 'cap') s += '';
  s += '<g class="m-body"><rect x="70" y="20" width="60" height="60" rx="30"/><rect x="52" y="50" width="96" height="58" rx="29"/><rect x="36" y="82" width="128" height="58" rx="29"/><rect x="20" y="114" width="160" height="60" rx="30"/></g>';
  s += '<g class="m-feet"><circle cx="62" cy="176" r="13"/><circle cx="138" cy="176" r="13"/></g>';
  if (o.blush) s += '<ellipse class="m-blush" cx="68" cy="100" rx="9" ry="5.5"/><ellipse class="m-blush" cx="132" cy="100" rx="9" ry="5.5"/>';
  if (eyes === 'happy') {
    s += '<path class="m-happy" d="M78,82 q10,-13 20,0 M102,82 q10,-13 20,0"/>';
  } else {
    s += '<g class="m-eyes"><ellipse class="m-white" cx="88" cy="78" rx="10.5" ry="13"/><ellipse class="m-white" cx="112" cy="78" rx="10.5" ry="13"/>' +
         '<g class="m-pupils"><ellipse cx="91" cy="80.5" rx="6.8" ry="9.2"/><ellipse cx="115" cy="80.5" rx="6.8" ry="9.2"/></g></g>';
  }
  if (acc === 'glasses') s += '<g class="m-acc-line"><circle cx="87" cy="79" r="15"/><circle cx="113" cy="79" r="15"/><path d="M98,77 h4"/></g>';
  if (acc === 'cap') s += '<g><rect class="m-acc-dark" x="78" y="16" width="44" height="14" rx="3"/><polygon class="m-acc-dark" points="100,-2 156,14 100,30 44,14"/><path d="M152,14 v20" stroke="#FADFC3" stroke-width="3.5"/><circle class="m-acc-peach" cx="152" cy="37" r="5"/></g>';
  if (acc === 'pencil') s += '<g transform="rotate(28 168 118)"><rect class="m-acc-peach" x="161" y="70" width="14" height="56" rx="2"/><rect class="m-acc-dark" x="161" y="70" width="14" height="10" rx="2"/><polygon class="m-acc-dark" points="161,126 175,126 168,142"/></g>';
  if (acc === 'book') s += '<g><path class="m-acc-peach" d="M62,128 q38,-14 38,2 q0,-16 38,-2 v36 q-38,-14 -38,2 q0,-16 -38,-2z" stroke="#2f2e2d" stroke-width="3.5" stroke-linejoin="round"/><path d="M100,130 v36" stroke="#2f2e2d" stroke-width="3"/></g>';
  if (acc === 'tie') s += '<polygon class="m-acc-peach" points="93,108 107,108 103,118 110,146 100,158 90,146 97,118" stroke="#2f2e2d" stroke-width="3" stroke-linejoin="round"/>';
  if (acc === 'heart') s += '<path class="m-acc-peach" d="M160,30 c0,-10 14,-12 16,-2 c2,-10 16,-8 16,2 c0,12 -16,20 -16,24 c0,-4 -16,-12 -16,-24z" stroke="#2f2e2d" stroke-width="3"/>';
  s += '</svg>';
  return s;
}
function renderMascots(root){
  (root || document).querySelectorAll('.m[data-m]').forEach(function(el){
    var o = {}; try { o = JSON.parse(el.getAttribute('data-m') || '{}'); } catch(e){}
    if (o.color) el.style.setProperty('--m-color', o.color);
    if (o.line) el.style.setProperty('--m-line', o.line);
    el.innerHTML = mascot(o);
    var eyes = el.querySelector('.m-eyes');
    if (eyes) eyes.style.animationDelay = (Math.random()*4).toFixed(2) + 's';
    el.removeAttribute('data-m');
  });
}

/* ======================= GEOMETRIC TILES ======================= */
function tileInner(type, color){
  var f = 'fill="'+color+'"', st = 'fill="none" stroke="'+color+'" stroke-width="2.6"', s = '', r;
  switch(type){
    case 'q': return '<path '+f+' d="M0,100 V0 A100,100 0 0 1 100,100 Z"/>';
    case 'qa': for (r=12;r<=100;r+=9.5) s += '<path '+st+' d="M0,'+(100-r)+' A'+r+','+r+' 0 0 1 '+r+',100"/>'; return s;
    case 'c': return '<circle '+f+' cx="50" cy="50" r="47"/>';
    case 'ca': for (r=8;r<=50;r+=7) s += '<path '+st+' d="M'+(50-r)+',100 A'+r+','+r+' 0 0 1 '+(50+r)+',100"/>'; return s;
    case 'd': return '<path '+f+' d="M0,0 A50,50 0 0 1 0,100 Z"/>';
    case 'bt': return '<path '+f+' d="M0,0 A50,50 0 0 1 0,100 Z M100,0 A50,50 0 0 0 100,100 Z"/>';
    case 's': return '<path '+f+' d="M50,0 A50,50 0 0 0 100,50 A50,50 0 0 0 50,100 A50,50 0 0 0 0,50 A50,50 0 0 0 50,0 Z"/>';
    case 'h': return '<path '+f+' d="M0,0 H100 A50,50 0 0 1 0,0 Z"/>';
    case 'hh': return '<path '+f+' d="M0,50 A50,50 0 0 1 100,50 Z"/>' + (function(){var t='';for(var k=8;k<=50;k+=8)t+='<path '+st+' d="M'+(50-k)+',50 A'+k+','+k+' 0 0 0 '+(50+k)+',50"/>';return t;})();
    case 'cc': for (r=6;r<=48;r+=7) s += '<circle '+st+' cx="50" cy="50" r="'+r+'"/>'; return s;
  }
  return '';
}
function tile(x, y, size, type, rot, color){
  return '<svg class="tile" x="'+x+'" y="'+y+'" width="'+size+'" height="'+size+'" viewBox="0 0 100 100"><g class="t" style="--r:'+(rot||0)+'deg">'+tileInner(type, color)+'</g></svg>';
}
function buildHeroArt(){
  var svg = document.getElementById('heroArt'); if (!svg) return;
  var S = C.sky, P = C.peach, L = [
    [0,0,'q',0,S],[1,0,'qa',90,S],[2,0,'c',0,P],[3,0,'qa',0,S],[4,0,'bt',0,S],
    [0,1,'qa',270,S],[1,1,'q',90,S],[2,1,'qa',180,S],[3,1,'c',0,S],[4,1,'s',0,P],
    [0,2,'ca',0,S],[1,2,'bt',0,S],[2,2,'q',270,S],
    [0,3,'bt',0,S],[1,3,'ca',180,S],[2,3,'q',180,S],
    [0,4,'q',90,S],[1,4,'qa',270,S],[2,4,'d',0,S]
  ];
  var s = '';
  L.forEach(function(t){ s += tile(t[0]*100, t[1]*100, 100, t[2], t[3], t[4]); });
  // big bowl over cols 3-4 row 2
  s += '<path fill="'+S+'" d="M300,200 H500 A100,100 0 0 1 300,200 Z"/>';
  // sunburst
  var cx = 400, cy = 468, rays = '';
  for (var i=0;i<=22;i++){ var a = Math.PI + i*Math.PI/22, r1 = 66, r2 = 98 + (i%2)*10;
    rays += '<line x1="'+(cx+r1*Math.cos(a)).toFixed(1)+'" y1="'+(cy+r1*Math.sin(a)).toFixed(1)+'" x2="'+(cx+r2*Math.cos(a)).toFixed(1)+'" y2="'+(cy+r2*Math.sin(a)).toFixed(1)+'"/>'; }
  s += '<g stroke="'+S+'" stroke-width="1.6" opacity=".85">'+rays+'<line x1="300" y1="468" x2="500" y2="468"/></g>';
  s += '<g id="heroMascot" style="--m-color:'+S+';--m-line:'+C.ink+'" class="m"><svg x="322" y="318" width="156" height="156" viewBox="0 0 200 200" overflow="visible">' + mascot({}).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'') + '</svg></g>';
  svg.innerHTML = s;
  var e = svg.querySelector('.m-eyes'); if (e) e.style.animationDelay = '1.2s';
}
function buildStrip(id, n, colors){
  var svg = document.getElementById(id); if (!svg) return;
  var types = ['q','c','qa','bt','s','ca','d','h','cc'], s = '', size = 60;
  for (var i=0;i<n;i++){
    var t = types[(i*5 + (i>>1)) % types.length], rot = ((i*7)%4)*90;
    s += tile(i*size, 0, size, t, rot, colors[i%colors.length]);
  }
  svg.innerHTML = s;
}
function buildPortrait(){
  var svg = document.getElementById('portraitPat'); if (!svg) return;
  var s = '', L = [[0,0,'q',0],[1,0,'cc',0],[2,0,'q',90],[0,1,'qa',270],[2,1,'qa',180],[0,2,'bt',0],[1,2,'h',0],[2,2,'ca',0]];
  L.forEach(function(t){ s += tile(t[0]*100, t[1]*100, 100, t[2], t[3], '#BCD6DF'); });
  svg.innerHTML = s;
}

/* ======================= ICONS ======================= */
function icon(name){
  var S=C.sky, P=C.peach, I=C.ink, D=C.deep;
  var v = '<svg viewBox="0 0 100 100" aria-hidden="true">';
  var m = {
    feedback:'<path fill="'+S+'" d="M0,100 V0 A100,100 0 0 1 100,100 Z"/><circle cx="68" cy="32" r="22" fill="'+P+'"/><path d="M58,32 l7,7 13,-14" fill="none" stroke="'+I+'" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>',
    ai:'<rect x="6" y="6" width="88" height="88" rx="44" fill="'+S+'"/><path fill="'+P+'" d="M50,14 A36,36 0 0 0 86,50 A36,36 0 0 0 50,86 A36,36 0 0 0 14,50 A36,36 0 0 0 50,14 Z"/><text x="50" y="58" text-anchor="middle" font-family="Pretendard Variable,sans-serif" font-weight="900" font-size="22" fill="'+I+'">AI</text>',
    future:'<path fill="'+S+'" d="M0,0 A50,50 0 0 1 0,100 Z M100,0 A50,50 0 0 0 100,100 Z"/><circle cx="50" cy="50" r="16" fill="'+P+'"/>',
    achieve:'<rect x="8" y="56" width="22" height="36" rx="4" fill="'+S+'"/><rect x="39" y="38" width="22" height="54" rx="4" fill="'+S+'"/><rect x="70" y="14" width="22" height="78" rx="4" fill="'+P+'"/>',
    memory:'<circle cx="50" cy="50" r="44" fill="none" stroke="'+S+'" stroke-width="4"/><circle cx="50" cy="50" r="32" fill="none" stroke="'+S+'" stroke-width="4"/><circle cx="50" cy="50" r="20" fill="'+P+'"/>',
    calm:'<path fill="'+S+'" d="M0,60 A50,50 0 0 1 100,60 Z"/><path d="M8,76 q10,-8 21,0 t21,0 t21,0 t21,0" fill="none" stroke="'+P+'" stroke-width="5" stroke-linecap="round"/><path d="M8,90 q10,-8 21,0 t21,0 t21,0 t21,0" fill="none" stroke="'+S+'" stroke-width="5" stroke-linecap="round"/>',
    heart:'<path fill="'+P+'" d="M50,88 C10,62 4,40 18,24 C30,11 46,16 50,30 C54,16 70,11 82,24 C96,40 90,62 50,88 Z"/><path fill="'+S+'" d="M50,30 C54,16 70,11 82,24 C96,40 90,62 50,88 Z" opacity=".9"/>',
    m1:'<circle cx="34" cy="50" r="28" fill="'+S+'"/><circle cx="66" cy="50" r="28" fill="'+P+'" opacity=".9"/>',
    m2:'<rect x="6" y="14" width="56" height="40" rx="14" fill="'+S+'"/><rect x="38" y="46" width="56" height="40" rx="14" fill="'+P+'"/><circle cx="56" cy="66" r="4" fill="'+I+'"/><circle cx="68" cy="66" r="4" fill="'+I+'"/><circle cx="80" cy="66" r="4" fill="'+I+'"/>',
    m3:'<path fill="'+S+'" d="M0,100 V0 A100,100 0 0 1 100,100 Z"/><path fill="'+P+'" d="M100,0 V100 A100,100 0 0 1 0,0 Z" opacity=".95"/>',
    m4:'<circle cx="40" cy="40" r="26" fill="none" stroke="'+S+'" stroke-width="9"/><path d="M60,60 L88,88" stroke="'+I+'" stroke-width="10" stroke-linecap="round"/><circle cx="40" cy="40" r="10" fill="'+P+'"/>',
    m5:'<g stroke="'+S+'" stroke-width="5" stroke-linecap="round"><path d="M50,8 v14"/><path d="M50,78 v14"/><path d="M8,50 h14"/><path d="M78,50 h14"/><path d="M20,20 l10,10"/><path d="M70,70 l10,10"/><path d="M80,20 l-10,10"/><path d="M30,70 l-10,10"/></g><circle cx="50" cy="50" r="20" fill="'+P+'"/>',
    m6:'<rect x="10" y="16" width="80" height="54" rx="10" fill="'+S+'"/><rect x="34" y="76" width="32" height="8" rx="4" fill="'+I+'"/><path d="M34,44 l10,10 22,-22" fill="none" stroke="'+I+'" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>',
    u1:'<path fill="'+S+'" d="M0,100 V0 A100,100 0 0 1 100,100 Z"/>',
    u2:'<path fill="'+P+'" d="M0,50 A50,50 0 0 1 100,50 Z"/><path fill="'+S+'" d="M0,50 H100 A50,50 0 0 1 0,50 Z"/>',
    u3:'<path fill="'+S+'" d="M50,0 A50,50 0 0 0 100,50 A50,50 0 0 0 50,100 A50,50 0 0 0 0,50 A50,50 0 0 0 50,0 Z"/>',
    harvard:'<rect width="100" height="100" rx="24" fill="'+I+'"/><path fill="'+S+'" d="M18,82 V18 A64,64 0 0 1 82,82 Z"/><text x="62" y="78" text-anchor="middle" font-family="Hahmlet,serif" font-weight="900" font-size="34" fill="'+P+'">H</text>',
    ubc:'<rect width="100" height="100" rx="24" fill="'+I+'"/><path fill="'+S+'" d="M16,16 A34,34 0 0 1 16,84 Z M84,16 A34,34 0 0 0 84,84 Z"/><text x="50" y="62" text-anchor="middle" font-family="Hahmlet,serif" font-weight="900" font-size="32" fill="'+P+'">U</text>',
    sejong:'<rect width="100" height="100" rx="24" fill="'+P+'"/><path fill="'+S+'" d="M50,12 A38,38 0 0 0 88,50 A38,38 0 0 0 50,88 A38,38 0 0 0 12,50 A38,38 0 0 0 50,12 Z"/><text x="50" y="62" text-anchor="middle" font-family="Hahmlet,serif" font-weight="900" font-size="32" fill="'+I+'">S</text>',
    e1:'<path fill="'+S+'" d="M0,100 V0 A100,100 0 0 1 100,100 Z"/>',
    e2:'<path fill="'+P+'" d="M0,0 A50,50 0 0 1 0,100 Z M100,0 A50,50 0 0 0 100,100 Z"/>',
    e3:'<circle cx="50" cy="50" r="46" fill="'+S+'"/><circle cx="50" cy="50" r="20" fill="'+C.ink2+'"/>',
    e4:'<path fill="'+P+'" d="M50,0 A50,50 0 0 0 100,50 A50,50 0 0 0 50,100 A50,50 0 0 0 0,50 A50,50 0 0 0 50,0 Z"/>'
  };
  return v + (m[name]||'') + '</svg>';
}
function renderIcons(root){
  (root||document).querySelectorAll('[data-icon]').forEach(function(el){ el.innerHTML = icon(el.getAttribute('data-icon')); });
}
function renderCites(root){
  (root||document).querySelectorAll('.cite[data-ref]').forEach(function(el){
    var r = REFS[el.getAttribute('data-ref')]; if (!r) return;
    el.innerHTML = r.url ? '<a href="'+r.url+'" target="_blank" rel="noopener" title="'+r.full.replace(/"/g,'&quot;')+'">'+r.s+' ↗</a>' : r.s;
  });
  document.querySelectorAll('[data-ref-link]').forEach(function(el){
    var r = REFS[el.getAttribute('data-ref-link')];
    if (r && r.url) el.href = r.url; else el.style.display = 'none';
  });
}

/* ======================= AUDIENCES (content is static HTML; tabs wired here) ======================= */
function wireAudience(){
  var tabs = document.getElementById('aTabs'); if (!tabs) return;
  var btns = tabs.querySelectorAll('.tab');
  function select(i, focus){
    btns.forEach(function(b, k){ b.setAttribute('aria-selected', k===i); b.tabIndex = k===i?0:-1; document.getElementById(b.getAttribute('aria-controls')).hidden = k!==i; });
    if (focus) btns[i].focus();
  }
  btns.forEach(function(b, i){
    b.addEventListener('click', function(){ select(i); });
    b.addEventListener('keydown', function(e){
      if (e.key==='ArrowRight'){ e.preventDefault(); select((i+1)%btns.length, true); }
      if (e.key==='ArrowLeft'){ e.preventDefault(); select((i-1+btns.length)%btns.length, true); }
    });
  });
}

/* ======================= HISTORY (milestones are static HTML; axis drawn from them) ======================= */
function buildHistory(){
  var tabs = document.getElementById('eraTabs'), mile = document.getElementById('mile'), desc = document.getElementById('eraDesc'), axis = document.getElementById('axis');
  if (!tabs || !mile) return;
  var eras = [].slice.call(tabs.querySelectorAll('.era')), arts = [].slice.call(mile.querySelectorAll('.mi'));
  var x0 = 40, x1 = 960, y0 = 1970, y1 = 2026;
  function X(y){ return x0 + (y - y0) / (y1 - y0) * (x1 - x0); }
  if (axis){
    var eraCol = [C.sky, C.peach, C.sky2, C.peach], s = '';
    eras.forEach(function(b, i){
      var r = (b.getAttribute('data-range') || '1970,2026').split(',').map(Number);
      s += '<rect class="band" data-i="'+i+'" x="'+X(r[0]).toFixed(1)+'" y="92" width="'+(X(r[1])-X(r[0])-3).toFixed(1)+'" height="14" rx="7" fill="'+eraCol[i%4]+'" opacity=".9" style="cursor:pointer"/>';
    });
    [1970,1980,1990,2000,2010,2020].forEach(function(y){
      s += '<text x="'+X(y).toFixed(1)+'" y="134" text-anchor="middle" font-size="14" font-weight="700" fill="#CFC9C2" font-family="Pretendard Variable,sans-serif">'+y+'</text><line x1="'+X(y).toFixed(1)+'" x2="'+X(y).toFixed(1)+'" y1="110" y2="118" stroke="#CFC9C2" stroke-width="1.5"/>';
    });
    var placed = [];
    arts.forEach(function(a, idx){
      var x = X(+a.getAttribute('data-yr')), lvl = 0, kr = a.classList.contains('kr'), lab = esc(a.getAttribute('data-label') || '');
      while (placed.some(function(p){ return p.l===lvl && Math.abs(p.x - x) < 20; })) lvl++;
      placed.push({x:x, l:lvl});
      var cy = 74 - lvl * 22;
      s += '<line x1="'+x.toFixed(1)+'" x2="'+x.toFixed(1)+'" y1="'+(cy+7)+'" y2="92" stroke="'+(kr?C.peach:C.sky)+'" stroke-width="1.4" opacity=".55"/>';
      s += '<circle class="dot" tabindex="0" role="button" aria-label="'+lab+'" data-idx="'+idx+'" cx="'+x.toFixed(1)+'" cy="'+cy+'" r="7" fill="'+(kr?C.peach:C.sky)+'" stroke="#3d3c3b" stroke-width="2.5"><title>'+lab+'</title></circle>';
    });
    s += '<g transform="translate('+(X(2025.4)-22)+',-4) scale(.22)" style="--m-color:'+C.peach+';--m-line:#3d3c3b" class="m">'+mascot({eyes:'happy'}).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')+'</g>';
    axis.innerHTML = s;
  }
  function show(i, hl){
    eras.forEach(function(b, k){ b.setAttribute('aria-selected', k===i); });
    if (desc) desc.querySelectorAll('p[data-i]').forEach(function(p){ p.hidden = +p.getAttribute('data-i') !== i; });
    arts.forEach(function(a, idx){ a.hidden = +a.getAttribute('data-e') !== i; a.classList.toggle('hl', idx === hl); });
    if (axis) axis.querySelectorAll('.band').forEach(function(b){ b.setAttribute('opacity', +b.getAttribute('data-i')===i ? '1' : '.35'); });
    if (hl != null && arts[hl] && arts[hl].scrollIntoView) arts[hl].scrollIntoView({behavior:'smooth', block:'nearest'});
  }
  tabs.addEventListener('click', function(e){ var b = e.target.closest('.era'); if (b) show(+b.getAttribute('data-i')); });
  function dotGo(t){ var idx = +t.getAttribute('data-idx'); show(+arts[idx].getAttribute('data-e'), idx); }
  if (axis){
    axis.addEventListener('click', function(e){
      if (e.target.classList.contains('dot')) dotGo(e.target);
      if (e.target.classList.contains('band')) show(+e.target.getAttribute('data-i'));
    });
    axis.addEventListener('keydown', function(e){ if ((e.key==='Enter'||e.key===' ') && e.target.classList.contains('dot')){ e.preventDefault(); dotGo(e.target); } });
  }
  show(0);
}

/* ======================= DEMO ======================= */
var L = EN ? {
  q:{
    text:'A car moves around a circular track at a constant speed. Which way does its acceleration point?',
    opts:['The acceleration is zero','Along the direction of motion (tangent)','Toward the center of the circle','Away from the center'],
    ans:2,
    team:[
      {name:'Sky', m:{line:'#fff'}, say:'The speed is constant, so the acceleration must be zero, right?'},
      {name:'Peach', m:{color:'#FADFC3', line:'#fff'}, say:'Wait! The speed stays the same, but the direction keeps changing. If the velocity changes, there is an acceleration.'},
      {name:'Cloud', m:{color:'#BCD6DF', acc:'glasses', line:'#fff'}, say:'The car keeps turning inward, so the acceleration points to the center!'}
    ],
    why:'In uniform circular motion the speed is constant, but the direction of the velocity keeps changing, so there is an acceleration. It always points toward the center of the circle (centripetal acceleration).'
  },
  s1:'STAGE 1 · Individual exam', hint1:'Pick an answer on your own first. We won’t reveal the correct answer yet.', submit:'Submit my answer',
  mine:function(n, first){ return 'I picked option '+n+'. '+(first?'The speed doesn’t change, so…':'Let’s talk through why!'); }, me:'Me',
  s2:'STAGE 2 · Team exam', s2text:'Now answer the same question again with your team. Listen to each teammate.',
  pick:'Discussion done! Choose your team answer.', pill:function(){ return 'Correct now = <b id="pts">4</b> pts'; },
  hint2:'Immediate feedback: if you miss, discuss again and choose another option. 1st try 4 pts · 2nd 2 pts · 3rd 1 pt (Jang et al., 2017)',
  got:function(p){ return 'Your team earned '+p+' point'+(p===1?'':'s')+'!'; },
  ind:function(n, ok){ return '<b>Individual answer:</b> option '+n+'. '+(ok?'Correct! Explaining it to your teammates made your understanding even stronger.':'Not quite, but the team discussion showed you why right away.'); },
  right:function(n){ return '<b>Correct answer: option '+n+'.</b> '; },
  moral:'This is how the exam itself becomes instant, peer-led feedback.', again:'Try again', more:'Learn more in the book',
  calc:{prot:'Individual-score protection applied: only the individual score counts', up:function(d){ return '+'+d+' points thanks to the team discussion'; }, down:function(d){ return d+' points vs. the individual score'; }, same:'Same as the individual score'},
  cl:function(c, n){ return c+' / '+n+' done'+(c===n?' · All set! Good luck with your first two-stage exam':''); }
} : {
  q:{
    text:'자동차가 원형 트랙 위를 일정한 속력으로 돌고 있습니다. 이 자동차의 가속도는 어느 방향일까요?',
    opts:['가속도는 0이다','진행(접선) 방향','원의 중심 방향','원의 바깥 방향'],
    ans:2,
    team:[
      {name:'하늘', m:{line:'#fff'}, say:'속력이 일정하니까 가속도는 0 아닐까?'},
      {name:'복숭아', m:{color:'#FADFC3', line:'#fff'}, say:'잠깐! 속력은 같아도 방향이 계속 바뀌잖아. 속도가 변하면 가속도가 있어.'},
      {name:'구름', m:{color:'#BCD6DF', acc:'glasses', line:'#fff'}, say:'방향을 계속 안쪽으로 꺾어 주니까 가속도는 원의 중심 쪽이야!'}
    ],
    why:'등속 원운동에서 속력은 일정하지만 속도의 방향이 계속 바뀌므로 가속도가 존재합니다. 그 방향은 항상 원의 중심을 향합니다(구심 가속도).'
  },
  s1:'STAGE 1 · 개인 평가', hint1:'먼저 혼자 답을 골라 보세요. 아직 정답은 알려 주지 않아요.', submit:'개인 답안 제출',
  mine:function(n, first){ return '나는 '+n+'번을 골랐어. '+(first?'속력이 그대로라서…':'이유를 같이 얘기해 보자!'); }, me:'나',
  s2:'STAGE 2 · 팀 평가', s2text:'같은 문제를 팀원들과 다시 풉니다. 각자의 생각을 들어 보세요.',
  pick:'토론 끝! 팀 답안을 골라 보세요.', pill:function(){ return '이번에 맞히면 <b id="pts">4</b>점'; },
  hint2:'즉시 피드백: 틀리면 다시 토론해서 고를 수 있어요. 첫 시도 4점 · 두 번째 2점 · 세 번째 1점 (Jang et al., 2017)',
  got:function(p){ return '팀 점수 '+p+'점 획득!'; },
  ind:function(n, ok){ return '<b>개인 평가:</b> '+n+'번, '+(ok?'정답이었어요. 친구에게 설명하면서 이해가 더 단단해졌을 거예요.':'아쉽게 오답이었지만, 팀 토론에서 바로 이유를 알게 되었어요.'); },
  right:function(n){ return '<b>정답 '+n+'번:</b> '; },
  moral:'이렇게 시험이 곧 "실시간 오답 노트"가 됩니다.', again:'다시 해 보기', more:'책에서 더 알아보기',
  calc:{prot:'개인 점수 보호가 적용되어 개인 점수만 반영', up:function(d){ return '팀 토론 덕분에 +'+d+'점'; }, down:function(d){ return '개인 점수 대비 '+d+'점'; }, same:'개인 점수와 같아요'},
  cl:function(c, n){ return c+' / '+n+' 완료'+(c===n?' · 준비 끝! 첫 2단계 평가를 응원해요':''); }
};
var Q = L.q;
var LET = ['1','2','3','4'];
function demo(){
  var card = document.getElementById('qcard'), steps = document.getElementById('steps'); if (!card) return;
  var st = {mine:null, tries:0, wrong:[]};
  function setStep(n){ steps.querySelectorAll('li').forEach(function(li, i){ li.className = i<n ? 'done' : (i===n ? 'on' : ''); }); }
  function optHTML(){ return Q.opts.map(function(o, i){ return '<button class="opt" data-i="'+i+'"'+(st.wrong.indexOf(i)>-1?' disabled':'')+'><b>'+LET[i]+'</b>'+o+'</button>'; }).join(''); }
  function stage1(){
    st = {mine:null, tries:0, wrong:[]}; setStep(0);
    card.innerHTML = '<p class="eyebrow" style="margin-bottom:6px">'+L.s1+'</p><p class="qtext">'+Q.text+'</p><div class="opts">'+optHTML()+'</div>' +
      '<div class="q-actions"><p class="hint">'+L.hint1+'</p><button class="btn btn-ink" id="submit1" disabled>'+L.submit+'</button></div>';
    var sub = card.querySelector('#submit1');
    card.querySelectorAll('.opt').forEach(function(b){ b.addEventListener('click', function(){
      card.querySelectorAll('.opt').forEach(function(x){ x.classList.remove('sel'); }); b.classList.add('sel'); st.mine = +b.getAttribute('data-i'); sub.disabled = false;
    }); });
    sub.addEventListener('click', stage2);
  }
  function stage2(){
    setStep(1);
    var me = '<div class="member"><p class="bubble down">'+L.mine(LET[st.mine], st.mine===0)+'</p><span class="m" data-m=\'{"eyes":"happy","blush":true,"line":"#fff"}\'></span><span class="who">'+L.me+'</span></div>';
    var others = Q.team.map(function(t){ return '<div class="member"><p class="bubble down">'+t.say+'</p><span class="m" data-m=\''+JSON.stringify(t.m)+'\'></span><span class="who">'+t.name+'</span></div>'; }).join('');
    card.innerHTML = '<p class="eyebrow" style="margin-bottom:6px">'+L.s2+'</p><p class="qtext" style="font-size:18px">'+L.s2text+'</p><div class="team">'+me+others+'</div>' +
      '<div id="teamPick" style="display:none"><p class="qtext" style="font-size:18px;margin-bottom:14px">'+L.pick+' <span class="score-pill" style="vertical-align:2px">'+L.pill()+'</span></p><div class="opts">'+optHTML()+'</div>' +
      '<div class="q-actions"><p class="hint">'+L.hint2+'</p></div></div>';
    renderMascots(card);
    var mem = card.querySelectorAll('.member');
    mem.forEach(function(m, i){ setTimeout(function(){ m.classList.add('show'); }, 250 + i*650); });
    setTimeout(function(){ var tp = card.querySelector('#teamPick'); tp.style.display = 'block'; bindTeam(); }, 250 + mem.length*650);
  }
  function bindTeam(){
    card.querySelectorAll('#teamPick .opt').forEach(function(b){ b.addEventListener('click', function(){
      var i = +b.getAttribute('data-i'); st.tries++;
      if (i === Q.ans){ b.classList.add('right'); setTimeout(done, 450); }
      else { st.wrong.push(i); b.classList.add('wrong','shake'); b.disabled = true; var p = card.querySelector('#pts'); if (p) p.textContent = [4,2,1,0][Math.min(st.tries,3)]; }
    }); });
  }
  function done(){
    setStep(2);
    var pts = [4,2,1,0][Math.min(st.tries-1,3)], indOk = st.mine === Q.ans;
    card.innerHTML = '<div class="done-box"><span class="m" data-m=\'{"eyes":"happy","blush":true,"line":"#fff"}\'></span><div>' +
      '<p class="eyebrow" style="margin-bottom:6px">RESULT</p><h4>'+L.got(pts)+'</h4>' +
      '<p>'+L.ind(LET[st.mine], indOk)+'</p>' +
      '<p>'+L.right(LET[Q.ans])+Q.why+'</p>' +
      '<p style="color:var(--sky-deep);font-weight:700;margin-top:12px">'+L.moral+'</p>' +
      '<div class="q-actions" style="justify-content:flex-start"><button class="btn btn-line" id="again">'+L.again+'</button><a class="btn btn-ink" href="#book">'+L.more+'</a></div></div></div>';
    renderMascots(card);
    card.querySelector('#again').addEventListener('click', stage1);
    confetti();
  }
  stage1();
}
function confetti(){
  var b = document.getElementById('burst'); if (!b || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var cols = [C.sky, C.peach, C.ink, '#fff'], h = '';
  for (var i=0;i<34;i++){ h += '<i style="left:'+(Math.random()*100).toFixed(1)+'%;background:'+cols[i%4]+';animation-delay:'+(Math.random()*.5).toFixed(2)+'s;border-radius:'+(i%3===0?'50%':(i%3===1?'0 14px 0 0':'3px'))+'"></i>'; }
  b.innerHTML = h; setTimeout(function(){ b.innerHTML = ''; }, 2600);
}

/* ======================= CALCULATOR ======================= */
function calc(){
  var ind = document.getElementById('cInd'); if (!ind) return;
  var team = document.getElementById('cTeam'), w = document.getElementById('cW'), pr = document.getElementById('cProtect');
  var chips = document.querySelectorAll('.presets .chip');
  function up(){
    var a = +ind.value, t = +team.value, ww = +w.value/100;
    document.getElementById('oInd').textContent = a; document.getElementById('oTeam').textContent = t; document.getElementById('oW').textContent = w.value + '%';
    var f = a*(1-ww) + t*ww, protectedUsed = false;
    if (pr.checked && f < a){ f = a; protectedUsed = true; }
    var ia = protectedUsed ? a : a*(1-ww), tb = protectedUsed ? 0 : t*ww;
    document.getElementById('oFinal').textContent = (Math.round(f*10)/10).toFixed(1);
    document.getElementById('barA').style.width = ia + '%'; document.getElementById('barB').style.width = tb + '%';
    var d = Math.round((f - a)*10)/10;
    document.getElementById('oNote').textContent = protectedUsed ? L.calc.prot : (d > 0 ? L.calc.up(d.toFixed(1)) : (d < 0 ? L.calc.down(d.toFixed(1)) : L.calc.same));
    chips.forEach(function(c){ c.setAttribute('aria-pressed', c.getAttribute('data-w') === w.value); });
  }
  [ind, team, w, pr].forEach(function(el){ el.addEventListener('input', up); });
  chips.forEach(function(c){ c.addEventListener('click', function(){ w.value = c.getAttribute('data-w'); up(); }); });
  up();
}

/* ======================= CHECKLIST (items are static HTML; progress saved locally) ======================= */
function checklist(){
  var box = document.getElementById('clGroups'); if (!box) return;
  var KEY = 'twostage-checklist-v1', saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch(e){ saved = {}; }
  var boxes = box.querySelectorAll('input[type="checkbox"]'), bar = document.getElementById('clBar'), txt = document.getElementById('clText'), masc = document.getElementById('clMascot');
  boxes.forEach(function(b){ if (saved[b.getAttribute('data-id')]) b.checked = true; });
  var lastAll = null;
  function up(){
    var c = 0, st = {};
    boxes.forEach(function(b){ if (b.checked){ c++; st[b.getAttribute('data-id')] = 1; } });
    bar.style.width = (c/boxes.length*100) + '%';
    txt.textContent = L.cl(c, boxes.length);
    var all = c === boxes.length;
    if (all !== lastAll){ masc.setAttribute('data-m', JSON.stringify({eyes: all?'happy':'normal', blush: all, acc: all?'':'pencil', line:'#FFF7EE'})); renderMascots(masc.parentNode); lastAll = all; }
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch(e){}
  }
  boxes.forEach(function(b){ b.addEventListener('change', up); });
  up();
}

/* ======================= MAIL, NAV, REVEAL, EYES ======================= */
function mails(){
  document.querySelectorAll('a.mail').forEach(function(a){
    var q = [];
    if (a.dataset.subject) q.push('subject=' + encodeURIComponent(a.dataset.subject));
    if (a.dataset.body) q.push('body=' + encodeURIComponent(a.dataset.body));
    a.href = 'mailto:ssesmul@gmail.com' + (q.length ? '?' + q.join('&') : '');
  });
}
function nav(){
  var n = document.getElementById('nav'), b = document.getElementById('burger'), m = document.getElementById('menu');
  function onS(){ n.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onS, {passive:true}); onS();
  b.addEventListener('click', function(){ var o = m.classList.toggle('open'); b.setAttribute('aria-expanded', o); n.classList.add('solid'); });
  m.addEventListener('click', function(e){ if (e.target.tagName === 'A'){ m.classList.remove('open'); b.setAttribute('aria-expanded', false); } });
}
function reveal(){
  var els = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) { els.forEach(function(e){ e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function(en){ en.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {rootMargin:'0px 0px -8% 0px', threshold:.06});
  els.forEach(function(e){ io.observe(e); });
}
function eyes(){
  var g = document.querySelector('#heroMascot .m-pupils'), svg = document.getElementById('heroArt');
  if (!g || !svg) return;
  window.addEventListener('pointermove', function(e){
    var r = svg.getBoundingClientRect(), sc = r.width / 500;
    var ex = r.left + (322 + 100*0.78) * sc, ey = r.top + (318 + 80*0.78) * sc;
    var dx = e.clientX - ex, dy = e.clientY - ey, d = Math.hypot(dx, dy) || 1, k = Math.min(1, d/220);
    g.style.transform = 'translate(' + (dx/d*3.6*k).toFixed(2) + 'px,' + (dy/d*3.2*k).toFixed(2) + 'px)';
  }, {passive:true});
}

/* ======================= INIT ======================= */
buildHeroArt(); buildStrip('strip1', 20, [C.sky, C.sky, C.peach]); buildPortrait();
renderMascots(); renderIcons(); renderCites();
wireAudience(); buildHistory(); demo(); calc(); checklist(); mails(); nav(); reveal(); eyes();
})();
