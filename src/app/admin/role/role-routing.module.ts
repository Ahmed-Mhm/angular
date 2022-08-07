import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { AllRolesComponent } from "./allroles/allroles.component";
import { AddRoleComponent } from "./addrole/addrole.component";
import { PermissionGuard } from "src/app/core/guard/permission.guard";
const routes: Routes = [
  {
    path: "allroles",
    // canActivate: [PermissionGuard],
    // data: { permission: true },
    component: AllRolesComponent,
  },
  {
    path: "addrole",
    // canActivate: [PermissionGuard],
    // data: { permission: true },
    component: AddRoleComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRoutingModule { }
