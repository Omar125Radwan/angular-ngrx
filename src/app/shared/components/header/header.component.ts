import { autoLogout } from './../../../auth/state/auth.actions';
import { Observable } from 'rxjs';
import { AppState } from './../../../store/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated!: Observable<boolean>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

  onLogout(event: Event): void {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }

}
