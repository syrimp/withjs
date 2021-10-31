//------------------------------------realtime
const nowDate = document.getElementById("date");
const nowTime = document.getElementById("time");

function getClock(){
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth()+1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    nowDate.innerText =`${year}년 ${month}월 ${day}일`;
    nowTime.innerText =`${hours}시 ${minutes}분 ${seconds}초`;
}

getClock();
setInterval(getClock, 1000);

//----------------------------------random wallpaper

const wallpaper = document.getElementById("wallpaper");
let cnt;
function changePic(){
    let bool = true;
    while(bool){
        cnt = Math.ceil(Math.random() * 50);
        if (cnt <= 22) {
            bool = false;
            break;
        }
    }
    wallpaper.style.backgroundImage ="url(../wallpaper/pictures"+`${cnt}`+".jpg)";
}
changePic();
setInterval(changePic, 1000*10);
//------------------------------------------login

const login = document.querySelector("#enter");
const input = document.querySelector("#enter input");
const greeting = document.querySelector("#greeting");
const USERNAME_KEY = "username";
const HIDDEN_CLASSNAME = "hidden";

function paintGreeting(username){
    greeting.innerText= `안녕하세요, ${username}님`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

function entersubmit(event) {
    event.preventDefault();
    login.classList.add(HIDDEN_CLASSNAME);
    const username = input.value;
    localStorage.setItem(USERNAME_KEY,username);
    paintGreeting(username);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername ===null){
    login.classList.remove(HIDDEN_CLASSNAME);
    login.addEventListener("submit", entersubmit);
} else {
    paintGreeting(savedUsername);
}

//-----------------------------------------------------weather
const API_KEY = "d26df18e2a5d634bc92887574cdd4e90";

function onGeoOk(position){
    const lat= position.coords.latitude;
    const lon = position.coords.longitude;
    const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(Response => Response.json()).then(data =>{
        console.log(data);
        const weather = document.querySelector("#local span:last-child");
        const city = document.querySelector("#local span:first-child");
        city.innerText = `${data.name}`;
        weather.innerText = `${data.main.temp}°C ${data.weather[0].main}`;
    });
}
function onGeoError(){
alert("위치 정보를 찾을 수 없습니다.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

//------------------------------------------------------------todolist
const todoform = document.querySelector("#addtodo");
const todoInput = todoform.querySelector("input");
const todolist = document.querySelector("#todolist");
const TODOS_KEY = "todos";
let toDos =[];

function going(toDos){
    return toDos.id !== li.id;
}

function deleteTodo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((todo) => todo.id !== parseInt(li.id));
    savetoDos();
}

function checkTodo(event){
    const li = event.target.parentElement;
    li.classList.toggle("check");
}

function paintTodo(newToDo){
    const li = document.createElement("li");
    const span = document.createElement("span");
    li.id = newToDo.id;
    span.innerText = newToDo.text;
    const check = document.createElement("button");
    check.innerText = "✔️";
    check.addEventListener("click", checkTodo);
    const button = document.createElement("button");
    button.innerText = "❎";
    button.addEventListener("click", deleteTodo);
    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(button);
    todolist.appendChild(li);
}

function savetoDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo = todoInput.value;
    todoInput.value = "";
    const newTodoOb ={
        text: newToDo,
        id : Date.now(),
    };
    toDos.push(newTodoOb);
    paintTodo(newTodoOb);
    savetoDos();
}

todoform.addEventListener("submit", handleToDoSubmit);
const savedTodo = localStorage.getItem(TODOS_KEY);



if(savedTodo !== null){
    const parsedTodos = JSON.parse(savedTodo);
    toDos = parsedTodos;
    parsedTodos.forEach(paintTodo);
}



