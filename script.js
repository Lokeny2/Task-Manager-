//  1. State 
let tasks = JSON.parse(localStorage.getItem('enhancedTasks')) || [];
let currentFilter = 'all';

// 2. Selectors
const taskInput = document.querySelector('#taskInput');
const addBtn = document.querySelector('#addBtn');
const taskList = document.querySelector('#taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const emptyMessage = document.querySelector('#emptyMessage');

// 3. Rendering Logic 

function renderTasks() {
    // Clear list for re-rendering
    taskList.innerHTML = '';

    // Step A: Filter the array
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    // Step B: Handle Empty Messages
    if (filteredTasks.length === 0) {
        let message = "";
        
        // Logic for specific messages based on the filter
        if (currentFilter === 'all') {
            message = "No task today, Enjoy Yourself";
        } else if (currentFilter === 'active') {
            message = "Add more tasks";
        } else if (currentFilter === 'completed') {
            message = "No Achievement Yet";
        }
        
        emptyMessage.textContent = message;
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }

    // Step C: The Loop
    filteredTasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        // Task Text
        const span = document.createElement('span');
        span.textContent = task.text;
        span.style.flex = "1";
        span.style.cursor = "pointer";
        span.onclick = () => toggleTask(task.id);

        // Delete Button
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'Delete';
        delBtn.onclick = (e) => {
            e.stopPropagation(); // Prevents triggering the toggleTask when deleting
            deleteTask(task.id);
        };

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });

    // Step D: Sync with LocalStorage
    localStorage.setItem('enhancedTasks', JSON.stringify(tasks));
}

// 4. Actions 

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
        id: Date.now(), // Unique ID
        text: text,
        completed: false
    });

    taskInput.value = '';
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

// 5. Event Listeners

addBtn.onclick = addTask;

taskInput.onkeypress = (e) => {
    if (e.key === 'Enter') addTask();
};

filterBtns.forEach(btn => {
    btn.onclick = () => {
        // UI Update: Active class
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        
        // State Update: Filter and Render
        currentFilter = btn.dataset.filter;
        renderTasks();
    };
});

// Initial Render
renderTasks();
