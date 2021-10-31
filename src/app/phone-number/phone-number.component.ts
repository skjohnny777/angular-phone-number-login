import { Component, OnInit, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';


var config ={
  apiKey: "AIzaSyD_L0TRTah_YhXIFjCX2lLyMLZrZoKgH7U",
  authDomain: "phone-auth-402ab.firebaseapp.com",
  projectId: "phone-auth-402ab",
  storageBucket: "phone-auth-402ab.appspot.com",
  messagingSenderId: "276564691757",
  appId: "1:276564691757:web:2869544360a3946defa1a4"

}

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css'],
})
export class PhoneNumberComponent implements OnInit {
  phoneNumber: any;
  reCaptchaVerifier!: any;
  windowRef: any;

  constructor(private router: Router, private ngZone: NgZone) {}

  ngOnInit() {
    firebase.initializeApp(config);
    
    this.windowRef.recaptchaVerifier.render()
  }

  getOTP() {
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
      }
    );
    console.log(this.reCaptchaVerifier);

    console.log(this.phoneNumber);
    firebase
      .auth()
      .signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier)
      .then((confirmationResult) => {
        localStorage.setItem(
          'verificationId',
          JSON.stringify(confirmationResult.verificationId)
        );
        this.ngZone.run(() => {
          this.router.navigate(['/code']);
        });
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
  }
}
