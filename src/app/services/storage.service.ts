import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'userToken';
const USER_KEY = 'authUser';
const CARE_HOMER_KEY = 'userCareHome';
const REGION_KEY = 'userRegion';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private router: Router) {}

  signOut(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
    this.router.navigate(['']);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveCareHome(home: any): void {
    window.sessionStorage.removeItem(CARE_HOMER_KEY);
    window.sessionStorage.setItem(CARE_HOMER_KEY, JSON.stringify(home));
  }

  public saveRegion(region: any): void {
    window.sessionStorage.removeItem(REGION_KEY);
    window.sessionStorage.setItem(REGION_KEY, JSON.stringify(region));
  }

  public getCareHome(): any {
    const home = window.sessionStorage.getItem(CARE_HOMER_KEY);
    if (home) {
      return JSON.parse(home);
    }
    return {};
  }

  public getRegion(): any {
    const region = window.sessionStorage.getItem(REGION_KEY);
    if (region) {
      return JSON.parse(region);
    }
    return {};
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
