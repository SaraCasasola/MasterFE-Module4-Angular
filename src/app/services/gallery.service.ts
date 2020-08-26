import { Injectable } from '@angular/core';

export interface GalleryContent {
  id: number;
  src: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private galleryContentRoot = '/assets/gallery/';

  private galleryContent: GalleryContent[] = [
    {
      id: 0,
      src: this.galleryContentRoot + 'photo_1.jpg',
      title: 'Photo 1'
    },
    {
      id: 1,
      src: this.galleryContentRoot + 'photo_2.jpg',
      title: 'Photo 2'
    },
    {
      id: 2,
      src: this.galleryContentRoot + 'photo_3.jpg',
      title: 'Photo 3'
    },
    {
      id: 3,
      src: this.galleryContentRoot + 'photo_4.jpg',
      title: 'Photo 4'
    },
    {
      id: 4,
      src: this.galleryContentRoot + 'photo_5.jpg',
      title: 'Photo 5'
    },
    {
      id: 5,
      src: this.galleryContentRoot + 'photo_6.jpg',
      title: 'Photo 6'
    },
    {
      id: 6,
      src: this.galleryContentRoot + 'photo_7.jpg',
      title: 'Photo 7'
    },
    {
      id: 7,
      src: this.galleryContentRoot + 'photo_8.jpg',
      title: 'Photo 8'
    }
  ];

  constructor() { }

  public getGalleryContent(): GalleryContent[] {
    return this.galleryContent;
  }
}
