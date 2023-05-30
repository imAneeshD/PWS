// hook buttons
const addBtn = document.getElementById("add");
const allBtn = document.getElementById("all");
const activeBtn = document.getElementById("active");
const doneBtn = document.getElementById("done");
const cancelBtn = document.getElementById("cancel");
const editBtn = document.getElementById("edit");
const deleteBtn = document.getElementById("deleteBtn");
const delAll = document.getElementById("del-all");
const delDone = document.getElementById("del-done");

// popups
const menu = document.getElementById("menu");
const popup = document.getElementById("popup");
const title = document.getElementById("title");



// input
const input = document.getElementById("input");
const editInput = document.getElementById("editInput");

//hook Table
const tblAll = document.getElementById("t-all");
const tblActive = document.getElementById("t-active");
const tblDone = document.getElementById("t-done");

//hook count
const allCount = document.getElementById("allcount");
const activeCount = document.getElementById("activecount");
const doneCount = document.getElementById("donecount");

// body
const main = document.getElementById("main");
// body.style.opacity="10%";


// create 3 arrays
let items = [];
let actItems = [];
let compItems = [];


let edit_id = null;



// ---------------------------------------- //



// Page Onload
displayItem();
input.focus();

tblDone.classList.remove("d-none");


// hook enter key to input
input.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        e.preventDefault()
        addBtn.click();
    }
});

addBtn.onclick = () => {
    const newItem = input.value;

    if (newItem == "") {
        alert("Write something (new)")
        return 0;
    }

    else {
        items.push(newItem);
        saveItem(items);
        actItems.push(newItem);
        saveActItem(actItems);
        input.value = "";
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



allBtn.onclick = () => {
    allBtn.style.color = "white";
    allBtn.style.background = "#212A3E";
    activeBtn.style.color = "black";
    activeBtn.style.background = "#F1F6F9";
    doneBtn.style.color = "black";
    doneBtn.style.background = "#F1F6F9";

    tblActive.classList.remove("d-none")
    tblDone.classList.remove("d-none")
    displayItem();
}

//display count
function count(){
    allCount.innerHTML = items.length;
    activeCount.innerHTML = actItems.length + "/" + items.length;
    doneCount.innerHTML = compItems.length + "/" + items.length;
}


// Display all items

function displayItem() {

    let objStr = localStorage.getItem('Items');
    if (objStr != null) {
        items = JSON.parse(objStr);
    }

    let objStr3 = localStorage.getItem('CompItems');
    if (objStr3 != null) {
        compItems = JSON.parse(objStr3);
    }

    let objStr2 = localStorage.getItem('ActItems');
    if (objStr2 != null) {
        LocalActItems = JSON.parse(objStr2);
        filteredArray = items.filter(item => !compItems.includes(item));
        actItems = filteredArray;
    }
    if (objStr2 == null) {
        actItems = items.slice();
    }


    activeBtn.style.color = "black";
    activeBtn.style.background = "#F1F6F9";
    allBtn.style.color = "white";
    allBtn.style.background = "#212A3E";

    count();

    let list1 = '';
    actItems.forEach((item, i) => {
        list1 += `
        <tbody>
        <tr">
          <td class="table-data"><input id="checkbox" onclick="check(${i})" type="checkbox" class="checkbox"><label for="checkbox">${item}</label></td>
          <td><span><i  class="fa fa-duotone fa-file-pen" onclick="openEditPopup(${i})"></i></span></td>
          <td><span><i class="fa fa-light fa-trash" onclick="openDelPopup(${i})"></i></span></td>
        </tr>
      </tbody>
    `;
    });
    tblActive.innerHTML = list1;


    let list2 = '';
    compItems.forEach((item, i) => {
        list2 += `
        <tbody>
        <tr>
          <td class="table-data"><input id="checkbox" onclick="Compcheck(${i})" type="checkbox" class="checkbox" checked><label for="checkbox">${item}</label></td>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td><span><i class="fa fa-light fa-trash" onclick="openCompPopup(${i})"></i></span></td>
        </tr>
      </tbody>
    `;
    });
    tblDone.innerHTML = list2;
}

// Display Active items
function displayActiveItems() {
    activeBtn.style.color = "white";
    activeBtn.style.background = "#212A3E";
    allBtn.style.color = "black";
    allBtn.style.background = "#F1F6F9";
    doneBtn.style.color = "black";
    doneBtn.style.background = "#F1F6F9";
    let list1 = '';
    actItems.forEach((item, i) => {
        list1 += `
        <tbody>
        <tr>
          <td class="table-data"><input id="checkbox" onclick="check(${i})" type="checkbox" class="checkbox"><label for="checkbox">${item}</label></td>
          <td><span><i  class="fa fa-duotone fa-file-pen" onclick="openEditPopup(${i})"></i></span></td>
          <td><span><i class="fa fa-light fa-trash" onclick="openDelPopup(${i})"></i></span></td>
        </tr>
      </tbody>
    `;
    });
    tblActive.innerHTML = list1;
}

activeBtn.onclick = () => {
    tblActive.classList.remove("d-none");
    tblDone.classList.add("d-none");
    displayActiveItems();
}

// Display Completed items
function displayComepletedItems() {
    doneBtn.style.color = "white";
    doneBtn.style.background = "#212A3E";
    activeBtn.style.color = "black";
    activeBtn.style.background = "#F1F6F9";
    allBtn.style.color = "black";
    allBtn.style.background = "#F1F6F9";

    tblActive.classList.add("d-none");

    let list1 = '';
    compItems.forEach((item, i) => {
        list1 += `
        <tbody>
        <tr>
          <td class="table-data"><input id="checkbox" onclick="Compcheck(${i})" type="checkbox" class="checkbox" checked><label for="checkbox">${item}</label></td>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td><span><i class="fa fa-light fa-trash" onclick="openCompPopup(${i})"></i></span></td>
        </tr>
      </tbody>
    `;
    });
    tblDone.innerHTML = list1;
}

doneBtn.onclick = () => {
    tblActive.classList.add("d-none");
    tblDone.classList.remove("d-none");
    displayComepletedItems();
}





// Deleteing item

function deleteItem(id) {
    items.splice(id, 1);
    saveItem(items);
}

function openDelPopup(id) {
    main.style.opacity = "10%";
    popup.classList.remove("d-none")
    editInput.classList.add("d-none");
    deleteBtn.classList.remove("d-none");
    title.innerHTML = "Are you sure?"
    editBtn.classList.add("d-none")
    cancelBtn.innerHTML = "No";

    deleteBtn.onclick = () => {
        deleteItem(id);
        cancelBtn.click();
        displayItem();
    }
}

function openCompPopup(id){
    main.style.opacity = "10%";

    popup.classList.remove("d-none")
    editInput.classList.add("d-none");
    deleteBtn.classList.remove("d-none");
    title.innerHTML = "Are you sure?"
    editBtn.classList.add("d-none")
    cancelBtn.innerHTML = "No";

    deleteBtn.onclick = () => {
        items = items.filter(item => !compItems.includes(item));
        saveItem(items);
        compItems.splice(id, 1);
        saveCompItem(compItems);
        cancelBtn.click();
        displayItem();
    }
}



cancelBtn.onclick = () => {
    popup.classList.add("d-none")
    main.style.opacity = "100%";
}


editInput.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        e.preventDefault()
        editBtn.click();
    }
});

function openEditPopup(id) {
    main.style.opacity = "10%";
    popup.classList.remove("d-none")
    editInput.classList.remove("d-none");
    editBtn.classList.remove("d-none");
    deleteBtn.classList.add("d-none")
    editInput.focus();
    title.innerHTML = "Make changes"
    cancelBtn.innerHTML = "Cancel";
    edit_id = id;
    editInput.value = items[id];

    editBtn.onclick = () => {
        const editItem = editInput.value;
        if (editItem == "") {
            alert("Write something")
            return 0;
        } else {
            items.splice(edit_id, 1, editItem);
            edit_id = null;

            saveItem(items);
            editInput.value = "";
            cancelBtn.click();
            displayItem();
        }
    }
}


delAll.onclick = () => {
    localStorage.clear();
    location.reload();
}


// Clear Done
delDone.onclick = () => {
    items = items.filter(item => !compItems.includes(item));
    localStorage.removeItem("CompItems");
    saveItem(items);
    location.reload();
    displayComepletedItems();
}

// Checkbox on click

function Compcheck(id) {
    const value = compItems[id];
    compItems.splice(id, 1);
    actItems.push(value);
    saveCompItem(compItems);
    allBtn.click();
}

function check(id) {
    const value = actItems[id];
    const index = compItems.indexOf(value);
    const index2 = actItems.indexOf(value);

    if (compItems.includes(value)) {
        actItems.push(value);
        compItems.splice(index, 1);
    } else {
        compItems.push(value);
        actItems.splice(index2, 1);
    }
    saveActItem(actItems);
    saveCompItem(compItems);
    allBtn.click();
}
