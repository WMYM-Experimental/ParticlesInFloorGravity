const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

//const colorArray = ["#ffb703", "#f77f00", "#fca311", "#fcbf49"];

const colorArray = [
  "#9139B4",
  "#FE3E6D",
  "#DA6D73",
  "#DCB687",
  "#42A6D8",
  "#9b111e",
];
let gravity = 1;
let friction = 0.88;

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor(colorsArray) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

function getDistance(x1, y1, x2, y2) {
  const xDististance = x2 - x1;
  const yDististance = y2 - y1;

  return Math.hypot(xDististance, yDististance);
}

class Particle {
  constructor(x, y, directionX, directionY, radius, color) {
    this.x = x;
    this.y = y;
    this.directionY = directionY;
    this.directionX = directionX;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    if (this.y + this.directionY + this.radius > canvas.height || this.y < 0) {
      this.directionY = -this.directionY * friction;
    } else {
      this.directionY += gravity;
    }
    if (
      this.x + this.directionX + this.radius > canvas.width ||
      this.x - this.radius <= 0
    ) {
      this.directionX = -this.directionX * friction;
    }
    this.y += this.directionY;
    this.x += this.directionX;
    this.draw();
  }
}

// Implementation
let P;
let particlesArray;
function init() {
  particlesArray = [];
  //P = new Particle(canvas.width / 2, canvas.height / 2, 2, 30, "#fca311");
  console.log(P);
  for (let i = 0; i < 200; i++) {
    let radius = getRandomInt(5, 50);
    let x = getRandomInt(20, canvas.width - radius);
    let y = getRandomInt(0, canvas.height - radius);
    let directionX = getRandomInt(-2, 2);
    let directionY = getRandomInt(-2, 2);
    particlesArray.push(
      new Particle(
        x,
        y,
        directionX,
        directionY,
        radius,
        getRandomColor(colorArray)
      )
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height); //refresh canvas
  particlesArray.forEach((ptcl) => {
    ptcl.update();
  });
}

init();
animate();
