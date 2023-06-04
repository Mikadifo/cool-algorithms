function setup() {
  createCanvas(600, 600);
  background("black");
  stroke("white");
  noLoop();
}

function draw() {
  translate(width / 2, height);
  branch(150);
}

function branch(len) {
  line(0, 0, 0, -len);

  if (len > 4) {
    push();
    translate(0, -len);
    rotate(PI / 4);
    branch(len * 0.67);
    pop();

    push();
    translate(0, -len);
    rotate(-PI / 4);
    branch(len * 0.67);
    pop();
  }
}
