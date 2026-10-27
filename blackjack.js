
let cards = []
let sum = 0

// Une partie est-elle en cours ?
let isAlive = false

// Le joueur a-t-il gagné ?
let hasWon = false

// Mise actuelle
let bet = 0

// Target choisie
let target = 21


// ================================
// ELEMENTS HTML
// ================================

let nameInput =
    document.getElementById("name-input")

let chipsInput =
    document.getElementById("chips-input")

let betInput =
    document.getElementById("bet-input")

let targetInput =
    document.getElementById("target-input")


let messageEl =
    document.getElementById("message-el")

let sumEl =
    document.getElementById("sum-el")

let cardsEl =
    document.getElementById("cards-el")

let playerEl =
    document.getElementById("player-el")

let betEl =
    document.getElementById("bet-el")

let targetEl =
    document.getElementById("target-el")


// ================================
// JOUEUR
// ================================

// Au début, aucun joueur n'est créé
let player = null



// ================================
// CREER LE JOUEUR
// ================================

function createPlayer() {

    // Récupérer le nom
    let name =
        nameInput.value.trim()


    // Récupérer l'argent
    let chips =
        Number(chipsInput.value)


    // =========================
    // VERIFIER LE NOM
    // =========================

    if (name === "") {

        messageEl.textContent =
            "Please enter your name."

        return
    }


    // =========================
    // VERIFIER L'ARGENT
    // =========================

    if (chips <= 0) {

        messageEl.textContent =
            "Please enter a valid amount of money."

        return
    }


    // =========================
    // CREER LE JOUEUR
    // =========================

    player = {

        name: name,

        chips: chips
    }


    // Afficher le joueur
    playerEl.textContent =
        player.name + ": $" + player.chips


    // Message
    messageEl.textContent =
        "Player created! Choose your bet and target."


    // Afficher la target
    targetEl.textContent =
        "Target: " + target
}



// ================================
// GENERER UNE CARTE
// ================================

function getRandomCard() {

    // Générer un nombre entre 1 et 13
    let random =
        Math.floor(Math.random() * 13) + 1


    // As
    if (random === 1) {

        return 11
    }


    // Valet, Dame, Roi
    else if (random > 10) {

        return 10
    }


    // Cartes normales
    else {

        return random
    }
}



// ================================
// COMMENCER UNE PARTIE
// ================================

function startGame() {

    // =========================
    // VERIFIER LE JOUEUR
    // =========================

    if (player === null) {

        messageEl.textContent =
            "Please create your player first."

        return
    }


    // =========================
    // VERIFIER SI UNE PARTIE
    // EST DEJA EN COURS
    // =========================

    if (isAlive === true) {

        messageEl.textContent =
            "Finish the current game first."

        return
    }


    // =========================
    // RECUPERER LA MISE
    // =========================

    bet =
        Number(betInput.value)


    // =========================
    // RECUPERER LA TARGET
    // =========================

    target =
        Number(targetInput.value)


    // =========================
    // VERIFIER LA MISE
    // =========================

    if (bet <= 0) {

        messageEl.textContent =
            "Please enter a valid bet."

        return
    }


    // =========================
    // VERIFIER L'ARGENT
    // =========================

    if (bet > player.chips) {

        messageEl.textContent =
            "You don't have enough money for this bet."

        return
    }


    // =========================
    // VERIFIER LA TARGET
    // =========================

    if (target < 1 || target > 50) {

        messageEl.textContent =
            "Target must be between 1 and 50."

        return
    }


    // =========================
    // PREPARER LA PARTIE
    // =========================

    isAlive = true

    hasWon = false


    // Vider les anciennes cartes
    cards = []


    // Remettre la somme à zéro
    sum = 0


    // =========================
    // PAYER LA MISE
    // =========================

    player.chips -= bet


    // =========================
    // DONNER 2 CARTES
    // =========================

    let firstCard =
        getRandomCard()

    let secondCard =
        getRandomCard()


    cards = [
        firstCard,
        secondCard
    ]


    // Calculer la somme
    sum =
        firstCard + secondCard


    // =========================
    // AFFICHAGE
    // =========================

    playerEl.textContent =
        player.name + ": $" + player.chips


    betEl.textContent =
        "Bet: $" + bet


    targetEl.textContent =
        "Target: " + target


    // Afficher le jeu
    renderGame()
}



// ================================
// AFFICHER LE JEU
// ================================

function renderGame() {

    // Afficher les cartes
    cardsEl.textContent =
        "Cards: "


    for (
        let i = 0;
        i < cards.length;
        i++
    ) {

        cardsEl.textContent +=
            cards[i] + " "
    }


    // Afficher la somme
    sumEl.textContent =
        "Sum: " + sum


    // =========================
    // TARGET ATTEINTE
    // =========================

    if (sum === target) {

        hasWon = true

        isAlive = false


        messageEl.textContent =
            "Congratulations " +
            player.name +
            "! You reached " +
            target +
            "!"


        // Le joueur récupère sa mise
        // + le même montant en gain

        player.chips += bet * 2


        playerEl.textContent =
            player.name + ": $" + player.chips

    }


    // =========================
    // TARGET DEPASSEE
    // =========================

    else if (sum > target) {

        isAlive = false


        messageEl.textContent =
            "You went over " +
            target +
            ". You lose."


        playerEl.textContent =
            player.name + ": $" + player.chips

    }


    // =========================
    // LE JEU CONTINUE
    // =========================

    else {

        messageEl.textContent =
            "Take another card."
    }
}



// ================================
// NOUVELLE CARTE
// ================================

function newCard() {

    // Vérifier qu'un joueur existe
    if (player === null) {

        messageEl.textContent =
            "Please create your player first."

        return
    }


    // Vérifier qu'une partie est active
    if (isAlive === false) {

        messageEl.textContent =
            "Start a new game first."

        return
    }


    // Générer une carte
    let card =
        getRandomCard()


    // Ajouter la carte
    cards.push(card)


    // Ajouter sa valeur
    sum += card


    // Actualiser le jeu
    renderGame()
}