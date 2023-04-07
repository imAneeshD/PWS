const menuBtn=document.querySelector('.menu-btn');
const menuImg=document.querySelector('.menu-btn-img');
const menuExit=document.querySelector('.menu-exit-btn-img')

const nav=document.querySelector('.nav');

let showMenu=false;

menuBtn.addEventListener('click',()=>{
    nav.classList.toggle('open2');
});


menuExit.addEventListener('click',()=>{
    nav.classList.toggle('open2');
})



