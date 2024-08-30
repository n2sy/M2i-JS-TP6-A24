const liste = document.getElementById("listTasks");
const inputTask = document.getElementById("inp");
const btnAjouter = document.getElementById("btn-ajouter");
const btnAnnuler = document.getElementById("btn-annuler");

function toggleButtons() {
  btnAjouter.hidden = !btnAjouter.hidden;
  btnAnnuler.hidden = !btnAnnuler.hidden;
  inputTask.hidden = !inputTask.hidden;
}

function convertTasksToLi(data) {
  for (const task of data) {
    const newLi = document.createElement("li");
    newLi.className = "list-group-item";

    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = task.checked;

    const titleSpan = document.createElement("span");
    titleSpan.textContent = task.title;
    titleSpan.style.margin = "0 20px";

    const badgeSpan = document.createElement("span");
    badgeSpan.className = "badge text-bg-secondary";
    let heures = new Date(task.date).getHours();
    let minutes = new Date(task.date).getMinutes();
    badgeSpan.textContent = `${heures}H ${minutes}m`;

    newLi.appendChild(newCheckbox);
    newLi.appendChild(titleSpan);
    newLi.appendChild(badgeSpan);
    liste.appendChild(newLi);
  }
}

function getAllTasks() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/tasks");
  xhr.onload = function () {
    if (xhr.status == 200) {
      const data = JSON.parse(xhr.responseText);
      convertTasksToLi(data);
    } else {
      alert("Problème avec la lecture du Task 7288");
    }
  };
  xhr.send();
}

getAllTasks();

btnAjouter.addEventListener("click", () => {
  toggleButtons();
});

btnAnnuler.addEventListener("click", () => {
  toggleButtons();
});

inputTask.addEventListener("change", () => {
  let newTask = {
    title: inputTask.value,
    checked: false,
    date: new Date(),
  };
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/tasks");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.status == 201) {
      alert("Task créé avec succès");
      getAllTasks();
    } else {
      alert("Problème avec la création du Task");
    }
    toggleButtons();
  };
  xhr.send(JSON.stringify(newTask));
  toggleButtons();
});
