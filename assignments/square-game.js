document.addEventListener('DOMContentLoaded', () => {
    const arena = document.getElementById('game-arena');
    const overlay = document.getElementById('arena-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayMsg = document.getElementById('overlay-msg');
    const timeVal = document.getElementById('time-val');
    const scoreVal = document.getElementById('score-val');
    const highScoreVal = document.getElementById('high-score-val');
    const btnStart = document.getElementById('btn-start');
    const btnReset = document.getElementById('btn-reset');
    const squareNumSelect = document.getElementById('square-num');

    const colors = [
        '#ef4444', '#f97316', '#f59e0b', '#10b981',
        '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
    ];

    let score = 0;
    let highScore = parseInt(localStorage.getItem('mdt312_square_highscore') || '0', 10);
    highScoreVal.textContent = highScore;

    let timeLeft = 30;
    let gameInterval = null;
    let isPlaying = false;

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function spawnSquares(count) {
        // Clear previous squares (keeping overlay)
        const oldSquares = arena.querySelectorAll('.square-target');
        oldSquares.forEach(sq => sq.remove());

        const arenaRect = arena.getBoundingClientRect();
        const sqSize = 44;
        const maxX = Math.max(10, arenaRect.width - sqSize - 20);
        const maxY = Math.max(10, arenaRect.height - sqSize - 20);

        for (let i = 0; i < count; i++) {
            const sq = document.createElement('div');
            sq.className = 'square-target';
            sq.style.backgroundColor = getRandomColor();
            sq.style.left = `${Math.floor(Math.random() * maxX) + 10}px`;
            sq.style.top = `${Math.floor(Math.random() * maxY) + 10}px`;

            sq.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!isPlaying) return;

                score++;
                scoreVal.textContent = score;

                // Animate pop out
                sq.style.transform = 'scale(1.4)';
                sq.style.opacity = '0';
                setTimeout(() => {
                    sq.remove();
                    // If no squares left in arena, spawn new batch!
                    const remaining = arena.querySelectorAll('.square-target');
                    if (remaining.length === 0 && isPlaying) {
                        spawnSquares(parseInt(squareNumSelect.value, 10));
                    }
                }, 100);
            });

            arena.appendChild(sq);
        }
    }

    function startGame() {
        if (isPlaying) return;

        score = 0;
        timeLeft = 30;
        isPlaying = true;
        scoreVal.textContent = '0';
        timeVal.textContent = `${timeLeft}s`;

        overlay.classList.add('hidden');
        btnStart.disabled = true;
        btnStart.style.opacity = '0.5';

        const count = parseInt(squareNumSelect.value, 10);
        spawnSquares(count);

        gameInterval = setInterval(() => {
            timeLeft--;
            timeVal.textContent = `${timeLeft}s`;

            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(gameInterval);
        gameInterval = null;
        isPlaying = false;

        btnStart.disabled = false;
        btnStart.style.opacity = '1';

        // Clear squares
        const oldSquares = arena.querySelectorAll('.square-target');
        oldSquares.forEach(sq => sq.remove());

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('mdt312_square_highscore', highScore.toString());
            highScoreVal.textContent = highScore;
            overlayTitle.textContent = `🎉 สุดยอดมาก! สถิติใหม่: ${score} คะแนน`;
        } else {
            overlayTitle.textContent = `หมดเวลา! คุณทำได้ ${score} คะแนน`;
        }

        overlayMsg.textContent = 'กดปุ่ม "เริ่มเล่นเกม" เพื่อลองใหม่อีกครั้ง';
        overlay.classList.remove('hidden');
    }

    function resetGame() {
        clearInterval(gameInterval);
        gameInterval = null;
        isPlaying = false;
        score = 0;
        timeLeft = 30;

        scoreVal.textContent = '0';
        timeVal.textContent = '30s';
        btnStart.disabled = false;
        btnStart.style.opacity = '1';

        const oldSquares = arena.querySelectorAll('.square-target');
        oldSquares.forEach(sq => sq.remove());

        overlayTitle.textContent = 'กดปุ่ม "เริ่มเล่นเกม" เพื่อเริ่มประลองความไว!';
        overlayMsg.textContent = 'คลิกที่กล่องสี่เหลี่ยมแต่ละอันเพื่อเก็บคะแนน';
        overlay.classList.remove('hidden');
    }

    btnStart.addEventListener('click', startGame);
    btnReset.addEventListener('click', resetGame);
});
