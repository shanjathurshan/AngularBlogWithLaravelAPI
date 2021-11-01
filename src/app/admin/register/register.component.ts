import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
  }

  onClickSubmit(formValue) {
    
    this.dataService.registerUserDetails(formValue).subscribe(data=> 
    {
      if(data['message'] == true){
        console.log(data);
      } else {
        console.log("failed!");
      }
      // console.log("Entered Email id : " + formValue.name);
      // console.log("Entered Email id : " + formValue.email);
      // console.log("Entered pw id : " + formValue.password);
    }
    ),
     (err: any) => {
      console.log("failed eee!");
     };
 }
 
}
