import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorage: StorageService
  ) {}

  /**
   * Method: POST
   * Params: data, token, endpoint,
   */
  async post(
    data: any,
    token: string,
    endpoint: string,
    contentType: string = 'application/json'
  ) {
    const custom = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        contentType: contentType,
        Authorization: 'Bearer ' + token,
      }),
    };
    return await new Promise((resolve, rejects) => {
      this.http.post(environment.baseURL + endpoint, data, custom).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error) => {
          if (error.status == 401) {
            this.tokenRefresh().then(() => {
              this.post(data, token, endpoint);
            });
          } else if (error.status == 403) {
            this.tokenStorage.signOut();
            this.router.navigate(['']);
            rejects(error);
          } else if (error.status == 0) {
            this.router.navigate(['unknown-error']);
          } else {
            rejects(error);
          }
        }
      );
    });
  }

  /**
   * Method: GET
   * Params: token, endpoint,
   */
  async get(token: string, endpoint: string) {
    const custom = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return await new Promise((resolve, rejects) => {
      this.http.get(environment.baseURL + endpoint, custom).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error) => {
          if (error.status == 401) {
            this.tokenRefresh().then(() => {
              this.get(token, endpoint);
            });
          } else if (error.status == 403) {
            this.tokenStorage.signOut();
            this.router.navigate(['']);
            rejects(error);
          } else if (error.status == 0) {
            this.router.navigate(['unknown-error']);
          } else {
            rejects(error);
          }
        }
      );
    });
  }

  /**
   * Method: PUT
   * Params: data,token, endpoint,
   */
  async put(data: any, token: string, endpoint: string) {
    const custom = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return await new Promise((resolve, rejects) => {
      this.http.put(environment.baseURL + endpoint, data, custom).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error) => {
          if (error.status == 401) {
            this.tokenRefresh().then(() => {
              this.put(data, token, endpoint);
            });
          } else if (error.status == 403) {
            this.tokenStorage.signOut();
            this.router.navigate(['']);
            rejects(error);
          } else if (error.status == 0) {
            this.router.navigate(['unknown-error']);
          } else {
            rejects(error);
          }
        }
      );
    });
  }

  /**
   * Method: DELETE
   * Params: data,token, endpoint,
   */
  async delete(token: string, endpoint: string) {
    const custom = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return await new Promise((resolve, rejects) => {
      this.http.delete(environment.baseURL + endpoint, custom).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error) => {
          if (error.status == 401) {
            this.tokenRefresh().then(() => {
              this.delete(token, endpoint);
            });
          } else if (error.status == 403) {
            this.tokenStorage.signOut();
            this.router.navigate(['']);
            rejects(error);
          } else if (error.status == 0) {
            this.router.navigate(['unknown-error']);
          } else {
            rejects(error);
          }
        }
      );
    });
  }

  /**
   * Method: GET - TOKEN REFRESH
   * Params:
   */
  async tokenRefresh() {
    const custom = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(this.tokenStorage.getToken()),
      }),
    };
    return await new Promise((resolve, rejects) => {
      this.http
        .get(environment.baseURL + 'user/refresh-token', custom)
        .subscribe(
          (data: any) => {
            this.tokenStorage.saveToken(data.token);
            resolve(data);
          },
          (error: any): any => {
            if (error.status == 401) {
              this.tokenStorage.signOut();
              this.router.navigate(['']);
              return 0;
            } else if (error.status == 403) {
              this.tokenStorage.signOut();
              this.router.navigate(['']);
              rejects(error);
            } else {
              rejects(error);
            }
          }
        );
    });
  }
}
