import { Component, OnInit } from '@angular/core';
import { AuthService, GalleryContent, GalleryService } from '../../services';
import { timer } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  private initialPreviewHeight = 25;
  private biggerFactor = 1.05;
  private smallerFactor = 0.95;
  private playerInterval = 2000;
  private playerTimer = timer(0, this.playerInterval);

  public galleryContent: GalleryContent[] = [];
  public currentgalleryItem = 0;
  public isPlaying = false;
  public previewHeight = this.initialPreviewHeight;

  constructor(private authService: AuthService, private galleryService: GalleryService) {
    if (!this.authService.isLogged()) {
      this.authService.goToLoginPage();
      return;
    }

    this.galleryContent = this.galleryService.getGalleryContent();
  }

  public goToContent(galleryItem: number) {
    this.currentgalleryItem = galleryItem;
  }
  
  public isPreviusButtonDisabled(): boolean {
    return this.isFirstItem();
  }

  public onPreviousClick(): void {
    this.currentgalleryItem = this.currentgalleryItem - 1;
    this.setInitialPreviewwHeight();
  }

  public isNextButtonDisabled(): boolean {
    return this.isLastItem();
  }

  public onNextClick(): void {
    this.currentgalleryItem = this.currentgalleryItem + 1;
    this.setInitialPreviewwHeight();
  }

  public onBiggerClick(): void {
    this.previewHeight = this.previewHeight * this.biggerFactor;
  }

  public onSmallerClick(): void {
    this.previewHeight = this.previewHeight * this.smallerFactor;
  }

  public onPlayClick(): void {
    this.isPlaying = true;
  }

  public onStopClick(): void {
    this.isPlaying = false;
  }

  private setInitialPreviewwHeight(): void {
    this.previewHeight = this.initialPreviewHeight;
  }

  private isFirstItem(): boolean {
    return this.currentgalleryItem === 0;
  }

  private isLastItem(): boolean {
    return this.currentgalleryItem === this.galleryContent.length - 1;
  }

  private setPlayer(): void {
    this.playerTimer.subscribe(() => {
      if (!this.isPlaying) { return; }

      if (this.isLastItem()) {
        this.currentgalleryItem = 0;
        return;
      }
      this.currentgalleryItem = this.currentgalleryItem + 1;

    });
  }

  public ngOnInit(): void {
    this.setPlayer();
  }

}
