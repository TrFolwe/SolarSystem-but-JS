const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const EARTH_RADIUS = 12;
const EARTH_COUNT = 8;
const EARTHS = ["Mercure","Venus","Terre","Mars","Jupiter","Saturne","Uranus","Neptune"];
const EARTHS_DATA = [];

canvas.width = 960;
canvas.height = 614;

setInterval(() => document.querySelector("p").style.color = `#${Math.floor(Math.random()*16777215).toString(16)}`, 300);

drawLines();
drawSun();


function drawLines() {
  let radius = 50;
  for(let i = 0; i < EARTH_COUNT; i++) {
    radius+=30;
  circleS(canvas.width/2, canvas.height/2, radius, "white");
}
}

function drawSun() {
  circleF(canvas.width/2, canvas.height/2, 50, "#f39f18");//Sun
}

function drawEart(earts) {
  earts.forEach(i => circleF(i.x, i.y, EARTH_RADIUS, i.color));
}


function earthRender() {
  EARTHS_DATA.forEach(i => i.render())
}

function circleS(x,y,radius,color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.arc(x,y,radius,0,Math.PI*2);
  ctx.stroke();
  ctx.closePath();
}

function circleF(x,y,radius,color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
}

const degToRad = deg => Math.PI/180*deg;

function randomAngle() {
  const angle = [0, 45, 90, 120, 160, 200,180,  240, 280, 320, 360].map(i => degToRad(i));
  return angle[Math.floor(Math.random() * angle.length)];
}

const startX = canvas.width/2;
const startY = canvas.height/2;
let radius = 0;
let speed = 1;

class Earth {
  constructor(name, radian) {
    this.name = name;
    this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    this.radius = randomAngle();
    this.radian = radian;
    this.speed = 1;
    this.x = 0;
    this.y = 0;
    this.RADIUS = EARTH_RADIUS;
    this.mode = true;
    this.scaleMode = false;
  }

  render() {
    if(this.scaleMode) {
    if(this.RADIUS >= 25 || this.RADIUS <= 10) this.mode = !this.mode;
    if(this.mode) this.RADIUS += 0.2;
    else if(!this.mode) this.RADIUS -= 0.2;
  }
    this.radius += Math.PI/180*this.speed;
    this.x = -Math.cos(this.radius)*this.radian+startX;
    this.y = -Math.sin(this.radius)*this.radian+startY;
    circleF(this.x, this.y, this.scaleMode ? this.RADIUS : EARTH_RADIUS, this.color);
    ctx.fillStyle = "white";
    ctx.font = "30px serif"
    ctx.fillText(this.name, this.x, this.y);
  }
}

//earties add
(() => {
  let rad = 80;
    EARTHS.forEach(i => {
      EARTHS_DATA.push(new Earth(i, rad));
      rad += 30;
    });
  console.log(EARTHS_DATA.map(i => i.name));
})();

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  earthRender();
  drawLines();
  drawSun();
  requestAnimationFrame(render);
}
render();
