import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductdepartmentService } from "../allproductsdepartment/productdepartment.service";
@Component({
  selector: "app-addproductdepartment",
  templateUrl: "./addproductdepartment.component.html",
  styleUrls: ["./addproductdepartment.component.sass"],
})
export class addProductdepartmentComponent {
  countryForm: FormGroup;
  constructor(private fb: FormBuilder,
    public ProductdepartmentService: ProductdepartmentService,
    private snackBar: MatSnackBar,
    ) {
    this.countryForm = this.fb.group({
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

  showNotification(colorName, text, placementFrom, placementAlign, duration) {
    this.snackBar.open(text, "", {
      duration: duration,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onSubmit() {
    this.ProductdepartmentService.addProductdepartment(this.countryForm.value).subscribe(data => {
      this.countryForm.reset();
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
