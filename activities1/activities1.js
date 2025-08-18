"use strict";

function flechaHome(e) {
  const salir = confirm(
    "Please note that if you proceed, your progress so far will not be saved. Do you still want to continue?"
  );

  if (!salir) e.preventDefault();
}

const flecha = document.querySelector(".arrow-back");
flecha.addEventListener("click", flechaHome);

const home = document.querySelector(".home");
home.addEventListener("click", flechaHome);

// -------------------------------------------------

function getNumbers(text) {
  let random;
  do {
    random = Math.floor(Math.random() * 10) + 1;
  } while (text.includes(random));

  return random;
}

const previousExercises = [];
let currentExercise = getNumbers(previousExercises);
previousExercises.push(currentExercise);
const mistakes = new Set();
let aggMistakes = false;
let preguntasMalRespondidas = [];
let preguntasBienRespondidas = [];

let wrongExercises = 0;
let correctExercises = 0;

document.querySelector(`.exercise-${currentExercise}`).style.display = "block";
console.log(currentExercise);

let isAllGood = false;
let selected = null;

function showNextExercise() {
  document.querySelector(`.exercise-${currentExercise}`).style.display = "none";

  if (previousExercises.length >= 10) {
    document.querySelector(".results").style.display = "flex";
    if (mistakes.size === 0) {
      preguntasBienRespondidas = Array.from(
        { length: previousExercises.length },
        (_, i) => i + 1
      );
    } else {
      preguntasMalRespondidas = [...mistakes];
      preguntasBienRespondidas = previousExercises.filter(
        (mistake) => !preguntasMalRespondidas.includes(mistake)
      );
    }

    wrongExercises = mistakes.size;
    correctExercises = previousExercises.length - wrongExercises;

    const exercisesName = [
      "Dialogue",
      "Match pictures",
      "Good morning",
      "Nice to see you",
      "Goodbye",
      "Good night",
      "Match translation",
      "See you tomorrow",
      "Nice to meet you",
      "dialogue",
    ];

    console.log(preguntasMalRespondidas);
    console.log(preguntasBienRespondidas);
    console.log(previousExercises);
    console.log(correctExercises);
    console.log("mal :", wrongExercises);
    console.log("bien:", correctExercises);

    const containerActivities = document.querySelector(".javascript");

    document.querySelector(".bien").textContent = `${correctExercises}`;

    document.querySelector(".puntuacion").textContent = `${
      correctExercises * 10
    }`;

    const arr = previousExercises.toSorted((a, b) => a - b);

    console.log(arr);

    containerActivities.innerHTML = "";

    arr.forEach((num, i) => {
      let imagen;

      if (preguntasBienRespondidas.includes(num)) {
        imagen = `<img
      src="../media/check_circle_55dp_07AC00_FILL1_wght400_GRAD0_opsz48.svg"
      alt="check-circule"
      class="answer" />
      `;
      } else {
        imagen = `<img
      src="../media/cancel_55dp_F44336_FILL1_wght400_GRAD0_opsz48.svg"
      alt="check-circule"
      class="answer" />`;
      }

      const html = `
    <div class="javascript">
            <hr class="linea" />
            <div class="all-filas">
            <div class="filas">
                <div class="left-side">
                <p class="current-exercise">${num} of 10</p>
                  <p>${exercisesName[i]}</p>
                  </div>
                  <div class="right-side">
                  ${imagen}
                </div>
              </div>
            </div>
            </div>`;
      containerActivities.insertAdjacentHTML("beforeend", html);
    });
  } else {
    UpdateCurrentExercise(previousExercises);
    document.querySelector(`.exercise-${currentExercise}`).style.display =
      "block";
    saveExercise();
  }
  console.log(currentExercise);
}

// -----------------------------------------------

//  funcion de ayuda :

function UpdateCurrentExercise(text) {
  currentExercise = getNumbers(text);
}

function nextExerciseUpgrated(text) {
  const proceed = confirm(text);
  if (proceed) {
    showNextExercise();
  }
}

function nextExerciseUpgratedTimer(number, text) {
  setTimeout(() => {
    const proceed = confirm(text);
    if (proceed) {
      showNextExercise();
    }
  }, number);
}

function upgradeMistakes() {
  aggMistakes = true;
  mistakes.add(currentExercise);
  aggMistakes = false;
  console.log(mistakes);
}

function saveExercise() {
  previousExercises.push(currentExercise);
  console.log(previousExercises);
}

// -----------------------------------------------

// funcion para dialogos :
function reseDialogueAndNext(text, espacios, palabras, opciones) {
  const proceed = confirm(text);
  if (proceed) {
    espacios.forEach((espacio) => (espacio.style.background = ""));
    palabras.forEach((palabra) => (palabra.style.visibility = "hidden"));
    opciones.forEach((opt) => (opt.style.display = "block"));

    showNextExercise();

    isAllGood = false;
  } else {
    isAllGood = true;
  }
}

function allGood(text) {
  if ([...text].every((space) => space.style.background === "lightgreen"))
    isAllGood = true;
}

//------------------------------------------------

// funciones para drag ejercicio 2.

function resetDragAndContinue(text, dropzone) {
  const proceed = confirm(text);
  if (proceed) {
    dropzone.forEach((zone) => zone.classList.remove("dragged"));

    showNextExercise();
  }
}

//---------------------------------------------------

// exercise 1.

function wrongAnswer(text) {
  text.classList.add("wrong");
  setTimeout(() => {
    text.classList.remove("wrong");
  }, 500);
}

const options = document.querySelectorAll(".option");
const slots = document.querySelectorAll(".word");
const palabras = document.querySelectorAll(".word-text");

// Hacer opciones arrastrables
options.forEach((opt) => {
  opt.addEventListener("dragstart", (e) => {
    selected = opt;
    e.dataTransfer.setData("text", opt.dataset.value);
  });
});

// Configurar zonas de drop
slots.forEach((slot) => {
  const correct = slot.querySelector(".word-text").textContent.trim();

  slot.addEventListener("dragover", (e) => e.preventDefault());

  slot.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggedText = e.dataTransfer.getData("text");

    if (draggedText === correct) {
      slot.querySelector(".word-text").style.visibility = "visible";
      slot.style.background = "lightgreen";
      selected.style.display = "none";
      allGood(slots);

      selected = null;
    } else {
      wrongAnswer(slot);

      upgradeMistakes();

      selected = null;
    }
  });
});

document.querySelector(".boton button").addEventListener("click", function () {
  if (isAllGood) {
    reseDialogueAndNext(
      "Excellent 🏅🏅!! Next exercise?",
      slots,
      palabras,
      options
    );
  } else {
    options.forEach((opt) => {
      wrongAnswer(opt);
    });
  }
});

//-----------------------------------------------------

// exercise 2:

const dropzone = document.querySelectorAll(".zone-area .dropzone");

function placeCorrect(selected, item, draggedValue, destiny) {
  item.innerHTML = "";
  selected.appendChild(destiny);

  const correct_p = document.querySelector(
    `.partener[data-value =${draggedValue}]`
  );
  item.appendChild(correct_p);
}

dropzone.forEach((item) => {
  item.draggable = true;
  item.addEventListener("dragstart", function (e) {
    const arrastrable = item.querySelector(".partener");
    e.dataTransfer.setData("text", arrastrable.dataset.value);
    selected = item;
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", (e) => {
    item.classList.remove("dragging");
  });

  item.addEventListener("dragenter", function (e) {
    e.preventDefault();
  });

  item.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  item.addEventListener("drop", function (e) {
    e.preventDefault();
    if (selected === item) return;
    const draggedValue = e.dataTransfer.getData("text");
    const targetValue = item.dataset.value;
    const destiny = e.target;

    const same = draggedValue === targetValue;
    const same2 = selected.dataset.value === destiny.dataset.value;

    document
      .querySelectorAll(".dragging")
      .forEach((el) => el.classList.remove("dragging"));

    if (same && same2) {
      selected.classList.add("dragged");
      item.classList.add("dragged");

      placeCorrect(selected, item, draggedValue, destiny);
    } else if (same) {
      item.classList.add("dragged");

      placeCorrect(selected, item, draggedValue, destiny);
    } else if (same2) {
      selected.classList.add("dragged");

      placeCorrect(selected, item, draggedValue, destiny);
    } else {
      item.style.background = selected.style.background = "salmon";

      setTimeout(() => {
        item.style.background = selected.style.background = "";
        selected = null;
      }, 500);

      upgradeMistakes();
    }
  });
});

//         boton
document.querySelector(".boton-2 button").addEventListener("click", () => {
  if ([...dropzone].every((item) => item.classList.contains("dragged"))) {
    resetDragAndContinue("Great job!! 🏆 Next exercise?", dropzone);
  } else {
    dropzone.forEach((item) => {
      if (!item.classList.contains("dragged")) {
        item.style.background = "salmon";
        setTimeout(() => (item.style.background = ""), 500);
      }
    });
  }
});

//------------------------------------------------

//exercise-3.

const validValue = "Good-Morning";

document.querySelectorAll(".boton-3 button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const seleccionado = document.querySelector('input[name="option"]:checked');

    if (!seleccionado) {
      document.querySelectorAll(".circule").forEach((circ) => {
        circ.classList.add("wrong");
        setTimeout(() => circ.classList.remove("wrong"), 500);
      });
    } else if (seleccionado.value === validValue) {
      const container = seleccionado.closest("label.personalized");
      container.classList.add("is-correct");

      const radios = document.querySelectorAll('input[type="radio"');
      radios.forEach((input) => (input.disabled = true));

      setTimeout(() => {
        const proceed = confirm("Excellent 🏅🏅!! Next exercise?");
        if (proceed) {
          radios.forEach((r) => (r.disabled = r.checked = false));

          document
            .querySelectorAll(".is-correct")
            .forEach((el) => el.classList.remove("is-correct"));
          showNextExercise();
        }
        console.log(currentExercise);
      }, 500);
    } else {
      const container = seleccionado.closest("label.personalized");
      container.classList.add("is-wrong");
      setTimeout(() => container.classList.remove("is-wrong"), 600);

      upgradeMistakes();
    }
  });
});

//---------------------------------------------

//                   exercise 4.

const play = document.querySelector(".audio");
const respuestaCorrecta = "see";
const botones4 = document.querySelectorAll(".boton-4 button");
const rows = document.querySelectorAll(".row");
const rowArr = [...rows];
let userSelection = null;
let counter = 0;

function playAudio(text) {
  const voz = new SpeechSynthesisUtterance(text);
  voz.lang = "en-US";

  voz.pitch = voz.volume = 1;

  if (counter === 0) voz.rate = 1;
  else voz.rate = 0.3;

  if (counter === 1) counter = 0;
  else counter++;

  speechSynthesis.speak(voz);
}

play.addEventListener("click", () => {
  playAudio("Nice to see you");
});

rows.forEach((row) => {
  row.addEventListener("click", () => {
    userSelection = row.dataset.value;

    if (rowArr.some((row) => row.classList.contains("selected"))) {
      const selection = rowArr.find((row) =>
        row.classList.contains("selected")
      );
      if (selection === row) {
        selection.classList.remove("selected");
        userSelection = null;
      } else {
        selection.classList.remove("selected");
        row.classList.add("selected");
      }
    } else {
      row.classList.add("selected");
    }
  });
});

let indexBoton4 = 0;
if (currentExercise === 6) {
  indexBoton4 = 1;
}

function clickAfuera(e) {
  if (
    !e.target.classList.contains("row") &&
    e.target !== document.querySelectorAll(".boton-4 button")[indexBoton4]
  ) {
    rows.forEach((row) => row.classList.remove("selected"));
    userSelection = null;
  }
}

document.querySelector("body").addEventListener("click", clickAfuera);

botones4.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!userSelection) {
      rows.forEach((row) => {
        row.style.background = "salmon";
        setTimeout(() => {
          row.style.background = "";
        }, 500);
      });
    } else if (userSelection === respuestaCorrecta) {
      rows.forEach((row) => {
        row.classList.add("all-set");
        if (!row.classList.contains("selected")) row.style.opacity = "0.4";
      });

      setTimeout(() => {
        const proceed = confirm("Good job!! 🏅🏅 Next exercise?");
        if (proceed) {
          rows.forEach((row) => {
            row.classList.remove("all-set");
            row.style.opacity = 1;
            if (row.classList.contains("selected"))
              row.classList.remove("selected");
          });

          userSelection = "";
          indexBoton4 = 1;

          showNextExercise();

          console.log(currentExercise);
        } else {
          document
            .querySelector("body")
            .removeEventListener("click", clickAfuera);
        }
      });

      counter = 0;
    } else {
      rows.forEach((row) => {
        if (row.classList.contains("selected")) {
          row.classList.remove("selected");
          row.style.background = "salmon";
          setTimeout(() => (row.style.background = ""), 500);
        }
      });
      userSelection = null;

      upgradeMistakes();
    }
  });
});

//-----------------------------------------------

// exercise 5.
const list = document.querySelectorAll(".opt");
const spaces = document.querySelectorAll(".words");
const letra = document.querySelectorAll(".word-texto");
let currentlyDragging = null;

list.forEach((opt) => {
  opt.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", opt.dataset.value);
    currentlyDragging = opt;
    console.log(opt);
  });
});

spaces.forEach((word) => {
  const correct = word.querySelector(".word-texto").textContent;

  word.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  word.addEventListener("drop", (e) => {
    e.preventDefault();
    const palabraAgarrada = e.dataTransfer.getData("text");

    if (palabraAgarrada === correct) {
      word.querySelector(".word-texto").style.visibility = "visible";
      word.style.background = "lightgreen";
      currentlyDragging.style.display = "none";
      word.classList.add("all-set");
      currentlyDragging = null;

      if ([...spaces].every((space) => space.style.background === "lightgreen"))
        list.forEach((list) => {
          list.classList.add("all-set");
          list.style.opacity = 0.4;
          isAllGood = true;
        });
    } else {
      wrongAnswer(word);
      upgradeMistakes();
      currentlyDragging = null;
    }
  });
});

document.querySelector(".boton-5 button").addEventListener("click", () => {
  if (isAllGood) {
    list.forEach((list) => {
      list.classList.add("all-set");
      list.style.opacity = 0.4;
    });

    const proceed = confirm("Nice!! 😎 Next exercise?");
    if (proceed) {
      spaces.forEach((espacio) => {
        espacio.style.background = "";
        espacio.classList.remove("all-set");
      });
      letra.forEach((palabra) => (palabra.style.visibility = "hidden"));
      list.forEach((opt) => {
        opt.style.display = "flex";
        opt.classList.remove("all-set");
        opt.style.opacity = 1;
      });

      isAllGood = false;
      showNextExercise();
    }
  } else {
    list.forEach((list) => {
      wrongAnswer(list);
    });
  }
});

//-----------------------------------------------------

// exercise 6.

document.querySelector(".audio-2").addEventListener("click", () => {
  playAudio("Good night");
});

// -------------------------------------------------

//   exercise 7.

const zones = document.querySelectorAll(".column--2 .dropzone");

//   funcion para ayuda
function placeCorrect(selected, item, draggedValue, destiny) {
  item.innerHTML = "";
  selected.appendChild(destiny);

  const correct_p = document.querySelector(
    `.partener[data-value =${draggedValue}]`
  );
  item.appendChild(correct_p);
}

//-------------------------------------------------

zones.forEach((item) => {
  item.draggable = true;
  item.addEventListener("dragstart", function (e) {
    const arrastrable = item.querySelector(".partener");
    e.dataTransfer.setData("text", arrastrable.dataset.value);
    selected = item;
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", (e) => {
    item.classList.remove("dragging");
  });

  item.addEventListener("dragenter", function (e) {
    e.preventDefault();
  });

  item.addEventListener("dragover", function (e) {
    e.preventDefault();
    // console.log("drag");
  });

  item.addEventListener("drop", function (e) {
    e.preventDefault();
    if (selected === item) return;
    const draggedValue = e.dataTransfer.getData("text");
    const targetValue = item.dataset.value;
    const destiny = e.target;

    const same = draggedValue === targetValue;
    const same2 = selected.dataset.value === destiny.dataset.value;

    document
      .querySelectorAll(".dragging")
      .forEach((el) => el.classList.remove("dragging"));

    if (same && same2) {
      selected.classList.add("dragged");
      item.classList.add("dragged");

      placeCorrect(selected, item, draggedValue, destiny);
    } else if (same) {
      item.classList.add("dragged");

      placeCorrect(selected, item, draggedValue, destiny);
    } else if (same2) {
      selected.classList.add("dragged");

      placeCorrect(selected, item, draggedValue, destiny);
    } else {
      item.style.background = selected.style.background = "salmon";

      setTimeout(() => {
        item.style.background = selected.style.background = "";
        selected = null;
      }, 500);

      upgradeMistakes();
    }
  });
});

//         boton
document.querySelector(".boton-7 button").addEventListener("click", () => {
  if ([...zones].every((item) => item.classList.contains("dragged"))) {
    resetDragAndContinue("Great job!! 🏆 Next exercise?", zones);
  } else {
    zones.forEach((item) => {
      if (!item.classList.contains("dragged")) {
        item.style.background = "salmon";
        setTimeout(() => (item.style.background = ""), 500);
      }
    });
  }
});

// ----------------------------------------------

// exercise 8:

//--------------------------------------------------

//               exercise 9.

const listaOpt = document.querySelectorAll(".lista-opciones");
const container = document.querySelectorAll(".square");
const textContainer = document.querySelectorAll(".text-square");

listaOpt.forEach((opt) => {
  opt.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", opt.dataset.value);
    currentlyDragging = opt;
  });
});

container.forEach((space) => {
  const correct = space.querySelector(".text-square").textContent;

  space.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  space.addEventListener("drop", (e) => {
    e.preventDefault();
    const palabraAgarrada = e.dataTransfer.getData("text");

    if (palabraAgarrada === correct) {
      space.querySelector(".text-square").style.visibility = "visible";
      space.style.background = "lightgreen";
      space.classList.add("all-set");

      currentlyDragging.style.display = "none";
      currentlyDragging = null;

      if (
        [...container].every((space) => space.style.background === "lightgreen")
      )
        listaOpt.forEach((list) => {
          list.classList.add("all-set");
          list.style.opacity = 0.4;
          isAllGood = true;
        });
    } else {
      wrongAnswer(space);

      upgradeMistakes();
    }
  });
});

document.querySelector(".boton-9 button").addEventListener("click", () => {
  if (isAllGood) {
    listaOpt.forEach((list) => {
      list.classList.add("all-set");
      list.style.opacity = 0.4;
    });

    const proceed = confirm("Nice!! 😎 Next exercise?");
    if (proceed) {
      container.forEach((espacio) => {
        espacio.style.background = "";
        espacio.classList.remove("all-set");
      });
      textContainer.forEach((palabra) => (palabra.style.visibility = "hidden"));
      listaOpt.forEach((opt) => {
        opt.style.display = "flex";
        opt.classList.remove("all-set");
        opt.style.opacity = 1;
      });

      isAllGood = false;

      showNextExercise();
    }
  } else {
    listaOpt.forEach((list) => {
      wrongAnswer(list);
    });
  }
});

//--------------------------------------------------

//                exercise 10.

const lista = document.querySelectorAll(".lista");
const cuadros = document.querySelectorAll(".cuadro");
const contenido = document.querySelectorAll(".palabra");

// Hacer opciones arrastrables
lista.forEach((opt) => {
  opt.addEventListener("dragstart", (e) => {
    selected = opt;
    e.dataTransfer.setData("text", opt.dataset.value);
  });
});

// Configurar zonas de drop
cuadros.forEach((slot) => {
  const correct = slot.querySelector(".palabra").textContent.trim();

  slot.addEventListener("dragover", (e) => e.preventDefault());

  slot.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggedText = e.dataTransfer.getData("text");

    if (draggedText === correct) {
      slot.querySelector(".palabra").style.visibility = "visible";
      slot.style.background = "lightgreen";
      selected.style.display = "none";
      allGood(cuadros);

      selected = null;
    } else {
      wrongAnswer(slot);

      upgradeMistakes();

      selected = null;
    }
  });
});

document
  .querySelector(".boton-10 button")
  .addEventListener("click", function () {
    if (isAllGood) {
      reseDialogueAndNext(
        "Excellent 🏅🏅!! Next exercise?",
        cuadros,
        contenido,
        lista
      );
    } else {
      lista.forEach((lista) => {
        wrongAnswer(lista);
      });
    }
  });

// -------------------------------------------------

//   results

document.querySelector(".try-again").addEventListener("click", () => {
  console.log("click");
  previousExercises.splice(0);
  wrongExercises = correctExercises = 0;
  mistakes.clear();
  preguntasBienRespondidas.splice(0);
  preguntasMalRespondidas.splice(0);
  document.querySelector(`.exercise-${currentExercise}`).style.display = "none";
  UpdateCurrentExercise(previousExercises);
  showNextExercise();
});
