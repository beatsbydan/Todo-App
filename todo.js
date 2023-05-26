//CHANGING THE THEMES

//creating the local storage for the dark theme alone
let darkThemeStorage = localStorage.getItem ("darkTheme")

//getting light and dark theme buttons
const light = document.querySelector(".light")
const dark = document.querySelector(".dark")

//function to enable the dark theme
const enableDark = () => { 
    light.classList.add('in-light__mode')
    dark.classList.add('in-dark__mode')
    document.body.classList.add('dark__theme')
    
    //setting the content of the local storage for the dark theme to enabled
    localStorage.setItem("darkTheme", "enabled")
}


//function to disable the dark theme
const disableDark = () => {
    dark.classList.remove('in-dark__mode')
    light.classList.remove('in-light__mode')
    document.body.classList.remove('dark__theme')
    
    //setting the content of the local storage for the dark theme to null
    localStorage.setItem("darkTheme", null)
}


//condition to always keep dark theme enabled, even on refresh when enabled
if(darkThemeStorage === "enabled"){
    enableDark();
}

//function to change theme on click
function changeTheme(){
    //getting the property of dark theme in the local storage first before the test
    darkThemeStorage = localStorage.getItem("darkTheme") 
    
    //if it isn't enabled, we enable it 
    if(darkThemeStorage !== "enabled"){
        enableDark();
    }
    
    //if it is enabled, we'd disable it
    else{
        disableDark();
    }
}



//TODO APP

//dynamic number
let dynamicNumber =document.querySelector("#dynamic")

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
//for the desktop
arrayA.forEach((list) => {
    list.addEventListener('click', () => { 
        document.querySelector("p.current--Array").classList.remove("current--Array")
        list.classList.add("current--Array")
        
        //shows the array containing the id of either all, active or completed lists equal to the statuses of each todo item
        showToDoList(list.id)
    })
})

//for the mobile
arrayB.forEach((list) => {
    list.addEventListener('click', () => { 
        document.querySelector("p.current--Arr").classList.remove("current--Arr")
        list.classList.add("current--Arr")
        
        //shows the array containing the id of either all, active or completed lists equal to the statuses of each todo item
        showToDoList(list.id)
    })
})



//function to show each todo list of either all, active or completed
function showToDoList(filteredList){
    
    //declaring the list item to be appended
    let li = "";
    
    //if the todolistarray exists, we build the lists this way
    if(toDoListArray){
        
        //for each todo item added, we want to display on the screen, each of those lists
        toDoListArray.forEach((todo, id) => {
            
            //to keep the checked class constant even upon refresh, using the ternary operator
            let todoIsChecked = todo.status == "completed" ? "checked" : ""
            
            //condition for the statuses. This would display the array of either all, active or completed
            if(filteredList === todo.status || filteredList === "all"){
                
                //what should be displayed; appending li
                li += `<li class="list-group-item" draggable="true">
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
        
        //setting the dynamic number to be equal to the filtered array
        dynamicNumber.innerHTML = toDoListArray.filter((complete)=>{
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
    
    //showing the current lists after item(s) have been deleted
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
        
        //updating the status
        toDoListArray[todo.id].status = "active"
    }

    //condition to always return the number of active items available and append to the dynamic number
    if(todo.checked || !todo.checked){
        dynamicNumber.innerHTML = toDoListArray.filter((complete)=>{
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
    
    //changing the display back to "all"
    document.querySelector("p.current--Array").classList.remove("current--Array")
    arrayA[0].classList.add("current--Array")
    document.querySelector("p.current--Arr").classList.remove("current--Arr")
    arrayB[0].classList.add("current--Arr")
    
    //showing the list of "all"
    showToDoList("all")
})

//adding the draggable function
//getting the list items
const draggables =  document.querySelectorAll(".list-group-item")

//getting the drag area which is the list of the containers
const dragArea = document.getElementById("lists")
    //function to swap array elements around with their ids
    function swapArrayElements(arr, indexA, indexB) {
        var temp = arr[indexA];
        arr[indexA] = arr[indexB];
        arr[indexB] = temp;
    };
    
    //function to order the order each new list
    function orderList(oldIndex, newIndex) {
        swapArrayElements(toDoListArray, oldIndex, newIndex)
        
        //saving to the local storage
        localStorage.setItem("list", JSON.stringify(toDoListArray));
    }
    
    
    // For sorting the list
    //using sortable JS(from https://cdnjs.com)
    Sortable.create(dragArea, {
        animation: 350,
        group: 'list-1',
        draggable: '.list-group-item',
        handle: '.list-group-item',
        sort: true,
        filter: '.sortable-disabled',
        chosenClass: 'active',

        //ordering the list
        onSort: function (/*Event*/evt) {
        orderList(evt.oldIndex, evt.newIndex);
    },
});



/*alternate function for the dragging
//event listeners for each draggable
draggables.forEach((draggable)=>{
    //when the drag starts
    draggable.addEventListener("dragstart", () => {
        //adding the class of dragging tto be able to catch it when sliding over each box of todo list
        draggable.classList.add("dragging")
    })
    //when drag ends
    draggable.addEventListener("dragend", () => {
        //removing the class of dragging
        draggable.classList.remove("dragging")
    })
})
//event listener to monitor the position of the items when moving / dropped within the container
dragArea.addEventListener("dragover", e => {
    //removes the do not allow cursor
    e.preventDefault()
    const afterElement = getDrag(dragArea, e.clientY)
    const draggable = document.querySelector(".dragging")
    if(afterElement == null){
        dragArea.appendChild(draggable)
    }else{
        dragArea.insertBefore(draggable, afterElement)
    }
})

function getDrag(box, yPosition){
    const dragElements = [...box.querySelectorAll(".draggable")]
    return dragElements.reduce((closest, child) => {
        const boxes = child.getBoundingClientRect()
        const offset = yPosition - boxes.top - (boxes.height / 2)
        if(offset < 0 && offset > closest.offset){
            return {offset: offset, element: child}
        }
        else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}*/

