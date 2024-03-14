import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../../Types/User';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { DEFAULT_USER_IMG_URL } from '../constats/defaultImageUrl';
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;


  get isLoggedIn(): boolean {
    return !!this.user;
  }

  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/login`, { username, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string,
    age: number,
  ) {
    return this.http
      .post<User>(`${environment.apiUrl}/register`, {
        username,
        email,
        password,
        rePassword,
        age,
        imageUrl: DEFAULT_USER_IMG_URL
      })
  }

  logout() {
    return this.http
      .post<User>(`${environment.apiUrl}/logout`, {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  getProfile() {
    return this.http
      .get<User>(`${environment.apiUrl}/users/profile`)
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(imageUrl: string) {
    return this.http
      .put<User>(`${environment.apiUrl}/users/profile`, { imageUrl })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

