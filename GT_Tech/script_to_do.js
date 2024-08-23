document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const dueDateInput = document.getElementById("due-date-input");
    const priorityInput = document.getElementById("priority-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const filterBtns = document.querySelectorAll(".filter-btn");

    addTaskBtn.addEventListener("click", addTask);
    taskList.addEventListener("click", handleTaskAction);
    filterBtns.forEach(btn => btn.addEventListener("click", filterTasks));

    function addTask() {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;

        if (taskText === "") return;

        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        const taskTextNode = document.createElement("span");
        taskTextNode.classList.add("task-text");
        taskTextNode.textContent = taskText;

        const taskDueDate = document.createElement("span");
        taskDueDate.classList.add("task-due-date");
        taskDueDate.textContent = dueDate ? `Due: ${new Date(dueDate).toLocaleDateString()}` : "";

        const taskPriority = document.createElement("span");
        taskPriority.classList.add("task-priority", priority);
        taskPriority.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);

        const completeBtn = document.createElement("button");
        completeBtn.classList.add("complete-btn");
        completeBtn.textContent = "✔";

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "✏";

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn"); // Added class for better identification
        deleteBtn.textContent = "✖";

        taskItem.appendChild(taskTextNode);
        taskItem.appendChild(taskDueDate);
        taskItem.appendChild(taskPriority);
        taskItem.appendChild(completeBtn);
        taskItem.appendChild(editBtn);
        taskItem.appendChild(deleteBtn);

        taskList.appendChild(taskItem);
        taskInput.value = "";
        dueDateInput.value = "";
        priorityInput.value = "low";
    }

    function handleTaskAction(e) {
        const target = e.target;

        if (target.classList.contains("complete-btn")) {
            target.parentElement.classList.toggle("completed");
        } else if (target.classList.contains("edit-btn")) {
            const taskItem = target.parentElement;
            const taskText = taskItem.querySelector(".task-text");
            const newTaskText = prompt("Edit task:", taskText.textContent);
            if (newTaskText !== null) taskText.textContent = newTaskText;
        } else if (target.classList.contains("delete-btn")) {
            target.parentElement.remove();
        }
    }

    function filterTasks(e) {
        const filter = e.target.dataset.filter;
        const tasks = taskList.childNodes;

        tasks.forEach(task => {
            if (task.nodeType === Node.ELEMENT_NODE) {
                switch (filter) {
                    case "all":
                        task.style.display = "flex";
                        break;
                    case "completed":
                        task.style.display = task.classList.contains("completed") ? "flex" : "none";
                        break;
                    case "incomplete":
                        task.style.display = !task.classList.contains("completed") ? "flex" : "none";
                        break;
                }
            }
        });
    }
});
