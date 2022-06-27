import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import { HttpService } from '../../services/http.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  status: number = 0;
  valueLength: number = 0;
  startValue?: number;

  error: number = 0;

  coupons: Array<string>;

  @Output() onRequestCoupons: EventEmitter<any> = new EventEmitter();

  subscription: Subscription;
  showModal: boolean = false;

  constructor(private httpService: HttpService, private uiService: UiService, public configService: ConfigService) {
    this.subscription = this.uiService.onToggle().subscribe(toggle => {
      this.showModal = toggle;
    });
  }

  // Checking if server is up before trying to render content
  ngOnInit(): void {
    this.httpService.checkStatus().subscribe(resp => {
      this.configService.Quantity = resp.body.quantity;
      this.configService.Algorithm = resp.body.algorithm;
      this.status = resp.status;
    });
  }

  onSubmitSequenced(): 0 | 1 | 2 {
    const data = {
      valueLength: this.valueLength,
      startValue: this.startValue
    }
    if (data.valueLength < 1) return this.error = 2;
    if (data.valueLength < data.startValue!.toString().length) return this.error = 1;
    this.httpService.generateSequencedCoupons(data).subscribe(coupon => {
      this.coupons = (coupon as unknown) as string[];
    });
    return this.error = 0;
  }

  onSubmitRandom(): 0 | 2 {
    const data = {
      valueLength: this.valueLength
    }
    if (data.valueLength < 1) return this.error = 2;
    this.httpService.generateRandomCoupons(data).subscribe(coupon => {
      this.coupons = (coupon as unknown) as string[];
    });
    return this.error = 0;
  }

  toggleModal() {
    this.uiService.toggleModal();
  }
}
