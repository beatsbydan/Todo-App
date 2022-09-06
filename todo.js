//changing the theme via icons
//getting light theme
const light = document.querySelector('.light')
//changing to light theme
function lightTheme(){
    document.body.classList.remove('dark__theme')
    light.classList.remove('in-light__mode')
    dark.classList.remove('in-dark__mode')
}
//gettigng dark theme
const dark = document.querySelector('.dark')
//changing to dark theme
function darkTheme(){
    document.body.classList.add('dark__theme')
    light.classList.add('in-light__mode')
    dark.classList.add('in-dark__mode')
}

//TODO APP
//getting the input of the lists
const toDoInput = document.querySelector('.todoInput')

//getting the container for the lists
const toDoContainer = document.querySelector('.lists')

//getting the local storage
let toDoListArray = JSON.parse(localStorage.getItem("list"))

//building the functionalities for all, active and completed
//first activity section
const arrayA = document.querySelectorAll((".flex__a p"))
//second activity section
const arrayB = document.querySelectorAll((".flex__b p"))

//functions for all, active and completed
arrayA.forEach((list) => {
    list.addEventListener('click', () => { 
        document.querySelector("p.current--Array").classList.remove("current--Array")
        list.classList.add("current--Array")
        //shows the array containing the id of either all, active or completed lists
        showToDoList(list.id)
    })
})
arrayB.forEach((list) => {
    list.addEventListener('click', () => { 
        document.querySelector("p.current--Arr").classList.remove("current--Arr")
        list.classList.add("current--Arr")
        //shows the array containing the id of either all, active or completed lists
        showToDoList(list.id)
    })
})



//function to show each todo list of either all, active or completed
function showToDoList(filteredList){
    let li = "";
    if(toDoListArray){
         //for each todo item added, we want to display on the screen
        toDoListArray.forEach((todo, id) => {
            //to keep the checked class constant even upon refresh, using the ternary operator
            let todoIsChecked = todo.status == "completed" ? "checked" : ""
            
            if(filteredList === todo.status || filteredList === "all"){
                //what should be displayed
                li += `<li draggable="true">
                            <div for="${id}" class="box">
                                <input type="checkbox" onclick=" return isChecked(this)" id= ${id}  ${todoIsChecked} data-checkbox class="checkbox">
                                <p class="${todoIsChecked}" data-todo>${todo.name}</pc>
                            </div>
                            <div class="remove">
                                <img src="./images/icon-cross.svg" onclick = "return removeItem(${id})" alt="">
                            </div>
                        </li>`
                }
        })
        //dynamic number
        let dynamicNumber =document.querySelector("#dynamic")
        //setting the dynamic number to be equal to the filtered array
        dynamicNumber.innerHTML=toDoListArray.filter((complete)=>{
            return complete.status === "active"
        }).length
    }
    //setting the content of the unordered list to the list items
    toDoContainer.innerHTML = li || `<p class ="default-statement">Your list is empty, Add a Task!</p>`;
}
//showing the entire list of todo-items by default
showToDoList("all");

//function to remove each item
function removeItem(idToBeDeleted){
    //removing the selected item;
    toDoListArray.splice(idToBeDeleted, 1)
    //parsing into the local storage
    localStorage.setItem("list", JSON.stringify(toDoListArray))
    showToDoList("all")
}

//function to display the checks
function isChecked(todo){
    //getting the todo item class so as tobe able to edit
    let selectedTodo = todo.nextElementSibling
    //statement to add / remove the checked class when checkbox is active or inactive
    if(todo.checked){
        selectedTodo.classList.add("checked")
        //updating the status
        toDoListArray[todo.id].status = "completed"
    }
    else{
        selectedTodo.classList.remove("checked")
        toDoListArray[todo.id].status = "active"
    }
    //condition to always return the number active items available
    if(todo.checked || !todo.checked){
        let dynamicNumber =document.querySelector("#dynamic")
        dynamicNumber.innerHTML=toDoListArray.filter((complete)=>{
            return complete.status === "active"
        }).length
    }
    //updating the local storage
    localStorage.setItem("list", JSON.stringify(toDoListArray))
}


//adding an event listener to the input to read its content
toDoInput.addEventListener("keyup", e => {
    //obtaining the value of the todo that is about to be created
    let toDo = toDoInput.value.trim();
    //statement to add to the local storage when the key "enter" is hit
    if(e.key == "Enter" && toDo){
        //statement to parse an empty array in if there is no local storage available
        if(!toDoListArray){
            toDoListArray = [];
        }
        //setting the value of the input to null after enter is pressed
        toDoInput.value = "";
        //creating the object that'd contain the value obtained from the input
        let whatToDo = {name: toDo, id: Math.random(), status: 'active'}
        //pushing each todo item to the local storage
        toDoListArray.push(whatToDo)
        //setting items in the local storage
        localStorage.setItem("list", JSON.stringify(toDoListArray))
        //showing the todo lis items on the screen
        showToDoList("all");
    }
})

//clearing completed
const clearBtn = document.querySelector(".clear__completed p")
clearBtn.addEventListener("click", () => {
    //removing the selected item;
    toDoListArray = toDoListArray.filter(done => {
        return done.status === "active"
    })
    //parsing into the local storage
    localStorage.setItem("list", JSON.stringify(toDoListArray))
    showToDoList("all")
})

//dragging and dropping to reorder
//used the library from cdnjs.com
const dragArea = document.querySelector(".lists")
new Sortable(dragArea, {
    animation:350
})