import { HttpClient } from '@angular/common/http';
import { User } from './../../core/models/user';
import { Component, Inject, OnInit, Renderer2 } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { LanguageService } from "src/app/core/service/language.service";
import { DOCUMENT } from "@angular/common";
import { param } from 'jquery';

const document: any = window.document;
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
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
      username: ["0549000191", Validators.required],
      password: ["Aa@123321", Validators.required],
    });
    this.languageService.setLanguage(localStorage.getItem('lang'));
    this.switchDirection(localStorage.getItem('lang')!);
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get("username")!.setValue("0549000191");
    this.authForm.get("password")!.setValue("Aa@123321");
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";

    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {
      this.authService.create(this.authForm.get("username").value, this.authForm.get("password").value).subscribe((data) => {
        const role = 'Admin';
        this.router.navigate(["/admin/dashboard/main"]);
        this.loading = false;
        this.authService.saveToken(data.data);
        console.log(localStorage.getItem("token"));
      })
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
