import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'product-app';
  showList=false

  changeListStatus(){
    if(this.showList==false){
      this.showList=true
    }else{
      this.showList=false
    }
  }
}
