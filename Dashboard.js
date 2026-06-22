import { auth, signOut } from "./config/firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const logout = document.getElementById("logout");
  const aside = document.querySelector("aside");
  const openBtn = document.getElementById("open");
  const plus = document.getElementById("pbtn");
  const post = document.getElementById("postbtn");
  const welcome = document.getElementById("wel");
  const mainFeed = document.querySelector("main");

  const parent = document.createElement("div");
  parent.classList.add("postparent");

  const box = document.createElement("div");
  box.classList.add("postbox");

  const text = document.createElement("h2");
  text.classList.add("text");
  text.textContent = "UPLOAD POST";

  const txt = document.createElement("input");
  txt.type = "text";
  txt.placeholder = "Enter post title...";
  txt.classList.add("txtinp");

  const textarea = document.createElement("textarea");
  textarea.placeholder = "What's on your mind?";
  textarea.classList.add("post-textarea");

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.id = "file-upload";
  fileInput.style.display = "none";
  fileInput.required

  const mainup = document.createElement("div");
  mainup.classList.add("mainup");

  const uploadLabel = document.createElement("label");
  uploadLabel.setAttribute("for", "file-upload");
  uploadLabel.classList.add("upload-label");
  uploadLabel.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Upload Media';

  const prew = document.createElement("img");
  prew.classList.add("prew");

  const uploadbtn = document.createElement("button");
  uploadbtn.type = "button";
  uploadbtn.classList.add("uploadbtn");
  uploadbtn.innerHTML = '<i class="fa-solid fa-upload"></i> Upload';

  mainup.appendChild(uploadLabel);
  mainup.appendChild(prew);

  box.appendChild(text);
  box.appendChild(mainup);
  box.appendChild(txt);
  box.appendChild(textarea);
  box.appendChild(fileInput);
  box.appendChild(uploadbtn);

  parent.appendChild(box);
  document.body.appendChild(parent);

  let selectedFileUrl = "";

  logout?.addEventListener("click", async () => {
    try {
      await signOut(auth);
      location.href = "index.html";
    } catch (error) {
      console.log(error);
    }
  });

  openBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    aside?.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (aside && !aside.contains(e.target)) {
      aside.classList.remove("active");
    }
  });


fileInput.addEventListener("change", () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  selectedFileUrl = URL.createObjectURL(file);
  prew.src = selectedFileUrl;
  prew.classList.add("active");
});

  function openPostBox() {
    parent.classList.add("open");
    if (welcome) welcome.style.display = "none";
  }



  function resetForm() {
    parent.classList.remove("open");
    prew.src = "";
    prew.classList.remove("active");
    txt.value = "";
    textarea.value = "";
    fileInput.value = "";
    selectedFileUrl = "";
    if (welcome) welcome.style.display = "flex";
  }

  post?.addEventListener("click", openPostBox);


  plus?.addEventListener("click", openPostBox);
  

document.addEventListener("click", (e) => {
  if (!parent.classList.contains("open")) return;

  if (box.contains(e.target)) return;
  if (post?.contains(e.target)) return;
  if (plus?.contains(e.target)) return;

  resetForm();
});


uploadbtn.addEventListener("click", () => {
  if (!fileInput.files.length) {
    fileInput.click();
    return;
  }

  if (!txt.value.trim()) {
    txt.focus();
    return;
  }

    if (!mainFeed) return;

    const mainpost = document.createElement("div");
    mainpost.classList.add("feed-post");

    if (selectedFileUrl) {
      const postsimg = document.createElement("img");
      postsimg.src = selectedFileUrl;
      postsimg.classList.add("feed-post-img");
      mainpost.appendChild(postsimg);
    }

    const postContentBox = document.createElement("div");
    postContentBox.classList.add("feed-post-content");

    const postTitle = document.createElement("h3");
    postTitle.classList.add("feed-post-title");
    postTitle.textContent = txt.value;

    postContentBox.appendChild(postTitle);

    if (textarea.value.trim()) {
      const postDesc = document.createElement("p");
      postDesc.classList.add("feed-post-desc");
      postDesc.textContent = textarea.value;
      postContentBox.appendChild(postDesc);
    }

    mainpost.appendChild(postContentBox);

    const wel = document.getElementById("wel");
    if (wel) wel.remove();

    mainFeed.appendChild(mainpost);

    if (plus) plus.style.display = "flex";

    resetForm();
  });
});