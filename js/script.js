{
    const tasks = [];

    const deleteTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskCheck = (taskIndex) => {
        tasks[taskIndex].check = !tasks[taskIndex].check;
        render();
    };
    const addNewTask = (newTask) => {
        tasks.push({
            content: newTask,
            check: false
        });
        render();
    };

    const bindDeleteTaskEvents = () => {
        const deleteButtons = document.querySelectorAll(".js-buttonDelete");

        deleteButtons.forEach((deleteButton, taskIndex) => {
            deleteButton.addEventListener("click", () => {
                deleteTask(taskIndex);
            });
        });
    };

    const bindCheckTaskEvents = () => {
        const toggleCheckButtons = document.querySelectorAll(".js-buttonCheck");

        toggleCheckButtons.forEach((toggleCheckButton, taskIndex) => {
            toggleCheckButton.addEventListener("click", () => {
                toggleTaskCheck(taskIndex);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item js-item">
            <button class="list__button list__button--check js-buttonCheck">
            ${task.check ? "✓" : ""}
            </button>
            <span class="list__task ${task.check ? "list__task--done" : ""}">${task.content}</span>
            <button class="list__button list__button--delete js-buttonDelete">🗑</button>
            </li>
            `;
        }

        document.querySelector(".js-taskList").innerHTML = htmlString;

        bindDeleteTaskEvents();
        bindCheckTaskEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-input");
        const newTask = newTaskElement.value.trim();

        if (newTask !== "") {
            addNewTask(newTask);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}
