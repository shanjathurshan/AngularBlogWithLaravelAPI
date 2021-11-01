import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  @ViewChild('closebutton1') closebutton1;
  searchDatas= [];

  constructor(private router: Router, private dataService: DataService) {
    this.searchDatas = this.router.getCurrentNavigation().extras.state.searchData;
   }

  ngOnInit(): void {
    console.log(this.searchDatas);
  }

  deleteProduct(id){
    this.dataService.deleteData(id).subscribe(res => {
    });
    this.closebutton1.nativeElement.click();
  }

}
