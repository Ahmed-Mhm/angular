import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductCategoryService } from "../allproductcategory/productcategory.service";
@Component({
  selector: "app-addproductcategory",
  templateUrl: "./addproductcategory.component.html",
  styleUrls: ["./addproductcategory.component.sass"],
})
export class AddProductCategoryComponent {
  productCategoryForm: FormGroup;
  constructor(private fb: FormBuilder,
    public productCategoryService: ProductCategoryService,
    private snackBar: MatSnackBar,
    ) {
     this.productCategoryForm = this.fb.group({
      name: ['', {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      eName: ['', {
        validators: [Validators.required, Validators.maxLength(64)]
      }],
      isActive: [false],
      displayOrder: [0],
    });
  }
  uploadedFiles: any[] = [];

  onUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
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

  onSubmit() {
    this.productCategoryService.addProductCategory(this.productCategoryForm.value).subscribe(data => {
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
