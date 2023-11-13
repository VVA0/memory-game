const cards = document.querySelectorAll(".card");
const find = document.querySelector(".find");
const timeLeft = document.querySelector(".timer");
let cardOne;
let cardTwo;
let matchedCard = 0;
let disable = false;

function setTimer() {
  let timer = 60;
  let timeOut = setInterval(function () {
    timer--;
    timeLeft.innerHTML = timer;
    if (timer <= 0) {
      clearInterval(timeOut);
      alert("Время вышло!");
      shuffleCards();
    }
  }, 1000);
}
shuffleCards();

cards.forEach(function (elem) {
  elem.addEventListener("click", flipCard);
});
function flipCard(event) {
  let card = event.target; //! Это элемент на котором произошло событие клика
  if (card !== cardOne && !disable) {
    card.classList.add("flip"); //! тут я проверяю повторное нажатие карточки
    if (!cardOne) {
      return (cardOne = card); //! первый клик, заношу в cardOne
    }
    cardTwo = card;
    disable = true;
    let cardOneImg = cardOne.querySelector("img").src; //! Заношу ссылку на изображение первой карточки
    let cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 == img2) {
    matchedCard++;
    find.innerHTML = matchedCard;
    if (matchedCard == 8) {
      alert("Вы победили!");
      shuffleCards();
    }
    cardOne.removeEventListener("click", flipCard); //! Удалем обработчик события (чтобы клик не работал по карточке)
    cardTwo.removeEventListener("click", flipCard);
    cardOne = "";
    cardTwo = "";
    return (disable = false); //! Включаем доску
  }
  setTimeout(function () {
    cardOne.classList.add("shake"); //! тут происходит тряска карточек
    cardTwo.classList.add("shake");
  }, 400);
  setTimeout(function () {
    //! Этот код отвечает за ошибочный выбор
    cardOne.classList.remove("flip", "shake");
    cardTwo.classList.remove("flip", "shake");
    cardOne = "";
    cardTwo = "";
    disable = false;
  }, 1200);
}

function shuffleCards() {
  matchedCard = 0;
  find.innerHTML = 0;
  cardOne = "";
  cardTwo = "";
  disable = false;
  setTimer();
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(function () {
    //! Стандартаня функция, которая позволяет перемешать массив
    if (Math.random() > 0.5) {
      return 1;
    } else {
      return -1;
    }
  });
  cards.forEach((element, index) => {
    element.classList.remove("flip");
    let img = element.querySelector("img");
    img.src = `./image/img-${arr[index]}.png`; //! Тут я добавляю рандомную ссылку на изображение
    element.addEventListener("click", flipCard);
  });
}
