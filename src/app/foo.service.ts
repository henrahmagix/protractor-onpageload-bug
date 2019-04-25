import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooService {

  constructor() { }

  static getFoo(): string {
    return 'REAL';
  }
}
