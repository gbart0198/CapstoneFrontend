import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product = {
    name: '',
    price: 0,
    description: '',
    brand: '',
    image: File
  };
  submitted = false;


  constructor(private apiService: ProductsService) { }

  ngOnInit(): void {
  }

  onFileChanged(imgInput: any) {
    const file = File = imgInput.files[0];
    this.product.image = file;

    console.log(file);
  }

  addProduct() {
    const data = {
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      brand: this.product.brand,
      file: this.product.image
    };

    console.log(data);

    this.apiService.create(data)
      .subscribe( res => {
        console.log(res);
        this.submitted = true;
      }, err => {
        console.log(err);
      });
  }

  newProduct() {
    this.submitted = false;
    this.product = {
      name: '',
      price: 0,
      description: '',
      brand: '',
      image: null
    }
  }

}
