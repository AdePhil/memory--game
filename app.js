const board = document.querySelector(".grid");
const result = document.querySelector(".result");
const predictionDom = document.querySelector(".prediction");
const stat = document.querySelector(".stat");
const timeLeft = document.querySelector(".time-left");
const time = document.querySelector(".time");

let currentTime = timeLeft.textContent;
let score = 0;
let predictions = 0;
let cardsChosen = [];
const cardsArray = [
  {
    img: "images/cheeseburger.png",
    name: "cheeseburger",
  },
  {
    img: "images/cheeseburger.png",
    name: "cheeseburger",
  },
  {
    img: "images/fries.png",
    name: "fries",
  },
  {
    img: "images/fries.png",
    name: "fries",
  },
  {
    img: "images/hotdog.png",
    name: "hotdog",
  },
  {
    img: "images/hotdog.png",
    name: "hotdog",
  },
  {
    img: "images/ice-cream.png",
    name: "ice-cream",
  },
  {
    img: "images/ice-cream.png",
    name: "ice-cream",
  },
  {
    img: "images/milkshake.png",
    name: "milkshake",
  },
  {
    img: "images/milkshake.png",
    name: "milkshake",
  },
  {
    img: "images/pizza.png",
    name: "pizza",
  },
  {
    img: "images/pizza.png",
    name: "pizza",
  },
];

cardsArray.sort(() => 0.5 - Math.random());
let interval = null;
function startGame() {
  initializeBoard();
  interval = setInterval(countDown, 1000);
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;
  if (currentTime === 0) {
    clearInterval(interval);
    time.innerHTML = "";
    defaultBoard();
  }
}
function initializeBoard() {
  cardsArray.forEach((card, i) => {
    const image = document.createElement("img");
    image.setAttribute("src", card.img);
    image.setAttribute("data-id", i);
    board.appendChild(image);
  });
}

function defaultBoard() {
  board.querySelectorAll("img").forEach((image, i) => {
    image.src = "images/blank.png";
    image.addEventListener("click", flipCard);
  });
}

function flipCard() {
  const id = this.dataset.id;
  const src = cardsArray[id]["img"];
  this.src = src;
  cardsChosen.push({ id, name: cardsArray[id].name });
  if (cardsChosen.length === 2) {
    setTimeout(() => {
      checkResult();
    }, 500);
  }
}

function checkResult() {
  const [image1, image2] = cardsChosen;

  let image1Dom = document.querySelector(`img[data-id='${image1.id}']`);
  let image2Dom = document.querySelector(`img[data-id='${image2.id}']`);

  predictions += 1;
  predictionDom.textContent = predictions;

  if (image1.name === image2.name) {
    image1Dom.src = "images/white.png";
    image2Dom.src = "images/white.png";
    score += 1;
    result.textContent = score;
    image1Dom.removeEventListener("click", flipCard);
    image2Dom.removeEventListener("click", flipCard);
  } else {
    image1Dom.src = "images/blank.png";
    image2Dom.src = "images/blank.png";
  }
  cardsChosen = [];
  if (score === cardsArray.length / 2) {
    const div = document.createElement("div");
    const retention = `<h3>Retention Rate: <span class="retention">${Math.round(
      (score / predictions) * 100.0
    )}%</span></h3>`;
    div.innerHTML = retention;
    stat.append(div);
  }
}

startGame();
