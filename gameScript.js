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

// BUTTONS
const charSheetButton = document.querySelector('#char-sheet-button');
const equipmentButton = document.querySelector('#equipment-button');
const newGameButton = document.querySelector('#new-game-button');

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
createNewEnemy();
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

        gameMenu.classList.toggle('hidden');
        enemyWindow.classList.toggle('hidden');
        innerGameWindow.style.border = '';

        innerGameWindow.innerHTML = '';
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