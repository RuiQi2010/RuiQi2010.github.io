import { upgrades, powerupIntervals } from './upgrades.js';

let score = document.querySelector('.score');
let parsedScore = parseFloat(score.innerHTML);

let spcText = document.getElementById('spc-text');
let spsText = document.getElementById('sps-text');

let upgradesNavButton = document.getElementById('upgrades-nav-button');
let skillsNavButton = document.getElementById('skills-nav-button');

let spc = 1;
let sps = 0;

function incrementScore() {
    score.innerHTML = Math.round(parsedScore += spc);
}

function buyUpgrade(upgrade) {
    const mu = upgrades.find((u) => {
        if (u.internalName == upgrade) return u
    });

    const upgradeDiv = document.getElementById(`${mu.internalName}-upgrade`);
    const nextLevelDiv = document.getElementById(`${mu.internalName}-next-level`);

    if (parsedScore >= mu.parsedCost) {
        score.innerHTML = Math.round(parsedScore -= mu.parsedCost);
        let index = powerupIntervals.indexOf(parseFloat(mu.level.innerHTML));

        if (index != -1) {
            upgradeDiv.style.cssText = `border-color: white; background-color: #444`;
            nextLevelDiv.style.cssText = `background-color: rgb(90, 90, 90); font-weight: normal`;
            mu.cost.innerHTML = Math.round(mu.parsedCost * 2.5 * 1.004 ** parseFloat(mu.level.innerHTML));
            if (mu.internalName == 'pen') {
                spc *= mu.powerups[index].mult;
                mu.parsedIncrease *= mu.powerups[index].mult;
                nextLevelDiv.innerHTML = `+${mu.parsedIncrease}名字/点击`;
            } else {
                sps -= mu.power;
                sps *= mu.powerups[index].mult;
                sps += mu.power;
                mu.parsedIncrease *= mu.powerups[index].mult;
                nextLevelDiv.innerHTML = `+${mu.parsedIncrease}名字/秒`
            }
        }
        mu.level.innerHTML++;
        index = powerupIntervals.indexOf(parseFloat(mu.level.innerHTML));
        if (index != -1) {
            upgradeDiv.style.cssText = `border-color: orange; background-color: #642`;
            nextLevelDiv.style.cssText = `background-color: #cc4500; font-weight: bold`;
            nextLevelDiv.innerText = mu.powerups[index].desc;
            mu.cost.innerHTML = Math.round(mu.parsedCost * 2.5 * 1.004 ** parseFloat(mu.level.innerHTML));
        } else {
            mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMpr);
            mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.scoreMpr).toFixed(2));
            if (mu.internalName == 'pen') {
                nextLevelDiv.innerHTML = `+${mu.parsedIncrease}名字/点击`;
            } else {
                nextLevelDiv.innerHTML = `+${mu.parsedIncrease}名字/秒`
            }
        }
        mu.increase.innerHTML = mu.parsedIncrease;
        if (mu.internalName == 'pen') spc += mu.parsedIncrease;
        else {
            sps -= mu.power
            mu.power += mu.parsedIncrease;
            sps += mu.power;
        }
        
    }
}

function save() {
    localStorage.clear();
    upgrades.map((upgrade) => {
        const obj = JSON.stringify({
            parsedLevel: parseFloat(upgrade.level.innerHTML),
            parsedCost: upgrade.parsedCost,
            parsedIncrease: upgrade.parsedIncrease
        });
        localStorage.setItem(upgrade.name, obj);
    });
    localStorage.setItem('spc', JSON.stringify(spc));
    localStorage.setItem('sps', JSON.stringify(sps));
    localStorage.setItem('score', JSON.stringify(parsedScore));
}

function load() {
    upgrades.map((upgrade) => {
        const savedValues = JSON.parse(localStorage.getItem(upgrade.name));
        upgrade.parsedCost = savedValues.parsedCost;
        upgrade.parsedIncrease = savedValues.parsedIncrease;
        upgrade.level.innerHTML = savedValues.parsedLevel;
        upgrade.cost.innerHTML = Math.round(upgrade.parsedCost);
        upgrade.increase.innerHTML = upgrade.parsedIncrease;
    });

    spc = JSON.parse(localStorage.getItem('spc'));
    sps = JSON.parse(localStorage.getItem('sps'));
    parsedScore = JSON.parse(localStorage.getItem('score'));
    score.innerHTML = Math.round(parsedScore);
}

setInterval(() => {
    parsedScore += sps / 20;
    score.innerHTML = Math.round(parsedScore);
    spcText.innerHTML = Math.round(spc);
    spsText.innerHTML = Math.round(sps);
}, 50)

skillsNavButton.addEventListener('click', function () {
    const upgradeContainers = document.querySelectorAll('.upgrade');
    upgradeContainers.forEach((container) => {
        if (container.classList.contains('type-upgrade')) container.style.display = 'none';
        if (container.classList.contains('type-skill')) container.style.display = 'flex';
    })
});

upgradesNavButton.addEventListener('click', function () {
    const upgradeContainers = document.querySelectorAll('.upgrade');
    upgradeContainers.forEach((container) => {
        if (container.classList.contains('type-upgrade')) container.style.display = 'flex';
        if (container.classList.contains('type-skill')) container.style.display = 'none';
    })
});

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName == 'k') incrementScore();
});

window.incrementScore = incrementScore;
window.buyUpgrade = buyUpgrade;
window.save = save;
window.load = load;