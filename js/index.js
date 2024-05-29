let allUserInfo = [];
let regForm = document.querySelector(".reg-form");
let allInput = regForm.querySelectorAll("input");
let regBtn = regForm.querySelector("button");
let loginForm = document.querySelector(".login-form");
let allLoginInput = loginForm.querySelectorAll("input");
let loginBtn = loginForm.querySelector("button");

if (localStorage.getItem("allUserInfo") != null) {
  allUserInfo = JSON.parse(localStorage.getItem("allUserInfo"));
}
// signup
regForm.onsubmit = (e) => {
  e.preventDefault();
  let checkEmail = allUserInfo.find((data) => {
    return data.email.toLowerCase() == allInput[4].value.toLowerCase();
  });
  console.log(checkEmail);
  if (checkEmail == undefined) {
    let data = {};
    for (ele of allInput) {
      let key = ele.name;
      data[key] = ele.value;
    }
    regBtn.innerText = "Processing...";
    setTimeout(() => {
      regBtn.innerText = "Register";
      allUserInfo.push(data);
      localStorage.setItem("allUserInfo", JSON.stringify(allUserInfo));
      swal("Good Job !", "Registration Success !", "success");
      regForm.reset("");
    }, 2000);
  } else {
    swal("Failed !", "Email aleady registered !", "warning");
  }
};
//login
loginForm.onsubmit = (e) => {
  e.preventDefault();
  let checkEmail = allUserInfo.find((data) => {
    return data.email.toLowerCase() == allLoginInput[0].value.toLowerCase();
  });
  if (checkEmail != undefined) {
    if (checkEmail.password == allLoginInput[1].value) {
      loginBtn.innerHTML = "Please wait...";
      setTimeout(() => {
        loginBtn.innerText = "Login";
        window.location = "../profile/profile.html";
        checkEmail.password = "........";
        sessionStorage.setItem("__auth__", JSON.stringify(checkEmail));
      }, 2000);
    } else {
      swal("warning", "wrong password", "warning");
    }
  } else {
    swal("warning", "wrong username", "warning");
  }
};
