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

function getRandomName() {
    let name = "";
    while(!name) {
        name = namePool[Math.floor(Math.random() * namePool.length)];
    }
    return name;
}

const chosenName = getRandomName();
let roles = [chosenName, chosenName, chosenName, "İmpostor"];
roles = shuffle(roles);

const totalPlayers = roles.length;
let revealed = new Array(totalPlayers).fill(false); // Kim rolünü gördü
let revealedCount = 0; // Kaç oyuncu rolünü gördü

const buttons = [];
for(let i = 0; i < totalPlayers; i++) {
    buttons.push(document.getElementById(`btn${i}`));
}

const resultDiv = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");

let currentViewerIndex = null;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// script.js içinde revealRole fonksiyonunu şu şekilde güncelle:
function revealRole(index) {
    if (revealed[index] || currentViewerIndex !== null) return;

    const role = roles[index];
    resultDiv.textContent = `Oyuncu ${index + 1} rolü: ${role}`;
    resultDiv.className = role === "İmpostor" ? "impostor" : "";
    
    buttons[index].disabled = true;
    revealed[index] = true;
    currentViewerIndex = index;
    nextBtn.disabled = false;
}


function nextTurn() {
    if (currentViewerIndex === null) return;

    resultDiv.textContent = "";
    resultDiv.className = "";  // Burada tüm classları temizliyoruz

    currentViewerIndex = null;
    nextBtn.disabled = true;
    revealedCount++;

    if (revealedCount >= totalPlayers) {
        resultDiv.textContent = "Tüm oyuncular rollerini gördü.";
        nextBtn.style.display = "none";
        resetBtn.style.display = "inline-block";
    }
}


// İlk durumda next butonu devre dışı
nextBtn.disabled = true;
resetBtn.style.display = "none";

// script.js içine şu fonksiyonu ekle:
function startGame() {
    document.getElementById("lobby").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
}
