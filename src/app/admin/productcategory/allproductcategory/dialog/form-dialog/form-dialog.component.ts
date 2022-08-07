import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { ProductCategoryService } from "../../productcategory.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { ProductCategory, ProductCategoryDto } from "../../productcategory.model";
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
  productCategoryForm: FormGroup;
  productCategory: ProductCategory;
  id: string;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public productCategoryService: ProductCategoryService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = "productCategory.EditproductCategory";
      this.productCategory = data.productCategory;
      this.id = data.productCategoryId;
    } else {
      this.dialogTitle = "productCategory.AddproductCategory";
      this.productCategory = new ProductCategory({});
    }
    this.productCategoryForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      name: [this.productCategory.name, {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      eName: [this.productCategory.fName, {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      isActive: [this.productCategory.isActive],
      displayOrder: [this.productCategory.displayOrder],
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
    this.productCategoryForm.get('displayOrder')!.setValue(0);
    if (this.action === "edit") {
      this.productCategoryService.updateProductCategory(this.id, this.productCategoryForm.getRawValue()).subscribe(data => {
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
      this.productCategoryService.addProductCategory(this.productCategoryForm.getRawValue()).subscribe(data => {
        this.productCategoryForm.reset();
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
