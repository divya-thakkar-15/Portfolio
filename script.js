const menuBtn = document.getElementById("menu-btn");
const sideMenu = document.getElementById("side-menu");
const themeToggle = document.getElementById("theme-toggle");


menuBtn.addEventListener("click", () => {
  const isOpen = sideMenu.style.right === "0px";

  sideMenu.style.right = isOpen ? "-260px" : "0px";

  
  themeToggle.style.display = isOpen ? "block" : "none";
});


themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  const icon = themeToggle.querySelector("i");
  if (document.body.classList.contains("light-mode")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
});
