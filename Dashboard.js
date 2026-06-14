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