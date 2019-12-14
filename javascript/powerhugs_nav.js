const menu_wrapper = document.querySelector(".menu_wrapper");
const nav_list = document.querySelector(".nav_list");
const list_wrapperEl = document.querySelector(".magic");

menu_wrapper.addEventListener("click", function() {
  nav_list.classList.toggle("active");
  list_wrapperEl.classList.toggle("active");
});
