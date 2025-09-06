let todoList = [];

// Validate input
function validateInput() {
  const todoInput = document.getElementById('todo-input').value;
  const todoDateInput = document.getElementById('todo-date-input').value;
  const statusInput = document.getElementById('status-input').value;

  if (todoInput === '' || todoDateInput === '') {
    alert('Please fill in both the task and due date.');
  } else {
    addTodo(todoInput, todoDateInput, statusInput);
    document.getElementById('todo-input').value = '';
    document.getElementById('todo-date-input').value = '';
    document.getElementById('status-input').value = 'pending';
  }
}

// Add todo item
function addTodo(todo, dueDate, status) {
  const todoItem = {
    task: todo,
    dueDate: dueDate,
    completed: status === "done"
  };
  todoList.push(todoItem);
  renderTodoList();
}

// Delete all
function deleteAllTodo() {
  if (todoList.length === 0) {
    alert("No tasks to delete.");
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete all tasks?");
  if (confirmDelete) {
    todoList = [];
    renderTodoList();
    alert("All tasks have been deleted.");
  }
}


// Filter
function filterTodo(filterType) {
  if (filterType === 'pending') {
    renderTodoList(todoList.filter(item => !item.completed));
  } else if (filterType === 'done') {
    renderTodoList(todoList.filter(item => item.completed));
  } else {
    renderTodoList();
  }
}

// Render
function renderTodoList(filteredList) {
  const tbody = document.getElementById('todo-body');
  tbody.innerHTML = '';

  const listToRender = filteredList || todoList;

  listToRender.forEach((item, index) => {
    const row = document.createElement('tr');

    // Task
    const taskCell = document.createElement('td');
    taskCell.className = "border border-gray-300 px-4 py-2";
    taskCell.textContent = item.task;
    row.appendChild(taskCell);

    // Due Date
    const dateCell = document.createElement('td');
    dateCell.className = "border border-gray-300 px-4 py-2";
    dateCell.textContent = item.dueDate;
    row.appendChild(dateCell);

    // Status
    const statusCell = document.createElement('td');
    statusCell.className = "border border-gray-300 px-4 py-2 text-center";
    statusCell.textContent = item.completed ? "Done" : "On Progress";
    row.appendChild(statusCell);

    // Actions
    const actionCell = document.createElement('td');
    actionCell.className = "border border-gray-300 px-4 py-2";

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "bg-red-500 text-white px-2 py-1 rounded text-center";
    deleteBtn.onclick = () => {
      todoList.splice(index, 1);
      renderTodoList();
    };
    

    actionCell.appendChild(deleteBtn);
    row.appendChild(actionCell);

    tbody.appendChild(row);
  });
}


        