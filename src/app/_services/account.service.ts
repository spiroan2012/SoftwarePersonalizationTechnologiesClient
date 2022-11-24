import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import {map} from 'rxjs/operators';

// import { SocialAuthService } from 'angularx-social-login';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentuserSource = new ReplaySubject<User>(1);
  currentUser = this.currentuserSource.asObservable();
  // private authChangeSub = new Subject<boolean>();
  // private extAuthChangeSub = new Subject<SocialUser>();
  // public authChanged = this.authChangeSub.asObservable();
  // public extAuthChanged = this.extAuthChangeSub.asObservable();

  constructor(private http: HttpClient) { 
    // this.externalAuthService.authState.subscribe((user) => {
    //   console.log(user)
    //   this.extAuthChangeSub.next(user);
    // });
  }

  login(model: any){
    return this.http.post(this.baseUrl+'account/login', model).pipe(
      map((response: any) => {
        const user = response;

        if(user && !user.isDisabled){
          this.setCurrentUser(user);

        }
        return user;
      })
    )
  }

  // loginGoogle(){
  //   this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // loginGoogleExternal(externalAuth: ExternalAuth){
  //   return this.http.post(this.baseUrl+'account/google-login', externalAuth).pipe(
  //     map((response: any) => {
  //       const user = response;

  //       if(user && !user.isDisabled){
  //         this.setCurrentUser(user);

  //       }
  //       return user;
  //     })
  //   )
  // }

  // public signOutExternal = () => {
  //   this.externalAuthService.signOut();
  // }

  logout(){
    //this.socialAuthService.signOut(true);
    localStorage.removeItem('user');
    this.currentuserSource.next(undefined);
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl+'account/register', model).pipe(
      map((user: User) => {
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  loginExternal(user){
    console.log("external");
    return this.http.post<User>(this.baseUrl+'account/facebook-login', user).pipe(
      map((user: User) => {
        if(user){
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User){
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    if(Array.isArray(roles)){
      user.roles = roles
    }
    else{
      user.roles.push(roles);
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.currentuserSource.next(user);
  }

  getDecodedToken(token){
    return JSON.parse(atob(token.split('.')[1]));
  }

  updateLoggedUserLocation(model: any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    return this.http.patch<Location>(this.baseUrl+'users/UpdateUserLocation', model, httpOptions);
  }
}
