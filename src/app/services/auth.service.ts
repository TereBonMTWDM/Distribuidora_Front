import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//Firebase:
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; //save logged in user data
  user: any;
  isAuthenticating = false; // Flag to track authentication state
  isUserRegistred: boolean = false;


  constructor(
    public afs: AngularFirestore
    , public afAuth: AngularFireAuth
    , private router: Router,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }
      else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
      this.isAuthenticating = false; // Reset the flag after auth state is determined

    });
  }


  async AuthLogin() {
    if (this.isAuthenticating) {
      return;
    }

    this.isAuthenticating = true;

    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      
      const result = await this.afAuth.signInWithPopup(provider);
      this.isUserRegistred = result.additionalUserInfo.isNewUser;

      if (!this.isUserRegistred) {
        this.user = result.user;
        this.SetUserData(this.user);

        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);

        this.router.navigate(['bienvenida']); //this.router.navigate(['dashboard']);
        this.isAuthenticating = false; // Reset the flag after successful login
      } else {
        //--nada
      }
    } catch (error) {
      // window.alert(error);
      this.isAuthenticating = false; // Reset the flag after successful login
      this.router.navigate(['pages/login']); // mandar el error de loegueo
    }


    // return this.afAuth.signInWithPopup(provider).then((result) => {
    //   console.log('\x1b[42m%s\x1b[0m', 'Hello src\app\services\auth.service.ts:61', result);
    //   console.log('>>> es New?: ', result.additionalUserInfo.isNewUser);
    //   this.isUserRegistred = result.additionalUserInfo.isNewUser;

    //   if(!this.isUserRegistred){
    //     this.user = result.user;
    //     console.log('\x1b[42m%s\x1b[0m', 'Hello src\app\services\auth.service.ts:64', this.user);
    //     this.SetUserData(this.user);

    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //       JSON.parse(localStorage.getItem('user')!);

    //     this.router.navigate(['bienvenida']); //this.router.navigate(['dashboard']);
    //     this.isAuthenticating = false; // Reset the flag after successful login
    //   } else{
    //     //--nada
    //     console.log('>> NADA');
    //   }
    // }).catch((error) => {
    //   console.log('>>> No registrar en fb');
    //   // window.alert(error);
    //   this.isAuthenticating = false; // Reset the flag after successful login
    //   this.router.navigate(['pages/login']); // mandar el error de loegueo
    // });

  }

  SetUserData(user: any) {
    console.log('>>> SetUserData');


    this.userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
  }

  getUserData() {
    this.user = localStorage.getItem('user');
    return this.user ? JSON.parse(this.user) : null;
  }


  SignOut() {
    console.log('>>> SignOut');

    return this.afAuth.signOut().then(() => {
      localStorage.clear();
      localStorage.removeItem('user');

      this.router.navigate(['pages/login']);
    })

  }
}
