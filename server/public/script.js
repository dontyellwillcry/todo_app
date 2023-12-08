// script.js

function handleResponse(response) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = response;
}
