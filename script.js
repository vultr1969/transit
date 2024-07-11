const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const image1 = new Image();
const image2 = new Image();
const image3 = new Image();
image1.src = 'image1.png';
image2.src = 'image2.png';
image3.src = 'image3.png';

let isImage1Visible = true;
let istouchedQr = false;
let image1Loaded = false;
let image2Loaded = false;
let image3Loaded = false;

function startImageSwitching() {
    console.log("start")
    if (image1Loaded && image2Loaded && image3Loaded) {

        setInterval(() => {
            if (!istouchedQr) {
                if (isImage1Visible) {
                    drawImage(image1, 'Text on Image 1', 50, 50);
                    drawTexts();
                } else {
                    drawImage(image2, 'Text on Image 2', 50, 50);
                    drawTexts();
                }
                isImage1Visible = !isImage1Visible;
            } else {
                drawImage(image3, 'Text on Image 3', 50, 50);
                const now = new Date();
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const seconds = now.getSeconds().toString().padStart(2, '0');
                const amPm = hours >= 12 ? 'PM' : 'AM';
                const hours12 = hours % 12 || 12; // Convert 24h to 12h format

                const timeString = hours + ':' + minutes;
                const timeString2 = `${hours12}:${minutes}:${seconds} ${amPm}`;

                const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const dayOfWeek = days[now.getDay()];
                const month = months[now.getMonth()];
                const date = now.getDate();
                const year = now.getFullYear();
                const currentDate = `${dayOfWeek}, ${month} ${date}, ${year}`;

                drawText(timeString, 20, 50, '40px Arial');
            }
        }, 500);
    }
}

image1.onload = () => {
    image1Loaded = true;
    startImageSwitching();
};

image2.onload = () => {
    image2Loaded = true;
    startImageSwitching();
};

image3.onload = () => {
    image3Loaded = true;
    startImageSwitching();
}


function drawImage(image, text, x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}


function drawText(text, x, y, font = '30px Arial', color = 'white', align = 'left') {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
}

let minutes = Math.floor(Math.random() * 30) + 30; // 랜덤한 분 (0~59)
let seconds = 59; // 초는 59로 시작
let countdownString = "";

function updateCountdown() {
    // 시간이 0이 되면 카운트다운 종료
    if (minutes === 0 && seconds === 0) {
        clearInterval(countdownInterval);
        drawText("Expired", 540, 2022, 'bold 34px Arial', "black", "center");
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        countdownString = `Expires in 00:00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// 카운트다운 시작
const countdownInterval = setInterval(updateCountdown, 1000);

// 기존 drawTexts 함수 내용...

function drawTexts() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert 24h to 12h format

    const timeString = hours + ':' + minutes;
    const timeString2 = `${hours12}:${minutes}:${seconds} ${amPm}`;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayOfWeek = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    const currentDate = `${dayOfWeek}, ${month} ${date}, ${year}`;

    drawText(timeString, 20, 50, '40px Arial');
    drawText("2", 42, 215, 'bold 50px Arial', "black");
    drawText(timeString2, 540, 1818, 'bold 50px Arial', "black", "center");
    drawText(currentDate, 540, 1888, 'bold 50px Arial', "black", "center");
    drawText(countdownString, 540, 2022, 'bold 34px Arial', "black", "center");



}


canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left; // 캔버스 상의 x 좌표
    const y = event.clientY - rect.top; // 캔버스 상의 y 좌표
    console.log(x, y)

    // 특정 영역의 위치와 크기를 정의 (예: x: 50~150, y: 50~150)
    const areaXStart = 50;
    const areaXEnd = 1080;
    const areaYStart = 50;
    const areaYEnd = 400;

    // 클릭 위치가 특정 영역 안에 있는지 확인
    if (x >= areaXStart && x <= areaXEnd && y >= areaYStart && y <= areaYEnd) {
        istouchedQr = !istouchedQr; // 변수 값 토글
    }
});