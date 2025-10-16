
const menuBtn = document.getElementById("menu-btn");
const sideMenu = document.getElementById("side-menu");
const overlay = document.querySelector(".side-menu-overlay");
const menuLinks = document.querySelectorAll(".menu-link");
const sections = document.querySelectorAll(".section");

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
    const targetID = link.getAttribute("href").substring(1);
    sections.forEach(sec=>sec.classList.remove("active"));
    const target = document.getElementById(targetID);
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
