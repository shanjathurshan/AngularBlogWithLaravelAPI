import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/product';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: any;
  product = new Product();
  @ViewChild('closebutton') closebutton;
  @ViewChild('closebutton1') closebutton1;
  @ViewChild('myForm', {static: false}) myForm: NgForm;
  loggedinuser;

  constructor(private dataService: DataService,  private router: Router) {
    // this.loggedinuser = this.router.getCurrentNavigation().extras.state.loggedinuser ;
  }

  ngOnInit(): void {
    this.getProductsData();
    console.log(this.loggedinuser);
  }

  getProductsData() {
    this.dataService.getData().subscribe((res) => {
      this.products = res;
      console.log(res);
    });
  }

  insertData() {
    this.dataService.insertData(this.product).subscribe((res) => {
      this.getProductsData();
      this.myForm.resetForm();
    });
    this.closebutton.nativeElement.click();
    
  }

  deleteProduct(id){
    this.dataService.deleteData(id).subscribe(res => {
      this.getProductsData();
    });
    this.closebutton1.nativeElement.click();
  }

  updateProduct(id){
    console.log(id);
  }

}
