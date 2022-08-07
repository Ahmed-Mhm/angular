import { Page404Component } from "./../../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { ProductComponent } from './Product/Product.component';
import { ActivityComponent } from "./activity/activity/activity.component";
import { PromotionComponent } from "./promotion/promotion/promotion.component";
import { FacilityComponent } from "./facility/facility/facility.component";
import { PartnerComponent } from "./partner/partner/partner.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "main",
    pathMatch: "full",
  },
  {
    path: "main",
    component: MainComponent,
  },
  {
    path: "Product",
    component: ProductComponent,
  },
  {
    path: "Activity",
    component: ActivityComponent,
  },
  {
    path: "Promotion",
    component: PromotionComponent,
  },
  {
    path: "Facility",
    component: FacilityComponent,
  },
  {
    path: "Partner",
    component: PartnerComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
