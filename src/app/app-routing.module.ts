import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';
import { SignUpComponent } from './core/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';
import { SignInComponent } from './core/auth/sign-in/sign-in.component';
import { VerifyEmailComponent } from './core/auth/verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'logoBattle',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'anms.menu.settings' }
  },
  {
    path: 'logoBattle',
    loadChildren: 'app/examples/examples.module#ExamplesModule'
  },
  {
    path: 'emailLogin',
    component: SignInComponent,
    data: { title: 'signIn' }
  },
  {
    path: 'emailSignUp',
    component: SignUpComponent,
    data: { title: 'signUp' }
  },
  {
    path: 'forget',
    component: ForgotPasswordComponent,
    data: { title: 'Oublie du mot de pass' }
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent,
    data: { title: 'Vérification du courriel' }
  },
  {
    path: '**',
    redirectTo: 'about'
  }

];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
