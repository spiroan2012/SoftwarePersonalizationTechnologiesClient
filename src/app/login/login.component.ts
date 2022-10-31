import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

import { Subject } from 'rxjs';
import { ExternalAuth } from '../_models/externalAuth';
import { LocationDto } from '../_models/locationDto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validationErrors: string[] = [];
  model


  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {

    this.initializeForm();
    // this.socialAuthService.authState.subscribe((user) => {
    //   console.log(user);
    //   this.accountService.loginExternal(user).subscribe(response =>{
      
    //     //console.log("Login success");
    //     if(response.isDisabled){
    //       this.toastr.error('Ο λογαριασμός σας έχει απενεργοποιηθεί από τους διαχειριστές');
    //     }
    //     else{
    //       this.router.navigateByUrl('/show-booking');
    //     }
        
    //   }, error =>{
    //     console.log("There was an error "+error.error);
    //   });;
    //   // this.socialUser = user;
    //   // this.isLoggedin = (user != null);
    //   // console.log(this.socialUser);
    // });
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    this.accountService.login(this.loginForm.value).subscribe(response =>{
      
      //console.log("Login success");
      if(response.isDisabled){
        this.toastr.error('Ο λογαριασμός σας έχει απενεργοποιηθεί από τους διαχειριστές');
      }
      else{
        this.router.navigateByUrl('/show-booking');
        this.storeUsersLocation();
      }
      
    }, error =>{
      console.log("There was an error "+error.error);
    });
  }

  private storeUsersLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;

        let model = new LocationDto(latitude, longitude);

        this.accountService.updateLoggedUserLocation(model).subscribe(response => {
          console.log(response);
        })
      })
    }
  }

  // loginWithGoogle(): void {
  //   console.log("Googlis")
  //   this.accountService.loginGoogle();

    // this.accountService.extAuthChanged.subscribe( user => {
    //   const externalAuth: ExternalAuth = {
    //     provider: user.provider,
    //     idToken: user.idToken
    //   }
    //   this.validateExternalAuth(externalAuth);
    // })
  }

  // private validateExternalAuth(externalAuth: ExternalAuth) {
  //   this.accountService.loginGoogleExternal(externalAuth)
  //     .subscribe(response =>{
  //       if(response.isDisabled){
  //         this.toastr.error('Ο λογαριασμός σας έχει απενεργοποιηθεί από τους διαχειριστές');
  //       }
  //       else{
  //         this.router.navigateByUrl('/show-booking');
  //       }
  //     },
  //      error =>{
  //       console.log("There was an error "+error.error);
  //     });
  // }

  
//}
