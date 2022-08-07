import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { EditProductdepartmentComponent } from "./editproductdepartment/editproductdepartment.component";
import { AllproductdepartmentComponent } from "./allproductsdepartment/allproductsdepartment.component";
import { AddProductdepartmentComponent } from "./addproductdepartment/addproductdepartment.component";
import { PermissionGuard } from "src/app/core/guard/permission.guard";

const routes: Routes = [
  {
    path: "allproductsdepartment",
    canActivate: [PermissionGuard],
    data: { permission: true },
    component: AllproductdepartmentComponent,
  },
  {
    path: "addproductdepartment",
    canActivate: [PermissionGuard],
    data: { permission: true },
    component: AddProductdepartmentComponent,
  },
  {
    path: "editproductdepartment",
    canActivate: [PermissionGuard],
    data: { permission: true },
    component: EditProductdepartmentComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductdepartmentRoutingModule { }
