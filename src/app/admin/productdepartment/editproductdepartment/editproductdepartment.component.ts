import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Productdepartment } from "../allproductsdepartment/productdepartment.model";
import { ProductdepartmentService } from "../allproductsdepartment/productdepartment.service";
@Component({
  selector: "app-editproductdepartment",
  templateUrl: "./editproductdepartment.component.html",
  styleUrls: ["./editproductdepartment.component.sass"],
})
export class EditProductdepartmentComponent {
  productdepartmentForm: FormGroup;
  @Input()
  model!: Productdepartment;
  constructor(private fb: FormBuilder,
    public ProductdepartmentService: ProductdepartmentService,
    private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.ProductdepartmentService.getEditProductdepartment(params['id']).subscribe((res) => {
        this.model=res.data;
      });

      this.productdepartmentForm = this.fb.group({
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
        this.productdepartmentForm.patchValue(this.model);
      }
    });
  }

  onSubmit() {
    console.log("Form Value", this.productdepartmentForm.value);
  }
}
