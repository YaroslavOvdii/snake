document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelectorAll('.grid div');
  const scoreElement = document.getElementById('score');
  const width = 10;
  const snake = {
    head: 2,
    body: 1,
    tail: 0
  };
  let snakeMovment;
  let speed = 0.9;
  let intervalTime = 1000;
  let direction = 1;
  let appleId;
  let score = 0;
  const rightWall = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
  const topWall = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const leftWall = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  const bottomWall = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];


  function drawSnake(action) {
    for (let i in snake) {
      grid[snake[i]].classList[action]('snake');
    }
  }

  function endGame() {
    clearInterval(snakeMovment);

    drawSnake('add');
    alert('Game over!');
  }

  function snakeMove() {
    document.removeEventListener('click', snakeMove);

    snakeMovment = setInterval(() => {
      drawSnake('remove');
      
      snake.tail = snake.body;
      snake.body = snake.head;
      let hitRight = rightWall.indexOf(snake.head)
      let hitLeft = leftWall.indexOf(snake.head);
      let hitBottom = bottomWall.indexOf(snake.head);
      let hitTop = topWall.indexOf(snake.head);

      if (hitRight !== -1 && direction === 1) {
        return endGame();
        snake.head = leftWall[hitRight];
      } else if (hitLeft !== -1 && direction === -1) {
        return endGame();
        snake.head = rightWall[hitLeft];
      } else if (hitBottom !== -1 && direction === width) {
        return endGame();
        snake.head = topWall[hitBottom];
      } else if (hitTop !== -1 && direction === -width) {
        return endGame();
        snake.head = bottomWall[hitTop];
      } else {
        snake.head += direction;
      }

      drawSnake('add');
      impact();
    }, intervalTime);
  }

  function impact() {
    if (snake.head === appleId) {
      score++;
      intervalTime = intervalTime * speed;
      scoreElement.innerHTML = score;
      grid[appleId].classList.remove('apple');
      

      clearInterval(snakeMovment);
      setAppleRandomPosiotion();
      snakeMove();
    }
  }

  function keyListener (event) {
    const keyCode = event.keyCode;

    switch (keyCode) {
      case 40:
        if (direction === width || direction === -width) {
          return;
        }

        direction = width;
        break;
      case 38:
        if (direction === -width || direction === width) {
          return;
        }

        direction = -width;
        break;
      case 37:
        if (direction === -1 || direction === 1) {
          return;
        }

        direction = -1;
        break;
      case 39:
        if (direction === 1 || direction === -1) {
          return;
        }

        direction = 1;
        break;
      default:
        break;
    }
  }

  function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
  }

  function setAppleRandomPosiotion() {
    const cellsToSnake = 3;
    const randomIndex = randomInt(3, grid.length - 1);
    const beforeApple = (randomIndex - cellsToSnake) > -1 ? (randomIndex - cellsToSnake) : 0;
    const afterApple = (randomIndex + cellsToSnake) > grid.length ? grid.length - 1 : (randomIndex + cellsToSnake);

    if (!grid[randomIndex].classList.contains('snake')
      && !grid[beforeApple].classList.contains('snake')
      && !grid[afterApple].classList.contains('snake')) {

      grid[randomIndex].classList.add('apple');

      appleId = randomIndex;
      return;
    }

    setAppleRandomPosiotion();
  }

  drawSnake('add');
  setAppleRandomPosiotion();
  document.addEventListener('keydown', keyListener);
  document.addEventListener('click', snakeMove);
});