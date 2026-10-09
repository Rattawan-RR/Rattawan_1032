document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabLoginBtn = document.getElementById('tab-login-btn');
    const tabRegisterBtn = document.getElementById('tab-register-btn');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const alertBox = document.getElementById('auth-alert');

    function showAlert(message, type = 'success') {
        alertBox.textContent = message;
        alertBox.className = `auth-alert ${type}`;
        setTimeout(() => {
            alertBox.classList.add('hidden');
        }, 4000);
    }

    tabLoginBtn.addEventListener('click', () => {
        tabLoginBtn.classList.add('active');
        tabRegisterBtn.classList.remove('active');
        formLogin.classList.remove('hidden');
        formRegister.classList.add('hidden');
        alertBox.classList.add('hidden');
    });

    tabRegisterBtn.addEventListener('click', () => {
        tabRegisterBtn.classList.add('active');
        tabLoginBtn.classList.remove('active');
        formRegister.classList.remove('hidden');
        formLogin.classList.add('hidden');
        alertBox.classList.add('hidden');
    });

    // Password visibility toggle
    const toggleBtns = document.querySelectorAll('.toggle-pw');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const input = document.getElementById(targetId);
            if (input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    btn.textContent = 'ซ่อน';
                } else {
                    input.type = 'password';
                    btn.textContent = 'แสดง';
                }
            }
        });
    });

    // Login Form Submit
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const pw = document.getElementById('login-password').value;

        if (username.length < 3 || pw.length < 4) {
            showAlert('กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ถูกต้อง', 'error');
            return;
        }

        showAlert(`ยินดีต้อนรับคุณ ${username} เข้าสู่ระบบสำเร็จ!`, 'success');
        formLogin.reset();
    });

    // Register Form Live Validation
    const regUsername = document.getElementById('reg-username');
    const regEmail = document.getElementById('reg-email');
    const regPassword = document.getElementById('reg-password');
    const regConfirm = document.getElementById('reg-confirm');

    const hintUsername = document.getElementById('hint-username');
    const hintEmail = document.getElementById('hint-email');
    const hintConfirm = document.getElementById('hint-confirm');

    regUsername.addEventListener('input', () => {
        if (regUsername.value.trim().length >= 4) {
            hintUsername.textContent = '✓ ชื่อผู้ใช้ใช้งานได้';
            hintUsername.className = 'field-hint valid';
        } else {
            hintUsername.textContent = 'ชื่อผู้ใช้ต้องมีอย่างน้อย 4 ตัวอักษร';
            hintUsername.className = 'field-hint error';
        }
    });

    regEmail.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(regEmail.value.trim())) {
            hintEmail.textContent = '✓ รูปแบบอีเมลถูกต้อง';
            hintEmail.className = 'field-hint valid';
        } else {
            hintEmail.textContent = 'กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง';
            hintEmail.className = 'field-hint error';
        }
    });

    regConfirm.addEventListener('input', () => {
        if (regConfirm.value && regConfirm.value === regPassword.value) {
            hintConfirm.textContent = '✓ รหัสผ่านตรงกัน';
            hintConfirm.className = 'field-hint valid';
        } else {
            hintConfirm.textContent = 'รหัสผ่านยืนยันไม่ตรงกัน';
            hintConfirm.className = 'field-hint error';
        }
    });

    formRegister.addEventListener('submit', (e) => {
        e.preventDefault();
        if (regPassword.value.length < 6) {
            showAlert('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร', 'error');
            return;
        }

        if (regPassword.value !== regConfirm.value) {
            showAlert('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน', 'error');
            return;
        }

        showAlert('สมัครสมาชิกสำเร็จเรียบร้อย! คุณสามารถเข้าสู่ระบบได้ทันที', 'success');
        formRegister.reset();
        hintUsername.textContent = '';
        hintEmail.textContent = '';
        hintConfirm.textContent = '';

        setTimeout(() => {
            tabLoginBtn.click();
        }, 1500);
    });
});
