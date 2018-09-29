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

function showCardSymbol() {
    var symbol = this.memorySymbol
    this.getElementsByTagName("i")[0].setAttribute("class", symbol);
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
    for (var i = 0; i < numberOfSymbols * 2; i++) {
        listOfCards[i].memorySymbol = cardClassesInOrder[i];
        listOfCards[i].addEventListener("click", showCardSymbol);
    }
}

initializeGame();
