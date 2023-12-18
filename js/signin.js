//Created By Gaurav Rana, 8936697

"use strict";

const error = (value, message) => {
  $("<h4>" + message + "</h4>").insertAfter(value);
  $(value).css("border", "1px solid #ff3860");
};

let istrue = true;
//validation
const validateInputs = () => {
  const username = $("#username").val();
  const password = $("#password").val();

  let validationarray = [];

  //Username validation
  let userexist = true;
  if (username == "") {
    istrue = false;
    error("#username", "Username is required");
    userexist = false;
  } else {
    $("#username").css("border", "1px solid green");
  }

  validationarray = JSON.parse(localStorage.getItem("array"));
  if (userexist) {
    const nameExistLocal = [];
    for (let i = 0; i < validationarray.length; i++) {
      const local = JSON.parse(validationarray[i]);
      nameExistLocal.push(Object.values(local)[0]);
    }
    if (nameExistLocal.includes(username)) {
      $("#username").css("border", "1px solid green");
    } else {
      istrue = false;
      error("#username", "A User with this Username doesn't exist");
    }
  }

  //password validation
  let passwordexist = true;

  if (password == "") {
    istrue = false;
    error("#password", "Password is required");
    passwordexist = false;
  } else {
    $("#password").css("border", "1px solid green");
  }

  if (passwordexist) {
    const pwdExistLocal = [];
    const map = new Map();
    for (let i = 0; i < validationarray.length; i++) {
      const local = JSON.parse(validationarray[i]);
      pwdExistLocal.push(Object.values(local)[2]);
      map.set(Object.values(local)[0], Object.values(local)[2]);
    }

    if (map.has(username)) {
      const nameForPwdValid = map.get(username);
      if (password == nameForPwdValid) {
        $("#password").css("border", "1px solid green");
      } else {
        istrue = false;
        error("#password", "Incorrect Password");
      }
    }
  }
};

$(document).ready(() => {
  $("#signin").on("click", (evt) => {
    evt.preventDefault();
    $("h4").remove();
    validateInputs();
    if (istrue) {
      window.location.assign("home.html");
    }
    istrue = true;
  });

  $("#signup").on("click", () => {
    window.location.assign("signup.html");
  });
});
