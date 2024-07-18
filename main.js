import './style.css'

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = 1200;
const height = 900;
canvas.width = width;
canvas.height = height;

const data = [
    {label: 'JavaScript', value: 20, color: '#f3f057'},
    {label: 'TypeScript', value: 40, color: '#245eaa'},
    {label: 'Node.js', value: 40, color: '#68a559'},
    {label: 'C#', value: 20, color: '#255117'},
    {label: 'Java', value: 10, color: '#713725'},
];
const total = data.reduce((acc, item) => acc + item.value, 0);

let currentAngle = 0.5;
const legendX = width * 0.75;
let legendY = 50;
const textSize = width * 0.02;
const lineHeight = textSize * 1.4;
ctx.globalCompositeOperation = 'source-over';
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, width, height);
ctx.fillStyle = 'black';
ctx.fillRect(legendX - 4, legendY - 4, width / 6, data.length * lineHeight);
const pieRadius = height * 0.3;
for (const {label, value, color} of data) {
    const angle = (value / total) * Math.PI * 2;

    ctx.save();

    // pie
    ctx.translate(width / 2, height / 2);
    ctx.rotate(currentAngle);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, pieRadius, 0, angle);
    ctx.fill();
    ctx.restore();

    // legend color
    ctx.fillStyle = color;
    ctx.fillRect(legendX, legendY, lineHeight / 1.6, lineHeight / 1.6);

    // legend label
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = `normal ${textSize}px sans-serif`;
    ctx.fillText(label, legendX + lineHeight * 0.8, legendY);

    legendY += lineHeight;
    currentAngle += angle;
}
