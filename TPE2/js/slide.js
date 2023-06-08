"use strict"

/*
! ---- comienzo del slide --------------------
*/

let arregloImg = ["img0.png","img1.png","img2.png","img3.png","img4.png","img5.png","img6.png","img7.png","img8.png","img9.png","img10.png","img11.png","img12.png","img13.png"];
let imgActual = 0;

//setear tiempo
let tempo;
tempo = setInterval(pasarImagen, 5000);

document.querySelector('#btn-sig').addEventListener("click" , pasarImagen);
document.querySelector('#btn-ant').addEventListener("click" , pasarImagen);
let contImgSlide = document.querySelector('#img-slide');

contImgSlide.addEventListener("mouseover", detenerSlide);
contImgSlide.addEventListener("mouseout", arrancarSlide);

function pasarImagen() {
  let boton= this.id;
  if (boton!=undefined) {
    detenerSlide();
    arrancarSlide();
  }
  if (boton=='btn-sig') {
    imgActual++;
    if(imgActual==arregloImg.length){
      imgActual = 0;
    }
  } else {
      imgActual--;
      if (imgActual<0) {
        imgActual=arregloImg.length-1;
      }
    }
  let showImage = arregloImg[imgActual];
  //console.log(imgActual);
  //console.log(showImage);
  contImgSlide.style = "background-image: url(img/"+showImage+");transition: 0.8s;";
}

function detenerSlide() {
  clearInterval(tempo);
}

function arrancarSlide() {
  tempo = setInterval(pasarImagen, 5000);
}

/*
! ---------- FIN del slide ------------------------------
*/