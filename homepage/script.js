"use strict";

const abrir = document.querySelector(".menu");
const cerrar = document.querySelector(".close");
const menu = document.querySelector(".navegation");
const contenedor = document.querySelector(".body");

let visible = false;
let laguageVisible = false;

function abrirMenu(e) {
  e.stopPropagation();
  abrir.classList.toggle("hidden");
  menu.style.display = "flex";
  cerrar.classList.toggle("hidden");
  if (!visible) {
    menu.style.height = menu.scrollHeight + "px";
    visible = true;
  }
}

cerrar.addEventListener("click", function cerrarMenu(e) {
  if (visible && e.target === cerrar) {
    menu.style.height = menu.scrollHeight + "px";
    cerrar.classList.add("hidden");
    abrir.classList.toggle("hidden");
    requestAnimationFrame(() => {
      menu.style.height = "0";
    });
    visible = false;
  }
});

abrir.addEventListener("click", abrirMenu);

document.addEventListener("click", (e) => {
  if (visible && !menu.contains(e.target) && e.target !== cerrar) {
    menu.style.height = menu.scrollHeight + "px"; // Reset antes de colapsar
    cerrar.classList.toggle("hidden");
    abrir.classList.toggle("hidden");
    requestAnimationFrame(() => {
      menu.style.height = "0";
    });

    visible = false;
  }
});

// boton de lenguaje
const language = document.querySelector(".language-selector");
const english = document.querySelector(".selected");
const spanish = document.querySelector(".option");
const languageList = document.querySelectorAll(".language");

function toggleLanguages() {
  spanish.classList.toggle("show");
}

spanish.addEventListener("click", switchlanguages);

function switchlanguages() {
  if (english.classList.contains("default")) {
    english.innerHTML = "";
    const img = document.createElement("img");
    img.src = "media/icons8-spanish-flag-48.png";
    img.alt = "Spanish flag";
    img.style.width = "1.6875rem";
    img.style.height = "1.6875";
    const text = document.createElement("span");
    text.textContent = "ES";
    text.style.fontSize = "16px";
    english.appendChild(img);
    english.appendChild(text);
    english.classList.remove("default");
    spanish.classList.add("default");
    // toggleLanguages();
    spanish.classList.toggle("hidden");

    spanish.innerHTML = "";
    const imge = document.createElement("img");
    imge.src = "media/us.svg";
    imge.alt = "American flag";
    imge.style.width = "1.6875rem";
    imge.style.height = "1.6875rem";
    const texto = document.createElement("span");
    texto.textContent = "EN";
    texto.style.fontSize = "16px";
    spanish.appendChild(imge);
    spanish.appendChild(texto);
  } else {
    english.innerHTML = "";
    const img = document.createElement("img");
    img.src = "media/us.svg";
    img.alt = "American flag";
    img.style.width = "1.6875rem";
    img.style.height = "1.6875";
    const text = document.createElement("span");
    text.textContent = "EN";
    text.style.fontSize = "16px";
    english.appendChild(img);
    english.appendChild(text);
    spanish.classList.remove("default");
    english.classList.add("default");

    spanish.classList.toggle("hidden");

    spanish.innerHTML = "";
    const imge = document.createElement("img");
    imge.src = "media/icons8-spanish-flag-48.png";
    imge.alt = "Spanish Flag";
    imge.style.width = "1.6875rem";
    imge.style.height = "1.6875rem";
    const texto = document.createElement("span");
    texto.textContent = "ES";
    texto.style.fontSize = "16px";
    spanish.appendChild(imge);
    spanish.appendChild(texto);
  }

  if (english.classList.contains("default")) {
    console.log("yes");
  } else {
    console.log("no");
  }
}

// english.addEventListener ("click", englishFunction);

english.addEventListener("click", function (e) {
  e.stopPropagation();
  if (!laguageVisible) {
    spanish.classList.toggle("hidden");
    laguageVisible = true;
  } else {
    spanish.classList.toggle("hidden");
    laguageVisible = false;
  }
});

//Dar un click afuera

document.addEventListener("click", (e) => {
  if (!spanish.contains(e.target)) {
    spanish.classList.add("hidden");
  }
});
