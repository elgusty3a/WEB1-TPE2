"use strict";

let form = document.querySelector('#form'); //busca el boton en el DOM
let capch = document.querySelector('#cap'); //busca en el DOM el titulo donde mostrara el nro aleatorio
let boton = document.querySelector('#btn');
let reset = document.querySelector('#reset'); //boton de reset

//---------------------NUEVOS ALEATORIOS-------------
let comp = "";
captcha();


function captcha() {
  const CANTCARACTCAPTCH = 2;
  for (let i = 0; i < CANTCARACTCAPTCH; i++) {
    comp = comp + opcRandom();
  }
  capch.innerHTML = comp;
}


function opcRandom() {
  let opc, cadena;
  for (let i = 0; i<3; i++){
    opc = Math.floor(Math.random()*3+1);
    cadena = caracterAleatorio(opc);
  }
  return cadena;
}


function caracterAleatorio(opc) {
  let caracter;
  switch (opc) {
    case 1: //digitos aleatorios
      caracter = String.fromCharCode(Math.floor((Math.random()*(57-48)+1)+48));
      break;
    case 2: //letras mayusculas aleatorias
      caracter = String.fromCharCode(Math.floor((Math.random()*(90-65)+1)+65));
      break;
    case 3: //letras minusculas aleatorias
      caracter = String.fromCharCode(Math.floor((Math.random()*(122-97)+1)+97));
      break;
  };
  return caracter;
};


form.addEventListener("submit",verificarcap); //cuando hay click en boton de enviar apunta a la funcion comparar
reset.addEventListener("click",resetearCapcha);

function verificarcap(e){ //funcion de verificacion y comparacion
  e.preventDefault();
  let verif = document.querySelector('#verif'); //busca en el DOM la casilla donde el usuario ingresará el nro para verificar
  verif.classList.remove('vaciocapcha');
  boton.classList.remove('vaciocapcha');
  if ((comp === verif.value)){
    boton.value=("CORRECTO!!");
    verif.classList.add('greencapcha');
    boton.classList.add('greencapcha');
    let formularioRegHidden = document.querySelector('#registro_section').classList.toggle('ocultaRegistro');
    let sectionShop = document.querySelector('#section_shop').classList.toggle('muestraRegistro');
    document.querySelector('#saludo_usuario').innerHTML = `Bienvenid@ ${document.querySelector('#name_user').value}`;
  }else{
    boton.value=("INCORRECTO!!");
    verif.classList.add('redcapcha');
    boton.classList.add('redcapcha');
  }
};

function resetearCapcha() {
  let verif = document.querySelector('#verif');
  boton.value=("Enviar");
  verif.classList.remove('redcapcha');
  boton.classList.remove('redcapcha');
  verif.classList.add('vaciocapcha');
  boton.classList.add('vaciocapcha');
  comp = "";
  capch.innerHTML = comp;
  verif.value = comp;
  captcha();
};

//----------------------------------------------------

//----------------esaparecer el formulario
//----------------y aparecer el shop






/*
*----------INICIO DE LA TABLA DINAMICA----------
*/


let array_precios = [    /* precios de los elementos que vendo */
{
  item: "Entrada 2D",
  precioUnit: 1000,
},
{
  item: "Entrada 3D",
  precioUnit: 1400,
},
{
  item: "Balde Pochoclos",
  precioUnit: 1400,
},
{
  item: "Combo Dúo",
  precioUnit: 2600,
},
{
  item: "Combo Familiar",
  precioUnit: 4600,
},
{
  item: "Combo Pelicula",
  precioUnit: 3400,
},
{
  item: "Garrapiñada",
  precioUnit: 300,
},
{
  item: "Milka Oreo",
  precioUnit: 500,
},
{
  item: "Shot",
  precioUnit: 650,
},
{
  item: "Vaso de Gaseosa",
  precioUnit: 500,
},
];


let cuerpoTablaShop = document.querySelector('#body_table_shop');
let botonShopPush = document.querySelector('#agrega1');
let botonShopPushX3 = document.querySelector('#agregaX3');
let inputCant = document.querySelector('#cant_items');
let totalTabla = document.querySelector('#total_suma');

const CANTMINDESCUENTO = 3;
const DESCUENTOPORCENT = 0.2;
let sumaTotal = 0;
let array_pedido=[];

botonShopPush.addEventListener("click", agregaPedido);


/*     este es el evento del boton x 3      */

botonShopPushX3.addEventListener("click", function() {
  console.log("estoy dentro de consola boton x 3");
  //agregaPedido();
  for (let i = 0; i < 3; i++) {
    console.log("estoy dentro del for boton x 3");
    agregaPedido();
  };
});



function agregaPedido(e) {
  console.log("estoy dentro de consola boton x 3");
  e.preventDefault();
  let itemPedido = document.querySelector("#item").value;;
  let cantidadItems = document.querySelector('#cant_items').value;
  if (cantidadItems!="") {
    let filaShop ={
      item: itemPedido,
      cantidad: parseInt(cantidadItems),
      descuento: function () {
        if(this.cantidad >= CANTMINDESCUENTO){
          return true;
        };
      },
      subTot: function () {
        let position = 0;
        while ((position < array_precios.length)&&(this.item != array_precios[position].item)) {
          position++;
        }
        if (filaShop.descuento()){
          return ((cantidadItems * (1-DESCUENTOPORCENT) * (array_precios[position].precioUnit)).toFixed(2));
        } else {
        return (cantidadItems * (array_precios[position].precioUnit));
        }
      },
    };
    array_pedido.push(filaShop);
    let claseFila;
    if (filaShop.descuento()) {
      claseFila = "resaltaFila";
    } else {
      claseFila = "";
    }
    cuerpoTablaShop.innerHTML += `<tr class="${claseFila}"><td>${filaShop.item}</td><td>${filaShop.cantidad}</td><td>${filaShop.subTot()}</td></tr>`;
    inputCant.value= "";
    totalTabla.innerHTML = sumaTotal+=parseInt(filaShop.subTot());
  }
};

let botonShopPop = document.querySelector('#borraUlt').addEventListener("click", ()=>{
  sumaTotal-=array_pedido[array_pedido.length-1].subTot();
  array_pedido.pop();
  cuerpoTablaShop.innerHTML = "";
  mostrarTabla();
  totalTabla.innerHTML = sumaTotal;
});

let botonShopDel = document.querySelector('#eliminaTodo').addEventListener("click", () => {
  cuerpoTablaShop.innerHTML = "";
  totalTabla.innerHTML = "";
});

function mostrarTabla() {
  for (let i = 0; i < array_pedido.length; i++) {
    let claseFila;
    if (array_pedido[i].descuento()) {
      claseFila = "resaltaFila";
    } else {
      claseFila = "";
    }
    cuerpoTablaShop.innerHTML += `<tr class="${claseFila}"><td>${array_pedido[i].item}</td><td>${array_pedido[i].cantidad}</td><td>${array_pedido[i].subTot()}</td></tr>`;
  };
}



/*
*----------FIN DE LA TABLA DINAMICA----------
*/