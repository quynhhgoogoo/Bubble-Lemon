function GoodThings(x, yVel, s, c) {
    this.pos = createVector(x, 0); //stop position
    this.yVel = yVel;

    this.size = 100;
    this.color = c;
}

GoodThings.prototype.update = function() {
    this.pos.y += this.yVel;
};

GoodThings.prototype.isClicked = function(x, y) {
    var xM = this.pos.x + this.size;
    var yM = this.pos.y + this.size;

    return !(x < this.pos.x || x > xM || y < this.pos.y || y > yM);
};

GoodThings.prototype.draw = function() {
    image(imgGoodThings, this.pos.x, this.pos.y);
};