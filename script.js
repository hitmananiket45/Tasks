// script.js
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    };

    // Add task to the DOM
    const addTaskToDOM = (task) => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-gray-200 border border-gray-300 rounded p-2 mb-2";
        li.innerHTML = `
            <span class="task-text">${task}</span>
            <button class="delete-btn bg-red-500 text-white rounded px-2 hover:bg-red-600">Delete</button>
        `;
        taskList.appendChild(li);

        // Attach delete event listener
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            removeTaskFromLocalStorage(task);
        });
    };

    // Add task event listener
    addTaskBtn.addEventListener("click", () => {
        const task = taskInput.value.trim();
        if (task) {
            addTaskToDOM(task);
            saveTaskToLocalStorage(task);
            taskInput.value = ""; // Clear input
        }
    });

    // Save task to local storage
    const saveTaskToLocalStorage = (task) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Remove task from local storage
    const removeTaskFromLocalStorage = (task) => {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Load tasks when the page is loaded
    loadTasks();
});
