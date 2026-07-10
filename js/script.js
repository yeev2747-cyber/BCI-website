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


// HTML Injection / XSS Protection

function containsHTML(input) {
    const htmlPattern = /<[^>]*>/;
    return htmlPattern.test(input);

}



// Form Validation

const form = document.getElementById("contactForm");
form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Error messages
    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    // Clear previous errors
    nameError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    // Blur Validation

    // HTML Injection 
    if (containsHTML(name)) {
        nameError.textContent = "HTML tags are not allowed.";
        return;
    }

    if (containsHTML(message)) {
        messageError.textContent = "HTML tags are not allowed.";
        return;
    }

    if (name === "") {
        nameError.textContent = "Please enter your name.";
        return;
    }

    if (name.length < 2) {
        nameError.textContent = "Name must contain at least 2 characters.";
        return;
    }

    if (phone === "") {
        phoneError.textContent = "Please enter your phone number.";
        return;
    }

    if (!/^\d{8}$/.test(phone)) {
        phoneError.textContent = "Phone number must contain exactly 8 digits.";
        return;
    }


    if (email === "") {
        emailError.textContent = "Please enter your email.";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        return;
    }

    if (message === "") {
        messageError.textContent = "Please enter your message.";
        return;
    }

    if (message.length < 10) {
        messageError.textContent = "Message must contain at least 10 characters.";
        return;
    }
    // Successful Submission message
    alert("Form submitted successfully! Thank you.");

    const nameInput = document.getElementById("name");
});

// Quiz
const quiz = [

{
question:"What does BCI stand for?",
answers:[
"Brain Control Interface",
"Brain Communication Internet",
"Brain-Computer Interface",
"Biological Computer Integration"
],
correct:2
},

{
question:"What is the main purpose of a BCI?",
answers:[
"Improve memory",
"Translate brain activity into commands",
"Replace smartphones",
"Monitor heart rate"
],
correct:1
},

{
question:"Which is a non-invasive method?",
answers:[
"Utah Array",
"ECoG",
"EEG",
"Microelectrode"
],
correct:2
},

{
question:"Which stage comes first in a BCI system?",
answers:[
"Signal Processing",
"Output & Feedback",
"Signal Acquisition",
"Device Control"
],
correct:2
},

{
question:"BCIs can help people with neurological disorders.",
answers:[
"True",
"False"
],
correct:0
}

];

let currentQuestion=0;

let score=0;

const question=document.getElementById("question");

const answers=document.getElementById("answers");

const feedback=document.getElementById("feedback");

const nextBtn=document.getElementById("nextBtn");

const progress=document.getElementById("progressBar");

function loadQuestion(){

feedback.innerHTML="";

answers.innerHTML="";

progress.style.width=((currentQuestion+1)/quiz.length)*100+"%";

progress.innerHTML=`Question ${currentQuestion+1} / ${quiz.length}`;

question.innerHTML=quiz[currentQuestion].question;

quiz[currentQuestion].answers.forEach((answer,index)=>{

const button=document.createElement("button");

button.className="answer-btn";

button.innerHTML=answer;

button.onclick=()=>checkAnswer(index,button);

answers.appendChild(button);

});

}

function checkAnswer(index,button){

const buttons=document.querySelectorAll(".answer-btn");

buttons.forEach(btn=>btn.disabled=true);

if(index===quiz[currentQuestion].correct){

button.classList.add("correct");

feedback.innerHTML="✅ Correct!";

score++;

}
else{

button.classList.add("wrong");

buttons[quiz[currentQuestion].correct].classList.add("correct");

feedback.innerHTML="❌ Incorrect";

}

}

nextBtn.onclick=()=>{

currentQuestion++;

if(currentQuestion<quiz.length){

loadQuestion();

}
else{

document.querySelector(".quiz-card").innerHTML=`

<h2 class="text-center">🎉 Quiz Complete!</h2>

<h3 class="text-center mt-4">

You scored ${score} / ${quiz.length}

</h3>

<div class="text-center mt-4">

<button class="btn btn-primary"

onclick="location.reload()">

Try Again

</button>

</div>

`;

}

}

loadQuestion();