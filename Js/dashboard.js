const menuContainer =document.getElementById("dashboard-wrapper");
const menuBtn =document.getElementById("dashboard_menu_button");

// const toggleMenu=()=>{
//     if(menuContainer.style.display="none"){
//         menuContainer.style.display="block"
//     } else if(menuContainer.style.display="block"){
//         menuContainer.style.display="none"
//     }
// }

menuBtn.addEventListener("click", ()=>{
menuContainer.classList.toggle("toggle_hidden");
    // if(menuContainer.style.display="none"){
    //     menuContainer.style.display="flex"
    // } else if(menuContainer.style.display="flex"){
    //     menuContainer.style.display="none"
    // }
})