const TILE = 20, COLS = 28, ROWS = 31;
let mapImg, mapPx;
let dots = [], pac, ghosts = [];
let score = 0, energy = 3;
let state = 'PLAY'; 
let restartT = 0, flashT = 0;

// 벽 판별
function isWall(c, r) {
    if (c<0 || c >= COLS || r<0 || r >= ROWS) return true;
    if ( c === 0 || c === COLS-1 {
        if ( r ===10 || r === 13) return false;
        return true;
    }
    if (!mapPx) return false;
    let px = floor((c + 0.5) * (mapImg.width  / COLS));
    let py = floor((r + 0.5) * (mapImg.height / ROWS));
    let idx = 4 * (py * mapImg.width + px);
    let brightness = (mapPx[idx] + mapPx[idx+1] + mapPx[idx+2]) / 3;
    return brightness > 40; // 밝은 부분이 벽
}

// 팩맨
function makePac() {
    return {
        col:13, row:23, x:13*TILE+TILE/2, y:23*TILE+TILE/2, dx:0, dy:0, ndx:0, ndy:0, mouth:0.25, md:1 
    };
}

function updatePac(p) {
    let cx = p.col * TILE + TILE/2, cy = p.row * TILE + TILE/2;
    if (abs(p.x - cx) < 3 && abs(p.y - cy) < 3) {
        if (!isWall(p.col+p.ndx, p.row+p.ndy)) { p.dx = p.ndx; p.dy = p.ndy; }
        if (isWall(p.col+p.dx, p.row+p.dy)) { p.dx = 0; p.dy = 0; }
        p.x=cx; p.y=cy;
    }
    p.x += p.dx * 2; p.y += p.dy * 2;
    p.col = floor(p.x / TILE); p.row = floor(p.y / TILE);
    if (p.x<0){p.x=COLS*TILE-1; p.col=COLS-1;}
    if (p.x>=COLS*TILE){p.x=1; p.col=0;}

    if (p.dx || p.dy){ p.mouth+=0.05*p.md; if(p.mouth>0.35)p.md=-1; if(p.mouth<0.02)p.md=1;}

    // 콩 먹기
    for (let i=dots.length-1; i>=0; i--) {
        if (dots[i].c===p.col && dots[i].r===p.row) { dots.splice(i,1); score+=10; break;}
    }
}

function drawPac(p) {
    push(); translate(p.x, p.y);
    let a = (p.dx===-1)?PI : (p.dy===1)?HALF_PI : (p.dy===-1)?-HALF_PI : 0;
    rotate(a);
    noStroke();
    fill(255,220,0,60); arc(0,0,TILE+6,TILE+6, p.mouth*PI, TWO_PI-p.mouth*PI, PIE);
    fill(255,220,0);    arc(0,0,TILE-2,TILE-2, p.mouth*PI, TWO_PI-p.mouth*PI, PIE);
    fill(0); ellipse(3,-5,3,3);
    pop();
}

// 적 (유령)
const GCOLS = [[255,30,30], [255,180,255], [0,200,255], [255,165,0], [100,255,120]];
function makeGhost(c) {
    let g = { idx:1, dx:1, dy:0, inv:90};
    spawnGhost(g); return g;
}

function drawGhost(g) {
  let [r,gr,b]=GCOLS[g.idx%5];
  let al=g.inv>0?lerp(60,255,(90-g.inv)/90):255;
  push(); translate(g.x,g.y);
  let s=TILE-3; noStroke();
  fill(r,gr,b,al*0.25); arc(0,-1,s+6,s+6,PI,TWO_PI); rect(-s/2-3,-1,s+6,s*0.5+4);
  fill(r,gr,b,al);
  arc(0,-1,s,s,PI,TWO_PI); rect(-s/2,-1,s,s*0.5);
  beginShape();
  vertex(-s/2,s*0.45);
  for(let i=0;i<=3;i++){let wx=-s/2+(s/3)*i,wy=i%2===0?s*0.55:s*0.44;vertex(wx,wy);}
  vertex(s/2,s*0.45); endShape(CLOSE);
  fill(255,255,255,al); ellipse(-s*0.2,-2,s*0.3,s*0.35); ellipse(s*0.2,-2,s*0.3,s*0.35);
  fill(0,0,180,al);    ellipse(-s*0.14,0,s*0.15,s*0.2);  ellipse(s*0.26,0,s*0.15,s*0.2);
  pop();
}

function preload() {
    mapImg = loadImage('Map.png');
}

function setup() {
    createCanvas(COLS*TILE, ROWS*TILE+40);
    frameRate(60);
    mapImg.loadPixels();
    mapPx = mapImg.pixels;
    initGame();
}

function initGame() {
    dots = [];
    for(let r=0; r<ROWS; r++)
        for(let c=0; c<COLS; c++)
            if (!isWall(c,r)) dots.push({c,r});
    pac = makePac();
    ghosts = [];
    for(let i=0; i<5; i++)
        ghosts.push(makeGhost(i));
    score = 0; energy = 3; state='PLAY'; restartT=0; flashT=0;
}

function draw() {
    background(0);
    if(state==='PLAY') {
        updatePac(pac);
        for(let g of ghosts) {
            updateGhost(g);
            if (g.inv>0) continue;
            if(dist(pac.x,pac.y,g.x,g.y)<TILE*0.75) {
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
  