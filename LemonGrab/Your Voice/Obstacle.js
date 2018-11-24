  function Obstacle() {
      this.top = 200;

      this.x = width;

      this.w = random(100, 150);
      this.speed = 5;
      this.highlight = false;

      //Collision function prototype
      this.hits = function(bubble) {
          if (bubble.y > height - this.top) {
              if (bubble.x < this.x + this.w && bubble.x > this.x - 100) {
                  return true;
              }
          }
          return false;
      }

      this.show = function() {
          fill(255);
          rect(this.x, height - this.top, this.w, this.top);
      }

      this.update = function() {
          this.x -= this.speed;
      }

      this.offscreen = function() {
          if (this.x < -this.w) {
              this.highlight = true;
              return true;
          } else {
              return false;
          }
      }


  }