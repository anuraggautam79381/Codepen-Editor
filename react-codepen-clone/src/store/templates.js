// Template code snippets for the CodePen clone

export const templates = {
  default: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodePen Clone</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>Start coding and see your changes in real-time!</p>
</body>
</html>`,
    css: `body {
    font-family: Arial, sans-serif;
    margin: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
}

h1 {
    color: #fff;
    text-align: center;
    margin-bottom: 20px;
}

p {
    text-align: center;
    font-size: 18px;
}`,
    javascript: `// Welcome to the CodePen Clone!
// Try some JavaScript here

console.log('Hello from the JavaScript editor!');

// Example: Change background color on click
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    body.addEventListener('click', function() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        body.style.background = \`linear-gradient(135deg, \${randomColor} 0%, \${colors[(colors.indexOf(randomColor) + 1) % colors.length]} 100%)\`;
    });
});`
  },

  calculator: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
</head>
<body>
    <div class="calculator">
        <div class="display">
            <input type="text" id="result" readonly>
        </div>
        <div class="buttons">
            <button onclick="clearDisplay()">C</button>
            <button onclick="deleteLast()">⌫</button>
            <button onclick="appendToDisplay('/')">/</button>
            <button onclick="appendToDisplay('*')">×</button>
            
            <button onclick="appendToDisplay('7')">7</button>
            <button onclick="appendToDisplay('8')">8</button>
            <button onclick="appendToDisplay('9')">9</button>
            <button onclick="appendToDisplay('-')">-</button>
            
            <button onclick="appendToDisplay('4')">4</button>
            <button onclick="appendToDisplay('5')">5</button>
            <button onclick="appendToDisplay('6')">6</button>
            <button onclick="appendToDisplay('+')">+</button>
            
            <button onclick="appendToDisplay('1')">1</button>
            <button onclick="appendToDisplay('2')">2</button>
            <button onclick="appendToDisplay('3')">3</button>
            <button onclick="calculate()" class="equals" rowspan="2">=</button>
            
            <button onclick="appendToDisplay('0')" class="zero">0</button>
            <button onclick="appendToDisplay('.')">.</button>
        </div>
    </div>
</body>
</html>`,
    css: `body {
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
}

.calculator {
    background: #333;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    width: 300px;
}

.display {
    margin-bottom: 15px;
}

#result {
    width: 100%;
    height: 60px;
    font-size: 24px;
    text-align: right;
    border: none;
    background: #222;
    color: white;
    border-radius: 8px;
    padding: 0 15px;
    box-sizing: border-box;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

button {
    height: 60px;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    background: #666;
    color: white;
    transition: all 0.2s;
}

button:hover {
    background: #777;
    transform: translateY(-2px);
}

button:active {
    transform: translateY(0);
}

.equals {
    background: #ff6b35;
    grid-row: span 2;
}

.equals:hover {
    background: #ff5722;
}

.zero {
    grid-column: span 2;
}`,
    javascript: `let display = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendToDisplay(value) {
    if (display.value === '0' || display.value === 'Error') {
        display.value = '';
    }
    display.value += value;
}

function clearDisplay() {
    display.value = '';
    currentInput = '';
    operator = '';
    previousInput = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace × with * for calculation
        let expression = display.value.replace(/×/g, '*');
        let result = eval(expression);
        
        // Handle division by zero
        if (!isFinite(result)) {
            display.value = 'Error';
            return;
        }
        
        display.value = result;
        console.log(\`Calculation: \${expression} = \${result}\`);
    } catch (error) {
        display.value = 'Error';
        console.error('Calculation error:', error);
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key === '*' ? '×' : key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === '.') {
        appendToDisplay(key);
    }
});

console.log('Calculator loaded! Try typing numbers and operators.');`
  },

  todoApp: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
</head>
<body>
    <div class="container">
        <h1>📝 Todo App</h1>
        <div class="input-section">
            <input type="text" id="todoInput" placeholder="Add a new task..." onkeypress="handleEnter(event)">
            <button onclick="addTodo()">Add</button>
        </div>
        <div class="stats">
            <span id="totalTasks">0</span> tasks total, 
            <span id="completedTasks">0</span> completed
        </div>
        <ul id="todoList"></ul>
    </div>
</body>
</html>`,
    css: `body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 20px;
    min-height: 100vh;
}

.container {
    max-width: 500px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 2.5em;
}

.input-section {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

#todoInput {
    flex: 1;
    padding: 15px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
}

#todoInput:focus {
    border-color: #667eea;
}

button {
    padding: 15px 25px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.3s;
}

button:hover {
    background: #5a6fd8;
}

.stats {
    text-align: center;
    color: #666;
    margin-bottom: 20px;
    font-size: 14px;
}

#todoList {
    list-style: none;
    padding: 0;
    margin: 0;
}

.todo-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    margin-bottom: 10px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #667eea;
    transition: all 0.3s;
}

.todo-item.completed {
    opacity: 0.7;
    border-left-color: #28a745;
}

.todo-item.completed .todo-text {
    text-decoration: line-through;
    color: #666;
}

.todo-checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.todo-text {
    flex: 1;
    font-size: 16px;
    color: #333;
}

.delete-btn {
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 12px;
    transition: background 0.3s;
}

.delete-btn:hover {
    background: #c82333;
}

.empty-state {
    text-align: center;
    color: #999;
    font-style: italic;
    padding: 40px 20px;
}`,
    javascript: `let todos = [];
let nextId = 1;

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    const todo = {
        id: nextId++,
        text: text,
        completed: false,
        createdAt: new Date()
    };
    
    todos.push(todo);
    input.value = '';
    renderTodos();
    updateStats();
    
    console.log('Added todo:', todo);
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
        updateStats();
        console.log(\`Toggled todo \${id}: \${todo.completed ? 'completed' : 'pending'}\`);
    }
}

function deleteTodo(id) {
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex > -1) {
        const deletedTodo = todos.splice(todoIndex, 1)[0];
        renderTodos();
        updateStats();
        console.log('Deleted todo:', deletedTodo);
    }
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    
    if (todos.length === 0) {
        todoList.innerHTML = '<li class="empty-state">No tasks yet. Add one above! 🎉</li>';
        return;
    }
    
    todoList.innerHTML = todos.map(todo => \`
        <li class="todo-item \${todo.completed ? 'completed' : ''}">
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                \${todo.completed ? 'checked' : ''} 
                onchange="toggleTodo(\${todo.id})"
            >
            <span class="todo-text">\${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(\${todo.id})">Delete</button>
        </li>
    \`).join('');
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

// Initialize the app
renderTodos();
updateStats();

console.log('Todo App loaded! Start adding tasks above.');

// Add some sample todos for demonstration
setTimeout(() => {
    todos.push(
        { id: nextId++, text: 'Learn React', completed: false, createdAt: new Date() },
        { id: nextId++, text: 'Build a CodePen clone', completed: true, createdAt: new Date() },
        { id: nextId++, text: 'Practice JavaScript', completed: false, createdAt: new Date() }
    );
    renderTodos();
    updateStats();
}, 500);`
  }
};

export default templates;