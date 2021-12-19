import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  _acuid: string;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  public _photos : Photo[];

  constructor(private userService: UserService, private alertifyService: AlertifyService,
              private activeRoute: ActivatedRoute) 
              { 
                this._photos = [];
              }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this._acuid = params.get('id');
      this.getUser();
      this.galleryImages= this.getImages();
    });
    
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

  //   this.galleryImages = [
  //     {
  //         small: '/assets/images/2.jpg',
  //         medium: '/assets/images/2.jpg',
  //         big: '/assets/images/2.jpg'
  //     }
  //   //   {
  //   //     small: '\\assets\\images\\2.jpg',
  //   //     medium: '\\assets\\images\\2.jpg',
  //   //     big: '\\assets\\images\\2.jpg'
  //   // }
  // ];
  }

  getUser(){
    this.userService.getUser(this._acuid).subscribe(
      response => {
        this.user = JSON.parse(JSON.stringify(response));
        this._photos = this.user.photos;
        if(this._photos != null){
          this.galleryImages = this.getImages();
        }
        //this.getImages()
      }, error => {
        this.alertifyService.errror(error);
      }
    );
  }

  getImages(){
    const imageUrls = [];
    for( const photo of this._photos){
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }
}
