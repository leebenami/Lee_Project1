function saveNewNote() {
  const inputs = document.querySelectorAll("input");
  const textArea = document.querySelector("textarea");

  const note = {
    mission: textArea.value,
    date: inputs[0].value,
    time: inputs[1].value,
  };

  const currenNotes = localStorage.getItem("allNotes");

  let arr = [];

  if (currenNotes) {
    arr = JSON.parse(currenNotes);
  }

  arr.push(note);

  localStorage.setItem("allNotes", JSON.stringify(arr));

  textArea.value = "";
  inputs[0].value = "";
  inputs[1].value = "";

  loadNotes(true);
}

function loadNotes(newNote = false) {
  const currenNotes = localStorage.getItem("allNotes");
  if (currenNotes) {
    const notesDiv = document.querySelector("#notes");
    let noteBuild = "";
    const arr = JSON.parse(currenNotes);
    for (let i = 0; i < arr.length; i++) {
      const note = arr[i];

      let noteClassName = "noteDivs";
      if (newNote && i === arr.length - 1) {
        noteClassName += " new-note";
      }
      //Create New Note
      noteBuild += `
      <div class="${noteClassName}" id="noteDivs_${i}">
        <i class="bi bi-trash" icon-index="${i}"></i>
        <img src="./assets/notebg.png" />
        <div class="content">
          <p class="taskContent">${note.mission}</p>
        </div>
        <p class="dateContent">${note.date}</p>
        <p class="timeContent">${note.time}</p>
        </div>`;
    }
    notesDiv.innerHTML = noteBuild;
  }
  const icons = document.querySelectorAll("i");
  for (const icon of icons) {
    icon.onclick = remove;
  }
}

function remove(event) {
  const iconIndex = event.target.getAttribute("icon-index");
  const element = document.getElementById(`noteDivs_${iconIndex}`);

  if (element) {
    //Add Fade-Out Animation To Deleted Note
    element.classList.add("delete-note");
    setTimeout(() => {
      element.remove();
      const currenNotes = localStorage.getItem("allNotes");
      if (currenNotes) {
        const arr = JSON.parse(currenNotes);
        arr.splice(iconIndex, 1);
        localStorage.setItem("allNotes", JSON.stringify(arr));
        //Reload the notes to create an overlap between notes[i] and the array
        loadNotes();
      }
    }, 1200);
  }
}

function clearInputValues() {
  const inputs = document.querySelectorAll("input");
  const textArea = document.querySelector("textarea");

  textArea.value = "";
  inputs[0].value = "";
  inputs[1].value = "";
}

function onFormSubmit(event) {
  event.preventDefault();
  saveNewNote();
}

function onWindowLoad() {
  loadNotes();

  const form = document.querySelector("form");
  form.onsubmit = onFormSubmit;

  const resetBtn = document.querySelector("#resetBtn");
  resetBtn.onclick = clearInputValues;
}

window.onload = onWindowLoad;
