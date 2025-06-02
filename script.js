// İsim havuzu
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

// Rastgele bir isim seç (boş olmayan)
function getRandomName() {
    let name = "";
    while(!name) {
        name = namePool[Math.floor(Math.random() * namePool.length)];
    }
    return name;
}

// Roller
const chosenName = getRandomName();
let roles = [chosenName, chosenName, chosenName, "İmpostor"];
roles = shuffle(roles);

const totalPlayers = roles.length;
const revealed = new Array(totalPlayers).fill(false); // Hangi oyuncular rolünü gördü

const buttons = [];
for(let i=0; i<totalPlayers; i++) {
    buttons.push(document.getElementById(`btn${i}`));
}

const resultDiv = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");

let currentTurn = 0;

function shuffle(array) {
    for(let i=array.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function revealRole(index) {
    if(revealed[index]) return; // Zaten gösterilmişse kapalı
    if(index !== currentTurn) {
        alert(`Sıra oyuncu ${currentTurn + 1}'de!`);
        return;
    }

    resultDiv.textContent = `Oyuncu ${index + 1} rolü: ${roles[index]}`;
    revealed[index] = true;
    // Bu butonu devre dışı bırakma, buton görünür kalsın ama tıklanmasın
    buttons[index].disabled = true;
    // Next butonu aktif olsun
    nextBtn.disabled = false;
}

function nextTurn() {
    if(!revealed[currentTurn]) {
        alert("Lütfen önce rolünüzü görün!");
        return;
    }
    currentTurn++;
    if(currentTurn >= totalPlayers) {
        // Tüm oyuncular rolünü gördü
        resultDiv.textContent = "Tüm oyuncular rollerini gördü.";
        nextBtn.style.display = "none";
        resetBtn.style.display = "inline-block";
    } else {
        // Rol gösterilen yazı temizlensin
        resultDiv.textContent = "";
        // Next butonu devre dışı kalsın yeni oyuncu rolünü görene kadar
        nextBtn.disabled = true;
    }
}

// Sayfa açıldığında next butonunu devre dışı yap
nextBtn.disabled = true;
resetBtn.style.display = "none";
