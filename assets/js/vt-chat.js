/* VOWTECH AI assistant chat widget — self-contained (injects its own styles), matches the site design.
   Talks to /api/chat (Netlify Function). If the AI is unavailable it falls back to WhatsApp / phone. */
(function () {
  'use strict';
  if (window.__vtChat) return; window.__vtChat = true;

  var API = '/api/chat';
  // site base path (works for pages at the root and for the 404 page served at any URL)
  var me = document.currentScript || document.querySelector('script[src*="vt-chat.js"]');
  var BASE = me && me.src ? me.src.replace(/assets\/js\/vt-chat\.js.*$/, '') : '/';
  if (typeof window.vtLocalAnswer !== 'function') { var kb = document.createElement('script'); kb.src = BASE + 'assets/js/vt-kb.js'; kb.defer = true; document.head.appendChild(kb); }
  var WA = 'https://wa.me/971581816887?text=';
  var KEY = 'vt-chat-v1';
  var GREETING = 'Hello! I am the VOWTECH assistant. Ask me about IT support, IT AMC, CCTV AMC, attendance systems or any IT issue at your office — or choose a topic below.';
  var CHIPS = [
    ['IT AMC for my office', 'I need an IT AMC (annual maintenance contract) for my office. How does it work?'],
    ['My AMC provider is not responding', 'We already have an AMC but our current provider is not responding properly. Can VOWTECH take over?'],
    ['CCTV AMC / maintenance', 'I need CCTV annual maintenance for my cameras and NVR. What does it include?'],
    ['Attendance / punch-in machine', 'I need an attendance system with punch-in and punch-out machines. What do you recommend?'],
    ['Urgent IT problem', 'We have an urgent IT problem right now. What should I do?']
  ];

  var css = '' +
    '#vtc-btn{position:fixed;left:28px;bottom:28px;z-index:9991;display:flex;align-items:center;gap:9px;padding:13px 20px;background:#0a1628;color:#c8a052;border:1px solid #c8a052;border-radius:50px;font-family:"Rajdhani",system-ui,sans-serif;font-size:13px;font-weight:700;letter-spacing:.5px;cursor:pointer;box-shadow:0 8px 28px rgba(0,0,0,.5);transition:transform .3s,box-shadow .3s,background .3s,color .3s}' +
    '#vtc-btn:hover{transform:translateY(-4px);background:#c8a052;color:#0a1628;box-shadow:0 16px 40px rgba(200,160,82,.3)}' +
    '#vtc-btn i{font-size:17px}#vtc-btn .vtc-dot{width:7px;height:7px;border-radius:50%;background:#00c8e0;box-shadow:0 0 8px #00c8e0}' +
    '#vtc-panel{position:fixed;left:28px;bottom:92px;z-index:9992;width:380px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 140px);display:none;flex-direction:column;background:rgba(8,15,30,.98);border:1px solid rgba(200,160,82,.25);border-top:2px solid #c8a052;box-shadow:0 32px 80px rgba(0,0,0,.7);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);font-family:"Rajdhani",system-ui,sans-serif;color:#f0ece2;cursor:auto}' +
    '#vtc-panel.open{display:flex;animation:vtcIn .3s cubic-bezier(.22,1,.36,1)}@keyframes vtcIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}' +
    '#vtc-panel *{box-sizing:border-box;cursor:auto}#vtc-panel button,#vtc-panel a{cursor:pointer}' +
    '.vtc-head{display:flex;align-items:center;gap:12px;padding:16px 18px;border-bottom:1px solid rgba(200,160,82,.18)}' +
    '.vtc-ico{width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:rgba(200,160,82,.15);border:1px solid rgba(200,160,82,.25);border-radius:4px;color:#c8a052;font-size:17px;flex-shrink:0}' +
    '.vtc-title{font-family:"Orbitron","Rajdhani",sans-serif;font-size:12px;font-weight:700;letter-spacing:1px}' +
    '.vtc-sub{font-family:"Share Tech Mono",monospace;font-size:9px;letter-spacing:1.5px;color:#00c8e0;margin-top:3px;text-transform:uppercase}' +
    '.vtc-x{margin-left:auto;background:none;border:1px solid rgba(200,160,82,.25);color:rgba(240,236,226,.6);width:30px;height:30px;border-radius:4px;font-size:12px;transition:all .2s}.vtc-x:hover{color:#c8a052;border-color:#c8a052}' +
    '.vtc-log{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:12px;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#c8a052 transparent}' +
    '.vtc-msg{max-width:86%;padding:11px 14px;font-size:14.5px;line-height:1.6;border-radius:4px;white-space:pre-wrap;word-wrap:break-word}' +
    '.vtc-bot{align-self:flex-start;background:#0e1c35;border:1px solid rgba(200,160,82,.18);border-left:2px solid #00c8e0;color:rgba(240,236,226,.88)}' +
    '.vtc-user{align-self:flex-end;background:rgba(200,160,82,.14);border:1px solid rgba(200,160,82,.3);color:#f0ece2}' +
    '.vtc-chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:2px}' +
    '.vtc-chip{font-family:"Share Tech Mono",monospace;font-size:10px;letter-spacing:.8px;text-transform:uppercase;color:#00c8e0;background:none;padding:7px 11px;border:1px solid rgba(0,200,224,.25);border-radius:20px;transition:all .2s}.vtc-chip:hover{color:#0a1628;background:#00c8e0}' +
    '.vtc-typing{align-self:flex-start;display:flex;gap:5px;padding:13px 14px;background:#0e1c35;border:1px solid rgba(200,160,82,.18);border-radius:4px}.vtc-typing span{width:6px;height:6px;border-radius:50%;background:#c8a052;animation:vtcB 1.1s ease infinite}.vtc-typing span:nth-child(2){animation-delay:.15s}.vtc-typing span:nth-child(3){animation-delay:.3s}@keyframes vtcB{0%,100%{opacity:.25;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}' +
    '.vtc-wa{display:inline-flex;align-items:center;gap:7px;margin-top:9px;padding:8px 14px;background:#25D366;color:#fff!important;font-family:"Orbitron",sans-serif;font-size:10px;font-weight:700;letter-spacing:1px;border-radius:4px;text-decoration:none}' +
    '.vtc-form{display:flex;border-top:1px solid rgba(200,160,82,.18)}' +
    '.vtc-in{flex:1;background:transparent;border:none;outline:none;color:#f0ece2;font-family:inherit;font-size:15px;padding:16px 16px;min-width:0}.vtc-in::placeholder{color:rgba(240,236,226,.35)}' +
    '.vtc-send{background:#c8a052;color:#0a1628;border:none;width:54px;font-size:15px;transition:background .2s}.vtc-send:hover{background:#dbb870}.vtc-send:disabled{opacity:.5}' +
    '.vtc-foot{font-family:"Share Tech Mono",monospace;font-size:8.5px;letter-spacing:1px;color:rgba(240,236,226,.35);text-align:center;padding:7px 10px 9px;border-top:1px solid rgba(200,160,82,.08)}' +
    '@media(max-width:480px){#vtc-btn{left:16px;bottom:24px;padding:13px}#vtc-btn .vtc-lbl{display:none}#vtc-panel{left:8px;right:8px;bottom:84px;width:auto;max-width:none;height:70vh}}';
  var st = document.createElement('style'); st.id = 'vtc-style'; st.textContent = css; document.head.appendChild(st);

  var btn = document.createElement('button');
  btn.id = 'vtc-btn'; btn.type = 'button'; btn.setAttribute('aria-label', 'Open VOWTECH AI assistant'); btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span class="vtc-dot" aria-hidden="true"></span><i class="fas fa-robot" aria-hidden="true"></i><span class="vtc-lbl">AI Assistant</span>';

  var panel = document.createElement('div');
  panel.id = 'vtc-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'VOWTECH AI assistant');
  panel.innerHTML =
    '<div class="vtc-head"><div class="vtc-ico"><i class="fas fa-robot" aria-hidden="true"></i></div><div><div class="vtc-title">VOWTECH ASSISTANT</div><div class="vtc-sub">// AI Help — 24/7</div></div><button class="vtc-x" type="button" aria-label="Close chat"><i class="fas fa-times" aria-hidden="true"></i></button></div>' +
    '<div class="vtc-log" aria-live="polite"></div>' +
    '<form class="vtc-form" autocomplete="off"><input class="vtc-in" type="text" maxlength="600" placeholder="Type your question…" aria-label="Your message"><button class="vtc-send" type="submit" aria-label="Send"><i class="fas fa-paper-plane" aria-hidden="true"></i></button></form>' +
    '<div class="vtc-foot">AI ASSISTANT — ANSWERS MAY NOT BE PERFECT. FOR URGENT HELP CALL +971 58 181 6887</div>';

  document.body.appendChild(btn); document.body.appendChild(panel);
  var log = panel.querySelector('.vtc-log'), form = panel.querySelector('.vtc-form'), input = panel.querySelector('.vtc-in'), send = panel.querySelector('.vtc-send');
  var history = []; var busy = false;
  try { history = JSON.parse(sessionStorage.getItem(KEY) || '[]'); } catch (e) { history = []; }

  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(history.slice(-24))); } catch (e) {} }
  function bubble(role, text, extra) {
    var d = document.createElement('div'); d.className = 'vtc-msg ' + (role === 'user' ? 'vtc-user' : 'vtc-bot'); d.textContent = text;
    if (extra) d.appendChild(extra);
    log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
  }
  function waLink(msg) {
    var a = document.createElement('a'); a.className = 'vtc-wa'; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.href = WA + encodeURIComponent(msg || 'Hi, I was chatting on your website and would like to speak to your team.');
    a.innerHTML = '<i class="bi bi-whatsapp" aria-hidden="true"></i> CONTINUE ON WHATSAPP'; return a;
  }
  function chips() {
    var w = document.createElement('div'); w.className = 'vtc-chips';
    CHIPS.forEach(function (c) { var b = document.createElement('button'); b.type = 'button'; b.className = 'vtc-chip'; b.textContent = c[0]; b.addEventListener('click', function () { w.remove(); ask(c[1]); }); w.appendChild(b); });
    log.appendChild(w); log.scrollTop = log.scrollHeight;
  }
  function render() {
    log.innerHTML = ''; bubble('bot', GREETING);
    if (!history.length) chips();
    history.forEach(function (m) { bubble(m.role, m.text); });
  }
  function lastUserText() { for (var i = history.length - 1; i >= 0; i--) if (history[i].role === 'user') return history[i].text; return ''; }

  function ask(text) {
    text = (text || '').trim(); if (!text || busy) return;
    busy = true; send.disabled = true;
    var c = log.querySelector('.vtc-chips'); if (c) c.remove();
    history.push({ role: 'user', text: text }); save(); bubble('user', text);
    var t = document.createElement('div'); t.className = 'vtc-typing'; t.innerHTML = '<span></span><span></span><span></span>'; log.appendChild(t); log.scrollTop = log.scrollHeight;
    fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history.slice(-12) }) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        t.remove();
        if (res.ok && res.d.reply) { history.push({ role: 'bot', text: res.d.reply }); save(); bubble('bot', res.d.reply); }
        else if (res.d && res.d.reply) { bubble('bot', res.d.reply); }
        else fail();
      })
      .catch(function () { t.remove(); fail(); })
      .then(function () { busy = false; send.disabled = false; input.focus(); });
  }
  // AI backend unavailable / not configured → answer instantly from the built-in knowledge base (assets/js/vt-kb.js)
  function fail() {
    var q = lastUserText();
    if (typeof window.vtLocalAnswer !== 'function') {
      bubble('bot', 'Our team can help you directly on WhatsApp or by phone on +971 58 181 6887.', waLink('Hi, I have a question: ' + q));
      return;
    }
    var ans = window.vtLocalAnswer(q);
    var extra = document.createElement('div');
    var more = document.createElement('a');
    more.href = BASE + ans.href; more.textContent = ans.label + ' →';
    more.style.cssText = 'display:block;margin-top:9px;color:#c8a052;font-family:"Share Tech Mono",monospace;font-size:10.5px;letter-spacing:1px;text-transform:uppercase;text-decoration:none';
    extra.appendChild(more); extra.appendChild(waLink('Hi, I have a question: ' + q));
    history.push({ role: 'bot', text: ans.text }); save();
    bubble('bot', ans.text, extra);
  }
  function toggle(open) {
    var isOpen = typeof open === 'boolean' ? open : !panel.classList.contains('open');
    panel.classList.toggle('open', isOpen); btn.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) { if (!log.children.length) render(); setTimeout(function () { input.focus(); }, 50); }
  }

  btn.addEventListener('click', function () { toggle(); });
  panel.querySelector('.vtc-x').addEventListener('click', function () { toggle(false); btn.focus(); });
  panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') { toggle(false); btn.focus(); } });
  form.addEventListener('submit', function (e) { e.preventDefault(); var v = input.value; input.value = ''; ask(v); });
  window.vtChatOpen = function (q) { toggle(true); if (q) ask(q); };
})();
