
let menuBtn = document.getElementById("menu-btn");
let sideMenu = document.getElementById("side-menu");
let overlay = document.querySelector(".side-menu-overlay");
let menuLinks = document.querySelectorAll(".menu-link");
let sections = document.querySelectorAll(".section");

menuBtn.addEventListener("click", ()=>{
  sideMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});
overlay.addEventListener("click", ()=>{
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
});

menuLinks.forEach(link=>{
  link.addEventListener("click",(e)=>{
    e.preventDefault();
    let targetID = link.getAttribute("href").substring(1);
    sections.forEach(sec=>sec.classList.remove("active"));
    let target = document.getElementById(targetID);
    if(target) target.classList.add("active");
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
});


document.getElementById("theme-toggle").addEventListener("click",()=>{
  document.body.classList.toggle("light-mode");
});

document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();
  emailjs.sendForm('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID',this)
  .then(()=>{ alert("Message sent successfully!"); this.reset(); })
  .catch(err=>{ alert("Failed to send message."); console.error(err); });
});






