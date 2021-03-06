import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/Pagination';
import { User } from '../_models/user';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<User[]>>{

    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if(userParams != null){
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    if(likesParam === 'Likers'){
      params = params.append('likers', 'true');
    }

    if(likesParam === 'Likees'){
      params = params.append('likees', 'true');
    }

    return this.http.get<User[]>(this.baseUrl + "User/users", { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if(response.headers.get('Pagination') != null){
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getUser(id): Observable<User>{
    return this.http.get<User>(this.baseUrl + "User/user?id=" + id);
  }

  updateUser(user: User){
    return this.http.post(this.baseUrl + "User/updateUser", user);
  }

  sendLike(id: string, receiptId: string){
    return this.http.post(this.baseUrl + "User/" + id +"/like/"+ receiptId, {});
  }

  setMainPhoto(userId: string, id: string){
    return this.http.post(this.baseUrl + "api/users/"+ userId + "/photos/" + id + "/setMain", {});
  }

  deletePhoto(userId: string, id: string){
    return this.http.delete(this.baseUrl + "api/users/"+ userId + "/photos/" + id);
  }
}
