const params = new URLSearchParams(location.search);

const theme = (params.get("theme") || "dark").toLowerCase();
document.documentElement.dataset.theme = theme;

const tz = params.get("tz") || "Europe/Lisbon";
const label = params.get("label") || "DENTRO DE UM TESLA Y";
const hours = Math.max(1, parseInt(params.get("hours") || "72", 10));

const titleEl = document.getElementById("title");
const timeEl = document.getElementById("time");
const subEl = document.getElementById("sub");
const pillStart = document.getElementById("pillStart");
const pillEnd = document.getElementById("pillEnd");

subEl.textContent = label;

// start pode ser ISO: 2026-01-28T13:00:00
const startRaw = params.get("start");
const start = startRaw ? new Date(startRaw) : new Date();
const end = new Date(start.getTime() + hours * 3600 * 1000);

function fmt(dt){
  try{
    return new Intl.DateTimeFormat("pt-PT", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(dt);
  }catch{
    return dt.toLocaleString("pt-PT");
  }
}

pillStart.textContent = `Início: ${fmt(start)}`;
pillEnd.textContent = `Fim: ${fmt(end)}`;

titleEl.textContent = `CRONÓMETRO ${hours}H`;

function pad(n){ return String(n).padStart(2, "0"); }

function tick(){
  const now = new Date();
  let diff = Math.floor((now.getTime() - start.getTime()) / 1000);

  if (diff < 0) diff = 0;

  const hh = Math.floor(diff / 3600);
  const mm = Math.floor((diff % 3600) / 60);
  const ss = diff % 60;

  timeEl.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
}

tick();
setInterval(tick, 250); // mais responsivo
