const TILE = 20, COLS = 28, ROWS = 31;
let mapImg, mapPx;
let dots = [], pac, ghosts = [];
let score = 0, energy = 3;
let state = 'PLAY'; 
let restartT = 0, flashT = 0;

// 벽 판별
function isWall(c, r) {
    if (c<0 || c >= COLS || r<0 || r >= ROWS) return true;
    if ( c === 0 || c === COLS-1) {
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
function spawnGhost(g) {
    for (let t=0; t<300; t++) {
    let c=floor(random(1,COLS-1)), r=floor(random(1,ROWS-1));
    if (!isWall(c,r) && dist(c,r,pac?pac.col:13,pac?pac.row:23)>7) {
      g.col=c; g.row=r; g.x=c*TILE+TILE/2; g.y=r*TILE+TILE/2;
      g.inv=90; return;
    }
  }
  g.col=1; g.row=1; g.x=TILE+TILE/2; g.y=TILE+TILE/2; g.inv=90;
}

function updateGhost(g) {
    if (g.inv>0) g.inv--;
    let cx=g.col*TILE+TILE/2, cy=g.row*TILE+TILE/2;
    if (abs(g.x-cx)<2 && abs(g.y-cy)<2) {
        g.x=cx; g.y=cy;
        let dirs=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}];
        let ok=dirs.filter(d=>!isWall(g.col+d.x,g.row+d.y));
        let norev=ok.filter(d=>!(d.x===-g.dx&&d.y===-g.dy));
        let pick=random(norev.length>0?norev:ok);
        if(pick){g.dx=pick.x;g.dy=pick.y;}
    }
    g.x+=g.dx*1.5; g.y+=g.dy*1.5;
    g.col=floor(g.x/TILE); g.row=floor(g.y/TILE);
    if(g.x<0){g.x=COLS*TILE-1;g.col=COLS-1;}
    if(g.x>=COLS*TILE){g.x=1;g.col=0;}
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

  // 콩
  noStroke();
  for(let d of dots){
    let x=d.c*TILE+TILE/2, y=d.r*TILE+TILE/2;
    fill(255,210,150,70); ellipse(x,y,9,9);
    fill(255,210,150);    ellipse(x,y,4,4);
  }
 
  drawPac(pac);
  for(let g of ghosts) drawGhost(g);

  // UI 바
  fill(5,5,25); noStroke(); rect(0,ROWS*TILE,COLS*TILE,40);
  stroke(0,180,255,120); strokeWeight(1); line(0,ROWS*TILE,COLS*TILE,ROWS*TILE); noStroke();
  fill(255,200,0); textFont('monospace'); textSize(14); textAlign(LEFT,CENTER);
  text('SCORE '+nf(score,5), 10, ROWS*TILE+20);

  for(let i=0;i<3;i++){
    fill(i<energy?color(255,60,100):color(50,50,70));
    let hx=COLS*TILE-14-i*20;
    push(); translate(hx,ROWS*TILE+20); noStroke();
    beginShape();
    vertex(0,6); bezierVertex(-1,2,-9,-1,-4,-7); bezierVertex(-1,-12,0,-7,0,-4);
    bezierVertex(0,-7,1,-12,4,-7); bezierVertex(9,-1,1,2,0,6);
    endShape(CLOSE); pop();
  }

  fill(0,200,255); textAlign(CENTER,CENTER); textSize(11);
  text('DOTS '+dots.length, COLS*TILE/2, ROWS*TILE+20);

  // 오버레이
  if(state!=='PLAY'){
    fill(0,0,0,170); noStroke(); rect(0,0,COLS*TILE,ROWS*TILE+40);
    let c1=state==='WIN'?color(0,255,190):color(255,55,55);
    let bw=260,bh=106,bx=(COLS*TILE-bw)/2,by=(ROWS*TILE-bh)/2;
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
    if(keyCode===UP_ARROW) { pac.ndx=0; pac.ndy=-1; }
    if(keyCode===DOWN_ARROW) { pac.ndx=0; pac.ndy=1; }
    if(keyCode===LEFT_ARROW) { pac.ndx=-1; pac.ndy=0; }
    if(keyCode===RIGHT_ARROW) { pac.ndx=1; pac.ndy=0; }
}