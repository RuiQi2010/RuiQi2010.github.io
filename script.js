let score = document.querySelector('#score');
let clickpower = document.querySelector('#clickpower');
var currentActiveElement = document.getElementById('base');
let cotton = document.querySelector('#cs');

var mprs = [1.1, 1.2, 1.3, 1.4];
var powers = [0, 5, 100, 2000];
var cottonlimit = 330000;

function incrementClickPower() {
    clickpower.innerHTML = hval(clickpower) + 1;
}

function hget(id) {
    return document.getElementById(id);
}

function switchThing(inactiveid) {
    currentActiveElement.classList.add('inactive');
    currentActiveElement = document.getElementById(inactiveid);
    document.getElementById(inactiveid).classList.remove('inactive');
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
    }
}

function buy(index, handler=function() {}) {
    buyGeneric(index.toString(), mprs[index], handler);
}

function buyCotton() {
    buyGeneric("c", 1.716);
}

function checkUpgradableRaw(i) {
    if (hval(score) >= hval(hget(i + "c"))) hget(i).classList.add("upgradable");
    else if (hget(i).classList.contains("upgradable")) hget(i).classList.remove("upgradable");
}

function checkUpgradable(i) {
    checkUpgradableRaw(i.toString());
}

function increment(num=0) {
    if (num == 0) score.innerHTML = hval(score) + hval(clickpower);
    else score.innerHTML = hval(score) + num;
}

setInterval(function() {
    if (hval(score) >= cottonlimit) {
        document.getElementById("menu-cotton").classList.remove('inactive');
    } if (hval(score) >= 10) {
        document.getElementById("menu-base").classList.remove('inactive');
    }
    checkUpgradableRaw("c");
    for (let i = 0; i < mprs.length; i++) {
        checkUpgradable(i);
        if (hval(hget(i.toString() + "s")) && i) increment(powers[i] * hval(hget(i.toString() + "s")) * (hval(hget("cs")) + 1));
    }
}, 50);