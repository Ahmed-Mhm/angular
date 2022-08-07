import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RoleService } from "../allroles/role.service";
@Component({
  selector: "app-addrole",
  templateUrl: "./addrole.component.html",
  styleUrls: ["./addrole.component.sass"],
})
export class AddRoleComponent {
  roleForm: FormGroup;
  constructor(private fb: FormBuilder,
    public roleService: RoleService,
    private snackBar: MatSnackBar,
    ) {
    this.roleForm = this.fb.group({
      name: ['', {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      name_AR: ['', {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      description: ['', {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      isActive: [false],
      displayOrder: [0],
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
    this.roleService.addRole(this.roleForm.value).subscribe(data => {
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
