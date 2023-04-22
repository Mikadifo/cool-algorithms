class Line {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.xSelected = false;
    this.ySelected = false;
  }

  display = function () {
    fill(this.xSelected ? color("#00FF00") : color("#F6F7EB"));
    stroke(this.ySelected ? "red" : "#393E41");
    strokeWeight(this.size / 10);
    rect(this.x, this.y, this.size, 500 - this.y);
  };

  update = function (y) {
    this.y = y;
  };

  selectI = function () {
    this.xSelected = true;
    this.ySelected = false;
  };

  diselectI = function () {
    this.xSelected = false;
    this.ySelected = false;
  };

  selectJ = function () {
    this.ySelected = true;
  };

  diselectJ = function () {
    this.ySelected = false;
  };
}
