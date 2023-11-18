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
  title: string = "Text to Speech";
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  selectNavItem(index: number, path: string) {
    this.selectedNavItem = index;
    this.router.navigate([path]);
    if(index == 1){
      this.title = "Text to Speech"
    }
    if(index == 2){
      this.title = "Speech to Text"
    }
    if(index == 3){
      this.title = "Audio Modifier"
    }
    if(index == 4){
      this.title = "Library"
    }
  }

  login() {
    const model = this.dialog.open(LoginComponent, {
      panelClass: 'popup-model',
      data: {},
    });
    model.afterClosed().subscribe(() => {});
  }

  register() {
    const model = this.dialog.open(RegistrationComponent, {
      data: {},
    });
    model.afterClosed().subscribe(() => {});
  }
}
