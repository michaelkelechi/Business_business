 var menu_icon = document.getElementById("hamburger_menu");

 menu_icon.addEventListener("click", function(){
      var menu_item_wrapper = document.getElementById("media_menu");
      menu_item_wrapper.classList.toggle("display");
 });