/**
 * script.js - External JavaScript for Student Portfolio
 * วิชา: MDT312 Web Programming | มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
 * ผู้จัดทำ: นางสาว รัตตวัลย์ รัตนกรรภิรมย์ (รหัสนักศึกษา 67120501032)
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initCopyButtons();
    initBackToTop();
    initImageModal();
});

/* --- 1. ระบบควบคุมการสลับแท็บ (Tab Switcher) --- */
function switchTab(tabId) {
    const panels = document.querySelectorAll('.tab-panel');
    const buttons = document.querySelectorAll('.tab-btn');

    const targetPanel = document.getElementById(tabId);
    if (!targetPanel) return;

    // ซ่อนเนื้อหาทุกแท็บ
    panels.forEach(panel => {
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
    });

    // ปลดสถานะ active จากปุ่มแท็บ
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });

    // แสดงแท็บที่เลือก
    targetPanel.classList.add('active');
    targetPanel.setAttribute('aria-hidden', 'false');

    // ไฮไลท์ปุ่มแท็บ
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
        targetBtn.setAttribute('aria-selected', 'true');
    }

    // อัปเดต URL Hash
    if (history.replaceState) {
        history.replaceState(null, null, `#${tabId}`);
    }
}

/* --- 2. ตั้งค่าเริ่มต้นแท็บและคีย์บอร์ดนำทาง --- */
function initTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            if (tabId) switchTab(tabId);
        });

        // รองรับการใช้ลูกศรซ้าย-ขวาบนคีย์บอร์ด
        btn.addEventListener('keydown', (e) => {
            let targetIndex = null;
            if (e.key === 'ArrowRight') {
                targetIndex = (index + 1) % buttons.length;
            } else if (e.key === 'ArrowLeft') {
                targetIndex = (index - 1 + buttons.length) % buttons.length;
            }
            if (targetIndex !== null) {
                buttons[targetIndex].focus();
                buttons[targetIndex].click();
            }
        });
    });

    // ตรวจสอบ URL Hash เมื่อโหลดหน้าเว็บ
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        switchTab(hash);
    }
}

/* --- 3. ฟังก์ชันคลิกคัดลอกข้อมูลพร้อมกล่องแจ้งเตือน (Toast Notification) --- */
function initCopyButtons() {
    const copyBtns = document.querySelectorAll('[data-copy]');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`คัดลอก "${textToCopy}" เรียบร้อยแล้ว`);
            }).catch(() => {
                showToast('คัดลอกข้อความสำเร็จ');
            });
        });
    });
}

function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

/* --- 4. ปุ่มเลื่อนกลับขึ้นด้านบน (Back to Top Button) --- */
function initBackToTop() {
    const backBtn = document.getElementById('btn-back-to-top');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    });

    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* --- 5. ระบบดูภาพผลงานขนาดใหญ่ (Image Modal Preview) --- */
function initImageModal() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.getElementById('modal-close');
    if (!modal || !modalImg) return;

    const clickableImages = document.querySelectorAll('.project-img, .profile-img');
    clickableImages.forEach(img => {
        img.title = 'คลิกเพื่อดูภาพขนาดใหญ่';
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            if (modalCaption) {
                modalCaption.textContent = img.alt || 'ภาพตัวอย่างผลงาน';
            }
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}
