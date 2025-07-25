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
    img.style.width = "1.6875rem";
    img.style.height = "1.6875rem";
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
    img.src = "../media/us.svg";
    img.alt = "American flag";
    img.style.width = "1.6875rem";
    img.style.height = "1.6875rem";
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

//                        AUDIO:

//   Audio en los enunciados:

const enunciados = document.querySelectorAll(".enunciado");

enunciados.forEach((enunciado) => {
  const play = enunciado.querySelector(".audio");
  const pause = enunciado.querySelector(".hidden");

  play.addEventListener("click", function () {
    const text = enunciado.querySelector("h3").textContent;

    const voz = new SpeechSynthesisUtterance(text);
    voz.lang = "en-US";

    voz.rate = 0.4;
    voz.pitch = 1;
    voz.volume = 1;

    speechSynthesis.speak(voz);

    play.classList.add("hidden");
    pause.classList.remove("hidden");
    setTimeout(() => {
      play.classList.remove("hidden");
      pause.classList.add("hidden");
    }, 1200);
  });
});

//                   Audio en la tabla.
const rows = document.querySelectorAll(".table");

rows.forEach((row) => {
  const play = row.querySelector(".audio");
  const pause = row.querySelector(".hidden");

  play.addEventListener("click", function () {
    const text = row.querySelector(".text-audio").textContent;

    const voz = new SpeechSynthesisUtterance(text);
    voz.lang = "en-US";

    voz.rate = 0.4;
    voz.pitch = 1;
    voz.volume = 1;

    speechSynthesis.speak(voz);

    play.classList.add("hidden");
    pause.classList.remove("hidden");
    setTimeout(() => {
      play.classList.remove("hidden");
      pause.classList.add("hidden");
    }, 1200);
  });
});
