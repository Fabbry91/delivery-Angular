import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.afAuth.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('Acceso Denegado');
          this.navigateLogin(state.url);
        }
      })
    );
  }

  navigateLogin(url: string) {
    const res = url.split('/').filter(x => x !== '');
    if (res[0] === 'admin') {
      this.router.navigate(['/login']);
      return;
    } else if (res[0] === 'cocina') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/register']);
    }
  }

}
