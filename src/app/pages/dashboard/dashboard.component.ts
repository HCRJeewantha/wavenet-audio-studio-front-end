import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public selectedNavItem: number = 1;
  title: string = 'Text to Speech';
  isUserLoggedIn: boolean = false;
  user: any;
  userProfileImage: string = 'assets/images/male.png';
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private storageService: StorageService
  ) {
    this.user = this.storageService.getUser();

  }

  ngOnInit(): void {
    if (this.storageService.getToken() != null) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }

  selectNavItem(index: number, path: string) {
    this.selectedNavItem = index;
    this.router.navigate([path]);
    if (index == 1) {
      this.title = 'Text to Speech';
    }
    if (index == 2) {
      this.title = 'Speech to Text';
    }
    if (index == 3) {
      this.title = 'Audio Modifier';
    }
    if (index == 4) {
      this.title = 'Library';
    }
  }

  login() {
    const model = this.dialog.open(LoginComponent, {
      panelClass: 'popup-model',
      data: {},
    });
    model.afterClosed().subscribe(() => {
      console.log(this.storageService.getToken() );
      
      if (this.storageService.getToken() != "") {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    });
  }

  register() {
    const model = this.dialog.open(RegistrationComponent, {
      data: {},
    });
    model.afterClosed().subscribe(() => {});
  }
}
