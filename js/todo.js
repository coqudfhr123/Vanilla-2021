const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list"); //ul

const TODOS_KEY = "todos";
const HIDDEN_CLASSNAME_1 = "hidden";
toDoList.classList.add(HIDDEN_CLASSNAME_1);

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); //문자열을 숫자로 바꿔야 리스트가
  saveToDos();

  //입력창을 보이게 함
  toDoForm.classList.remove(HIDDEN_CLASSNAME_1);

  var liLength = document.getElementsByTagName("li").length;
  if (liLength <= 0) {
    toDoList.classList.add(HIDDEN_CLASSNAME_1);
  }
}

// 글을 작성하여 새로운 항목을 추가함
function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text; //object에 있는 text값만 불러옴
  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
  toDoList.classList.remove(HIDDEN_CLASSNAME_1);

  //li의 갯수가 5개가 넘으면 입력창을 숨김
  var liLength = document.getElementsByTagName("li").length;
  if (liLength >= 5) {
    toDoForm.classList.add(HIDDEN_CLASSNAME_1);
  }
}

function handleToDoSubmit(event) {
  //항목을 새로 만들때 사용됨
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

//재시작할때 toDos값이 있다면 리스트를 만들어 출력함
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos); //문자열 배열로 변환함
  toDos = parsedToDos; //이에 있던 값을 localStorage에 넣음
  parsedToDos.forEach(paintToDo);

  if (liLength >= 5) {
    toDoForm.classList.add(HIDDEN_CLASSNAME_1);
  }
} else {
  toDoList.classList.remove(HIDDEN_CLASSNAME_1);
}
//재시작할때 li갯수가 5개이상이면 입력창을 숨김
var liLength = document.getElementsByTagName("li").length;
