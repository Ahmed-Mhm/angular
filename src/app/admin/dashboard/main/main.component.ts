import { PromotionDto } from './../../../core/DTOs/Promotions/PromotionDto';
import { ProductDto } from './../../../core/DTOs/Products/ProductDto';
import { HomeDto } from './../../../core/DTOs/Home/HomeDto';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import { Component, Inject, OnInit } from "@angular/core";
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTooltip, ApexYAxis, ApexPlotOptions, ApexStroke, ApexLegend, ApexFill, ApexResponsive, } from "ng-apexcharts";
import { AuthService } from "src/app/core/service/auth.service";
import { MenuItem, SelectItem, ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/core/service/language.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
};
const document: any = window.document;
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  providers: [ConfirmationService, MessageService]
})
export class MainComponent implements OnInit {
  homes: HomeDto[];
  products: ProductDto[];
  promotions: PromotionDto[];
  sortOptions: SelectItem[];
  items: MenuItem[];
  display: boolean = false;
  sortKey: string;
  sortField: string;
  sortOrder: number;

  ProductForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  permissions: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private mainService: MainService,
    public languageService: LanguageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.ProductForm = this.formBuilder.group({
      FristName: ["", Validators.required],
      LastName: ["", Validators.required],
      PhoneNumber: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.items = [
      {label: 'Edit', icon: 'pi pi-pencil', command: () => {
        this.display = true;
      }},
      {label: 'Delete', icon: 'pi pi-times', command: () => {
        this.confirm();
      }}
    ];
    this.mainService.getAll().subscribe( data => {
      this.homes = data
      this.products=data.data.products;
      this.promotions=data.data.promotions;
      console.log(this.products);
      console.log(this.promotions);
    }, error => console.log(error));
    this.mainService.create()
    this.sortOptions = [
      {label: 'Newest First', value: '!year'},
      {label: 'Oldest First', value: 'year'},
      {label: 'Brand', value: 'brand'}
    ];
    $('.grid-nogutter').addClass('row');
  }
  get f() {
    return this.ProductForm.controls;
  }
  confirm() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to Delete this Product?',
        accept: () => {
        }
    });
  }
  showDialog() {
    this.display = true;
  }
  onSortChange(event) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }
}
