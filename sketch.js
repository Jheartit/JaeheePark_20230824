// 1=벽, 0=길(콩), 2=워프통로, 3=유령집(콩없음)

const MAP_TEMPLATE = [
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], // 0
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], // 3
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
  [0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0], // 5
  [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1], // 6
  [2, 0, 0, 0, 0, 0, 0, 1, 0, 3, 3, 3, 0, 1, 0, 0, 0, 0, 0, 0, 2], // 7 워프행
  [1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1], // 8
  [0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0], // 9
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], // 11
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0], // 12
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 13
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], // 14
];

const COLS = MAP_TEMPLATE[0].length; // 21
const ROWS = MAP_TEMPLATE.length;    // 15
const TILE = 40;
const SPEED = 2;

let mapImg;
let dots = [], pac, ghosts = [];
let score = 0, energy = 3;
let state = 'PLAY'; 
let restartT = 0, flashT = 0;
let keyDown = false;

// 벽 판별
function isWall(c, r) {
    if (r < 0 || r >= ROWS) return true;
    if (c < 0 || c >= COLS) return MAP_TEMPLATE[r][0] !== 2; // 워프행만 통과
    return MAP_TEMPLATE[r][c] === 1 || MAP_TEMPLATE[r][c] === 3;
}

// 팩맨
function makePac() {
    return {
        col:10, row:10, x:10*TILE+TILE/2, y:10*TILE+TILE/2, dx:0, dy:0, mouth:0.3 };
}

function updatePac(p) {
  // 키를 누르고 있을 때만 이동
  if (p.dx === 0 && p.dy === 0) return;
 
  // 타일 중앙 도달 여부: 픽셀이 TILE 단위의 중간(TILE/2)에 정확히 있을 때
  let onCenterX = (p.x - TILE/2) % TILE === 0;
  let onCenterY = (p.y - TILE/2) % TILE === 0;
 
  if (onCenterX && onCenterY) {
    let c = (p.x - TILE/2) / TILE;
    let r = (p.y - TILE/2) / TILE;
    // 다음 칸이 벽이면 멈춤
    if (isWall(c + p.dx, r + p.dy)) {
      p.dx = 0; p.dy = 0;
      return;
    }
}
 
  p.x += p.dx * SPEED;
  p.y += p.dy * SPEED;
  p.col = floor(p.x / TILE);
  p.row = floor(p.y / TILE);
 
  // 워프
  if (p.x < 0)            { p.x = COLS*TILE - TILE/2; p.col = COLS-1; }
  if (p.x >= COLS * TILE) { p.x = TILE/2;             p.col = 0; }
 
  // 입 애니메이션: 키 누를 때 닫힘, 뗄 때 열림
  if (keyDown) p.mouth = max(0.02, p.mouth - 0.06);
  else         p.mouth = min(0.35, p.mouth + 0.06);
 
  // 콩 먹기
  for (let i = dots.length - 1; i >= 0; i--) {
    if (dots[i].c === p.col && dots[i].r === p.row) {
      dots.splice(i, 1); score += 10; break;
    }
  }
}

function drawPac(p) {
    push(); translate(p.x, p.y);
    let a = (p.dx===-1)?PI : (p.dy===1)?HALF_PI : (p.dy===-1)?-HALF_PI : 0;
    rotate(a); noStroke();
    let r = TILE * 0.42;
    fill(255,220,0);    
    arc(0, 0, r*2, r*2, p.mouth*PI, TWO_PI - p.mouth*PI, PIE);
    fill(0);
    ellipse(r*0.3, -r*0.4, r*0.25, r*0.25);
    pop();
}

// 적 (유령)
const GC = [[255,30,30], [255,180,255], [0,200,255], [255,165,0], [100,255,120]];
function makeGhost(i) {
    let g = {idx:i, dx:1, dy:0, inv:90, col:0, row:0, x:0, y:0};
    spawnGhost(g); return g;
}

function spawnGhost(g) {
    for (let t=0; t<300; t++) {
    let c = floor(random(1,COLS-1)), r=floor(random(1,ROWS-1));
    if (!isWall(c,r) && dist(c,r,pac?pac.col:10,pac?pac.row:11)>5) {
      g.col=c; g.row=r; g.x=c*TILE+TILE/2; g.y=r*TILE+TILE/2; g.inv=90; return;
    }
  }
  g.col=1; g.row=1; g.x=TILE+TILE/2; g.y=TILE+TILE/2; g.inv=90;
}

function updateGhost(g) {
    if (g.inv>0) g.inv--;
    let cx=g.col*TILE+TILE/2, cy=g.row*TILE+TILE/2;

    if (g.x === cx && g.y === cy) {
        g.x=cx; g.y=cy;
        let dirs = [{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}];
        let ok = dirs.filter(d => !isWall(g.col + d.x, g.row + d.y));
        let nr   = ok.filter(d => !(d.x === -g.dx && d.y === -g.dy));
        let pick = random(nr.length > 0 ? nr : ok);
        if(pick){g.dx = pick.x; g.dy = pick.y;}
    }
    g.x += g.dx * SPEED;
    g.y += g.dy * SPEED;
    g.col = floor(g.x / TILE);
    g.row = floor(g.y / TILE);
 
    if (g.x < 0)            { g.x = COLS*TILE - SPEED; g.col = COLS-1; }
    if (g.x >= COLS * TILE) { g.x = SPEED;             g.col = 0; }
}

function drawGhost(g) {
  let [r,gr,b]=GC[g.idx%5];
  let al=g.inv>0?lerp(60,255,(90-g.inv)/90):255;
  push(); translate(g.x,g.y); noStroke();
  let s = TILE * 0.82;
  fill(r,gr,b,al);     arc(0,0,s,s,PI,TWO_PI);     rect(-s/2,0,s,s*0.5);
  beginShape(); vertex(-s/2,s*0.48);

  for (let i = 0; i <= 3; i++) vertex(-s/2 + (s/3)*i, i%2===0 ? s*0.58 : s*0.46);
  vertex(s/2, s*0.48);
  endShape(CLOSE);
  fill(255, 255, 255, al);
  ellipse(-s*0.2, s*0.05, s*0.28, s*0.34);
  ellipse( s*0.2, s*0.05, s*0.28, s*0.34);
  fill(0, 0, 180, al);
  ellipse(-s*0.14, s*0.08, s*0.13, s*0.2);
  ellipse( s*0.26, s*0.08, s*0.13, s*0.2);
  pop();
}

// 메인
function preload() {
    mapImg = loadImage('Map.png');
}

function setup() {
    createCanvas(COLS*TILE, ROWS*TILE+40);
    frameRate(60);
    initGame();
}

function initGame() {
    dots = [];
    for(let r=0; r<ROWS; r++)
        for(let c=0; c<COLS; c++)
             if (MAP_TEMPLATE[r][c] === 0) dots.push({c, r});
    pac = makePac();
    ghosts = []; 
    for (let i=0;i<5;i++) ghosts.push(makeGhost(i));
    score=0; energy=3; state='PLAY'; restartT=0; flashT=0;
}

function draw() {
    background(0);
    if(state==='PLAY') {
        updatePac(pac);
        for(let g of ghosts) {
            updateGhost(g);
            if (g.inv>0) continue;
            if(dist(pac.x,pac.y,g.x,g.y)<TILE*0.7) {
                energy--; flashT=60; spawnGhost(g);
                if (energy<=0) { state='LOSE'; restartT=0; }
            }
        }
        if(flashT>0) flashT--;
        if(dots.length===0) { state='WIN'; restartT=0; }
    }

   // 맵 이미지
  image(mapImg, 0,0, COLS*TILE, ROWS*TILE);
  if(flashT>0 && flashT%10<5){fill(255,0,0,55);noStroke();rect(0,0,COLS*TILE,ROWS*TILE);}

  // 콩
  noStroke();
  for(let d of dots){
    let x=d.c*TILE+TILE/2, y=d.r*TILE+TILE/2;
    fill(255,210,150);    ellipse(x,y,TILE*0.15,TILE*0.15);
  }
 
  drawPac(pac);
  for(let g of ghosts) drawGhost(g);

  // UI 바
    let uy = ROWS*TILE;
  fill(5,5,25); noStroke(); rect(0,ROWS*TILE,COLS*TILE,40);
  stroke(0,180,255,120); strokeWeight(1); line(0,ROWS*TILE,COLS*TILE,ROWS*TILE); noStroke();
  fill(255,200,0); textFont('monospace'); textSize(14); textAlign(LEFT,CENTER);
  text('SCORE '+nf(score,5), 10, uy+20);

  for(let i=0;i<3;i++){
    fill(i<energy ? color(255,60,100) : color(50,50,70));
    push(); translate(COLS*TILE-14-i*22, uy+20); noStroke();
    beginShape();
    vertex(0,7); bezierVertex(-1,2,-10,-2,-5,-8);
    bezierVertex(-1,-14,0,-8,0,-5);
    bezierVertex(0,-8,1,-14,5,-8);
    bezierVertex(10,-2,1,2,0,7);
    endShape(CLOSE); pop();
  }

  fill(0,200,255); textAlign(CENTER,CENTER); textSize(11);
  text('DOTS '+dots.length, COLS*TILE/2, uy+20);

  // 오버레이
  if(state!=='PLAY'){
    fill(0,0,0,170); noStroke(); rect(0,0,COLS*TILE,ROWS*TILE+40);
    let c1 = state === 'WIN' ? color(0,255,190):color(255,55,55);
    let bw=260, bh=106, bx=(COLS*TILE-bw)/2, by=(ROWS*TILE-bh)/2;
    fill(4,8,38,235); stroke(c1); strokeWeight(2); rect(bx,by,bw,bh,8);
    noStroke(); fill(c1); textFont('monospace'); textSize(24); textAlign(CENTER,CENTER);
    text(state==='WIN'?'YOU WIN!':'GAME OVER', COLS*TILE/2, by+32);
    fill(210,210,255); textSize(13); text('SCORE '+nf(score,5), COLS*TILE/2, by+60);
    fill(100,140,255); textSize(10);
    text('Restart in '+max(0,ceil((180-restartT)/60))+'s  |  ENTER to skip', COLS*TILE/2, by+88);
    restartT++;
    if(restartT>180) initGame();
  }
}

function keyPressed() {
    if(state!=='PLAY') { if(keyCode===ENTER || key==='r' || key==='R') initGame(); return; }
    keyDown = true;
    if(keyCode===UP_ARROW) { pac.ndx=0; pac.ndy=-1; }
    if(keyCode===DOWN_ARROW) { pac.ndx=0; pac.ndy=1; }
    if(keyCode===LEFT_ARROW) { pac.ndx=-1; pac.ndy=0; }
    if(keyCode===RIGHT_ARROW) { pac.ndx=1; pac.ndy=0; }
}

function keyReleased() {
    keyDown = false;
    pac.dx = 0; pac.dy = 0;
    pac.ndx = 0; pac.ndy = 0;
}