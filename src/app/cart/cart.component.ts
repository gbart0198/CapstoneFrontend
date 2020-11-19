import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any;
  cartQuantity = {};
  cartTotal;
  checkedOut = false;
  cartItems: any;

  constructor() { }

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems() {
    if (localStorage.getItem('cart')) {
      this.cartItems = new Array();
      this.cart = new Array();
      this.cartQuantity = {};
      const items = JSON.parse(localStorage.getItem('cart'));
      for (let item of items) {
        if (this.cartItems.includes(item.name)) {
          this.cartQuantity[item.name] = this.cartQuantity[item.name] + 1;
        } else {
          this.cartItems.push(item.name);
          this.cartQuantity[item.name] = 1;
          this.cart.push(item);
        }
      }
    }
    console.log(this.cartQuantity);
  }

  removeItem(item) {
    const index = this.cart.indexOf(item);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
    delete this.cartQuantity[item.name]

    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      for (let i in cart) {
        if (item.name==cart[i].name) {
          cart.splice(i, 1);
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  resetCart() {
    localStorage.removeItem("cart");
    this.cart = null;
  }

  checkout() {
    this.checkedOut = true;
    this.cartTotal = 0;
    for (let item of this.cart) {
      this.cartTotal+=(parseInt(item.price) * this.cartQuantity[item.name]);
    }
    localStorage.removeItem("cart");
    this.cart = null;
  }
}
