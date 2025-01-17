const FPS = 60;
let lines = [];
let oscillator;
let soundDelay = 10; // in terms of iterations
let oscFreq = 200;

let sortingI = false;
let sortingJ = false;
let sortButton;
let i = 0;
let j = 0;
let minIndex;
let diselectAll = false;

function setup() {
  createCanvas(600, 500);

  oscillator = new p5.Oscillator();
  oscillator.amp(0);
  oscillator.start();

  seedArray(10);
  frameRate(FPS);
  sortButton = createButton("Sort");
  sortButton.mousePressed(sortArray);
  noLoop();
}

function draw() {
  background(color("#393E41"));
  lines.forEach((lin) => {
    if (diselectAll) {
      lin.diselectJ();
    }

    lin.display();
  });

  if (sortingI) {
    getAudioContext()
      .resume()
      .then(() => {
        oscillator.freq((oscFreq += 10));
        oscillator.amp(1, 0.05);
      });

    i++;
    next();
  }

  if (sortingJ) {
    if (j % soundDelay === 0) {
      oscillator.amp(0);
    }

    j++;
    updateLine();
  }

  if (i >= lines.length - 1) {
    console.log("SOLVED");
    oscillator.amp(0, 0);
    oscillator.stop();
    noLoop();
  }
}

function next() {
  sortingI = false;
  if (i >= 1 && i <= lines.length) {
    lines[i - 1].diselectI();
    redraw();
  }

  lines[i].selectI();
  redraw();

  if (i < lines.length - 1) {
    minIndex = i;
    j = i + 1;
    updateLine();
  }
}

function updateLine() {
  if (j < lines.length) {
    sortingJ = true;
    diselectAll = false;
    lines[j].selectJ();
    redraw();
    if (lines[j].y > lines[minIndex].y) {
      minIndex = j;
    }
  } else {
    const oldMinY = lines[i].y;
    lines[i].update(lines[minIndex].y);
    lines[minIndex].update(oldMinY);
    sortingI = true;
    sortingJ = false;
    diselectAll = true;
    redraw();
  }
}

function seedArray(step) {
  let orderedHeights = [];
  for (let i = 0; i < width - step * 2; i += step) {
    orderedHeights.push(height - i);
  }
  shuffle(orderedHeights, true);

  for (let i = 0; i < width - step * 2; i += step) {
    lines.push(new Line(i + step, orderedHeights.pop(), step));
  }
}

function seedRandomArray(step) {
  //let initialHeight = width / step;
  for (let i = 0; i < width - step * 2; i += step) {
    lines.push(new Line(i + step, random(step, height - step * 2), step)); //Random Heights
    //lines.push(new Line(i + step, initialHeight, step));
    //initialHeight += step;
  }
}

function sortArray() {
  next();
  loop();
}
