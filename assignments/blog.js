document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');
    const authorInput = document.getElementById('author-input');
    const commentInput = document.getElementById('comment-input');
    const commentCount = document.getElementById('comment-count');

    let count = 2;

    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const author = authorInput.value.trim();
            const text = commentInput.value.trim();

            if (!author || !text) return;

            const newComment = document.createElement('div');
            newComment.className = 'comment-item';
            newComment.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${escapeHTML(author)}</span>
                    <span class="comment-time">เมื่อสักครู่</span>
                </div>
                <p class="comment-text">${escapeHTML(text)}</p>
            `;

            commentList.appendChild(newComment);
            count++;
            if (commentCount) commentCount.textContent = count;

            commentForm.reset();
            authorInput.focus();
        });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
