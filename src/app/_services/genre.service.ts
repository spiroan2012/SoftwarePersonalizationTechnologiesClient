import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../_models/genre';
import { User } from '../_models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  baseUrl = environment.apiUrl;
  user: User;
  
  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
   }

   getAllGenres(){
    return this.http.get<Genre[]>(this.baseUrl+'Genres/');
   }

   getLoggedUserGenres(){
    return this.http.get<Genre[]>(this.baseUrl+'users/GetGenresForUser');
   }

   updateLoggedUserGenres(model: any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
     return this.http.post(this.baseUrl+'Users/UpdatePreferedGenres/', model, httpOptions);
   }
}
