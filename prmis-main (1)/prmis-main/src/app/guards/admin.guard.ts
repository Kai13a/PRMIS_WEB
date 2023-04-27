import { Injectable } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanActivateChild {
  user$: Observable<User | null>;
  constructor(private auth: Auth, private router: Router) {
    this.user$ = user(auth);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise(async (resolve) => {
      if (this.user$ == null) resolve(false);
      const user = await firstValueFrom(this.user$);
      const claims = await user?.getIdTokenResult();
      const isAdmin = claims?.claims['isAdmin'] ?? false;
      if (!isAdmin) await this.router.navigate(['/dashboard/profile']);
      resolve(true);
    });
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise(async (resolve) => {
      if (this.user$ == null) resolve(false);
      const user = await firstValueFrom(this.user$);
      const claims = await user?.getIdTokenResult();
      const isAdmin = claims?.claims['isAdmin'] ?? false;
      if (!isAdmin) await this.router.navigate(['/dashboard/profile']);
      resolve(true);
    });
  }
}
