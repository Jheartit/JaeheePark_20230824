let px, py;  
let pd = 30;
let dx = [100, 200, 300, 400, 500];
let dy = [150, 250, 100, 300, 200];
let dSize = 15;
let dActive = [true, true, true, true, true];
let score = 0;

// 벽 설정
let wx = 200, wy = 150, ww = 50, wh = 100; // 기존 벽
let lwx = 480, lwy = 0, lww = 10, lwh = 400; // 라인 벽
let lwSpeed = 2; // 빨간 벽의 이동 속도dlklk

function setup() {
  createCanvas(600, 400);
  px = width / 2;
  py = height / 2;
}

function draw() {
  background(30);

  // 점수 표시jjlojo
  fill(255);
  textSize(20);
  text("점수: " + score, 20, 25);

  // 이동 처리
  if (keyIsDown(LEFT_ARROW)) movePlayer(px - 3, py);
  if (keyIsDown(RIGHT_ARROW)) movePlayer(px + 3, py);
  if (keyIsDown(UP_ARROW)) movePlayer(px, py - 3);
  if (keyIsDown(DOWN_ARROW)) movePlayer(px, py + 3);

  // 빨간 벽 움직이기
  lwx += lwSpeed;
  if (lwx <= 400 || lwx + lww >= 550) {
    lwSpeed *= -1; // 벽이 화면 끝에 닿으면 방향 반전
  }
  // 벽 그리기
  fill(255, 0, 0); rect(lwx, lwy, lww, lwh); // 빨간 라인 벽

  // 팩맨 그리기 (입 애니메이션)
  fill(255, 255, 0);
  noStroke();
  if (keyIsPressed) {
    // 키를 누르면 다묾
    arc(px, py, pd, pd, 0, 2 * PI);
  } else {
    // 키를 안 누르면 벌림
    arc(px, py, pd, pd, PI / 4, 1.75 * PI);
  }

  // 먹이 처리
  for (let i = 0; i < 5; i++) {
    if (dActive[i]) {
      fill(255, 100, 100);
      ellipse(dx[i], dy[i], dSize);
      if (dist(px, py, dx[i], dy[i]) < (pd/2 + dSize/2)) {
        dActive[i] = false;
        score++;
      }
    }
  }
}

function movePlayer(nx, ny) {
  let r = pd / 2;
  
  // 1. 회색 벽 충돌
  let inGrayWall = (nx + r > wx && nx - r < wx + ww && ny + r > wy && ny - r < wy + wh);
  
  // 2. 실시간 빨간 벽 충돌 (현재 벽의 위치 lwx 기준)
  // 팩맨의 오른쪽 끝(nx + r)이 움직이는 빨간 벽(lwx)을 넘지 못하게 함
  let hitRedWall = (nx + r > lwx);

  // 3. 캔버스 경계
  let inCanvas = (nx > r && nx < width - r && ny > r && ny < height - r);

  // 빨간 벽에 부딪히지 않고, 회색 벽도 아니고, 캔버스 안일 때만 이동
  if (!hitRedWall && !inGrayWall && inCanvas) {
    px = nx;
    py = ny;
  }
}