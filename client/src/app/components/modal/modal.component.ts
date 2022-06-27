import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { HttpService } from '../../services/http.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  subscription: Subscription;
  showModal: boolean = false;

  initialQuantity: number;
  initialAlgorithm: string;

  constructor(private http: HttpService, private uiService: UiService, public configService: ConfigService) {
    this.subscription = this.uiService.onToggle().subscribe(toggle => {
      this.showModal = toggle;
    });
  }

  ngOnInit(): void {
    this.initialQuantity = this.configService.Quantity;
    this.initialAlgorithm = this.configService.Algorithm;
  }

  onSubmit() {
    this.http.sendNewConfig({quantity: this.configService.Quantity, algorithm: this.configService.Algorithm})
    .subscribe(config => {
      this.configService.Quantity = this.initialQuantity = config.quantity;
      this.configService.Algorithm = this.initialAlgorithm = config.algorithm;
    });
    this.dismiss();
  }

  dismiss() {
    this.uiService.toggleModal();
    this.configService.Quantity = this.initialQuantity;
    this.configService.Algorithm = this.initialAlgorithm;
  }

}
