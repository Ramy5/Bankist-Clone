"use strict";

// SELECTION
const moneyIn = document.querySelector(".in");
const moneyOut = document.querySelector(".out");
const interest = document.querySelector(".interest");
const btnSort = document.querySelector(".btn-sort");
const timeOut = document.querySelector(".time-out");

// FUNCTION
// function for count deposit, withdrawl and interest money
const countMoney = function (stat) {
  // 1- money in
  const countMoneyIn = stat.movements
    .filter((st) => st > 0)
    .reduce((acc, num) => acc + num, 0);
  moneyIn.textContent = formatCurrency(countMoneyIn);

  // 2- money out
  const countMoneyOut = stat.movements
    .filter((st) => st < 0)
    .reduce((acc, num) => acc + num, 0);
  moneyOut.textContent = formatCurrency(Math.abs(countMoneyOut));

  // 3- interest
  const countInterest = countMoneyIn * (stat.interestRate / 100);
  interest.textContent = formatCurrency(countInterest);
};

// function for sot button
let sort = false;
btnSort.addEventListener("click", function () {
  createMovements(currentAccount, !sort);
  sort = !sort;
});

// function for time out
let timing;
const timer = function () {
  // I created this with seperate function in order to start by exactly 10:00 to avoid conflict
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const second = String(time % 60).padStart(2, 0);

    timeOut.textContent = `${min}:${second}`;

    if (time === 0) {
      clearInterval(timing);
      mainSection.classList.add("hidden-op");
      headName.textContent = "Log in to get started";
    }

    time--;
  };

  // initlize this variable after clear untill it arrives 00:00
  let time = 600;

  tick();
  const timing = setInterval(tick, 1000);

  return timing;
};
