import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent {

  products: any[] = [];

  @Output() cancelStatus = new EventEmitter<boolean>();
  @Output() newData = new EventEmitter<any>();


  addNewProduct(event: Event) {

    event.preventDefault(); // Prevent the default form submission behavior

    const id = document.getElementById("id") as HTMLInputElement;
    const name = document.getElementById("name") as HTMLInputElement;
    const desc = document.getElementById("desc") as HTMLInputElement;
    const price = document.getElementById("price") as HTMLInputElement;


    const data = {
      id: id.value,
      name: name.value,
      description: desc.value,
      price: price.value
    };

    this.newData.emit(data)
  }

  cancel() {
    this.cancelStatus.emit()
  }
}
