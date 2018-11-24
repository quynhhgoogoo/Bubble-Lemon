function Block(x, yVel, s, c) {
    this.pos = createVector(x, 0); //stop position
    this.yVel = yVel;

    this.size = 100;
    this.color = c;
}

Block.prototype.update = function() {
    this.pos.y += this.yVel;
};

Block.prototype.isClicked = function(x, y) {
    var xM = this.pos.x + this.size;
    var yM = this.pos.y + this.size;

    return !(x < this.pos.x || x > xM || y < this.pos.y || y > yM);
};

Block.prototype.draw = function() {
    image(imgBadThings, this.pos.x, this.pos.y);
};