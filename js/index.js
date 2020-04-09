window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  // Getting the canvas from html page
  let ctx = document.getElementById("canvas").getContext("2d");
  // For ending the game
  let runningGame = true;
  // Create car object
  let car = {
    x: 220,
    y: 600,
    width: 50,
    height: 100,
    img: new Image(),
    rightPressed: function () {
      if (this.x < 450 - this.width) {
        this.x += 40;
      }
    },
    leftPressed: function () {
      if (this.x >= 50) {
        this.x -= 40;
      }
    },
    upPressed: function () {
      if (this.y < 700 - this.width) {
        this.y -= 40;
      }
    },

    update: function () {
      this.img.src = "images/car.png";
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    },
    left: function () {
      return this.x;
    },
    top: function () {
      console.log("car top", this.y);
      return this.y;
    },
    right: function () {
      return this.x + this.width;
    },
    bottom: function () {
      return this.y + this.height;
    },
    crash: function (obstacle) {
      return !(
        this.bottom() < obstacle.top() ||
        this.top() > obstacle.bottom() ||
        this.right() < obstacle.left() ||
        this.left() > obstacle.right()
      );
    }
  };
  // Create obstacles
  class Obstacle {
    constructor(posX, width) {
      this.x = posX;
      this.y = 0;
      this.width = width;
      this.height = 50;
      this.speedY = 2;
    }
    update() {
      ctx.fillRect(this.x, this.y, this.width, this.height);

      this.y += this.speedY;
    }
    top() {
      return this.y;
    }
    left() {
      return this.x;
    }
    bottom() {
      return this.y + this.height;
    }
    right() {
      return this.x + this.width;
    }
  }

  let counter = 0;
  let obstaclesArr = [];

  let draw = () => {
    if (!runningGame) {
      return;
    }
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    counter++;
    // drawing road image
    let roadImg = new Image();
    roadImg.src = "images/road.png";
    ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
    // creat obstacles
    obstaclesArr.forEach(e => {
      if (car.crash(e)) {
        runningGame = false;
      }
      e.update();
    });
    car.update();

    if (counter % 120 === 0) {
      let randomPox = Math.floor(Math.random() * (200 - 50) + 50);
      let randomWidth = Math.floor(Math.random() * (300 - 100) + 100);
      if (randomPox + randomWidth <= 450) {
        obstaclesArr.push(new Obstacle(randomPox, randomWidth));
      }
    }

    window.requestAnimationFrame(draw);
  };
  // Function for moving car right and left
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
        car.leftPressed();
        break;
      case 39:
        car.rightPressed();
        break;
      case 38:
        car.upPressed();
        break;
    }
  };
  // document.onkeydown = function (e) {
  //   if (e.keyCode === 'ArrowRight') {
  //     car.leftPressed();

  //   }
  //   if (e.keyCode === ' ArrowLeft') {
  //     car.rightPressed();

  //   }
  // };
  // start game function
  function startGame() {
    draw();
  }
};