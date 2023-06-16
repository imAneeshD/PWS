import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() listStatus=new EventEmitter<boolean>();
  status=false
  others=false
  services=false
  
  showOthers(){
    const other = document.getElementById("others") as HTMLElement;
    // if(this.others==false){
    //   this.others=true
    //   other.style.fontWeight = "bold"
    // }else{
    //   this.status=false
    //   other.style.fontWeight = "normal"
    // }
  }
  
  showServices(){
    const services = document.getElementById("services") as HTMLElement;
    // this.status = false
    // services.style.fontWeight = "bold"

  }



  showProductList(){
    const item=document.getElementById("items") as HTMLElement;

   if(this.status==false){
    this.status=true
    item.style.fontWeight="bold"
   }
   else{
    this.status=false
     item.style.fontWeight = "normal"
   }
   this.listStatus.emit(this.status)
  }

}
