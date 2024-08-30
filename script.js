document.getElementById("btn2").addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/tasks");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.status == 201) {
      alert("Task créé avec succès");
    } else {
      alert("Problème avec la création du Task");
    }
  };
  xhr.send(
    JSON.stringify({
      title: "Task 1",
      checked: true,
    })
  );
});
document.getElementById("btn").addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/tasks/7288");
  xhr.onload = function () {
    if (xhr.status == 200) {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
    } else {
      alert("Problème avec la lecture du Task 7288");
    }
  };
  xhr.send();
});
