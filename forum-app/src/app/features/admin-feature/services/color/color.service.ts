import { Injectable } from '@angular/core';

@Injectable()
export class ColorService {
  generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
