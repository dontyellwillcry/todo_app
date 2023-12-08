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
    res.send(generateTodoListHtml());
});

app.post('/addTodo', (req, res) => {
    const todoText = req.body.todoText;
    todos.push({ id: todos.length + 1, text: todoText });
    res.send(generateTodoListHtml());
});

app.delete('/deleteTodo/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== todoId);
    res.send(generateTodoListHtml());
});

function generateTodoListHtml() {
    return todos.map(todo => `
        <li>${todo.text} <button hx-delete="/deleteTodo/${todo.id}">Delete</button></li>`
    ).join('');
}



// Start up our server
app.listen(port, () => {
  console.log('listening on port', port);
});

