import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loggedinusername: any;
  newval;
  isLoggedInCheck;
  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private dataService: DataService
    , private route: ActivatedRoute) { 
    this.isLoggedInCheck = this.dataService.isLoggedIn;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email : '',
      password : '' 
    });
    console.log(this.dataService.getToken());
    console.log(this.dataService.isLoggedIn);
  }

  // getToken():  string {
  //   return  localStorage.getItem('token');
  // }

  submit(){
    // console.log(this.form.getRawValue());
    const formData = this.form.getRawValue();

    const data = {
      email : formData.email,
      password : formData.password,
    }

    this.http.post('http://localhost:8000/api/login', formData).subscribe( 
      (res : any) => {
      // localStorage.setItem('token', res.token); 
      this.dataService.setToken(res.token);
      this.dataService.setUser(res.user.id);
      this.dataService.setLoggedIn(true);
      this.loggedinusername = res.user;
      console.log(res.user.id);
      this.router.navigate(['/users'], {relativeTo: this.route, state: { loggedinuser: this.loggedinusername }} );
      // window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

  loginUser() {
    const formData = this.form.getRawValue();
    const email = formData.email;
    const password = formData.password;
    
    const formValue = {
      email : formData.email,
      password : formData.password,
    }

    this.dataService.getUserDetails(formValue).subscribe((data: any) => {
      this.newval = data.token;
      this.loggedinusername = data.user;
      if(data.token) {
        // localStorage.setItem('token', data.token); 
        // this.router.navigate(['users']);
        this.router.navigate(['users'], { state: { loggedinuser: this.loggedinusername }} );
        this.dataService.setLoggedIn(true);
        console.log(" is logged in : " +this.dataService.isLoggedIn);
      } else {
        window.alert(data.message);
        console.log(this.newval);
        console.log(" is logged in : " +this.dataService.isLoggedIn);
      }

    console.log("data : " +data);

    });
    // console.log(email, password)
  }

  isUserLoggedIn(){
    const user = localStorage.getItem('token');
    return user == null ;
  }

}
