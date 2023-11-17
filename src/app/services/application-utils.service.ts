import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationUtils {
  isGridActivated: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isGridActivatedAck: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(public snackBar: MatSnackBar) {}

  riskValueDisplay(rating: number): any {
    if (rating == 0) {
      return 'Normal Risk';
    }
    if (rating == 1) {
      return 'Moderate Risk';
    }
    if (rating == 2) {
      return 'High Risk';
    }
  }

  openSnackBar(message: string, color: string): any {
    this.snackBar.open(message, 'dismiss', {
      duration: 3000,
      panelClass: [color],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

}
