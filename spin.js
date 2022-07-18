const canvas = document.querySelector("canvas");
canvas.width = 960;
canvas.height = 614;
const ctx = canvas.getContext("2d");
const EARTH_RADIUS = 12;
let tur = 0;

setInterval(() => document.querySelector("p").style.color = `#${Math.floor(Math.random()*16777215).toString(16)}`, 300);

drawLines();
drawSun();


function drawLines() {
  let radius = 50;
  for(let i = 0; i < 8; i++) {
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

const startX = canvas.width/2;
const startY = canvas.height/2;
const RADIUS = 15;
let radius = 0;

const render = () => {
  radius += Math.PI/180;
  console.log(radius)
  if(radius%Math.PI*2 === 0) {
    tur++;
    console.log("1 Tur atıldı, toplam tur: "+tur);
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawEart([
  {
    name: "Mercure",
    x: Math.cos(radius)*80+startX,
    y: Math.sin(radius)*80+startY,
    color: "#ee6622"
  },
  {
    name: "Venus",
    x: Math.cos(radius)*110+startX,
    y: Math.sin(radius)*110+startY,
    color: "red"
  },
  {
    name: "Terre",
    x: Math.cos(radius)*140+startX,
    y: Math.sin(radius)*140+startY,
    color: "red"
  },
  {
    name: "Mars",
    x: Math.cos(radius)*170+startX,
    y: Math.sin(radius)*170+startY,
    color: "red"
  },
  {
    name: "Jupiter",
    x: Math.cos(radius)*200+startX,
    y: Math.sin(radius)*200+startY,
    color: "red"
  },
  {
    name: "Saturne",
    x: Math.cos(radius)*230+startX,
    y: Math.sin(radius)*230+startY,
    color: "red"
  },
  {
    name: "Uranus",
    x: Math.cos(radius)*260+startX,
    y: Math.sin(radius)*260+startY,
    color: "red"
  },
  {
    name: "Neptune",
    x: Math.cos(radius)*290+startX,
    y: Math.sin(radius)*290+startY,
    color: "red"
  }
]);
  drawLines();
  drawSun();
  requestAnimationFrame(render);
}
render();

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
  ctx.arc(x,y,radius,0,Math.PI*2);
  ctx.fill();
  ctx.closePath();
}