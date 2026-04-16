function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // 1. 벽 그리기
  stroke(255, 0, 0);
  strokeWeight(4);
  line(wallX, 0, wallX, height);

  // 2. 이동 로직 (벽 체크 포함)
  if (keyIsDown(RIGHT_ARROW)) {
    noStroke();
    fill(255, 255, 0);
    ellipse(x, y, 50, 50);
    // 다음 이동할 위치(x + 5)가 벽(wallX)보다 작을 때만 이동!
    if (x + 25 < wallX) {
      x += 5;
    }
  }
 
  if (keyIsDown(LEFT_ARROW)) {
    noStroke();
    fill(255, 255, 0);
    ellipse(x, y, 50, 50);
    x -= 5;
  }

  // 3. 플레이어 그리기~~
  noStroke();
  fill(255, 255, 0);
  arc(x, y, 50, 50, PI/4, 1.7*PI);
}
