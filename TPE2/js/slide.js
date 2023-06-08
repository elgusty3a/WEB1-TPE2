"use strict"

/*
! ---- comienzo del slide --------------------
*/

let arregloImg = ["img0.jpg","img1.jpg","img2.jpg","img3.jpg","img4.jpg","img5.jpg","img6.jpg","img7.jpg","img8.jpg","img9.jpg","img10.jpg","img11.jpg","img12.jpg","img13.jpg"];
let imgActual = 0;

//setear tiempo
let tempo;
tempo = setInterval(pasarImagen, 4500);

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
  contImgSlide.style = "background-image: url(img/"+showImage+");transition: 0.5s;";
}

function detenerSlide() {
  clearInterval(tempo);
}

function arrancarSlide() {
  tempo = setInterval(pasarImagen, 4500);
}

/*
! ---------- FIN del slide ------------------------------
*/