import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/Pagination';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  pageNumber = 1;
  pageSize = 6;

  users: User[];
  pagination: Pagination;

  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Male'}, {value: 'female', display: 'FeMale'}];
  userParams: any = {};
  constructor(private userService: UserService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.getAllUser();

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  // getAllUser(){
  //   this.userService.getUsers(this.pageNumber, this.pageSize).subscribe(( users: User[]) =>{
  //     this.users = users;
  //   }, error =>{
  //     this.alertifyService.errror(error);
  //   });
  // }

  getAllUser(){
    this.userService.getUsers(this.pageNumber, this.pageSize).subscribe(data =>{
      this.users = data.result;
      this.pagination = data.pagination;
      this.pagination.itemsPerPage
    }, error =>{
      this.alertifyService.errror(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    this.loadUser();
  }

  resetFilters(){
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUser();
  }

  loadUser(){
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe(data =>{
      this.users = data.result;
      this.pagination = data.pagination;
      this.pagination.itemsPerPage
    }, error =>{
      this.alertifyService.errror(error);
    });
  }
}
