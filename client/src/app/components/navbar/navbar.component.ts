import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbar_open = false;

  toggleNavbar() {
    this.navbar_open = !this.navbar_open;
  }

  constructor() { }

  ngOnInit() {
  }

}
