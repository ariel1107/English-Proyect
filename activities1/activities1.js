"use strict";

const options = document.querySelectorAll(".option");

// let selectedOption;

// Hacer opciones arrastrables
options.forEach((opt) => {
  opt.addEventListener("dragstart", (e) => {
    // e.dataTransfer.setData("text", e.target.textContent.trim());
    e.dataTransfer.setData("text", opt.dataset.value);
    // e.target.classList.add("selected");
  });
  // opt.addEventListener("click", (e) => {
  //   selectedOption = e.target.textContent.trim();
  //   e.target.classList.add("selected");
  // });
});

// Configurar zonas de drop
document.querySelectorAll(".word").forEach((slot) => {
  const correct = slot.querySelector(".word-text").textContent.trim();

  slot.addEventListener("dragover", (e) => e.preventDefault());

  slot.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggedText = e.dataTransfer.getData("text");
    const element = document.querySelector(
      `.option[data-value="${draggedText}"]`
    );

    if (draggedText === correct) {
      slot.querySelector(".word-text").style.visibility = "visible";
      slot.style.background = "green";
      element.style.display = "none";
      updateButton();
    } else {
      slot.style.background = "red";
      setTimeout(() => {
        slot.style.background = "";
      }, 500);
    }

    // if (draggedText === correct) {
    //   slot.querySelector(".word-text").style.visibility = "visible";
    //   slot.style.background = "lightgreen";
    // } else {
    //   slot.style.background = "salmon";
    //   setTimeout(() => {
    //     slot.style.background = "";
    //   }, 600);
    // }
  });

  // slot.addEventListener("click", () => {
  //   if (selectedOption) {
  //     fillSlot(slot, selectedOption, correct);
  // limpiar selección visual
  //     document
  //       .querySelectorAll(".option")
  //       .forEach((o) => o.classList.remove("selected"));
  //     selectedOption = null;
  //   }
  // });
});

const button = document.querySelector(".boton");
const slots = document.querySelectorAll(".word-text");

button.disabled = true;

function updateButton() {
  const allFilled = Array.from(slots).every(
    (span) => getComputedStyle(span).visibility === "visible"
  );

  console.log(allFilled);
  if (allFilled) {
    button.disabled = false;
  }
}

button.addEventListener("click", function () {
  if (!button.disabled) {
    const proceed = confirm("Are you sure you want to go to the next exercise");
    if (proceed) {
      document.querySelector(".exercise-1").style.display = "none";
      document.querySelector(".exercise-2").style.display = "block";
    }
  } else {
    options.forEach((opt) => {
      opt.style.background = "red";

      setTimeout(() => {
        opt.style.background = "";
      }, 400);
    });
  }
});

//-----------------------------------------------------

// exercise 2:

let selected = null;
const dropzone = document.querySelectorAll(".dropzone");

dropzone.forEach((item) => {
  item.draggable = true;
  item.addEventListener("dragstart", function (e) {
    const arrastrable = item.querySelector(".partener");
    e.dataTransfer.setData("text", arrastrable.dataset.value);
    selected = item;
    selected.classList.add("dragging");
  });

  item.addEventListener("dragenter", function (e) {
    e.preventDefault();
  });

  item.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  item.addEventListener("drop", function (e) {
    e.preventDefault();
    if (selected.classList.contains("dragging"))
      selected.classList.remove("dragging");
    if (selected === item) return;
    const draggedValue = e.dataTransfer.getData("text");
    const targetValue = item.dataset.value;
    const destiny = e.target;

    const targetTextValue = destiny.dataset.value;
    const containerselectedValue = selected.dataset.value;

    const same = draggedValue === targetValue;
    const same2 = containerselectedValue === targetTextValue;

    if (same && same2) {
      selected.classList.add("dragged");
      item.classList.add("dragged");
      selected.appendChild(destiny);
      item.textContent = "";
      const correct = document.querySelector(
        `.partener[data-value=${draggedValue}]`
      );
      item.appendChild(correct);

      selected = null;
    } else if (same) {
      selected.appendChild(destiny);
      item.innerHTML = "";
      const correct = document.querySelector(
        `.partener[data-value=${draggedValue}]`
      );
      item.appendChild(correct);
      item.classList.add("dragged");
      selected = null;
    } else if (same2) {
      selected.appendChild(destiny);
      item.textContent = "";
      const correct = document.querySelector(
        `.partener[data-value=${draggedValue}]`
      );
      item.appendChild(correct);
      selected.classList.add("dragged");
      selected = null;
    } else {
      item.style.background = "salmon";
      setTimeout(() => {
        item.style.background = "";
      }, 500);

      selected = null;
    }
  });
});

//         boton
document.querySelector(".boton-2").addEventListener("click", () => {
  if ([...dropzone].every((item) => item.classList.contains("dragged"))) {
    const proceed = confirm("Are you sure you want to go to the next exercise");
    if (proceed) {
      document.querySelector(".exercise-2").style.display = "none";
      document.querySelector(".exercise-3").style.display = "block";
    }
  } else {
    dropzone.forEach((item) => {
      if (!item.classList.contains("dragged")) {
        item.style.background = "salmon";
        setTimeout(() => {
          item.style.background = "";
        }, 500);
      }
    });
  }
});

//------------------------------------------------

//exercise-3.

const validValue = "Good-Morning";

document.querySelector(".boton-3").addEventListener("click", () => {
  const seleccionado = document.querySelector('input[name="option"]:checked');

  if (!seleccionado) {
    document.querySelectorAll(".circule").forEach((circ) => {
      circ.style.background = "red";
      circ.style.borderColor = "black";

      setTimeout(() => {
        circ.style.background = "";
        circ.style.borderColor = "";
      }, 500);
    });
  } else if (seleccionado.value === validValue) {
    const container = seleccionado.closest("label.personalized");
    container.classList.add("is-correct");

    const radios = document.querySelectorAll('input[type="radio"');
    radios.forEach((input) => (input.disabled = true));

    setTimeout(() => {
      const proceed = confirm("Well done!! Next exercise?");
      if (proceed) {
        document.querySelector(".exercise-3").style.display = "none";
        document.querySelector(".exercise-4").style.display = "block";
      }
    }, 500);
  } else {
    const container = seleccionado.closest("label.personalized");
    container.classList.add("is-wrong");
    setTimeout(() => container.classList.remove("is-wrong"), 600);
  }
});

//---------------------------------------------

//                   exercise 4.

const play = document.querySelector(".audio");
let counter = 0;

play.addEventListener("click", () => {
  const text = "Nice to see you";
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";

  if (counter % 2 === 0) {
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
  } else {
    utterance.rate = 0.3;
    utterance.pitch = 1;
    utterance.volume = 1;
  }

  if (counter === 3) counter = 0;
  counter++;
  console.log(counter);

  speechSynthesis.speak(utterance);
});

const respuestaCorrecta = "see";
const rows = document.querySelectorAll(".row");
const rowArr = [...rows];
let userSelection = null;

rows.forEach((row) => {
  row.addEventListener("click", () => {
    if (rowArr.some((row) => row.classList.contains("selected"))) {
      const selection = rowArr.find((row) =>
        row.classList.contains("selected")
      );
      if (selection === row) selection.classList.remove("selected");
      else {
        selection.classList.remove("selected");
        row.classList.add("selected");
      }
    } else {
      row.classList.add("selected");
    }

    userSelection = row.dataset.value;
  });
});

document.querySelector(".boton-4").addEventListener("click", () => {
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
      const proceed = confirm("Good Job!! Next exercise?");
      if (proceed) {
        document.querySelector(".exercise-4").style.display = "none";
        document.querySelector(".exercise-5").style.display = "block";
      }
    }, 600);
  } else {
    rows.forEach((row) => {
      if (row.classList.contains("selected")) {
        row.classList.remove("selected");
        row.style.background = "salmon";
        setTimeout(() => (row.style.background = ""), 500);
      }
    });
  }
});

//-----------------------------------------------

// exercise 5.
const list = document.querySelectorAll(".opt");
const spaces = document.querySelectorAll(".words");
let currentlyDragging = null;
let allGood = false;

list.forEach((opt) => {
  opt.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", opt.dataset.value);
    currentlyDragging = opt;
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
      currentlyDragging = null;

      if ([...spaces].every((space) => space.style.background === "lightgreen"))
        list.forEach((list) => {
          list.classList.add("all-set");
          list.style.opacity = 0.4;
          allGood = true;
        });
    } else {
      word.style.background = "salmon";
      setTimeout(() => {
        word.style.background = "";
      }, 500);
      currentlyDragging = null;
    }
  });
});

document.querySelector(".boton-5").addEventListener("click", () => {
  if (allGood) {
    const proceed = confirm("Great job!! next exercise?");
    if (proceed) {
      document.querySelector(".exercise-5").style.display = "none";
      document.querySelector(".exercise-1").style.display = "block";
    }
  } else {
    list.forEach((list) => {
      list.style.background = "salmon";
      setTimeout(() => {
        list.style.background = "";
      }, 500);
    });
  }
});

//-----------------------------------------------------

// exercise 6.
