const TOTAL_TURNS = 20

let order = []
let playerOrder = []
let flash
let turn
let good
let compTurn
let intervalId
let noise = true
let win = true

const topLeft = document.querySelector("#topleft")
const topRight = document.querySelector("#topright")
const bottomLeft = document.querySelector("#bottomleft")
const bottomRight = document.querySelector("#bottomright")
const startButton = document.querySelector("#start")
const turnDiv = document.querySelector('#turn')

startButton.addEventListener('click', (event) => {
  if (win) {
    startButton.style.opacity = 0
    play()
  }
});

function play() {
  win = false
  order = []
  playerOrder = []
  flash = 0
  intervalId = 0
  turn = 1
  good = true
  turnDiv.innerHTML = turn

  for (var i = 0; i < TOTAL_TURNS; i++) {
    order.push(Math.floor(Math.random() * 4) + 1)
  }
  compTurn = true

  intervalId = setInterval(gameTurn, 800)
}

function gameTurn() {
  if (flash == turn) {
    clearInterval(intervalId)
    compTurn = false
    clearColor()
  }

  if (compTurn) {
    clearColor()
    setTimeout(() => {
      if (order[flash] == 1) one()
      if (order[flash] == 2) two()
      if (order[flash] == 3) three()
      if (order[flash] == 4) four()
      flash++
    }, 200)
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1")
    audio.play()
  }
  noise = true
  topLeft.classList.add('dino_moving')
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2")
    audio.play()
  }
  noise = true;
  topRight.classList.add('dino_moving')
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3")
    audio.play();
  }
  noise = true;
  bottomLeft.classList.add('dino_moving')
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4")
    audio.play()
  }
  noise = true;
  bottomRight.classList.add('dino_moving')
}

function clearColor() {
  topLeft.classList.remove('dino_moving')
  topRight.classList.remove('dino_moving')
  bottomLeft.classList.remove('dino_moving')
  bottomRight.classList.remove('dino_moving')
}

function flashColor() {
    topLeft.classList.add('dino_moving')
    topRight.classList.add('dino_moving')
    bottomLeft.classList.add('dino_moving')
    bottomRight.classList.add('dino_moving')
}

topLeft.addEventListener('click', (event) => {
    if(!compTurn){
        playerOrder.push(1)
        check()
        one()
        if(!win) {
          setTimeout(() => {
            clearColor()
          }, 300)
        }
    }
})

topRight.addEventListener('click', (event) => {
    if(!compTurn){
        playerOrder.push(2)
        check()
        two()
        if(!win) {
          setTimeout(() => {
            clearColor()
          }, 300)
        }
    }
})

bottomLeft.addEventListener('click', (event) => {
    if(!compTurn){
        playerOrder.push(3)
        check()
        three()
        if(!win) {
          setTimeout(() => {
            clearColor()
          }, 300)
        }
    }
})

bottomRight.addEventListener('click', (event) => {
    if(!compTurn){
        playerOrder.push(4)
        check()
        four()
        if(!win) {
          setTimeout(() => {
            clearColor()
          }, 300)
        }
    }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false

  if (playerOrder.length == TOTAL_TURNS && good) {
    winGame()
  }

  if (good == false) {
    flashColor()
    setTimeout(() => {
      clearColor()

        compTurn = true
        flash = 0
        playerOrder = []
        good = true
        intervalId = setInterval(gameTurn, 800);
    }, 800)

    noise = false
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    turnDiv.innerHTML = turn
    playerOrder = []
    compTurn = true
    flash = 0
    intervalId = setInterval(gameTurn, 800)
  }

}

function winGame() {
  flashColor()
  win = true
  startButton.style.opacity = 1
}