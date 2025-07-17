const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Responsive canvas
function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth * 0.9, 900);
    canvas.height = Math.min(window.innerWidth * 0.6, 600);
    if (window.innerHeight * 0.8 < canvas.height) {
        canvas.height = window.innerHeight * 0.8;
    }
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Game variables
let paddleWidth = 75;
const paddleHeight = 10;
let paddleX = 0;
let paddleY = 0;
let paddleSpeed = 7;
let rightPressed = false;
let leftPressed = false;
let paddleColor = '#09f';

let ballRadius = 12;
let ballX = 0;
let ballY = 0;
let ballDX = 3;
let ballDY = -3;
let ballSpeed = 3;
let ballColor = '#f33';
let ballImage = null;
let ballImageLoaded = false;

let score = 0;
let isGameOver = false;

function resetPositions() {
    paddleWidth = Math.max(canvas.width * 0.18, 60);
    paddleX = (canvas.width - paddleWidth) / 2;
    paddleY = canvas.height - paddleHeight - 10;
    ballX = canvas.width / 2;
    ballY = canvas.height - 30;
    ballDX = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
    ballDY = -ballSpeed;
}

resetPositions();
window.addEventListener('resize', resetPositions);

// Handle keyboard controls
function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// Handle mouse movement
canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    paddleX = mouseX - paddleWidth / 2;
    if (paddleX < 0) paddleX = 0;
    if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;
});

// Handle custom ball image upload
const ballImageInput = document.getElementById('ballImage');
ballImageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const img = new window.Image();
        img.onload = function() {
            ballImage = img;
            ballImageLoaded = true;
        };
        img.src = URL.createObjectURL(file);
    }
});

// Customization controls
const paddleColorInput = document.getElementById('paddleColor');
paddleColorInput.addEventListener('input', function(e) {
    paddleColor = e.target.value;
});
const ballColorInput = document.getElementById('ballColor');
ballColorInput.addEventListener('input', function(e) {
    ballColor = e.target.value;
});
const paddleSpeedInput = document.getElementById('paddleSpeed');
paddleSpeedInput.addEventListener('input', function(e) {
    paddleSpeed = parseInt(e.target.value, 10);
});
const ballSpeedInput = document.getElementById('ballSpeed');
ballSpeedInput.addEventListener('input', function(e) {
    ballSpeed = parseInt(e.target.value, 10);
    // Update ball direction to keep speed consistent
    ballDX = ballSpeed * Math.sign(ballDX || 1);
    ballDY = ballSpeed * Math.sign(ballDY || -1);
});

// Game Over popup
const gameOverPopup = document.getElementById('gameOverPopup');
const finalScoreSpan = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click', function() {
    isGameOver = false;
    score = 0;
    document.getElementById('score').textContent = 'Score: 0';
    gameOverPopup.style.display = 'none';
    resetPositions();
    requestAnimationFrame(draw);
});

function showGameOver() {
    isGameOver = true;
    finalScoreSpan.textContent = score;
    gameOverPopup.style.display = 'flex';
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    if (ballImage && ballImageLoaded) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(ballImage, ballX - ballRadius, ballY - ballRadius, ballRadius * 2, ballRadius * 2);
        ctx.restore();
    } else {
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = ballColor;
        ctx.fill();
        ctx.closePath();
    }
}

function draw() {
    if (isGameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();

    // Ball movement
    ballX += ballDX;
    ballY += ballDY;

    // Wall collision (left/right)
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballDX = -ballDX;
    }
    // Wall collision (top)
    if (ballY - ballRadius < 0) {
        ballDY = -ballDY;
    }
    // Paddle collision
    if (
        ballY + ballRadius > paddleY &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth &&
        ballDY > 0
    ) {
        ballDY = -ballDY;
        ballY = paddleY - ballRadius; // Prevent sticking
        score++;
        document.getElementById('score').textContent = 'Score: ' + score;
    }
    // Bottom collision (missed paddle)
    if (ballY + ballRadius > canvas.height) {
        showGameOver();
        return;
    }

    // Paddle movement
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }

    requestAnimationFrame(draw);
}

draw(); 