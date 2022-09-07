"use strict";

// SELECTION
const transferTo = document.querySelector(".transfer-to");
const transferAmount = document.querySelector(".transfer-amount");
const transferBtn = document.querySelectorAll(".btn")[1];
const labelsTranfer = document.querySelectorAll(".label");
const loanAmount = document.querySelector(".loan-amount");
const loanBtn = document.querySelectorAll(".btn")[2];
const labelLoan = document.querySelector(".label-loan");
const closeConfirmUser = document.querySelector(".close-confirm-user");
const closeConfirmPin = document.querySelector(".close-confirm-pin");
const closeLabelUser = document.querySelector(".label-close-1");
const closeLabelPin = document.querySelector(".label-close-2");
const closeBtn = document.querySelectorAll(".btn")[3];

// NOTE TRANSFER OPERATION
transferBtn.addEventListener("click", function (e) {
  e.preventDefault();

  /////// NOTE DRY concept does not apply here ////////
  // reset labels when typing again
  transferTo.addEventListener("input", function () {
    labelsTranfer[0].textContent = "Transfer to";
    labelsTranfer[0].style.color = "#333";
  });

  transferAmount.addEventListener("input", function () {
    labelsTranfer[1].textContent = "Amount";
    labelsTranfer[1].style.color = "#333";
  });

  const accTransfer = accounts.find((acc) => acc.nickName === transferTo.value);

  // check if the account is exist
  if (
    +transferAmount.value > 0 &&
    accTransfer &&
    +balanceTotal > +transferAmount.value &&
    accTransfer !== currentAccount &&
    transferAmount.value !== ""
  ) {
    done.play();
    // push amount and date to currentAccount movements
    currentAccount.movements.push(-transferAmount.value);
    currentAccount.movementsDates.push(new Date().toISOString());

    // push amount and date to accTransfer movements
    accTransfer.movements.push(+transferAmount.value);
    accTransfer.movementsDates.push(new Date().toISOString());

    // update UI
    updateUI();

    transferAmount.value = transferTo.value = "";
    transferAmount.blur();

    // reset timing
    clearInterval(timing);
    timing = timer();

    /////// NOTE DRY concept does not apply here ////////
  } else if (!accTransfer) {
    wrong.play();
    labelsTranfer[0].textContent = "Wong user!";
    labelsTranfer[0].style.color = "#f00";
  } else if (+balanceTotal < +transferAmount.value) {
    wrong.play();
    labelsTranfer[1].textContent = "No money enough!";
    labelsTranfer[1].style.color = "#f00";
  } else if (accTransfer === currentAccount) {
    wrong.play();
    labelsTranfer[0].textContent = "Cuurent account!";
    labelsTranfer[0].style.color = "#f00";
  } else if (+transferAmount.value <= 0) {
    wrong.play();
    labelsTranfer[1].textContent = "Amount <= 0!";
    labelsTranfer[1].style.color = "#f00";
  }
});

// NOTE LOAN OPERATION
loanBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // reset labels when typing again
  loanAmount.addEventListener("input", function () {
    labelLoan.textContent = "Amount";
    labelLoan.style.color = "#333";
  });

  const amount = Math.floor(loanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    done.play();
    setTimeout(() => {
      // push amount and date to currentAccount movements
      currentAccount.movements.push(+amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      // reset timing
      clearInterval(timing);
      timing = timer();

      // updateUI
      updateUI();
    }, 3000);

    loanAmount.value = "";
    loanAmount.blur();
  } else if (amount <= 0) {
    wrong.play();
    labelLoan.textContent = "Wrong value!";
    labelLoan.style.color = "#f00";
  }
});

// NOTE close account
closeBtn.addEventListener("click", function (e) {
  e.preventDefault();

  /////// NOTE DRY concept does not apply here ////////
  // reset labels when typing again
  closeConfirmUser.addEventListener("input", function () {
    closeLabelUser.textContent = "Confirm User";
    closeLabelUser.style.color = "#333";
  });
  // reset labels when typing again
  closeConfirmPin.addEventListener("input", function () {
    closeLabelPin.textContent = "Confirm PIN";
    closeLabelPin.style.color = "#333";
  });

  // check if the account is exist
  if (
    currentAccount.nickName === closeConfirmUser.value &&
    currentAccount.pin === +closeConfirmPin.value
  ) {
    close.play();
    const index = accounts.findIndex(
      (acc) => acc.nickName === closeConfirmUser.value
    );

    // remove current account from accounts
    accounts.splice(index, 1);

    // hide UI
    mainSection.classList.add("hidden-op");

    headName.textContent = "Log in to get started";

    closeConfirmUser.value = closeConfirmPin.value = "";
    closeConfirmPin.blur();

    // reset timing
    clearInterval(timing);
    timing = timer();

    /////// NOTE DRY concept does not apply here ////////
  } else if (currentAccount.nickName !== closeConfirmUser.value) {
    wrong.play();
    closeLabelUser.textContent = "Wrong user!";
    closeLabelUser.style.color = "#f00";
  } else if (currentAccount.pin !== +closeConfirmPin.value) {
    wrong.play();
    closeLabelPin.textContent = "Wrong PIN!";
    closeLabelPin.style.color = "#f00";
  }
});
