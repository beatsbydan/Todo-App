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

//todo app
//getting the input of the lists
const toDoInput = document.querySelector('.todoInput')

//getting the container for the lists
const toDoContainer = document.querySelector('.lists')

//getting the local storage
let toDoListArray = JSON.parse(localStorage.getItem("list"))



//function to show each todo list
function showToDoList(toDoListArrays){
    let li = "";
    if(toDoListArray){
         //for each todo item added, we want to display on the screen
    toDoListArrays.forEach((todo, id) => {
        //what should be displayed
        li += `<li draggable="true">
                    <div class="box">
                        <div class="check--box" ${id} = onclick=" return checked()"><img src="./images/icon-check.svg" alt=""></div>
                        <p>${todo.name}</p>
                    </div>
                    <div class="remove">
                        <img src="./images/icon-cross.svg" alt="">
                    </div>
                </li>`
        })
    }
    //setting the content of the unordered list to the list items
    toDoContainer.innerHTML = li;
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
        let whatToDo = {name: toDo, status: 'pending'}
        //pushing each todo item to the local storage
        toDoListArray.push(whatToDo)
        //setting items in the local storage
        localStorage.setItem("list", JSON.stringify(toDoListArray))
        //showing the todo lis items on the screen
        showToDoList(toDoListArray);
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

arrayA.forEach(p => {
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

