function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="edit" onclick="editTask(this)">Edit</button>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    taskList.appendChild(li);
    taskInput.value = "";
}

function editTask(button) {
    let li = button.closest("li");
    let span = li.querySelector("span");
    let newText = prompt("Edit task:", span.textContent);

    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
    }
}

function deleteTask(button) {
    let li = button.closest("li");
    li.remove();
}
