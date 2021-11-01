import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Product } from 'src/app/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  search: any;
  data: any;
  loggedinuser = [];
  loggedIn = false;
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { 
  
  }

  ngOnInit(): void {
    console.log(this.dataService.isLoggedIn)
    // this.searchProduct();
    this.loggedIn = this.dataService.isLoggedIn;
  }

  searchProduct(){
    this.dataService.serchProduct(this.search).subscribe( res => {
      // console.log(res);
      this.data = res;
      this.router.navigate(['/search'], { state: { searchData: this.data } });
    });
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    window.location.reload();
  }
}
