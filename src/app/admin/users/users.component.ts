import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('closebutton1') closebutton1;
  userData: any;
  isLoggedInCheck;
  loggedinuser = [];
  userId = localStorage.getItem('user');
  userName = null;
  
  constructor(private dataService: DataService, private http: HttpClient, private router: Router, private spinner: NgxSpinnerService) { 
    this.isLoggedInCheck = this.dataService.isLoggedIn;
    // this.loggedinuser = this.router.getCurrentNavigation().extras.state.loggedinuser;
  }

  ngOnInit(): void {
    this.getUserData();
    // console.log("user token : ", this.dataService.getToken());
    // console.log(this.dataService.getUser());
    // console.log(this.isLoggedInCheck);
    if(this.dataService.getUser() != null){
      this.returnUserData(this.dataService.getUser());
    }
    // console.log("user id : ", this.dataService.getUser);
    // console.log(this.searchDatas);
  }

  //loader 
  reloadPage(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  
  returnUserData(id){
    try {
      this.dataService.returnUserData(id).subscribe( res => {
        console.log(res['name']);
        this.userName = res['name'];
      });
    } catch (error) {
      console.log("error");
    }
    
  }

  getUserData(){    
    try {
      // this.dataService.getUserData().subscribe( res => {
      //   console.log(res);
      //   this.userData = res;
      // });
      const headers = new HttpHeaders({
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      });
      this.http.get('http://localhost:8000/api/users', {headers: headers}).subscribe( 
        (res : any) => {
          console.log(res);
          this.userData = res;
          console.log(this.dataService.isLoggedIn);
          console.log(this.userData);
        },
      );
      
    } catch (error) {
      
    }
  }

  deleteProduct(id){
    this.dataService.deleteUserData(id).subscribe(res => {
      this.getUserData();
    });
    this.closebutton1.nativeElement.click();
  }

}
