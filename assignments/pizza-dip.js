document.addEventListener('DOMContentLoaded', () => {
    // Ingredient toggle
    const ingredients = document.querySelectorAll('.ingredient-list li');
    ingredients.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('done');
        });
    });

    // Countdown Timer logic (20 minutes = 1200 seconds)
    const initialTime = 20 * 60;
    let timeLeft = initialTime;
    let timerId = null;

    const timerDisplay = document.getElementById('timer-display');
    const btnStart = document.getElementById('btn-timer-start');
    const btnReset = document.getElementById('btn-timer-reset');

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    if (btnStart) {
        btnStart.addEventListener('click', () => {
            if (timerId === null) {
                btnStart.textContent = 'หยุดชั่วคราว';
                btnStart.style.backgroundColor = '#d97706';
                timerId = setInterval(() => {
                    if (timeLeft > 0) {
                        timeLeft--;
                        timerDisplay.textContent = formatTime(timeLeft);
                    } else {
                        clearInterval(timerId);
                        timerId = null;
                        btnStart.textContent = 'เริ่มจับเวลา';
                        btnStart.style.backgroundColor = '#dc2626';
                        alert('ครบเวลาอบ 20 นาทีแล้ว! พิซซ่าดิปชีสยืดพร้อมเสิร์ฟ');
                    }
                }, 1000);
            } else {
                clearInterval(timerId);
                timerId = null;
                btnStart.textContent = 'เริ่มต่อ';
                btnStart.style.backgroundColor = '#dc2626';
            }
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (timerId !== null) {
                clearInterval(timerId);
                timerId = null;
            }
            timeLeft = initialTime;
            timerDisplay.textContent = formatTime(timeLeft);
            if (btnStart) {
                btnStart.textContent = 'เริ่มจับเวลา';
                btnStart.style.backgroundColor = '#dc2626';
            }
        });
    }
});
