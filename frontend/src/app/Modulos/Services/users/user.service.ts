import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://delivery-fabbry-mean.herokuapp.com/user';

  array: any;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any[]>(this.url);
  }

  getUserByEmail(email: string) {
    return this.http.post<any>(this.url + '/email', { email });
  }

  async getPermision(email: string) {

    try {
      await this.getUserByEmail(email).toPromise().then(data => {
        if (data) {
          console.log(data);
          this.array = data[0]?.roles;
        }
      });
    } catch (error) {
      console.error(error);
    }
    return this.array;
  }

  addUser(user: any) {
    return this.http.post<any>(this.url, user);
  }

  editUser(id: string, user: any) {
    return this.http.put<any>(this.url + '/' + id, user);
  }

  deleteUser(id: string) {
    return this.http.delete<any>(this.url + '/' + id);
  }
}
