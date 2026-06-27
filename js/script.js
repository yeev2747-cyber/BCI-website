// Back to the top button

console.log("BCI Quest script loaded");
document.addEventListener("DOMContentLoaded", () => {

    const backToTop = document.querySelector(".back-to-top");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

});

// Table of content

window.addEventListener("scroll", () => {
  let sections = document.querySelectorAll("section");
  let links = document.querySelectorAll(".toc a");

  sections.forEach(section => {
    let top = window.scrollY;
    let offset = section.offsetTop - 200;
    let height = section.offsetHeight;

    if (top >= offset && top < offset + height) {
      links.forEach(link => link.classList.remove("active"));

      let activeLink = document.querySelector(`.toc a[href="#${section.id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
});

// Device Gallery
document.querySelectorAll('.modal').forEach(modal => {

    modal.addEventListener('hidden.bs.modal', function () {

        const iframe = modal.querySelector('iframe');

        if (iframe) {

            const videoSrc = iframe.src;
            iframe.src = "";
            iframe.src = videoSrc;

        }

    });

});
