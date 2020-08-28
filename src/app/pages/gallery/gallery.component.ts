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
  private carouselInterval = 3;
  private lastCarouselItemsLength: number;

  public galleryContent: GalleryContent[] = [];
  public currentgalleryItem = 0;
  public isPlaying = false;
  public previewHeight = this.initialPreviewHeight;
  public carouselStarts = 0;
  public carouselFinish = this.carouselInterval;

  constructor(private authService: AuthService, private galleryService: GalleryService) {
    if (!this.authService.isLogged()) {
      this.authService.goToLoginPage();
      return;
    }

    this.galleryContent = this.galleryService.getGalleryContent();
    this.lastCarouselItemsLength = this.galleryContent.length % this.carouselInterval;
  }

  public goToContent(galleryItem: number): void {
    if (this.isPlaying) { return; }
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

  public onNextCarouselClick(): void {
    const nextStartIndex = this.carouselStarts + this.carouselInterval;

    if (nextStartIndex >= this.galleryContent.length) {
      this.goToInitalCarouselSet();
      return;
    }

    this.carouselStarts = nextStartIndex;
    this.carouselFinish = nextStartIndex + this.carouselInterval;
  }

  private goToInitalCarouselSet(): void {
    this.carouselStarts = 0;
    this.carouselFinish = this.carouselInterval;
  }

  public onPreviousCarouselClick(): void {
    const previousStartIndex = this.carouselStarts - this.carouselInterval;

    if (previousStartIndex < 0 ) {
      this.goToLastCarouselSet();
      return;
    }

    this.carouselStarts = previousStartIndex;
    this.carouselFinish = previousStartIndex + this.carouselInterval;
  }

  private goToLastCarouselSet(): void {
    if (this.lastCarouselItemsLength === 0) {
      this.carouselStarts = this.galleryContent.length - this.carouselInterval;
      this.carouselFinish = this.carouselStarts + this.carouselInterval;
      return;
    }

    this.carouselStarts = this.galleryContent.length - this.lastCarouselItemsLength;
    this.carouselFinish = this.carouselStarts + this.lastCarouselItemsLength;
  }

  public ngOnInit(): void {
    this.setPlayer();
  }

}
