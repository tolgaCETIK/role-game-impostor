// İsim havuzu
const namePool = [
  "Aleyna Tilki", "Edis", "Zeynep Bastik", "Merve Ozbey", "Simge", "Murda", "Hadise",
  "Reynmen", "Mabel Matiz", "Sefo", "Ben Fero", "Uzi", "Ezhel", "Gazapizm", "Murat Boz",
  "Gulsen", "Ilyas Yalcintas", "Emir Can Igrek", "Derya Ulug", "Serdar Ortac", "Gokhan Turkmen",
  "Oguzhan Koc", "Yalin", "Sila", "Cagatay Ulusoy", "Burak Deniz", "Alina Boz", "Hande Ercel",
  "Kerem Bursin", "Demet Ozdemir", "Caglar Ertugrul", "Engin Akyurek", "Serenay Sarikaya",
  "Ibrahim Celikkol", "Fahriye Evcen", "Merve Bolugur", "Birce Akalay", "Alperen Duymaz",
  "Ayca Aysin Turan", "Tolga Saritas", "Melisa Senolsun", "Asli Enver", "Ezgi Mola",
  "Hazar Ergüclu", "Burak Ozcivit"
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
let roles = [chosenName, chosenName, chosenName, "Impostor"];
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
