import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  editName = false;
  editPrice = false;
  editDescription = false;
  editBrand = false;
  editImage = false;
  submitted = false;
  id: string;
  product: any;
  productName;
  productBrand;
  productDescription;
  productImage;
  productPrice;
  constructor(private apiService: ProductsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.getProduct();
  }

  getProduct() {
    this.apiService.get(this.id).subscribe( res => {
      this.product = res;
      this.product.image = "../../assets/products/"+this.product.image;
      this.productName = this.product.name;
      this.productDescription = this.product.description;
      this.productBrand = this.product.brand;
      this.productImage = this.product.image;
      this.productPrice = this.product.price;

    },
    err => {
      console.log(err);
    });
  }

  onFileChanged(imgInput: any) {
    const file = File = imgInput.files[0];
    this.product.image = file;

    console.log(file);
  }

  editProduct(part) {
    switch (part) {
      case ('name'): {
        this.editName = !this.editName;
        if (!this.editName) {
          console.log(this.product.name);
          this.product.name = this.productName;
        }
        break;
      }
      case ('price'): {
        this.editPrice = !this.editPrice;
        if (!this.editPrice) {
          this.product.price = this.productPrice;
        }
        break;
      }
      case ('description'): {
        this.editDescription = !this.editDescription;
        if (!this.editDescription) {
          this.product.description = this.productDescription;
        }
        break;
      }
      case ('brand'): {
        this.editBrand = !this.editBrand;
        if (!this.editBrand) {
          this.product.brand = this.productBrand;
        }
        break;
      }
      case ('image'): {
        this.editImage = !this.editImage;
        break;
      }
    }
  }

  confirmEdit() {

    const data = {
      name: '',
      price: 0,
      description: '',
      brand: '',
      file: File
    }

    data.name = this.product.name;
    data.price = this.product.price;
    data.description =this.product.description;
    data.brand = this.product.brand;
    if (this.editImage) {
      data.file = this.product.image
    } else {
      data.file = null;
    }
    console.log("file type: " +typeof(data.file));

    this.apiService.update(this.id, data)
      .subscribe( res => {
        console.log(res);
        this.submitted = true;
      }, err => {
        console.log(err);
      })
  }

}
