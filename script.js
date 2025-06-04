const namePools = {
  singers: [
    "Aleyna Tilki", "Edis", "Zeynep Bastık", "Merve Özbey", "Simge", "Murda", "Hadise",
    "Reynmen", "Mabel Matiz", "Sefo", "Ben Fero", "Uzi", "Ezhel", "Gazapizm", "Murat Boz",
    "Gülşen", "İlyas Yalçıntaş", "Emir Can İğrek", "Derya Uluğ", "Serdar Ortaç", "Gökhan Türkmen"
  ],
  actors: [
    "Çağatay Ulusoy", "Burak Deniz", "Alina Boz", "Hande Erçel",
    "Kerem Bürsin", "Demet Özdemir", "Çağlar Ertuğrul", "Engin Akyürek", "Serenay Sarıkaya",
    "İbrahim Çelikkol", "Fahriye Evcen", "Merve Boluğur", "Birce Akalay", "Alperen Duymaz",
    "Ayça Ayşin Turan", "Tolga Sarıtaş", "Melisa Şenolsun", "Aslı Enver", "Ezgi Mola",
    "Hazar Ergüçlü", "Burak Özçivit", "Tolga Çevik", "Cem Yılmaz"
  ],
  influencers: ["Kerimcan Durmaz", "Orkun Işıtmak", "Enes Batur", "CZN Burak", "Danla Bilic", "Merve Özkaynak", "Reynmen", "Ruhi Çenet", "Cemre Solmaz", "Burak Oyunda", "Duygu Özaslan", "Kafalar", "Barış Özcan", "Berkcan Güven", "Pqueen", "Nihal Candan", "Yasemin Sakallıoğlu", "Nusret", "Ece Seçkin", "Berfu Yıldız"]

};
namePools.all = [...namePools.singers, ...namePools.actors, ...namePools.influencers];


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

function getRandomNameByCategory(category) {
  let pool = [];

  switch (category) {
    case "singers":
      pool = namePools.singers;
      break;
    case "actors":
      pool = namePools.actors;
      break;
    case "influencers":
      pool = namePools.influencers;
      break;
    case "all":
    default:
      pool = [
        ...namePools.singers,
        ...namePools.actors,
        ...namePools.influencers
      ];
  }

  return pool[Math.floor(Math.random() * pool.length)];
}




// Sayacı slider ile göster
playerCountRange.addEventListener('input', () => {
  playerCountDisplay.textContent = playerCountRange.value;
});

// Event listener'ları bağla
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextTurn);
resetBtn.addEventListener("click", () => {
  // Oyunu yeniden başlat (Başla butonuna basılmış gibi)
  startGame();
});


// Başlangıçta bazı elementlerin görünümünü ayarla
document.addEventListener('DOMContentLoaded', () => {
  gameAreaDiv.style.display = "none";
  nextBtn.style.display = "none";
  resetBtn.style.display = "none";
  playerCountDisplay.textContent = playerCountRange.value;
});

function startGame() {
  const count = parseInt(playerCountRange.value);
  const category = selectedCategory;


  if (count < 3 || count > 10) {
    alert("Lütfen 3 ile 10 arasında bir oyuncu sayısı seçin.");
    return;
  }

  const namePool = namePools[category];

  lobbyDiv.style.display = "none";
  gameAreaDiv.style.display = "block";

  // 1 impostor, diğer herkes aynı isim
  const commonName = namePool[Math.floor(Math.random() * namePool.length)];
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

  lobbyBtn.style.display = "inline-block";  // Lobiye dön butonunu göster
}


lobbyBtn.addEventListener("click", () => {
  gameAreaDiv.style.display = "none";
  lobbyDiv.style.display = "block";

  nextBtn.style.display = "none";
  resetBtn.style.display = "none";
  lobbyBtn.style.display = "none";

  // Oyun verilerini temizleyelim (isteğe bağlı)
  roles = [];
  revealed = [];
  revealedCount = 0;
  currentViewerIndex = null;
  buttonsDiv.innerHTML = "";
  resultDiv.textContent = "";
});

const customDropdown = document.getElementById('customDropdown');
const selected = customDropdown.querySelector('.selected');
const options = customDropdown.querySelectorAll('.dropdown-options li');

let selectedCategory = 'all'; // Varsayılan

selected.addEventListener('click', () => {
  customDropdown.classList.toggle('active');
});

options.forEach(option => {
  option.addEventListener('click', () => {
    selected.textContent = option.textContent;
    selectedCategory = option.dataset.value;
    customDropdown.classList.remove('active');
    console.log("Seçilen kategori:", selectedCategory);
  });
});
