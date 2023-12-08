const express = require('express');

const app = express();
const port = 5000;

app.use(express.static('server/public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// Initializing an empty array to store todo items
let todos = [];
console.log(todos);


app.get('/getTodos', (req, res) => {
    res.send(updateTodoListHtml());
});

// Handling POST requests for adding new todos
app.post('/addTodo', (req, res) => {
    const todoText = req.body.todoText;
    // Creating a new todo object and pushing it to the 'todos' array
    todos.push({ id: todos.length + 1, text: todoText });
    res.send(updateTodoListHtml());
});

// Handling DELETE requests for deleting todos by ID
app.delete('/deleteTodo/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    // Filtering out the todo with the specified ID from the 'todos' array
    todos = todos.filter(todo => todo.id !== todoId);
    res.send(updateTodoListHtml());
});

// Handling PUT requests for toggling the completion status of todos by ID
app.put('/toggleTodo/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    // Finding the todo with the specified ID in the 'todos' array
    const todo = todos.find(todo => todo.id === todoId);
    
    // Toggling the 'completed' property of the todo
    todo.completed = !todo.completed;
    
    res.send(updateTodoListHtml());
});

// Function to generate HTML for the todo list
// Also handles the ternary operator for conditionally applying styles based on completion or not
function updateTodoListHtml() {
    return `
        <ul style="list-style-type: none; padding: 0;">
            ${todos.map(todo => `
                <li data-id="${todo.id}" class="todo-item" hx-put="/toggleTodo/${todo.id}" hx-click="/toggleTodo/${todo.id}" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; margin: 5px; border: 1px solid #ccc; cursor: pointer; transition: background-color 0.3s ease; ${todo.completed ? 'text-decoration: line-through;' : ''}" onmouseover="this.style.backgroundColor='#f0f0f0'" onmouseout="this.style.backgroundColor='transparent'">
                    <span>${todo.text}</span>
                    <button class="mui-btn mui-btn--raised mui-btn--primary" hx-delete="/deleteTodo/${todo.id}" style="margin-left: 10px;">Delete</button>
                </li>`
            ).join('')}
        </ul>`;
}




app.listen(port, () => {
  console.log('listening on port', port);
});

