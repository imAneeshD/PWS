import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-products',
  templateUrl: './delete-products.component.html',
  styleUrls: ['./delete-products.component.scss']
})
export class DeleteProductsComponent {


  @Output() delete = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<boolean>();

  deleteStatus = false

  deleteConfirmed() {
    this.deleteStatus = true
    this.delete.emit(this.deleteStatus)
  }

  cancelDelete() {
    this.cancel.emit()
  }

}
