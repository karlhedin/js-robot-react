// Rectangle
export function Rectangle(width, height) {
  this.width = width;
  this.height = height;
};
Rectangle.prototype.contains = function (x, y) {
  return x >= 0 && x <= this.width && y >= 0 && y <= this.height;
};

// Circle
export function Circle(radius) {
  this.radius = radius;
};
Circle.prototype.contains = function (x, y) {
  return Math.sqrt((x * x) + (y * y)) < this.radius;
};

// Model
export function Model(room, startX, startY) {
  this.room = room === undefined ? new Rectangle(5, 5) : room;
  this.startX = startX === undefined ? 1 : startX;
  this.startY = startY === undefined ? 2 : startY;
  this.currentX = this.startX;
  this.currentY = this.startY;
  this.currentDirectionIndex = 0;
}
Model.prototype.getRobotPosition = function () {
  var directions = ['N', 'E', 'S', 'W'];
  return this.currentX + ' ' + this.currentY + ' ' + directions[this.currentDirectionIndex];
};
// -1 = left
// 1 = right
Model.prototype.rotate = function (direction) {
  // Wraps around the array indices
  this.currentDirectionIndex = (this.currentDirectionIndex + direction + 4) % 4;
};
Model.prototype.getNewPoint = function () {
  var newPoint;

  // eslint-disable-next-line
  switch (this.currentDirectionIndex) {
    case 0: // N
      newPoint = { x: this.currentX, y: this.currentY - 1 };
      break;
    case 1: // E
      newPoint = { x: this.currentX + 1, y: this.currentY };
      break;
    case 2: // S
      newPoint = { x: this.currentX, y: this.currentY + 1 };
      break;
    case 3: // W
      newPoint = { x: this.currentX - 1, y: this.currentY };
      break;
  }

  return newPoint;
};
Model.prototype.forward = function () {
  var newPoint = Model.prototype.getNewPoint.call(this);
  if (this.room.contains(newPoint.x, newPoint.y)) {
    this.currentX = newPoint.x;
    this.currentY = newPoint.y;
  }
};
Model.prototype.performCommands = function (comandString) {
  for (var i = 0, len = comandString.length; i < len; i++) {
    var charU = comandString.charAt(i).toUpperCase();
    if (charU === 'L' || charU === 'V') {
      Model.prototype.rotate.call(this, -1);
    } else if (charU === 'R' || charU === 'H') {
      Model.prototype.rotate.call(this, 1);
    } else if (charU === 'F' || charU === 'G') {
      Model.prototype.forward.call(this);
    }
  }
  var newPosition = Model.prototype.getRobotPosition.call(this);
  // Reset position to start
  this.currentDirectionIndex = 0;
  this.currentX = this.startX;
  this.currentY = this.startY;
  return newPosition;
};
