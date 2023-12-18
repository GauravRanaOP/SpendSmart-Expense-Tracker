//Created By Gaurav Rana, 8936697

"use strict";

const error = (value, message) => {
  $("<h4>" + message + "</h4>").insertAfter(value);
  // console.log("<h4>" + message + "</h4>");
  // console.log(value);
  $(value).css("border", "1px solid #ff3860");
};

let arrayname = [];

let istrue = true;
let username = "";
let email = "";
let password = "";
let password2 = "";
const validateInputs = () => {
  username = $("#username").val();
  email = $("#email").val();
  password = $("#password").val();
  password2 = $("#password2").val();

  let validationarray = [];

  //Username validation
  if (username == "") {
    istrue = false;
    error("#username", "Username is required");
  } else {
    $("#username").css("border", "1px solid green");
  }

  validationarray = JSON.parse(localStorage.getItem("array"));
  if (validationarray != null || validationarray != undefined) {
    for (let i = 0; i < validationarray.length; i++) {
      const local = JSON.parse(validationarray[i]);
      if (username == Object.values(local)[0]) {
        error("#username", "Username already taken");
        break;
      }
    }
  }

  //email validation
  var emailpattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
  if (email == "") {
    istrue = false;
    error("#email", "Email is required");
  } else if (!emailpattern.test(email)) {
    istrue = false;
    error("#email", "Email not valid");
  } else {
    $("#email").css("border", "1px solid green");
  }

  validationarray = JSON.parse(localStorage.getItem("array"));
  if (validationarray != null || validationarray != undefined) {
    for (let i = 0; i < validationarray.length; i++) {
      const local = JSON.parse(validationarray[i]);
      if (email == Object.values(local)[1]) {
        error("#email", "Email Already exist");
        break;
      }
    }
  }
  //password validation
  var pwpattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (password == "") {
    istrue = false;
    error("#password", "Password is required");
  } else if (!password.length < 6 && !password.match(pwpattern)) {
    istrue = false;
    error(
      "#password",
      "Password must bebetween 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
    );
  } else {
    $("#password").css("border", "1px solid green");
  }

  //confirm password validation
  if (password2 == "") {
    istrue = false;
    error("#password2", "Confirm password is required");
  } else if (password2 != password) {
    istrue = false;
    error("#password2", "Password do not match");
  } else {
    $("#password2").css("border", "1px solid green");
  }
};

// localstorage array inputs
const storearray = (username, email, password) => {

  if (localStorage.getItem("array")) {
    arrayname = JSON.parse(localStorage.getItem("array"));
  }

  let object = { username: username, email: email, password: password };
  object = JSON.stringify(object);

  arrayname.push(object);

  return arrayname;
};

let apparray = new Array();
$(document).ready(() => {
  $("#signup").on("click", (evt) => {
    evt.preventDefault();
    $("h4").remove();
    validateInputs();
    if (istrue) {
      apparray = storearray(username, email, password);

      // JSON.stringify
      localStorage.setItem("array", JSON.stringify(apparray));
      window.location.assign("signin.html");
    }
    istrue = true;
  });

  $("#signin").on("click", () => {
    window.location.assign("signin.html");
  });
});
