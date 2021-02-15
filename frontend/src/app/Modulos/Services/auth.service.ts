import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../Interfaces/user';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(  // recupera el usuario logueado
      switchMap((user) => {
        // si esta en un proceso y pasa algo lo cancela e inicia de nuevo
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          // user si existe vamos a firebase cada usuario con su id en su coleccion
        } return of(null);
      })
    );
  }

  /*async sendVerificacionEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }*/

  async register(email: string, pass: string) {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, pass);
      // this.sendVerificacionEmail();
      return user;
    } catch (error) {
      Swal.fire({
        title: '¿Está seguro?',
        text: `El email ingresado ya existe`,
        icon: 'error',
        showConfirmButton: true
      });
      console.log(error);
    }

  }
  async loginEmailUser(email: string, pass: string) {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, pass);
      return user;
    } catch (error) {
      this.handleError(error);
    }
  }
  async logoutUser() {
    try {
      await this.afAuth.signOut();
      window.location.reload();
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  }

  loginGoogleUser() {
    try {
      return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (error) {

    };
  }

  // Manejo de errores
  private handleError(error: Error, code: string = '') {
    if (code === 'auth/wrong-password') {
      Swal.fire({
        title: 'Contraseña invalida',
        text: `Intentalo de nuevo`,
        icon: 'error',
        showConfirmButton: true
      });
      console.log(error);
      return;
    }
    if (code === 'auth/user-not-found') {
      Swal.fire({
        title: 'Usuario no encontrado',
        text: `Intentalo de nuevo`,
        icon: 'error',
        showConfirmButton: true
      });
      console.log('Usuario no encontrado!');
      return;
    }
    if (code === '400') {
      Swal.fire({
        title: 'Datos invalidos',
        text: `Intentalo de nuevo`,
        icon: 'error',
        showConfirmButton: true
      });
      return;
    }
    Swal.fire({
      title: 'Se produjo un error',
      text: `Intentalo de nuevo`,
      icon: 'error',
      showConfirmButton: true
    });
    return;
  }
}