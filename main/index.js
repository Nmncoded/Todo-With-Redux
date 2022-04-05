/*<li class="li">
    <div class="name">
        <input type="checkbox" />
        <p>Learn about DOM</p>
    </div>
    <span>X</span>
    </li>
*/

let ul = document.querySelector(`ul`);
let input = document.querySelector(`#text`);
let allTodos = JSON.parse(localStorage.getItem(`todos`)) || store.getState();
let store = Redux.createStore(reducer);

function handleInput(event) {
    let value = event.target.value;
    if (event.keyCode === 13 && value !== "") {
        let todo = {
            name: value,
            isDone: false,
        };
        store.dispatch({type:"add",id:null,todo})
        event.target.value = "";
    }
}

function createUI(data, rootElm) {
    rootElm.innerHTML = "";
    
    data.forEach((todo, index) => {
        let li = document.createElement(`li`);
        li.classList.add(`li`);
        let div = document.createElement(`div`);
        div.classList.add(`name`);
        let inputCheck = document.createElement(`input`);
        inputCheck.type = "checkbox";
        inputCheck.addEventListener(`input`, () => {
            store.dispatch({type:"toggle",id:index});
        });
        inputCheck.checked = todo.isDone;

        let p = document.createElement(`p`);
        p.innerText = `${todo.name}`;
        let span = document.createElement(`span`);
        span.classList.add(`spantext`);
        span.innerText = "X";

        span.addEventListener(`click`, () => {
            store.dispatch({type:"delete",id:index})
        });

        div.append(inputCheck, p);
        li.append(div, span);

        rootElm.append(li);
    })
}

createUI(allTodos, ul);

function reducer(state = [],action){
    if(action.type === 'add'){
        allTodos.push(action.todo);
    }
    if(action.type === 'delete'){
        allTodos.splice(action.id, 1);
    }
    if(action.type === 'toggle'){
        allTodos[action.id].isDone = !(allTodos[action.id].isDone);
    }
    return state = allTodos;
};
store.subscribe(() => {
    createUI(allTodos, ul);
    localStorage.setItem(`todos`, JSON.stringify(allTodos));
})


input.addEventListener(`keyup`, handleInput);