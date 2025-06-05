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
    let selectedCategory = 'all';
    let selectedGameMode = 'impostor'; // Varsayılan oyun modu

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
      let emoji, className;
      
      if (selectedGameMode === 'impostor') {
        emoji = role === "İmpostor" ? "🔥" : "😊";
        className = role === "İmpostor" ? "impostor" : "";
      } else {
        // Farklı isim modunda, farklı isim alan kişi için özel gösterim
        if (role.startsWith("FARKLI:")) {
          emoji = "⭐";
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

      // 1 saniye sonra gerçek rol gösterilsin
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

      if (selectedGameMode === 'impostor') {
        // İmpostor modu: 1 impostor, diğer herkes aynı isim
        const commonName = namePool[Math.floor(Math.random() * namePool.length)];
        roles = Array(count - 1).fill(commonName);
        roles.push("İmpostor");
        shuffle(roles);
      } else {
        // Farklı isim modu: 1 kişiye farklı isim, diğerlerine aynı başka isim
        const commonName = namePool[Math.floor(Math.random() * namePool.length)];
        let differentName;
        
        // Farklı isim seçerken aynı isim olmamasını sağla
        do {
          differentName = namePool[Math.floor(Math.random() * namePool.length)];
        } while (differentName === commonName);
        
        roles = Array(count - 1).fill(commonName);
        roles.push("FARKLI:" + differentName); // Farklı ismi işaretlemek için prefix ekle
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

      lobbyBtn.style.display = "inline-block";  // Lobiye dön butonunu göster
    }

    // Event listener'ları bağla
    startBtn.addEventListener("click", startGame);
    nextBtn.addEventListener("click", nextTurn);
    resetBtn.addEventListener("click", () => {
      // Oyunu yeniden başlat (Başla butonuna basılmış gibi)
      startGame();
    });

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

    // Kategori dropdown
    const customDropdown = document.getElementById('customDropdown');
    const selected = customDropdown.querySelector('.selected');
    const options = customDropdown.querySelectorAll('.dropdown-options li');

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

    // Oyun modu dropdown
    const gameModeDropdown = document.getElementById('gameModeDropdown');
    const gameModeSelected = gameModeDropdown.querySelector('.game-mode-selected');
    const gameModeOptions = gameModeDropdown.querySelectorAll('.game-mode-options li');

    gameModeSelected.addEventListener('click', () => {
      gameModeDropdown.classList.toggle('active');
    });

    gameModeOptions.forEach(option => {
      option.addEventListener('click', () => {
        const modeValue = option.dataset.value;
        const modeText = modeValue === 'impostor' ? 'İmpostor Modu' : 'Farklı İsim Modu';
        gameModeSelected.textContent = modeText;
        selectedGameMode = modeValue;
        gameModeDropdown.classList.remove('active');
        console.log("Seçilen oyun modu:", selectedGameMode);
      });
    });

    // Başlangıçta bazı elementlerin görünümünü ayarla
    document.addEventListener('DOMContentLoaded', () => {
      gameAreaDiv.style.display = "none";
      nextBtn.style.display = "none";
      resetBtn.style.display = "none";
      playerCountDisplay.textContent = playerCountRange.value;
    });

    // Dropdown'ları kapatmak için dışarıya tıklama
    document.addEventListener('click', (e) => {
      if (!customDropdown.contains(e.target)) {
        customDropdown.classList.remove('active');
      }
      if (!gameModeDropdown.contains(e.target)) {
        gameModeDropdown.classList.remove('active');
      }
    });
    
    const blurOverlay = document.getElementById('blurOverlay');

customDropdown.addEventListener('click', () => {
  const isOpen = customDropdown.classList.toggle('open'); // open class toggle
  blurOverlay.style.display = isOpen ? 'block' : 'none';
});

gameModeDropdown.addEventListener('click', () => {
  const isOpen = gameModeDropdown.classList.toggle('open');
  blurOverlay.style.display = isOpen ? 'block' : 'none';
});

// Ayrıca overlay'e tıklayınca dropdown kapansın:
blurOverlay.addEventListener('click', () => {
  customDropdown.classList.remove('open');
  gameModeDropdown.classList.remove('open');
  blurOverlay.style.display = 'none';
});
