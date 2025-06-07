 const namePools = {
  singers: [
    "Aleyna Tilki", "Edis", "Zeynep Bastık", "Merve Özbey", "Simge",
    "Murda", "Hadise", "Reynmen", "Mabel Matiz", "Sefo",
    "Ben Fero", "Uzi", "Ezhel", "Gazapizm", "Murat Boz",
    "Gülşen", "İlyas Yalçıntaş", "Emir Can İğrek", "Derya Uluğ", "Serdar Ortaç",
    "Gökhan Türkmen", "Melike Şahin", "Melek Mosso", "Sıla", "Buray",
    "Yalın", "Oğuzhan Koç", "Motive", "Lvbel C5", "Ceza",
    "Taylor Swift", "Billie Eilish", "Ariana Grande", "Dua Lipa", "Doja Cat",
    "Olivia Rodrigo", "Selena Gomez", "Lana Del Rey", "Rihanna", "Beyoncé",
    "Nicki Minaj", "Camila Cabello", "The Weeknd", "Justin Bieber", "Harry Styles",
    "Travis Scott", "Shawn Mendes", "Bruno Mars", "Rosé", "Jennie",
    "Lisa", 
  ],

  actors: [
    "Çağatay Ulusoy", "Burak Deniz", "Alina Boz", "Hande Erçel",
    "Kerem Bürsin", "Demet Özdemir", "Çağlar Ertuğrul", "Engin Akyürek", "Serenay Sarıkaya",
    "İbrahim Çelikkol", "Fahriye Evcen", "Merve Boluğur", "Birce Akalay", "Alperen Duymaz",
    "Ayça Ayşin Turan", "Tolga Sarıtaş", "Melisa Şenolsun", "Aslı Enver", "Ezgi Mola",
    "Hazar Ergüçlü", "Burak Özçivit", "Tolga Çevik", "Cem Yılmaz",
    "Kıvanç Tatlıtuğ", "Engin Altan Düzyatan", "Barış Arduç", "Hazal Kaya", "Elçin Sangu",
    "Özge Gürel", "Serkan Çayoğlu", "Meryem Uzerli", "Halit Ergenç",
    "Kenan İmirzalıoğlu", "Tuba Büyüküstün", "Burcu Biricik", "Gökçe Bahadır",
    "Timothée Chalamet", "Zendaya", "Tom Holland",
    "Chris Hemsworth", "Scarlett Johansson", "Robert Downey Jr.", "Jennifer Lawrence", "Leonardo DiCaprio",
    "Brad Pitt", "Angelina Jolie", "Gal Gadot", "Ryan Reynolds", "Margot Robbie",
    "Dwayne Johnson", "Emma Stone", "Chris Evans", "Natalie Portman", "Will Smith", "Miray Daner", "Sümeyye Erdoğan",
     "Afra Saraçoğlu", "Bensu Soral", "Pelin Akil", "Gizem Karaca",
      "Alp Navruz", "İlayda Akdoğan", "Sinem Ünsal", "Ahsen Eroğlu"

  ],

  influencers: [
    "Kerimcan Durmaz", "Orkun Işıtmak", "Enes Batur", "CZN Burak", "Danla Bilic",
    "Merve Özkaynak", "Ruhi Çenet", "Cemre Solmaz", "Burak Oyunda", "Duygu Özaslan",
    "Kafalar", "Barış Özcan", "Berkcan Güven", "Pqueen", "Nihal Candan",
    "Yasemin Sakallıoğlu", "Nusret", "Ece Seçkin", "Berfu Yenenler",
    "Mustafa Kemal Atatürk", "Recep Tayyip Erdoğan", "Fatih Sultan Mehmet", "Kenan Sofuoğlu", "Arda Güler",
    "Kenan Yıldız", "Cristiano Ronaldo", "Lionel Messi", "LeBron James", "Michael Jordan",
    "David Beckham", "Emmanuel Macron", "Donald Trump", "Elon Musk", "Jeff Bezos",
    "Bill Gates", "Mark Zuckerberg", "Ali Koç", "Benim adım Neargiss", "İdil Yazar", "Refika", "Acun", "Kanka Youtube'dasın", "Zebani Efe", "Mika Raun", "Limonlu Limonlu" 
  ]
};

namePools.all = [...namePools.singers, ...namePools.actors, ...namePools.influencers];

    // DOM elementleri
    const lobbyDiv = document.getElementById("lobby");
    const gameAreaDiv = document.getElementById("gameArea");
    const buttonsDiv = document.getElementById("buttons");
    const resultDiv = document.getElementById("result");
    const nextBtn = document.getElementById("nextBtn");
    const resetBtn = document.getElementById("resetBtn");
    const startBtn = document.getElementById("startBtn");
    const playerCountRange = document.getElementById("playerCountRange");
    const playerCountDisplay = document.getElementById("playerCountDisplay");
    const lobbyBtn = document.getElementById("lobbyBtn");

    let roles = [];
    let revealed = [];
    let revealedCount = 0;
    let currentViewerIndex = null;
    let selectedCategory = 'all';
    let selectedGameMode = 'impostor';

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function createButtons(count) {
      buttonsDiv.innerHTML = "";
      for (let i = 0; i < count; i++) {
        const btn = document.createElement("button");
        btn.id = "btn" + i;
        btn.textContent = `Oyuncu ${i + 1}`;
        btn.onclick = () => revealRole(i);
        buttonsDiv.appendChild(btn);
      }
    }

    function revealRole(index) {
      if (revealed[index] || currentViewerIndex !== null) return;

      const role = roles[index];
      let emoji, className;

      if (selectedGameMode === 'impostor') {
        emoji = role === "İmpostor" ? "🔥" : "😊";
        className = role === "İmpostor" ? "impostor" : "";
      } else {
        if (role.startsWith("FARKLI:")) {
          emoji = "😊";
          className = "different-name";
        } else {
          emoji = "😊";
          className = "";
        }
      }

      document.getElementById("btn" + index).disabled = true;
      revealed[index] = true;
      currentViewerIndex = index;
      nextBtn.disabled = true;

      resultDiv.textContent = "Rol yükleniyor...";
      resultDiv.className = "";

      setTimeout(() => {
        let displayRole = role;
        if (selectedGameMode === 'different' && role.startsWith("FARKLI:")) {
          displayRole = role.replace("FARKLI:", "");
        }

        resultDiv.innerHTML = `Oyuncu ${index + 1} rolü: ${emoji} ${displayRole}`;
        resultDiv.className = className;
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

      if (count < 3 || count > 10) {
        alert("Lütfen 3 ile 10 arasında bir oyuncu sayısı seçin.");
        return;
      }

      const namePool = namePools[selectedCategory];

      lobbyDiv.style.display = "none";
      gameAreaDiv.style.display = "block";

      if (selectedGameMode === 'impostor') {
        const commonName = namePool[Math.floor(Math.random() * namePool.length)];
        roles = Array(count - 1).fill(commonName);
        roles.push("İmpostor");
        shuffle(roles);
      } else {
        const commonName = namePool[Math.floor(Math.random() * namePool.length)];
        let differentName;

        do {
          differentName = namePool[Math.floor(Math.random() * namePool.length)];
        } while (differentName === commonName);

        roles = Array(count - 1).fill(commonName);
        roles.push("FARKLI:" + differentName);
        shuffle(roles);
      }

      revealed = new Array(count).fill(false);
      revealedCount = 0;
      currentViewerIndex = null;

      createButtons(count);

      resultDiv.textContent = "";
      nextBtn.disabled = true;
      nextBtn.style.display = "inline-block";
      resetBtn.style.display = "none";
      lobbyBtn.style.display = "inline-block";
    }

    // Event Listeners
    playerCountRange.addEventListener('input', () => {
      playerCountDisplay.textContent = playerCountRange.value;
    });

    startBtn.addEventListener("click", startGame);
    nextBtn.addEventListener("click", nextTurn);
    resetBtn.addEventListener("click", startGame);

    lobbyBtn.addEventListener("click", () => {
      gameAreaDiv.style.display = "none";
      lobbyDiv.style.display = "block";
      nextBtn.style.display = "none";
      resetBtn.style.display = "none";
      lobbyBtn.style.display = "none";
      
      roles = [];
      revealed = [];
      revealedCount = 0;
      currentViewerIndex = null;
      buttonsDiv.innerHTML = "";
      resultDiv.textContent = "";
    });

    // Dropdown işlevselliği
    document.addEventListener('DOMContentLoaded', function() {
      const customDropdown = document.getElementById('customDropdown');
      const gameModeDropdown = document.getElementById('gameModeDropdown');
      const blurOverlay = document.getElementById('blurOverlay');

      function closeAllDropdowns() {
        customDropdown.classList.remove('active');
        gameModeDropdown.classList.remove('active');
        blurOverlay.style.display = 'none';
      }

      // Kategori dropdown
      customDropdown.querySelector('.selected').addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = customDropdown.classList.contains('active');
        
        closeAllDropdowns();
        
        if (!isActive) {
          customDropdown.classList.add('active');
          blurOverlay.style.display = 'block';
        }
      });

      // Mod dropdown
      gameModeDropdown.querySelector('.game-mode-selected').addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = gameModeDropdown.classList.contains('active');
        
        closeAllDropdowns();
        
        if (!isActive) {
          gameModeDropdown.classList.add('active');
          blurOverlay.style.display = 'block';
        }
      });

      // Kategori seçimi
      customDropdown.querySelectorAll('.dropdown-options li').forEach(option => {
        option.addEventListener('click', function() {
          const selected = customDropdown.querySelector('.selected');
          selected.textContent = this.textContent;
          selectedCategory = this.dataset.value;
          closeAllDropdowns();
        });
      });

      // Mod seçimi
      gameModeDropdown.querySelectorAll('.game-mode-options li').forEach(option => {
        option.addEventListener('click', function() {
          const selected = gameModeDropdown.querySelector('.game-mode-selected');
          const modeValue = this.dataset.value;
          const modeText = modeValue === 'impostor' ? 'İmpostor Modu' : 'Farklı İsim Modu';
          selected.textContent = modeText;
          selectedGameMode = modeValue;
          closeAllDropdowns();
        });
      });

      // Dışarıya tıklama ve blur overlay
      document.addEventListener('click', closeAllDropdowns);
      blurOverlay.addEventListener('click', closeAllDropdowns);
    });