import { Observable } from 'rxjs';
import { getChannelName } from './../counter/state/counter.selector';
import { changeChannleName } from './../counter/state/counter.action';
import { CounterState } from './../counter/state/counter.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { customIncrement } from '../counter/state/counter.action';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
  value: number = 0;
  channelName$!: Observable<string>;
  message: string = '';
  constructor(private store: Store<{counter: CounterState}>) { }

  ngOnInit(): void {
    this.channelName$ = this.store.select(getChannelName);
  }

  onAdd(): void {
    if(!isNaN(this.value)) {
      this.store.dispatch(customIncrement({count: Number(this.value)}));
    } else {
      this.value = 0;
      this.message = "You can't add chars to number";
      setTimeout(() => {
        this.message = "";
      }, 2000);
    }
  }
  onChangeChannleName(): void {
    this.store.dispatch(changeChannleName());
  }

}
