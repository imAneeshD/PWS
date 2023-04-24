var menu=document.getElementById('menu');
var exit=document.getElementById('exit');
const toggle = document.getElementById('toggle');
toggle.addEventListener("click", tgl);


function tgl() {
    if(exit.style.display=="none"){
        menu.style.display="none";
        exit.style.display="block";
    }else{
        exit.style.display="none";
        menu.style.display="block";
    }
}
