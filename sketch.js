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
    
}