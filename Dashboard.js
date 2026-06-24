// Impoet from firebase.js
import { auth, signOut } from "./config/firebase.js";

//load Dom
document.addEventListener("DOMContentLoaded", () => {
  console.log("SCRIPT STARTED");


  //Select Dom
  const logout = document.getElementById("logout");
  const aside = document.querySelector("aside");
  const openBtn = document.getElementById("open");
  const plus = document.getElementById("pbtn");
  const post = document.getElementById("postbtn");
  const welcome = document.getElementById("wel");
  const feeds = document.getElementById("feeds");
  feeds.classList.add("feeds")

  const parent = document.getElementById("postModal");
  const box = parent.querySelector(".postbox");


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

  if (!parent) {
    console.error("postModal not found");
    return;
  }

  const title = document.createElement("h2");
  title.className = "text";
  title.textContent = "UPLOAD POST";

  const txt = document.createElement("input");
  txt.className = "txtinp";       
  txt.placeholder = "Enter post title...";

  const textarea = document.createElement("textarea");
  textarea.className = "post-textarea";
  textarea.placeholder = "What's on your mind?";

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.id = "file-upload";
  fileInput.required;
  fileInput.style.display = "none";

  const mainup = document.createElement("div");
  mainup.className = "mainup";

  const uploadLabel = document.createElement("label");
  uploadLabel.setAttribute("for", "file-upload");
  uploadLabel.className = "upload-label";
  uploadLabel.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Upload Media';

  const prew = document.createElement("img");
  prew.className = "prew";

  const uploadbtn = document.createElement("button");
  uploadbtn.className = "uploadbtn";
  uploadbtn.textContent = "Upload";

  mainup.appendChild(uploadLabel);
  mainup.appendChild(prew);

  box.appendChild(title);
  box.appendChild(mainup);
  box.appendChild(txt);
  box.appendChild(textarea);
  box.appendChild(fileInput);
  box.appendChild(uploadbtn);

  let selectedFile = "";



function showWelcome(show) {
  if (!welcome) return;

  if (show) {
    welcome.classList.add("active");
  } else {
    welcome.classList.remove("active");
  }
}

  
  

  logout?.addEventListener("click", async () => {
    await signOut(auth);
    location.href = "index.html";
  });

  openBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    aside?.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (aside && !aside.contains(e.target) && !openBtn.contains(e.target)) {
      aside.classList.remove("active");
    }
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      selectedFile = reader.result;
      prew.src = selectedFile;
      prew.classList.add("active");
    };
    reader.readAsDataURL(file);
  });

  if(fileInput.length === 0){
    alert("hi")
  }

  function openModal() {
    console.log("modal clicked");
    parent.classList.toggle("open");
    showWelcome(false)
  }

  function closeModal() {
    parent.classList.remove("open");
    txt.value = "";
    textarea.value = "";
    fileInput.value = "";
    selectedFile = "";
    prew.src = "";
    prew.classList.remove("active");
  }

  post?.addEventListener("click", openModal);
  plus?.addEventListener("click", openModal);

  console.log(post);
  

   document.addEventListener("click", (e) => {
   if (!parent.classList.contains("open")) return;
     if (box.contains(e.target)) return;
     if (post.contains(e.target)) return;
     if (plus.contains(e.target)) return;
    closeModal();
    showWelcome(false)
    loadPosts()
  });


function loadPosts() {
  let posts = [];

  try {
    posts = JSON.parse(localStorage.getItem("posts")) || [];
  } catch (err) {
    posts = [];
  }

  console.log(document.getElementById("wel"));
  

 feeds.innerHTML = ""
  
   if (!posts.length) {
    showWelcome(true);
    
}else{
  showWelcome(false)
  plus.style.display = "flex";
  
}

  posts.forEach((data , index) => {
    const postEl = document.createElement("div");
    postEl.className = "feed-post";

    if (data.image) {
      const img = document.createElement("img");
      img.src = data.image;
      img.className = "feed-post-img";
      postEl.appendChild(img);
    }

    const content = document.createElement("div");
    content.className = "feed-post-content";

    const h3 = document.createElement("h3");
    h3.className = "feed-post-title";
    h3.textContent = data.title || "Untitled Post";

    content.appendChild(h3);

    if (data.description?.trim()) {
      const p = document.createElement("p");
      p.className = "feed-post-desc";
      p.textContent = data.description;
      content.appendChild(p);
    }

    const dbp = document.createElement("div")
    dbp.className = "dbp"

    const delbtn = document.createElement("button")
    delbtn.className = "dbtn"
    delbtn.textContent = "Delet"
   

delbtn.addEventListener("click", () => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.splice(index, 1);

  localStorage.setItem("posts", JSON.stringify(posts));

  loadPosts();
});
   
 dbp.appendChild(delbtn)
    content.appendChild(dbp)
    postEl.appendChild(content);
    feeds.appendChild(postEl);
  });
}


uploadbtn.addEventListener("click", () => {
  if (!txt.value.trim()) {
    txt.focus();
    return;
  }

  if (!fileInput.files.length) {
     const ab = boxes();
    ab.titlet.innerText = "Please Select Media";

    
    setTimeout(() => {
      ab.ebp.remove();
      
    }, 1000);

    return;
  }

    const data = {
      title: txt.value,
      description: textarea.value,
      image: selectedFile
    };

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(data);
    localStorage.setItem("posts", JSON.stringify(posts));

    closeModal();
    loadPosts();
  });


  
  
  loadPosts();
});

