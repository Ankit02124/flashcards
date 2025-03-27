// todo.js - Handles todo list functionality

document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    
    // Load saved todos from localStorage
    loadTodos();
    
    // Add todo item
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            createTodoItem(todoText, false);
            todoInput.value = '';
            saveTodos();
        }
    }
    
    function createTodoItem(text, completed) {
        const li = document.createElement('li');
        li.className = 'todo-item' + (completed ? ' completed' : '');
        
        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = completed;
        checkbox.addEventListener('change', function() {
            li.classList.toggle('completed');
            saveTodos();
        });
        
        // Todo text
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = text;
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            li.remove();
            saveTodos();
        });
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }
    
    function saveTodos() {
        const todos = [];
        document.querySelectorAll('.todo-item').forEach(item => {
            todos.push({
                text: item.querySelector('.todo-text').textContent,
                completed: item.querySelector('.todo-checkbox').checked
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    function loadTodos() {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            JSON.parse(savedTodos).forEach(todo => {
                createTodoItem(todo.text, todo.completed);
            });
        }
    }
});