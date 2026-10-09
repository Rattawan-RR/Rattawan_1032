document.addEventListener('DOMContentLoaded', () => {
    let currentServings = 8;
    const baseServings = 8;

    const servingsDisplay = document.getElementById('servings-display');
    const btnDec = document.getElementById('btn-dec');
    const btnInc = document.getElementById('btn-inc');
    const ingredientItems = document.querySelectorAll('#ingredient-list li');
    const stepItems = document.querySelectorAll('.step-item');

    function updateIngredients() {
        servingsDisplay.textContent = currentServings;
        const ratio = currentServings / baseServings;

        ingredientItems.forEach(item => {
            const baseVal = parseFloat(item.dataset.base);
            const qtySpan = item.querySelector('.qty');
            if (baseVal && qtySpan) {
                const newVal = Math.round(baseVal * ratio * 10) / 10;
                qtySpan.textContent = newVal;
            }
        });
    }

    if (btnDec) {
        btnDec.addEventListener('click', () => {
            if (currentServings > 2) {
                currentServings -= 2;
                updateIngredients();
            }
        });
    }

    if (btnInc) {
        btnInc.addEventListener('click', () => {
            if (currentServings < 24) {
                currentServings += 2;
                updateIngredients();
            }
        });
    }

    stepItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('completed');
        });
    });
});
