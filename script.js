let score = document.querySelector('#score');
let clickpower = document.querySelector('#clickpower');

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

function hset(element, value) {
    element.innerHTML = value;
}

function hadd(element, value) {
    element.innerHTML = hval(element) + value;
}

function buyGeneric(i, mpr, handler=function() {}) {
    var cost = hget(i + "c");
    if (hval(score) >= hval(cost)) {
        hadd(score, -hval(cost));
        hset(cost, Math.ceil(hval(cost) * mpr));
        handler();
        hadd(hget(i + "s"), 1);
        if (hval(score) < hval(cost)) hget(i).classList.remove("upgradable");
    }
}

function buy(index, handler=function() {}) {
    buyGeneric(index.toString(), mprs[index], handler);
}

function checkUpgradable(i) {
    if (hval(score) >= hval(hget(i.toString() + "c"))) hget(i.toString()).classList.add("upgradable");
}

function increment(num=0) {
    if (num == 0) score.innerHTML = hval(score) + hval(clickpower);
    else score.innerHTML = hval(score) + num;
}

setInterval(function() {
    for (let i = 0; i < mprs.length; i++) {
        checkUpgradable(i);
        if (hval(hget(i.toString() + "s")) && i) increment(powers[i] * hval(hget(i.toString() + "s")));
    }
}, 50); 