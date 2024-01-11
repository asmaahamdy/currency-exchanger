import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurencyService } from '../servicess/curency.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent {
  subscription: Subscription;
  data:any;

  constructor(private currencyServices :CurencyService) {
    this.subscription = this.currencyServices.data$.subscribe(data => {
      this.data = data;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
