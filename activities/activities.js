"use strict";

//     LANGUAGE:
const language = document.querySelector(".language-selector");
const english = document.querySelector(".selected");
const spanish = document.querySelector(".option");
const languageList = document.querySelectorAll(".language");

let laguageVisible = false;

function switchlanguages() {
  if (english.classList.contains("default")) {
    english.innerHTML = "";
    const img = document.createElement("img");
    img.src = "../media/icons8-spanish-flag-48.png";
    img.alt = "Spanish flag";
    img.classList.add("flag");
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
    imge.src = "../media/us.svg";
    imge.alt = "American flag";
    imge.classList.add("flag");
    const texto = document.createElement("span");
    texto.textContent = "EN";
    texto.style.fontSize = "16px";
    spanish.appendChild(imge);
    spanish.appendChild(texto);
  } else {
    english.innerHTML = "";
    const img = document.createElement("img");
    img.src = "../media/us.svg";
    img.alt = "American flag";
    img.classList.add("flag");
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
    imge.src = "../media/icons8-spanish-flag-48.png";
    imge.alt = "Spanish Flag";
    imge.classList.add("flag");
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

// english.addEventListener

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

spanish.addEventListener("click", switchlanguages);

//modal-window

const greetings = document.querySelector(".greetings");
const professions = document.querySelector(".professions");
const family = document.querySelector(".family");
const verbToBe = document.querySelector(".to-be");
const difficult = document.querySelector(".modal");
const closeDifficult = document.querySelector(".close-window");
const overlay = document.querySelector(".overlay");

// function animar()

function openWindow() {
  difficult.classList.add("modal-abierto");
  overlay.classList.toggle("hidden");
}

function closeWindow() {
  overlay.classList.toggle("hidden");
  difficult.classList.remove("modal-abierto");
}

verbToBe.addEventListener("click", openWindow);
closeDifficult.addEventListener("click", closeWindow);
overlay.addEventListener("click", closeWindow);

//               Autocompletado

const input = document.getElementById("input");
const lista = document.querySelectorAll(".topics");

input.addEventListener("input", function () {
  const text = input.value.toLocaleLowerCase().trim();

  lista.forEach((section) => {
    const contenido = section.textContent.toLocaleLowerCase();
    const coincide = contenido.includes(text);
    section.style.display = coincide ? "flex" : "none";
  });
});
