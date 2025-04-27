document /
  addEventListener("DOMContentLoaded", () => {
    let taskInput = document.getElementById("todo-input");
    let addTaskBtn = document.getElementById("add-task-btn");
    let tasksList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => renderTasks(task));

    addTaskBtn.addEventListener("click", () => {
      if (taskInput.value === "") return;
      const newTask = {
        id: Date.now(),
        text: taskInput.value,
        completed: false,
      };
      tasks.push(newTask);
      saveToLocalStorage();
      renderTasks(newTask);
      taskInput.value = "";
    });

    function saveToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks(task) {
      const li = document.createElement("li");
      li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;
      li.addEventListener("click", (e) => {
        if (e.target.tagName == "BUTTON") return;
        task.completed = !task.completed;
        li.classList.toggle("completed");
        saveToLocalStorage();
      });

      li.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        tasks = tasks.filter((t) => t.id !== task.id);
        li.remove();
        saveToLocalStorage();
      });

      tasksList.appendChild(li);
    }
  });
