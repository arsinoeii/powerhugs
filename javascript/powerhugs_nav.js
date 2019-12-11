const menu_wrapper = document.querySelector(".menu_wrapper");
const nav_list = document.querySelector(".nav_list");

menu_wrapper.addEventListener("click", function() {
  nav_list.classList.toggle("active");
});
