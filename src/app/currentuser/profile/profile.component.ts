import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { environment } from "src/environments/environment";
import { CurrentUserService } from "./currentuser.service";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  hide = true;
  chide = true;
  constructor(
    private currentuserService: CurrentUserService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit() {

  }

  public confirmAdd(): void {
    
  }
}
