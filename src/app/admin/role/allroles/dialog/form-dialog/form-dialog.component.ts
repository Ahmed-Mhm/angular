import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { RoleService } from "../../role.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Role, RoleDto } from "../../role.model";
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
  roleForm: FormGroup;
  role: Role;
  id: string;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public roleService: RoleService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = "Role.EditRole";
      this.role = data.role;
      this.id = data.roleId;
    } else {
      this.dialogTitle = "Role.AddRole";
      this.role = new Role({});
    }
    this.roleForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      name: [this.role.name, {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      name_AR: [this.role.name_AR, {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      description: [this.role.description, {
        validators: [Validators.required, Validators.maxLength(200)]
      }],
      isActive: [this.role.isActive],
      displayOrder: [this.role.displayOrder],
      isSystemRole: [this.role.isSystemRole],
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
    this.roleForm.get('displayOrder')!.setValue(0);
    if (this.action === "edit") {
      this.roleService.updateRole(this.id, this.roleForm.getRawValue()).subscribe(data => {
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
      this.roleService.addRole(this.roleForm.getRawValue()).subscribe(data => {
        this.roleForm.reset();
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
