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
    
}