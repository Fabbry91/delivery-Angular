import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-verificacion-email',
  templateUrl: './verificacion-email.component.html',
  styleUrls: ['./verificacion-email.component.css'],
})
export class VerificacionEmailComponent implements OnInit {
  public user$: Observable<any> = this.auth.afAuth.user;
  constructor(private auth: AuthService) { }

  ngOnInit() {

  }

  /*onSendEmail(): void {
    console.log("boton")
    this.auth.sendVerificacionEmail();
  }*/

}
