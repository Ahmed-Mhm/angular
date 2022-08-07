import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { ProductdepartmentService } from "../../productdepartment.service";
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
    public productdepartmentService: ProductdepartmentService,
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
    this.productdepartmentService.deleteProductdepartment(this.data.id).subscribe(data => {
      this.showNotification(
        "snackbar-danger",
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

  );}

}
