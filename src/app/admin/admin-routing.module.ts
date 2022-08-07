import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "role",
    loadChildren: () =>
      import("./role/role.module").then((m) => m.RoleModule),
  },
  {
    path: "user",
    loadChildren: () =>
      import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "productdepartment",
    loadChildren: () =>
      import("./productdepartment/productdepartment.module").then((m) => m.ProductdepartmentModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
