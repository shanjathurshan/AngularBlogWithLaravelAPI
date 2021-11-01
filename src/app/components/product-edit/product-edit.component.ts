import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  id: any;
  data: any;
  product = new Product;
  constructor(private route:ActivatedRoute, private dataService:DataService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getData();
  }

  getData(){
    this.dataService.getProductById(this.id).subscribe(res => {
      this.data = res;
      this.product = this.data;
    });
  }

  updateProduct(){
     this.dataService.updateProduct(this.id , this.product).subscribe( res => {
       console.log(res);
       this.getData();
       this.router.navigate(['/']);
     });
    //  this.router.navigate(['/'])
  }
}
