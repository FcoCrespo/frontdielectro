import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    currentUserSubject: any;

    constructor(private http: HttpClient) { }

    getAll(tokenpass: string) {
        const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
        return this.http.get<any[]>(`${environment.apiUrl}/users/all?tokenpass=${tokenpass}`);
    }

    getUser(tokenpass: string, username: string) {
        const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
        return this.http.get<any[]>(`${environment.apiUrl}/users/getuser?tokenpass=${tokenpass}&username=${tokenpass}`);
    }

    register(tokenpass: string, user: any) {
        const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
        return this.http.post(`${environment.apiUrl}/users?tokenpass=${tokenpass}`, user);
    }

    delete(tokenpass: string, username: string) {
        const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
        return this.http.delete(`${environment.apiUrl}/users/deleteuser?tokenpass=${tokenpass}&username=${tokenpass}`);
    }

    update(tokenpass: string, username: string, user: any) {
        const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
        return this.http.put(`${environment.apiUrl}/users/${username}?tokenpass=${tokenpass}`, user);
    }

    recoverpassword(username: string, email: string) {
        const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
        return this.http.get<any[]>(`${environment.apiUrl}/users/recoverpassword?username=${username}&email=${email}`);
    }

}
