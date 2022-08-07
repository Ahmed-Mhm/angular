import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { RoleService } from "../../role.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from "@angular/common/http";
@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.sass"],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public roleService: RoleService,
    private snackBar: MatSnackBar,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  showNotification(colorName, text, placementFrom, placementAlign, duration) {
    this.snackBar.open(text, "", {
      duration: duration,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  confirmDelete() {
    this.roleService.deleteRole(this.data.id).subscribe(data => {
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

