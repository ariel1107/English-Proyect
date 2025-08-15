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

//   SECTION   POLICIES:

const desliz = document.querySelectorAll(".scroll");

for (const lines of desliz) {
  const text = lines.querySelector(".animation");
  const arrowUp = lines.querySelector(".arrow-up");
  const arrowDown = lines.querySelector(".arrow-down");
  const h4 = lines.querySelector(".h4");

  lines.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!arrowDown.classList.contains("hidden")) {
      arrowDown.classList.toggle("hidden");
      arrowUp.classList.toggle("hidden");
      // text.classList.toggle("visible");
      text.style.height = text.scrollHeight + "px";
      // text.style.height = "auto";
      setTimeout(() => {
        text.style.opacity = "1";
      }, 250);
    } else if (!arrowUp.classList.contains("hidden")) {
      e.stopPropagation();
      text.style.height = text.scrollHeight + "px";
      arrowDown.classList.toggle("hidden");
      arrowUp.classList.toggle("hidden");
      requestAnimationFrame(() => {
        text.style.opacity = "0";
        setTimeout(() => {
          text.style.height = "0";
        }, 100);
      });
    }
  });

  document.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!lines.contains(e.target) && arrowDown.classList.contains("hidden")) {
      arrowDown.classList.remove("hidden");
      arrowUp.classList.add("hidden");
      requestAnimationFrame(() => {
        text.style.opacity = "0";
        setTimeout(() => {
          text.style.height = "0";
        }, 100);
      });
    }
  });
}
