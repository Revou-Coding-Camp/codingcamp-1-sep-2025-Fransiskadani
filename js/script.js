// /// Variables to store todo items
// let todoList = [];

// /// Function to validate input fields
// function validateInput() {
//     const todoInput = document.getElementById('todo-input').value;
//     const todoDateInput = document.getElementById('todo-date-input').value;

//     if (todoInput === '' || todoDateInput === '') {
//         alert('Please fill in both the task and due date.');
//     } else {
//         addTodo(todoInput, todoDateInput);
//     }
// }

// function addTodo(todo, dueDate) {
//     // Add a new todo item to the list
//     const todoItem = {
//         task: todo,
//         dueDate: dueDate,
//         completed: false
//     };

//     /// Push the new item to the todo list array
//     todoList.push(todoItem);

//     /// Re-render the todo list
//     renderTodoList();
// }

// function deleteAllTodo() {
//     // Clear the todo list array
//     todoList = [];

//     /// Re-render the todo list
//     renderTodoList();
// }

// function filterTodo() {

// }

// function renderTodoList() {
//     // Code to render the todo list on the webpage
//     const todoListContainer = document.getElementById('todo-list');
//     todoListContainer.innerHTML = ''; // Clear existing list

//     /// Loop through the todoList array and create HTML elements for each item
//     todoList.forEach((item) => {
//         todoListContainer.innerHTML += `
//             <p>${item.task} - Due: ${item.dueDate}</p>
//         `;
//     });
// }


let todoList = [];

        /// Function to validate input fields
        function validateInput() {
            const todoInput = document.getElementById('todo-input').value;
            const todoDateInput = document.getElementById('todo-date-input').value;

            if (todoInput === '' || todoDateInput === '') {
                alert('Please fill in both the task and due date.');
            } else {
                addTodo(todoInput, todoDateInput);
                document.getElementById('todo-input').value = '';
                document.getElementById('todo-date-input').value = '';
            }
        }

        /// Add todo item
        function addTodo(todo, dueDate) {
            const todoItem = {
                task: todo,
                dueDate: dueDate,
                completed: false
            };
            todoList.push(todoItem);
            renderTodoList();
        }

        /// Delete all tasks
        function deleteAllTodo() {
            todoList = [];
            renderTodoList();
        }

        /// Filter tasks
        function filterTodo(filterType) {
            if (filterType === 'pending') {
                renderTodoList(todoList.filter(item => !item.completed));
            } else if (filterType === 'done') {
                renderTodoList(todoList.filter(item => item.completed));
            } else {
                renderTodoList();
            }
        }

        /// Render todo list
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
                statusCell.className = "border border-gray-300 px-4 py-2";
                statusCell.textContent = item.completed ;
                row.appendChild(statusCell);

                // Actions
                const actionCell = document.createElement('td');
                actionCell.className = "border border-gray-300 px-4 py-2";

                const completeBtn = document.createElement('button');
                completeBtn.textContent = item.completed ? "Undo" : "Complete";
                completeBtn.className = "bg-green-500 text-white px-2 py-1 rounded mr-2";
                completeBtn.onclick = () => {
                    todoList[index].completed = !todoList[index].completed;
                    renderTodoList();
                };

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = "Delete";
                deleteBtn.className = "bg-red-500 text-white px-2 py-1 rounded";
                deleteBtn.onclick = () => {
                    todoList.splice(index, 1);
                    renderTodoList();
                };

                actionCell.appendChild(completeBtn);
                actionCell.appendChild(deleteBtn);
                row.appendChild(actionCell);

                tbody.appendChild(row);
            });
        }