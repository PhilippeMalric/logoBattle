import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './user.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFireDatabase } from '@angular/fire/database'
import { auth } from 'firebase';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.models';
import { Authenticated,GetUser } from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  public authState: any;
  public user$: Observable<firebase.User>;
  logedIn: boolean;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private store: Store<AuthState>
  ) {
    this.user$ = afAuth.authState;

    if (this.user$) {
      this.logedIn = true;
    } else {
      this.logedIn = false;
    }
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {

        this.store.dispatch(new Authenticated(new User(result.user.uid,result.user.displayName,email)))
        this.router.navigate(['logoBattle']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        console.log(result)
        //this.store.dispatch(new GetUser(new User(result.user.uid,result.user.displayName,email)))
        this.SendVerificationMail();
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }


  logout() {
    if(this.afAuth.auth.currentUser)
    {

      const uid = this.afAuth.auth.currentUser.uid;
      const status = 'offline';
      this.setStatus(uid, status);
      this.authState = null;
      return this.afAuth.auth.signOut().then(() => this.router.navigate(['/logoBattle']));
    }
  }

  setStatus(uid: string, status: string) {
    const path = 'users/' + uid;
    const data = {
      status
    };
    this.db.object(path).update(data);
  }


  googleSignIn() {
    const provider = new auth.GoogleAuthProvider().addScope('email');
    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    const credential: any = await this.afAuth.auth.signInWithPopup(provider);

    console.log('displayName');
    console.log(credential.user.displayName);
    console.log('credential.user.displayName');
    console.log(credential.user.uid);
    console.log('credential');
    console.log(credential);
    this.updateUserData({
      uid: credential.user.uid,
      email: credential.additionalUserInfo.profile.email,
      displayName: credential.user.displayName,
      photoURL: ''
    });
    const status = 'online';
    this.setUserData(
      credential.additionalUserInfo.profile.email,
      credential.user.displayName,
      status,
      credential.user.uid
    );
    this.authState = credential;
    this.store.dispatch(new Authenticated(new User(credential.user.uid,credential.user.displayName,credential.additionalUserInfo.profile.email)))
    this.router.navigate(['logoBattle']);
  }

  private updateUserData({ uid, email, displayName, photoURL }: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, { merge: true });
  }
  setUserData(email: string, displayName: string, status: string, uid) {
    const path = `users/${uid}`;
    const data = {
      status
    };
    this.db.object(path).update(data);
  }
}
