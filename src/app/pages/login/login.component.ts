import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.email.valid && this.password.valid) {
      const data = {
        email: this.email.value,
        password: this.password.value,
      };
      this.apiService
        .post(
          data,
          String(this.storageService.getToken()),
          `/authentication/login`
        )
        .then((response: any) => {
          this.storageService.saveToken(response.token);
          this.storageService.saveUser(response.result);
          this.dialogRef.close();
        })
        .catch((error: any) => {
          if (error.status != 404 || error.status != 422) {
            this.dialogRef.close();
          }
        });
    }
  }
}
