const aside = document.querySelector('aside');
const openBtn = document.getElementById('open');

if (openBtn) {
    openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        aside.classList.toggle('active');
    });
}

document.addEventListener('click', (e) => {
    if (!aside.contains(e.target) && aside.classList.contains('active')) {
        aside.classList.remove('active');
    }
});

const post = document.getElementById("postbtn");
const welcome = document.getElementById("wel");

const parent = document.createElement("div");
const box = document.createElement("div");

const text = document.createElement("h2");
text.innerText = "UPLOAD POST";
text.classList.add("text");

const txt = document.createElement("input");
txt.type = "text";
txt.placeholder = "Enter post title...";
txt.required = true;
txt.classList.add("txtinp");

const textarea = document.createElement("textarea");
textarea.placeholder = "What's on your mind?";
textarea.classList.add("post-textarea");

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.id = "file-upload";
fileInput.accept = "image/*";
fileInput.style.display = "none";

const mainup = document.createElement("div");
mainup.classList.add("mainup");

const uploadLabel = document.createElement("label");
uploadLabel.setAttribute("for", "file-upload");
uploadLabel.classList.add("upload-label");
uploadLabel.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Upload Media';

const uploadbtn = document.createElement("button");
uploadbtn.innerHTML = '<i class="fa-solid fa-upload"></i> Upload';
uploadbtn.classList.add("uploadbtn");

const prew = document.createElement("img");
prew.classList.add("prew");

box.appendChild(text);
mainup.appendChild(uploadLabel);
mainup.appendChild(prew);
box.appendChild(mainup);
box.appendChild(txt);
box.appendChild(textarea);
box.appendChild(fileInput);
box.appendChild(uploadbtn);

parent.classList.add("postparent");
box.classList.add("postbox");

parent.appendChild(box);
document.body.appendChild(parent);

let selectedFileUrl = "";

fileInput.addEventListener("change", function() {
    const file = this.files[0];
    if (file) {
        selectedFileUrl = URL.createObjectURL(file);
        prew.src = selectedFileUrl;
        prew.classList.add("active");
    }
});

post.addEventListener("click", () => {
    parent.classList.add("open");
    if (document.getElementById("wel")) {
        welcome.style.display = "none";
    }
});

function resetForm() {
    parent.classList.remove("open");
    if (document.getElementById("wel")) {
        welcome.style.display = "flex";
    }
    prew.src = "";
    prew.classList.remove("active");
    fileInput.value = "";
    txt.value = "";
    textarea.value = "";
    selectedFileUrl = "";
}

document.addEventListener("click", (e) => {
    if (
        !box.contains(e.target) &&
        !post.contains(e.target) &&
        parent.classList.contains("open")
    ) {
        resetForm();
    }
});

uploadbtn.addEventListener('click', () => {
    if (!txt.value.trim()) {
        txt.focus();
        return;
    }

    const mainFeed = document.querySelector("main");
    
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
    postTitle.innerText = txt.value;
    postTitle.classList.add("feed-post-title");
    postContentBox.appendChild(postTitle);

    if (textarea.value.trim()) {
        const postDesc = document.createElement("p");
        postDesc.innerText = textarea.value;
        postDesc.classList.add("feed-post-desc");
        postContentBox.appendChild(postDesc);
    }

    mainpost.appendChild(postContentBox);

    const checkWel = document.getElementById("wel");
    if (checkWel) {
        checkWel.remove();
    }

    mainFeed.appendChild(mainpost);
    resetForm();
});