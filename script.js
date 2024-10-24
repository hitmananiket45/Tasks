// script.js
document.addEventListener("DOMContentLoaded", () => {
    const taskTitle = document.getElementById("taskTitle");
    const taskDescription = document.getElementById("taskDescription");
    const dueDate = document.getElementById("dueDate");
    const priority = document.getElementById("priority");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const searchInput = document.getElementById("searchInput");
    const filterStatus = document.getElementById("filterStatus");

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
            <div>
                <h3 class="font-bold">${task.title}</h3>
                <p>${task.description}</p>
                <p>Due: ${task.dueDate}</p>
                <p class="text-sm">Priority: <span class="${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}">${task.priority}</span></p>
            </div>
            <div>
                <input type="checkbox" class="complete-checkbox" ${task.completed ? 'checked' : ''} />
                <button class="delete-btn bg-red-500 text-white rounded px-2 hover:bg-red-600">Delete</button>
            </div>
        `;
        taskList.appendChild(li);

        // Attach event listeners
        li.querySelector('.complete-checkbox').addEventListener('change', () => {
            task.completed = !task.completed;
            saveTasksToLocalStorage();
            loadTaskList();
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            removeTaskFromLocalStorage(task);
            li.remove();
        });
    };

    // Add task event listener
    addTaskBtn.addEventListener("click", () => {
        const task = {
            title: taskTitle.value.trim(),
            description: taskDescription.value.trim(),
            dueDate: dueDate.value,
            priority: priority.value,
            completed: false
        };
        if (task.title) {
            addTaskToDOM(task);
            saveTaskToLocalStorage(task);
            taskTitle.value = ""; // Clear input
            taskDescription.value = "";
            dueDate.value = "";
            priority.value = "";
        }
    });

    // Save task to local storage
    const saveTaskToLocalStorage = (task) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Remove task from local storage
    const removeTaskFromLocalStorage = (taskToRemove) => {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.title !== taskToRemove.title);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Load tasks when the page is loaded
    loadTasks();

    // Search and filter tasks
    searchInput.addEventListener("input", loadTaskList);
    filterStatus.addEventListener("change", loadTaskList);

    const loadTaskList = () => {
        taskList.innerHTML = ''; // Clear existing list
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const searchTerm = searchInput.value.toLowerCase();
        const selectedStatus = filterStatus.value;

        tasks.forEach(task => {
            if (
                task.title.toLowerCase().includes(searchTerm) &&
                (selectedStatus === "" || (selectedStatus === "completed" && task.completed) || (selectedStatus === "incomplete" && !task.completed))
            ) {
                addTaskToDOM(task);
            }
        });
    };
});
