const gameMenu = document.querySelector('.game-menu');
const gameMenuDisplay = document.querySelector('.game-menu-display');
const playerNameHeader = document.querySelector('#player-name-h');
const enemyWindow = document.querySelector('.enemy-window');
const innerGameWindow = document.querySelector('.inner-game-window');
const charSheetButton = document.querySelector('#char-sheet-button');
const equipmentButton = document.querySelector('#equipment-button');
const newGameButton = document.querySelector('#new-game-button');



// GAME FLOW
gameMenu.classList.toggle('hidden');
enemyWindow.classList.toggle('hidden');
innerGameWindow.style.border = 'none';

newGameButton.addEventListener('click', newGame);



// END GAME FLOW

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
        playerNameHeader.textContent = inputName.value;
        if (chooseClass.value === 'myrmidon') {
            playerStats = myrmidon;
        } else if (chooseClass.value === 'barbarian') {
            playerStats = barbarian;
        } else if (chooseClass.value === 'hoplite') {
            playerStats = hoplite;
        }

        gameMenu.classList.toggle('hidden');
        enemyWindow.classList.toggle('hidden');
        innerGameWindow.style.border = '';

        innerGameWindow.innerHTML = '';
    })
}

// USEFUL FOR SPACING UI ELEMENTS
function addBlankLine(elementName, number) {
    for (i = 0; i < number; i++) {
        const space = document.createElement('br');
        elementName.appendChild(space);
    }
}

// NAVIGATING THE UI
charSheetButton.addEventListener('click', () =>
    displayStats(playerStats)
);

equipmentButton.addEventListener('click', () =>
    displayEquipment(playerEquipment)
);

// CHARACTER AND NPC CLASSES
let playerStats = {
    Health: 10,
    Strength: 5,
    Dexterity: 5,
    Defense: 5,
    Kills: 0
}

const myrmidon = {
    Health: 10,
    Strength: 7,
    Dexterity: 7,
    Defense: 7,
    Kills: 0
}

const barbarian = {
    Health: 15,
    Strength: 10,
    Dexterity: 3,
    Defense: 3,
    Kills: 0
}

const hoplite = {
    Health: 12,
    Strength: 5,
    Dexterity: 5,
    Defense: 10,
    Kills: 0
}

// EQUIPMENT TABLES
const playerEquipment = {
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