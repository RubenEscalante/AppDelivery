import {Injectable, NgZone} from '@angular/core';
import {User} from '../models/user';
import {auth, database} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFireDatabase, AngularFireDatabaseModule, AngularFireList} from '@angular/fire/database';
import {Router} from '@angular/router';
import {Products} from '../../menu/models/products';
import {UserDataFirebase} from '../models/user-data-firebase';


@Injectable({
  providedIn: 'any'
})

export class AuthService {
  userData: any; // Guardar datos de usuario registrados
  clients: AngularFireList<any>;
  actualUser: any;
  userName: string;
  dataUserFormDatabase: any;

  constructor(
    public afs: AngularFirestore,   //  Inyectar Servicio Firestore
    public afAuth: AngularFireAuth, // Inyectar el servicio de autenticación de Firebase
    public router: Router,
    public ngZone: NgZone, // Servicio NgZone para eliminar la advertencia de alcance externo,
    private firebase: AngularFireDatabase // Para almacenar datos en database
  ) {

    /* Guardar datos de usuario en almacenamiento local cuando
    iniciado sesión y configurando nulo al cerrar sesión*/
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        const refKey = database().ref('clientes').child(this.userData.uid);
        refKey.once('value', snapshot => {
          this.actualUser = {
            uid: this.userData.uid,
            nombre: snapshot.val().nombre,
            correo: snapshot.val().email,
            direcciones: snapshot.val().direcciones,
            telefono: snapshot.val().telefono,
            historial: snapshot.val().historial
          };
          localStorage.setItem('user', JSON.stringify(this.actualUser)); // cambiar por  this.userData para ver objeto completo
          //localStorage.setItem('firebaseUserData', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        });
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  getUserName() {
    const nombre = JSON.parse(localStorage.getItem('user'));
    return this.userName = nombre.nombre;
  }

  getClients() {
    return this.clients = this.firebase.list('clientes');
  }

  private appUserDataBase(user, username) {

    const adaRef = database().ref('clientes');
    if (user) {
      console.log(user.displayName);
      adaRef.child(user.uid).set({
        email: user.email,
        nombre: username
      });
    }
  }

  // Iniciar sesión con correo electrónico / contraseña
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['menu']);
      });
      this.SetUserData(result.user);
    }).catch((error) => {
      // window.alert("Por favor revisar credenciales")
      window.alert(error.message);
    });
  }

  // Regístrese con correo electrónico / contraseña
  SignUp(username, email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Llame a la función SendVerificaitonMail () cuando un nuevo usuario firme
        y vuelve la funcion*/

        //TODO:Agregarle estilo a la pagina de verificacion de identidad
        //this.SendVerificationMail();
        this.SetUserData(result.user);
        this.appUserDataBase(result.user, username);
        this.router.navigate(['menu']);
        /*
        result.user.updateProfile({
          displayName: username
        });*/
        // Sirve para modificar los datos. Cuando ingresamos con google, displayName se asigna automaticamente. Cuando es por correo y contraseña hay que asignarsela
        // por este pedazo de codigo

      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Enviar verificación por correo electrónico cuando se registre un nuevo usuario
  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verificar-email']);
      });
  }

  // Restablecer contraseña olvidada
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        // window.alert('Password reset email sent, check your inbox.');
        this.SignOut();
        // this.router.navigate(['']);
      }).catch((error) => {
        window.alert(error);
      });
  }
  

  // Devuelve verdadero cuando el usuario está conectado y
  // el correo electrónico está verificado
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

// Iniciar sesión usando Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Iniciar sesión usando Twitter
  TwitterAuth() {
    return this.AuthLogin(new auth.TwitterAuthProvider());
  }

  // Iniciar sesión usando Facebook Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Lógica de autenticación para ejecutar cualquier proveedor de autenticación
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {

        this.ngZone.run(() => {
          this.router.navigate(['menu']);
        });
        this.SetUserData(result.user);
        if (result.additionalUserInfo.isNewUser) {
          this.userName = result.user.displayName;
          this.appUserDataBase(result.user, this.userName); //Unicamente para google, para login con usuario y contraseña se hace de diferente forma
        }
      }).catch((error) => {
        window.alert(error);
      });
  }


  /* Configurar datos de usuario al iniciar sesión con nombre de usuario / contraseña,
  registrarse con nombre de usuario / contraseña e iniciar sesión con autenticación social
  proveedor en la base de datos de Firestore usando el servicio AngularFirestore + AngularFirestoreDocument*/
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  // desconectar
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.setItem('user', null);
      localStorage.removeItem('user');
      window.location.reload();
    });
  }


}
