import { getCounter } from './../state/counter.selector';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit {
  counter$!: Observable<{counter: number} | any>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter);
  }

}
