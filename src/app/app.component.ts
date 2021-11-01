import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'laravel-sanctum-api-AngularBlog';

  loggedIn = false;

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('token') !== null;
  }
}
