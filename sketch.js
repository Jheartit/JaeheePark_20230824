// 1=벽, 0=길(콩), 2=워프통로, 3=유령집(콩없음)

const MAP_TEMPLATE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const COLS = MAP_TEMPLATE[0].length;
const ROWS = MAP_TEMPLATE.length;
const TILE = 20;
const SPEED = 4;
const MAP_X = 194; // 맵 좌측 오프셋 
const MAP_Y = 28;  // 맵 상단 오프셋 
const CANVAS_W = 1608; // 전체 캔버스 가로 
const CANVAS_H = 916;  // 전체 캔버스 세로 

const CHAR_SIZE = TILE * 1;  // 팩맨, 유령 크기 
const DOT_SIZE = TILE * 0.7;  // 콩 크기 
const DOT_STEP = 7;           // 콩 간격

let dots = [], pac, ghosts = [];
let score = 0, energy = 3;
let state = 'PLAY';
let restartT = 0, flashT = 0;
let keyDown = false;
let nextGhostScore = 100; // 유령 추가 소환 기준 점수


// 벽 판별
function isWall(c, r) {
  if (r < 0 || r >= ROWS) return true;
  if (c < 0 || c >= COLS) return MAP_TEMPLATE[r][0] !== 2; // 워프행만 통과
  return MAP_TEMPLATE[r][c] === 1 || MAP_TEMPLATE[r][c] === 3;
}

// 팩맨
function makePac() {
  // 시작
  let sc = 2, sr = 2;
  outer: for (let dr = 0; dr < ROWS; dr++) {
    for (let dc = 0; dc < COLS; dc++) {
      let r = min(ROWS - 1, max(0, sr + dr)), c = min(COLS - 1, max(0, sc + dc));
      if (MAP_TEMPLATE[r][c] === 0) { sc = c; sr = r; break outer; }
    }
  }
  return {
    col: sc, row: sr,
    x: MAP_X + sc * TILE + TILE / 2, y: MAP_Y + sr * TILE + TILE / 2,
    dx: 0, dy: 0, lastDx: 1, lastDy: 0, mouth: 0.05, mouthDir: 1
  };
}

function updatePac(p) {
  if (p.dx === 0 && p.dy === 0) return;
  let lx = p.x - MAP_X, ly = p.y - MAP_Y;
  let onCX = (lx - TILE / 2) % TILE === 0;
  let onCY = (ly - TILE / 2) % TILE === 0;
  if (onCX && onCY) {
    let c = (lx - TILE / 2) / TILE, r = (ly - TILE / 2) / TILE;
    if (isWall(c + p.dx, r + p.dy)) { p.dx = 0; p.dy = 0; return; }
  }
  p.x += p.dx * SPEED; p.y += p.dy * SPEED;
  p.col = floor((p.x - MAP_X) / TILE);
  p.row = floor((p.y - MAP_Y) / TILE);

  if (MAP_TEMPLATE[p.row] && MAP_TEMPLATE[p.row][0] === 2) {
    if (p.x < MAP_X) { p.x = MAP_X + COLS * TILE - TILE / 2; p.col = COLS - 1; }
    if (p.x >= MAP_X + COLS * TILE) { p.x = MAP_X + TILE / 2; p.col = 0; }
  }
  // 입 애니메이션
  if (keyDown) {
    p.mouth += 0.04 * p.mouthDir;
    if (p.mouth >= 0.35) p.mouthDir = -1;
    if (p.mouth <= 0.02) p.mouthDir = 1;
  } else {
    p.mouth = 0;
  }
  // 콩 먹기
  for (let i = dots.length - 1; i >= 0; i--) {
    let dx = MAP_X + dots[i].c * TILE + TILE / 2 - p.x;
    let dy = MAP_Y + dots[i].r * TILE + TILE / 2 - p.y;
    if (sqrt(dx * dx + dy * dy) < TILE * 1.2) { dots.splice(i, 1); score += 10; break; }
  }
}

function drawPac(p) {
  push(); translate(p.x, p.y);
  let a = (p.lastDx === -1) ? PI : (p.lastDy === 1) ? HALF_PI : (p.lastDy === -1) ? -HALF_PI : 0;
  rotate(a); noStroke();
  let r = TILE * 0.42;
  fill(255, 220, 0);
  arc(0, 0, CHAR_SIZE, CHAR_SIZE, p.mouth * PI, TWO_PI - p.mouth * PI, PIE);
  fill(0); ellipse(CHAR_SIZE * 0.18, -CHAR_SIZE * 0.2, CHAR_SIZE * 0.12, CHAR_SIZE * 0.12);
  pop();
}

// 적 (유령)
const GC = [[255, 30, 30], [255, 180, 255], [0, 200, 255], [255, 165, 0], [100, 255, 120]];
function makeGhost(i) {
  let g = { idx: i, dx: 1, dy: 0, inv: 90, col: 0, row: 0, x: 0, y: 0 };
  spawnGhost(g); return g;
}

function spawnGhost(g) {
  let houseCells = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (MAP_TEMPLATE[r][c] === 3) houseCells.push({ c, r });

  let occupied = ghosts.filter(og => og !== g).map(og => og.col + ',' + og.row);
  let free = houseCells.filter(cell => !occupied.includes(cell.c + ',' + cell.r));
  let pool = free.length > 0 ? free : houseCells;

  if (pool.length === 0) pool = [{ c: floor(COLS / 2), r: floor(ROWS / 2) }];
  let cell = random(pool);

  g.col = cell.c; g.row = cell.r;
  g.x = MAP_X + cell.c * TILE + TILE / 2;
  g.y = MAP_Y + cell.r * TILE + TILE / 2;
  g.inv = 90;
}

function updateGhost(g) {
  if (g.inv > 0) g.inv--;
  let onCenterX = (g.x - TILE / 2) % TILE === 0;
  let onCenterY = (g.y - TILE / 2) % TILE === 0;

  if (onCenterX && onCenterY) {
    let c = (g.x - TILE / 2) / TILE;
    let r = (g.y - TILE / 2) / TILE;
    let dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
    let ok = dirs.filter(d => !isWallGhost(c + d.x, r + d.y));
    let nr = ok.filter(d => !(d.x === -g.dx && d.y === -g.dy));
    let pick = random(nr.length > 0 ? nr : ok);
    if (pick) { g.dx = pick.x; g.dy = pick.y; }
  }

  g.x += g.dx * SPEED;
  g.y += g.dy * SPEED;
  g.col = floor(g.x / TILE);
  g.row = floor(g.y / TILE);

  if (MAP_TEMPLATE[g.row] && MAP_TEMPLATE[g.row][0] === 2) {
    if (g.x < MAP_X) { g.x = MAP_X + COLS * TILE - TILE / 2; g.col = COLS - 1; }
    if (g.x >= MAP_X + COLS * TILE) { g.x = MAP_X + TILE / 2; g.col = 0; }
  }
}

function drawGhost(g) {
  let [r, gr, b] = GC[g.idx % 5];
  let al = g.inv > 0 ? lerp(60, 255, (90 - g.inv) / 90) : 255;
  push(); translate(g.x, g.y); noStroke();
  let s = CHAR_SIZE;
  fill(r, gr, b, al); arc(0, 0, s, s, PI, TWO_PI); rect(-s / 2, 0, s, s * 0.5);
  beginShape(); vertex(-s / 2, s * 0.48);

  for (let i = 0; i <= 3; i++) vertex(-s / 2 + (s / 3) * i, i % 2 === 0 ? s * 0.58 : s * 0.46);
  vertex(s / 2, s * 0.48);
  endShape(CLOSE);
  fill(255, 255, 255, al);
  ellipse(-s * 0.2, s * 0.05, s * 0.28, s * 0.34);
  ellipse(s * 0.2, s * 0.05, s * 0.28, s * 0.34);
  fill(0, 0, 180, al);
  ellipse(-s * 0.14, s * 0.08, s * 0.13, s * 0.2);
  ellipse(s * 0.26, s * 0.08, s * 0.13, s * 0.2);
  pop();
}

// 메인

function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  frameRate(60);
  initGame();
}

function initGame() {
  dots = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (MAP_TEMPLATE[r][c] === 0 && r % DOT_STEP === 0 && c % DOT_STEP === 0) dots.push({ c, r });
  pac = makePac(); ghosts = [];
  for (let i = 0; i < 5; i++) ghosts.push(makeGhost(i));
  score = 0; energy = 3; state = 'PLAY'; restartT = 0; flashT = 0; keyDown = false;
  nextGhostScore = 100;
}

// 맵 그리기
function drawMap() {
  background(0);
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let x = MAP_X + c * TILE, y = MAP_Y + r * TILE;
      let t = MAP_TEMPLATE[r][c];
      if (t === 1) {
        fill(0); noStroke(); rect(x, y, TILE, TILE);
        stroke(0, 200, 255); strokeWeight(1.5); noFill();
        if (r > 0 && MAP_TEMPLATE[r - 1][c] !== 1) line(x, y, x + TILE, y);
        if (r < ROWS - 1 && MAP_TEMPLATE[r + 1][c] !== 1) line(x, y + TILE, x + TILE, y + TILE);
        if (c > 0 && MAP_TEMPLATE[r][c - 1] !== 1) line(x, y, x, y + TILE);
        if (c < COLS - 1 && MAP_TEMPLATE[r][c + 1] !== 1) line(x + TILE, y, x + TILE, y + TILE);
      } else if (t === 3) {
        fill(5, 5, 40); noStroke(); rect(x, y, TILE, TILE);
      } else {
        fill(0); noStroke(); rect(x, y, TILE, TILE);
      }
    }
  }
  noStroke();
}

function draw() {
  if (state === 'PLAY') {
    updatePac(pac);
    for (let g of ghosts) {
      updateGhost(g);
      if (g.inv > 0) continue;
      if (dist(pac.x, pac.y, g.x, g.y) < TILE * 0.7) {
        energy--; flashT = 60; spawnGhost(g);
        if (energy <= 0) { state = 'LOSE'; restartT = 0; }
      }
    }
    if (flashT > 0) flashT--;
    if (dots.length === 0) { state = 'WIN'; restartT = 0; }
    while (score >= nextGhostScore) {
      ghosts.push(makeGhost(ghosts.length));
      nextGhostScore += 100;
    }
  }

  drawMap();
  if (flashT > 0 && flashT % 10 < 5) { fill(255, 0, 0, 55); noStroke(); rect(MAP_X, MAP_Y, COLS * TILE, ROWS * TILE); }

  // 콩
  noStroke();
  for (let d of dots) {
    fill(255, 210, 150);
    ellipse(MAP_X + d.c * TILE + TILE / 2, MAP_Y + d.r * TILE + TILE / 2, DOT_SIZE, DOT_SIZE);
  }

  drawPac(pac);
  for (let g of ghosts) drawGhost(g);

  // UI 바
  let uy = MAP_Y + ROWS * TILE + 8;
  fill(5, 5, 25); noStroke(); rect(0, MAP_Y + ROWS * TILE, CANVAS_W, 50);
  stroke(0, 180, 255, 120); strokeWeight(1); line(0, MAP_Y + ROWS * TILE, CANVAS_W, MAP_Y + ROWS * TILE); noStroke();
  fill(255, 200, 0); textFont('monospace'); textSize(20); textAlign(LEFT, CENTER);
  text('SCORE ' + nf(score, 5), 10, uy + 20);

  for (let i = 0; i < 3; i++) {
    fill(i < energy ? color(255, 60, 100) : color(50, 50, 70));
    push(); translate(COLS * TILE - 14 - i * 22, uy + 20); noStroke();
    beginShape();
    vertex(0, 7); bezierVertex(-1, 2, -10, -2, -5, -8);
    bezierVertex(-1, -14, 0, -8, 0, -5);
    bezierVertex(0, -8, 1, -14, 5, -8);
    bezierVertex(10, -2, 1, 2, 0, 7);
    endShape(CLOSE); pop();
  }

  fill(0, 200, 255); textAlign(CENTER, CENTER); textSize(20);
  text('먹이 ' + dots.length, COLS * TILE / 2, uy + 20);

  // 오버레이
  if (state !== 'PLAY') {
    fill(0, 0, 0, 170); noStroke(); rect(0, 0, COLS * TILE, ROWS * TILE + 40);
    let c1 = state === 'WIN' ? color(0, 255, 190) : color(255, 55, 55);
    let bw = 260, bh = 106, bx = (COLS * TILE - bw) / 2, by = (ROWS * TILE - bh) / 2;
    fill(4, 8, 38, 235); stroke(c1); strokeWeight(2); rect(bx, by, bw, bh, 8);
    noStroke(); fill(c1); textFont('monospace'); textSize(24); textAlign(CENTER, CENTER);
    text(state === 'WIN' ? 'YOU WIN!' : 'GAME OVER', COLS * TILE / 2, by + 32);
    fill(210, 210, 255); textSize(13); text('SCORE ' + nf(score, 5), COLS * TILE / 2, by + 60);
    fill(100, 140, 255); textSize(10);
    text('Restart in ' + max(0, ceil((180 - restartT) / 60)) + 's  |  ENTER to skip', COLS * TILE / 2, by + 88);
    restartT++;
    if (restartT > 180) initGame();
  }
}

function keyPressed() {
  if (state !== 'PLAY') { if (keyCode === ENTER || key === 'r' || key === 'R') initGame(); return; }
  keyDown = true;

  let nx = 0, ny = 0;
  if (keyCode === UP_ARROW) { nx = 0; ny = -1; }
  if (keyCode === DOWN_ARROW) { nx = 0; ny = 1; }
  if (keyCode === LEFT_ARROW) { nx = -1; ny = 0; }
  if (keyCode === RIGHT_ARROW) { nx = 1; ny = 0; }
  if (nx === 0 && ny === 0) return;

  // 현재 타일 중앙으로 스냅한 뒤 방향 적용
  pac.x = MAP_X + pac.col * TILE + TILE / 2;
  pac.y = MAP_Y + pac.row * TILE + TILE / 2;

  // 다음 칸이 벽이 아닐 때만 방향 변경
  if (!isWall(pac.col + nx, pac.row + ny)) {
    pac.dx = nx; pac.dy = ny;
    pac.lastDx = nx; pac.lastDy = ny;
  }
}

function keyReleased() {
  keyDown = false;
  pac.dx = 0; pac.dy = 0;
}