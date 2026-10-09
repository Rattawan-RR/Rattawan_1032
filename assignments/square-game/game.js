// =============================================================================
// MDT312 Assignment 7  - Square Game
// Modern JavaScript: DOM, Event, Timer
// =============================================================================

window.onload = pageLoad;

// Global timer reference เพื่อให้สามารถควบคุมและเคลียร์สถานะได้ถูกต้อง
let timer = null;

function pageLoad() {
	// 1. ผูกเหตุการณ์คลิกปุ่ม Start ด้วย const
	const startBtn = document.getElementById("start");
	startBtn.onclick = startGame;

	// 2. ใช้ Event Delegation (สไลด์หน้า 50–52):
	// ผูก event ไว้ที่กล่องแม่ #layer เพียงจุดเดียว
	// เมื่อมีการคลิกเกิดขึ้น ให้ใช้ event.target ตรวจสอบว่าเป็นกล่อง .square หรือไม่
	const gameLayer = document.getElementById("layer");
	gameLayer.onclick = function (event) {
		if (event.target.classList.contains("square")) {
			event.target.parentNode.removeChild(event.target);
		}
	};
}

function startGame() {
	const message = document.getElementById("message");
	message.textContent = "Playing...";
	clearScreen(); // ล้างกล่องเก่าออกก่อนเริ่มรอบใหม่
	addBox();
	timeStart();
}

function timeStart() {
	const TIMER_TICK = 1000;
	const clockDisplay = document.getElementById('clock');
	const message = document.getElementById("message");
	// เคลียร์ timer เดิมก่อนเริ่มนับใหม่ เพื่อป้องกันการนับเวลาเร่งความเร็วเมื่อกด Start ซ้ำ
	if (timer !== null) {
		clearInterval(timer);
		timer = null;
	}
	const min = 0.1;
	let second = min * 60;

	clockDisplay.textContent = second;
	message.textContent = "Game Started";

	// setting timer using setInterval function (สไลด์หน้า 12)
	timer = setInterval(function () {
		const allbox = document.querySelectorAll("#layer div");

		// ถ้ามีกล่องเหลืออยู่แล้วและเวลาหมด ให้ Game over
		if (second <= 0 && allbox.length > 0) {
			message.textContent = "Game over";
			alert("Game over");
			clearInterval(timer);
			timer = null;
			clearScreen();
			return;
		}

		// ถ้าไม่มีกล่องเหลือแล้ว ให้ You win
		if (allbox.length === 0) {
			message.textContent = "You win!";
			alert("You win!");
			clearInterval(timer);
			timer = null;
			clearScreen();
			return;
		}

		second--;
		clockDisplay.textContent = second;

		if (second <= 0 && allbox.length > 0) {
			message.textContent = "Game over";
			alert("Game over");
			clearInterval(timer);
			timer = null;
			clearScreen();
		}
	}, TIMER_TICK);
}

function addBox() {
	// สร้างกล่องตาม input ที่เราใส่
	const numbox = parseInt(document.getElementById("numbox").value) || 0;
	const gameLayer = document.getElementById("layer");
	const colorDrop = document.getElementById("color").value;

	for (let i = 0; i < numbox; i++) {
		const tempbox = document.createElement("div");
		tempbox.className = "square " + colorDrop;
		tempbox.id = "box" + i;
		tempbox.style.left = Math.random() * (500 - 25) + "px";
		tempbox.style.top = Math.random() * (500 - 25) + "px";

		// add element to HTML node 
		gameLayer.appendChild(tempbox);
	}
}

function clearScreen() {
	// ทำการลบ node ของกล่องทั้งหมด ออกจากหน้าจอ
	const allbox = document.querySelectorAll("#layer div"); // สไลด์หน้า 29
	for (let i = 0; i < allbox.length; i++) {
		allbox[i].parentNode.removeChild(allbox[i]);
	}
}
