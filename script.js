// Ler data/hora de início via URL
const params = new URLSearchParams(window.location.search);
const startParam = params.get("start");

// Se não houver start, usar agora
const startTime = startParam ? new Date(startParam) : new Date();

const countdownEl = document.getElementById("countdown");

function updateTimer() {
  const now = new Date();
  const elapsed = Math.floor((now - startTime) / 1000);

  if (elapsed < 0) {
    countdownEl.textContent = "00:00:00";
    return;
  }

  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = elapsed % 60;

  countdownEl.textContent =
    `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

setInterval(updateTimer, 1000);
updateTimer();
