let playerLevel = 1
let playerXP = 0
let xpTrigger = 250
const playerStats = {
    attack: 10,
    defence: 5,
    dexterity: 6
}

for (let i = 0; i < 100; i++) {
    playerXP += 150
    // if xp gain triggers levelup, call function
    // and update trigger
    if (playerXP >= xpTrigger) {
        levelUp(playerStats)
        xpTrigger += playerLevel + 1 * (playerLevel * 250)
        console.log(`total xp = ${playerXP}. xp to next level: ${xpTrigger}. xp needed: ${xpTrigger - playerXP}`)
    }
}

console.log(`final player level: ${playerLevel}. total xp: ${playerXP}`)

function levelUp(statsObject) {
    for (let stat in statsObject) {
        statsObject[stat] += 1
    }
    playerLevel += 1
    console.log('stats:', playerStats)
}