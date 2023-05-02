const enterBtn=document.getElementById("enter");
const btnText=enterBtn.innerText;
const newValue=document.getElementById("input");
const myUl=document.getElementById("ul");
let items=[];
let edit_id=null;


let objStr = localStorage.getItem('Items');
if(objStr!=null){
    items = JSON.parse(objStr);
}

displayItem();

enterBtn.onclick=()=>{
    const newItem=newValue.value;

    if(edit_id!=null){
        items.splice(edit_id,1,newItem);
        edit_id=null;
    }else{
        items.push(newItem);
    }
    saveItem(items);
    newValue.value="";
    displayItem();
    enterBtn.innerText=btnText;
}

function saveItem(items){
    let name=JSON.stringify(items)
    localStorage.setItem('Items',name);

}

function displayItem(){
let list='';
items.forEach((item,i)=>{
    list+=`
    <tbody>
    <tr>
      <th scope="row">${i+1}</th>
      <td>${item}</td>
      <td><span><i id="editBtn" class="fa fa-duotone fa-file-pen" onclick="editItem(${i})"></i></span></td>
      <td><span><i id="deleteBtn" class="fa fa-light fa-trash" onclick="deleteItem(${i})"></i></span></td>
    </tr>
  </tbody>
`;
});
myUl.innerHTML=list;
}

function editItem(id){
    edit_id=id;
    newValue.value=items[id];
    enterBtn.innerText="Save";
    
}

function deleteItem(id){
    items.splice(id,1);
    saveItem(items);
    displayItem();
}