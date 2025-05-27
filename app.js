let todo = [];
let ctr = 0;
const ul = document.querySelector("ul");
function toggle(li){
    console.log("toggling the classes...");
    li.querySelector("span").classList.toggle("back");
    li.querySelector("input").classList.toggle("back");
}

function editTodo(li, btn){
    li.querySelector("input").value = li.querySelector("span").textContent;
    console.log(li.id);
    toggle(li);
    li.querySelector("input").focus();
    console.log("editing the content....");
    btn.textContent = "Save";
    btn.onclick = ()=>saveTodo(li, btn);
}

function saveTodo(li, btn){
    // btn.onclick = ()=>editTodo(li, btn);
    // btn.textContent = "Edit";
    makeChanges(li);
    console.log("saving changes...");
    // toggle(li);
}

function makeChanges(li){
    let input = li.querySelector("input");
    let value = input.value;
    input.value = "";
    console.log(value);
    console.log("making the changes......");
    for(let i=0; i<todo.length; i++){
        if(todo[i].id == li.id){
            console.log("founded");
            todo[i].content = value;
            return render();
        }
    }
}

function deleteTodo(li){
    todo = todo.filter(item=>item.id!=li.id);
    render();
}

function check(event){
    if(event.key == "Enter")
        addTodo();
}

function component(item){
    const li = document.createElement("li");
    li.innerHTML = `
    <span class="box">${item.content}</span>
    <input class="box back" type="text">
    <button class="btn" onclick="editTodo(this.parentElement, this)">Edit</button>
    <button class="btn" onclick="deleteTodo(this.parentElement)">Delete</button>
    `;
    li.id = item.id;
    return li;
}

function render(){
    ul.innerHTML = "";
    todo.forEach((item)=>{
        ul.prepend(component(item));
    })
}

function addTodo(){
    console.log("adding element..")
    let input = document.querySelector("#input-add");
    if(input.value != ""){
        todo.push({
            id : `todo-${ctr}`,
            content : input.value
        })
        ctr+=1;
        input.value = "";
        render();
    }
}
