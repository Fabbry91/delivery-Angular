import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { User } from '../../../Interfaces/user';
import { UserService } from '../../../Services/users/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admind',
  templateUrl: './admind.component.html',
  styleUrls: ['./admind.component.css']
})
export class AdmindComponent implements OnInit {
  datos: any;
  o = true;

  constructor(private auth: AuthService, private userS: UserService, private activated: ActivatedRoute) { }


  ngOnInit(): void {
  }

}
