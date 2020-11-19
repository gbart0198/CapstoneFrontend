import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  currentFilter = null;
  priceFilter = 2000;
  products: any;
  filteredProducts: any;
  allBrands: Set<any>;
  brandNames: Set<String>;
  selectedBrands: Set<String>;
  currentProduct = null;
  currentIndex=-1;
  name='';

  constructor(private apiService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.allBrands = new Set();
    this.brandNames = new Set();
    this.apiService.getAll().subscribe( res => {
      this.products = res;
      this.filteredProducts = this.products;
      for (let product of this.products) {
        product.image = "../../assets/products/"+product.image;
        this.allBrands.add({
          name: product.brand,
          checked: false
        });
        this.brandNames.add(product.brand);
      }
    }, 
    err => {
      console.log(err);
    });
  }

  selectProduct(product, index) {
    this.currentIndex = index;
    this.currentProduct = product;
  }

  refreshProducts() {
    this.getAllProducts();
    this.currentIndex= -1;
    this.currentProduct = null;
  }

  openFilterByPrice() {
    this.currentFilter = "price";
    this.currentProduct = null;
    this.currentIndex = -1;
  }

  openFilterByBrand() {
    this.currentFilter = "brand";
    this.selectedBrands = new Set();
    this.currentProduct = null;
    this.currentIndex = -1;
  }

  filterItemsByPrice() {
    this.currentProduct = null;
    this.currentIndex = -1;
    this.filteredProducts = [];
    for (let product of this.products) {
      if (parseFloat(product.price)<=this.priceFilter) {
        this.filteredProducts.push(product);
      }
    }
  }

  filterItemsByBrand(brand) {
    this.currentProduct = null;
    this.currentIndex = -1;
    for (let b of this.allBrands) {
      if (b.name==brand) {
        b.checked=!b.checked;
      }
      if (b.checked) {
        this.selectedBrands.add(b.name);
      } else {
        this.selectedBrands.delete(b.name);
      }
    }
    console.log(this.selectedBrands);
    this.filteredProducts = [];
    for (let product of this.products) {
      if (this.selectedBrands.has(product.brand)) {
        this.filteredProducts.push(product);
      }
    }

  }

  resetFilter() {
    this.currentFilter = null;
    this.selectedBrands = new Set();
    this.priceFilter = 2000;
    for (let brand of this.allBrands) {
      brand.checked = false;
    }
    this.filteredProducts = this.products;
    this.currentProduct = null;
    this.currentIndex = -1;
  }

  editProduct(product) {
    console.log(product);
    let id = product._id;
    let path = "/products/"+id;
    this.router.navigateByUrl(path);
  }

  deleteProduct(product) {
    this.apiService.delete(product._id)
      .subscribe( res => {
        console.log(res);
      }, err => {
        console.log("err: " + err);
      })
    this.getAllProducts();
  }
  


}
