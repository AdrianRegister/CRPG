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

// CHARACTER AND NPC CLASSES
let playerStats = {
    Health: 10,
    Strength: 5,
    Dexterity: 5,
    Defense: 5,
    Kills: 0
}

const fighterClasses = [
Myrmidon = {
    Class: 'Myrmidon',
    Level: 1,
    Health: 10,
    Strength: 7,
    Dexterity: 7,
    Defense: 7,
    Kills: 0
},

Barbarian = {
    Class: 'Barbarian',
    Level: 1,
    Health: 15,
    Strength: 10,
    Dexterity: 3,
    Defense: 3,
    Kills: 0
},

Hoplite = {
    Class: 'Hoplite',
    Level: 1,
    Health: 12,
    Strength: 5,
    Dexterity: 5,
    Defense: 10,
    Kills: 0
}];

// OBJECT CLASSES
class Enemy {
    name;
    fighterClass;
    level;
    stats;
    equipment;

    constructor(name, fighterClass, level, stats, equipment) {
        this.name = name; // Call randomName function using firstNames and lastNames as parameters!
        this.fighterClass = fighterClass; // call randomClass using fighterClasses as parameter!
        this.level = level; // Call calculateLevel function (TODO)
        this.stats = stats; // This will be provided by a level modifier to the fighterClass
        this.equipment = equipment; // Call generateEquipment (TODO)
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
    "Aurelius",
    "Cornelius",
    "Felix",
    "Valerius",
    "Marcellus",
    "Nero",
    "Caius",
    "Fabius",
    "Aulus",
    "Horatius",
    "Tiberius",
    "Flavius",
    "Vitruvius"
];

const lastNames = [
    "Aurelius",
    "Flavius",
    "Maximus",
    "Valerius",
    "Cassius",
    "Claudianus",
    "Vitruvius",
    "Felix",
    "Marcellus",
    "Tullius",
    "Crispus",
    "Nerva",
    "Aelianus",
    "Corvinus",
    "Quirinus",
    "Capitolinus",
    "Tribonianus",
    "Priscianus",
    "Severus",
    "Marianus"
];

// GAME FLOW --------->
gameMenu.classList.toggle('hidden');
enemyWindow.classList.toggle('hidden');
innerGameWindow.style.border = 'none';

newGameButton.addEventListener('click', newGame);
tavernButton.addEventListener('click', displayTavern);
// END GAME FLOW ----->

// GAME FUNCTIONS
function newGame() {
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
    const enemy = new Enemy(
        randomName(firstNames, lastNames),
        randomClass(fighterClasses),
        1,
        'PLACEHOLDER',
        'PLACEHOLDER'
    );

    enemyName.textContent = enemy.name;
    enemyLevel.textContent = `Level ${enemy.level} `;
    enemyClass.textContent = enemy.fighterClass.Class;
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

function randomName(firstName, lastName) {
    const random1 = Math.floor(Math.random() * firstName.length);
    const random2 = Math.floor(Math.random() * lastName.length);
    return firstName[random1] + ' ' + lastName[random2];
}

function randomClass(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
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