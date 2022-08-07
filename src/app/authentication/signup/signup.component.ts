import { Component, Inject, OnInit, Renderer2 } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { LanguageService } from "src/app/core/service/language.service";
import { DOCUMENT } from "@angular/common";
const document: any = window.document;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  permissions: string;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private authService: AuthService,
    public languageService: LanguageService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      FristName: ["", Validators.required],
      LastName: ["", Validators.required],
      PhoneNumber: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.languageService.setLanguage(localStorage.getItem('lang'));
    this.switchDirection(localStorage.getItem('lang'));
  }
  get f() {
    return this.authForm.controls;
  }
  /* adminSet() {
    this.authForm.get("username").setValue("966549000191");
    this.authForm.get("password").setValue("Aa@123321");
  } */
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {
      const role = 'Admin';
      this.router.navigate(["/admin/dashboard/main"]);
      this.loading = false;
    }
  }
  switchDirection(lang: string) {
    if (lang === "en") {
      localStorage.setItem("isRtl", "false");
      document.getElementsByTagName("html")[0].removeAttribute("dir");
      this.renderer.removeClass(this.document.body, "rtl");
    } else if (lang === "ar") {
      localStorage.setItem("isRtl", "true");
      document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
      this.renderer.addClass(this.document.body, "rtl");
    }
  }
}
