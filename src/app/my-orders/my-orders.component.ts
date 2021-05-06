import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Order } from 'src/app/models/order';
import { MyOrdersService } from 'src/app/services/my-orders.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  userId;
  isLoading: boolean;
  private unsubscribe$ = new Subject<void>();
  OrderList=[];

  constructor(private orderService: MyOrdersService) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.isLoading = true;
    this.getMyOrderDetails();
  }

  getMyOrderDetails() {
    this.orderService.myOrderDetails(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((orderData: []) => {
        this.OrderList = orderData;
      }, error => {
        console.log('Error ocurred while fetching my order details : ', error);
      });
  }

}
