const FPS = 30;
const points = [];
let animation = false;
let animToggleButton;
let orderStep = 5;

function setup() {
  noLoop();
  createCanvas(500, 500);
  frameRate(FPS);
  animToggleButton = createButton("Animation Toggle");
  animToggleButton.position(20, height + 20);
  animToggleButton.mousePressed(toggleLooping);
  //seedArrayRandom(1000);
  seedArrayOrder(orderStep);
}

function draw() {
  background(0);
  points.forEach((p) => {
    p.display();
    //p.display(random(0, 5));
    //p.display(-100);
    //p.display(200);
    //p.display(-200);
  });
  if (animation) {
    updatePoints();
    Point.updateVariations();
  }
}

function updatePoints() {
  points.forEach((p) => {
    //p.update();
    p.updatePolar();
  });
}

function seedArrayRandom(max) {
  for (let i = 0; i < max; i++) {
    points.push(new Point());
  }
}

function seedArrayOrder(step) {
  for (let i = step; i < width; i += step) {
    for (let j = step; j < height; j += step) {
      points.push(new Point(i, j, false));
    }
  }
}

function toggleLooping() {
  if (isLooping()) {
    noLoop();
    animation = false;
  } else {
    updatePoints();
    animation = true;
    loop();
    redraw();
  }
}
