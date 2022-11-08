import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs'
import {Employee} from "../models/Employee";
import {Auth} from "../models/Auth";
import {autoLogout} from "../store/auth/auth.actions";
import {AppState} from "../store/app.state";
import {Store} from "@ngrx/store";
import {ToastrService} from "ngx-toastr";

@Injectable({providedIn: 'root'})
export class ApiService {

  url = 'http://localhost:3000';

  timeoutInterval: any;
  constructor(private toastr: ToastrService, private http: HttpClient, private store: Store<AppState>) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<Employee[]>(this.url + '/employee');
  }

  getUser(email: | string): Observable<Auth> {
    return this.http.get<Auth>(this.url + '/user?email='+ email);
  }

  //login with JSON Server
  login(email: string, password: string): Observable<Auth> {
    return this.http.get<Auth>(this.url + '/user?email=' + email);
  }

  public addUserData( user: Auth | any): Observable<any> {
    return this.http.post(this.url + '/user', user);
  }

  signUp(email: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`,
      { email, password, returnSecureToken: true }
    );
  }

  formatUser(data: Auth) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user: Auth = {
      password: "",
      isAuthenticated: false,
      expiresIn: "",
      refreshToken: "",
      email: data.email,
      token: data.token,
      localId: data.localId,
      expirationDate: expirationDate
    };
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  showSuccess(message?: string) {
    this.toastr.success(message, 'Message');
  }

  showWarning(message?: string) {
    this.toastr.warning(message, 'Message');
  }

  showError(message?: string) {
    this.toastr.error(message, 'Message');
  }

  setUserInLocalStorage(user: Auth) {
    localStorage.setItem('userData', JSON.stringify(user));

    // this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: Auth) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expirationDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
      //logout functionality or get the refresh token
    }, timeInterval);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    console.log('calling auto login')
    console.log('user data', userDataString)
    if (userDataString) {
      const data = JSON.parse(userDataString);
      const expirationDate = new Date(data.expirationDate);
      const user: Auth = {
        password: "",
        isAuthenticated: false,
        expiresIn: "",
        refreshToken: "",
        email: data.email,
        token: data.idToken,
        localId: data.localId,
        expirationDate: expirationDate
      };
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    console.log('remove user data');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }

}
