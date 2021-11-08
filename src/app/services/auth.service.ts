import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Router} from '@angular/router';
import { Empleado } from '../models/empleado';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
   public afs: AngularFirestore,
   public afAuth: AngularFireAuth,
   public router: Router,
   public ngZone: NgZone
  ) { 
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }
      else {
        localStorage.setItem('user',null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  SignIn(email,password){
return this.afAuth.signInWithEmailAndPassword(email,password).then((result)=>{
  this.ngZone.run(()=>{
    this.router.navigate(['dashboard']);
                      });
      }).catch((error)=> {
        window.alert(error.message)
    })
  }

  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
      }).catch((error) => {
        window.alert(error.message)
      })
  }


SignOut(){
  return this.afAuth.signOut().then(() => {
    localStorage.setItem('user',null);
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  })
}

}
