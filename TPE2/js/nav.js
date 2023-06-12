"use strict"

/* ---- Comienzo del nav ----*/
const menu = document.querySelector("#nav-links");
const openMenuBtn = document.querySelector("#btn-hambur");
const closeMenuBtn = document.querySelector("#btn-cross");

function mostrarMenu() {
  menu.classList.toggle("menu_abierto");
}

openMenuBtn.addEventListener("click", mostrarMenu);
closeMenuBtn.addEventListener("click", mostrarMenu);
/* ---- FIN del nav ----*/




/*
? -------- comienzo del JS para botones "ver mas"  -----------------
*/

let btnVerMas=document.querySelectorAll(".btn-vermas");

for (let i = 0; i < btnVerMas.length; i++) {
  btnVerMas[i].addEventListener("click", function(e){
    let verParrafo = this.nextElementSibling;
    verParrafo.classList.toggle("ver_contenido");
    if (verParrafo.classList.contains("ver_contenido")){
      this.innerHTML="ver menos";
      this.classList.add("mover-btn-ver-down")
      this.classList.remove("mover-btn-ver-up")
    } else {
      this.innerHTML="ver mas";
      this.classList.add("mover-btn-ver-up")
      this.classList.remove("mover-btn-ver-down")
    };
  });
}


/*
? -------- FIN del JS para botones "ver mas"  -----------------
*/



