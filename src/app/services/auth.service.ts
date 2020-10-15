import { Injectable, NgZone } from '@angular/core';
import { User } from "../models/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import sha256 from 'crypto-js/sha256';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Guardar datos de usuario registrados
  SHA256 = require("crypto-js/sha256");
  constructor(
    private toastr: ToastrService,  
    public afs: AngularFirestore,   //  Inyectar Servicio Firestore
    public afAuth: AngularFireAuth, // Inyectar el servicio de autenticación de Firebase
    public router: Router,  
    public ngZone: NgZone // Servicio NgZone para eliminar la advertencia de alcance externo
  ){ 
     
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }
    SignIn(email, password) {
      return this.afAuth.signInWithEmailAndPassword(email, this.SHA256(password).toString()).then((result) => {
          this.ngZone.run(() => {
            this.toastr.success(email, "Bienvenido");
            this.toastr.success(this.SHA256(password).toString(), "contra encriptada");
          });
          this.SetUserData(result.user);
        }).catch((error) => {
          this.toastr.error("ERROR",error.message);
        })
    }
    SignUp(email ,password) {
      return this.afAuth.createUserWithEmailAndPassword(email, this.SHA256(password).toString())
        .then((result) => {
          this.SetUserData(result.user);
          this.toastr.success(email, "Registrado");
          this.toastr.success(this.SHA256(password).toString(), "contra encriptada");
        }).catch((error) => {
          this.toastr.error("ERROR",error.message);
        })
    }
    GoogleAuth() {      
      return this.AuthLogin(new auth.GoogleAuthProvider());
    }
    AuthLogin(provider) {
      return this.afAuth.signInWithPopup(provider)
      .then((result) => {
         this.ngZone.run(() => {
            this.router.navigate(['dashboard']);
          })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
    }
    SetUserData(user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userData: User = {
        uid: user.uid,
        email: user.email,
        pass: user.displayName
      }
      return userRef.set(userData, {
        merge: true
      })
    }
  
}
