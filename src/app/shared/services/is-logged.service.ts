import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedService {
  private isLogged$ = new BehaviorSubject<false | true>(false);
  constructor() {}

  setIsLogged(value: boolean){
    this.isLogged$.next(value);
  }

  getIsLogged(){
    return this.isLogged$.asObservable();
  }
}
