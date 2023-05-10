import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true; // authorized
    }
    document.body.classList.add('bg-img');
    // not logged in, so redirect to login page with the return url
    return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url }});
  }
}