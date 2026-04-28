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
}
