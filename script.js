

const inputNotif = document.querySelector(".input-tasks")
const addBtn = document.querySelector(".btn-add")



function createdElemenet() {
    const notifications = document.createElement("div")
    notifications.setAttribute("draggable", "true")

    const gatheredNotifs = document.querySelector(".all-notifs")









    notifications.classList.add("created-div")
    notifications.setAttribute("draggable", "true")

    if (inputNotif.value === "") {
        alert("Iltimo bosh yozmang")
        return;
    }

    notifications.innerHTML = `
        <div class="notifications">
        <input class="checkbox" type="checkbox">
            <p class="notif-text">${inputNotif.value}</p>
            <button class="back-btn btn"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M17.6777 0.707107L16.9706 0L8.83883 8.13173L0.707107 0L0 0.707107L8.13173 8.83883L0 16.9706L0.707106 17.6777L8.83883 9.54594L16.9706 17.6777L17.6777 16.9706L9.54594 8.83883L17.6777 0.707107Z"
                        fill="#5B5E7E" />
                        </svg>
            </button>
            </div>
            `
    inputNotif.value = ""
    gatheredNotifs.prepend(notifications)


    const backBtn = notifications.querySelector(".back-btn")

    backBtn.addEventListener("click", () => {
        notifications.remove()
        emptPlace()
        leftItems()
    })

    const checkbox = document.querySelectorAll(".checkbox")
    let notifText = document.querySelectorAll(".notif-text")

    checkbox.forEach((element, index) => {
        element.addEventListener("change", () => {
            if (element.checked) {
                notifText[index].classList.add("line-through")
            } else {
                notifText[index].classList.remove("line-through")
            }
            leftItems()
        })
    })



    const allBtn = document.querySelector(".all-btn")
    const clearBtn = document.querySelector(".clear-btn")
    const activeBtn = document.querySelector(".active-btn")
    const completedBtn = document.querySelector(".completed-btn")

    allBtn.addEventListener("click", () => {
        leftItems()

        allBtn.classList.add("actives")
        activeBtn.classList.remove("actives")
        clearBtn.classList.remove("actives")
        completedBtn.classList.remove("actives")

        notifText.forEach(element => {
            element.parentElement.classList.remove("hide")
        })
    })

    activeBtn.addEventListener("click", () => {
        leftItems()

        activeBtn.classList.add("actives")
        allBtn.classList.remove("actives")
        completedBtn.classList.remove("actives")
        clearBtn.classList.remove("actives")

        notifText.forEach((elements, index) => {
            if (elements.classList.contains("line-through")) {
                elements.parentElement.classList.add("hide")
            } else {
                elements.parentElement.classList.remove("hide")
            }
        })
    })


    completedBtn.addEventListener("click", () => {
        leftItems()

        completedBtn.classList.add("actives")
        clearBtn.classList.remove("actives")
        allBtn.classList.remove("actives")
        activeBtn.classList.remove("actives")

        notifText.forEach(element => {
            if (element.classList.contains("line-through")) {
                element.parentElement.classList.remove("hide")
            } else {
                element.parentElement.classList.add("hide")
            }
        })
    })

    clearBtn.addEventListener("click", () => {
        // notifText = document.querySelectorAll(".notif-text")

        clearBtn.classList.remove("actives")
        allBtn.classList.add("actives")
        activeBtn.classList.remove("actives")
        completedBtn.classList.remove("actives")

        notifText.forEach(element => {
            if (element.classList.contains("line-through")) {
                element.parentElement.parentElement.remove()
            }
        })
        // leftItems()
    })

    function leftItems() {

        const todoItems = document.querySelectorAll(".created-div")
        const allLineThrough = document.querySelectorAll(".line-through")
        const leftItmesSpan = document.querySelector(".left-items-span")
        let numLeftItems = todoItems.length - allLineThrough.length
        leftItmesSpan.textContent = numLeftItems
    }
    leftItems()





    function emptPlace() {
        const emptyPlace = gatheredNotifs.querySelector('.empty-place')
        const tasklist = gatheredNotifs.querySelectorAll(".notifications")

        if (tasklist.length <= 0) {
            emptyPlace.classList.remove("hide")
        } else {
            emptyPlace.classList.add("hide")
        }
    }
    emptPlace()



    const todoItems = gatheredNotifs.querySelectorAll(".created-div")

    todoItems.forEach(element =>{
        element.addEventListener("dragstart", () =>{
            setTimeout(()=>
                element.classList.add("dragging"), 0)
        })
        element.addEventListener("dragend" , ()=>{
            element.classList.remove("dragging")
        })
    })

    const initSortable = (e) => {
        e.preventDefault();
        const draggingItems = gatheredNotifs.querySelector(".dragging")
        const sibling = [...gatheredNotifs.querySelectorAll(".created-div:not(.dragging)")]
        let nextSibling = sibling.find(sibling =>{
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight/ 2
        })
        gatheredNotifs.insertBefore(draggingItems, nextSibling)
    }

    gatheredNotifs.addEventListener("dragover", initSortable)
    gatheredNotifs.addEventListener("dragenter", e => e.preventDefault())

}




inputNotif.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        createdElemenet()
    }

})

addBtn.addEventListener("click", () => {
    createdElemenet()
})



const darkLightBtn = document.querySelector(".dark-light-btn")
const body = document.querySelector("body")

darkLightBtn.addEventListener("click", () => {

    body.classList.toggle('lightBody')
})