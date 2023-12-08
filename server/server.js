// Require express - gives us a function
const express = require('express');

// Create an instance of express by calling the function returned above - gives us an object
const app = express();
const port = 5000;

// express static file serving - public is the folder name
app.use(express.static('server/public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

let todos = [];
console.log(todos);


app.get('/getTodos', (req, res) => {
    res.send(updateTodoListHtml());
});

app.post('/addTodo', (req, res) => {
    const todoText = req.body.todoText;
    todos.push({ id: todos.length + 1, text: todoText });
    res.send(updateTodoListHtml());
});

app.delete('/deleteTodo/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== todoId);
    res.send(updateTodoListHtml());
});

app.put('/toggleTodo/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === todoId);
    
    todo.completed = !todo.completed;
    
    res.send(updateTodoListHtml());
});

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




// Start up our server
app.listen(port, () => {
  console.log('listening on port', port);
});

