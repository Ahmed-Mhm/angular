import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { ProductdepartmentService } from "../../productdepartment.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Productdepartment, ProductdepartmentDto } from "../../productdepartment.model";
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
  productdepartmentForm: FormGroup;
  productdepartment: Productdepartment;
  id: string;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public productdepartmentService: ProductdepartmentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = "productdepartment.Editproductdepartment";
      this.productdepartment = data.productdepartment;
      this.id = data.productdepartmentId;
    } else {
      this.dialogTitle = "productdepartment.Addproductdepartment";
      this.productdepartment = new Productdepartment({});
    }
    this.productdepartmentForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      name: [this.productdepartment.name, {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      eName: [this.productdepartment.fName, {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      isActive: [this.productdepartment.isActive],
      displayOrder: [this.productdepartment.displayOrder],
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
    this.productdepartmentForm.get('displayOrder')!.setValue(0);
    if (this.action === "edit") {
      this.productdepartmentService.updateProductdepartment(this.id, this.productdepartmentForm.getRawValue()).subscribe(data => {
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
      this.productdepartmentService.addProductdepartment(this.productdepartmentForm.getRawValue()).subscribe(data => {
        this.productdepartmentForm.reset();
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
