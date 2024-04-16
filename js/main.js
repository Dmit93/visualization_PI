const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;
const scale = setScale(canvas); // Масштаб для увеличения размера комплексных чисел
const radius = 0;
let theta = 0;


/**
 * Calculates the scale for resizing complex numbers based on the canvas width.
 * 
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @returns {number} The scale value.
 */
function setScale(canvas) {
    const canvasWidth = canvas.width;
    const scale = canvasWidth / 4;
    return scale;
}

function draw() {
    //ctx.clearRect(0, 0, width, height);

    // Рассчитываем координаты для z(θ) = e^(iθ) + e^(iπθ)
    const x1 = Math.cos(theta);
    const y1 = Math.sin(theta);
    const x2 = Math.cos(Math.PI * theta);
    const y2 = Math.sin(Math.PI * theta);

    // Перемещаем начало координат в центр канваса
    ctx.translate(centerX, centerY);

    // Рисуем первую точку
    ctx.beginPath();
    ctx.arc(x1 * scale, y1 * scale, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();

    // Рисуем вторую точку
    ctx.beginPath();
    ctx.arc(x2 * scale, y2 * scale, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    const gradient = ctx.createLinearGradient(x1 * scale, y1 * scale, x2, y2);
    // gradient.addColorStop(0, 'green');
    gradient.addColorStop(0, 'rgba(0, 128, 0, 0.2)'); // Зеленый
    gradient.addColorStop(0.33, 'rgba(255, 255, 0, 0.2)'); // Желтый 
    gradient.addColorStop(0.66, 'rgba(255, 0, 0, 0.2)'); // Красный 
    gradient.addColorStop(1, 'rgba(255, 165, 0, 0.2)');


    ctx.beginPath();
    ctx.moveTo(x1 * scale, y1 * scale);
    ctx.lineTo(x2 * scale, y2 * scale);
    ctx.strokeStyle = gradient;
    ctx.stroke();

    // Возвращаем начало координат обратно
    ctx.translate(-centerX, -centerY);

    // Увеличиваем угол
    theta += 0.01;


    requestAnimationFrame(draw);
}

draw();