import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public selectedNavItem: number = 1;
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  selectNavItem(index: number, path: string) {
    this.selectedNavItem = index;
    this.router.navigate([path]);
  }

  login(){
    const createUserModel = this.dialog.open(LoginComponent, {
      panelClass: 'popup-model',
      data: {},
    });
    createUserModel.afterClosed().subscribe(() => {});
  }

  register(){
    const createUserModel = this.dialog.open(RegistrationComponent, {
      data: {},
    });
    createUserModel.afterClosed().subscribe(() => {});
  }
}
