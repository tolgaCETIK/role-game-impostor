const namePool = [
  "Aleyna Tilki", "Edis", "Zeynep Bastık", "Merve Özbey", "Simge", "Murda", "Hadise",
  "Reynmen", "Mabel Matiz", "Sefo", "Ben Fero", "Uzi", "Ezhel", "Gazapizm", "Murat Boz",
  "Gülşen", "İlyas Yalçıntaş", "Emir Can İğrek", "Derya Uluğ", "Serdar Ortaç", "Gökhan Türkmen",
  "Oğuzhan Koç", "Yalın", "Sıla", "Çağatay Ulusoy", "Burak Deniz", "Alina Boz", "Hande Erçel",
  "Kerem Bürsin", "Demet Özdemir", "Çağlar Ertuğrul", "Engin Akyürek", "Serenay Sarıkaya",
  "İbrahim Çelikkol", "Fahriye Evcen", "Merve Boluğur", "Birce Akalay", "Alperen Duymaz",
  "Ayça Ayşin Turan", "Tolga Sarıtaş", "Melisa Şenolsun", "Aslı Enver", "Ezgi Mola",
  "Hazar Ergüçlü", "Burak Özçivit"
];

const lobbyDiv = document.getElementById("lobby");
const gameAreaDiv = document.getElementById("gameArea");
const buttonsDiv = document.getElementById("buttons");
const resultDiv = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");
const playerCountRange = document.getElementById("playerCountRange");
const playerCountDisplay = document.getElementById("playerCountDisplay");

let roles = [];
let revealed = [];
let revealedCount = 0;
let currentViewerIndex = null;

function getRandomName() {
  return namePool[Math.floor(Math.random() * namePool.length)];
}

function shuffle(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createButtons(count) {
  buttonsDiv.innerHTML = "";  // Önceki butonları temizle
  for(let i = 0; i < count; i++) {
    const btn = document.createElement("button");
    btn.id = "btn" + i;
    btn.textContent = `Oyuncu ${i+1}`;
    btn.onclick = () => revealRole(i);
    buttonsDiv.appendChild(btn);
  }
}

function revealRole(index) {
  if (revealed[index] || currentViewerIndex !== null) return;

  const role = roles[index];
  const emoji = role === "İmpostor" ? "🔥" : "😊";

  document.getElementById("btn" + index).disabled = true;
  revealed[index] = true;
  currentViewerIndex = index;
  nextBtn.disabled = true;

  resultDiv.textContent = "Rol yükleniyor...";
  resultDiv.className = "";

  // 1 saniye sonra gerçek rol gösterilsin
  setTimeout(() => {
    resultDiv.innerHTML = `Oyuncu ${index + 1} rolü: ${emoji} ${role}`;
    resultDiv.className = role === "İmpostor" ? "impostor" : "";
    nextBtn.disabled = false;
  }, 1000);
}




function nextTurn() {
  if (currentViewerIndex === null) return;

  resultDiv.textContent = "";
  resultDiv.className = "";
  currentViewerIndex = null;
  nextBtn.disabled = true;
  revealedCount++;

  if (revealedCount >= roles.length) {
    resultDiv.textContent = "Tüm oyuncular rollerini gördü.";
    nextBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
  }
}

function startGame() {
  const count = parseInt(playerCountRange.value);
  if(count < 3 || count > 50) {
    alert("Lütfen 3 ile 50 arasında bir oyuncu sayısı seçin.");
    return;
  }

  lobbyDiv.style.display = "none";
  gameAreaDiv.style.display = "block";

  // Roller: 1 impostor, geri kalanlar aynı isimle dolduruluyor
  const commonName = getRandomName();
  roles = Array(count - 1).fill(commonName);
  roles.push("İmpostor");
  shuffle(roles);

  revealed = new Array(count).fill(false);
  revealedCount = 0;
  currentViewerIndex = null;

  createButtons(count);

  resultDiv.textContent = "";
  nextBtn.disabled = true;
  nextBtn.style.display = "inline-block";
  resetBtn.style.display = "none";
}

// Sayacı slider ile göster
playerCountRange.addEventListener('input', () => {
  playerCountDisplay.textContent = playerCountRange.value;
});

// Event listener'ları bağla
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextTurn);
resetBtn.addEventListener("click", () => location.reload());

// Başlangıçta bazı elementlerin görünümünü ayarla
document.addEventListener('DOMContentLoaded', () => {
  gameAreaDiv.style.display = "none";
  nextBtn.style.display = "none";
  resetBtn.style.display = "none";
  playerCountDisplay.textContent = playerCountRange.value;
});
