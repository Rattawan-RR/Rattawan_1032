// =============================================================================
// MDT312 Assignment 6 register.js
// Modernized: ES6 (const/let), event.preventDefault(), and localStorage
// =============================================================================

window.onload = pageLoad;

function pageLoad() {
    const form = document.getElementById("myRegister");
    form.onsubmit = validateForm;
}

function validateForm(event) {
    const form = document.forms["myRegister"];
    const errorMsg = document.getElementById("errormsg");

    const firstname = form["firstname"].value.trim();
    const lastname = form["lastname"].value.trim();
    const gender = form["gender"].value;
    const bday = form["bday"].value;
    const email = form["email"].value.trim();
    const username = form["username"].value.trim();

    const passwords = form["password"];
    const password = passwords[0].value;
    const retypePassword = passwords[1].value;

    // ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบทุกช่องหรือไม่
    if (!firstname || !lastname || !gender || !bday || !email || !username || !password || !retypePassword) {
        errorMsg.innerHTML = "กรุณากรอกข้อมูลให้ครบทุกช่อง";
        if (event) {
            event.preventDefault();
        }
        return false;
    }

    // 1. ตรวจสอบว่า Password ทั้ง 2 ช่องตรงกันหรือไม่ ถ้าไม่ตรงกันให้แจ้งเตือน และให้return false
    if (password !== retypePassword) {
        errorMsg.innerHTML = "รหัสผ่านกับช่องยืนยันรหัสผ่านไม่ตรงกัน";
        if (event) {
            event.preventDefault();
        }
        return false;
    }

    // 2. เคลียร์ข้อความแจ้งเตือนถ้าผ่านการตรวจสอบ
    errorMsg.innerHTML = "";

    // 3. บันทึกข้อมูลลงใน localStorage ทีละตัว
    // เพื่อความปลอดภัย: รหัสผ่านไม่ปรากฏบน Browser Address Bar และ Browser History
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("email", email);


    alert("ลงทะเบียนสำเร็จ! ระบบบันทึกข้อมูลเรียบร้อย กำลังไปที่หน้า Login");

    // 4. นำทางไปหน้า login.html
    if (event) {
        event.preventDefault();
    }
    window.location.href = "login.html";
    return true;
}
