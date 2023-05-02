const enterBtn=document.getElementById("enter");
const newValue=document.getElementById("input");
const myUl=document.getElementById("ul");
let items=[];



let objStr = localStorage.getItem('Items');
if(objStr!=null){
    items = JSON.parse(objStr);
}

displayItem();

enterBtn.onclick=()=>{
    const newItem=newValue.value;
    items.push(newItem);
    saveItem(items);
    newValue.value="";
    displayItem();

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
      <td><span><i id="editBtn" class="fa fa-duotone fa-file-pen"></i></span></td>
      <td><span><i id="deleteBtn" class="fa fa-light fa-trash"></i></span></td>
    </tr>
  </tbody>
`;
});
myUl.innerHTML=list;
}

function editItem(){

}

function deleteItem(){

}