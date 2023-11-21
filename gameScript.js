// PLAYER NAME
const playerNameHeader = document.querySelector('#player-name-h');

// ENEMY INFO
const enemyName = document.querySelector('#enemy-name');
const enemyLevel = document.querySelector('#enemy-level');
const enemyClass = document.querySelector('#enemy-class');

// DISPLAYS AND WINDOWS
const gameMenu = document.querySelector('.game-menu');
const gameMenuDisplay = document.querySelector('.game-menu-display');
const enemyWindow = document.querySelector('.enemy-window');
const innerGameWindow = document.querySelector('.inner-game-window');

const textWindow = document.createElement('p');
textWindow.setAttribute('class', 'text-window');

// BUTTONS
const charSheetButton = document.querySelector('#char-sheet-button');
const equipmentButton = document.querySelector('#equipment-button');
const newGameButton = document.querySelector('#new-game-button');

    // BUTTON HUB NAV ELEMENTS
const hubNav = document.createElement('div');
hubNav.setAttribute('class', 'hub-nav-container');
const tavernButton = document.createElement('button');
const trainingPitButton = document.createElement('button');
const infirmaryButton = document.createElement('button');
const quartermasterButton = document.createElement('button');
const toNextFightButton = document.createElement('button');

tavernButton.textContent = 'Tavern';
trainingPitButton.textContent = 'Training Pit';
infirmaryButton.textContent = 'Infirmary';
quartermasterButton.textContent = 'Quartermaster';

toNextFightButton.textContent = 'To Next Fight!';
toNextFightButton.setAttribute('id', 'to-next-fight');

const backButton = document.createElement('button');
backButton.textContent = 'Go back to the arena';

// GLOBAL VARIABLES
let playerLevel = 1;
let gameState = 1; // This indicates the progress through the game. After each fight, the gamestate will be increased by 1. 
                   // At this point, training points will be refreshed to 3 and player money and experience assigned. The gamestate
                   // will also control various flavour texts and rare item drop chance.

// CHARACTER AND NPC CLASSES
let playerStats = {
    Health: 10,
    Strength: 5,
    Dexterity: 5,
    Defense: 5,
    Kills: 0
}

const fighterClasses = [
    {
        Class: 'Myrmidon',
        Level: 1,
        Health: 10,
        Strength: 7,
        Dexterity: 7,
        Defense: 7,
        Kills: 0
    },
    {
        Class: 'Barbarian',
        Level: 1,
        Health: 15,
        Strength: 10,
        Dexterity: 3,
        Defense: 3,
        Kills: 0
    },
    {
        Class: 'Hoplite',
        Level: 1,
        Health: 12,
        Strength: 5,
        Dexterity: 5,
        Defense: 10,
        Kills: 0
    }
];

// OBJECT CLASSES
class Enemy {
    name;
    fighterClass;
    level;
    stats;
    equipment;

    enemyStats = {
        Health: 10,
        Strength: 5,
        Dexterity: 5,
        Defense: 5
    }

    constructor(name, fighterClass, level, stats, equipment) {
        this.name = name; // Call randomName function using firstNames and lastNames as parameters!
        this.fighterClass = fighterClass; // call randomClass using fighterClasses as parameter!
        this.level = level; // Call calculateLevel function with playerLevel as parameter!
        this.stats = stats; // This will be provided by a level modifier to the fighterClass
        this.equipment = equipment; // Call generateEquipment (TODO)
    }

    calculateLevel(charLevel) {
        if (charLevel === 1) {
            return 1;
        } else if (1 < charLevel && charLevel <= 3) {
            return randomNumber(1, 3);
        } else if (3 < charLevel && charLevel <= 6) {
            return randomNumber(3, 6);
        } else if (6 < charLevel) {
            return randomNumber(6, 15);
        }    
    }

    displayOppStats(enemyStats) {
        const oppStatsList = document.createElement('div');
    
        for (const [stat, value] of Object.entries(enemyStats)) {
            const statLine = document.createElement('p');
            statLine.textContent = `${stat}: ${value}`;
            oppStatsList.appendChild(statLine);
        }
        
        enemyWindow.appendChild(oppStatsList);
    }
}

// NAMES
const firstNames = [
    "Lucius",
    "Marcus",
    "Titus",
    "Gaius",
    "Quintus",
    "Septimus",
    "Cassius",
    "Amulius",
    "Cornelius",
    "Felix",
    "Valerius",
    "Marcellus",
    "Publius",
    "Gallio",
    "Caius",
    "Fabius",
    "Aulus",
    "Horatius",
    "Tiberius",
    "Flavius",
    "Vitruvius",
    "Gnaeus",
    "Decius",
    "Kaeso",
    "Manius",
    "Spurius"
];

const lastNames = [
    "Tullius",
    "Flavius",
    "Plinius",
    "Valerius",
    "Cassius",
    "Gabinnius",
    "Vitruvius",
    "Cosconius",
    "Marcellus",
    "Dillius",
    "Crispus",
    "Nerva",
    "Aelianus",
    "Corvinus",
    "Quirinus",
    "Capitolinus",
    "Tribonianus",
    "Priscianus",
    "Severus",
    "Marianus",
    "Plautus",
    "Viator",
    "Papus",
    "Licinianus",
    "Julius",
    "Drusus"
];

// GAME FLOW --------->
gameMenu.classList.toggle('hidden');
enemyWindow.classList.toggle('hidden');
innerGameWindow.style.border = 'none';

newGameButton.addEventListener('click', newGame);
tavernButton.addEventListener('click', displayTavern);
trainingPitButton.addEventListener('click', displayTrainingPit);
infirmaryButton.addEventListener('click', displayInfirmary);
quartermasterButton.addEventListener('click', displayQuartermaster);

toNextFightButton.addEventListener('click', battle);
// END GAME FLOW ----->

// GAME FUNCTIONS
function newGame() {
    newGameButton.parentElement.removeChild(newGameButton);

    const inputNameLabel = document.createElement('span');
    inputNameLabel.textContent = 'Enter Name: '
    const inputName = document.createElement('input');
    inputName.setAttribute('id', 'input-name');

    addBlankLine(innerGameWindow, 5);

    innerGameWindow.appendChild(inputNameLabel);
    innerGameWindow.appendChild(inputName);

    addBlankLine(innerGameWindow, 1);

    const chooseClassLabel = document.createElement('span');
    chooseClassLabel.textContent = 'Choose your class: ';
    const chooseClass = document.createElement('select');

    const myr = document.createElement('option');
    const barb = document.createElement('option');
    const hop = document.createElement('option');

    myr.text = 'Myrmidon';
    myr.value = 'myrmidon';
    barb.text = 'Barbarian';
    barb.value = 'barbarian';
    hop.text = 'Hoplite';
    hop.value = 'hoplite';

    chooseClass.add(myr);
    chooseClass.add(barb);
    chooseClass.add(hop);

    innerGameWindow.appendChild(chooseClassLabel);
    innerGameWindow.appendChild(chooseClass);

    addBlankLine(innerGameWindow, 5);

    const startGameButton = document.createElement('button');
    startGameButton.textContent = 'Start your adventure!';
    innerGameWindow.appendChild(startGameButton);

    startGameButton.addEventListener('click', () => {
        if (inputName.value === '') {
            playerNameHeader.textContent = 'The Mysterious Stranger';
        } else {
            playerNameHeader.textContent = inputName.value;
        }

        if (chooseClass.value === 'myrmidon') {
            playerStats = fighterClasses[0];
        } else if (chooseClass.value === 'barbarian') {
            playerStats = fighterClasses[1];
        } else if (chooseClass.value === 'hoplite') {
            playerStats = fighterClasses[2];
        }

        innerGameWindow.style.border = '';
        innerGameWindow.innerHTML = '';

        textWindow.innerHTML = `In the dim-lit armory, the air hung heavy with the scent of oiled leather and anticipation. You are a new gladiator, a raw recruit with fire in your eyes, standing amidst a sea of dulled weaponry and battered, blood-stained armor. The arena blacksmiths, sweat pouring from their brows, unceremoniously pick out some of the more battle-worn pieces and toss them towards you. You try on an ill-fitting, matted leather breastplate and tie the straps tight around your shoulders. The clang of metal meeting metal echoes throughout the humid forge as a smith hands you an old bronze shortsword, its edge barely sharp enough to cut bread. A thin bronze cap is shoved onto your crown. <br><br>
        "Good enough", grunts the smith. "We've been getting through a lot of new fighters recently. I bet you won't make it to the end of the week. Try not to bleed too much on the gear. It's a pain to clean." <br><br>
        You push through the scrum of fellow recruits and head towards the door at the far end of the room. Your new gear will not protect you for long - for you to have any hope of victory, and the glory and denarii that will come with it, you will certainly need to train...` 
        
        innerGameWindow.appendChild(textWindow);

        const continueGame = document.createElement('button');
        continueGame.textContent = 'Continue...';
        innerGameWindow.appendChild(continueGame);

        continueGame.addEventListener('click', () => {
            gameMenu.classList.toggle('hidden');
            enemyWindow.classList.toggle('hidden');
            enemyName.textContent = "Click 'To Next Fight' to continue!";
            textWindow.innerHTML = '';
            textWindow.style.border = 'none';
            innerGameWindow.removeChild(continueGame);

            displayHub();
        })
    })
}

function createNewEnemy() {
    let enemy = new Enemy(
        randomName(firstNames, lastNames),
        randomValueFromArray(fighterClasses),
        0,
        {},
        'PLACEHOLDER'
    );
    
    enemy.level = enemy.calculateLevel(playerLevel);
    enemy.enemyStats = calculateStats(enemy.level, enemy.enemyStats, enemy.fighterClass);
    enemyName.textContent = enemy.name;
    enemyLevel.textContent = `Level ${enemy.level} `;
    enemyClass.textContent = enemy.fighterClass.Class;

    return enemy;
}

function calculateStats(oppLevel, enemyStats, fighterClass) {
    if (fighterClass.Class === 'Myrmidon') {
        enemyStats.Strength = 7;
        enemyStats.Dexterity = 7;
        enemyStats.Defense = 7;
    } else if (fighterClass.Class === 'Barbarian') {
        enemyStats.Health = 15;
        enemyStats.Strength = 10;
        enemyStats.Dexterity = 3;
        enemyStats.Defense = 3;
    } else if (fighterClass.Class === 'Hoplite') {
        enemyStats.Health = 12;
        enemyStats.Defense = 10;
    }

    for (let stat in enemyStats) {
        if (oppLevel === 1) {
            enemyStats[stat] -= 1;
        } else if (1 < oppLevel && oppLevel <= 3) {
            enemyStats[stat] += randomNumber(1, 3);
        } else if (3 < oppLevel && oppLevel <= 6) {
            enemyStats[stat] += randomNumber(3, 6);
        } else if (6 < oppLevel) {
            enemyStats[stat] += randomNumber(6, 15);
        }         
    }

    return enemyStats;
}

function battle() {
    hubNav.style.display = 'none';
    toNextFightButton.style.display = 'none';

    let enemy = createNewEnemy();
    enemy.displayOppStats(enemy.enemyStats);

    textWindow.style.border = '';
    textWindow.innerHTML = `Your opponent, ${enemy.name}, stands across the sand from you. Like you, he is a fellow recruit, and this is his first fight.<br><br>He seems nervous, and clenches his weapon tightly. You both slowly circle each other, neither of you willing to overly commit. The early afternoon sun hangs high above. The arena stands are mostly empty - there are not many people interested in seeing two novices fight.<br><br>Your mouth is dry and your heart is beating painfully against your ribcage as you take one, then two, then three steps towards your opponent. Raising his shield to meet your tentative charge, the duel begins!`;

    const battleNav = document.createElement('div');
    battleNav.setAttribute('class', 'battle-nav-container');

    const attackButton = document.createElement('button');
    const defendButton = document.createElement('button');
    const feintButton = document.createElement('button');

    attackButton.textContent = 'Attack!';
    defendButton.textContent = 'Defend!';
    feintButton.textContent = 'Feint!';

    battleNav.appendChild(attackButton);
    battleNav.appendChild(defendButton);
    battleNav.appendChild(feintButton);

    innerGameWindow.appendChild(battleNav);
}

// UTILITY FUNCTIONS
function addBlankLine(elementName, number) {
    for (i = 0; i < number; i++) {
        const space = document.createElement('br');
        elementName.appendChild(space);
    }
}

function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomName(firstName, lastName) {
    const random1 = Math.floor(Math.random() * firstName.length);
    const random2 = Math.floor(Math.random() * lastName.length);
    return firstName[random1] + ' ' + lastName[random2];
}
  
// NAVIGATING THE UI
charSheetButton.addEventListener('click', () =>
    displayStats(playerStats)
);

equipmentButton.addEventListener('click', () =>
    displayEquipment(playerEquipment)
);

// EQUIPMENT TABLES
let playerEquipment = {
    Head: 'Bronze cap',
    Torso: 'Leather armour',
    Legs: 'Nothing!',
    Feet: 'Sandals',
    Weapon: 'Bronze shortsword',
    Offhand: 'Leather buckler'
}

// UI DISPLAY FUNCTIONS
function displayStats(object) {
    gameMenuDisplay.innerHTML = '';
    const statsList = document.createElement('div');

    for (const [stat, value] of Object.entries(object)) {
        const statLine = document.createElement('p');
        statLine.textContent = `${stat}: ${value}`;
        statsList.appendChild(statLine);
    }
    
    gameMenuDisplay.appendChild(statsList);
}

function displayOppStats(object) {
    const oppStatsList = document.createElement('div');

    for (const [stat, value] of Object.entries(object)) {
        const statLine = document.createElement('p');
        statLine.textContent = `${stat}: ${value}`;
        oppStatsList.appendChild(statLine);
    }
    
    enemyWindow.appendChild(oppStatsList);
}

function displayEquipment(object) {
    gameMenuDisplay.innerHTML = '';
    const equipmentList = document.createElement('div');

    for (const [equipment, value] of Object.entries(object)) {
        const equipmentLine = document.createElement('p');
        equipmentLine.textContent = `${equipment}: ${value}`;
        equipmentList.appendChild(equipmentLine);
    }

    gameMenuDisplay.appendChild(equipmentList);
}

function displayHub() {
    hubNav.appendChild(tavernButton);
    hubNav.appendChild(trainingPitButton);
    hubNav.appendChild(infirmaryButton);
    hubNav.appendChild(quartermasterButton);

    innerGameWindow.appendChild(hubNav);
    innerGameWindow.appendChild(toNextFightButton);
}

function displayTavern() {
    toNextFightButton.style.display = 'none';
    hubNav.innerHTML = '';
    textWindow.style.border = '';
    textWindow.innerHTML = `Beneath weathered stone arches, the entrance to the tavern beckons with the aroma of spiced wines and the murmur of animated chatter. Torchlight flickers on mosaic-laden walls depicting gladiatorial feats, while worn wooden tables groan under the weight of goblets and platters. Sweating patrons, packed in around the tables, clink vessels in jovial toasts as the distant roars of the arena's spectators add a rhythmic backdrop. The air hums with the stories of victorious warriors, shared over mugs of wine. The clinking of denarii being passed over the bar for drinks and bets on the gladiators punctuates the hubbub.`

    innerGameWindow.appendChild(backButton);

    backButton.addEventListener('click', () => {
        innerGameWindow.removeChild(backButton);
        textWindow.style.border = 'none';
        textWindow.innerHTML = '';
        toNextFightButton.style.display = 'inline';
        displayHub();
    });
}

function displayTrainingPit() {
    toNextFightButton.style.display = 'none';
    hubNav.innerHTML = '';
    textWindow.style.border = '';
    textWindow.innerHTML = `Entering the gladiator's training room is a descent into a world of disciplined chaos. The air crackles with the clash of steel meeting steel, punctuated by grunts of exertion. Sunlight spills through high, narrow windows, casting long shadows on the sand-covered floor. Walls bear witness to the scars of countless duels, adorned with weapon racks and battered shields. Sweat-drenched bodies weave through the dance of combat, each fighter honing their skills under the watchful eyes of seasoned instructors. The metallic scent of blood and the rhythmic thud of training weapons create an atmosphere where warriors are forged, preparing for the brutal spectacle of the arena.`;
    innerGameWindow.appendChild(backButton);

    backButton.addEventListener('click', () => {
        innerGameWindow.removeChild(backButton);
        textWindow.style.border = 'none';
        textWindow.innerHTML = '';
        toNextFightButton.style.display = 'inline';
        displayHub();
    });
}

function displayInfirmary() {
    toNextFightButton.style.display = 'none';
    hubNav.innerHTML = '';
    textWindow.style.border = '';
    textWindow.innerHTML = `In the damp corridors adjacent to the roaring arena, the infirmary stands as a sanctuary for the wounded gladiators. The scent of medicinal herbs hangs in the musty air. Bare cots line the walls, some of them occupied by injured warriors in various states of discomfort and consciousness. Several of them are covered by white cloths, a chipped clay token indicating the body needs to be disposed of. The infirmary staff are poorly trained and constantly busy. They stink of alcohol. Provided you train well and are lucky, there may not be a need to suffer their treatment too often.`;
    innerGameWindow.appendChild(backButton);

    backButton.addEventListener('click', () => {
        innerGameWindow.removeChild(backButton);
        textWindow.style.border = 'none';
        textWindow.innerHTML = '';
        toNextFightButton.style.display = 'inline';
        displayHub();
    });
}

function displayQuartermaster() {
    toNextFightButton.style.display = 'none';
    hubNav.innerHTML = '';
    textWindow.style.border = '';
    textWindow.innerHTML = `Tucked away in the bowels of the arena, not far from the training pits, the quartermaster's storeroom holds a motley assortment of bladed weapons, armours and replacement parts. Many of the items are available for trade and sale, provided you have the money available. From time to time, more exotic items pass through the quartermaster's hands, acquired through all manner of methods, each one more questionable than the last. You've heard rumours that these are only made available to veteran gladiators. If you survive long enough, you may one day be granted access.`;
    innerGameWindow.appendChild(backButton);

    backButton.addEventListener('click', () => {
        innerGameWindow.removeChild(backButton);
        textWindow.style.border = 'none';
        textWindow.innerHTML = '';
        toNextFightButton.style.display = 'inline';
        displayHub();
    });
}