let sigma = 0.1;
let mu = 1;

class Point {
  constructor(x = random(), y = random(), randomized = true) {
    this.randomized = randomized;
    this.x = x;
    this.y = y;
    this.bigX = randomized ? 5 + this.x * width - 5 : x;
    this.bigY = randomized ? 4 + this.y * height - 5 : y;
  }

  display = function (step = 0) {
    //noFill();
    stroke("white");
    strokeWeight(3);
    //triangle(
    //this.bigX,
    //this.bigY - 5,
    //this.bigX - 5,
    //this.bigY,
    //this.bigX + 5,
    //this.bigY
    //);
    //circle(this.bigX, this.bigY, 5);
    point(this.bigX + step, this.bigY + step);
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
    this.bigX = map(newX, -mu, mu, 20, width - 20);
    this.bigY = map(newY, -mu, mu, 20, height - 20);
  };

  updatePolar = function () {
    let tempX = this.x;
    let tempY = this.x;
    if (!this.randomized) {
      tempX = map(this.x, 5, width - 5, -1, 1);
      tempY = map(this.y, 5, height - 5, -1, 1);
    }
    let r = pow(tempX, 2) + pow(tempY, 2);
    if (r === 0 || r > 1) {
      this.bigX = 0;
      this.bigY = 0;
    } else {
      let newX = sigma * tempX * sqrt((-2 * log(r)) / r) + mu;
      let newY = sigma * tempY * sqrt((-2 * log(r)) / r) + mu;
      this.bigX = map(newX, 0, 2, 5, width - 5);
      this.bigY = map(newY, 0, 2, 5, height - 5);
    }
  };

  static updateVariations() {
    sigma += 0.1;
    if (sigma >= width / 100) {
      sigma = 0;
    }
  }
}
