let sigma = 0.4;
let from = -1;
let to = 1;

class Point {
  constructor(x = random(), y = random(), randomized = true) {
    this.randomized = randomized;
    this.x = x;
    this.y = y;
    this.bigX = randomized ? 5 + this.x * width - 5 : x;
    this.bigY = randomized ? 4 + this.y * height - 5 : y;
  }

  display = function (step = 0) {
    noFill();
    stroke("white");
    strokeWeight(1);
    circle(this.bigX, this.bigY, 5);
    //point(this.bigX + step, this.bigY + step);
  };

  update = function () {
    let tempX = this.x;
    let tempY = this.x;
    if (!this.randomized) {
      tempX = map(this.x, 20, width - 20, 0, 1);
      tempY = map(this.y, 20, height - 20, 0, 1);
    }
    let r = sqrt(-2 * log(tempX));
    let theta = 2 * PI * tempY;
    let newX = sigma * r * cos(theta);
    let newY = sigma * r * sin(theta);
    this.bigX = map(newX, from, to, 20, width - 20);
    this.bigY = map(newY, from, to, 20, height - 20);
  };

  static updateVariations() {
    sigma += 0.1;
    if (sigma >= 0.2 + width / 100) {
      sigma = 0;
    }
  }
}
