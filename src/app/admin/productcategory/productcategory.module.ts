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
import { ProductCategoryRoutingModule } from "./productcategory-routing.module";
import { DeleteDialogComponent } from "./allproductcategory/dialog/delete/delete.component";
import { FormDialogComponent } from "./allproductcategory/dialog/form-dialog/form-dialog.component";
import { AddProductCategoryComponent } from "./addproductcategory/addproductcategory.component";
import { ProductCategoryService } from "./allproductcategory/productcategory.service";
import { EditProductCategoryComponent } from "./editproductcategory/editproductcategory.component";
import { AllProductCategoryComponent } from "./allproductcategory/allproductcategory.component";
import { DataTablesModule } from "angular-datatables";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}
@NgModule({
  declarations: [
    AllProductCategoryComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    EditProductCategoryComponent,
    AddProductCategoryComponent,
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
    ProductCategoryRoutingModule,
    MatProgressSpinnerModule,
    DataTablesModule,
    TranslateModule,
    FileUploadModule,
    HttpClientModule
  ],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
