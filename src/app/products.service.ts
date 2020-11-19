import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms'

const apiUrl = 'http://localhost:8000/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(apiUrl);
  }

  get(id) {
    return this.http.get(`${apiUrl}/${id}`);
  }

  create(data) {
    const formData = new FormData();
    console.log("data file type: " + typeof(data.file));
    formData.append('image', data.file);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('brand', data.brand);
    formData.append('price', data.price);
    console.log(formData);
    return this.http.post(apiUrl, formData);
  }

  update(id, data) {
    const formData = new FormData();
    if (data.file) {
      formData.append('image', data.file);
      console.log('image type: ' + typeof(data.file));
    }
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('brand', data.brand);
    formData.append('price', data.price);
    return this.http.patch(`${apiUrl}/${id}`, formData);
  }

  delete(id) {
    return this.http.delete(`${apiUrl}/${id}`);
  }


}
