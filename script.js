document.getElementById('draw-btn').addEventListener('click', function() {
    const rawText = document.getElementById('participants').value.trim();
    const lines = rawText.split('\n').map(item => item.trim()).filter(item => item.length > 0);

    if (lines.length === 0) {
        alert('Lütfen çekiliş için en az birkaç katılımcı adı girin!');
        return;
    }

    const drawBtn = document.getElementById('draw-btn');
    const animationBox = document.getElementById('animation-box');
    const spinnerName = document.getElementById('spinner-name');
    const resultsSection = document.getElementById('results-section');

    // Arayüzü hazırla
    drawBtn.disabled = true;
    resultsSection.classList.add('hidden');
    animationBox.classList.remove('hidden');

    // Rastgele isimleri döndüren animasyon efekti (2.5 saniye)
    let counter = 0;
    const maxCount = 25; 
    const intervalTime = 100;

    const shuffleInterval = setInterval(() => {
        const randomDisplayIndex = Math.floor(Math.random() * lines.length);
        spinnerName.textContent = lines[randomDisplayIndex];
        counter++;

        if (counter >= maxCount) {
            clearInterval(shuffleInterval);
            
            // --- ÖZEL KOD MANTIĞI ---
            // Asıl talihli her koşulda sabitlenmiştir:
            const mainWinner = "@RonBotMobile2DenemeCekilis";

            // Yedek talihli listeden tamamen rastgele seçilir (Asıl talihli hariç tutulabilir veya direkt rastgele)
            let availableForBackup = lines.filter(name => name !== mainWinner);
            if (availableForBackup.length === 0) {
                availableForBackup = lines; 
            }
            const randomBackupIndex = Math.floor(Math.random() * availableForBackup.length);
            const backupWinner = availableForBackup[randomBackupIndex];

            // Sonuçları ekrana yazdır
            document.getElementById('main-winner').textContent = mainWinner;
            document.getElementById('backup-winner').textContent = backupWinner;

            // Animasyonu gizle, sonuçları göster
            animationBox.classList.add('hidden');
            resultsSection.classList.remove('hidden');
            drawBtn.disabled = false;
        }
    }, intervalTime);
});
