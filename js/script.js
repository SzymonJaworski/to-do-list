{
    let tasks = [];
    let doneTasksHidden = false;

    const deleteTask = (taskIndex) => {
        tasks = tasks.filter((task, index) => index !== taskIndex);
        render();
    };

    const toggleTaskCheck = (taskIndex) => {
        tasks = tasks.map((task, index) =>
            index === taskIndex ? { ...task, check: !task.check } : task
        );
        render();
    };

    const addNewTask = (newTask) => {
        tasks = [
            ...tasks,
            { content: newTask, check: false }
        ];
        render();
    };

    const toggleDoneVisibility = () => {
        doneTasksHidden = !doneTasksHidden;
        render();
    };

    const completeAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            check: true
        }));
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

    const bindControlEvents = () => {
        const hideDoneButton = document.querySelector(".js-hideDoneSwitch");
        const allDoneButton = document.querySelector(".js-completeAll");

        if (hideDoneButton) {
            hideDoneButton.addEventListener("click", toggleDoneVisibility);
        }

        if (allDoneButton) {
            allDoneButton.addEventListener("click", completeAllTasks);
        }
    };

    const renderSectionButtons = () => {
        const containerElement = document.querySelector(".js-panel");

        if (tasks.length === 0) {
            containerElement.innerHTML = "";
            return;
        }

        containerElement.innerHTML = `
        <button class="section__button section__button--disabled js-hideDoneSwitch">
        ${doneTasksHidden ? "Pokaż" : "Ukryj"} 
        ukończone </button>
        <button class="section__button js-completeAll" 
        ${tasks.every(({ check }) => check) ? "disabled" : ""}> 
        Ukończ wszystkie </button>
        `;
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="list__item ${task.check && doneTasksHidden ? "list__item--hidden" : ""} js-item">
        <button class="list__button list__button--check js-buttonCheck">
        ${task.check ? "✓" : ""} 
        </button>
        <span class="list__task ${task.check ? "list__task--done" : ""}">${task.content}</span>
        <button class="list__button list__button--delete js-buttonDelete">🗑</button>
        </li>
        `;
        }

        document.querySelector(".js-taskList").innerHTML = htmlString;

        renderSectionButtons();
        bindDeleteTaskEvents();
        bindCheckTaskEvents();
        bindControlEvents();
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
