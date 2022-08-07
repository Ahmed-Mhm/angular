import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { EditProductCategoryComponent } from "./editproductcategory/editproductcategory.component";
import { AllProductCategoryComponent } from "./allproductcategory/allproductcategory.component";
import { AddProductCategoryComponent } from "./addproductcategory/addproductcategory.component";
import { PermissionGuard } from "src/app/core/guard/permission.guard";
import { AllproductdepartmentComponent } from "../productdepartment/allproductsdepartment/allproductsdepartment.component";

const routes: Routes = [
  {
    path: "allproductcategory",
    canActivate: [PermissionGuard],
    data: { permission: true },
    component: AllProductCategoryComponent,
  },
  {
    path: "addProductcategory",
    canActivate: [PermissionGuard],
    data: { permission: true },
    component: AddProductCategoryComponent,
  },
  {
    path: "editproductcategory",
    canActivate: [PermissionGuard],
    data: { permission: true },
    component: EditProductCategoryComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCategoryRoutingModule { }
