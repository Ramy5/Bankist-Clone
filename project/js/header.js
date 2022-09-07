"use strict";

// SELECTION
const headName = document.querySelector(".start");
const loginUser = document.querySelector(".login--user");
const loginPin = document.querySelector(".login--pin");
const btnLogin = document.querySelectorAll(".btn")[0];
const labelUser = document.querySelector(".wrong-u");
const labelPin = document.querySelector(".wrong-p");
const mainSection = document.querySelector(".main");
//SOUNDS
let wrong = new Audio("sounds/wrong.wav");
wrong.volume = 0.5;
let done = new Audio("sounds/done.wav");
done.volume = 0.5;
let correctLogin = new Audio("sounds/correct-login.mp3");
correctLogin.volume = 0.5;
let close = new Audio("sounds/close-account.mp3");
close.volume = 0.5;

let currentAccount;

// FUNCTION
// function for heading name formating (start)
const createUserName = function () {
  accounts.forEach((acc) => {
    acc.nickName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((n) => n[0])
      .join("");
  });
};
createUserName(accounts);

// function when click login
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find((acc) => acc.nickName === loginUser.value);

  if (currentAccount?.pin === +loginPin.value) {
    correctLogin.play();
    mainSection.classList.remove("hidden-op");
    labelPin.classList.add("hidden");
    // create welcome headName
    headName.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    // update UI
    updateUI();

    // timeout function
    if (timing) clearInterval(timing);
    timing = timer();
  } else {
    wrong.play();
    labelPin.classList.remove("hidden");
  }

  loginPin.value = loginUser.value = "";
  loginPin.blur();
});
