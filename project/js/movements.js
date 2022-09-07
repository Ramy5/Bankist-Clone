"use strict";

// SELECTION
const balanceDate = document.querySelector(".date");
const balanceValue = document.querySelector(".balance-value");
const movsContainer = document.querySelector(".movement");

// 1- BALANCE
let balanceTotal;
// function for count balance value
const countBalance = function (balance) {
  balanceTotal = balance.movements.reduce((acc, bal) => acc + bal, 0);
  balanceValue.textContent = formatCurrency(balanceTotal);
};

// function for add date for today
const dateToday = function () {
  balanceDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    optionDate
  ).format(new Date());
};

// 2- MOVEMENTS
// function for create movements
const createMovements = function (mov, sort = false) {
  movsContainer.innerHTML = " ";

  const movs = sort
    ? mov.movements.slice().sort((a, b) => a - b)
    : mov.movements;

  // create elements
  movs.forEach((ele, i) => {
    // const type = movs.map((mov) => (mov > 0 ? "deposit" : "withdrawl")); // NOTE its long solution
    const type = ele > 0 ? "deposit" : "withdrawl"; // NOTE better solution

    const movsDate = new Date(mov.movementsDates[i]);

    const html = `
    <div class="movement-row flex">
      <p class="movement-type movement-type--${type}">${i + 1} ${type}</p>
      <p class="movement-date">${formatDate(movsDate)}</p>
      <p class="movement-value">${formatCurrency(ele)}</p>
    </div>
    `;

    // add movements to page
    movsContainer.insertAdjacentHTML("afterbegin", html);
  });
};
