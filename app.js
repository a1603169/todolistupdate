const today = new Date().toDateString();
document.getElementById('today_date').innerHTML = today;

const todoInput = document.querySelector(".todo_input")
const todoButton = document.querySelector(".todo_button")
const todoList = document.querySelector(".todo_list")

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkTrash);


function addTodo(e) {
    e.preventDefault();
   
    const inpObj = document.getElementById('todo_input')
        if(inpObj.value === "") {
            alert('Please fill something');
        } else {


    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoLi = document.createElement('li');
    todoLi.innerText = todoInput.value;
    todoLi.classList.add('todo_li');
    todoDiv.appendChild(todoLi);
    //Add todo to localstorage
    saveLocalTodos(todoInput.value);
    const checkButton = document.createElement('button');
    checkButton.classList.add('check_btn')
    checkButton.innerHTML = 'O'
    todoDiv.appendChild(checkButton)

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash_btn');
    trashButton.innerHTML = 'X';    
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear todo input value
    todoInput.value = "";}

    localStorage.setItem('', JSON.stringify())
}
        

    


function checkTrash(e) {

    const item = e.target;

    if (item.classList[0] === "trash_btn") {
      // e.target.parentElement.remove();
      const todo = item.parentElement;
      todo.classList.add("trash");
      //at the end   
      removeLocalTodos(todo);
      todo.addEventListener("transitionend", e => {
        todo.remove();
      });
    }
    if (item.classList[0] === "checked_btn") {
      const todo = item.parentElement;
      todo.classList.toggle("check");
    }
  }
    

function saveLocalTodos(todo) {
    //Check -- hey do i already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');    

    const todoLi = document.createElement('li');
    todoLi.innerText = todo;
    todoLi.classList.add('todo_li');
    todoDiv.appendChild(todoLi);


    const checkButton = document.createElement('button');
    checkButton.classList.add('check_btn')
    checkButton.innerHTML = 'O'
    todoDiv.appendChild(checkButton)

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash_btn');
    trashButton.innerHTML = 'X';    
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todo.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos));
}