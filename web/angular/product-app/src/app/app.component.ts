import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'product-app';
  showList=false
  services=false

  changeListStatus(){
    if(this.showList==false){
      this.showList=true
      this.services=false
    }else{
      this.showList=false
    }
  }


  changeServiceStatus(){
    if (this.services == false) {
      this.showList=false
      this.services = true
    } else {
      this.services = false
    }
  }

}
