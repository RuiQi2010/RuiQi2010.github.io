let score = document.querySelector('#score');
let clickpower = document.querySelector('#clickpower');

var identifiers = ["pen", "ming", "liang", "lihua"];
var mprs = [1.1, 1.2, 1.3, 1.4];
var powers = [0, 5, 100, 2000];

function incrementClickPower() {
    clickpower.innerHTML = hval(clickpower) + 1;
}

function hget(id) {
    return document.getElementById(id);
}

function hval(element) {
    return parseInt(element.innerHTML);
}

function buyGeneric(identifier, mpr, handler=function() {}) {
    var cost = hget(identifier + "-cost");
    if (hval(score) >= hval(cost)) {
        score.innerHTML = hval(score) - hval(cost);
        cost.innerHTML = Math.ceil(hval(cost) * mpr);
        handler();
        hget(identifier + "s").innerHTML = hval(hget(identifier + "s")) + 1;
        if (hval(score) < hval(cost)) hget(identifier).classList.remove("upgradable");
    }
}

function buy(index, handler=function() {}) {
    buyGeneric(identifiers[index], mprs[index], handler);
}

function checkUpgradable(identifier) {
    if (hval(score) >= hval(hget(identifier + "-cost"))) hget(identifier).classList.add("upgradable");
}

function increment(num=0) {
    if (num == 0) score.innerHTML = hval(score) + hval(clickpower);
    else score.innerHTML = hval(score) + num;
}

setInterval(function() {
    for (let i = 0; i < identifiers.length; i++) {
        checkUpgradable(identifiers[i]);
        if (hval(hget(identifiers[i] + "s")) && i) increment(powers[i] * hval(hget(identifiers[i] + "s")));
    }
}, 50); 