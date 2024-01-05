document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const filterSelect = document.getElementById('filterSelect')
    const filterInput = document.getElementById('filterInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const datePicker = document.getElementById('datePicker');

    // 4. Local Storage: Retrieving tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Populate tasks from local storage
    storedTasks.forEach(task => {
        addTaskToList(task.text, task.deadline, task.priority, task.status);
    });

    // Event listener for form submissions
    addTaskBtn.addEventListener('click', () => {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();
        const taskDeadline = datePicker.value;
        const taskPriority = prioritySelect.value;

        if (taskText !== '') {
            // Add the task to the list
            addTaskToList(taskText, taskDeadline, taskPriority, 'pending');

            // 4. Local Storage: Storing tasks in local storage
            storedTasks.push({ text: taskText, deadline: taskDeadline, priority: taskPriority, status: 'pending' });
            localStorage.setItem('tasks', JSON.stringify(storedTasks));

            // Clear the input field
            taskInput.value = '';
        }
    });
    filterSelect.addEventListener('change', () => {
        filterTasks();
    });

    filterInput.addEventListener('input', () => {
        filterTasks();
    });

    // 5. Filter and Search: Functionality to filter and search tasks
    filterInput.addEventListener('input', () => {
        const searchTerm = filterInput.value.trim().toLowerCase();
        const tasks = Array.from(taskList.children);

        tasks.forEach(task => {
            const taskText = task.textContent.toLowerCase();
            task.style.display = taskText.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // 6. Priority Levels (Optional): Functionality for setting priority levels
    prioritySelect.addEventListener('change', () => {
        const selectedPriority = prioritySelect.value;
        // Update task styling or perform other actions based on the selected priority.
    });

    // 7. Deadline and Reminders (Optional): Functionality for setting deadlines and reminders
    datePicker.addEventListener('change', () => {
        const selectedDate = datePicker.value;
        scheduleReminder(selectedDate); // Call a function to handle reminders
    });

    // 8. Responsive Design: Use media queries to adjust styling based on screen size
    // (Additional CSS rules may be required)

    // 9. Animations (Optional): Add subtle animations to enhance the user experience
    // (Implementation details depend on the specific requirements)
});

// Function to add a task to the list
function addTaskToList(taskText, taskDeadline, taskPriority, taskStatus) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('div');
    taskItem.textContent = `${taskText} - Deadline: ${taskDeadline}, Priority: ${taskPriority}`;
    taskItem.setAttribute('data-status', taskStatus);

    // Check for expired tasks
    if (taskStatus === 'pending' && isTaskExpired(taskDeadline)) {
        taskItem.classList.add('completed');
        taskItem.setAttribute('data-status', 'completed');
    }

    taskList.appendChild(taskItem);
}

// Function to check if a task is expired based on its deadline
function isTaskExpired(deadline) {
    const now = new Date();
    const taskDeadline = new Date(deadline);
    return now > taskDeadline;
}

// Function to handle reminders
function scheduleReminder(date) {
    // Implement logic to schedule reminders based on the selected date
    // This could involve notifications, highlighting, or other visual cues.
}
// Function to filter tasks based on completion status and search term
function filterTasks() {
    const filterSelect = document.getElementById('filterSelect');
    const filterInput = document.getElementById('filterInput').value.toLowerCase();
    const tasks = document.querySelectorAll('.task-list div');

    tasks.forEach(task => {
        const taskText = task.textContent.toLowerCase();
        const taskStatus = task.getAttribute('data-status');
        const selectedFilter = filterSelect.value;

        const isMatch = taskText.includes(filterInput) &&
                        (selectedFilter === 'all' || taskStatus === selectedFilter);

        task.style.display = isMatch ? 'block' : 'none';
    });
}