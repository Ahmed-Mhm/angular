import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { User } from "../allusers/user.model";
import { UserService } from "../allusers/user.service";
@Component({
  selector: "app-edituser",
  templateUrl: "./edituser.component.html",
  styleUrls: ["./edituser.component.sass"],
})
export class EditUserComponent {
  userForm: FormGroup;
  @Input()
  model!: User;
  constructor(private fb: FormBuilder,
    public userService: UserService,
    private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userService.getEditUser(params['id']).subscribe((res) => {
        this.model=res.data;
      });

      this.userForm = this.fb.group({
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
        this.userForm.patchValue(this.model);
      }
    });
  }

  onSubmit() {
    console.log("Form Value", this.userForm.value);
  }
}
