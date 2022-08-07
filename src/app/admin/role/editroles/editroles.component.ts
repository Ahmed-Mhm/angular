import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Role } from "../allroles/role.model";
import { RoleService } from "../allroles/role.service";
@Component({
  selector: "app-editroles",
  templateUrl: "./editroles.component.html",
  styleUrls: ["./editroles.component.sass"],
})
export class EditRoleComponent {
  roleForm: FormGroup;
  @Input()
  model!: Role;
  constructor(private fb: FormBuilder,
    public roleService: RoleService,
    private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.roleService.getEditRole(params['id']).subscribe((res) => {
        this.model=res.data;
      });

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

      if (this.model !== undefined) {
        this.roleForm.patchValue(this.model);
      }
    });
  }

  onSubmit() {
    console.log("Form Value", this.roleForm.value);
  }
}
