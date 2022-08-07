import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ProductdepartmentRoutingModule } from "./productdepartment-routing.module";
import { DeleteDialogComponent } from "./allproductsdepartment/dialog/delete/delete.component";
import { FormDialogComponent } from "./allproductsdepartment/dialog/form-dialog/form-dialog.component";
import { addProductdepartmentComponent } from "./addproductdepartment/addproductdepartment.component";
import { ProductdepartmentService } from "./allproductsdepartment/productdepartment.service";
import { EditProductdepartmentComponent } from "./editproductdepartment/editproductdepartment.component";
import { AllproductdepartmentComponent } from "./allproductsdepartment/allproductsdepartment.component";
import { DataTablesModule } from "angular-datatables";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}
@NgModule({
  declarations: [
    AllproductdepartmentComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    EditProductdepartmentComponent,
    addProductdepartmentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    ProductdepartmentRoutingModule,
    MatProgressSpinnerModule,
    DataTablesModule,
    TranslateModule
  ],
  providers: [ProductdepartmentService],
})
export class ProductdepartmentModule {}
