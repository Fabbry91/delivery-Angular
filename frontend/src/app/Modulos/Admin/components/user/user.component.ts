import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../Services/users/user.service';
import { User } from '../../../Interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userList: any[] = [];
  forma: FormGroup;
  p2: number = 1;

  constructor(private userS: UserService, private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.getUsers();
    this.crearForm();
  }

  crearForm() {
    this.forma = this.fb.group({
      _id: [],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      roles: this.fb.array([''])
    });
  }

  getUsers() {
    this.userS.getUsers().subscribe(u => {
      this.userList = u;
      console.log(this.userList);
    });
  }

  guardar() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const user = this.forma.value;
    console.log(user);
    if (user._id) {
      this.userS.editUser(user._id, user).subscribe(data => {
        console.log(data);
        this.getUsers();
        this.forma.reset();
      });
    } else {
      this.userS.addUser(user).subscribe(dato => {
        console.log(dato);
        this.getUsers();
        this.auth.logoutUser();
        this.router.navigate(['/registro']);
      });
    }
  }

  showUser(user: User) {
    this.forma.setValue({
      _id: this.forma.controls._id.setValue(user._id),
      email: this.forma.controls.email.setValue(user.email)
    });
  }

  delete(id: string) {
    console.log(id);
    this.userS.deleteUser(id).subscribe(dato => {
      console.log(dato);
      this.getUsers();
    });

  }

  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }
  get roles() {
    return this.forma.get('roles') as FormArray;
  }
}
