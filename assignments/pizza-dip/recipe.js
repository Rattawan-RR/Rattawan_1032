// External JavaScript for Pizza Dip Recipe - MDT312
document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('.ingredient-group li, .step-item');
    listItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.title = 'คลิกเพื่อขีดฆ่ารายการ';
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
