// input and butns
const enterBtn = document.getElementById("enter");
const clear = document.getElementById("clear");
const newValue = document.getElementById("input");
const editValue = document.getElementById("editInput");

let checkbox = document.getElementById("checkbox");

const count=document.getElementById("count");

// ul's
const allUl = document.getElementById("allUl");
const actUl = document.getElementById("actUl");
const compUl = document.getElementById("compUl");


// tabs
const allTab = document.getElementById("all-tab");
const actTab = document.getElementById("active-tab");
const compTab = document.getElementById("completed-tab");


const main = document.getElementById("main");

let items = [];
let actItems = [];
let compItems = [];

let edit_id = null;


const delBtn = document.getElementById("delBtn");


let delPopup = document.getElementById("del-popup");
let editPopup = document.getElementById("edit-popup");

let objStr = localStorage.getItem('Items');
if (objStr != null) {
    items = JSON.parse(objStr);
}


displayItem();
actItems = items.slice();

newValue.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        e.preventDefault()
        enterBtn.click();
    }
});


enterBtn.onclick = () => {
    const newItem = newValue.value;

    if (newItem == "") {
        alert("Write something (new)")
        return 0;
    }

    else {
        items.push(newItem);
        saveItem(items);
        newValue.value = "";
        displayItem();
    }

}

function saveItem(items) {
    let name = JSON.stringify(items)
    localStorage.setItem('Items', name);
}

function displayItem() {
    count.innerHTML=compItems.length+"/"+items.length;

    let list = '';
    items.forEach((item, i) => {
        list += `
    <tbody>
    <tr>
      <td class="table-data"><input id="checkbox" onclick="check(${i})" type="checkbox" class="checkbox"><label for="checkbox">${item}</label></td>
      <td><span><i  class="fa fa-duotone fa-file-pen" onclick="openEditPopup(${i})"></i></span></td>
      <td><span><i class="fa fa-light fa-trash" onclick="openDelPopup(${i})"></i></span></td>
    </tr>
  </tbody>
`;
    });
    allUl.innerHTML = list;
}
function displayActItem() {
    let list = '';
    actItems.forEach((item, i) => {
        list += `
    <tbody>
    <tr>
      <td class="table-data"><input id="checkbox" onclick="check(${i})" type="checkbox" class="checkbox"><label for="checkbox">${item}</label></td>
      <td><span><i  class="fa fa-duotone fa-file-pen" onclick="openEditPopup(${i})"></i></span></td>
      <td><span><i class="fa fa-light fa-trash" onclick="openDelPopup(${i})"></i></span></td>
    </tr>
  </tbody>
`;
    });
    actUl.innerHTML = list;
}
function displayCompItem() {
    let list = '';
    compItems.forEach((item, i) => {
        list += `
    <tbody>
    <tr>
      <td class="table-data"><input  id="checkbox" onclick="check(${i})" type="checkbox" class="checkbox" checked><label for="checkbox">${item}</label></td>
      <td><span><i  class="fa fa-duotone fa-file-pen" onclick="openEditPopup(${i})"></i></span></td>
      <td><span><i class="fa fa-light fa-trash" onclick="openDelPopup(${i})"></i></span></td>
    </tr>
  </tbody>
`;
    });
    compUl.innerHTML = list;
}



function deleteItem(id) {
    items.splice(id, 1);
    saveItem(items);
    closeDelPopup();
    displayItem();
}

// open popup
editValue.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        e.preventDefault()
        editBtn.click();
    }
});

function openEditPopup(id) {
    main.style.opacity = "10%";
    editPopup.style.visibility = 'visible';
    edit_id = id;
    editValue.value = items[id];

    editBtn.onclick = () => {
        const editItem = editValue.value;
        if (editItem == "") {
            alert("Write something")
            return 0;
        } else {
            edit_id != null
            items.splice(edit_id, 1, editItem);
            edit_id = null;

            saveItem(items);
            editValue.value = "";
            closeEditPopup();
            displayItem();
        }
        editValue.value = "";

    }
}

function closeEditPopup() {
    editPopup.style.visibility = 'hidden';
    main.style.opacity = "100%";
}

function openDelPopup(id) {
    main.style.opacity = "10%";
    delPopup.style.visibility = 'visible';

    delBtn.onclick = () => {
        deleteItem(id);
    }
}
function closeDelPopup() {
    delPopup.style.visibility = 'hidden';
    main.style.opacity = "100%";
}



clear.onclick = () => {
    localStorage.clear();
    location.reload();

}

actUl.classList.add("d-none");

allTab.onclick = () => {
    count.innerHTML=items.length+"/"+items.length;
    allTab.classList.add("active")
    actTab.classList.remove("active")
    compTab.classList.remove("active")

    allUl.classList.remove("d-none");
    actUl.classList.add("d-none");
    compUl.classList.add("d-none");
}

actTab.onclick = () => {
    count.innerHTML=actItems.length+"/"+items.length;
    actTab.classList.add("active")
    allTab.classList.remove("active")
    compTab.classList.remove("active")

    actUl.classList.remove("d-none");
    allUl.classList.add("d-none");
    compUl.classList.add("d-none");
    displayActItem()
    
}

compTab.onclick = () => {
    count.innerHTML=compItems.length+"/"+items.length;
    allTab.classList.remove("active")
    actTab.classList.remove("active")
    compTab.classList.add("active")

    actUl.classList.add("d-none");
    allUl.classList.add("d-none");
    compUl.classList.remove("d-none");
    displayCompItem()
}


function check(id) {
    // completed
    const value = items[id];
    console.log(value)
    const index = compItems.indexOf(value);
    const index2 = actItems.indexOf(value);

    if (compItems.includes(items[id])) {
        compItems.splice(index, 1);
        actItems.push(value);
    } else {
        compItems.push(items[id]);
        actItems.splice(index2,1);
    }

    console.log(compItems)
    console.log(actItems)
}