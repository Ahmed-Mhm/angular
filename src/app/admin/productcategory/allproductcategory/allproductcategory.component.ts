import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormDialogComponent } from "./dialog/form-dialog/form-dialog.component";
import { DeleteDialogComponent } from "./dialog/delete/delete.component";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ProductCategoryService } from "./productcategory.service";
import { ProductCategory, DataTablesResponse, ProductCategoryDto } from "./productcategory.model";
import { environment } from "src/environments/environment";
import { DataTableDirective } from "angular-datatables/src/angular-datatables.directive";
import { ADTSettings } from "angular-datatables/src/models/settings";
import { PermissionService } from "src/app/core/service/permission.service";

@Component({
  selector: "app-allproductcategory",
  templateUrl: "./allproductcategory.component.html",
  styleUrls: ["./allproductcategory.component.sass"],
})
export class AllProductCategoryComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  exampleDatabase: ProductCategoryService | null;
  selection = new SelectionModel<ProductCategoryDto>(true, []);
  index: number;
  id: string;
  productCategory: ProductCategoryDto | null;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: ADTSettings = {};
  private readonly API_URL = environment.apiUrl;
  Edit = true;
  Create = true;
  Delete = true;
  Action = true;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public productCategoryService: ProductCategoryService,
    private snackBar: MatSnackBar,
    private permissionService: PermissionService
  ) {
    super();
  }

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;


  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      stateSave: true,
      pageLength: 10,
      serverSide: true,
      processing: true,
      responsive: true,
      autoWidth: false,
      orderClasses: true,
      orderCellsTop: true,
      order: [1, 'desc'],
      ajax: (dataTablesParameters: any, callback) => {
        this.httpClient
          .post<any>(
            this.API_URL + 'v1/productcategory/getdatatable',
            dataTablesParameters, {}
          ).subscribe(resp => {
            console.log(resp.data);
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            })
            ,error=>{
              console.log(error);
            };
          });
      },
      columns: [
        {
          data: null,
          name: null,
          className:JSON.stringify(this.Action),
          render: (data) => {
            var d = '';
            if (this.Action == true) {
              if (this.Edit == true)
                d = d + '<button id="Edit" class="btn-tbl-edit mat-focus-indicator mat-icon-button mat-button-base mat-accent col-white"><span class="mat-button-wrapper"><mat-icon _ngcontent-nix-c261="" role="img" class="mat-icon notranslate col-white material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">edit</mat-icon></span></button>';
              if (this.Delete == true)
                d = d + '<button id="Delete" class="mat-focus-indicator btn-tbl-delete mat-icon-button mat-button-base mat-accent col-white"><span class="mat-button-wrapper"><mat-icon _ngcontent-nix-c261="" role="img" class="mat-icon notranslate col-white material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">delete</mat-icon></span></button>';
            }
            return d;
          },
          searchable: false,
          orderable: false,
        },
        {
          data: "departmentName",
          name: "departmentName",
          searchable: true,
          orderable: true,
        },
        {
          data: null,
          name: 'isActive',
          render: function (data: any, type: any, full: any) {
            if (data.isActive == true)
              return '<div class="badge col-green">' + data.isActive + '</div>';
            else
              return '<div class="badge col-red">' + data.isActive + '</div>';
          },
          searchable: false,
          orderable: true,
        },
        {
          data: "displayOrder",
          name: "displayOrder",
          searchable: false,
          orderable: true,
        }
      ],
      rowCallback: (row: Node, data: any | Object, index: number) => {
        const self = this;
        $('#Edit', row).off('click');
        $('#Edit', row).on('click', () => {
          this.editCall(data.id);
        });
        $('#Delete', row).off('click');
        $('#Delete', row).on('click', () => {
          this.deleteItem(data.id, data);
        });
        return row;
      },
      // language: {
      //   search: tableTranslate("search"),
      //   searchPlaceholder: tableTranslate("searchPlaceholder"),
      //   zeroRecords: tableTranslate("zeroRecords"),
      //   lengthMenu: tableTranslate("lengthMenu"),
      //   infoEmpty: tableTranslate("infoEmpty"),
      //   infoFiltered: '',
      //   info: tableTranslate("info"),
      //   paginate: {
      //     previous: tableTranslate("previous"),
      //     next: tableTranslate("next"),
      //     first: "",
      //     last: ""
      //   }
      // }
    };
  }

  refresh() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload()
    });
  }

  addNew() {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        productCategory: this.productCategory,
        action: "add",
      },
      direction: tempDirection,
      disableClose: true,
      width: '95vw',
      maxWidth: '95vw',
      height: '95vh',
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }

  editCall(id) {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    this.productCategoryService.getEditProductCategory(id).subscribe((res) => {
      const dialogRef = this.dialog.open(FormDialogComponent, {
        data: {
          productCategory: res.data,
          productCategoryId: id,
          action: "edit",
        },
      direction: tempDirection,
      disableClose: true,
      width: '95vw',
      maxWidth: '95vw',
      height: '95vh',
      });

      this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
        if (result === 1) {
          this.refresh();
        }
      });
    });
  }
  deleteItem(i: number, row) {
    this.index = i;
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
function tableTranslate(arg0: string): string {
  throw new Error("Function not implemented.");
}

