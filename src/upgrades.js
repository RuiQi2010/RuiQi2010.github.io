import { defaultUpgrades } from './defaults.js';

function createUpgrades() {
    const upgradeContainer = document.getElementById('upgrade-container');
    const template = document.getElementById('template').textContent;

    defaultUpgrades.forEach((obj) => {
        let html = template;

        Object.keys(obj).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, obj[key]);
            console.log(key);
        })
        upgradeContainer.innerHTML += html;
    });
}

createUpgrades();

export const upgrades = [
    {
        name: '黑笔',
        internalName: 'pen',
        cost: document.querySelector('.pen-cost'),
        parsedCost: parseFloat(document.querySelector('.pen-cost').innerHTML),
        level: document.querySelector('.pen-level'),
        increase: document.querySelector('.pen-increase'),
        parsedIncrease: parseFloat(document.querySelector('.pen-increase').innerHTML),
        powerups: [
            {
                desc: "你不懂",
                mult: 2
            },
            {
                desc: "你不明白",
                mult: 3
            },
            {
                desc: "你不理解",
                mult: 4
            },
            {
                desc: "你不了解",
                mult: 5
            },
            {
                desc: "你不清楚",
                mult: 6
            },
            {
                desc: "你根本不知道",
                mult: 7
            }
        ],
        power: 0,
        scoreMpr: 1.025,
        costMpr: 1.12
    },
    {
        name: '鼠标',
        internalName: 'mouse',
        cost: document.querySelector('.mouse-cost'),
        parsedCost: parseFloat(document.querySelector('.mouse-cost').innerHTML),
        level: document.querySelector('.mouse-level'),
        increase: document.querySelector('.mouse-increase'),
        parsedIncrease: parseFloat(document.querySelector('.mouse-increase').innerHTML),
        powerups: [
            {
                desc: "提升卡位",
                mult: 2.1
            },
            {
                desc: "提升操作",
                mult: 3.1
            },
            {
                desc: "提升效率",
                mult: 4.1
            },
            {
                desc: "提升能力",
                mult: 5.1
            },
            {
                desc: "提升产量",
                mult: 6.1
            },
            {
                desc: "质的飞跃",
                mult: 7.1
            }
        ],
        power: 0,
        scoreMpr: 1.03,
        costMpr: 1.14514
    },
    {
        name: '机械臂',
        internalName: 'arm',
        cost: document.querySelector('.arm-cost'),
        parsedCost: parseFloat(document.querySelector('.arm-cost').innerHTML),
        level: document.querySelector('.arm-level'),
        increase: document.querySelector('.arm-increase'),
        parsedIncrease: parseFloat(document.querySelector('.arm-increase').innerHTML),
        powerups: [
            {
                desc: "进行充电",
                mult: 2.2
            },
            {
                desc: "进行高级充电",
                mult: 3.2
            },
            {
                desc: "进行超级充电",
                mult: 4.2
            },
            {
                desc: "进行特级充电",
                mult: 5.2
            },
            {
                desc: "进行顶级充电",
                mult: 6.2
            },
            {
                desc: "进行终极充电",
                mult: 7.2
            }
        ],
        power: 0,
        scoreMpr: 1.035,
        costMpr: 1.11
    },
    {
        name: '打印机',
        internalName: 'printer',
        cost: document.querySelector('.printer-cost'),
        parsedCost: parseFloat(document.querySelector('.printer-cost').innerHTML),
        level: document.querySelector('.printer-level'),
        increase: document.querySelector('.printer-increase'),
        parsedIncrease: parseFloat(document.querySelector('.printer-increase').innerHTML),
        powerups: [
            {
                desc: "双面打印",
                mult: 2.3
            },
            {
                desc: "小字打印",
                mult: 3.3
            },
            {
                desc: "纳米打印",
                mult: 4.3
            },
            {
                desc: "3D打印",
                mult: 5.3
            },
            {
                desc: "超现实打印",
                mult: 6.3
            },
            {
                desc: "打印机的极限",
                mult: 7.3
            }
        ],
        power: 0,
        scoreMpr: 1.045,
        costMpr: 1.105
    },
    {
        name: '工厂',
        internalName: 'factory',
        cost: document.querySelector('.factory-cost'),
        parsedCost: parseFloat(document.querySelector('.factory-cost').innerHTML),
        level: document.querySelector('.factory-level'),
        increase: document.querySelector('.factory-increase'),
        parsedIncrease: parseFloat(document.querySelector('.factory-increase').innerHTML),
        powerups: [
            {
                desc: "WORK!",
                mult: 2.5
            },
            {
                desc: "WORK! WORK!",
                mult: 3.5
            },
            {
                desc: "WATCH OUT!",
                mult: 4.5
            },
            {
                desc: "SHOW IT, BEN!!!",
                mult: 5.5
            },
            {
                desc: "A#$%^&*@??!",
                mult: 10
            },
            {
                desc: "我的世界",
                mult: 10000
            }
        ],
        power: 0,
        scoreMpr: 1.055,
        costMpr: 1.1
    }
]

export const powerupIntervals = [10, 20, 40, 60, 80, 100];