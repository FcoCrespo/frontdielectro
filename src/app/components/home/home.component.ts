import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Event, Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends HammerGestureConfig{

  isSidenavOpen = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;
  private sidenavSubscription!: Subscription;

  constructor(private router: Router) {
    super();
  }
  

  ngAfterViewInit() {
    document.body.classList.add('bg-img-white');
    this.sidenavSubscription = this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationStart)
    ).subscribe(() => {
      if (this.sidenav.mode === 'over' && this.sidenav.opened) {
        this.sidenav.close();
      }
    });
  }

  ngOnDestroy() {
    if (this.sidenavSubscription) {
      this.sidenavSubscription.unsubscribe();
    }
  }

  swipe(action = this.swipeAction.SWIPE_LEFT) {
    if (action === this.swipeAction.SWIPE_LEFT) {
      this.sidenav.close();
    }

    if (action === this.swipeAction.SWIPE_RIGHT) {
      this.sidenav.open();
    }
  }

  swipeAction = {
    SWIPE_LEFT: 'swipeleft',
    SWIPE_RIGHT: 'swiperight'
  };

  

}
