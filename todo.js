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


//function to show each todo list
function showToDoList(){
    let li = "";
    if(toDoListArray){
         //for each todo item added, we want to display on the screen
        toDoListArray.forEach((todo, id) => {
            //to keep the checked class constant even upon refresh, using the ternary operator
            let todoIsChecked = todo.status == "completed" ? "checked" : ""
            
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
            })
    }
    //setting the content of the unordered list to the list items
    toDoContainer.innerHTML = li;
}
showToDoList();

//function to remove each item
function removeItem(idToBeDeleted){
    //removing the selected item;
    toDoListArray.splice(idToBeDeleted, 1)
    //parsing into the local storage
    localStorage.setItem("list", JSON.stringify(toDoListArray))
    showToDoList()
}

//function to display the checks
function isChecked(todo){
    //getting the todo item class so as tobe able to edit
    let selectedTodo = todo.nextElementSibling
    //statement to add / remove the checked class when checkbox is active or inactive
    if(todo.checked){
        selectedTodo.classList.add("checked")
        //updating the status
        toDoListArray[todo.id].status = "complete"
    }
    else{
        selectedTodo.classList.remove("checked")
        toDoListArray[todo.id].status = "pending"
        //updating the status
    }
    localStorage.setItem("list", JSON.stringify(toDoListArray))
}

/*
//creating the functionalities for the check and unchecked items
///getting all the checkboxes
const checkBoxes = document.getElementsByClassName("checkbox")
//getting all the todo items
const todoItems = document.getElementsByClassName("todo-item")

//for loop to add event listener to each checkbox
for(let i = 0; i<checkBoxes.length; i++){
    //parsing a function to review if any items are checked or not
    checkBoxes[i].addEventListener("click", checked)
}
function checked(){
    //for loop to iterate through each todo item and toggle checked class
    for(let i = 0; i<todoItems.length; i++){
        //statement for when each checkbox is checked
        if(checkBoxes[i].checked == true){
            //adding the classlist of check when items are checked
            todoItems[i].classList.add("checked")
            //looping through the local storage to change the status upon a click
            if(todoItems[i].innerHTML = (toDoListArray[i].name)){
                //changing the status to completed
                toDoListArray[i].status ='completed'
                //appending to the local storage
                localStorage.setItem("list", JSON.stringify(toDoListArray))
            }
        }
        //statement for when each checkbox is not checked
        else{
            //removing the classlist of checked when items are unchecked
            todoItems[i].classList.remove("checked")
            //changing the status back to pending
            toDoListArray[i].status= "pending"
            //appending to the local storage
            localStorage.setItem("list", JSON.stringify(toDoListArray))
        }
    }
}*/


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
        let whatToDo = {name: toDo, id: Math.random(), status: 'pending'}
        //pushing each todo item to the local storage
        toDoListArray.push(whatToDo)
        //setting items in the local storage
        localStorage.setItem("list", JSON.stringify(toDoListArray))
        //showing the todo lis items on the screen
        showToDoList();
    }
})


//building the functionalities for all, active and completed
//first activity section
const activitySectionA = document.querySelector(".flex__a")
const arrayA = Array.from(activitySectionA.children)
//second activity section
const activitySectionB = document.querySelector(".flex__b")
const arrayB = Array.from(activitySectionB.children)


//function to view separate colors on click
function viewColors(currentColors, targetColors){
    currentColors.classList.remove('current--Array')
    targetColors.classList.add('current--Array')
}

arrayA.forEach(() => {
    arrayA[0].addEventListener('click', () => {
        let currentColor = document.querySelector('.current--Array')
        let targetColor = arrayA[0];
        viewColors(currentColor, targetColor)
    })
    arrayA[1].addEventListener('click', () => {
        let currentColor = document.querySelector('.current--Array')
        let targetColor = arrayA[1];
        viewColors(currentColor, targetColor)
    })
    arrayA[2].addEventListener('click', () => {
        let currentColor = document.querySelector('.current--Array')
        let targetColor = arrayA[2];
        viewColors(currentColor, targetColor)
    })
})
arrayB.forEach(() => {
    arrayB[0].addEventListener('click', () => {
        let currentColor = document.querySelector('.current--Array')
        let targetColor = arrayB[0];
        viewColors(currentColor, targetColor)
    })
    arrayB[1].addEventListener('click', () => {
        let currentColor = document.querySelector('.current--Array')
        let targetColor = arrayB[1];
        viewColors(currentColor, targetColor)
    })
    arrayB[2].addEventListener('click', () => {
        let currentColor = document.querySelector('.current--Array')
        let targetColor = arrayB[2];
        viewColors(currentColor, targetColor)
    })
})

