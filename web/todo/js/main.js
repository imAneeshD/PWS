// input and butns
const enterBtn = document.getElementById("enter");
const clear = document.getElementById("clear");
const newValue = document.getElementById("input");
const editValue = document.getElementById("editInput");

let checkbox = document.getElementById("checkbox");

let AllCount = document.getElementById("AllCount");
let ActCount = document.getElementById("ActCount");
let CompCount = document.getElementById("CompCount");

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

//-------------------------------------------//

let objStr = localStorage.getItem('Items');
if (objStr != null) {
    items = JSON.parse(objStr);
}
let objStr2 = localStorage.getItem('ActItems');
if (objStr2 != null) {
    LocalActItems = JSON.parse(objStr2);
}
let objStr3 = localStorage.getItem('CompItems');
if (objStr3 != null) {
    LocalCompItems = JSON.parse(objStr3);
}

compItems = LocalCompItems;

displayItem();
actItems = items.filter(item => !compItems.includes(item));

console.log(actItems)

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



// Saving to local storate

function saveItem(items) {
    let name = JSON.stringify(items)
    localStorage.setItem('Items', name);
}
function saveActItem(items) {
    let name = JSON.stringify(items)
    localStorage.setItem('ActItems', name);
}

function saveCompItem(items) {
    let name = JSON.stringify(items)
    localStorage.setItem('CompItems', name);
}



// Display for all items

function displayItem() {
    AllCount.innerHTML = items.length;
    ActCount.innerHTML = actItems.length + "/" + items.length;
    CompCount.innerHTML = compItems.length + "/" + items.length;


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

// Display for Active items

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

// Display for Completed items

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

// Deleteing item

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


// Tabs click

actUl.classList.add("d-none");

allTab.onclick = () => {
    AllCount.innerHTML = items.length;
    allTab.classList.add("active")
    actTab.classList.remove("active")
    compTab.classList.remove("active")

    allUl.classList.remove("d-none");
    actUl.classList.add("d-none");
    compUl.classList.add("d-none");
}

actTab.onclick = () => {
    ActCount.innerHTML = actItems.length + "/" + items.length;
    actTab.classList.add("active")
    allTab.classList.remove("active")
    compTab.classList.remove("active")

    actUl.classList.remove("d-none");
    allUl.classList.add("d-none");
    compUl.classList.add("d-none");
    displayActItem()

}

compTab.onclick = () => {
    CompCount.innerHTML = compItems.length + "/" + items.length;
    allTab.classList.remove("active")
    actTab.classList.remove("active")
    compTab.classList.add("active")

    actUl.classList.add("d-none");
    allUl.classList.add("d-none");
    compUl.classList.remove("d-none");
    displayCompItem()
}


// Checkbox active

function check(id) {

    // completed
    const value = items[id];
    console.log(value)
    const index = compItems.indexOf(value);
    const index2 = actItems.indexOf(value);

    if (compItems.includes(items[id])) {
        actItems.push(value);
        compItems.splice(index, 1);
    } else {
        compItems.push(items[id]);
        actItems.splice(index2, 1);
    }



    saveActItem(actItems);
    saveCompItem(compItems);
    AllCount.innerHTML = items.length;
    ActCount.innerHTML = actItems.length + "/" + items.length;
    CompCount.innerHTML = compItems.length + "/" + items.length;

}