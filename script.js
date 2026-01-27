// Timer 72h
// - Por defeito, conta 72 horas a partir do 1º carregamento (localStorage)
// - Podes forçar um "start" com ?start=2026-01-27T20:00:00 (hora local do browser)
// - Podes fazer reset com ?reset=1

const params = new URLSearchParams(location.search);
const el = document.getElementById("timer");

const KEY = "timer72h_endAt_v1";
const HOURS = 72;

function pad(n){ return String(n).padStart(2,"0"); }

function parseLocalDateTime(s){
  // Aceita "YYYY-MM-DDTHH:MM:SS" (sem timezone) como hora local
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function getEndAt(){
  // reset explícito
  if (params.get("reset") === "1") localStorage.removeItem(KEY);

  // start explícito
  const startStr = params.get("start");
  if (startStr){
    const start = parseLocalDateTime(startStr);
    if (start){
      const endAt = start.getTime() + HOURS * 3600 * 1000;
      localStorage.setItem(KEY, String(endAt));
      return endAt;
    }
  }

  // persistente
  const saved = localStorage.getItem(KEY);
  if (saved && Number.isFinite(Number(saved))) return Number(saved);

  // por defeito: 72h a partir de agora
  const endAt = Date.now() + HOURS * 3600 * 1000;
  localStorage.setItem(KEY, String(endAt));
  return endAt;
}

let endAt = getEndAt();

function tick(){
  const ms = endAt - Date.now();
  const total = Math.max(0, Math.ceil(ms / 1000));

  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  el.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;

  if (total <= 0) {
    // mantém no 00:00:00
    el.textContent = `00:00:00`;
  }
}

tick();
setInterval(tick, 250);
