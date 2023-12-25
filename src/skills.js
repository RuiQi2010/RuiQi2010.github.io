import { defaultSkills } from './defaults.js';

function createSkills() {
    const upgradeContainer = document.getElementById('upgrade-container');
    const template = document.getElementById('template').textContent;

    defaultSkills.forEach((obj) => {
        let html = template;

        Object.keys(obj).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, obj[key]);
            console.log(key);
        })
        upgradeContainer.innerHTML += html;
    });
}

createSkills();