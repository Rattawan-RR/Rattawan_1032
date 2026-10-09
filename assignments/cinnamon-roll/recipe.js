// External JavaScript for Cinnamon Roll Recipe - MDT312
document.addEventListener('DOMContentLoaded', () => {
    const ingredients = document.querySelectorAll('.ingredient');
    ingredients.forEach(item => {
        item.style.cursor = 'pointer';
        item.title = 'คลิกเพื่อขีดฆ่าวัตถุดิบที่เตรียมแล้ว';
        item.addEventListener('click', () => {
            item.classList.toggle('checked');
            if (item.classList.contains('checked')) {
                item.style.opacity = '0.5';
                item.style.textDecoration = 'line-through';
            } else {
                item.style.opacity = '1';
                item.style.textDecoration = 'none';
            }
        });
    });
});
