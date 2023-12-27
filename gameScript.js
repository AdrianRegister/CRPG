// PLAYER NAME
const playerNameHeader = document.querySelector('#player-name-h');

// ENEMY INFO
const enemyName = document.querySelector('#enemy-name');
const enemyLevel = document.querySelector('#enemy-level');
const enemyClass = document.querySelector('#enemy-class');
const oppStatsList = document.querySelector('.opp-stats-list');

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
let trainingPoints = 3                   
let playerXP = 0
let playerMoney = 15          

let isDrunk = false // this will lower all your combat stats by 1!
let isConfident = false // this will raise all your combat stats by 1!
let isHumbled = false // this will lower all your combat stats by 1!
let brawlUnresolved = false
let wasHealed = false

let swordProficiency = 15 // maximum of 100. increased through training.
let fullHealth;

// CHARACTER AND NPC CLASSES
let playerStats = {
    Health: 10,
    Strength: 5,
    Dexterity: 5,
    Defense: 5,
    Kills: 0,
}

const fighterClasses = [
    {
        Class: 'Myrmidon',
        Level: 1,
        Health: 25,
        Strength: 7,
        Dexterity: 6,
        Defense: 6,
        Proficiency: swordProficiency,
        Kills: 0,
        Sesterces: playerMoney,
        Experience: playerXP
    },
    {
        Class: 'Barbarian',
        Level: 1,
        Health: 37,
        Strength: 10,
        Dexterity: 5,
        Defense: 5,
        Proficiency: swordProficiency,
        Kills: 0,
        Sesterces: playerMoney,
        Experience: playerXP
    },
    {
        Class: 'Hoplite',
        Level: 1,
        Health: 30,
        Strength: 5,
        Dexterity: 5,
        Defense: 10,
        Proficiency: swordProficiency,
        Kills: 0,
        Sesterces: playerMoney,
        Experience: playerXP
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
        Health: 25,
        Strength: 5,
        Dexterity: 5,
        Defense: 5,
        Proficiency: 5
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
        } else if (6 < charLevel <= 10) {
            return randomNumber(6, 10);
        } else if (10 < charLevel <= 15) {
            return randomNumber(10, 15)
        }    
    }

    calculateProficiency(enemyLevel) {
        return randomNumber(enemyLevel + (enemyLevel * 1.5) + 10, enemyLevel + (enemyLevel * 3) + 10) 
    }
}

class Weapon {
    name
    damage
    value
    description

    constructor(name, damage, value, description) {
        this.name = name,
        this.damage = damage,
        this.value = value, 
        this.description = description
    }
}

class Armour {
    name
    protection
    value
    description

    constructor(name, protection, value, description) {
        this.name = name,
        this.protection = protection,
        this.value = value,
        this.description = description
    }
}

const bronzeShortsword = new Weapon(
    'Bronze shortsword', 
    damage = Array.from(Array(9).keys()).slice(1),
    5,
    'A basic bronze shortsword. Useful for cutting bread, skinning small animals, and not much else.'
    )

const leatherArmour = new Armour(
    'Leather armour',
    1,
    5,
    "A basic, worn leather chestpiece. It's better than fighting naked."
)

const bronzeCap = new Armour(
    'Bronze cap',
    1,
    5,
    'A crudely-beaten sheet of bronze that has been roughly shaped into something resembling a basic helmet.'
)

const leatherBuckler = new Armour(
    'Leather buckler',
    1,
    5,
    "A circle of wood reinforced with boiled leather strips. It doesn't smell very good."
)

const ironShortsword = new Weapon(
    'Iron shortsword',
    damage = Array.from(Array(13).keys()).slice(1),
    50,
    "A solid, standard-issue weapon. Both legionaries and gladiators have found it to be equally as effective in war as in the arena."
)

const ironArmour = new Armour(
    'Iron chestplate',
    3, 
    75,
    "Basic but reliable body armour. This can deflect both cuts and thrusts, making it an excellent choice in combat."
)

const ironHelmet = new Armour(
    'Iron helmet',
    2,
    50,
    "A stout, standard-issue iron helmet. Widely used across the Empire."
)

const ironShield = new Armour(
    'Iron shield',
    3,
    60,
    "This strong wooden shield is reinforced with iron bands crossing the centre."
)

// NAMES
const firstNames = [
    "Lucius", "Marcus", "Titus", "Gaius", "Quintus", "Septimus", "Cassius", "Amulius", "Cornelius", "Felix", "Valerius",
    "Marcellus", "Publius", "Gallio", "Caius", "Fabius", "Aulus", "Horatius", "Tiberius", "Flavius", "Vitruvius", "Gnaeus",
    "Decius", "Kaeso", "Manius", "Spurius"
];

const lastNames = [
    "Tullius", "Flavius", "Plinius", "Valerius", "Cassius", "Gabinnius", "Vitruvius", "Cosconius", "Marcellus", "Dillius",
    "Crispus", "Nerva", "Aelianus", "Corvinus", "Quirinus", "Capitolinus", "Tribonianus", "Priscianus", "Severus", "Marianus",
    "Plautus", "Viator", "Papus", "Licinianus","Julius", "Drusus"
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

        fullHealth = playerStats.Health
        innerGameWindow.style.border = '';
        innerGameWindow.innerHTML = '';

        textWindow.innerHTML = `In the dimly-lit armory, the air hangs heavy with the scent of oiled leather. You are a new gladiator, a raw recruit with fire in your eyes, standing amidst a sea of dulled weaponry and battered, blood-stained armor. The arena blacksmiths, sweat pouring from their brows, unceremoniously pick out some of the more battle-worn pieces and toss them towards you. You try on an ill-fitting, matted leather breastplate and tie the straps tight around your shoulders. The clang of metal meeting metal echoes throughout the humid forge as a smith hands you an old bronze shortsword, its edge barely sharp enough to cut bread. A thin bronze cap is shoved onto your head as he gestures towards the leather shields hanging from the wall, signalling that you should take one. <br><br>
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
    enemy.enemyStats.Proficiency = enemy.calculateProficiency(enemy.level)
    enemy.enemyStats = calculateStats(enemy.level, enemy.enemyStats, enemy.fighterClass);
    enemyName.textContent = enemy.name;
    enemyLevel.textContent = `Level ${enemy.level} `;
    enemyClass.textContent = enemy.fighterClass.Class;

    return enemy;
}

function calculateStats(oppLevel, enemyStats, fighterClass) {
    if (fighterClass.Class === 'Myrmidon') {
        enemyStats.Strength = 7;
        enemyStats.Dexterity = 6;
        enemyStats.Defense = 6;
    } else if (fighterClass.Class === 'Barbarian') {
        enemyStats.Health = 37;
        enemyStats.Strength = 10;
        enemyStats.Dexterity = 5;
        enemyStats.Defense = 5;
    } else if (fighterClass.Class === 'Hoplite') {
        enemyStats.Health = 30;
        enemyStats.Strength = 5;
        enemyStats.Dexterity = 5;
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
    let enemyAlive = true;
    let playerAlive = true;
    displayOppStats(enemy.enemyStats);

    textWindow.style.border = '';
    textWindow.innerHTML = `Your opponent, ${enemy.name}, stands across the sand from you. Like you, he is a fellow recruit, and this is his first fight.<br><br>He seems nervous, and clenches his weapon tightly. You both slowly circle each other, neither of you willing to overly commit. The early afternoon sun hangs high above. The arena stands are mostly empty - there are not many people interested in seeing two novices fight.<br><br>Your mouth is dry and your heart is beating painfully against your ribcage as you take one, then two, then three steps towards your opponent. Raising his shield to meet your tentative charge, the duel begins!`;

    if (isDrunk) {
        textWindow.innerHTML += "<br><br>You are still feeling the effects from the night before. A fight to the death is not something that should be done while nursing a monster hangover. Yet, here you are."
    }
    if (isConfident) {
        textWindow.innerHTML += `<br><br>After the previous night's extracurricular activities, you feel like you could fight two opponents at once!`
    }
    if (isHumbled) {
        textWindow.innerHTML += `<br><br>After the beating you took at the tavern last night, you feel somewhat demoralised. You fervently hope your opponent is also feeling the same.`
    }

    // CREATES BATTLE UI ELEMENTS
    const battleNav = document.createElement('div');
    battleNav.setAttribute('class', 'battle-nav-container');

    const battleText = document.createElement('p');
    battleText.setAttribute('class', 'battle-text');

    const opponentBattleText = document.createElement('p');
    opponentBattleText.setAttribute('class', 'battle-text');

    const victoryButton = document.createElement('button');
    victoryButton.textContent = 'Victory!';

    const attackButton = document.createElement('button');
    /* const defendButton = document.createElement('button');
    const feintButton = document.createElement('button'); */

    attackButton.textContent = 'Attack!';
    /* defendButton.textContent = 'Defend!';
    feintButton.textContent = 'Feint!'; */

    battleNav.appendChild(attackButton);
    /* battleNav.appendChild(defendButton);
    battleNav.appendChild(feintButton); */

    innerGameWindow.appendChild(battleText);
    innerGameWindow.appendChild(opponentBattleText);
    innerGameWindow.appendChild(battleNav);

    battleText.innerHTML = 'The battle begins!';
    opponentBattleText.innerHTML = 'Your opponent watches you carefully.';
    let playerTurn = true;

    if (isDrunk || isHumbled) {
        playerStats.Strength -= 1
        playerStats.Dexterity -= 1
        playerStats.Defense -= 1
        displayStats(playerStats)
    }
    if (isConfident) {
        playerStats.Strength += 1
        playerStats.Dexterity += 1
        playerStats.Defense += 1
        displayStats(playerStats)
    }

    attackButton.addEventListener('click', () => {
        battleText.classList.add('expanded');
        setTimeout(function() {
            battleText.classList.remove('expanded');
        }, 300);

        battleText.innerHTML = 'You strike!<br><br>';
        const hit = rollToHitPlayer(playerStats.Proficiency, enemy.enemyStats.Proficiency, playerStats.Dexterity, enemy.enemyStats.Defense);

        const playerHitText = [
            "Your weapon passes your opponent's defenses! He gasps and clutches his side.",
            "Your blow hits true! Your opponent grunts in pain and grits his teeth.",
            "Your blade darts past your opponent's block! His eyes burn with pain as it bites."
        ]
        const playerMissText = [
            "Your wild blow strikes thin air, your opponent having stepped out of the way just in time.",
            "You overbalance slightly as you attack, your blade slicing nothing but empty air.",
            "Your opponent smartly brings up his block and your weapon clatters harmlessly off his defenses."
        ]
        const enemyHitText = [
            `Your opponent's strike hits home! You wince and gasp in pain. Your vision blurs and you take a step back out of harm's way.`,
            "You do not see your opponent's strike coming until it is too late. You gasp as it cuts into you!",
            "You try and deflect your opponent's attack but misjudge the distance. It evades your block and bites deep!"
        ]
        const enemyMissText = [
            `Your opponent aims a blow in your direction, but his weapon passes harmlessly through the space you occupied only moments before.`,
            "You smartly enter your block in time to negate your opponent's attack.",
            "Anticipating your opponent's strike, you sway to the side as his blade cuts through empty air."
        ]

        if (hit) {
            battleText.innerHTML += randomValueFromArray(playerHitText)
            const damage = calculateDamage(playerEquipment.Weapon[1], playerStats.Strength)
            enemy.enemyStats.Health -= damage;
            console.log('Hit!');
            console.log(`Damage: ${damage}. Enemy health: ${enemy.enemyStats.Health}`);
            battleText.innerHTML += `<br><br>You deal ${damage} damage!`
        } else {
            battleText.innerHTML += randomValueFromArray(playerMissText)
            console.log('Miss!');
        }

        if (enemy.enemyStats.Health < 1) {
            enemyAlive = false;
            enemy.enemyStats.Health = 'Dead!';
            battleText.innerHTML += ` ${enemy.name} staggers backwards, blood pouring from his wounds. You step forward and deliver the death blow!`;
            battleText.innerHTML += '<br><br>Your foe crumples to the ground and lies motionless, his blood streaming into the sand beneath. The handful of spectators mutter among themselves. Some of them clap, the sound echoing hollowly around the sparsely-populated arena. As the rush of survival floods your body, your ragged breathing slowly returns to normal. You have survived your first fight! You stand victorious!';
            battleNav.parentElement.removeChild(battleNav);
            opponentBattleText.innerHTML = '';
            opponentBattleText.style.border = 'none';
            playerStats.Kills += 1;
            
            innerGameWindow.appendChild(victoryButton);
        }
        
        displayOppStats(enemy.enemyStats);
        playerTurn = false;

        if (!playerTurn && enemyAlive) {
            const hit = rollToHitEnemy(enemy.enemyStats.Proficiency, playerStats.Proficiency, enemy.enemyStats.Dexterity, playerStats.Defense);

            opponentBattleText.classList.add('expanded');
            setTimeout(function() {
                opponentBattleText.classList.remove('expanded');
            }, 300);
    
            if (hit) {
                opponentBattleText.innerHTML = randomValueFromArray(enemyHitText)
                const damage = calculateDamage(bronzeShortsword.damage, enemy.enemyStats.Strength)
                const damageAfterArmour = damage - (
                    playerEquipment.Torso[1] + 
                    playerEquipment.Head[1] +
                    playerEquipment.Offhand[1]
                    )
                if (damageAfterArmour < 0) {
                    damageAfterArmour === 1
                }                 
                playerStats.Health -= damageAfterArmour;
                console.log('Opponent hits!');
                console.log(`Damage: ${damageAfterArmour}. Your health: ${playerStats.Health}`);
                opponentBattleText.innerHTML += `<br><br>You suffer ${damageAfterArmour} damage!`
            } else {
                opponentBattleText.innerHTML = randomValueFromArray(enemyMissText)
                console.log('Opponent misses!');
            }
    
            if (playerStats.Health < 1) {
                opponentBattleText.innerHTML = '';
                opponentBattleText.style.border = 'none';
                playerAlive = false;
                playerStats.Health = 'Dead!';
                battleText.innerHTML += `<br><br>You are exhausted. You are too slow to defend your opponent's next attack!<br><br>Your vision darkens as pain overwhelms you. Your strength is deserting you and you drop to one knee, your weapon clanging to the ground. Your opponent stands above you. He raises his arm one last time.`;
                battleText.innerHTML += '<br><br>' + `${enemy.name}'s blow knocks you fully to the ground and your face hits the dirt. Your senses quickly begin to fail. The noise of the arena fades and is replaced by a gentle ringing. Mercifully, the pain also begins to ebb. You do not even notice how warm and wet the sand beneath you has become, saturated as it is with your blood. You let out one final weak, rasping breath and lie still. The world vanishes.`;
                battleText.innerHTML += '<br><br>You are dead!';
                battleNav.parentElement.removeChild(battleNav);
            }
        displayStats(playerStats);
        playerTurn = true;

        }
    });

    victoryButton.addEventListener('click', () => {
        textWindow.innerHTML = '';
        textWindow.style.border = 'none';

        innerGameWindow.removeChild(victoryButton);
        innerGameWindow.removeChild(battleText);
        innerGameWindow.removeChild(opponentBattleText);

        gameState += 1
        trainingPoints = 3
        playerStats.Sesterces += 10 * (enemy.level + 0.2)
        playerStats.Experience += 100 * (enemy.level + 0.2)

        if (isDrunk || isHumbled) {
            playerStats.Strength += 1
            playerStats.Dexterity += 1
            playerStats.Defense += 1
        }
        if (isConfident) {
            playerStats.Strength -= 1
            playerStats.Dexterity -= 1
            playerStats.Defense -= 1
        }

        wasHealed = false
        isDrunk = false
        isConfident = false
        isHumbled = false
        brawlUnresolved = false
        displayStats(playerStats)
        displayHub();
    });
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

// COMBAT FUNCTIONS
function rollToHitPlayer(playerProf, enemyProf, playerDexterity, enemyDefense) {
    const skillDifference = (playerProf - enemyProf) / 2
    const randomModifierAttacker = randomNumber(1, 23)
    const randomModifierDefender = randomNumber(1, 23)

    const toHitChance = playerDexterity + randomModifierAttacker + skillDifference
    const toDefendChance = enemyDefense + randomModifierDefender - skillDifference
    console.log(`Attack modifier: ${randomModifierAttacker} + (${skillDifference}). Defence modifier: ${randomModifierDefender}. 
        Hit: ${toHitChance}. Defend: ${toDefendChance}`)

    return toHitChance > toDefendChance;
}

function rollToHitEnemy(enemyProf, playerProf, enemyDexterity, playerDefense) {
    const skillDifference = (enemyProf - playerProf) / 2
    const randomModifierAttacker = randomNumber(1, 23)
    const randomModifierDefender = randomNumber(1, 23)

    const toHitChance = enemyDexterity + randomModifierAttacker + skillDifference
    const toDefendChance = playerDefense + randomModifierDefender - skillDifference
    console.log(`Attack modifier: ${randomModifierAttacker} + (${skillDifference}). Defence modifier: ${randomModifierDefender}. 
        Hit: ${toHitChance}. Defend: ${toDefendChance}`)

    return toHitChance > toDefendChance;
}

function calculateDamage(weaponDamage, char1Strength) {
    strengthModifier = char1Strength / 2
    return strengthModifier + randomValueFromArray(weaponDamage);
}
  
// NAVIGATING THE UI
charSheetButton.addEventListener('click', () => {
    displayStats(playerStats)
});

equipmentButton.addEventListener('click', () =>
    displayEquipment(playerEquipment)
);

// EQUIPMENT TABLES
let playerEquipment = {
    Head: [
        bronzeCap.name,
        bronzeCap.protection,
        bronzeCap.description,
        bronzeCap.value
    ],
    Torso: [
        leatherArmour.name,
        leatherArmour.protection,
        leatherArmour.description,
        leatherArmour.value
    ],
    Legs: [
        'Nothing!',
        0,
        'Try to keep this body part away from sharp objects!',
        0
    ],
    Feet: [
        'Sandals',
        0,
        'Try to keep this body part away from sharp objects!',
        0
    ],
    Weapon: [
        bronzeShortsword.name,
        bronzeShortsword.damage,
        bronzeShortsword.description,
        bronzeShortsword.value
    ], 
    Offhand: [
        leatherBuckler.name,
        leatherBuckler.protection,
        leatherBuckler.description,
        leatherBuckler.value
    ] 
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
    oppStatsList.innerHTML = '';

    for (const [stat, value] of Object.entries(object)) {
        const statLine = document.createElement('p');
        statLine.textContent = `${stat}: ${value}`;
        oppStatsList.appendChild(statLine);
    }
}

function displayEquipment(object) {
    gameMenuDisplay.innerHTML = '';
    const equipmentList = document.createElement('div');

    for (const [equipment, value] of Object.entries(object)) {
        const equipmentLine = document.createElement('p')
        equipmentLine.setAttribute('class', 'equipment-line');
        equipmentLine.textContent = `${equipment}: ${value[0]}`;
        equipmentList.appendChild(equipmentLine);

        const equipmentInfo = document.createElement('p')
        equipmentInfo.setAttribute('class', 'item-info-span')
        equipmentInfo.textContent += value[2]
        equipmentList.appendChild(equipmentInfo)
    }

    gameMenuDisplay.appendChild(equipmentList);
}

function displayHub() {
    if (isDrunk || brawlUnresolved || isConfident || isHumbled) {
        tavernButton.textContent = 'You are unwelcome in the tavern.'
        tavernButton.disabled = true
    } else {
        tavernButton.textContent = 'Tavern'
        tavernButton.disabled = false
    }
    hubNav.appendChild(tavernButton);
    hubNav.appendChild(trainingPitButton);
    hubNav.appendChild(infirmaryButton);
    hubNav.appendChild(quartermasterButton);

    innerGameWindow.appendChild(hubNav);
    innerGameWindow.appendChild(toNextFightButton);

    hubNav.style.display = 'block';
    toNextFightButton.style.display = 'block';
}

function displayTavern() {
    const tavernDiv = document.createElement('div')
    const drinkButton = document.createElement('button')
    const brawlButton = document.createElement('button')
    tavernDiv.appendChild(drinkButton)
    tavernDiv.appendChild(brawlButton)
    innerGameWindow.appendChild(tavernDiv)
    innerGameWindow.appendChild(backButton);

    let drinkCount = 0

    drinkButton.textContent = ''
    brawlButton.textContent = ''
    
    toNextFightButton.style.display = 'none';
    hubNav.innerHTML = '';
    textWindow.style.border = '';
    textWindow.innerHTML = `Beneath weathered stone arches, the entrance to the tavern beckons with the aroma of spiced wines and the murmur of animated chatter. Torchlight flickers on mosaic-laden walls depicting gladiatorial feats, while worn wooden tables groan under the weight of goblets and platters. Sweating patrons, packed in around the tables, clink vessels in jovial toasts as the distant roars of the arena's spectators add a rhythmic backdrop. The air hums with the stories of victorious warriors, shared over mugs of wine. The clinking of sesterces being passed over the bar for drinks and bets on the gladiators punctuates the hubbub.`
    drinkButton.textContent = 'Buy a drink (2 sesterces)'
    brawlButton.textContent = 'Start a brawl!'

    const drinkingBuddyRace = [
        'Phoenician', 'Nubian', 'Gaul', 'Greek', 'Roman', 'Sardinian', 'Briton'
    ]

    const drinkingBuddyJob = [
        'stonemason', 'mercenary', 'trader', 'leatherworker', 'blacksmith', 'carpenter', 'gladiator'
    ]

    let drinkingText = `<br><br>You are having a wonderful time! You have already had several enjoyable conversations with your fellow drinkers, and have sworn lifelong friendship with a :INSERT RACE: :INSERT JOB:. You are certain that your new best friend will pay for your next drink. However, when you look around for him a few minutes later, he is nowhere to be seen.`
    drinkingText = drinkingText.replace(':INSERT RACE:', randomValueFromArray(drinkingBuddyRace))     
    drinkingText = drinkingText.replace(':INSERT JOB:', randomValueFromArray(drinkingBuddyJob))     

    drinkButton.addEventListener('click', () => {
        if (playerStats.Sesterces > 2) {
            textWindow.innerHTML = `You approach the bar and motion towards the heavy oak cask fixed to the wall behind the barman. He unhooks a dirty pewter mug from the bar and fills it with thin, watery wine. "That'll be two sesterces", he mutters. You take the mug and knock it back, barely noticing the acrid, metallic taste. You do, however, notice the lovely effect it has on you after a few minutes. Life is good!`
            playerStats.Sesterces -= 2
            drinkCount++
            if (drinkCount > 2) {
                textWindow.innerHTML += drinkingText
            }
            if (drinkCount === 5) {
                textWindow.innerHTML = `The hours have passed quickly, and your memory is a blur. You have been amusing yourself by loudly going through your repertoire of bawdy songs and offensive jokes. Judging from the dark glares of the other patrons as you stagger around the small tavern, your performance has gone unappreciated.<br><br>Finally, they have had enough. A crowd of burly young men approach you and rock your head back with some well-placed, solid punches. Even in your addled state, the pain comes through and makes you grunt and moan. Then, dragging you by your armpits, the men take you to the entrance and hurl you face-first into the piss and muddy straw outside the tavern amidst loud cheers.<br><br>You are drunk! You will suffer a -1 penalty to all of your combat stats in the next fight!`
                playerStats.Health -= 5
                displayStats(playerStats)
                isDrunk = true
                tavernDiv.removeChild(drinkButton)
                tavernDiv.removeChild(brawlButton)
            }
        } else {
            textWindow.innerHTML = `"Why don't you come back when you have the money!" grunts the barman. "I don't run a bloody charity."`
        }
        
        displayStats(playerStats)
    })

    let brawlText = `You can't quite recall how it started. An insult here, a shove there. An argument over a spilled drink. Or was it because you accused that shit-for-brains :INSERT RACE: of prostituting himself to other men?<br><br>Whatever the reason, it hardly matters now. All you know is that you have some very drunk, very angry patrons in your face. Ducking under the first punch, you grab the nearest barstool and hold it like a spear in front of you, creating some distance between you and your asssailants.`
    brawlText = brawlText.replace(':INSERT RACE:', randomValueFromArray(drinkingBuddyRace))

    brawlButton.addEventListener('click', () => {
        tavernDiv.removeChild(drinkButton)
        tavernDiv.removeChild(brawlButton)
        innerGameWindow.removeChild(backButton)
        textWindow.innerHTML = brawlText
        const brawlAttackButton = document.createElement('button')
        // const brawlEscapeButton = document.createElement('button')
        // const brawlDefuseButton = document.createElement('button')
        brawlAttackButton.textContent = 'Get stuck in!'
        // brawlEscapeButton.textContent = 'Try to escape!'
        // brawlDefuseButton.textContent = 'Attempt to defuse the situation!'
        tavernDiv.appendChild(brawlAttackButton)
        // tavernDiv.appendChild(brawlEscapeButton)
        // tavernDiv.appendChild(brawlDefuseButton)

        let barBrawlRoundCounter = 1 // when this reaches 3, end the brawl.
        let kickingAssCounter = 0 // this can reach a maximum of 2. Each point provides a 'confident' modifier of +0.5 to your stats for the next arena fight.
        let thisWasABadIdeaCounter = 0 // this can reach a maximum of 2. Each point provides a 'humbled' modifier of -0.5 to your stats for the next arena fight.
        let finalBrawlCounter = 0

        brawlAttackButton.addEventListener('click', () => {
            console.log(barBrawlRoundCounter, kickingAssCounter, thisWasABadIdeaCounter)
            if (barBrawlRoundCounter < 3) {
                if (randomNumber(1, 100) >= 50) { // if hit!
                    console.log('hit!')
                    if (barBrawlRoundCounter === 1) {
                        textWindow.innerHTML = `With a lusty roar, you swing the barstool over your head and bring it crashing down onto the closest attacker! He immediatedly crumbles, blood pouring from a deep cut on the side of his head. His friend approaches from the side...`                         
                        kickingAssCounter++
                    } else if (barBrawlRoundCounter === 2 && kickingAssCounter !== 0) {
                        textWindow.innerHTML = `You see him coming the entire way. You decide to anticipate his attack, rushing him and pinning him to the floor. You deflect his flailing blows and drop your elbow directly onto his nose! `
                        textWindow.innerHTML += `The remaining attacker totally loses his nerve in the face of your masterful display of improvisational alcohol-fuelled combat. Backing away, he turns and flees!<br><br>Your laughter accompanies him out the door. Turning around, you are pleasantly surprised to see several cheering patrons offering to pay for your next round.<br><br>You feel invincible! You have gained a +1 bonus to your combat stats for the next arena fight!`
                        tavernDiv.removeChild(brawlAttackButton)
                        // tavernDiv.removeChild(brawlEscapeButton)
                        // tavernDiv.removeChild(brawlDefuseButton)
                        tavernDiv.appendChild(drinkButton)
                        innerGameWindow.appendChild(backButton)
                        kickingAssCounter++
                    } else if (barBrawlRoundCounter === 2 && kickingAssCounter === 0) {
                        textWindow.innerHTML = `Suddenly, there is a loud crashing sound from the tavern entrace. A patrol of Vigiles, Rome's militia lawkeepers, burst through the door.<br><br>They quickly identify you and your erstwhile drinking partners as the troublemakers, and frog-march you outside. You are all given a stern warning to not return to the tavern under pain of imprisonment. Grumbling to yourselves, you grudgingly shake hands and go on your way.`
                        brawlUnresolved = true
                        tavernDiv.removeChild(brawlAttackButton)
                        // tavernDiv.removeChild(brawlEscapeButton)
                        // tavernDiv.removeChild(brawlDefuseButton)
                        innerGameWindow.appendChild(backButton)
                    }
                } else { // if miss!
                    console.log('miss!')
                    if (barBrawlRoundCounter === 1) {
                        thisWasABadIdeaCounter++
                        textWindow.innerHTML = `With a lusty roar, you swing the barstool over your head and bring it crashing down onto the closest attacker!<br><br>Or, at least, that was the plan. Your opponent moves much faster than you had anticipated. By the time your makeshift weapon thumps onto the dirty tavern floor, he has already moved around you to deliver a clubbing blow to your ribs!<br><br>You stagger sideways and take a step back. This may have been a bad idea...`                  
                        playerStats.Health -= 2
                        displayStats(playerStats) 
                    } else if (barBrawlRoundCounter === 2 && thisWasABadIdeaCounter !== 0) {
                        textWindow.innerHTML = `You are still reeling from the previous blow as the second hits you square in the mouth. Spitting blood, you collapse backwards over someone's leg and land in a heap on the floor. You hold your hands up in surrender.<br><br>The brawlers gather around you, jeering and spitting on you. They then grab you by your legs and unceremoniously fling you out of the tavern into a filthy alleyway.<br><br>This was a humiliating experience. You will suffer -1 to your combat stats for the next arena fight!`
                        playerStats.Health -= 2
                        displayStats(playerStats) 
                        tavernDiv.removeChild(brawlAttackButton)
                        // tavernDiv.removeChild(brawlEscapeButton)
                        // tavernDiv.removeChild(brawlDefuseButton)
                        innerGameWindow.appendChild(backButton)
                        thisWasABadIdeaCounter++
                    } else if (barBrawlRoundCounter === 2 && thisWasABadIdeaCounter === 0) {
                        textWindow.innerHTML = `Suddenly, there is a loud crashing sound from the tavern entrace. A patrol of Vigiles, Rome's militia lawkeepers, burst through the door.<br><br>They quickly identify you and your erstwhile drinking partners as the troublemakers, and frog-march you outside. You are all given a stern warning to not return to the tavern under pain of imprisonment. Grumbling to yourselves, you grudgingly shake hands and go on your way.`
                        brawlUnresolved = true
                        tavernDiv.removeChild(brawlAttackButton)
                        // tavernDiv.removeChild(brawlEscapeButton)
                        // tavernDiv.removeChild(brawlDefuseButton)
                        innerGameWindow.appendChild(backButton)
                    }
                }
                barBrawlRoundCounter++    
            }
            finalBrawlCounter = kickingAssCounter - thisWasABadIdeaCounter
            if (finalBrawlCounter === 2) {
                isConfident = true
            } else if (finalBrawlCounter === -2) {
                isHumbled = true
            }
            console.log('final brawl count: ' + finalBrawlCounter)
        })
    })

    backButton.addEventListener('click', () => {
        innerGameWindow.removeChild(tavernDiv)
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
    textWindow.innerHTML = `Entering the gladiator's training room is a descent into a world of disciplined chaos. The air crackles with the clash of steel meeting steel, punctuated by grunts of exertion. Sunlight spills through high, narrow windows, casting long shadows on the sand-covered floor. Walls bear witness to the scars of countless duels, adorned with weapon racks and battered shields. Sweat-drenched bodies weave through the dance of combat, each fighter honing their skills under the watchful eyes of seasoned instructors. The rhythmic thud of training weapons echoes through the room.`;
    if (playerStats.Proficiency < 24) {
        textWindow.innerHTML += `<br><br>You approach the nearest available instructor. Your bladework would currently embarass a fishwife, and you have little chance of surviving for very long with this current level of skill.`
    } else if (playerStats.Proficiency < 49) {
        textWindow.innerHTML += `<br><br>The long weeks of combat experience and hard training have paid off. You feel considerably more self-assured in your swordplay. One of the more seasoned instructors notices you, and flicks his head towards the centre of the room. You follow him and prepare to train.`
    } else if (playerStats.Proficiency < 74) {
        textWindow.innerHTML += `<br><br>Over the last year, the training room has become your second home. Your armour has become a second skin and your sword an extension of your arm. You look around at the fresh recruits and shake your head slightly at their incompetence. Is this what you looked like, all those months ago?`
    } else if (playerStats.Proficiency < 101) {
        textWindow.innerHTML += `<br><br>A hush falls over the training room as you walk in. You notice gladiators and instructors alike cease their sparring to watch as you briskly prepare your equipment. There are precious few gladiators remaining with your level of skill - the others are either retired or dead. This makes you something of a celebrity among your peers.`
    }
    textWindow.innerHTML += `<br><br>Current sword proficiency: ${playerStats.Proficiency}<br>Training points available: ${trainingPoints}`
    const trainButton = document.createElement('button')
    trainButton.textContent = 'Train!'
    innerGameWindow.appendChild(trainButton)
    innerGameWindow.appendChild(backButton)

    trainButton.addEventListener('click', () => {
        console.log('training clicked!')
        const trainingSuccessChance = randomNumber(0, 100)
        if (trainingPoints !== 0) {
            switch (true) {
                case playerStats.Proficiency <= 20:
                    console.log('<25');
                    if (trainingPoints === 3) {
                        textWindow.innerHTML = `You stand across from the instructor. "I won't kill you", he growls. "That's not my job. But by Jupiter, if you can't even learn these basic movements, I may forget my obligations and spare your opponents the trouble!"<br><br>Over the course of the next few hours, you are thoroughly put through your paces. The instructor shows you no pity and little mercy. The end of the session finds you hunched over, vomiting from the intense effort and half-delirious from exhaustion and pain. Bruises are blossoming all over your body.`;
                        if (trainingSuccessChance > 20) {
                            textWindow.innerHTML += `<br><br>You feel like you have learnt something of basic swordplay! With luck, you should at least be able to hold your own during your first fight.`;
                            playerStats.Proficiency += 5;
                        } else {
                            textWindow.innerHTML += `<br><br>The training moves too fast for you to follow. You feel like you are always just one step behind. The only thing you have to show for your hours of exertion are cuts, bruises and aching muscles.`;
                        }
                        trainingPoints -= 1;
                    } else if (trainingPoints === 2) {
                        textWindow.innerHTML = `"You again!" snorts the instructor. "One beating wasn't enough? Get ready for another!" He hurls himself at you. You grit your teeth and prepare to suffer.`;
                        if (trainingSuccessChance > 50) {
                            textWindow.innerHTML += `<br><br>You feel like you have learnt something of basic swordplay! With luck, you should at least be able to hold your own during your first fight.`;
                            playerStats.Proficiency += 4;
                        } else {
                            textWindow.innerHTML += `<br><br>The training moves too fast for you to follow. You feel like you are always just one step behind. The only thing you have to show for your hours of exertion are cuts, bruises and aching muscles.`;
                        }
                        trainingPoints -= 1;
                    } else if (trainingPoints === 1) {
                        textWindow.innerHTML = `"You again!" snorts the instructor. "One beating wasn't enough? Get ready for another!" He hurls himself at you. You grit your teeth and prepare to suffer.`;
                        if (trainingSuccessChance > 70) {
                            textWindow.innerHTML += `<br><br>You feel like you have learnt something of basic swordplay! With luck, you should at least be able to hold your own during your first fight.`;
                            playerStats.Proficiency += 3;
                        } else {
                            textWindow.innerHTML += `<br><br>The training moves too fast for you to follow. You feel like you are always just one step behind. The only thing you have to show for your hours of exertion are cuts, bruises and aching muscles.`;
                        }
                        trainingPoints -= 1;
                    }
                    break;
        
                case playerStats.Proficiency > 20 && playerStats.Proficiency <= 40:
                    console.log('20-40');
                    if (trainingPoints === 3) {
                        textWindow.innerHTML = `The instructor nods curtly and slips into his fighting stance. You mirror him and quickly move into range.`;
                        if (trainingSuccessChance > 35) {
                            textWindow.innerHTML += `<br><br>After yet another intense sparring session, the instructor breaks off and scowls at you. "Enough. I would have killed you with that feint earlier. Make sure you see it coming next time." He is a man of few words, but you can tell he is pleased with your progress. At least, you think you can tell.`;
                            playerStats.Proficiency += 5;
                        } else {
                            textWindow.innerHTML += `<br><br>The training moves too fast for you to follow. You feel like you are always just one step behind. The only thing you have to show for your hours of exertion are cuts, bruises and aching muscles.`;
                        }
                        trainingPoints -= 1;
                    } else if (trainingPoints === 2) {
                        textWindow.innerHTML = `The instructor looks up as you approach. Without a word, he picks up his gear and trots lightly over to the training circle.`;
                        if (trainingSuccessChance > 65) {
                            textWindow.innerHTML += `<br><br>After yet another intense sparring session, the instructor breaks off and nods. You think you can see the twitch of a smile tugging at the corner of his lips.`;
                            playerStats.Proficiency += 4;
                        } else {
                            textWindow.innerHTML += `<br><br>The training moves too fast for you to follow. You feel like you are always just one step behind. The only thing you have to show for your hours of exertion are cuts, bruises and aching muscles.`;
                        }
                        trainingPoints -= 1;
                    } else if (trainingPoints === 1) {
                        textWindow.innerHTML = `The instructor looks up as you approach. Without a word, he picks up his gear and trots lightly over to the training circle.`;
                        if (trainingSuccessChance > 85) {
                            textWindow.innerHTML += `<br><br>After yet another intense sparring session, the instructor breaks off and nods. You think you can see the twitch of a smile tugging at the corner of his lips.`;
                            playerStats.Proficiency += 3;
                        } else {
                            textWindow.innerHTML += `<br><br>The training moves too fast for you to follow. You feel like you are always just one step behind. The only thing you have to show for your hours of exertion are cuts, bruises and aching muscles.`;
                        }
                        trainingPoints -= 1;
                    }
                    break;
        
                case playerStats.Proficiency > 40 && playerStats.Proficiency <= 60:
                    console.log('40-60');
                    if (trainingPoints === 3) {
                        textWindow.innerHTML = `Your level of skill is now comparable to the instructor's. "You're getting there", he says approvingly. "But there's still some room for improvement. Let's go."`;
                        if (trainingSuccessChance > 50) {
                            textWindow.innerHTML += `<br><br>The younger, more inexperienced gladiators in the arena have been gathering around you and the instructor to enjoy the show. The quality of your sparring is far above an average day's bout in the arena, and as you and the instructor complete a successful session, you see more than a few of the young fighters breaking off into pairs to practice the moves you displayed.`;
                            playerStats.Proficiency += 5;
                        } else {
                            textWindow.innerHTML += `<br><br>The session has been an excellent workout, but you are not entirely satisfied with your progress. Muttering to yourself, you toss your practice sword aside and vow to do better next time.`;
                        }
                        trainingPoints -= 1;
                    } else if (trainingPoints <= 2) {
                        textWindow.innerHTML = `The instructor looks up at you and grins. "There's a new move I've been itching to try on you. We'll see if you can handle it!" You grin and clap his shoulder, then follow him to the training circle.`;
                        if (trainingSuccessChance > 75) {
                            textWindow.innerHTML += `<br><br>The younger, more inexperienced gladiators in the arena have been gathering around you and the instructor to enjoy the show. The quality of your sparring is far above an average day's bout in the arena, and as you and the instructor complete a successful session, you see more than a few of the young fighters breaking off into pairs to practice the moves you displayed.`;
                            playerStats.Proficiency += 3;
                        } else {
                            textWindow.innerHTML += `<br><br>The session has been an excellent workout, but you are not entirely satisfied with your progress. Muttering to yourself, you toss your practice sword aside and vow to do better next time.`;
                        }
                        trainingPoints -= 1;
                    }
                    break;
        
                case playerStats.Proficiency > 60:
                    console.log('>60');
                    if (trainingPoints === 3) {
                        textWindow.innerHTML = `You are now so deadly that very few fighters can match you blow for blow. One of them is a grizzled ex-Centurion from the Fourteenth Legion. He nods respectfully as you approach.`;
                        if (trainingSuccessChance > 75) {
                            textWindow.innerHTML += `You nod at the ex-officer and step smartly towards him. He meets your sword and the sparring begins. What follows is a whirlwind of precise striking, lightning-quick feints and hypnotic footwork. The dance goes on for some time. The training pit has fallen silent. Everybody's eyes are locked on you and your partner, mouths hanging open in astonishment and heads shaking quietly at the level of skill on display. As the session ends, you feel utterly exhilarated. Your excitement is mirrored in the Centurion's face - each fighter recognises the other as a true blademaster.`;
                            playerStats.Proficiency += 5;
                        } else {
                            textWindow.innerHTML += `The sparring session is absolutely intense. Every other fighter in the training area has stopped to watch you train. By the time you break contact, you feel as though the Centurion was ever so slightly better than you. You replay the fight back in your mind's eye and identify two pivotal moments that shifted momentum in his favour, making a mental note to be more aware next time.`;
                        }
                        trainingPoints -= 1;
                    } else if (trainingPoints <= 2) {
                        textWindow.innerHTML = `The ex-Centurion grins at you as you approach. "Good to see you, ${playerNameHeader.textContent}! I've been waiting for you to come back. I've been practicing a counter-move to that feint of yours. Come, let me show you..."`;
                        if (trainingSuccessChance > 85) {
                            textWindow.innerHTML += `You nod at the ex-officer and step smartly towards him. He meets your sword and the sparring begins. What follows is a whirlwind of precise striking, lightning-quick feints and hypnotic footwork. The dance goes on for some time. The training pit has fallen silent. Everybody's eyes are locked on you and your partner, mouths hanging open in astonishment and heads shaking quietly at the level of skill on display. As the session ends, you feel utterly exhilarated. Your excitement is mirrored in the Centurion's face - each fighter recognises the other as a true blademaster.`;
                            playerStats.Proficiency += 3;
                        } else {
                            textWindow.innerHTML += `The sparring session is absolutely intense. Every other fighter in the training area has stopped to watch you train. By the time you break contact, you feel as though the Centurion was ever so slightly better than you. You replay the fight back in your mind's eye and identify two pivotal moments that shifted momentum in his favour, making a mental note to be more aware next time.`;
                        }
                        trainingPoints -= 1;
                    }
                    break;

                default:
                    break;
            }
        } else {
            textWindow.innerHTML = `You are utterly exhausted from the training. You doubt that you could even stand up straight, let alone defend yourself against the seasoned instructor. "Come back after your next arena fight! If you're still alive", grunts the instructor.`;
        }
        
    textWindow.innerHTML += `<br><br>Current sword proficiency: ${playerStats.Proficiency}<br>Training points available: ${trainingPoints}`
    displayStats(playerStats)
    if (trainingPoints === 0) {
        trainButton.disabled = true
    } else {
        trainButton.disabled = false
    }
    })

    backButton.addEventListener('click', () => {
        innerGameWindow.removeChild(trainButton)
        innerGameWindow.removeChild(backButton)
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
    const healButton = document.createElement('button')
    healButton.textContent = 'Seek healing'
    innerGameWindow.appendChild(healButton)
    innerGameWindow.appendChild(backButton);
    const payForHealingButton = document.createElement('button')

    healButton.addEventListener('click', () => {
        if (playerStats.Health !== fullHealth) {
            healButton.style.display = 'none'
            payForHealingButton.textContent = 'Pay 10 sesterces'
            if (!wasHealed) {
                innerGameWindow.appendChild(payForHealingButton)
                textWindow.innerHTML = `The nearest physician approaches you. You point out your various wounds and eye his rusty tools doubtfully. "Don't fret", he laughs. "I'll fix you up. Can't say whether you'll feel better afterwards, though!" He turns away to his operating table cackling to himself, motioning for you to lie down. You send a quick prayer to Salus, the god of health, and lie down on the cold stone table.`
            } else {
                textWindow.innerHTML = `The physician peers at you. "I've seen you already, haven't I? There's other fighters that need me more. Shoo!"`
            }

            payForHealingButton.addEventListener('click', () => {
                if (playerStats.Sesterces >= 10) {
                    playerStats.Sesterces -= 10
                    innerGameWindow.removeChild(payForHealingButton)
                    textWindow.innerHTML = `The physician's work is both quick and painful. "Go over there and walk it off. Give your sword a few practice swings. I'm sure you'll be fine." He brusquely ushers you away and out the door, beckoning for his next unfortunate patient to enter.`
                    const amountHealed = randomNumber(5, 15)
                    playerStats.Health += amountHealed
                    if (playerStats.Health > fullHealth) {
                        playerStats.Health = fullHealth
                    }
                    displayStats(playerStats)
                    wasHealed = true
                } else {
                    textWindow.innerHTML = `"You want me to patch up that hole in your chest? Give me money first. I have costs to cover, you know." The physician pushes you aside and motions for the next patient. You have no choice but to pray to the gods that your wounds heal overnight.<br><br>The next morning, you are somewhat disappointed to find that your prayers went unanswered.`
                }
            })
        } else {
            // innerGameWindow.removeChild(payForHealingButton)
            textWindow.innerHTML = `You are already at full health and have no need of the infirmary.`
        }
    })

    backButton.addEventListener('click', () => {
        if (innerGameWindow.contains(payForHealingButton)) {
            innerGameWindow.removeChild(payForHealingButton)
        }
        innerGameWindow.removeChild(healButton)
        innerGameWindow.removeChild(backButton)
        textWindow.style.border = 'none'
        textWindow.innerHTML = ''
        toNextFightButton.style.display = 'inline'
        displayHub()
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