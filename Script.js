import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut ,  onAuthStateChanged } from "./config/firebase.js";
import {collection,addDoc} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

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


const lemail = document.getElementById("login-email");
const lpas = document.getElementById("lpass");
const lbtn = document.getElementById("login-btn");

const user = document.getElementById("signup-name");
const semail = document.getElementById("signup-email");
const spas = document.getElementById("spass");
const sbtn = document.getElementById("signup-btn");



const eye = document.getElementById("eye-c")
const ey = document.getElementById("eye-cs")

const eyeOpen = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const eyeClosed = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

eye.innerHTML = eyeClosed
ey.innerHTML = eyeClosed

let isClosed = true;

eye.addEventListener('click', () => {
    if (isClosed) {
        eye.innerHTML = eyeOpen;
        ey.innerHTML = eyeOpen;
        isClosed = false;
        lpas.type = "text"
        spas.type = "text"
        
    } else {
        eye.innerHTML = eyeClosed;
        ey.innerHTML = eyeClosed;
        isClosed = true;
          lpas.type = "password"
          spas.type = "password"
    }
    
    
    
});


ey.addEventListener('click', () => {
    if (isClosed) {
        ey.innerHTML = eyeOpen;
        isClosed = false;
        spas.type = "text"
        
    } else {
        ey.innerHTML = eyeClosed;
        isClosed = true;
       spas.type = "password"
    }
});



function showLoader() {
  const loader = document.createElement("div");
  loader.innerHTML = "<span></span>";
  loader.classList.add("loader");
  document.body.appendChild(loader);
  return loader;
}

function boxes(){
  const eb = document.createElement("div");
  const ebp = document.createElement("div");
  const titlet = document.createElement("h2");

  titlet.classList.add("t");
  eb.classList.add("eb");
  ebp.classList.add("ebp");

  eb.appendChild(titlet);
  ebp.appendChild(eb);
  document.body.appendChild(ebp);

  return { ebp, eb, titlet };
}

const card = document.getElementById("card");
const lm = document.getElementById("lm");
const tn = document.getElementById("tn");
const tt = document.getElementById("tt");
const inps = document.getElementById("inps");
const fp = document.getElementById("fp");
const f = document.getElementById("f");

window.addEventListener("DOMContentLoaded", init);

function init() {

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo("#card",
    { x: 0, y: 120, z: -300, opacity: 0, scale: 0.85 },
    { x: 0, y: 0, z: 0, opacity: 1, scale: 1, duration: 0.9 }
  )

  .fromTo("#lm",
    { x: -80, y: -40, z: -150, opacity: 0 },
    { x: 0, y: 0, z: 0, opacity: 1, duration: 0.5 },
    "-=0.5"
  )

  .fromTo("#tn",
    { x: 80, y: -30, z: -120, opacity: 0 },
    { x: 0, y: 0, z: 0, opacity: 1, duration: 0.5 },
    "-=0.4"
  )

  .fromTo("#tt",
    { x: 0, y: -20, z: -100, opacity: 0, rotationX: -20 },
    { x: 0, y: 0, z: 0, opacity: 1, rotationX: 0, duration: 0.4 },
    "-=0.3"
  )

  .fromTo(".field-group",
    { x: -40, y: 30, z: -80, opacity: 0, rotationY: 10 },
    { x: 0, y: 0, z: 0, opacity: 1, rotationY: 0, duration: 0.5, stagger: 0.12 },
    "-=0.2"
  )

  .fromTo("#fp",
    { x: 0, y: 20, z: -50, opacity: 0 },
    { x: 0, y: 0, z: 0, opacity: 1, duration: 0.3 }
  )

  .fromTo("#f",
    { x: 0, y: 20, z: -50, opacity: 0 },
    { x: 0, y: 0, z: 0, opacity: 1, duration: 0.3 }
  )

  .fromTo(".btn-primary",
    { x: 0, y: 20, z: -50, opacity: 0, scale: 0.9 },
    { x: 0, y: 0, z: 0, opacity: 1, scale: 1, duration: 0.1 }
  );
}

sbtn.addEventListener("click", async () => {
  const loader = showLoader();

  try {

    const res = await createUserWithEmailAndPassword( auth,semail.value,spas.value);

    const docRef = await addDoc(collection(db, "users"), {
      uid: res.user.uid,
      email: semail.value
    });

    console.log("Document written with ID:", docRef.id);

    const ab = boxes();
    ab.titlet.innerText = "Account created Successfully";

    setTimeout(() => {
      ab.ebp.remove();
      switchTab("login");
    }, 1000);

    lemail.value = semail.value;
    lpas.value = spas.value;

    console.log(auth);
  } catch (error) {

    console.error(error);

    const ab = boxes();
    ab.titlet.innerText = "Signup Error";

    setTimeout(() => {
      ab.ebp.remove();
    }, 1000);
  } finally {
    loader.remove();
  }
});


lbtn.addEventListener("click", () => {
  const loader = showLoader();

  signInWithEmailAndPassword(auth, lemail.value, lpas.value)
    .then(() => {
      loader.remove();

      
       const ab = boxes()
       ab.titlet.innerText = "Login Successfully"

       setTimeout(() =>{
        ab.ebp.remove()
        location.href = "Dashboard.html"
       }, 1000)
      })
        

    .catch((error) => {
      loader.remove();
        
       const ab = boxes()
       ab.titlet.innerText = "Email or Password Incorrect"

       setTimeout(() =>{
        ab.ebp.remove()
       }, 1000)
    });
});

 card.style.display = "none"
const loader = showLoader();


onAuthStateChanged(auth, (user) => {
  if (user) {
   
    loader.remove();
    console.log("Welcome back");
    location.href = "Dashboard.html";
  } else {
    card.style.display = "block"
    loader.remove();
  }
});