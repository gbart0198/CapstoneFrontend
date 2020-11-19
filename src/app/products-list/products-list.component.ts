import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { UserAuthenticationService } from '../user-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  currentFilter = null;
  priceFilter = 2000;
  loggedIn: boolean = false;
  privileged: boolean = false;
  products: any;
  filteredProducts: any;
  allBrands: Set<any>;
  brandNames: Set<String>;
  selectedBrands: Set<String>;
  currentProduct = null;
  currentIndex=-1;
  name='';

  constructor(private apiService: ProductsService, 
    private authService: UserAuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.loggedIn = this.authService.isLoggedIn();
    this.privileged = localStorage.getItem('privilege')=='admin';
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

  addToCart(product) {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      let duplicate = false;
      for (let i in cart) {
        if (cart[i].name==product.name) {
          duplicate = true;
        }
      }
      if (!duplicate) {
        console.log(1);
        cart.push(product);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      let cart = [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  


}
