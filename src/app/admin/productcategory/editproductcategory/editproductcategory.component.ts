import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ProductCategory } from "../allproductcategory/productcategory.model";
import { ProductCategoryService } from "../allproductcategory/productcategory.service";
@Component({
  selector: "app-editproductcategory",
  templateUrl: "./editproductcategory.component.html",
  styleUrls: ["./editproductcategory.component.sass"],
})
export class EditProductCategoryComponent {
  productCategoryForm: FormGroup;
  @Input()
  model!: ProductCategory;
  constructor(private fb: FormBuilder,
    public productCategoryService: ProductCategoryService,
    private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productCategoryService.getEditProductCategory(params['id']).subscribe((res) => {
        this.model=res.data;
      });

      this.productCategoryForm = this.fb.group({
        name: ['', {
          Validators: [Validators.required]
        }],
        eName: ['', {
          Validators: [Validators.required]
        }],
        isActive: false,
        displayOrder: 0,
      });

      if (this.model !== undefined) {
        this.productCategoryForm.patchValue(this.model);
      }
    });
  }

  onSubmit() {
    console.log("Form Value", this.productCategoryForm.value);
  }
}
