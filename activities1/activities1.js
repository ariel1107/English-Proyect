"use strict";

function flechaHome(e) {
  if (
    document.querySelector(`.exercise-${currentExercise}`).style.display !==
    "none"
  ) {
    const salir = confirm(
      "Please note that if you proceed, your progress so far will not be saved. Do you still want to continue?"
    );

    if (!salir) e.preventDefault();
  }
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
// let currentExercise = getNumbers(previousExercises);
// previousExercises.push(currentExercise);
let currentExercise = 0;
const mistakes = new Set();
let exercisesNumber = 1;
const exercisesNumberArray = [];

let aggMistakes = false;
let preguntasMalRespondidas = [];
let preguntasBienRespondidas = [];

let wrongExercises = 0;
let correctExercises = 0;

function ActualizarNumeroEjercicio(exercisesNumber) {
  document.querySelectorAll(".number-value").forEach((num) => {
    num.textContent = exercisesNumber;
  });
}

function init() {
  currentExercise = getNumbers(previousExercises);
  previousExercises.push(currentExercise);
  document.querySelector(`.exercise-${currentExercise}`).style.display =
    "block";
  console.log(currentExercise);
  ActualizarNumeroEjercicio(exercisesNumber);
  exercisesNumberArray.push(exercisesNumber);
  console.log(exercisesNumberArray);
}

document.querySelector(".boton-0 button").addEventListener("click", () => {
  document.querySelector(".pagina-intermedia").style.display = "none";
  init();
});

let isAllGood = false;
let selected = null;

//   cambiar de ejercicios:
function showNextExercise() {
  ActualizarNumeroEjercicio(exercisesNumber);

  document.querySelector(`.exercise-${currentExercise}`).style.display = "none";

  if (previousExercises.length < 10) {
    exercisesNumber++;
    ActualizarNumeroEjercicio(exercisesNumber);
    exercisesNumberArray.push(exercisesNumber);
    console.log(exercisesNumberArray);

    UpdateCurrentExercise(previousExercises);
    document.querySelector(`.exercise-${currentExercise}`).style.display =
      "block";
    saveExercise();

    console.log(currentExercise);
  } else {
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
      "Dialogue 1",
      "Match pictures",
      "Good morning",
      "Nice to see you",
      "Goodbye",
      "Good night",
      "Match translation",
      "See you tomorrow",
      "Nice to meet you",
      "Dialogue 2",
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

    containerActivities.innerHTML = "";

    previousExercises.forEach((num, i) => {
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
                <p class="current-exercise">${exercisesNumberArray[i]} of 10</p>
                  <p>${exercisesName[num - 1]}</p>
                  </div>
                  <div class="right-side">
                  ${imagen}
                </div>
              </div>
            </div>
            </div>`;
      containerActivities.insertAdjacentHTML("beforeend", html);
    });
  }
}
// -----------------------------------------------

//  funcion de ayuda :

function UpdateCurrentExercise(text) {
  currentExercise = getNumbers(text);
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

//---------------------------------------------------

// exercise 1.

function wrongAnswer(text) {
  text.classList.add("wrong");
  setTimeout(() => text.classList.remove("wrong"), 500);
}

function eventoBoton1y10y6y9(e) {
  const button = e.currentTarget;
  const container = button.closest(".exercise").querySelectorAll(".word");
  const palabras = button.closest(".exercise").querySelectorAll(".word-text");
  const opciones = button.closest(".exercise").querySelectorAll(".option");

  console.log(button);
  console.log(container);
  console.log(palabras);
  console.log(opciones);

  if (isAllGood) {
    alert("Excellent!! Next exercise");

    showNextExercise();

    container.forEach((espacio) => (espacio.style.background = ""));
    palabras.forEach((palabra) => (palabra.style.visibility = "hidden"));

    opciones.forEach((opt) => {
      opt.style.display = "flex";
      opt.style.opacity = 1;
    });

    document.querySelectorAll(".scroll")?.forEach((el) => (el.scrollTop = 0));

    document
      .querySelectorAll(".all-set")
      .forEach((el) => el.classList.remove("all-set"));

    isAllGood = false;
  } else {
    opciones.forEach((opt) => {
      wrongAnswer(opt);
    });
  }
}

// ----------------------------------------

// Hacer opciones arrastrables
document.querySelectorAll(".option").forEach((opt) => {
  opt.addEventListener("dragstart", (e) => {
    selected = opt;
    e.dataTransfer.setData("text", opt.dataset.value);
  });
});

// Configurar zonas de drop
document.querySelectorAll(".word").forEach((slot) => {
  slot.addEventListener("dragover", (e) => e.preventDefault());

  slot.addEventListener("drop", (e) => {
    e.preventDefault();

    const draggedText = e.dataTransfer.getData("text");
    const correct = slot.querySelector(".word-text").textContent.trim();
    const opciones = slot.closest(".exercise").querySelectorAll(".option");

    if (draggedText === correct) {
      slot.querySelector(".word-text").style.visibility = "visible";
      slot.style.background = "lightgreen";
      selected.style.display = "none";
      slot.classList.add("all-set");

      const container = slot.closest(".exercise").querySelectorAll(".word");
      const allGreen = [...container].every(
        (space) => space.style.background === "lightgreen"
      );

      if (allGreen) {
        if ([...opciones].some((opt) => opt.style.display !== "none")) {
          const optionsLeft = [...opciones].filter(
            (opt) => opt.style.display !== "none"
          );

          optionsLeft.forEach((opt) => {
            opt.classList.add("all-set");
            opt.style.opacity = 0.4;
          });
        }

        isAllGood = true;
        selected = null;
      }

      console.log(isAllGood);
      selected = null;
    } else {
      wrongAnswer(slot);

      upgradeMistakes();

      selected = null;
    }
  });
});

document
  .querySelector(".boton-1 button")
  .addEventListener("click", eventoBoton1y10y6y9);

//-----------------------------------------------------

// exercise 2:
let matchSelection = null;
let selectedLeftEl = null;
let selectedRightEl = null;
let rightValue = null;

function reset() {
  matchSelection = null;
  selectedLeftEl = null;
  selectedRightEl = null;
  rightValue = null;
}

function leftSide(e) {
  const row = e.currentTarget;

  if (row === selectedLeftEl) {
    row.style.background = "";
    matchSelection = null;
    selectedLeftEl = null;
    return;
  }

  if (selectedLeftEl) selectedLeftEl.style.background = "";

  selectedLeftEl = row;
  matchSelection = row.dataset.value;
  row.style.background = "lightgreen";

  if (rightValue && selectedRightEl) {
    if (rightValue === matchSelection) {
      selectedRightEl.classList.add("all-set");
      row.classList.add("all-set");
      selectedRightEl.style.opacity = row.style.opacity = 0.4;

      reset();
    } else {
      selectedRightEl.style.background = row.style.background = "";

      selectedRightEl.classList.add("wrong");
      row.classList.add("wrong");

      setTimeout(() => {
        selectedRightEl.classList.remove("wrong");
        row.classList.remove("wrong");

        reset();
      }, 500);

      upgradeMistakes();
    }
  }
  console.log(matchSelection);
  console.log(selectedLeftEl);
}

// --------------------------------------------

function rightSide(e) {
  const row = e.currentTarget;
  rightValue = row.dataset.value;

  if (row === selectedRightEl) {
    row.style.background = "";
    selectedRightEl = null;
    return;
  }

  if (selectedRightEl) selectedRightEl.style.background = "";

  selectedRightEl = row;
  row.style.background = "lightgreen";

  console.log(rightValue);
  console.log(selectedRightEl);
  console.log(row);

  if (matchSelection && selectedLeftEl) {
    if (matchSelection === rightValue) {
      selectedLeftEl.classList.add("all-set");
      selectedLeftEl.style.opacity = row.style.opacity = 0.4;
      row.classList.add("all-set");

      reset();
    } else {
      selectedLeftEl.style.background = row.style.background = "";
      selectedLeftEl.classList.add("wrong");
      row.classList.add("wrong");

      setTimeout(() => {
        selectedLeftEl.classList.remove("wrong");
        row.classList.remove("wrong");

        reset();
      }, 500);

      upgradeMistakes();
    }
  }
}

document
  .querySelectorAll(".pic")
  .forEach((square) => square.addEventListener("click", leftSide));

document
  .querySelectorAll(".dropzone")
  .forEach((roe) => roe.addEventListener("click", rightSide));

function eventoBoton2y7(e) {
  const button = e.currentTarget;
  const leftColumn = [
    ...button.closest(".exercise").querySelectorAll(".pic"),
  ].every((row) => row.classList.contains("all-set"));

  const leftSide = button.closest(".exercise").querySelectorAll(".pic");
  const rightSide = button.closest(".exercise").querySelectorAll(".dropzone");

  if (leftColumn) {
    alert("Excellent!! Next exercise");

    showNextExercise();

    leftSide.forEach((el) => {
      el.classList.remove("all-set");
      el.style.opacity = 1;
      el.style.background = "";
    });

    rightSide.forEach((el) => {
      el.classList.remove("all-set");
      el.style.opacity = 1;
      el.style.background = "";
    });
  } else {
    leftSide.forEach((el) => {
      if (!el.classList.contains("al-set")) {
        el.classList.add("wrong");

        setTimeout(() => el.classList.remove("wrong"), 500);
      }
    });

    rightSide.forEach((el) => {
      if (!el.classList.contains("al-set")) {
        el.classList.add("wrong");

        setTimeout(() => el.classList.remove("wrong"), 500);
      }
    });
  }
}

//         boton
document
  .querySelector(".boton-2 button")
  .addEventListener("click", eventoBoton2y7);

//------------------------------------------------

//exercise-3.

const validValue = "Good-Morning";

function compareAndContinue(radios, text) {
  radios.forEach((r) => (r.disabled = true));

  setTimeout(() => {
    alert(text);

    document
      .querySelectorAll("input")
      .forEach((r) => (r.disabled = r.checked = false));

    document
      .querySelectorAll(".is-correct")
      .forEach((el) => el.classList.remove("is-correct"));

    document
      .querySelectorAll(".wrong")
      .forEach((el) => el.classList.remove("wrong"));

    showNextExercise();

    console.log(currentExercise);
  }, 500);
}

function eventoBoton3y8() {
  const seleccionado = document.querySelector('input[type="radio"]:checked');

  // console.log(correctContainer.textContent);

  if (!seleccionado) {
    document.querySelectorAll(".circule").forEach((r) => {
      r.classList.add("wrong");
      setTimeout(() => r.classList.remove("wrong"), 500);
    });
  } else {
    const options = seleccionado.closest(".exercise").querySelectorAll("label");

    const correctContainer = [
      ...seleccionado.closest(".exercise").querySelectorAll("input"),
    ]
      .find((opt) => opt.value === "Good-Morning")
      .closest("label");

    console.log(seleccionado);
    console.log(correctContainer);

    if (seleccionado.value === validValue) {
      correctContainer.classList.add("is-correct");

      compareAndContinue(options, "Well Done!!🏆🏆 next exercise.");
    } else {
      seleccionado.checked = false;
      seleccionado.disabled = true;
      seleccionado
        .closest("label")
        .querySelector(".circule")
        .classList.add("wrong");

      correctContainer.classList.add("is-correct");

      compareAndContinue(
        options,
        `Incorrect answer!! The answer is ${correctContainer.textContent.trim()}`
      );

      upgradeMistakes();
    }
  }
}

document
  .querySelector(".boton-3 button")
  .addEventListener("click", eventoBoton3y8);

//---------------------------------------------

//                   exercise 4.

const play = document.querySelector(".audio");
const respuestaCorrecta = "see";
const boton4 = document.querySelector(".boton-4 button");
const rows = document.querySelectorAll(".exercise-4 .row");

let userSelection = null;
let counter = 0;

// -------------------------

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

function rowEvent4and6(e) {
  const row = e.currentTarget;
  const container = row.closest(".opciones").querySelectorAll(".row");
  userSelection = row.dataset.value;
  const selection = [...container].find((row) =>
    row.classList.contains("selected")
  );

  if (selection) {
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
}

function clickAfuera(e) {
  if (
    !e.target.classList.contains("row") &&
    e.target !== document.querySelector(".boton-4 button")
  ) {
    document
      .querySelectorAll(".selected")
      .forEach((el) => el.classList.remove("selected"));
    userSelection = null;
  }
}

function eventoBoton4y6(e) {
  const button = e.currentTarget;
  const container = button.closest(".exercise").querySelectorAll(".row");
  const correct = [...container].find(
    (row) => row.dataset.value === "see"
  ).textContent;

  if (!userSelection) {
    container.forEach((row) => {
      row.classList.add("wrong");

      setTimeout(() => row.classList.remove("wrong"), 500);
    });
  } else if (userSelection === respuestaCorrecta) {
    container.forEach((row) => {
      row.classList.add("all-set");
      if (!row.classList.contains("selected")) row.style.opacity = "0.4";
    });

    setTimeout(() => {
      alert("Good job!! 🏅🏅 Next exercise?");

      container.forEach((row) => {
        row.classList.remove("all-set");
        row.style.opacity = 1;
      });

      document
        .querySelectorAll(".selected")
        .forEach((el) => el.classList.remove("selected"));

      showNextExercise();
      console.log(currentExercise);
    }, 500);

    userSelection = null;

    document.querySelector("body").removeEventListener("click", clickAfuera);
  } else {
    container.forEach((row) => {
      if (row.classList.contains("selected")) {
        row.classList.remove("selected");
        row.classList.add("wrong");
      }
      row.style.opacity = 0.4;
    });

    const correctRow = [...container].find(
      (row) => row.dataset.value === "see"
    );

    correctRow.style.backgroundColor = "lightgreen";
    correctRow.style.opacity = 1;

    setTimeout(() => {
      alert(`Incorrect Answer!! The right answer is "${correct}"`);

      container.forEach((row) => {
        row.classList.remove("wrong");
        row.style.backgroundColor = "";
        row.style.opacity = 1;
      });

      showNextExercise();
      console.log(currentExercise);
    }, 500);

    document
      .querySelectorAll(".selected")
      .forEach((el) => el.classList.remove("selected"));

    userSelection = null;
    upgradeMistakes();

    document.querySelector("body").removeEventListener("click", clickAfuera);
  }
}

// ------------------------

play.addEventListener("click", () => playAudio("Nice to see you"));

rows.forEach((row) => {
  row.addEventListener("click", rowEvent4and6);
});

document.querySelector("body").addEventListener("click", clickAfuera);

boton4.addEventListener("click", eventoBoton4y6);

//----------------------------------------------------

// exercise 5.

function logica5y9(e) {
  const selected = e.currentTarget;
  const correct = selected.dataset.value;
  const container = selected.closest(".exercise").querySelectorAll(".words");

  const expected = [
    ...selected.closest(".exercise").querySelectorAll(".word-text"),
  ];

  const opciones = selected.closest(".exercise").querySelectorAll(".opt");
  console.log(opciones);

  console.log(container);
  console.log(selected);
  console.log(expected[0]);
  console.log(correct);

  const indice = [...container].findIndex(
    (el) => !el.classList.contains("all-set")
  );

  if (indice === -1) return;

  console.log(indice);

  if (correct === expected[indice].textContent) {
    // creando clon del objeto seleccionado
    const clone = selected.cloneNode(true);
    document.body.appendChild(clone);

    const fromRect = selected.getBoundingClientRect();
    const toRect = container[indice].getBoundingClientRect();

    // Estilo inicial del clone: Muchos sttilos se pueden escriben asi

    Object.assign(clone.style, {
      position: "fixed",
      left: fromRect.left + "px",
      top: fromRect.top + "px",
      width: fromRect.width + "px",
      height: fromRect.height + "px",
      textAlign: "center",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      margin: 0,
      border: "none",
      pointerEvents: "none",
      transition: "all 0.6s cubic-bezier(1, -0.8, 0.3, 1)",
    });

    // forzar reflow para que se aplique el estilo antes de ser movido:
    void clone.offsetWidth;

    // Mover el clone al destino:
    // clone.style.left = toRect.left + "px";
    // clone.style.top = toRect.top + "px";
    clone.style.width = toRect.width + "px";
    clone.style.height = toRect.height + "px";

    //  mas animacion:
    // lo quite porque no me gusto en este caso pero tenerlo en cuenta:

    // ----------------------------------
    const deltaX = toRect.left - fromRect.left;
    const deltaY = toRect.top - fromRect.top;

    clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.3)`;

    // llamar otra animacion del css:
    // setTimeout(
    //   () => (clone.style.animation = "bounce-in 0.3s ease-out forwards"),
    //   600
    // );

    setTimeout(() => {
      clone.remove();

      container[indice].style.backgroundColor = "lightgreen";
      container[indice].classList.add("all-set");
      selected.style.display = "none";
      expected[indice].style.visibility = "visible";

      if ([...container].every((el) => el.classList.contains("all-set"))) {
        opciones.forEach((el) => {
          el.classList.add("all-set");
          el.style.opacity = 0.4;
          isAllGood = true;
        });
      }
    }, 600);

    return;
  } else {
    container[indice].classList.add("wrong");
    selected.classList.add("wrong");

    setTimeout(() => {
      container[indice].classList.remove("wrong");
      selected.classList.remove("wrong");
    }, 500);

    upgradeMistakes();
  }
}

document
  .querySelectorAll(".opt")
  .forEach((letter) => letter.addEventListener("click", logica5y9));

document
  .querySelector(".boton-5 button")
  .addEventListener("click", eventoBoton1y10y6y9);

//-----------------------------------------------------

// exercise 6.

document.querySelector(".audio-2").addEventListener("click", () => {
  playAudio("Good night");
});

document
  .querySelectorAll(".exercise-6 .row")
  .forEach((row) => row.addEventListener("click", rowEvent4and6));

document
  .querySelector(".boton-6 button")
  .addEventListener("click", eventoBoton4y6);

// -------------------------------------------------

//   exercise 7.

//         boton
document
  .querySelector(".boton-7 button")
  .addEventListener("click", eventoBoton2y7);

// ----------------------------------------------

// exercise 8:

document
  .querySelector(".boton-8 button")
  .addEventListener("click", eventoBoton3y8);

//--------------------------------------------------

//               exercise 9.

document
  .querySelectorAll(".lista-opciones")
  .forEach((el) => el.addEventListener("click", logica5y9));

document
  .querySelector(".boton-9 button")
  .addEventListener("click", eventoBoton1y10y6y9);

//--------------------------------------------------

//                exercise 10.

document
  .querySelector(".boton-10 button")
  .addEventListener("click", eventoBoton1y10y6y9);

// -------------------------------------------------

//   results

document.querySelector(".try-again").addEventListener("click", () => {
  console.log("click");
  previousExercises.splice(0);
  wrongExercises = correctExercises = 0;
  exercisesNumber = 0;
  exercisesNumberArray.splice(0);
  mistakes.clear();
  preguntasBienRespondidas.splice(0);
  preguntasMalRespondidas.splice(0);
  document.querySelector(".results").style.display = "none";
  UpdateCurrentExercise(previousExercises);
  showNextExercise();
});
