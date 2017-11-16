import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {User} from "../User";
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService]
})
export class UserCreateComponent implements OnInit, OnDestroy {


  employeeId: string;
  user: User;

  userForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.employeeId = params['employeeId'];
    });

    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      employeeId: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ])
    });



 /*   if (this.employeeId) { //edit form
      this.userService.findById(this.employeeId).subscribe(
        user => {
          this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            employeeId: user.employeeId,
            email: user.email,
          });
        },error => {
          console.log(error);
        }
      );

    }*/


  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.userForm.valid) {
      
        let user: User = new User(null,
          this.userForm.controls['firstName'].value,
          this.userForm.controls['lastName'].value,
          this.userForm.controls['employeeId'].value,
          this.userForm.controls['email'].value);
        this.userService.saveUser(user).subscribe();
      this.userForm.reset();
      this.router.navigate(['/user']);

    }
  }

  redirectUserPage() {
    this.router.navigate(['/user']);

  }

}
