import { AuthEffects } from './state/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { AUTH_STATE_NAME } from './state/auth.selector';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthReducer } from './state/auth.reducer';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    EffectsModule.forFeature([AuthEffects]),
    ReactiveFormsModule,
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer)
  ]
})
export class AuthModule { }
