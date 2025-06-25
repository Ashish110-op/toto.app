document.addEventListener("DOMContentLoaded", () => {
    const storedTask = JSON.parse(localStorage.getItem('tasks'))

    if(storedTask){
        storedTask.forEach((task) => tasks.push(task))
        updateTaskList();
        updateStats();
    }
})

const tasks = [];
const saveTask = () =>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput')
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";

        updateTaskList();
        updateStats();
        saveTask();

    }
};
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTask();

};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTask();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text

    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTask();
};

const updateStats = () => {
    const completeTask = tasks.filter(task => task.completed).length;
    const totalTask = tasks.length
    const progress = (completeTask / totalTask) * 100;
    const progressbar = document.getElementById('progress');
    progressbar.style.width = `${progress}%`
    document.getElementById('numbers').innerText = `${completeTask}/ ${totalTask}`
}

const updateTaskList = () => {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li')

        listItem.innerHTML = `
        <div class= "taskItem">
        <div class = "task ${task.completed ? 'completed' : ''}">
        <input type = "checkbox" class= "checkbox" ${task.completed ? "checked" : ""}/>
        <p>${task.text}</p>
        </div>
       <div class="icons">
       <img src="img/edit.png" alt = "Edit" onClick = "editTask(${index})">
        <img src="img/bin.png" onClick = "deleteTask(${index})">
        </div>
        </div>
        `;
        listItem.addEventListener('change', () => toggleTaskComplete(index));
        taskList.append(listItem);

        console.log(listItem.innerHTML);
    });

};


document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault()
    addTask();
})