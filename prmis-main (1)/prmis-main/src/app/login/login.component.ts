import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm;
  disabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  async tryLogin() {
    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';
    try {
      this.disabled = true;
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      const claims = await user.user.getIdTokenResult();
      const isAdmin = claims.claims['isAdmin'] ?? false;
      this.disabled = false;
      if (isAdmin) {
        await this.router.navigate(['/dashboard']);
      } else {
        await this.router.navigate(['/dashboard/profile']);
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError === undefined) {
        console.error(error);
      } else {
        console.log(firebaseError.code);
        if (
          firebaseError.code === 'auth/user-not-found' ||
          firebaseError.code === 'auth/wrong-password'
        ) {
          alert('Invalid login credentials.');
        } else if (firebaseError.code === 'auth/too-many-requests') {
          alert('Too many login attempts. Please try again later.');
        } else if (firebaseError.code === 'auth/invalid-email') {
          alert('Invalid email.');
        } else {
          alert('An error occurred. Please try again later.');
        }
      }
    }
    this.disabled = false;
  }
}
