import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private quantity: number;
  private algorithm: string;
  algorithms = ["sequence", "random"];

  constructor() {  }

  get Quantity() {
    return this.quantity;
  }

  set Quantity(quantity) {
    this.quantity = quantity;
  }

  get Algorithm() {
    return this.algorithm;
  }

  set Algorithm(algorithm) {
    this.algorithm = algorithm;
  }
}
