import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showModal: boolean = false;
  private subject = new Subject<any>()
  
  constructor() { }

  toggleModal() {
    this.showModal = !this.showModal;
    this.subject.next(this.showModal);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable()
  }
}
