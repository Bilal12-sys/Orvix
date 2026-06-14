import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./config/firebase.js";

const tabLogin = document.getElementById("tab-login");
const tabSignup = document.getElementById("tab-signup");
const panelLogin = document.getElementById("panel-login");
const panelSignup = document.getElementById("panel-signup");

tabLogin.addEventListener("click", () => switchTab("login"));
tabSignup.addEventListener("click", () => switchTab("signup"));

document.getElementById("go-signup").addEventListener("click", (e) => {
  e.preventDefault();
  switchTab("signup");
});
document.getElementById("go-login").addEventListener("click", (e) => {
  e.preventDefault();
  switchTab("login");
});

function switchTab(tab) {
  panelLogin.classList.toggle("active", tab === "login");
  panelSignup.classList.toggle("active", tab === "signup");
  tabLogin.classList.toggle("active", tab === "login");
  tabSignup.classList.toggle("active", tab === "signup");
}

const eyeOpen = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const eyeClosed = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

const lemail = document.getElementById("login-email");
const lpas = document.getElementById("lpass");
const lbtn = document.getElementById("login-btn");

const user = document.getElementById("signup-name");
const semail = document.getElementById("signup-email");
const spas = document.getElementById("spass");
const sbtn = document.getElementById("signup-btn");

function showLoader() {
  const loader = document.createElement("div");
  loader.innerHTML = "<span></span>";
  loader.classList.add("loader");
  document.body.appendChild(loader);
  return loader;
}

sbtn.addEventListener("click", () => {
  const loader = showLoader();

  createUserWithEmailAndPassword(auth, semail.value, spas.value)
    .then((res) => {
      loader.remove();
      Swal.fire({
        title: "Account Created Successfully",
        icon: "success",
      });
      switchTab("login");
      lemail.value = semail.value;
      lpas.value = spas.value;
    })
    .catch((error) => {
      loader.remove();
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message,
      });
    });
});

lbtn.addEventListener("click", () => {
  const loader = showLoader();

  signInWithEmailAndPassword(auth, lemail.value, lpas.value)
    .then(() => {
      loader.remove();
      Swal.fire({
        title: "Login Successful",
        icon: "success",
      }).then(() => {
        location.href = "Dashboard.html";
      });
    })
    .catch((error) => {
      loader.remove();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email or password incorrect!",
      });
    });
});