import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() listStatus = new EventEmitter<boolean>();
  @Output() servicesStatus = new EventEmitter<boolean>();
  @Output() othersStatus = new EventEmitter<boolean>();

  status = false
  others = false
  services = false


  showOthers() {

    if (this.others == false) {
      this.others = true
      this.status = false
      this.services = false
    } else {
      this.others = false
    }
    this.othersStatus.emit(this.others)

  }

  showServices() {


    if (this.services == false) {
      this.services = true
      this.status=false
      this.others=false
    } else {
      this.services = false
    }
    this.servicesStatus.emit(this.services)

  }

  showProductList() {

    if (this.status == false) {
      this.status = true
      this.services=false
      this.others = false
    }
    else {
      this.status = false
    }
    this.listStatus.emit(this.status)
  }

}
