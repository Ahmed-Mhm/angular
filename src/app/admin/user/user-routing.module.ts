import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { EditUserComponent } from "./edituser/edituser.component";
import { AlluserComponent } from "./allusers/allusers.component";
import { AddUserComponent } from "./adduser/adduser.component";
import { PermissionGuard } from "src/app/core/guard/permission.guard";
const routes: Routes = [
  {
    path: "allusers",
    canActivate: [PermissionGuard],
    data: { permission: true },
    component: AlluserComponent,
  },
  {
    path: "adduser",
    canActivate: [PermissionGuard],
    data: { permission: true },
    component: AddUserComponent,
  },
  {
    path: "edituser",
    canActivate: [PermissionGuard],
    data: { permission: true },
    component: EditUserComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
