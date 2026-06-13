document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

});

document.addEventListener("click", (e) => {

    const navLinks = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger");

    const isClickInside = navLinks.contains(e.target) || hamburger.contains(e.target);

    if (!isClickInside) {
        navLinks.classList.remove("active");
    }
});