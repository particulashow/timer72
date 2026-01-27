/**
 * Countdown regressivo para uma data final fixa
 *
 * Usa:
 * ?end=2026-01-30T20:00:00
 * (hora local do browser)
 */

const params = new URLSearchParams(location.search);
const el = document.getElementById("timer");

function pad(n){ return String(n).padStart(2,"0"); }

function parseEnd(){
  const endStr = params.get("end");
  if (!endStr) {
    // fallback: agora + 72h
    return Date.now() + 72 * 3600 * 1000;
  }

  const d = new Date(endStr);
  return isNaN(d.getTime()) ? Date.now() : d.getTime();
}

const endAt = parseEnd();

function tick(){
  const diff = endAt - Date.now();
  const total = Math.max(0, Math.floor(diff / 1000));

  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  el.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
}

tick();
setInterval(tick, 500);
