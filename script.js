// Load tasks from localStorage when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    // Function to load all tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            const taskItem = createTaskItem(task.text, task.completed);
            taskList.appendChild(taskItem);
        });
    }

    // Function to create a new task list item
    function createTaskItem(text, completed = false) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = text;

        // Mark task as completed
        if (completed) {
            li.classList.add("completed");
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", () => {
            li.classList.toggle("completed");
            completeButton.textContent = li.classList.contains("completed") ? "Undo" : "Complete";
            updateLocalStorage();
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            li.remove();
            updateLocalStorage();
        });

        li.appendChild(span);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        return li;
    }

    // Function to add a new task
    function addTask(taskText) {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
        updateLocalStorage();
    }

    // Update localStorage with current tasks
    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll("#task-list li").forEach(li => {
            tasks.push({
                text: li.querySelector("span").textContent,
                completed: li.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Event listener for adding tasks
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = ""; // Clear input field
        }
    });

    // Load tasks when the page is loaded
    loadTasks();
});
