/**
 * CRONÓMETRO ancorado num "start" fixo
 *
 * Usa:
 * ?start=2026-01-27T18:00:00
 *
 * (interpreta como hora local do browser)
 */

const params = new URLSearchParams(location.search);
const el = document.getElementById("timer");

function pad(n){ return String(n).padStart(2,"0"); }

function parseStart(){
  const startStr = params.get("start");
  if (!startStr) return Date.now(); // fallback: começa "agora" (para testes)

  const d = new Date(startStr);
  return isNaN(d.getTime()) ? Date.now() : d.getTime();
}

const startAt = parseStart();

function tick(){
  const diff = Date.now() - startAt;
  const total = Math.max(0, Math.floor(diff / 1000));

  const hours = Math.floor(total / 3600);
  const mins  = Math.floor((total % 3600) / 60);
  const secs  = total % 60;

  // horas podem passar 99, e está tudo bem (ex: 120:15:09)
  el.textContent = `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
}

tick();
setInterval(tick, 250);
