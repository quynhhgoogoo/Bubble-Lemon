function Bubble(x, y, rad) {
    this.x = width / 16;
    this.y = height / 2;

    this.lift = -5;
    this.gravity = 1;
    this.velocity = 0;

    /*this.show = function() {
        fill('#ffa387');
        ellipse(this.x, this.y, 100);
    }*/

    this.up = function() {
        this.velocity += this.lift;
        this.x += 10;
    }

    this.update = function() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y > height - 100) {
            this.y = height - 100;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
        if (this.x > width - 100) {
            this.x = width - 100;
            this.velocity = 0;
        }
    }

    this.draw = function() {
        image(bubbleImg, this.x, this.y);
    }
}