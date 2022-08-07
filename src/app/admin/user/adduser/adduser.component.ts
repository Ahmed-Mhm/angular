import { TokenRespones } from './../../../authentication/TokenResponese.model';
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "../allusers/user.service";
@Component({
  selector: "app-adduser",
  templateUrl: "./adduser.component.html",
  styleUrls: ["./adduser.component.sass"],
})
export class AddUserComponent {
  userForm: FormGroup;
  constructor(private fb: FormBuilder,
    public userService: UserService,
    private snackBar: MatSnackBar,
    ) {
    this.userForm = this.fb.group({
      fullName: ['', {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      phoneNumber: ['', {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      email: ['', {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      password: ['', {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      confirmPassword: ['', {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      phoneNumberConfirmed: [false],
      emailConfirmed: [false],
      isActive: [false],
      isSystemRole: [false],
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign, duration) {
    this.snackBar.open(text, "", {
      duration: duration,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onSubmit() {
    console.log(this.userForm.value);
    this.userService.addUser(this.userForm.value).subscribe(data => {
      this.userForm.reset();
      this.showNotification(
        "snackbar-success",
        data.messages[0],
        "bottom",
        "center",
        2000
      );
    },
      (err) => {
        console.log(err.error.status)
        this.showNotification(
          "snackbar-danger",
          err.error,
          "bottom",
          "center",
          4000
        );
      }
    );
  }
}
