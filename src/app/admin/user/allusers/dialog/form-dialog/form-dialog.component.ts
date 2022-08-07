import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { UserService } from "../../user.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { User, UserDto } from "../../user.model";
import { HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  userForm: FormGroup;
  user: User;
  id: string;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = "User.EditUser";
      this.user = data.user;
      this.id = data.userId;
    } else {
      this.dialogTitle = "MENUITEMS.USERS.LIST.NewUser";
      this.user = new User({});
    }
    this.userForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      fullName: [this.user.fullName, {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      phoneNumber: [this.user.phoneNumber, {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      email: [this.user.phoneNumber, {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      password: [this.user.password, {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      confirmPassword: [this.user.confirmPassword, {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      emailConfirmed: [this.user.emailConfirmed],
      phoneNumberConfirmed: [this.user.phoneNumberConfirmed],
      isActive: [this.user.isActive],
      displayOrder: [this.user.displayOrder],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  error: string[] = [];
  public confirmAdd(): void {
    this.userForm.get('displayOrder')!.setValue(0);
    if (this.action === "edit") {
      this.userService.updateUser(this.id, this.userForm.getRawValue()).subscribe(data => {
        this.showNotification(
          "blue-snackbar",
          data.messages[0],
          "bottom",
          "center",
          2000
        );
      },
        (err) => {
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
    else {
      this.userService.addUser(this.userForm.getRawValue()).subscribe(data => {
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

  showNotification(colorName, text, placementFrom, placementAlign, duration) {
    this.snackBar.open(text, "", {
      duration: duration,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
