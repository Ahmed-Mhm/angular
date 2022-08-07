import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {CardModule} from 'primeng/card';
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { MainComponent } from "./main/main.component";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgApexchartsModule } from "ng-apexcharts";
import { ProductComponent } from "./Product/Product.component";
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import {CarouselModule} from 'primeng/carousel';
import { ActivityComponent } from './activity/activity/activity.component';
import { PromotionComponent } from './promotion/promotion/promotion.component';
import { FacilityComponent } from './facility/facility/facility.component';
import { PartnerComponent } from './partner/partner/partner.component';
import {DropdownModule} from 'primeng/dropdown';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [MainComponent, ProductComponent, ActivityComponent, PromotionComponent, FacilityComponent, PartnerComponent, ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    chartjsModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    CardModule,
    ButtonModule,
    DataViewModule,
    CarouselModule,
    DropdownModule,
    SplitButtonModule,
    DialogModule,
    ConfirmDialogModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule {}
