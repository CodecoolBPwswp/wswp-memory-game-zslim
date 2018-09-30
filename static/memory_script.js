function timer() {
    var timerElement = document.getElementById("timer");
    var timePassed = 0;
    setInterval(function () {
        timePassed++;
        timerElement.innerHTML =  Math.floor(timePassed / 60) + ":" + timePassed % 60;
    }, 1000)
}

function getNumberOfSymbols() {
    var game = document.getElementById("current-game");
    return Number(game.dataset.numberOfSymbols);
}

function getRandomElements(array, numberOfElements) {
    if (numberOfElements > array.length) {
        throw new Error("Required more elements than array length");
    } else {
        var listOfRandomElements = [];
        for (var i = 0; i < numberOfElements; i++) {
            var newRandomElement = array[Math.floor(Math.random() * array.length)];
            if (!listOfRandomElements.includes(newRandomElement)) {
                listOfRandomElements[i] = newRandomElement;
            } else {
                i--;
            }
        }
        return listOfRandomElements;
    }
}

function randomizeArray(arrayToRandomize) {
    var randomizedArray = [];
    var indecesUsed = [];
    for (var i = 0; i < arrayToRandomize.length; i++) {
        var randomIndex = Math.floor(Math.random() * arrayToRandomize.length);
        if (!indecesUsed.includes(randomIndex)) {
            randomizedArray[i] = arrayToRandomize[randomIndex];
            indecesUsed[i] = randomIndex;
        } else {
            i--;
        }
    }
    return randomizedArray;
}

function showCardSymbol(card) {
    var symbol = card.memorySymbol;
    card.getElementsByTagName("i")[0].setAttribute("class", symbol);
}

function getCardByStatus(status) {
    var allCards = document.getElementsByClassName("memory-card");
    var cardsWithStatus = [];
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].cardStatus === status) {
            cardsWithStatus.push(allCards[i]);
        }
    }
    return cardsWithStatus;
}

function coverCards(arrayOfActiveCards) {
    for (let i = 0; i < arrayOfActiveCards.length; i++) {
        arrayOfActiveCards[i].getElementsByTagName("i")[0].setAttribute("class", "fas fa-question-circle");
        arrayOfActiveCards[i].cardStatus = "covered";
    }
}

function win() {
    $("#win-modal").modal();
}

function reloadPage() {
    window.location.reload();
}

function goToIndex() {
    window.location.replace(window.location.origin);
}

function lookForPairs() {
    showCardSymbol(this);
    this.cardStatus = "active";
    var activeCards = getCardByStatus("active");
    var numberOfActiveCards = activeCards.length;
    const length_of_pair = 2;
    if (numberOfActiveCards === length_of_pair) {
        if (activeCards[0].memorySymbol === activeCards[1].memorySymbol) {
            for (let i = 0; i < length_of_pair; i++) {
                activeCards[i].cardStatus = "paired";
                activeCards[i].classList.add("paired");
                activeCards[i].removeEventListener("click", lookForPairs);
            }
        } else {
            setTimeout(coverCards.bind(null, activeCards), 800);
        }
    }
    var cardsLeft = getCardByStatus("covered").length;
    if (cardsLeft === 0) {
        setTimeout(win, 500);
    }
}

function initializeGame() {
    var listOfCardClasses = ["fas fa-brain",
                             "fas fa-bullhorn",
                             "fas fa-bicycle",
                             "fas fa-compass",
                             "fas fa-cocktail",
                             "fas fa-code-branch",
                             "fas fa-bed",
                             "fas fa-bowling-ball",
                             "fas fa-crow",
                             "fas fa-feather-alt",
                             "fas fa-gem",
                             "fas fa-kiwi-bird",
                             "fas fa-frog",
                             "fab fa-react",
                             "fas fa-crown",
                             "fas fa-coffee",
                             "fas fa-church",
                             "fas fa-chess",
                             "fas fa-mosque",
                             "fas fa-ankh"];
    var numberOfSymbols = getNumberOfSymbols();
    var symbolsInGame = getRandomElements(listOfCardClasses, numberOfSymbols);
    var cardClassesInOrder = randomizeArray(symbolsInGame.concat(symbolsInGame));
    var listOfCards = document.getElementsByClassName("memory-card");
    for (let i = 0; i < numberOfSymbols * 2; i++) {
        listOfCards[i].memorySymbol = cardClassesInOrder[i];
        listOfCards[i].cardStatus = "covered";
        listOfCards[i].addEventListener("click", lookForPairs);
    }
}


function main() {
    window.onload = timer();
    initializeGame();
}

main();
