
/*
It gets the form element with the id of todo-form and stores it in a variable called todoForm.
*/
const todoForm = document.getElementById("todo-form");

/*
It creates a variable called todoList and sets it equal to the element with the id of todo-list.
*/
const todoList = document.getElementById("todo-list");

/*
It finds the input element with the id of todo-form and assigns it to the variable todoInput.
*/
const todoInput = document.querySelector("#todo-form input");





/*
1. First, we declare a constant called TODOS_KEY. This is the key that we’ll use to store our to-do list in local storage.
2. Next, we create a variable called toDos. This is an empty array that will hold our to-do list.
3. Finally, we create a function called saveToDos. This function will save our to-do list to local storage.
*/
const TODOS_KEY = "todos";

let toDos = [];


const saveToDos = () => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
};



/*
1. We’re using the event object to get the li element that was clicked on.
2. We’re using the parentElement property to get the parent li element.
3. We’re using the remove() method to remove the li element from the DOM.
4. We’re using the filter() method to remove the toDo from the toDos array.
5. We’re using the saveToDos() function to save the toDos array to local storage.
*/
const deleteToDo = event => {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
};


/*
1. We create a new li element and give it an id of the todo’s id.
2. We create a new button element and give it an innerText of ❌.
3. We create a new span element and give it an innerText of the todo’s text.
4. We append the button and span elements to the li element.
5. We append the li element to the todoList element.
*/
const renderToDo = newTodo => {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  li.appendChild(button);
  li.appendChild(span);
  todoList.appendChild(li);
};


/*
1. We’re using the event.preventDefault() method to prevent the default behavior of the form from happening.
2. We’re using the todoInput.value to get the value of the input field.
3. We’re using the todoInput.value = "" to clear the input field.
4. We’re creating a newTodoObj object and setting the text property to the value of the input field.
5. We’re pushing the newTodoObj object to the toDos array.
6. We’re using the renderToDo() method to render the new todo.
7. We’re using the saveToDos() method to save the toDos array to local storage.
*/

const handleToDoSubmit = event => {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  renderToDo(newTodoObj);
  saveToDos();
};


todoForm.addEventListener("submit", handleToDoSubmit);



/*
It gets the saved todos from local storage.
*/
const savedToDos = localStorage.getItem(TODOS_KEY);


/*
1. First, it checks if there is any saved to-do data in local storage.
2. If there is, it parses the data and stores it in a variable.
3. Then, it checks if there is any to-do data in the variable.
4. If there is, it loops through the to-do data and renders each to-do.
*/
if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(renderToDo);
}
